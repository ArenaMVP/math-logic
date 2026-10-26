"""
Mathematical Logic Engine
A pure Python, safe recursive-descent AST parser and semantic evaluator for propositional logic.
Zero eval(), full operator precedence, sub-expression extraction, and truth table generation.
"""

from __future__ import annotations
import re
from typing import List, Dict, Set, Tuple, Any, Optional

# --- AST Nodes ---

class ASTNode:
    def evaluate(self, valuation: Dict[str, bool]) -> bool:
        raise NotImplementedError

    def to_string(self) -> str:
        raise NotImplementedError

    def to_latex(self) -> str:
        raise NotImplementedError

    def get_variables(self) -> Set[str]:
        raise NotImplementedError

    def collect_subexpressions(self) -> List[ASTNode]:
        """Returns subexpressions in topological order (bottom-up)."""
        nodes: List[ASTNode] = []
        self._collect_into(nodes)
        # Deduplicate while preserving order
        unique: List[ASTNode] = []
        seen = set()
        for n in nodes:
            s = n.to_string()
            if s not in seen:
                seen.add(s)
                unique.append(n)
        return unique

    def _collect_into(self, acc: List[ASTNode]):
        raise NotImplementedError

    def __eq__(self, other):
        return isinstance(other, ASTNode) and self.to_string() == other.to_string()

    def __hash__(self):
        return hash(self.to_string())


class Var(ASTNode):
    def __init__(self, name: str):
        self.name = name.upper()

    def evaluate(self, valuation: Dict[str, bool]) -> bool:
        if self.name in valuation:
            return valuation[self.name]
        # Constants
        if self.name in ("T", "TRUE", "1"):
            return True
        if self.name in ("F", "FALSE", "0"):
            return False
        raise KeyError(f"Variable '{self.name}' not found in valuation: {valuation}")

    def to_string(self) -> str:
        return self.name

    def to_latex(self) -> str:
        return self.name

    def get_variables(self) -> Set[str]:
        if self.name in ("T", "TRUE", "1", "F", "FALSE", "0"):
            return set()
        return {self.name}

    def _collect_into(self, acc: List[ASTNode]):
        acc.append(self)


class Not(ASTNode):
    def __init__(self, operand: ASTNode):
        self.operand = operand

    def evaluate(self, valuation: Dict[str, bool]) -> bool:
        return not self.operand.evaluate(valuation)

    def to_string(self) -> str:
        inner = self.operand.to_string()
        if isinstance(self.operand, (And, Or, Imply, Iff)):
            return f"¬({inner})"
        return f"¬{inner}"

    def to_latex(self) -> str:
        inner = self.operand.to_latex()
        if isinstance(self.operand, (And, Or, Imply, Iff)):
            return f"\\neg ({inner})"
        return f"\\neg {inner}"

    def get_variables(self) -> Set[str]:
        return self.operand.get_variables()

    def _collect_into(self, acc: List[ASTNode]):
        self.operand._collect_into(acc)
        acc.append(self)


class And(ASTNode):
    def __init__(self, left: ASTNode, right: ASTNode):
        self.left = left
        self.right = right

    def evaluate(self, valuation: Dict[str, bool]) -> bool:
        return self.left.evaluate(valuation) and self.right.evaluate(valuation)

    def to_string(self) -> str:
        l = self._wrap(self.left, (Or, Imply, Iff))
        r = self._wrap(self.right, (Or, Imply, Iff))
        return f"{l} ∧ {r}"

    def to_latex(self) -> str:
        l = self._wrap_latex(self.left, (Or, Imply, Iff))
        r = self._wrap_latex(self.right, (Or, Imply, Iff))
        return f"{l} \\land {r}"

    def get_variables(self) -> Set[str]:
        return self.left.get_variables() | self.right.get_variables()

    def _collect_into(self, acc: List[ASTNode]):
        self.left._collect_into(acc)
        self.right._collect_into(acc)
        acc.append(self)

    def _wrap(self, node: ASTNode, types) -> str:
        s = node.to_string()
        return f"({s})" if isinstance(node, types) else s

    def _wrap_latex(self, node: ASTNode, types) -> str:
        s = node.to_latex()
        return f"({s})" if isinstance(node, types) else s


