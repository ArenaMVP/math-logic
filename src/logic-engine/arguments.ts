import { ArgumentEvaluationResult, Valuation } from '../types/logic';
import { evaluateAST, extractVariables } from './evaluator';
import { astToString, parseFormula } from './parser';
import { generateValuations } from './truthTable';

/**
 * Validates a propositional argument with premises P1, P2, ... Pn and conclusion C.
 * An argument is valid iff in every valuation where all premises are TRUE, the conclusion is also TRUE.
 * If invalid, collects all countervaluations (counterexamples) where all premises are TRUE but conclusion is FALSE.
 */
export function evaluateArgument(
  premisesInput: string[],
  conclusionInput: string
): ArgumentEvaluationResult {
  const cleanPremises = premisesInput.map((p) => p.trim()).filter(Boolean);
  const cleanConclusion = conclusionInput.trim();

  if (cleanPremises.length === 0) {
    throw new Error('กรุณาระบุข้อสมมติ (Premise) อย่างน้อย 1 ข้อ');
  }
  if (!cleanConclusion) {
    throw new Error('กรุณาระบุข้อสรุป (Conclusion)');
  }

  // Parse premises and conclusion
  const premiseASTs = cleanPremises.map((p) => parseFormula(p));
  const conclusionAST = parseFormula(cleanConclusion);

  const normPremises = premiseASTs.map((ast) => astToString(ast));
  const normConclusion = astToString(conclusionAST);

  // Extract all distinct variables
  const varSet = new Set<string>();
  for (const ast of premiseASTs) {
    for (const v of extractVariables(ast)) {
      varSet.add(v);
    }
  }
  for (const v of extractVariables(conclusionAST)) {
    varSet.add(v);
  }
  const variables = Array.from(varSet).sort();

  if (variables.length === 0) {
    throw new Error('ไม่พบตัวแปรในข้อสมมติหรือข้อสรุป');
  }
  if (variables.length > 5) {
    throw new Error('เพื่อประสิทธิภาพการแสดงผล กรุณาใช้ตัวแปรไม่เกิน 5 ตัว');
  }

  const valuations = generateValuations(variables);
  const counterexamples: Valuation[] = [];

  const rows = valuations.map((val, idx) => {
    const premisesValues = premiseASTs.map((ast) => evaluateAST(ast, val));
    const allPremisesTrue = premisesValues.every((v) => v === true);
    const conclusionValue = evaluateAST(conclusionAST, val);

    // Counterexample occurs when all premises are True and conclusion is False
    const isCounterexample = allPremisesTrue && !conclusionValue;

    if (isCounterexample) {
      counterexamples.push(val);
    }

    return {
      id: idx + 1,
      valuation: val,
      premisesValues,
      allPremisesTrue,
      conclusionValue,
      isCounterexample,
    };
  });

  const isValid = counterexamples.length === 0;

  return {
    isValid,
    premises: normPremises,
    conclusion: normConclusion,
    variables,
    rows,
    counterexamples,
  };
}
