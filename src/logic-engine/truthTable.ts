import {
  FormulaClassification,
  TruthTableResult,
  TruthTableRow,
  Valuation,
} from '../types/logic';
import {
  evaluateAST,
  extractSubExpressions,
  extractVariables,
} from './evaluator';
import { astToString, parseFormula } from './parser';

/**
 * Generate all 2^n truth valuations for given variable names.
 * Standard textbook ordering (T, F descending).
 */
export function generateValuations(variables: string[]): Valuation[] {
  const n = variables.length;
  const count = 1 << n; // 2^n
  const results: Valuation[] = [];

  for (let i = 0; i < count; i++) {
    const valuation: Valuation = {};
    for (let j = 0; j < n; j++) {
      // Bit n-1-j: top row (i=0) has all 1s (True), bottom row has all 0s (False)
      const bit = (i >> (n - 1 - j)) & 1;
      valuation[variables[j]] = bit === 0; // i=0 => True, i=count-1 => False
    }
    results.push(valuation);
  }

  return results;
}

/**
 * Build complete truth table for a given formula string.
 */
export function buildTruthTable(formulaStr: string): TruthTableResult {
  const ast = parseFormula(formulaStr);
  const normalizedStr = astToString(ast);
  const variables = extractVariables(ast);

  if (variables.length === 0) {
    throw new Error('นิพจน์ต้องมีตัวแปรอย่างน้อย 1 ตัว เช่น p, q, r');
  }

  if (variables.length > 5) {
    throw new Error('เพื่อประสิทธิภาพการแสดงผล กรุณาใช้ตัวแปรไม่เกิน 5 ตัว (ไม่เกิน 32 แถว)');
  }

  const subExprs = extractSubExpressions(ast);
  const subExprStrs = subExprs.map((se) => se.str);
  const valuations = generateValuations(variables);

  let trueCount = 0;
  let falseCount = 0;

  const rows: TruthTableRow[] = valuations.map((val, idx) => {
    const intermediates: Record<string, boolean> = {};
    for (const se of subExprs) {
      intermediates[se.str] = evaluateAST(se.node, val);
    }
    const result = evaluateAST(ast, val);
    if (result) trueCount++;
    else falseCount++;

    return {
      id: idx + 1,
      valuation: val,
      intermediates,
      result,
    };
  });

  let classification: FormulaClassification = 'contingent';
  if (trueCount === rows.length) {
    classification = 'tautology';
  } else if (falseCount === rows.length) {
    classification = 'contradiction';
  }

  return {
    variables,
    subExpressions: subExprStrs,
    rows,
    classification,
    trueCount,
    falseCount,
    totalRows: rows.length,
    formula: normalizedStr,
  };
}