class Or(ASTNode):
    def __init__(self, left: ASTNode, right: ASTNode):
        self.left = left
        self.right = right

    def evaluate(self, valuation: Dict[str, bool]) -> bool:
        return self.left.evaluate(valuation) or self.right.evaluate(valuation)

    def to_string(self) -> str:
        l = self._wrap(self.left, (Imply, Iff))
        r = self._wrap(self.right, (Imply, Iff))
        return f"{l} ∨ {r}"

    def to_latex(self) -> str:
        l = self._wrap_latex(self.left, (Imply, Iff))
        r = self._wrap_latex(self.right, (Imply, Iff))
        return f"{l} \\lor {r}"

    def get_variables(self) -> Set[str]:
        return self.left.get_variables() | self.right.get_variables()

    def _collect_into(self, acc: List[ASTNode]):
        self.left._collect_into(acc)
        self.right._collect_into(acc)
        acc.append(self)

    def _wrap(self, node: ASTNode, types) -> str:
        s = node.to_string()
        return f"({s})" if isinstance(node, types) else s

    def _wrap_latex(self, node: ASTNode, types) -> str:
        s = node.to_latex()
        return f"({s})" if isinstance(node, types) else s


class Imply(ASTNode):
    def __init__(self, left: ASTNode, right: ASTNode):
        self.left = left
        self.right = right

    def evaluate(self, valuation: Dict[str, bool]) -> bool:
        l = self.left.evaluate(valuation)
        r = self.right.evaluate(valuation)
        return (not l) or r

    def to_string(self) -> str:
        l = self._wrap(self.left, (Iff,))
        r = self._wrap(self.right, (Iff,))
        return f"{l} → {r}"

    def to_latex(self) -> str:
        l = self._wrap_latex(self.left, (Iff,))
        r = self._wrap_latex(self.right, (Iff,))
        return f"{l} \\rightarrow {r}"

    def get_variables(self) -> Set[str]:
        return self.left.get_variables() | self.right.get_variables()

    def _collect_into(self, acc: List[ASTNode]):
        self.left._collect_into(acc)
        self.right._collect_into(acc)
        acc.append(self)

    def _wrap(self, node: ASTNode, types) -> str:
        s = node.to_string()
        return f"({s})" if isinstance(node, types) else s

    def _wrap_latex(self, node: ASTNode, types) -> str:
        s = node.to_latex()
        return f"({s})" if isinstance(node, types) else s


class Iff(ASTNode):
    def __init__(self, left: ASTNode, right: ASTNode):
        self.left = left
        self.right = right

    def evaluate(self, valuation: Dict[str, bool]) -> bool:
        return self.left.evaluate(valuation) == self.right.evaluate(valuation)

    def to_string(self) -> str:
        return f"{self.left.to_string()} ↔ {self.right.to_string()}"

    def to_latex(self) -> str:
        return f"{self.left.to_latex()} \\leftrightarrow {self.right.to_latex()}"

    def get_variables(self) -> Set[str]:
        return self.left.get_variables() | self.right.get_variables()

    def _collect_into(self, acc: List[ASTNode]):
        self.left._collect_into(acc)
        self.right._collect_into(acc)
        acc.append(self)


# --- Tokenizer and Parser ---

class Token:
    def __init__(self, type_: str, value: str):
        self.type = type_
        self.value = value

    def __repr__(self):
        return f"Token({self.type}, '{self.value}')"


def tokenize(text: str) -> List[Token]:
    tokens: List[Token] = []
    i = 0
    n = len(text)
    while i < n:
        c = text[i]
        if c.isspace():
            i += 1
            continue

        # Multi-char operators
        if text.startswith("<->", i) or text.startswith("<=>", i) or c == '↔':
            tokens.append(Token("IFF", "↔"))
            i += 1 if c == '↔' else 3
            continue

        if text.startswith("->", i) or text.startswith("=>", i) or c == '→':
            tokens.append(Token("IMPLY", "→"))
            i += 1 if c == '→' else 2
            continue

        # Single char connectives
        if c in ('~', '!', '¬'):
            tokens.append(Token("NOT", "¬"))
            i += 1
            continue

        if c in ('&', '^', '∧'):
            tokens.append(Token("AND", "∧"))
            i += 1
            continue

        if c in ('|', '∨') or (c in ('v', 'V') and (i + 1 == n or not text[i+1].isalnum())):
            tokens.append(Token("OR", "∨"))
            i += 1
            continue

        if c in ('(', '['):
            tokens.append(Token("LPAREN", "("))
            i += 1
            continue

        if c in (')', ']'):
            tokens.append(Token("RPAREN", ")"))
            i += 1
            continue

        # Identifier / Variable
        if c.isalpha() or c == '_':
            start = i
            while i < n and (text[i].isalnum() or text[i] == '_'):
                i += 1
            name = text[start:i]
            # Check for textual keywords
            low = name.lower()
            if low == "not":
                tokens.append(Token("NOT", "¬"))
            elif low == "and":
                tokens.append(Token("AND", "∧"))
            elif low == "or":
                tokens.append(Token("OR", "∨"))
            elif low in ("implies", "then"):
                tokens.append(Token("IMPLY", "→"))
            elif low in ("iff", "equiv"):
                tokens.append(Token("IFF", "↔"))
            else:
                tokens.append(Token("VAR", name.upper()))
            continue

        raise ValueError(f"Unexpected character in logic expression: '{c}' at position {i}")

    tokens.append(Token("EOF", ""))
    return tokens


