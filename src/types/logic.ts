// Logic Engine and Application Types

export type TokenType =
  | 'VAR'
  | 'NOT'
  | 'AND'
  | 'OR'
  | 'IMPLIES'
  | 'IFF'
  | 'LPAREN'
  | 'RPAREN'
  | 'EOF';

export interface Token {
  type: TokenType;
  value: string;
  pos: number;
}

export type ASTNodeType =
  | 'VARIABLE'
  | 'NOT'
  | 'AND'
  | 'OR'
  | 'IMPLIES'
  | 'IFF';

export interface VariableNode {
  type: 'VARIABLE';
  name: string;
}

export interface NotNode {
  type: 'NOT';
  operand: ASTNode;
}

export interface BinaryNode {
  type: 'AND' | 'OR' | 'IMPLIES' | 'IFF';
  left: ASTNode;
  right: ASTNode;
}

export type ASTNode = VariableNode | NotNode | BinaryNode;

export type Valuation = Record<string, boolean>;

export interface IntermediateStep {
  formulaStr: string;
  node: ASTNode;
}

export interface TruthTableRow {
  id: number;
  valuation: Record<string, boolean>;
  intermediates: Record<string, boolean>;
  result: boolean;
}

export type FormulaClassification = 'tautology' | 'contradiction' | 'contingent';

export interface TruthTableResult {
  variables: string[];
  subExpressions: string[];
  rows: TruthTableRow[];
  classification: FormulaClassification;
  trueCount: number;
  falseCount: number;
  totalRows: number;
  formula: string;
}

export interface EquivalenceResult {
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

export interface ArgumentEvaluationResult {
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
export interface ChapterProgress {
  chapterId: number;
  completed: boolean;
  lastVisited: string;
  score: number;
  maxScore: number;
}

export interface UserProgressState {
  completedChapters: number[];
  chapterScores: Record<number, number>;
  lastActiveChapter: number;
  completedQuizzes: Record<number, boolean>;
  completedTools: string[];
  updatedAt: string;
}

// Quiz & Exercises
export type QuestionType =
  | 'multiple_choice'
  | 'true_false'
  | 'truth_table_fill'
  | 'inference_rule'
  | 'proof_step';

export interface QuizQuestion {
  id: string;
  type: QuestionType;
  prompt: string;
  promptLatex?: string;
  options?: { id: string; text: string; latex?: string }[];
  correctAnswer: string | boolean;
  explanation: string;
  hint?: string;
}

export interface ChapterData {
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
