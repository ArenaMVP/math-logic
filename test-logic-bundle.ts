// Logic Engine and Application Types

type TokenType =
  | 'VAR'
  | 'NOT'
  | 'AND'
  | 'OR'
  | 'IMPLIES'
  | 'IFF'
  | 'LPAREN'
  | 'RPAREN'
  | 'EOF';

interface Token {
  type: TokenType;
  value: string;
  pos: number;
}

type ASTNodeType =
  | 'VARIABLE'
  | 'NOT'
  | 'AND'
  | 'OR'
  | 'IMPLIES'
  | 'IFF';

interface VariableNode {
  type: 'VARIABLE';
  name: string;
}

interface NotNode {
  type: 'NOT';
  operand: ASTNode;
}

interface BinaryNode {
  type: 'AND' | 'OR' | 'IMPLIES' | 'IFF';
  left: ASTNode;
  right: ASTNode;
}

type ASTNode = VariableNode | NotNode | BinaryNode;

type Valuation = Record<string, boolean>;

interface IntermediateStep {
  formulaStr: string;
  node: ASTNode;
}

interface TruthTableRow {
  id: number;
  valuation: Record<string, boolean>;
  intermediates: Record<string, boolean>;
  result: boolean;
}

type FormulaClassification = 'tautology' | 'contradiction' | 'contingent';

interface TruthTableResult {
  variables: string[];
  subExpressions: string[];
  rows: TruthTableRow[];
  classification: FormulaClassification;
  trueCount: number;
  falseCount: number;
  totalRows: number;
  formula: string;
}

interface EquivalenceResult {
  isEquivalent: boolean;
  expr1: string;
  expr2: string;
  variables: string[];
  rows: {
    valuation: Valuation;
    val1: boolean;
    val2: boolean;
    matches: boolean;
  }[];
  counterexamples: Valuation[];
}

interface ArgumentEvaluationResult {
  isValid: boolean;
  premises: string[];
  conclusion: string;
  variables: string[];
  rows: {
    id: number;
    valuation: Valuation;
    premisesValues: boolean[];
    allPremisesTrue: boolean;
    conclusionValue: boolean;
    isCounterexample: boolean;
  }[];
  counterexamples: Valuation[];
}

// User Progress & State
interface ChapterProgress {
  chapterId: number;
  completed: boolean;
  lastVisited: string;
  score: number;
  maxScore: number;
}

interface UserProgressState {
  completedChapters: number[];
  chapterScores: Record<number, number>;
  lastActiveChapter: number;
  completedQuizzes: Record<number, boolean>;
  completedTools: string[];
  updatedAt: string;
}

// Quiz & Exercises
type QuestionType =
  | 'multiple_choice'
  | 'true_false'
  | 'truth_table_fill'
  | 'inference_rule'
  | 'proof_step';

interface QuizQuestion {
  id: string;
  type: QuestionType;
  prompt: string;
  promptLatex?: string;
  options?: { id: string; text: string; latex?: string }[];
  correctAnswer: string | boolean;
  explanation: string;
  hint?: string;
}

interface ChapterData {
  id: number;
  title: string;
  titleTh: string;
  subtitle: string;
  readingTime: string;
  objectives: string[];
  sections: {
    id: string;
    heading: string;
    headingTh: string;
    content: string;
    latexSnippets?: string[];
    workedProof?: {
      title: string;
      premises?: string;
      prove: string;
      steps: { step: number; statement: string; justification: string }[];
      notes?: string;
    };
    callout?: {
      type: 'tip' | 'warning' | 'info' | 'correction';
      title: string;
      text: string;
    };
  }[];
  interactiveToolRef?: string;
  summary: string[];
  questions: QuizQuestion[];
}



class TokenizerError extends Error {
  pos: number;
  constructor(message: string, pos: number) {
    super(`${message} (at position ${pos})`);
    this.name = 'TokenizerError';
    this.pos = pos;
  }
}

