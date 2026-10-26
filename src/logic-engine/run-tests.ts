import { tokenize } from './tokenizer';
import { parseFormula, astToString } from './parser';
import { buildTruthTable } from './truthTable';
import { checkEquivalence } from './equivalence';
import { evaluateArgument } from './arguments';

function assert(condition: boolean, msg: string) {
  if (!condition) {
    throw new Error(`TEST FAILED: ${msg}`);
  }
  console.log(`  ✓ ${msg}`);
}

export function runAllTests() {
  console.log('--- Testing Tokenizer & Parser ---');
  const ast1 = parseFormula('(p ∧ q) → r');
  assert(astToString(ast1) === '(p ∧ q) → r', 'Parses (p ∧ q) → r correctly');

  const astDeMorgan = parseFormula('¬(p ∧ q) ↔ (¬p ∨ ¬q)');
  assert(astToString(astDeMorgan) === '¬(p ∧ q) ↔ (¬p ∨ ¬q)', 'Parses De Morgan with negation correctly');

  console.log('\n--- Testing Truth Table & Tautologies ---');
  // Modus Ponens
  const mpTable = buildTruthTable('((p -> q) & p) -> q');
  assert(mpTable.classification === 'tautology', 'Modus Ponens is a tautology');
  assert(mpTable.rows.length === 4, '2 variables yield 4 rows');

  // De Morgan
  const dmTable = buildTruthTable('¬(p ∧ q) ↔ (¬p ∨ ¬q)');
  assert(dmTable.classification === 'tautology', 'De Morgan law is a tautology');

  // Exportation Law from PDF Page 16
  const expTable = buildTruthTable('((p ∧ q) → r) ↔ (p → (q → r))');
  assert(expTable.classification === 'tautology', 'Exportation law is a tautology (8 rows)');
  assert(expTable.rows.length === 8, '3 variables yield 8 rows');

  // Four-variable equivalence from PDF Page 10
  const fourVarTable = buildTruthTable('((p ∧ q) → (r ∨ s)) ↔ (¬p ∨ ¬q ∨ r ∨ s)');
  assert(fourVarTable.classification === 'tautology', '4-atom equivalence is a tautology (16 rows)');
  assert(fourVarTable.rows.length === 16, '4 variables yield 16 rows');

  // PDF Page 14 Example 1: (p ∧ q) → ((p ∨ q) → r) is NOT a tautology
  const ex1Table = buildTruthTable('(p ∧ q) → ((p ∨ q) → r)');
  assert(ex1Table.classification === 'contingent', 'PDF Example 1 is contingent (not a tautology)');
  const ex1Counter = ex1Table.rows.find((r) => !r.result);
  assert(
    !!ex1Counter &&
      ex1Counter.valuation.p === true &&
      ex1Counter.valuation.q === true &&
      ex1Counter.valuation.r === false,
    'Counterexample for Example 1 is p=T, q=T, r=F'
  );

  // PDF Page 15 Example 3 Audit: [(~p ∧ q) → (~q ∧ r)] → (~r ∧ s) is NOT a tautology
  const ex3Table = buildTruthTable('((¬p ∧ q) → (¬q ∧ r)) → (¬r ∧ s)');
  assert(ex3Table.classification === 'contingent', 'PDF Example 3 correctly verified as contingent (NOT a tautology)');
  const ex3Counter = ex3Table.rows.find(
    (r) =>
      r.valuation.p === true &&
      r.valuation.q === true &&
      r.valuation.r === true &&
      r.valuation.s === false
  );
  assert(!!ex3Counter && ex3Counter.result === false, 'PDF Example 3 counterexample p=T, q=T, r=T, s=F yields False');

  console.log('\n--- Testing Logical Equivalence ---');
  // Material Implication Equivalence
  const eq1 = checkEquivalence('p → q', '¬p ∨ q');
  assert(eq1.isEquivalent === true, 'p → q ≡ ¬p ∨ q');

  // Non-equivalence: p → q vs q → p (Converse)
  const eq2 = checkEquivalence('p → q', 'q → p');
  assert(eq2.isEquivalent === false, 'p → q ≢ q → p (Converse fallacy)');
  assert(eq2.counterexamples.length === 2, '2 counterexamples exist between conditional and converse');

  console.log('\n--- Testing Argument Validity ---');
  // Proof 1.1: Chained Inference with 4 propositions
  const arg1 = evaluateArgument(['p → q', 'q → r', 'r → s', 'p'], 's');
  assert(arg1.isValid === true, 'Proof 1.1 chained inference is valid');

  // Proof 1.2: Indirect proof with 3 atoms
  const arg2 = evaluateArgument(['p ∨ q', 'p → r', 'q → r'], 'r');
  assert(arg2.isValid === true, 'Proof 1.2 constructive dilemma is valid');

  // Proof 4.1: Resolution with conditional branches
  const arg3 = evaluateArgument(['p ∨ q', 'p → r', 'q → s', '¬r'], 's');
  assert(arg3.isValid === true, 'Proof 4.1 resolution with branches is valid');

  // Invalid argument: Affirming the consequent (p → q, q ⊢ p)
  const argInvalid1 = evaluateArgument(['p → q', 'q'], 'p');
  assert(argInvalid1.isValid === false, 'Affirming the consequent is invalid');
  assert(
    argInvalid1.counterexamples.some((c) => c.p === false && c.q === true),
    'Counterexample found: p=F, q=T'
  );

  // Invalid argument from PDF Page 17: p → q, q, r ∨ ¬r ⊢ p
  const argInvalid2 = evaluateArgument(['p → q', 'q', 'r ∨ ¬r'], 'p');
  assert(argInvalid2.isValid === false, 'PDF Page 17 invalid inference is detected');
  assert(
    argInvalid2.counterexamples.some((c) => c.p === false && c.q === true && c.r === false),
    'Countervaluation p=F, q=T, r=F found'
  );

  console.log('\n========================================');
  console.log('  ALL MATHEMATICAL LOGIC TESTS PASSED!  ');
  console.log('========================================\n');
  return true;
}
