import { ASTNode, Valuation } from '../types/logic';
import { astToString } from './parser';

/**
 * Evaluates an AST node given a truth valuation for variables.
 * Safe evaluation without using eval().
 */
export function evaluateAST(node: ASTNode, valuation: Valuation): boolean {
  switch (node.type) {
    case 'VARIABLE': {
      const val = valuation[node.name];
      if (val === undefined) {
        throw new Error(`ไม่พบค่าความจริงสำหรับตัวแปร "${node.name}"`);
      }
      return val;
    }
    case 'NOT':
      return !evaluateAST(node.operand, valuation);
    case 'AND':
      return evaluateAST(node.left, valuation) && evaluateAST(node.right, valuation);
    case 'OR':
      return evaluateAST(node.left, valuation) || evaluateAST(node.right, valuation);
    case 'IMPLIES': {
      const leftVal = evaluateAST(node.left, valuation);
      const rightVal = evaluateAST(node.right, valuation);
      // p → q is false only if p=true and q=false
      return !leftVal || rightVal;
    }
    case 'IFF': {
      const leftVal = evaluateAST(node.left, valuation);
      const rightVal = evaluateAST(node.right, valuation);
      return leftVal === rightVal;
    }
  }
}

/**
 * Extracts all unique variable names from an AST, sorted alphabetically.
 */
export function extractVariables(node: ASTNode): string[] {
  const vars = new Set<string>();

  function traverse(n: ASTNode) {
    if (n.type === 'VARIABLE') {
      vars.add(n.name);
    } else if (n.type === 'NOT') {
      traverse(n.operand);
    } else {
      traverse(n.left);
      traverse(n.right);
    }
  }

  traverse(node);
  return Array.from(vars).sort();
}

export interface SubExprInfo {
  str: string;
  node: ASTNode;
}

/**
 * Extracts intermediate subexpressions in bottom-up evaluation order.
 * Excludes single variables and the root expression itself.
 */
export function extractSubExpressions(root: ASTNode): SubExprInfo[] {
  const list: SubExprInfo[] = [];
  const seen = new Set<string>();
  const rootStr = astToString(root);

  function traverse(n: ASTNode) {
    if (n.type === 'VARIABLE') return;

    if (n.type === 'NOT') {
      traverse(n.operand);
    } else {
      traverse(n.left);
      traverse(n.right);
    }

    const s = astToString(n);
    if (!seen.has(s) && s !== rootStr) {
      seen.add(s);
      list.push({ str: s, node: n });
    }
  }

  traverse(root);
  return list;
}