function tokenize(input: string): Token[] {
  const tokens: Token[] = [];
  let i = 0;
  const len = input.length;

  while (i < len) {
    const ch = input[i];

    // Skip whitespace
    if (/\s/.test(ch)) {
      i++;
      continue;
    }

    // Parentheses & brackets
    if (ch === '(' || ch === '[' || ch === '{') {
      tokens.push({ type: 'LPAREN', value: '(', pos: i });
      i++;
      continue;
    }
    if (ch === ')' || ch === ']' || ch === '}') {
      tokens.push({ type: 'RPAREN', value: ')', pos: i });
      i++;
      continue;
    }

    // Negation: ¬, ~, !
    if (ch === '¬' || ch === '~' || ch === '!') {
      tokens.push({ type: 'NOT', value: '¬', pos: i });
      i++;
      continue;
    }

    // Conjunction: ∧, &, &&
    if (ch === '∧') {
      tokens.push({ type: 'AND', value: '∧', pos: i });
      i++;
      continue;
    }
    if (ch === '&') {
      if (i + 1 < len && input[i + 1] === '&') {
        tokens.push({ type: 'AND', value: '∧', pos: i });
        i += 2;
      } else {
        tokens.push({ type: 'AND', value: '∧', pos: i });
        i++;
      }
      continue;
    }

    // Disjunction: ∨, |
    if (ch === '∨' || ch === 'v' && (i + 1 >= len || !/[a-zA-Z]/.test(input[i + 1]))) {
      // Note: single lowercase 'v' when followed by non-alpha might be disjunction,
      // but let's be careful. Unicode ∨ is definitely OR.
      if (ch === '∨') {
        tokens.push({ type: 'OR', value: '∨', pos: i });
        i++;
        continue;
      }
    }
    if (ch === '|') {
      if (i + 1 < len && input[i + 1] === '|') {
        tokens.push({ type: 'OR', value: '∨', pos: i });
        i += 2;
      } else {
        tokens.push({ type: 'OR', value: '∨', pos: i });
        i++;
      }
      continue;
    }

    // Biconditional: ↔, <->, <=>
    if (ch === '↔') {
      tokens.push({ type: 'IFF', value: '↔', pos: i });
      i++;
      continue;
    }
    if (ch === '<') {
      if (i + 2 < len && (input.slice(i, i + 3) === '<->' || input.slice(i, i + 3) === '<=>')) {
        tokens.push({ type: 'IFF', value: '↔', pos: i });
        i += 3;
        continue;
      }
    }

    // Implication: →, ->, =>
    if (ch === '→') {
      tokens.push({ type: 'IMPLIES', value: '→', pos: i });
      i++;
      continue;
    }
    if (ch === '-' && i + 1 < len && input[i + 1] === '>') {
      tokens.push({ type: 'IMPLIES', value: '→', pos: i });
      i += 2;
      continue;
    }
    if (ch === '=' && i + 1 < len && input[i + 1] === '>') {
      tokens.push({ type: 'IMPLIES', value: '→', pos: i });
      i += 2;
      continue;
    }

    // Word tokens: NOT, AND, OR, IMPLIES, IFF or variables
    if (/[a-zA-Z]/.test(ch)) {
      let word = '';
      const startPos = i;
      while (i < len && /[a-zA-Z0-9_]/.test(input[i])) {
        word += input[i];
        i++;
      }
      const lower = word.toLowerCase();

      if (lower === 'not') {
        tokens.push({ type: 'NOT', value: '¬', pos: startPos });
      } else if (lower === 'and') {
        tokens.push({ type: 'AND', value: '∧', pos: startPos });
      } else if (lower === 'or') {
        tokens.push({ type: 'OR', value: '∨', pos: startPos });
      } else if (lower === 'implies' || lower === 'then') {
        tokens.push({ type: 'IMPLIES', value: '→', pos: startPos });
      } else if (lower === 'iff') {
        tokens.push({ type: 'IFF', value: '↔', pos: startPos });
      } else {
        // Variable name like p, q, r, s, t, p1, etc.
        tokens.push({ type: 'VAR', value: word.toLowerCase(), pos: startPos });
      }
      continue;
    }

    throw new TokenizerError(`สัญลักษณ์ที่ไม่รู้จัก: "${ch}"`, i);
  }

  tokens.push({ type: 'EOF', value: '', pos: len });
  return tokens;
}