class Parser:
    """
    Grammar (precedence lowest to highest):
    expr        ::= iff
    iff         ::= imply ( '↔' imply )*
    imply       ::= or ( '→' imply )?      (Right associative)
    or          ::= and ( '∨' and )*
    and         ::= not_expr ( '∧' not_expr )*
    not_expr    ::= '¬' not_expr | atom
    atom        ::= VAR | '(' expr ')'
    """
    def __init__(self, tokens: List[Token]):
        self.tokens = tokens
        self.pos = 0

    def current(self) -> Token:
        return self.tokens[self.pos]

    def consume(self, expected_type: Optional[str] = None) -> Token:
        tok = self.current()
        if expected_type and tok.type != expected_type:
            raise ValueError(f"Expected {expected_type} but got {tok.type} ('{tok.value}')")
        self.pos += 1
        return tok

    def parse(self) -> ASTNode:
        node = self.expr()
        if self.current().type != "EOF":
            raise ValueError(f"Unexpected token after expression: '{self.current().value}'")
        return node

    def expr(self) -> ASTNode:
        return self.iff()

    def iff(self) -> ASTNode:
        left = self.imply()
        while self.current().type == "IFF":
            self.consume("IFF")
            right = self.imply()
            left = Iff(left, right)
        return left

    def imply(self) -> ASTNode:
        left = self.or_expr()
        if self.current().type == "IMPLY":
            self.consume("IMPLY")
            right = self.imply()  # Right-associative
            return Imply(left, right)
        return left

    def or_expr(self) -> ASTNode:
        left = self.and_expr()
        while self.current().type == "OR":
            self.consume("OR")
            right = self.and_expr()
            left = Or(left, right)
        return left

    def and_expr(self) -> ASTNode:
        left = self.not_expr()
        while self.current().type == "AND":
            self.consume("AND")
            right = self.not_expr()
            left = And(left, right)
        return left

    def not_expr(self) -> ASTNode:
        if self.current().type == "NOT":
            self.consume("NOT")
            operand = self.not_expr()
            return Not(operand)
        return self.atom()

    def atom(self) -> ASTNode:
        tok = self.current()
        if tok.type == "VAR":
            self.consume("VAR")
            return Var(tok.value)
        elif tok.type == "LPAREN":
            self.consume("LPAREN")
            node = self.expr()
            self.consume("RPAREN")
            return node
        raise ValueError(f"Expected variable or '(', but found '{tok.value}'")


def parse_expression(expr_str: str) -> ASTNode:
    tokens = tokenize(expr_str)
    return Parser(tokens).parse()


# --- Logic Services ---

def generate_truth_table(expr_str: str) -> Dict[str, Any]:
    """
    Parses formula and returns complete truth table data including:
    - variables sorted alphabetically
    - subexpression ASTs
    - rows: list of dicts {col_name: bool}
    - classification: 'Tautology' | 'Contradiction' | 'Contingent'
    - latex: representation for KaTeX
    """
    ast = parse_expression(expr_str)
    variables = sorted(list(ast.get_variables()))
    
    # Collect all sub-expressions
    sub_nodes = ast.collect_subexpressions()
    # Separate variables from composite sub-expressions
    composite_subs = [node for node in sub_nodes if not isinstance(node, Var)]
    
    # Generate 2^n valuations (lexicographic T first: True, False)
    n = len(variables)
    total_rows = 1 << n
    rows = []
    
    true_count = 0
    false_count = 0
    
    for i in range(total_rows):
        valuation: Dict[str, bool] = {}
        row_dict: Dict[str, Any] = {}
        
        # Standard logic truth table order: first half True, second half False
        for bit_idx, var_name in enumerate(variables):
            val = not bool((i >> (n - 1 - bit_idx)) & 1)
            valuation[var_name] = val
            row_dict[var_name] = val
            
        # Evaluate composite sub-expressions
        for sub in composite_subs:
            col_name = sub.to_string()
            val = sub.evaluate(valuation)
            row_dict[col_name] = val
            
        main_val = ast.evaluate(valuation)
        if main_val:
            true_count += 1
        else:
            false_count += 1
            
        row_dict["_main_"] = main_val
        row_dict["_valuation_"] = valuation
        rows.append(row_dict)
        
    if false_count == 0:
        classification = "Tautology"
        class_desc = "สัจนิรันดร์ (จริงทุกกรณี)"
        class_color = "success"
    elif true_count == 0:
        classification = "Contradiction"
        class_desc = "ข้อขัดแย้ง (เท็จทุกกรณี)"
        class_color = "danger"
    else:
        classification = "Contingent"
        class_desc = "ประพจน์ตามเงื่อนไข (มีทั้งจริงและเท็จ)"
        class_color = "warning"
        
    return {
        "expression": ast.to_string(),
        "latex": ast.to_latex(),
        "variables": variables,
        "subexpressions": [sub.to_string() for sub in composite_subs],
        "rows": rows,
        "total_rows": total_rows,
        "classification": classification,
        "class_desc": class_desc,
        "class_color": class_color,
        "true_count": true_count,
        "false_count": false_count,
    }


