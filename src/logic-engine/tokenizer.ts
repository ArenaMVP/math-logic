import { Token, TokenType } from '../types/logic';

export class TokenizerError extends Error {
  pos: number;
  constructor(message: string, pos: number) {
    super(`${message} (at position ${pos})`);
    this.name = 'TokenizerError';
    this.pos = pos;
  }
}

export function tokenize(input: string): Token[] {
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