class ParserError extends Error {
  pos: number;
  constructor(message: string, pos: number) {
    super(`${message} (ที่ตำแหน่ง ${pos})`);
    this.name = 'ParserError';
    this.pos = pos;
  }
}

class Parser {
  private tokens: Token[];
  private current = 0;

  constructor(tokens: Token[]) {
    this.tokens = tokens;
  }

  private peek(): Token {
    return this.tokens[this.current];
  }

  private isAtEnd(): boolean {
    return this.peek().type === 'EOF';
  }

  private advance(): Token {
    if (!this.isAtEnd()) this.current++;
    return this.tokens[this.current - 1];
  }

  private check(type: TokenType): boolean {
    if (this.isAtEnd()) return false;
    return this.peek().type === type;
  }

  private match(...types: TokenType[]): boolean {
    for (const type of types) {
      if (this.check(type)) {
        this.advance();
        return true;
      }
    }
    return false;
  }

  private consume(type: TokenType, errorMessage: string): Token {
    if (this.check(type)) return this.advance();
    const token = this.peek();
    throw new ParserError(errorMessage, token.pos);
  }

  public parse(): ASTNode {
    if (this.isAtEnd()) {
      throw new ParserError('ไม่พบนิพจน์ กรุณากรอกสูตรหรือประพจน์', 0);
    }
    const expr = this.biconditional();
    if (!this.isAtEnd()) {
      const extra = this.peek();
      throw new ParserError(`มีสัญลักษณ์ส่วนเกิน: "${extra.value}"`, extra.pos);
    }
    return expr;
  }

  // Biconditional: ↔ (lowest precedence, non-associative / left)
  private biconditional(): ASTNode {
    let expr = this.implication();

    while (this.match('IFF')) {
      const right = this.implication();
      expr = { type: 'IFF', left: expr, right };
    }

    return expr;
  }

  // Implication: → (right-associative: p → q → r is p → (q → r))
  private implication(): ASTNode {
    const expr = this.disjunction();

    if (this.match('IMPLIES')) {
      const right = this.implication();
      return { type: 'IMPLIES', left: expr, right };
    }

    return expr;
  }

  // Disjunction: ∨ (left-associative)
  private disjunction(): ASTNode {
    let expr = this.conjunction();

    while (this.match('OR')) {
      const right = this.conjunction();
      expr = { type: 'OR', left: expr, right };
    }

    return expr;
  }

  // Conjunction: ∧ (left-associative)
  private conjunction(): ASTNode {
    let expr = this.unary();

    while (this.match('AND')) {
      const right = this.unary();
      expr = { type: 'AND', left: expr, right };
    }

    return expr;
  }

  // Unary: ¬ (right-associative)
  private unary(): ASTNode {
    if (this.match('NOT')) {
      const operand = this.unary();
      return { type: 'NOT', operand };
    }

    return this.primary();
  }

  // Primary: variable or (expression)
  private primary(): ASTNode {
    if (this.match('VAR')) {
      const prev = this.tokens[this.current - 1];
      return { type: 'VARIABLE', name: prev.value.toLowerCase() };
    }

    if (this.match('LPAREN')) {
      const expr = this.biconditional();
      this.consume('RPAREN', 'คาดหวังวงเล็บปิด ")"');
      return expr;
    }

    const token = this.peek();
    throw new ParserError(
      `คาดหวังตัวแปรหรือวงเล็บเปิด "(" แต่พบ "${token.value || 'จุดสิ้นสุดข้อความ'}"`,
      token.pos
    );
  }
}

function parseFormula(input: string): ASTNode {
  const tokens = tokenize(input);
  const parser = new Parser(tokens);
  return parser.parse();
}

/**
 * Convert AST to clean formatted string
 */
