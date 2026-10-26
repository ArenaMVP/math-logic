export interface GlossaryItem {
  symbol: string;
  latex: string;
  nameEn: string;
  nameTh: string;
  meaning: string;
  example: string;
  category: 'connective' | 'quantifier' | 'meta' | 'set';
}

export const GLOSSARY_DATA: GlossaryItem[] = [
  {
    symbol: '¬, ~',
    latex: '\\neg, \\sim',
    nameEn: 'Negation',
    nameTh: 'นิเสธ (ไม่)',
    meaning: 'กลับค่าความจริงจากจริงเป็นเท็จ และจากเท็จเป็นจริง',
    example: '¬p (ไม่จริงที่ว่า p)',
    category: 'connective',
  },
  {
    symbol: '∧',
    latex: '\\land',
    nameEn: 'Conjunction',
    nameTh: 'การเชื่อม (และ)',
    meaning: 'เป็นจริงก็ต่อเมื่อประพจน์ทั้งสองเป็นจริงพร้อมกัน',
    example: 'p ∧ q (p และ q)',
    category: 'connective',
  },
  {
    symbol: '∨',
    latex: '\\lor',
    nameEn: 'Inclusive Disjunction',
    nameTh: 'การเลือกแบบครอบคลุม (หรือ)',
    meaning: 'เป็นเท็จเพียงกรณีเดียวเมื่อทั้งสองตัวเป็นเท็จพร้อมกัน ในกรณีอื่นเป็นจริงทั้งหมด',
    example: 'p ∨ q (p หรือ q หรือทั้งคู่)',
    category: 'connective',
  },
  {
    symbol: '→',
    latex: '\\to, \\rightarrow',
    nameEn: 'Material Implication',
    nameTh: 'เงื่อนไข / อิมพลิเคชัน (ถ้า...แล้ว...)',
    meaning: 'เป็นเท็จเพียงกรณีเดียวคือเมื่อเหตุเป็นจริงแต่ผลเป็นเท็จ (T → F ≡ F)',
    example: 'p → q (ถ้า p แล้ว q)',
    category: 'connective',
  },
  {
    symbol: '↔',
    latex: '\\leftrightarrow',
    nameEn: 'Biconditional',
    nameTh: 'เงื่อนไขสองทาง (ก็ต่อเมื่อ)',
    meaning: 'เป็นจริงเมื่อทั้งสองประพจน์มีค่าความจริงเหมือนกัน (T ↔ T และ F ↔ F)',
    example: 'p ↔ q (p ก็ต่อเมื่อ q)',
    category: 'connective',
  },
  {
    symbol: '≡',
    latex: '\\equiv',
    nameEn: 'Logical Equivalence',
    nameTh: 'การสมมูลกันเชิงตรรกะ',
    meaning: 'สองสูตรมีค่าความจริงตรงกันในทุกกรณี หรือ A ↔ B เป็นสัจนิรันดร์',
    example: 'p → q ≡ ¬p ∨ q',
    category: 'meta',
  },
  {
    symbol: '⊢',
    latex: '\\vdash',
    nameEn: 'Syntactic Derivability / Turnstile',
    nameTh: 'การอนุมานเชิงวากยสัมพันธ์',
    meaning: 'ข้อสรุปสามารถพิสูจน์หรืออนุมานได้จากข้อสมมติตามกฎเกณฑ์การให้เหตุผลเชิงรูปนัย',
    example: 'Γ ⊢ B (จาก Γ สามารถอนุมาน B ได้)',
    category: 'meta',
  },
  {
    symbol: '⊨',
    latex: '\\models',
    nameEn: 'Semantic Entailment / Double Turnstile',
    nameTh: 'การตามมาทางตรรกะเชิงอรรถศาสตร์',
    meaning: 'ทุก Valuation ที่ทำให้ข้อสมมติเป็นจริง จะต้องทำให้ข้อสรุปเป็นจริงด้วย',
    example: 'Γ ⊨ B (Γ ย่อมส่งผลทางตรรกะให้เกิด B)',
    category: 'meta',
  },
  {
    symbol: '∀',
    latex: '\\forall',
    nameEn: 'Universal Quantifier',
    nameTh: 'ตัวบ่งปริมาณสากล (สำหรับทุกค่า)',
    meaning: 'ข้อความเปิดเป็นจริงสำหรับสมาชิกทุกตัวในเอกภพสัมพัทธ์ U',
    example: '∀x P(x) (สำหรับทุก x, P(x) เป็นจริง)',
    category: 'quantifier',
  },
  {
    symbol: '∃',
    latex: '\\exists',
    nameEn: 'Existential Quantifier',
    nameTh: 'ตัวบ่งปริมาณมีอยู่ (มีบางค่า)',
    meaning: 'มีสมาชิกอย่างน้อย 1 ตัวในเอกภพสัมพัทธ์ U ที่ทำให้ข้อความเปิดเป็นจริง',
    example: '∃x P(x) (มี x อย่างน้อยหนึ่งตัวที่ P(x) เป็นจริง)',
    category: 'quantifier',
  },
  {
    symbol: '⊤',
    latex: '\\top',
    nameEn: 'Tautology / Verum',
    nameTh: 'สัจนิรันดร์',
    meaning: 'ประพจน์ที่มีค่าความจริงเป็นจริงในทุกกรณีเสมอ',
    example: 'p ∨ ¬p ≡ ⊤',
    category: 'meta',
  },
  {
    symbol: '⊥',
    latex: '\\bot',
    nameEn: 'Contradiction / Falsum',
    nameTh: 'ข้อขัดแย้ง',
    meaning: 'ประพจน์ที่มีค่าความจริงเป็นเท็จในทุกกรณีเสมอ',
    example: 'p ∧ ¬p ≡ ⊥',
    category: 'meta',
  },
  {
    symbol: '|',
    latex: '\\mid',
    nameEn: 'Divides',
    nameTh: 'หารลงตัว',
    meaning: 'a | b หมายถึง a หาร b ลงตัว (มีจำนวนเต็ม k ที่ b = a · k)',
    example: '6 | (n³ - n)',
    category: 'set',
  },
];
