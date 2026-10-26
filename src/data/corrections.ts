export interface ErrataItem {
  id: string;
  pageNumber: number;
  originalText: string;
  issueType: 'mathematical_fallacy' | 'typographical_error' | 'translation_artifact' | 'incomplete_proof';
  titleTh: string;
  descriptionTh: string;
  correctionLatex?: string;
  correctedTextTh: string;
}

export const PDF_CORRECTIONS_DATA: ErrataItem[] = [
  {
    id: 'errata-page-15',
    pageNumber: 15,
    originalText: 'example3 : Pove that [(~ p ∧ q) → (~ q ∧ r)] → (~ r ∧ s) is a tautology ... Answer: The proposition is a Tautology (always True)',
    issueType: 'mathematical_fallacy',
    titleTh: 'ข้อผิดพลาดทางคณิตศาสตร์: การสรุปสัจนิรันดร์ผิดพลาดจากการแตกกิ่งตรรกะไม่ครบ (Example 3)',
    descriptionTh: `ในเอกสารหน้า 15 ผู้จัดทำได้สมมติให้นิพจน์ทั้งหมดมีค่าเป็น False เพื่อพิสูจน์ทางอ้อม โดยตั้งว่า:
1. [(~p ∧ q) → (~q ∧ r)] ≡ True
2. (~r ∧ s) ≡ False

จากนั้นผู้จัดทำได้ "ทึกทักสมมติเอาเอง" ในบรรทัดต่อมาว่า:
Assume (~p ∧ q) ≡ True แล้วจึงพบข้อขัดแย้ง

แต่ตามหลักตรรกศาสตร์เชิงประพจน์ เงื่อนไข A → B เป็นจริงได้ 2 กรณีใหญ่:
- กรณีที่ 1: A เป็น True และ B เป็น True
- กรณีที่ 2: A เป็น False (โดยที่ B จะเป็น True หรือ False ก็ได้)

ผู้จัดทำละเลยกรณีที่ 2 อย่างสิ้นเชิง! เมื่อเราเลือกให้ p=T, q=T, r=T, s=F จะได้ว่า:
- (~p ∧ q) = (F ∧ T) = False
- ด้านซ้าย: False → (~q ∧ r) มีค่าเป็น True!
- ด้านขวา: (~r ∧ s) = (F ∧ F) = False!
- ประพจน์รวม: True → False = False!
ดังนั้น ประพจน์นี้ **ไม่เป็นสัจนิรันดร์**`,
    correctionLatex: '[(\\neg p \\land q) \\to (\\neg q \\land r)] \\to (\\neg r \\land s) \\quad \\text{is CONTINGENT (Not a Tautology)}',
    correctedTextTh: 'ได้ทำการแก้ไขในเครื่องมือตรวจสอบสัจนิรันดร์และเนื้อหาบทที่ 3 โดยชี้แจงตัวอย่างค้าน p=T, q=T, r=T, s=F ที่ทำให้ค่าความจริงกลายเป็น False อย่างชัดเจน',
  },
  {
    id: 'errata-page-26',
    pageNumber: 26,
    originalText: '[(p ∨ q ∨ ~r) ∧ (~p ∨ q ∨ r) ∧ (p ∧ ~q ∨ r)] → (p ∧ q) ... C = (p ∨ ~q ∨ r)',
    issueType: 'typographical_error',
    titleTh: 'ข้อผิดพลาดการพิมพ์: สัญลักษณ์ ∧ ในหัวข้อโจทย์ไม่ตรงกับนิยาม C (หน้า 26)',
    descriptionTh: `ที่หัวข้อโจทย์หน้า 26 เขียนพจน์ที่สามเป็น (p ∧ ~q ∨ r) ซึ่งกำกวมและใช้ตัวเชื่อม ∧ ร่วมกับ ∨ แต่ในบรรทัดถัดมาที่กำหนดตัวแปรช่วย กลับนิยามเป็น:
C = (p ∨ ~q ∨ r)
ซึ่งเป็นรูปสามตัวเชื่อม ∨ (Disjunctive Clause ใน 3-CNF) ที่สอดคล้องกับพจน์ A และ B`,
    correctionLatex: '[(p \\lor q \\lor \\neg r) \\land (\\neg p \\lor q \\lor r) \\land (p \\lor \\neg q \\lor r)] \\to (p \\land q)',
    correctedTextTh: 'แก้ไขสัญลักษณ์ในหัวข้อให้เป็น ∨ ให้ตรงกับขั้นตอนการกระจายและแก้โจทย์ตลอดทั้งหน้า',
  },
  {
    id: 'errata-page-28',
    pageNumber: 28,
    originalText: '6 / (n³ - n) for every positive integer n',
    issueType: 'typographical_error',
    titleTh: 'การใช้สัญลักษณ์การหารลงตัวผิดรูป: เขียนเครื่องหมายเศษส่วนแทนเครื่องหมายหารลงตัว',
    descriptionTh: 'เอกสารใช้เครื่องหมายขีดคั่นแนวนอนหรือเศษส่วน 6/(n³-n) ซึ่งในทางคณิตศาสตร์หมายถึงเศษ 6 ส่วน (n³-n) แต่ความหมายที่แท้จริงของโจทย์คือ "6 หาร n³ - n ลงตัว"',
    correctionLatex: '6 \\mid (n^3 - n) \\quad \\text{หรือ} \\quad n^3 - n \\equiv 0 \\pmod{6}',
    correctedTextTh: 'ปรับปรุงการแสดงผลในบทที่ 6 ให้ใช้สัญลักษณ์ 6 | (n³ - n) ตามมาตรฐานสากล พร้อมระบุคำอธิบายทางคณิตศาสตร์อย่างถูกต้อง',
  },
  {
    id: 'errata-page-29',
    pageNumber: 29,
    originalText: 'Example 2 Prove by mathematical induction ... Proof Inductive Hypothesis (n=k) ...',
    issueType: 'incomplete_proof',
    titleTh: 'การพิสูจน์ไม่สมบูรณ์: ขาดขั้นตอนกรณีฐาน (Base Case) ในการพิสูจน์ผลบวกกำลังสาม',
    descriptionTh: 'เอกสารหน้า 29 กระโดดข้ามกรณีฐาน n=1 ไปยังสมมติฐานอุปนัย n=k ทันที ซึ่งตามหลัก Principle of Mathematical Induction (PMI) หากไม่มีกรณีฐาน การพิสูจน์จะไม่สามารถสรุปผลได้เลย (โดมิโนตัวแรกไม่ได้ถูกผลัก)',
    correctionLatex: '\\text{Base Case } (n=1): 1^3 = 1 = \\left[\\frac{1(1+1)}{2}\\right]^2 = 1^2 = 1 \\quad (\\text{True})',
    correctedTextTh: 'เพิ่มขั้นตอนกรณีฐาน n=1 ให้ครบถ้วนสมบูรณ์ในบทที่ 6 และใน Induction Lab',
  },
  {
    id: 'errata-translation-artifacts',
    pageNumber: 27,
    originalText: '"Instead of value ... in the price", "Go instead on the shore", "It\'s not eternal"',
    issueType: 'translation_artifact',
    titleTh: 'ข้อสังเกตด้านภาษา: ร่องรอยการแปลอัตโนมัติ (Machine Translation Artifacts)',
    descriptionTh: `ในเอกสารต้นฉบับภาษาอังกฤษ มีหลายจุดที่เกิดจากการใช้เครื่องมือแปลภาษาอัตโนมัติจากภาษาไทย เช่น:
- "Instead of value ... in the price" มาจากคำว่า "แทนค่า... ในสมการ/ประพจน์" (คำว่า "ค่า" ถูกแปลตรงตัวเป็น value/price)
- "Go instead on the shore" มาจากคำว่า "นำไปแทนค่าในอีกฝั่ง" (คำว่า "ฝั่ง" ถูกแปลเป็น shore)
- "It's not eternal" มาจากคำว่า "ไม่เป็นสัจนิรันดร์" (คำว่า "สัจนิรันดร์" ถูกแปลตามรากศัพท์ว่า eternal แทนที่จะเป็น tautology)`,
    correctedTextTh: 'เว็บไซต์นี้ได้ปรับแก้คำศัพท์ทั้งหมดให้เป็นศัพท์บัญญัติทางคณิตศาสตร์และตรรกศาสตร์ที่ได้มาตรฐานสากล (Tautology, Substitute truth values into the expression)',
  },
];