function astToString(node: ASTNode, parentPrecedence = 0): string {
  // Precedence order: 1 = IFF, 2 = IMPLIES, 3 = OR, 4 = AND, 5 = NOT, 6 = ATOM
  switch (node.type) {
    case 'VARIABLE':
      return node.name;
    case 'NOT': {
      const inner = astToString(node.operand, 5);
      return `¬${inner}`;
    }
    case 'AND': {
      const prec = 4;
      const left = astToString(node.left, prec);
      const right = astToString(node.right, prec + 1);
      const res = `${left} ∧ ${right}`;
      return parentPrecedence > prec ? `(${res})` : res;
    }
    case 'OR': {
      const prec = 3;
      const left = astToString(node.left, prec);
      const right = astToString(node.right, prec + 1);
      const res = `${left} ∨ ${right}`;
      return parentPrecedence > prec ? `(${res})` : res;
    }
    case 'IMPLIES': {
      const prec = 2;
      const left = astToString(node.left, 5);
      const right = astToString(node.right, 2);
      const res = `${left} → ${right}`;
      return parentPrecedence > prec ? `(${res})` : res;
    }
    case 'IFF': {
      const prec = 1;
      const left = astToString(node.left, 5);
      const right = astToString(node.right, 5);
      const res = `${left} ↔ ${right}`;
      return parentPrecedence > prec ? `(${res})` : res;
    }
  }
}

/**
 * Convert AST to LaTeX string for KaTeX rendering
 */
function astToLatex(node: ASTNode, parentPrecedence = 0): string {
  switch (node.type) {
    case 'VARIABLE':
      return node.name;
    case 'NOT': {
      const inner = astToLatex(node.operand, 5);
      return `\\neg ${inner}`;
    }
    case 'AND': {
      const prec = 4;
      const left = astToLatex(node.left, prec);
      const right = astToLatex(node.right, prec + 1);
      const res = `${left} \\land ${right}`;
      return parentPrecedence > prec ? `(${res})` : res;
    }
    case 'OR': {
      const prec = 3;
      const left = astToLatex(node.left, prec);
      const right = astToLatex(node.right, prec + 1);
      const res = `${left} \\lor ${right}`;
      return parentPrecedence > prec ? `(${res})` : res;
    }
    case 'IMPLIES': {
      const prec = 2;
      const left = astToLatex(node.left, 5);
      const right = astToLatex(node.right, 2);
      const res = `${left} \\rightarrow ${right}`;
      return parentPrecedence > prec ? `(${res})` : res;
    }
    case 'IFF': {
      const prec = 1;
      const left = astToLatex(node.left, 5);
      const right = astToLatex(node.right, 5);
      const res = `${left} \\leftrightarrow ${right}`;
      return parentPrecedence > prec ? `(${res})` : res;
    }
  }
}




/**
 * Evaluates an AST node given a truth valuation for variables.
 * Safe evaluation without using eval().
 */
function evaluateAST(node: ASTNode, valuation: Valuation): boolean {
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
function extractVariables(node: ASTNode): string[] {
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

interface SubExprInfo {
  str: string;
  node: ASTNode;
}

/**
 * Extracts intermediate subexpressions in bottom-up evaluation order.
 * Excludes single variables and the root expression itself.
 */
function extractSubExpressions(root: ASTNode): SubExprInfo[] {
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





/**
 * Generate all 2^n truth valuations for given variable names.
 * Standard textbook ordering (T, F descending).
 */
function generateValuations(variables: string[]): Valuation[] {
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
function buildTruthTable(formulaStr: string): TruthTableResult {
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






/**
 * Check if two logic expressions are logically equivalent.
 */
function checkEquivalence(expr1Str: string, expr2Str: string): EquivalenceResult {
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






/**
 * Validates a propositional argument with premises P1, P2, ... Pn and conclusion C.
 * An argument is valid iff in every valuation where all premises are TRUE, the conclusion is also TRUE.
 * If invalid, collects all countervaluations (counterexamples) where all premises are TRUE but conclusion is FALSE.
 */
function evaluateArgument(
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







function assert(condition: boolean, msg: string) {
  if (!condition) {
    throw new Error(`TEST FAILED: ${msg}`);
  }
  console.log(`  ✓ ${msg}`);
}

function runAllTests() {
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


runAllTests();
