import { ASTNode, Token, TokenType } from '../types/logic';
import { tokenize, TokenizerError } from './tokenizer';

export class ParserError extends Error {
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

export function parseFormula(input: string): ASTNode {
  const tokens = tokenize(input);
  const parser = new Parser(tokens);
  return parser.parse();
}

/**
 * Convert AST to clean formatted string
 */
export function astToString(node: ASTNode, parentPrecedence = 0): string {
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
export function astToLatex(node: ASTNode, parentPrecedence = 0): string {
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