def check_equivalence(expr1_str: str, expr2_str: str) -> Dict[str, Any]:
    """
    Checks if expr1 ≡ expr2 by comparing truth values on all combined valuations.
    Returns:
    - is_equivalent: bool
    - variables: list
    - rows: list of comparisons
    - countermodels: list of valuations where results disagree
    """
    ast1 = parse_expression(expr1_str)
    ast2 = parse_expression(expr2_str)
    
    variables = sorted(list(ast1.get_variables() | ast2.get_variables()))
    n = len(variables)
    total_rows = 1 << n
    
    rows = []
    countermodels = []
    
    for i in range(total_rows):
        val: Dict[str, bool] = {}
        for bit_idx, var_name in enumerate(variables):
            val[var_name] = not bool((i >> (n - 1 - bit_idx)) & 1)
            
        v1 = ast1.evaluate(val)
        v2 = ast2.evaluate(val)
        same = (v1 == v2)
        
        row_item = {
            "valuation": val,
            "v1": v1,
            "v2": v2,
            "match": same
        }
        rows.append(row_item)
        
        if not same:
            countermodels.append({
                "valuation": val,
                "v1": v1,
                "v2": v2
            })
            
    is_equiv = (len(countermodels) == 0)
    return {
        "expr1": ast1.to_string(),
        "expr2": ast2.to_string(),
        "expr1_latex": ast1.to_latex(),
        "expr2_latex": ast2.to_latex(),
        "variables": variables,
        "rows": rows,
        "is_equivalent": is_equiv,
        "countermodels": countermodels,
    }


def check_argument_validity(premises: List[str], conclusion_str: str) -> Dict[str, Any]:
    """
    Checks if an argument P1, P2, ... Pk ⊢ C is logically valid.
    Argument is valid iff whenever ALL premises are True, Conclusion MUST be True.
    Equivalently, (P1 ∧ P2 ∧ ... ∧ Pk) → C is a Tautology.
    """
    premise_asts = [parse_expression(p) for p in premises if p.strip()]
    conclusion_ast = parse_expression(conclusion_str)
    
    all_vars = set(conclusion_ast.get_variables())
    for p in premise_asts:
        all_vars |= p.get_variables()
    variables = sorted(list(all_vars))
    
    n = len(variables)
    total_rows = 1 << n
    
    rows = []
    critical_rows = []
    counterexamples = []
    
    for i in range(total_rows):
        val: Dict[str, bool] = {}
        for bit_idx, var_name in enumerate(variables):
            val[var_name] = not bool((i >> (n - 1 - bit_idx)) & 1)
            
        p_vals = [p.evaluate(val) for p in premise_asts]
        all_prem_true = all(p_vals)
        c_val = conclusion_ast.evaluate(val)
        
        # Row validity condition: (P1 & ... & Pk) -> C
        cond_val = (not all_prem_true) or c_val
        
        row_data = {
            "valuation": val,
            "premise_vals": p_vals,
            "all_premises_true": all_prem_true,
            "conclusion_val": c_val,
            "conditional_val": cond_val
        }
        rows.append(row_data)
        
        if all_prem_true:
            critical_rows.append(row_data)
            if not c_val:
                counterexamples.append(row_data)
                
    is_valid = (len(counterexamples) == 0)
    
    # Combined formula string
    if len(premise_asts) > 1:
        prem_str = " ∧ ".join(f"({p.to_string()})" for p in premise_asts)
    elif len(premise_asts) == 1:
        prem_str = premise_asts[0].to_string()
    else:
        prem_str = "T"
    full_conditional = f"({prem_str}) → ({conclusion_ast.to_string()})"
    
    return {
        "premises": [p.to_string() for p in premise_asts],
        "conclusion": conclusion_ast.to_string(),
        "variables": variables,
        "total_rows": total_rows,
        "rows": rows,
        "critical_rows": critical_rows,
        "counterexamples": counterexamples,
        "is_valid": is_valid,
        "full_conditional": full_conditional
    }
