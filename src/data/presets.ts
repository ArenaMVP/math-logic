export interface FormulaPreset {
  id: string;
  label: string;
  labelTh: string;
  formula: string;
  category: 'basic' | 'tautology' | 'equivalence' | 'pdf-example';
  description: string;
}

export const TRUTH_TABLE_PRESETS: FormulaPreset[] = [
  {
    id: 'modus-ponens',
    label: 'Modus Ponens Tautology',
    labelTh: 'สัจนิรันดร์ Modus Ponens',
    formula: '((p → q) ∧ p) → q',
    category: 'tautology',
    description: 'รากฐานของการอนุมานแบบนิรนัย: ถ้าเหตุ p → q จริง และ p จริง ย่อมบังคับให้ q จริง',
  },
  {
    id: 'exportation',
    label: 'Law of Exportation (PDF Page 16)',
    labelTh: 'กฎการส่งออก (จากเอกสารหน้า 16)',
    formula: '((p ∧ q) → r) ↔ (p → (q → r))',
    category: 'tautology',
    description: 'การรวมเงื่อนไข: (p และ q) นำไปสู่ r สมมูลกับ p นำไปสู่ (q นำไปสู่ r)',
  },
  {
    id: 'four-atom-equiv',
    label: 'Four-Variable Equivalence (PDF Page 10)',
    labelTh: 'สมมูล 4 ตัวแปร (จากเอกสารหน้า 10)',
    formula: '((p ∧ q) → (r ∨ s)) ↔ (¬p ∨ ¬q ∨ r ∨ s)',
    category: 'tautology',
    description: 'การกระจายนิเสธและการขจัดเงื่อนไขใน 4 ตัวแปร (16 แถว)',
  },
  {
    id: 'pdf-ex1',
    label: 'PDF Example 1 (Not a Tautology, Page 14)',
    labelTh: 'ตัวอย่าง 1 จากเอกสาร (หน้า 14 - ไม่เป็นสัจนิรันดร์)',
    formula: '(p ∧ q) → ((p ∨ q) → r)',
    category: 'pdf-example',
    description: 'ประพจน์มีเงื่อนไข (Contingent): เป็นเท็จเมื่อ p=T, q=T, r=F',
  },
  {
    id: 'pdf-ex3',
    label: 'PDF Example 3 Fallacy Audit (Page 15)',
    labelTh: 'การตรวจสอบตัวอย่าง 3 จากเอกสาร (หน้า 15)',
    formula: '((¬p ∧ q) → (¬q ∧ r)) → (¬r ∧ s)',
    category: 'pdf-example',
    description: 'ตัวอย่างที่ต้นฉบับสรุปผิด! แท้จริงไม่เป็นสัจนิรันดร์ มีตัวอย่างค้าน p=T, q=T, r=T, s=F',
  },
  {
    id: 'de-morgan-and',
    label: 'De Morgan Conjunction',
    labelTh: 'กฎของเดอมอร์แกนสำหรับ ∧',
    formula: '¬(p ∧ q) ↔ (¬p ∨ ¬q)',
    category: 'equivalence',
    description: 'นิเสธของข้อความ "และ" คือการ "หรือ" ของนิเสธ',
  },
  {
    id: 'contrapositive',
    label: 'Law of Contrapositive',
    labelTh: 'กฎแย้งสลับที่ (Contrapositive)',
    formula: '(p → q) ↔ (¬q → ¬p)',
    category: 'tautology',
    description: 'เงื่อนไขสมมูลกับนิเสธของผลลัพธ์นำไปสู่นิเสธของเหตุ',
  },
  {
    id: 'transitivity',
    label: 'Transitivity Tautology (PDF Page 11)',
    labelTh: 'สัจนิรันดร์การถ่ายทอด (จากเอกสารหน้า 11)',
    formula: '((p → q) ∧ (q → r)) → (p → r)',
    category: 'tautology',
    description: 'Hypothetical Syllogism ในรูปของประพจน์เงื่อนไข',
  },
];

export interface ArgumentPreset {
  id: string;
  title: string;
  titleTh: string;
  premises: string[];
  conclusion: string;
  isValid: boolean;
  sourceNote: string;
}

export const ARGUMENT_PRESETS: ArgumentPreset[] = [
  {
    id: 'proof-1-1',
    title: 'Chained Inference with 4 Atoms (Proof 1.1)',
    titleTh: 'การอนุมานลูกโซ่ 4 ตัวแปร (Proof 1.1)',
    premises: ['p → q', 'q → r', 'r → s', 'p'],
    conclusion: 's',
    isValid: true,
    sourceNote: 'จากหน้า 5 ของเอกสาร ใช้ Modus Ponens ต่อเนื่อง 3 ครั้ง',
  },
  {
    id: 'proof-1-2',
    title: 'Constructive Dilemma / Indirect Proof (Proof 1.2)',
    titleTh: 'การพิสูจน์โดยข้อขัดแย้ง 3 ตัวแปร (Proof 1.2)',
    premises: ['p ∨ q', 'p → r', 'q → r'],
    conclusion: 'r',
    isValid: true,
    sourceNote: 'จากหน้า 6 ของเอกสาร ใช้ Modus Tollens และ Disjunctive Syllogism',
  },
  {
    id: 'proof-4-1',
    title: 'Resolution with Branches (Proof 4.1)',
    titleTh: 'การอนุมานแบบแตกกิ่ง (Proof 4.1)',
    premises: ['p ∨ q', 'p → r', 'q → s', '¬r'],
    conclusion: 's',
    isValid: true,
    sourceNote: 'จากหน้า 17 ของเอกสาร MT จาก p→r, ¬r ได้ ¬p แล้ว DS ได้ q แล้ว MP ได้ s',
  },
  {
    id: 'affirming-consequent',
    title: 'Fallacy of Affirming the Consequent',
    titleTh: 'ความผิดพลาด: การยืนยันผล (Invalid)',
    premises: ['p → q', 'q'],
    conclusion: 'p',
    isValid: false,
    sourceNote: 'รูปแบบผิดพลาดคลาสสิก ตัวอย่างค้าน: p=F, q=T',
  },
  {
    id: 'denying-antecedent',
    title: 'Fallacy of Denying the Antecedent',
    titleTh: 'ความผิดพลาด: การปฏิเสธเหตุ (Invalid)',
    premises: ['p → q', '¬p'],
    conclusion: '¬q',
    isValid: false,
    sourceNote: 'รูปแบบผิดพลาดคลาสสิก ตัวอย่างค้าน: p=F, q=T',
  },
  {
    id: 'pdf-page-17-invalid',
    title: 'Document Page 17 Countermodel Example',
    titleTh: 'ตัวอย่างจากหน้า 17 ของเอกสาร',
    premises: ['p → q', 'q', 'r ∨ ¬r'],
    conclusion: 'p',
    isValid: false,
    sourceNote: 'เอกสารแสดงว่าพจน์ r ∨ ¬r ที่เป็นจริงเสมอ ไม่สามารถแก้ไขการอ้างเหตุผลที่ผิดพลาดได้ ตัวอย่างค้าน: p=F, q=T, r=F',
  },
  {
    id: 'proof-30',
    title: 'Example 3 from Page 30',
    titleTh: 'ตัวอย่าง 3 จากหน้า 30 ของเอกสาร',
    premises: ['p → (q ∨ r)', 'q → ¬s', 's'],
    conclusion: 'p → r',
    isValid: true,
    sourceNote: 'จากหน้า 30 พิสูจน์โดยสมมติให้เหตุจริงและผล p→r เป็นเท็จ พบข้อขัดแย้ง',
  },
];
