// Mathematical Logic Studio - Interactive Logic Engine
(function(global) {
  'use strict';


class TokenizerError extends Error {
  constructor(message, pos) {
    super(`${message} (at position ${pos})`);
    this.name = 'TokenizerError';
    this.pos = pos;
  }
}

function tokenize(input) {
  const tokens = [];
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
  constructor(message, pos) {
    super(`${message} (ที่ตำแหน่ง ${pos})`);
    this.name = 'ParserError';
    this.pos = pos;
  }
}

class Parser {
  tokens = [];
  current = 0;

  constructor(tokens) {
    this.tokens = tokens;
  }

  peek() {
    return this.tokens[this.current];
  }

  isAtEnd() {
    return this.peek().type === 'EOF';
  }

  advance() {
    if (!this.isAtEnd()) this.current++;
    return this.tokens[this.current - 1];
  }

  check(type) {
    if (this.isAtEnd()) return false;
    return this.peek().type === type;
  }

  match(...types) {
    for (const type of types) {
      if (this.check(type)) {
        this.advance();
        return true;
      }
    }
    return false;
  }

  consume(type, errorMessage) {
    if (this.check(type)) return this.advance();
    const token = this.peek();
    throw new ParserError(errorMessage, token.pos);
  }

  parse() {
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
  biconditional() {
    let expr = this.implication();

    while (this.match('IFF')) {
      const right = this.implication();
      expr = { type: 'IFF', left: expr, right };
    }

    return expr;
  }

  // Implication: → (right-associative: p → q → r is p → (q → r))
  implication() {
    const expr = this.disjunction();

    if (this.match('IMPLIES')) {
      const right = this.implication();
      return { type: 'IMPLIES', left: expr, right };
    }

    return expr;
  }

  // Disjunction: ∨ (left-associative)
  disjunction() {
    let expr = this.conjunction();

    while (this.match('OR')) {
      const right = this.conjunction();
      expr = { type: 'OR', left: expr, right };
    }

    return expr;
  }

  // Conjunction: ∧ (left-associative)
  conjunction() {
    let expr = this.unary();

    while (this.match('AND')) {
      const right = this.unary();
      expr = { type: 'AND', left: expr, right };
    }

    return expr;
  }

  // Unary: ¬ (right-associative)
  unary() {
    if (this.match('NOT')) {
      const operand = this.unary();
      return { type: 'NOT', operand };
    }

    return this.primary();
  }

  // Primary: variable or (expression)
  primary() {
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

function parseFormula(input) {
  const tokens = tokenize(input);
  const parser = new Parser(tokens);
  return parser.parse();
}

/**
 * Convert AST to clean formatted string
 */
function astToString(node, parentPrecedence = 0) {
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
function astToLatex(node, parentPrecedence = 0) {
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
function evaluateAST(node, valuation) {
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
function extractVariables(node) {
  const vars = new Set();

  function traverse(n) {
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


/**
 * Extracts intermediate subexpressions in bottom-up evaluation order.
 * Excludes single variables and the root expression itself.
 */
function extractSubExpressions(root) {
  const list = [];
  const seen = new Set();
  const rootStr = astToString(root);

  function traverse(n) {
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
function generateValuations(variables) {
  const n = variables.length;
  const count = 1 << n; // 2^n
  const results = [];

  for (let i = 0; i < count; i++) {
    const valuation = {};
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
function buildTruthTable(formulaStr) {
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

  const rows = valuations.map((val, idx) => {
    const intermediates = {};
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

  let classification = 'contingent';
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
function checkEquivalence(expr1Str, expr2Str) {
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
  const counterexamples = [];

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
  premisesInput,
  conclusionInput
) {
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
  const varSet = new Set();
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
  const counterexamples = [];

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









  global.LogicEngine = {
    tokenize,
    Parser,
    parse: parseFormula,
    evaluate: evaluateAST,
    extractVariables,
    extractSubExpressions,
    generateValuations,
    generateTruthTable: buildTruthTable,
    checkEquivalence,
    checkArgumentValidity: evaluateArgument,
    astToString,
    astToLatex
  };
})(typeof window !== 'undefined' ? window : global);
