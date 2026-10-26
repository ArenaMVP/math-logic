import { EquivalenceResult, Valuation } from '../types/logic';
import { evaluateAST, extractVariables } from './evaluator';
import { astToString, parseFormula } from './parser';
import { generateValuations } from './truthTable';

/**
 * Check if two logic expressions are logically equivalent.
 */
export function checkEquivalence(expr1Str: string, expr2Str: string): EquivalenceResult {
  const ast1 = parseFormula(expr1Str);
  const ast2 = parseFormula(expr2Str);

  const norm1 = astToString(ast1);
  const norm2 = astToString(ast2);

  const vars1 = extractVariables(ast1);
  const vars2 = extractVariables(ast2);
  const allVars = Array.from(new Set([...vars1, ...vars2])).sort();

  if (allVars.length === 0) {
    throw new Error('กรุณาระบุตัวแปรในนิพจน์');
  }

  const valuations = generateValuations(allVars);
  const counterexamples: Valuation[] = [];

  const rows = valuations.map((val) => {
    const val1 = evaluateAST(ast1, val);
    const val2 = evaluateAST(ast2, val);
    const matches = val1 === val2;

    if (!matches) {
      counterexamples.push(val);
    }

    return {
      valuation: val,
      val1,
      val2,
      matches,
    };
  });

  return {
    isEquivalent: counterexamples.length === 0,
    expr1: norm1,
    expr2: norm2,
    variables: allVars,
    rows,
    counterexamples,
  };
}
