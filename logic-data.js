// Mathematical Logic Studio - Data Bundle

window.CHAPTERS_DATA = [
  {
    id: 1,
    title: 'Introduction to Mathematical Logic',
    titleTh: 'บทนำสู่ตรรกศาสตร์ทางคณิตศาสตร์',
    subtitle: 'รากฐานของโครงสร้างการให้เหตุผล ประพจน์ ค่าความจริง วากยสัมพันธ์ และอรรถศาสตร์',
    readingTime: '15 นาที',
    objectives: [
      'เข้าใจความหมายและบทบาทของตรรกศาสตร์ทางคณิตศาสตร์ในฐานะโครงสร้างของการให้เหตุผลที่สมเหตุสมผล',
      'จำแนกประพจน์ (Proposition) ประพจน์อะตอม (Atomic Proposition) และประพจน์เชิงประกอบ (Compound Proposition)',
      'แยกแยะระหว่างวากยสัมพันธ์ (Syntax) กับอรรถศาสตร์ (Semantics)',
      'เข้าใจความแตกต่างระหว่าง Satisfiability (การทำให้เป็นจริงได้) กับ Validity (ความสมเหตุสมผล/สัจนิรันดร์)',
      'เข้าใจความสัมพันธ์ระหว่างการตามมาทางตรรกะ (Semantic Entailment: ⊨) และการอนุมาน (Syntactic Derivation: ⊢)',
    ],
    sections: [
      {
        id: '1-1-definition',
        heading: '1.1 Definitions and Central Ideas',
        headingTh: 'คำนิยามและแนวคิดสำคัญ',
        content: `**ตรรกศาสตร์ทางคณิตศาสตร์ (Mathematical Logic)** คือการศึกษารูปแบบและโครงสร้างเชิงรูปนัย (Formal Structure) ของการให้เหตุผลที่ถูกต้อง โดยไม่ขึ้นกับเนื้อหาเชิงประจักษ์ว่าข้อความนั้นกำลังกล่าวถึงเรื่องจริงในชีวิตประจำวันหรือไม่

**ประพจน์ (Proposition)** คือ ประโยคบอกเล่าหรือปฏิเสธที่มีค่าความจริง (Truth Value) เป็นจริง (True: T) หรือเป็นเท็จ (False: F) เพียงอย่างใดอย่างหนึ่งเท่านั้น จะเป็นทั้งจริงและเท็จพร้อมกันไม่ได้ และไม่คลุมเครือ

* **ประพจน์อะตอม (Atomic Proposition):** ประพจน์พื้นฐานที่ไม่สามารถแยกย่อยเป็นประพจน์ที่เล็กกว่าได้ นิยมแทนด้วยตัวแปร $p, q, r, s, t$
* **ประพจน์เชิงประกอบ (Compound Proposition):** ประพจน์ที่เกิดจากการนำประพจน์อะตอมมาเชื่อมกันด้วยตัวเชื่อมทางตรรกศาสตร์ เช่น นิเสธ, และ, หรือ, ถ้า...แล้ว..., ก็ต่อเมื่อ`,
        latexSnippets: [
          'p, q, r, s, t \\in \\text{Atomic Propositions}',
          '\\text{Truth Values} = \\{T, F\\}',
        ],
      },
      {
        id: '1-2-syntax-semantics',
        heading: '1.2 Syntax vs. Semantics',
        headingTh: 'วากยสัมพันธ์และอรรถศาสตร์',
        content: `ในตรรกศาสตร์เชิงรูปนัย มีการแบ่งแยกชัดเจนระหว่างสองระดับ:

1. **วากยสัมพันธ์ (Syntax):** กฎเกณฑ์ที่กำหนดว่าสายอักขระหรือสูตรใดเป็น **สูตรที่สร้างขึ้นอย่างถูกต้อง (Well-Formed Formula: WFF)** โดยพิจารณาเฉพาะไวยากรณ์และลำดับของสัญลักษณ์ เช่น $(p \\land q) \\to r$ เป็น WFF ในขณะที่ $p \\land \\to q$ ไม่เป็น WFF
2. **อรรถศาสตร์ (Semantics):** การให้ความหมายและการกำหนดค่าความจริงให้แก่สูตร ผ่าน **การกำหนดค่าความจริง (Valuation หรือ Truth Assignment: $v$)** เช่น $v(p) = T, v(q) = F$`,
        callout: {
          type: 'info',
          title: 'ข้อสังเกตสำคัญด้านอรรถศาสตร์',
          text: 'สูตรหนึ่งสูตรอาจมีค่าความจริงเป็นจริงใน Valuation หนึ่ง และเป็นเท็จในอีก Valuation หนึ่ง ขึ้นอยู่กับการตีความตัวแปรอะตอม',
        },
      },
      {
        id: '1-3-satisfiability-validity',
        heading: '1.3 Satisfiability, Validity, Entailment & Derivation',
        headingTh: 'ความสามารถทำให้เป็นจริง ความสมเหตุสมผล และการอนุมาน',
        content: `* **Satisfiability (การทำให้เป็นจริงได้):** สูตร $A$ เรียกว่า Satisfiable ก็ต่อเมื่อมี Valuation อย่างน้อย 1 ชุดที่ทำให้ $A$ มีค่าความจริงเป็น True
* **Validity (ความสมเหตุสมผล / สัจนิรันดร์):** สูตร $A$ เรียกว่า Valid ก็ต่อเมื่อ $A$ มีค่าความจริงเป็น True ภายใต้ *ทุกๆ* Valuation ที่เป็นไปได้
* **Semantic Entailment (การตามมาทางตรรกะ: $\\Gamma \\models B$):** เซตของสูตร $\\Gamma$ จะ Entail ข้อความ $B$ ก็ต่อเมื่อไม่มี Valuation ใดเลยที่ทำให้ทุกสูตรใน $\\Gamma$ เป็นจริงพร้อมกัน แต่ $B$ เป็นเท็จ
* **Syntactic Derivation (การอนุมานทางวากยสัมพันธ์: $\\Gamma \\vdash B$):** มีลำดับของขั้นตอนการพิสูจน์ที่เริ่มต้นจากข้อสมมติ $\\Gamma$ แล้วประยุกต์ใช้กฎการอนุมาน (Inference Rules) จนได้ข้อสรุป $B$`,
        latexSnippets: [
          '\\Gamma \\models B \\iff \\forall v, (\\forall A \\in \\Gamma, v(A)=T) \\implies v(B)=T',
          '\\Gamma \\vdash B \\quad (\\text{Derivation via Proof Rules})',
        ],
      },
      {
        id: '1-4-proof-1-1',
        heading: '1.4 Proof 1.1: Chained Inference with Four Propositions',
        headingTh: 'ตัวอย่างการพิสูจน์ 1.1: การอนุมานแบบลูกโซ่ 4 ตัวแปร',
        content: 'ตัวอย่างจากเอกสารต้นฉบับ แสดงการอนุมานโดยใช้กฎ Modus Ponens ต่อเนื่องกัน:',
        workedProof: {
          title: 'Proof 1.1: Chained inference with four propositions',
          premises: 'p \\to q; \\quad q \\to r; \\quad r \\to s; \\quad p',
          prove: 's',
          steps: [
            { step: 1, statement: 'From $p$ and $p \\to q$ infer $q$', justification: 'Modus Ponens' },
            { step: 2, statement: 'From $q$ and $q \\to r$ infer $r$', justification: 'Modus Ponens' },
            { step: 3, statement: 'From $r$ and $r \\to s$ infer $s$', justification: 'Modus Ponens' },
          ],
          notes: 'การอนุมานถูกต้องตามหลักตรรกศาสตร์เชิงวากยสัมพันธ์ (Syntactic Derivation) ส่งผลให้ $\\{p \\to q, q \\to r, r \\to s, p\\} \\vdash s$',
        },
      },
      {
        id: '1-5-proof-1-2',
        heading: '1.5 Proof 1.2: Indirect Proof Using Three Atoms',
        headingTh: 'ตัวอย่างการพิสูจน์ 1.2: การพิสูจน์โดยข้อขัดแย้ง 3 ตัวแปร',
        content: 'ตัวอย่างจากเอกสารต้นฉบับ แสดงการพิสูจน์ทางอ้อม (Indirect Proof / Proof by Contradiction):',
        workedProof: {
          title: 'Proof 1.2: Indirect proof using three atoms',
          premises: 'p \\lor q; \\quad p \\to r; \\quad q \\to r',
          prove: 'r',
          steps: [
            { step: 1, statement: 'Assume $\\neg r$ for contradiction', justification: 'Temporary Assumption' },
            { step: 2, statement: 'By Modus Tollens on $p \\to r$ and $\\neg r$, infer $\\neg p$', justification: 'Modus Tollens' },
            { step: 3, statement: 'By Modus Tollens on $q \\to r$ and $\\neg r$, infer $\\neg q$', justification: 'Modus Tollens' },
            { step: 4, statement: 'From $p \\lor q$ and $\\neg p$, infer $q$', justification: 'Disjunctive Syllogism' },
            { step: 5, statement: '$q$ directly contradicts $\\neg q$', justification: 'Contradiction ($q \\land \\neg q$)' },
            { step: 6, statement: 'Discharge assumption $\\neg r$ and conclude $r$', justification: 'Proof by Contradiction' },
          ],
          notes: 'นี่คือรูปแบบของ Constructive Dilemma ที่แสดงด้วยการพิสูจน์แบบ Reductio ad Absurdum',
        },
      },
    ],
    interactiveToolRef: 'argument-checker',
    summary: [
      'ตรรกศาสตร์ทางคณิตศาสตร์ตรวจสอบโครงสร้างความสมเหตุสมผล ไม่ใช่ความจริงของข้อเท็จจริงภายนอก',
      'Syntax พิจารณารูปแบบของสูตร (WFF) ส่วน Semantics พิจารณาค่าความจริงภายใต้ Valuation',
      'Satisfiable = มีอย่างน้อย 1 กรณีที่เป็นจริง, Valid = เป็นจริงในทุกกรณีที่เป็นไปได้',
      'การตามมาทางตรรกะ (⊨) เชื่อมโยงกับระบบการพิสูจน์แบบนิรนัย (⊢)',
    ],
    questions: [
      {
        id: 'q1-1',
        type: 'multiple_choice',
        prompt: 'ข้อความใดต่อไปนี้ถือเป็น "ประพจน์" (Proposition)?',
        options: [
          { id: 'a', text: 'กรุณาปิดประตูเบา ๆ' },
          { id: 'b', text: 'x + 5 = 12' },
          { id: 'c', text: '2 เป็นจำนวนเฉพาะคู่เพียงตัวเดียว' },
          { id: 'd', text: 'คณิตศาสตร์เป็นวิชาที่น่าสนใจใช่หรือไม่?' },
        ],
        correctAnswer: 'c',
        explanation: 'ประพจน์ต้องเป็นประโยคบอกเล่าหรือปฏิเสธที่มีค่าความจริงเป็นจริงหรือเท็จอย่างชัดเจน ข้อ c มีค่าความจริงเป็นจริง (T) ส่วนข้อ a เป็นคำขอร้อง, ข้อ b เป็นประโยคเปิดที่มีตัวแปรอิสระ, ข้อ d เป็นคำถาม',
        hint: 'พิจารณาว่าข้อความใดมีค่าความจริงเป็น จริง หรือ เท็จ ได้ทันทีโดยไม่ต้องกำหนดค่าตัวแปรเพิ่มเติม',
      },
      {
        id: 'q1-2',
        type: 'true_false',
        prompt: 'ถ้าสูตร A เป็น Satisfiable แล้วสูตร A จะต้องเป็น Valid เสมอ',
        correctAnswer: false,
        explanation: 'ไม่จริง! Satisfiable หมายถึงเป็นจริงได้ "อย่างน้อย 1 กรณี" แต่มิได้หมายความว่าต้องเป็นจริง "ทุกกรณี" (Valid)',
        hint: 'พิจารณาประพจน์ p: p เป็นจริงได้เมื่อ p=T (จึง Satisfiable) แต่ p เป็นเท็จได้เมื่อ p=F (จึงไม่ Valid)',
      },
      {
        id: 'q1-3',
        type: 'multiple_choice',
        prompt: 'การตามมาทางตรรกะ Γ ⊨ B (Semantic Entailment) หมายถึงอะไร?',
        options: [
          { id: 'a', text: 'มี Valuation ที่ทำให้ทุกสูตรใน Γ เป็นจริง และ B เป็นจริง' },
          { id: 'b', text: 'ทุก Valuation ที่ทำให้ทุกสูตรใน Γ เป็นจริง จะต้องทำให้ B เป็นจริงด้วย' },
          { id: 'c', text: 'สูตร B มีความยาวมากกว่าสูตรใน Γ' },
          { id: 'd', text: 'สูตรใน Γ ทั้งหมดต้องเป็นสัจนิรันดร์' },
        ],
        correctAnswer: 'b',
        explanation: 'Γ ⊨ B หมายถึง ไม่มี Valuation ใดเลยที่ทำให้สมาชิกทุกตัวใน Γ เป็นจริง แต่ทำให้ B เป็นเท็จ นั่นคือเมื่อใดก็ตามที่ข้อสมมติเป็นจริง ข้อสรุปต้องเป็นจริงเสมอ',
        hint: 'คิดถึงนิยามของการอ้างเหตุผลที่สมเหตุสมผล: ถ้าเหตุจริง ผลต้องจริงตามไปด้วยเสมอ',
      },
    ],
  },
  {
    id: 2,
    title: 'Logical Connectives and Truth Tables',
    titleTh: 'ตัวเชื่อมทางตรรกศาสตร์และตารางค่าความจริง',
    subtitle: 'ตัวเชื่อมพื้นฐาน ตารางค่าความจริง 2ⁿ แถว กฎของเดอมอร์แกน และสมมูลทางตรรกศาสตร์',
    readingTime: '20 นาที',
    objectives: [
      'เข้าใจการทำงานและตารางค่าความจริงของตัวเชื่อมทั้ง 5 ชนิด: ¬, ∧, ∨, →, ↔',
      'เข้าใจธรรมชาติของ Material Implication (→) ว่าเท็จเฉพาะกรณี หน้าจริง-หลังเท็จ',
      'สร้างตารางค่าความจริงขนาด 2ⁿ แถว สำหรับ 3 ตัวแปร (8 แถว) และ 4 ตัวแปร (16 แถว)',
      'ประเมินค่าความจริงของนิพจน์ย่อยอย่างเป็นลำดับจากวงเล็บด้านในสู่ด้านนอก',
      'พิสูจน์สมมูลทางตรรกศาสตร์ (Logical Equivalence: ≡) ด้วยตารางค่าความจริงและเอกลักษณ์ทางตรรกะ',
    ],
    sections: [
      {
        id: '2-1-connectives',
        heading: '2.1 The Five Fundamental Connectives',
        headingTh: 'ตัวเชื่อมทางตรรกศาสตร์ทั้ง 5 ชนิด',
        content: `1. **นิเสธ (Negation: $\\neg p$ หรือ $\\sim p$):** สลับค่าความจริง ถ้า $p$ จริง $\\neg p$ จะเท็จ ถ้า $p$ เท็จ $\\neg p$ จะจริง
2. **และ (Conjunction: $p \\land q$):** เป็นจริงเพียงกรณีเดียวคือเมื่อทั้งสองตัวเป็นจริงพร้อมกัน
3. **หรือแบบครอบคลุม (Inclusive Disjunction: $p \\lor q$):** เป็นเท็จเพียงกรณีเดียวคือเมื่อทั้งสองตัวเป็นเท็จพร้อมกัน (ถ้าตัวใดตัวหนึ่งจริง หรือทั้งสองตัวจริง ผลลัพธ์จะเป็นจริง)
4. **เงื่อนไข / อิมพลิเคชัน (Material Implication: $p \\to q$):** เป็นเท็จเพียงกรณีเดียวคือเมื่อ $p$ เป็นจริง และ $q$ เป็นเท็จ ($T \\to F \\equiv F$) ในทุกกรณีที่เหลือเป็นจริงทั้งหมด
5. **ก็ต่อเมื่อ (Biconditional: $p \\leftrightarrow q$):** เป็นจริงเมื่อทั้งสองตัวมีค่าความจริงเหมือนกัน ($T \\leftrightarrow T \\equiv T$ และ $F \\leftrightarrow F \\equiv T$)`,
        callout: {
          type: 'warning',
          title: 'ข้อควรระวัง: Material Implication (p → q)',
          text: 'ในตรรกศาสตร์ สัญลักษณ์ → หมายถึง "Material Implication" มิได้แสดงความสัมพันธ์เชิงเหตุและผลตามธรรมชาติ เช่น ถ้า "1+1=5" (เท็จ) แล้ว "ดวงอาทิตย์ขึ้นทางทิศตะวันออก" (จริง) ประพจน์ F → T มีค่าความจริงเป็น True ตามหลักตรรกศาสตร์คณิตศาสตร์',
        },
      },
      {
        id: '2-2-truth-tables',
        heading: '2.2 Truth Table Construction & 2ⁿ Rule',
        headingTh: 'การสร้างตารางค่าความจริงและกฎ 2ⁿ',
        content: `สำหรับประพจน์ที่มีตัวแปรอะตอมที่แตกต่างกัน $n$ ตัว ตารางค่าความจริงที่สมบูรณ์จะมีจำนวนแถวเท่ากับ $2^n$ แถว:
* 1 ตัวแปร: $2^1 = 2$ แถว
* 2 ตัวแปร: $2^2 = 4$ แถว ($p, q$)
* 3 ตัวแปร: $2^3 = 8$ แถว ($p, q, r$)
* 4 ตัวแปร: $2^4 = 16$ แถว ($p, q, r, s$)

**ลำดับการประเมินผล:** ให้คำนวณคอลัมน์ของนิพจน์ย่อยจากวงเล็บที่อยู่ลึกที่สุดออกมาทีละขั้น เช่น การคำนวณ $(p \\land q) \\to (r \\lor s)$ ต้องสร้างคอลัมน์ $p \\land q$ และคอลัมน์ $r \\lor s$ ก่อน จึงนำมาเชื่อมด้วย $\\to$`,
      },
      {
        id: '2-3-equivalences',
        heading: '2.3 Logical Equivalence & De Morgan Laws',
        headingTh: 'สมมูลทางตรรกศาสตร์และกฎสำคัญ',
        content: `สองประพจน์ $A$ และ $B$ จะ **สมมูลกันเชิงตรรกะ (Logically Equivalent: $A \\equiv B$)** ก็ต่อเมื่อมีค่าความจริงตรงกันทุกแถวในตารางค่าความจริง หรือกล่าวได้ว่า $A \\leftrightarrow B$ เป็นสัจนิรันดร์

**เอกลักษณ์ทางตรรกศาสตร์ที่สำคัญ:**
1. **Implication Law:** $A \\to B \\equiv \\neg A \\lor B$
2. **De Morgan's Laws:**
   * $\\neg(A \\land B) \\equiv \\neg A \\lor \\neg B$
   * $\\neg(A \\lor B) \\equiv \\neg A \\land \\neg B$
3. **Contrapositive Law:** $A \\to B \\equiv \\neg B \\to \\neg A$
4. **Distributive Laws:**
   * $A \\land (B \\lor C) \\equiv (A \\land B) \\lor (A \\land C)$
   * $A \\lor (B \\land C) \\equiv (A \\lor B) \\land (A \\lor C)$
5. **Double Negation:** $\\neg(\\neg A) \\equiv A$`,
        latexSnippets: [
          'A \\to B \\equiv \\neg A \\lor B',
          '\\neg(A \\land B) \\equiv \\neg A \\lor \\neg B',
          '\\neg(A \\lor B) \\equiv \\neg A \\land \\neg B',
        ],
      },
      {
        id: '2-4-worked-proofs',
        heading: '2.4 Worked Proofs from the Source Text',
        headingTh: 'ตัวอย่างการพิสูจน์สมมูลจากเอกสารต้นฉบับ',
        content: 'การพิสูจน์สมมูลด้วยการจัดรูปพีชคณิตทางตรรกศาสตร์ (Algebraic Transformation):',
        workedProof: {
          title: 'Proof 2.1: Distribution of implication over conjunction',
          premises: 'p \\to (q \\land r)',
          prove: '(p \\to q) \\land (p \\to r)',
          steps: [
            { step: 1, statement: 'Rewrite implication: $\\neg p \\lor (q \\land r)$', justification: 'Implication Law ($A \\to B \\equiv \\neg A \\lor B$)' },
            { step: 2, statement: 'Distribute $\\lor$ over $\\land$: $(\\neg p \\lor q) \\land (\\neg p \\lor r)$', justification: 'Distributive Law' },
            { step: 3, statement: 'Rewrite both disjunctions: $(p \\to q) \\land (p \\to r)$', justification: 'Implication Law' },
          ],
          notes: 'แสดงว่า $p \\to (q \\land r) \\equiv (p \\to q) \\land (p \\to r)$',
        },
      },
      {
        id: '2-5-four-atom-equivalence',
        heading: '2.5 Proof 2.3: A Four-Atom Equivalence',
        headingTh: 'ตัวอย่างการพิสูจน์ 2.3: สมมูล 4 ตัวแปร',
        content: 'ตัวอย่างจากหน้า 10 ของเอกสารต้นฉบับ:',
        workedProof: {
          title: 'Proof 2.3: A four-atom equivalence',
          premises: '(p \\land q) \\to (r \\lor s)',
          prove: '\\neg p \\lor \\neg q \\lor r \\lor s',
          steps: [
            { step: 1, statement: 'Eliminate implication: $\\neg(p \\land q) \\lor (r \\lor s)$', justification: 'Implication Law' },
            { step: 2, statement: 'Apply De Morgan: $(\\neg p \\lor \\neg q) \\lor (r \\lor s)$', justification: 'De Morgan Law' },
            { step: 3, statement: 'Use associativity: $\\neg p \\lor \\neg q \\lor r \\lor s$', justification: 'Associative Law of $\\lor$' },
          ],
          notes: 'สมมูลนี้เมื่อตรวจสอบด้วยตารางค่าความจริงขนาด 16 แถว จะได้ค่าความจริงเป็น True ทั้งหมด 16 แถว',
        },
      },
    ],
    interactiveToolRef: 'truth-table-builder',
    summary: [
      'ตัวเชื่อม 5 ตัวมีตารางค่าความจริงเฉพาะ โดยเฉพาะ p → q เป็นเท็จเพียงกรณีเดียวเมื่อ T → F',
      'ตัวแปร n ตัวทำให้เกิด 2ⁿ แถวในตารางค่าความจริง',
      'สมมูลทางตรรกศาสตร์ (≡) หมายถึงตารางค่าความจริงตรงกันทุกประการ',
      'กฎของเดอมอร์แกนและกฎการเปลี่ยนรูปเงื่อนไข A → B ≡ ¬A ∨ B เป็นเครื่องมือหลักในการจัดรูปพีชคณิตตรรกศาสตร์',
    ],
    questions: [
      {
        id: 'q2-1',
        type: 'multiple_choice',
        prompt: 'ถ้ากำหนดให้ p เป็นเท็จ (F) และ q เป็นจริง (T) ค่าความจริงของประพจน์ (p → q) ∧ ¬p คืออะไร?',
        options: [
          { id: 'a', text: 'จริง (T)' },
          { id: 'b', text: 'เท็จ (F)' },
          { id: 'c', text: 'ไม่สามารถระบุได้' },
          { id: 'd', text: 'เป็นสัจนิรันดร์' },
        ],
        correctAnswer: 'a',
        explanation: '1) p → q เมื่อ p=F, q=T ได้ F → T ≡ T  2) ¬p เมื่อ p=F ได้ ¬F ≡ T  3) เชื่อมด้วย ∧ ได้ T ∧ T ≡ T',
        hint: 'พิจารณาค่าของ p → q ก่อนว่า เมื่อเหตุเป็นเท็จ ผลลัพธ์ของเงื่อนไขจะเป็นอะไร',
      },
      {
        id: 'q2-2',
        type: 'multiple_choice',
        prompt: 'ตามกฎของเดอมอร์แกน นิเสธของข้อความ ¬(p ∨ ¬q) สมมูลกับข้อใด?',
        options: [
          { id: 'a', text: '¬p ∨ q' },
          { id: 'b', text: '¬p ∧ q' },
          { id: 'c', text: 'p ∧ ¬q' },
          { id: 'd', text: '¬p ∧ ¬q' },
        ],
        correctAnswer: 'b',
        explanation: 'นำนิเสธกระจายเข้าไป: ¬(p ∨ ¬q) ≡ ¬p ∧ ¬(¬q) ≡ ¬p ∧ q',
        hint: 'เมื่อกระจาย ¬ เข้าใน ∨ สัญลักษณ์จะเปลี่ยนเป็น ∧ และ ¬(¬q) จะกลายเป็น q',
      },
      {
        id: 'q2-3',
        type: 'multiple_choice',
        prompt: 'ตารางค่าความจริงของประพจน์ที่มีตัวแปรอิสระ 4 ตัว (p, q, r, s) มีจำนวนทั้งหมดกี่แถว?',
        options: [
          { id: 'a', text: '8 แถว' },
          { id: 'b', text: '12 แถว' },
          { id: 'c', text: '16 แถว' },
          { id: 'd', text: '32 แถว' },
        ],
        correctAnswer: 'c',
        explanation: 'ใช้กฎ 2ⁿ โดยที่ n=4 ดังนั้น 2⁴ = 16 แถว',
        hint: 'สูตรคือ 2 ยกกำลังจำนวนตัวแปร',
      },
    ],
  },
  {
    id: 3,
    title: 'Tautologies',
    titleTh: 'สัจนิรันดร์ ข้อขัดแย้ง และประพจน์มีเงื่อนไข',
    subtitle: 'การตรวจสอบสัจนิรันดร์ วิธีตารางค่าความจริง วิธีข้อขัดแย้ง และตัวอย่างโต้แย้ง',
    readingTime: '20 นาที',
    objectives: [
      'เข้าใจความหมายของ สัจนิรันดร์ (Tautology), ข้อขัดแย้ง (Contradiction) และ ประพจน์มีเงื่อนไข (Contingent)',
      'ตรวจสอบความเป็นสัจนิรันดร์ด้วยตารางค่าความจริง',
      'ใช้วิธีสมมติให้เป็นเท็จ (Countervaluation / Proof by Contradiction) เพื่อค้นหาตัวอย่างค้าน',
      'เข้าใจทฤษฎีบทการหักล้าง (Deduction Theorem) ที่เชื่อมโยงการอ้างเหตุผลกับสัจนิรันดร์',
      'วิเคราะห์ข้อผิดพลาดในการพิสูจน์ (Fallacy in Truth Tree) ตามที่พบในเอกสารต้นฉบับ',
    ],
    sections: [
      {
        id: '3-1-classification',
        heading: '3.1 Tautology, Contradiction, and Contingency',
        headingTh: 'การจำแนกประเภทประพจน์ตามค่าความจริง',
        content: `ประพจน์เชิงประกอบทุกประพจน์สามารถจัดกลุ่มได้เป็น 3 ประเภท:
1. **สัจนิรันดร์ (Tautology: $\\top$):** ประพจน์ที่มีค่าความจริงเป็น **จริงในทุกกรณี** ไม่ว่าตัวแปรอะตอมจะมีค่าความจริงเป็นเช่นใดก็ตาม เช่น $p \\lor \\neg p$ หรือ $p \\to p$
2. **ข้อขัดแย้ง (Contradiction: $\\bot$):** ประพจน์ที่มีค่าความจริงเป็น **เท็จในทุกกรณี** เช่น $p \\land \\neg p$
3. **ประพจน์มีเงื่อนไข (Contingent Proposition):** ประพจน์ที่มีค่าความจริง **จริงในบางกรณี และเท็จในบางกรณี** เช่น $p \\to q$ หรือ $p \\land q$`,
      },
      {
        id: '3-2-testing-methods',
        heading: '3.2 Methods for Testing Tautologies',
        headingTh: 'วิธีการตรวจสอบความเป็นสัจนิรันดร์',
        content: `มี 2 วิธีหลักในการตรวจสอบ:

* **วิธีที่ 1: ตารางค่าความจริงสมบูรณ์ (Exhaustive Truth Table)**
  สร้างตารางค่าความจริงทั้งหมด $2^n$ แถว หากคอลัมน์ผลลัพธ์สุดท้ายเป็น $T$ ทุกแถว ถือว่าเป็นสัจนิรันดร์ วิธีนี้แม่นยำและเป็นระบบ แต่อาจยาวเมื่อมีตัวแปรหลายตัว

* **วิธีที่ 2: วิธีสมมติให้เป็นเท็จเพื่อหาตัวอย่างค้าน (Countervaluation Method)**
  สมมติให้นิพจน์ทั้งหมดมีค่าความจริงเป็น $F$ แล้วแกะรอยย้อนกลับหาค่าความจริงของตัวแปรย่อย:
  * หากพบ **ข้อขัดแย้ง (Contradiction)** ในทุกกรณี แสดงว่านิพจน์นั้นไม่มีทางเป็นเท็จได้ จึงเป็น **สัจนิรันดร์**
  * หากหาค่าความจริงของตัวแปรที่สอดคล้องได้โดย **ไม่มีข้อขัดแย้ง** ค่าความจริงชุดนั้นคือ **ตัวอย่างค้าน (Counterexample)** พิสูจน์ว่านิพจน์นั้น **ไม่เป็นสัจนิรันดร์**`,
      },
      {
        id: '3-3-pdf-examples',
        heading: '3.3 Analysis of Examples from the Document',
        headingTh: 'วิเคราะห์ตัวอย่างจากเอกสารต้นฉบับ',
        content: `**ตัวอย่าง 1 (จากหน้า 14 ของเอกสาร):**
ตรวจสอบว่า $(p \\land q) \\to [(p \\lor q) \\to r]$ เป็นสัจนิรันดร์หรือไม่?
* สมมติให้เป็นเท็จ: $(p \\land q) \\to [(p \\lor q) \\to r] \\equiv F$
* จะได้ $p \\land q \\equiv T \\implies p=T, q=T$
* และ $(p \\lor q) \\to r \\equiv F \\implies (p \\lor q) \\equiv T$ และ $r \\equiv F$
* ตรวจสอบความสอดคล้อง: เมื่อ $p=T, q=T$ จะได้ $p \\lor q = T \\lor T = T$ ซึ่งสอดคล้องกันพอดีโดย **ไม่เกิดข้อขัดแย้ง!**
* **สรุป:** พบตัวอย่างค้าน $p=T, q=T, r=F$ ดังนั้นประพจน์นี้ **ไม่เป็นสัจนิรันดร์ (Not a Tautology)**`,
      },
      {
        id: '3-4-fallacy-audit',
        heading: '3.4 Critical Mathematical Audit: The Incomplete Branch Fallacy',
        headingTh: 'การตรวจสอบข้อผิดพลาดทางคณิตศาสตร์ในเอกสารต้นฉบับ (หน้า 15)',
        content: `ในเอกสารต้นฉบับหน้า 15 (Example 3) ได้แสดงการพิสูจน์ประพจน์:
$$[(\\neg p \\land q) \\to (\\neg q \\land r)] \\to (\\neg r \\land s)$$
โดยเอกสารสรุปว่าเป็นสัจนิรันดร์ แต่จากการตรวจสอบทางคณิตศาสตร์อย่างละเอียด พบว่า **เป็นการพิสูจน์ที่ผิดพลาด (Incomplete Branch Fallacy)!**

**จุดที่ผิดพลาดในเอกสาร:**
ผู้เขียนสมมติให้นิพจน์เป็น $F$ ทำให้ด้านหน้าเป็น $T$ และด้านหลังเป็น $F$:
1. $[(\\neg p \\land q) \\to (\\neg q \\land r)] \\equiv T$
2. $(\\neg r \\land s) \\equiv F$

จากนั้นผู้เขียนเอกสาร **ทึกทักสมมติเอาเองว่า** $\\neg p \\land q$ ต้องเป็น $T$ จึงพบข้อขัดแย้ง แต่ในความเป็นจริง เงื่อนไข $A \\to B \\equiv T$ นั้น **$A$ สามารถเป็นเท็จได้ด้วย!**

**การหักล้างด้วยตัวอย่างค้านจริง (Countermodel):**
เลือกกำหนดให้ $p=T, q=T, r=T, s=F$:
1. ด้านซ้าย: $(\\neg T \\land T) \\to (\\neg T \\land T) \\equiv (F \\land T) \\to (F \\land T) \\equiv F \\to F \\equiv \\mathbf{T}$
2. ด้านขวา: $\\neg T \\land F \\equiv F \\land F \\equiv \\mathbf{F}$
3. นิพจน์รวม: ด้านซ้าย $\\to$ ด้านขวา $\\equiv T \\to F \\equiv \\mathbf{F}$

**บทสรุปทางวิชาการ:** ประพจน์นี้ **ไม่เป็นสัจนิรันดร์** เว็บไซต์ของเราจึงแก้ไขความถูกต้องและจัดทำระบบเตือนเพื่อประโยชน์ทางการเรียนรู้`,
        callout: {
          type: 'correction',
          title: 'บันทึกการแก้ไขข้อผิดพลาดในต้นฉบับ (Mathematical Audit)',
          text: 'เอกสารต้นฉบับหน้า 15 สรุปผิดพลาดเนื่องจากแตกกิ่งก้านตรรกะไม่ครบ (ละเลยกรณี Antecedent เป็น False) การประเมินด้วยเครื่องคำนวณตรรกศาสตร์ของเรายืนยันว่า p=T, q=T, r=T, s=F ให้ผลลัพธ์เป็นเท็จ จึงไม่เป็นสัจนิรันดร์',
        },
      },
      {
        id: '3-5-exportation-law',
        heading: '3.5 Example 4: Law of Exportation',
        headingTh: 'ตัวอย่าง 4: กฎการส่งออก (Law of Exportation)',
        content: 'จากหน้า 16 ของเอกสาร การพิสูจน์ว่า $[(p \\land q) \\to r] \\leftrightarrow [p \\to (q \\to r)]$ เป็นสัจนิรันดร์:',
        workedProof: {
          title: 'Proof of the Law of Exportation',
          premises: '[(p \\land q) \\to r] \\leftrightarrow [p \\to (q \\to r)]',
          prove: 'Tautology',
          steps: [
            { step: 1, statement: 'Rewrite LHS: $\\neg(p \\land q) \\lor r \\equiv \\neg p \\lor \\neg q \\lor r$', justification: 'Implication & De Morgan' },
            { step: 2, statement: 'Rewrite RHS: $\\neg p \\lor (q \\to r) \\equiv \\neg p \\lor (\\neg q \\lor r)$', justification: 'Implication Law' },
            { step: 3, statement: 'By associativity: $\\neg p \\lor \\neg q \\lor r \\equiv \\neg p \\lor \\neg q \\lor r$', justification: 'Associative Law' },
            { step: 4, statement: 'Both sides are identically equivalent for all valuations', justification: 'LHS $\\equiv$ RHS' },
          ],
          notes: 'ดังนั้น $[(p \\land q) \\to r] \\leftrightarrow [p \\to (q \\to r)]$ เป็นสัจนิรันดร์อย่างแท้จริง',
        },
      },
    ],
    interactiveToolRef: 'equivalence-checker',
    summary: [
      'สัจนิรันดร์ = จริงทุกกรณี, ข้อขัดแย้ง = เท็จทุกกรณี, ประพจน์มีเงื่อนไข = มีทั้งกรณีจริงและเท็จ',
      'การตรวจสอบด้วยการสมมติเท็จ (Countervaluation) ช่วยให้หาตัวอย่างค้านได้รวดเร็ว',
      'ระวังข้อผิดพลาดในการตรวจสอบเงื่อนไข A → B เป็นจริง จะต้องพิจารณากรณี A เป็นเท็จด้วยเสมอ',
      'กฎการส่งออก (Exportation) เป็นสัจนิรันดร์ที่เป็นรากฐานของการแปลงฟังก์ชันในวิทยาการคอมพิวเตอร์ (Currying)',
    ],
    questions: [
      {
        id: 'q3-1',
        type: 'multiple_choice',
        prompt: 'ประพจน์ใดต่อไปนี้จัดเป็น "สัจนิรันดร์" (Tautology)?',
        options: [
          { id: 'a', text: 'p ∧ ¬p' },
          { id: 'b', text: '(p → q) → p' },
          { id: 'c', text: 'p ∨ ¬p' },
          { id: 'd', text: 'p ↔ ¬p' },
        ],
        correctAnswer: 'c',
        explanation: 'p ∨ ¬p (Law of Excluded Middle) เป็นจริงเสมอไม่ว่า p จะเป็นจริงหรือเท็จ จึงเป็นสัจนิรันดร์ ส่วนข้อ a เป็นข้อขัดแย้ง, ข้อ b เป็นประพจน์มีเงื่อนไข, ข้อ d เป็นข้อขัดแย้ง',
        hint: 'กฎการไม่มีบุคคลที่สาม (Law of Excluded Middle): ข้อความใด ๆ ต้องเป็นจริงหรือเป็นเท็จอย่างใดอย่างหนึ่งเสมอ',
      },
      {
        id: 'q3-2',
        type: 'true_false',
        prompt: 'หากเราสมมติให้นิพจน์ A → B มีค่าความจริงเป็นเท็จ แล้วพบข้อขัดแย้งในทุกกรณี แสดงว่า A → B เป็นสัจนิรันดร์',
        correctAnswer: true,
        explanation: 'ถูกต้อง! เพราะหากนิพจน์ไม่สามารถมีค่าความจริงเป็นเท็จได้ในกรณีใดเลย ย่อมหมายความว่านิพจน์นั้นต้องเป็นจริงในทุกกรณีเสมอ จึงเป็นสัจนิรันดร์',
        hint: 'การพิสูจน์โดยข้อขัดแย้ง: ถ้าสมมติว่าเท็จแล้วเกิดข้อขัดแย้ง แสดงว่าสมมติฐานผิด ดังนั้นมันต้องเป็นจริงเสมอ',
      },
      {
        id: 'q3-3',
        type: 'multiple_choice',
        prompt: 'จากตัวอย่างค้าน p=T, q=T, r=F ในนิพจน์ (p ∧ q) → ((p ∨ q) → r) ผลลัพธ์สุดท้ายมีค่าความจริงเป็นอะไร?',
        options: [
          { id: 'a', text: 'จริง (T)' },
          { id: 'b', text: 'เท็จ (F)' },
          { id: 'c', text: 'สรุปไม่ได้' },
          { id: 'd', text: 'เป็นข้อขัดแย้ง' },
        ],
        correctAnswer: 'b',
        explanation: '1) p ∧ q = T ∧ T = T  2) p ∨ q = T ∨ T = T  3) (p ∨ q) → r = T → F = F  4) (p ∧ q) → ((p ∨ q) → r) = T → F = F จึงได้ค่าความจริงเป็นเท็จ',
        hint: 'แทนค่าทีละขั้น: T → (T → F)',
      },
    ],
  },
  {
    id: 4,
    title: 'Arguments and Rules of Inference',
    titleTh: 'การอ้างเหตุผลและกฎการอนุมาน',
    subtitle: 'ข้อสมมติ ข้อสรุป ความสมเหตุสมผล ความสมบูรณ์ กฎการอนุมาน และตัวอย่างค้าน',
    readingTime: '25 นาที',
    objectives: [
      'จำแนกองค์ประกอบของการอ้างเหตุผล: ข้อสมมติหรือเหตุ (Premises) และข้อสรุป (Conclusion)',
      'แยกแยะความแตกต่างระหว่าง ความสมเหตุสมผล (Validity) กับ ความสมบูรณ์ (Soundness)',
      'ประยุกต์ใช้กฎการอนุมานหลัก: Modus Ponens, Modus Tollens, Hypothetical Syllogism, Disjunctive Syllogism',
      'ระบุรูปแบบการอ้างเหตุผลที่ผิดพลาด (Formal Fallacies) เช่น Affirming the Consequent',
      'สร้างตัวอย่างโต้แย้ง (Countermodel) เพื่อพิสูจน์ว่าการอ้างเหตุผลไม่ถูกต้อง',
    ],
    sections: [
      {
        id: '4-1-structure',
        heading: '4.1 Structure of Arguments: Validity vs. Soundness',
        headingTh: 'โครงสร้างของการอ้างเหตุผล: Validity vs. Soundness',
        content: `**การอ้างเหตุผล (Argument)** ประกอบด้วย 2 ส่วน:
1. **ข้อสมมติ หรือ เหตุ (Premises: $P_1, P_2, \\dots, P_k$)**
2. **ข้อสรุป (Conclusion: $C$)**

**ความสมเหตุสมผล (Validity):**
การอ้างเหตุผลจะ **สมเหตุสมผล (Valid)** ก็ต่อเมื่อ เป็นไปไม่ได้ที่ข้อสมมติทุกข้อจะเป็นจริงพร้อมกัน แต่ข้อสรุปกลับเป็นเท็จ นั่นคือ:
$$(P_1 \\land P_2 \\land \\dots \\land P_k) \\to C \\quad \\text{เป็นสัจนิรันดร์}$$

**ความสมบูรณ์ (Soundness):**
การอ้างเหตุผลจะ **สมบูรณ์ (Sound)** ก็ต่อเมื่อ:
1. การอ้างเหตุผลนั้น **Valid (สมเหตุสมผลเชิงตรรกะ)**
2. ข้อสมมติทุกข้อต้อง **เป็นความจริงในความเป็นจริง (Factually True)**`,
        callout: {
          type: 'info',
          title: 'ข้อแตกต่างสำคัญ',
          text: 'การอ้างเหตุผลอาจ Valid ได้แม้ข้อสมมติจะไม่เป็นความจริง เช่น "ถ้าปลาบินได้ นกจะว่ายน้ำ (p → q); ปลาบินได้ (p); ดังนั้น นกจะว่ายน้ำ (q)" — รูปแบบนี้ Valid (Modus Ponens) แต่ไม่ Sound เนื่องจากปลาบินไม่ได้ในโลกแห่งความเป็นจริง',
        },
      },
      {
        id: '4-2-rules',
        heading: '4.2 Fundamental Rules of Inference',
        headingTh: 'กฎการอนุมานพื้นฐาน',
        content: `กฎการอนุมานที่ถูกต้อง (Valid Rules):
1. **Modus Ponens (MP):**
   $$p \\to q, \\; p \\vdash q$$
2. **Modus Tollens (MT):**
   $$p \\to q, \\; \\neg q \\vdash \\neg p$$
3. **Hypothetical Syllogism (HS / ตรรกบทสมมติฐาน):**
   $$p \\to q, \\; q \\to r \\vdash p \\to r$$
4. **Disjunctive Syllogism (DS / การคัดแยก):**
   $$p \\lor q, \\; \\neg p \\vdash q$$
5. **Constructive Dilemma (CD):**
   $$(p \\to r) \\land (q \\to s), \\; p \\lor q \\vdash r \\lor s$$
6. **Addition (การเพิ่ม):**
   $$p \\vdash p \\lor q$$
7. **Simplification (การลดทอน):**
   $$p \\land q \\vdash p$$`,
      },
      {
        id: '4-3-fallacies',
        heading: '4.3 Formal Fallacies & Countermodel Construction',
        headingTh: 'รูปแบบการอนุมานที่ผิดพลาดและการสร้างตัวอย่างโต้แย้ง',
        content: `**รูปแบบที่ผิดพลาด (Fallacies) ที่พบบ่อย:**
1. **การยืนยันผล (Affirming the Consequent):**
   $$p \\to q, \\; q \\vdash p \\quad \\text{(ผิด!)}$$
   *ตัวอย่างค้าน:* ให้ $p=F, q=T$ เหตุ $p \\to q$ คือ $F \\to T = T$, เหตุ $q=T$ แต่ผล $p=F$
2. **การปฏิเสธเหตุ (Denying the Antecedent):**
   $$p \\to q, \\; \\neg p \\vdash \\neg q \\quad \\text{(ผิด!)}$$
   *ตัวอย่างค้าน:* ให้ $p=F, q=T$ เหตุ $p \\to q$ คือ $F \\to T = T$, เหตุ $\\neg p = T$ แต่ผล $\\neg q = F$

**ตัวอย่างจากเอกสารต้นฉบับหน้า 17:**
การอ้างเหตุผล: $p \\to q, \\; q, \\; r \\lor \\neg r \\vdash p$ ไม่ถูกต้อง
*ตัวอย่างโต้แย้ง:* เลือก $p=F, q=T, r=F$
* เหตุ 1: $F \\to T \\equiv T$
* เหตุ 2: $q \\equiv T$
* เหตุ 3: $F \\lor \\neg F \\equiv T$
* ข้อสรุป: $p \\equiv F$
ทุกเหตุเป็นจริง แต่ข้อสรุปเป็นเท็จ! การเพิ่มพจน์ส่วนเกิน $r \\lor \\neg r$ ไม่สามารถทำให้การอ้างเหตุผลที่ผิดพลาดกลับมาถูกต้องได้`,
      },
      {
        id: '4-4-worked-proofs',
        heading: '4.4 Worked Proofs from Document (Proofs 4.1 & 4.2)',
        headingTh: 'ตัวอย่างการพิสูจน์การอ้างเหตุผลจากเอกสาร',
        content: 'ตัวอย่างการอนุมานแบบหลายขั้นตอน:',
        workedProof: {
          title: 'Proof 4.1: Resolution with conditional branches',
          premises: 'p \\lor q; \\quad p \\to r; \\quad q \\to s; \\quad \\neg r',
          prove: 's',
          steps: [
            { step: 1, statement: 'From $p \\to r$ and $\\neg r$, infer $\\neg p$', justification: 'Modus Tollens' },
            { step: 2, statement: 'From $p \\lor q$ and $\\neg p$, infer $q$', justification: 'Disjunctive Syllogism' },
            { step: 3, statement: 'From $q \\to s$ and $q$, infer $s$', justification: 'Modus Ponens' },
          ],
          notes: 'ข้อสรุป $s$ ตามมาจากเหตุอย่างสมเหตุสมผล',
        },
      },
    ],
    interactiveToolRef: 'inference-trainer',
    summary: [
      'Validity ขึ้นกับโครงสร้างเชิงตรรกะ (ถ้าเหตุจริงหมด ผลต้องจริงเสมอ)',
      'Soundness = Validity + เหตุทุกข้อเป็นจริงในโลกจริง',
      'Modus Ponens และ Modus Tollens เป็นเสาหลักของการอนุมานแบบนิรนัย',
      'Affirming the Consequent และ Denying the Antecedent เป็นความผิดพลาดเชิงรูปนัย (Formal Fallacy)',
      'ตัวอย่างค้าน (Countermodel) ที่เหตุทุกข้อเป็นจริงแต่ผลเป็นเท็จ เพียงกรณีเดียวก็เพียงพอที่จะหักล้างการอ้างเหตุผล',
    ],
    questions: [
      {
        id: 'q4-1',
        type: 'multiple_choice',
        prompt: 'การอ้างเหตุผล: "ถ้าฝนตก ถนนจะเปียก (p → q); ขณะนี้ถนนเปียก (q); ดังนั้น ฝนตก (p)" เป็นการอ้างเหตุผลแบบใด?',
        options: [
          { id: 'a', text: 'Modus Ponens ที่ถูกต้อง' },
          { id: 'b', text: 'Modus Tollens ที่ถูกต้อง' },
          { id: 'c', text: 'ความผิดพลาดแบบ Affirming the Consequent' },
          { id: 'd', text: 'ความผิดพลาดแบบ Denying the Antecedent' },
        ],
        correctAnswer: 'c',
        explanation: 'นี่คือการยืนยันผล (Affirming the Consequent) ซึ่งไม่ถูกต้อง เพราะถนนอาจเปียกจากสาเหตุอื่น เช่น รถรดน้ำต้นไม้ โดยที่ฝนไม่ได้ตก',
        hint: 'สังเกตว่าสิ่งที่กำหนดมาเพิ่มคือข้อความหลังลูกศร (q)',
      },
      {
        id: 'q4-2',
        type: 'multiple_choice',
        prompt: 'จากข้อสมมติ: p ∨ q และ ¬q เราสามารถสรุปอะไรได้โดยใช้ Disjunctive Syllogism?',
        options: [
          { id: 'a', text: 'p' },
          { id: 'b', text: '¬p' },
          { id: 'c', text: 'q' },
          { id: 'd', text: 'p ∧ q' },
        ],
        correctAnswer: 'a',
        explanation: 'Disjunctive Syllogism ระบุว่า ถ้าประพจน์หนึ่งในสองตัวต้องจริง (p หรือ q) และตัวหนึ่งเป็นเท็จ (¬q) ย่อมบังคับให้อีกตัวต้องจริง (p)',
        hint: 'p หรือ q จริงอย่างน้อยหนึ่งตัว แต่ q ดันเป็นเท็จ ดังนั้นตัวที่เหลือต้องจริง',
      },
      {
        id: 'q4-3',
        type: 'true_false',
        prompt: 'การอ้างเหตุผลที่ Valid อาจมีข้อสรุปที่เป็นเท็จในความเป็นจริงได้ หากมีข้อสมมติอย่างน้อยหนึ่งข้อไม่เป็นจริง',
        correctAnswer: true,
        explanation: 'ถูกต้อง! ความสมเหตุสมผล (Validity) รับประกันเพียงว่า "ถ้าเหตุจริงหมด ผลต้องจริง" แต่ถ้ามีเหตุที่ไม่เป็นจริง ข้อสรุปก็อาจเป็นเท็จได้',
        hint: 'ลองนึกถึงตัวอย่างที่ตั้งต้นจากสมมติฐานที่ไม่จริงในความเป็นจริง',
      },
    ],
  },
  {
    id: 5,
    title: 'Open Sentences and Quantifiers',
    titleTh: 'ประโยคเปิดและตัวบ่งปริมาณ',
    subtitle: 'ประโยคเปิด ตัวแปรอิสระ เอกภพสัมพัทธ์ ตัวบ่งปริมาณ ∀ และ ∃ ลำดับของตัวบ่งปริมาณ',
    readingTime: '20 นาที',
    objectives: [
      'เข้าใจความหมายของประโยคเปิด (Open Sentence) และตัวแปรอิสระ (Free Variable)',
      'กำหนดบทบาทของเอกภพสัมพัทธ์ หรือ โดเมน (Domain of Discourse: U)',
      'ใช้สัญลักษณ์ตัวบ่งปริมาณสากล (∀) และตัวบ่งปริมาณมีอยู่ (∃)',
      'หานิเสธของข้อความที่มีตัวบ่งปริมาณตามกฎ De Morgan สำหรับตัวบ่งปริมาณ',
      'วิเคราะห์ผลกระทบของลำดับตัวบ่งปริมาณ เช่น ความแตกต่างระหว่าง ∀x∃y กับ ∃y∀x',
    ],
    sections: [
      {
        id: '5-1-open-sentences',
        heading: '5.1 Open Sentences & Domain of Discourse',
        headingTh: 'ประโยคเปิดและเอกภพสัมพัทธ์',
        content: `**ประโยคเปิด (Open Sentence: $P(x)$):** คือข้อความที่มี **ตัวแปรอิสระ (Free Variable)** เช่น "$x + 2 > 5$" ประโยคเปิดยังไม่มีค่าความจริงจนกว่าจะ:
1. แทนค่าตัวแปรด้วยสมาชิกเฉพาะเจาะจงในโดเมน เช่น $P(4)$ เป็นจริง, $P(1)$ เป็นเท็จ
2. ผูกตัวแปรเข้ากับ **ตัวบ่งปริมาณ (Quantifier)**

**เอกภพสัมพัทธ์ หรือ โดเมน (Domain of Discourse / Universe: $U$):**
คือขอบเขตของสิ่งทั้งหลายที่เรากำลังพิจารณา เช่น จำนวนเต็ม ($\\mathbb{Z}$), จำนวนจริง ($\\mathbb{R}$), หรือเซตจำกัด $\\{1, 2, 3\\}$ ค่าความจริงของข้อความที่มีตัวบ่งปริมาณจะขึ้นอยู่กับโดเมนที่ระบุเสมอ`,
      },
      {
        id: '5-2-quantifiers',
        heading: '5.2 Universal and Existential Quantifiers',
        headingTh: 'ตัวบ่งปริมาณสากลและตัวบ่งปริมาณมีอยู่',
        content: `1. **ตัวบ่งปริมาณสากล (Universal Quantifier: $\\forall x P(x)$):**
   * อ่านว่า "สำหรับทุกค่าของ $x$, $P(x)$"
   * เป็นจริง ก็ต่อเมื่อ $P(x)$ เป็นจริงสำหรับ **ทุกสมาชิก** ในโดเมน
   * เป็นเท็จ เมื่อมี **ตัวอย่างค้าน (Counterexample)** อย่างน้อย 1 ตัวในโดเมนที่ทำให้ $P(x)$ เป็นเท็จ

2. **ตัวบ่งปริมาณมีอยู่ (Existential Quantifier: $\\exists x P(x)$):**
   * อ่านว่า "มี $x$ อย่างน้อยหนึ่งตัวที่ $P(x)$"
   * เป็นจริง ก็ต่อเมื่อมีสมาชิกอย่างน้อย 1 ตัวในโดเมนที่ทำให้ $P(x)$ เป็นจริง
   * เป็นเท็จ เมื่อ $P(x)$ เป็นเท็จสำหรับ **ทุกสมาชิก** ในโดเมน`,
        latexSnippets: [
          '\\forall x \\in U, P(x)',
          '\\exists x \\in U, P(x)',
        ],
      },
      {
        id: '5-3-negation',
        heading: '5.3 Negation of Quantifiers',
        headingTh: 'การหานิเสธของตัวบ่งปริมาณ',
        content: `กฎการสลับตัวบ่งปริมาณเมื่อใส่เครื่องหมายนิเสธ (General De Morgan's Laws):
$$\\neg [\\forall x P(x)] \\equiv \\exists x [\\neg P(x)]$$
$$\\neg [\\exists x P(x)] \\equiv \\forall x [\\neg P(x)]$$

* "ไม่จริงที่ว่าทุกคนสอบผ่าน" $\\equiv$ "มีบางคนที่สอบไม่ผ่าน"
* "ไม่จริงที่ว่ามีคนบินได้" $\\equiv$ "ทุกคนบินไม่ได้"`,
      },
      {
        id: '5-4-order',
        heading: '5.4 Order of Quantifiers: ∀x∃y vs. ∃y∀x',
        headingTh: 'ลำดับของตัวบ่งปริมาณและความหมายที่เปลี่ยนไป',
        content: `ลำดับของตัวบ่งปริมาณมีความสำคัญอย่างยิ่ง และไม่สามารถสลับที่กันได้โดยทั่วไป!

**ตัวอย่างคลาสสิกจากเอกสารต้นฉบับหน้า 21:**
กำหนดโดเมนเป็นเซตของจำนวนเต็ม $\\mathbb{Z}$ และความสัมพันธ์ $x < y$:

1. **ข้อความ $\\forall x \\exists y (x < y)$:**
   * "สำหรับจำนวนเต็ม $x$ ใด ๆ จะมีจำนวนเต็ม $y$ ที่มากกว่า $x$"
   * **เป็นจริง (True):** เพราะไม่ว่าเลือก $x$ ใด เราสามารถเลือก $y = x + 1$ ซึ่งทำให้ $x < x + 1$ เสมอ

2. **ข้อความ $\\exists y \\forall x (x < y)$:**
   * "มีจำนวนเต็ม $y$ ตัวหนึ่ง ที่มากกว่าจำนวนเต็ม $x$ ทุก ๆ ตัว"
   * **เป็นเท็จ (False):** เพราะไม่มีจำนวนเต็มใดที่มีค่ามากกว่าจำนวนเต็มทุกตัวใน $\\mathbb{Z}$ (เช่น ถ้าเลือก $y$, ค่า $x = y + 1$ จะขัดแย้งทันที)`,
        callout: {
          type: 'warning',
          title: 'ข้อสรุปเรื่องลำดับ',
          text: '∃y∀x R(x, y) บ่งบอกถึงตัว y มหัศจรรย์ตัวเดียวที่ใช้ได้กับทุก x ในขณะที่ ∀x∃y R(x, y) ตัว y สามารถเปลี่ยนไปตาม x แต่ละตัวได้ ดังนั้น ∃y∀x จึงเป็นข้อความที่เข้มงวดกว่ามาก',
        },
      },
      {
        id: '5-5-counterexample-proof',
        heading: '5.5 Example 3 (Page 23): Counterexample with Finite Domain',
        headingTh: 'ตัวอย่าง 3 จากเอกสาร: การสร้างตัวอย่างค้านด้วยโดเมนจำกัด',
        content: `พิสูจน์ว่า $(\\forall x)(P(x) \\lor Q(x)) \\to ((\\forall x)P(x) \\lor (\\forall x)Q(x))$ เป็นสัจนิรันดร์หรือไม่?

**การพิสูจน์โดยตัวอย่างค้าน (Proof by Counterexample):**
* กำหนดโดเมน $U = \\{1, 2\\}$
* กำหนดประโยคเปิด $P(x)$ แทน "$x = 1$" และ $Q(x)$ แทน "$x = 2$"

1. **ประเมินข้อสมมติ $(\\forall x)(P(x) \\lor Q(x))$:**
   * เมื่อ $x=1$: $P(1) \\lor Q(1) \\equiv (1=1) \\lor (1=2) \\equiv T \\lor F \\equiv T$
   * เมื่อ $x=2$: $P(2) \\lor Q(2) \\equiv (2=1) \\lor (2=2) \\equiv F \\lor T \\equiv T$
   * ข้อสมมติเป็นจริง: $T \\land T \\equiv \\mathbf{True}$

2. **ประเมินข้อสรุป $(\\forall x)P(x) \\lor (\\forall x)Q(x)$:**
   * $(\\forall x)P(x) \\equiv (1=1) \\land (2=1) \\equiv T \\land F \\equiv F$
   * $(\\forall x)Q(x) \\equiv (1=2) \\land (2=2) \\equiv F \\land T \\equiv F$
   * ข้อสรุปเป็นเท็จ: $F \\lor F \\equiv \\mathbf{False}$

3. **ผลลัพธ์ของเงื่อนไข:** $\\text{Premise} \\to \\text{Conclusion} \\equiv T \\to F \\equiv \\mathbf{False}$
**สรุป:** ประพจน์นี้ **ไม่เป็นสัจนิรันดร์!** ตัวบ่งปริมาณ $\\forall$ ไม่สามารถกระจายข้าม $\\lor$ ได้`,
      },
    ],
    interactiveToolRef: 'quantifier-explorer',
    summary: [
      'ประโยคเปิด P(x) ยังไม่มีค่าความจริงจนกว่าจะแทนค่าหรือผูกด้วยตัวบ่งปริมาณ',
      '∀ เป็นจริงเมื่อจริงทุกตัว, ∃ เป็นจริงเมื่อจริงอย่างน้อยหนึ่งตัว',
      'การปฏิเสธตัวบ่งปริมาณ: สลับ ∀ เป็น ∃ และสลับ ∃ เป็น ∀ พร้อมใส่ ¬ ที่ประพจน์เปิดด้านใน',
      'ลำดับตัวบ่งปริมาณ ∀x∃y แตกต่างจาก ∃y∀x อย่างสิ้นเชิง',
      '∀ ไม่สามารถกระจายผ่านตัวเชื่อม ∨ ได้',
    ],
    questions: [
      {
        id: 'q5-1',
        type: 'multiple_choice',
        prompt: 'นิเสธของข้อความ "∀x (P(x) → Q(x))" คือข้อใด?',
        options: [
          { id: 'a', text: '∃x (¬P(x) → ¬Q(x))' },
          { id: 'b', text: '∃x (P(x) ∧ ¬Q(x))' },
          { id: 'c', text: '∀x (P(x) ∧ ¬Q(x))' },
          { id: 'd', text: '∃x (¬P(x) ∨ Q(x))' },
        ],
        correctAnswer: 'b',
        explanation: '1) ¬[∀x (P(x) → Q(x))] ≡ ∃x ¬(P(x) → Q(x))  2) จากกฎการแปลงเงื่อนไข ¬(A → B) ≡ A ∧ ¬B จึงได้ ∃x (P(x) ∧ ¬Q(x))',
        hint: 'เปลี่ยน ∀ เป็น ∃ แล้วหานิเสธของข้อความเงื่อนไข P(x) → Q(x)',
      },
      {
        id: 'q5-2',
        type: 'true_false',
        prompt: 'ถ้าโดเมนคือเซตของจำนวนจริง ข้อความ ∀x∃y (x + y = 0) มีค่าความจริงเป็นจริง',
        correctAnswer: true,
        explanation: 'จริง! สำหรับจำนวนจริง x ใด ๆ เราสามารถเลือก y = -x ซึ่งทำให้ x + (-x) = 0 เสมอ (สมบัติการมีอินเวอร์สการบวก)',
        hint: 'สำหรับ x ใด ๆ มีจำนวนตรงข้าม (-x) อยู่ในจำนวนจริงหรือไม่?',
      },
      {
        id: 'q5-3',
        type: 'multiple_choice',
        prompt: 'ข้อความ ∃y∀x (x < y) บนโดเมนจำนวนเต็ม มีค่าความจริงเป็นอะไร?',
        options: [
          { id: 'a', text: 'จริง เพราะเลือก y = ∞ ได้' },
          { id: 'b', text: 'จริง เพราะเลือก y = x + 1' },
          { id: 'c', text: 'เท็จ เพราะไม่มีจำนวนเต็มเดี่ยว ๆ ตัวใดที่มากกว่าจำนวนเต็มทุกตัว' },
          { id: 'd', text: 'ไม่สามารถระบุได้' },
        ],
        correctAnswer: 'c',
        explanation: 'ข้อความนี้หมายถึง มีจำนวนเต็ม y เพียงตัวเดียวที่มากกว่าจำนวนเต็ม x ทุกตัว ซึ่งเป็นไปไม่ได้ เพราะในจำนวนเต็มไม่มีจำนวนที่มากที่สุด',
        hint: '∃y นำหน้า แปลว่าต้องหาเลข y ตัวเดียวที่ชนะ x ทุกตัว',
      },
    ],
  },
  {
    id: 6,
    title: 'Inductive and Deductive Reasoning',
    titleTh: 'การให้เหตุผลแบบอุปนัยและนิรนัย',
    subtitle: 'การสังเกตแบบอุปนัย การพิสูจน์แบบนิรนัย และหลักอุปนัยเชิงคณิตศาสตร์ (PMI)',
    readingTime: '25 นาที',
    objectives: [
      'เปรียบเทียบความแตกต่างระหว่างการให้เหตุผลแบบอุปนัย (Inductive) และแบบนิรนัย (Deductive)',
      'เข้าใจเหตุผลที่ตัวอย่างจำนวนจำกัดไม่สามารถใช้พิสูจน์ข้อความสากลบนโดเมนอนันต์ได้',
      'เข้าใจโครงสร้างหลักอุปนัยเชิงคณิตศาสตร์ (Base Case, Inductive Hypothesis, Inductive Step)',
      'ทำความเข้าใจอุปนัยเชิงคณิตศาสตร์แบบเข้ม (Strong Induction)',
      'ศึกษาตัวอย่างการพิสูจน์ผลบวกจำนวนคี่ การหารลงตัว และผลบวกกำลังสามจากเอกสารต้นฉบับ',
    ],
    sections: [
      {
        id: '6-1-induction-vs-deduction',
        heading: '6.1 Inductive vs. Deductive Reasoning',
        headingTh: 'การให้เหตุผลแบบอุปนัยเปรียบเทียบกับนิรนัย',
        content: `* **การให้เหตุผลแบบอุปนัย (Inductive Reasoning):**
  การสังเกตข้อเท็จจริงย่อย ๆ จากตัวอย่าง แล้วสร้างข้อสรุปทั่วไป ข้อสรุปที่ได้มีความน่าจะเป็น (Plausible) แต่ **ไม่ได้รับประกันว่าต้องจริง 100%** ตัวอย่างเช่น สังเกตว่าหงส์ 1,000 ตัวที่พบเป็นสีขาว แล้วสรุปว่า "หงส์ทุกตัวเป็นสีขาว" ซึ่งถูกหักล้างได้ทันทีเมื่อพบหงส์ดำเพียง 1 ตัว

* **การให้เหตุผลแบบนิรนัย (Deductive Reasoning):**
  การเริ่มต้นจากสัจพจน์ กฎเกณฑ์ หรือข้อสมมติ แล้วใช้กฎตรรกศาสตร์ที่ถูกต้องนำไปสู่ข้อสรุป ข้อสรุปที่ได้ **มีความจำเป็นต้องจริง 100% (Certainty)** หากข้อสมมติเป็นจริง`,
        callout: {
          type: 'info',
          title: 'ข้อสังเกตสำคัญด้านคำศัพท์',
          text: 'แม้ว่า "Mathematical Induction" จะมีคำว่า Induction แต่ในทางคณิตศาสตร์ถือเป็นเทคนิคการพิสูจน์แบบ "Deductive Proof" ที่สมบูรณ์และแน่นอน 100% เนื่องจากวางอยู่บนสัจพจน์การจัดอันดับดีของจำนวนธรรมชาติ (Well-Ordering Principle)',
        },
      },
      {
        id: '6-2-pmi-framework',
        heading: '6.2 Principle of Mathematical Induction (PMI)',
        headingTh: 'หลักอุปนัยเชิงคณิตศาสตร์',
        content: `ในการพิสูจน์ว่าข้อความ $P(n)$ เป็นจริงสำหรับทุกจำนวนเต็มบวก $n \\ge 1$ ต้องดำเนินการ 3 ขั้นตอน:

1. **กรณีฐาน (Base Case):**
   พิสูจน์ว่าข้อความเป็นจริงสำหรับค่าเริ่มต้น เช่น $P(1)$ เป็นจริง
2. **สมมติฐานอุปนัย (Inductive Hypothesis: IH):**
   สมมติให้ $P(k)$ เป็นจริงสำหรับจำนวนเต็มบวก $k$ ใด ๆ
3. **ขั้นอุปนัย (Inductive Step):**
   แสดงให้เห็นว่า ถ้า $P(k)$ เป็นจริง แล้วจะต้องส่งผลให้ $P(k+1)$ เป็นจริงด้วย ($P(k) \\to P(k+1)$)

เมื่อครบทั้ง 3 ขั้นตอน เราสามารถสรุปได้ว่า $P(n)$ เป็นจริงสำหรับทุกจำนวนเต็มบวก $n$ (เปรียบเสมือนตัวโดมิโนที่ล้มต่อกันเป็นทอด ๆ โดยไม่มีที่สิ้นสุด)`,
      },
      {
        id: '6-3-odd-integers-proof',
        heading: '6.3 Proof 1: Sum of the First n Odd Positive Integers',
        headingTh: 'ตัวอย่างการพิสูจน์ 1: ผลบวกของจำนวนคี่บวก n จำนวนแรก',
        content: `**ข้อความที่ต้องการพิสูจน์:** สำหรับทุกจำนวนเต็มบวก $n$:
$$1 + 3 + 5 + \\dots + (2n - 1) = n^2$$

**ขั้นตอนการพิสูจน์:**
1. **กรณีฐาน ($n = 1$):**
   ด้านซ้าย $= 1$, ด้านขวา $= 1^2 = 1$ ดังนั้น $1 = 1^2$ ข้อความ $P(1)$ เป็นจริง

2. **สมมติฐานอุปนัย ($n = k$):**
   สมมติให้ข้อความเป็นจริงเมื่อ $n = k$:
   $$1 + 3 + 5 + \\dots + (2k - 1) = k^2$$

3. **ขั้นอุปนัย ($n = k + 1$):**
   พิจารณาผลบวก $k+1$ พจน์แรก:
   $$[1 + 3 + 5 + \\dots + (2k - 1)] + [2(k+1) - 1]$$
   แทนค่าด้วยสมมติฐานอุปนัย:
   $$= k^2 + (2k + 2 - 1) = k^2 + 2k + 1 = (k + 1)^2$$
   ซึ่งตรงกับรูปสูตรเมื่อแทน $n = k+1$

**บทสรุป:** โดยหลักอุปนัยเชิงคณิตศาสตร์ ข้อความนี้เป็นจริงสำหรับทุกจำนวนเต็มบวก $n$`,
      },
      {
        id: '6-4-divisibility-proof',
        heading: '6.4 Proof 2 (Page 28): Divisibility 6 | (n³ - n)',
        headingTh: 'ตัวอย่างการพิสูจน์ 2: การหารลงตัว 6 | (n³ - n)',
        content: `**ข้อความที่ต้องการพิสูจน์:** สำหรับทุกจำนวนเต็มบวก $n$, $n^3 - n$ หารด้วย 6 ลงตัว ($6 \\mid (n^3 - n)$)

1. **กรณีฐาน ($n = 1$):**
   $1^3 - 1 = 0$ ซึ่ง $0 = 6 \\times 0$ หารด้วย 6 ลงตัว

2. **สมมติฐานอุปนัย ($n = k$):**
   สมมติให้ $6 \\mid (k^3 - k)$ นั่นคือ $k^3 - k = 6m$ สำหรับจำนวนเต็ม $m$ บางตัว

3. **ขั้นอุปนัย ($n = k + 1$):**
   พิจารณา $(k+1)^3 - (k+1)$:
   $$= (k^3 + 3k^2 + 3k + 1) - (k + 1)$$
   $$= (k^3 - k) + 3k^2 + 3k = (k^3 - k) + 3k(k+1)$$
   * พจน์แรก $(k^3 - k)$ หารด้วย 6 ลงตัวตามสมมติฐานอุปนัย
   * สำหรับพจน์หลัง $3k(k+1)$: สังเกตว่าในจำนวนเต็มสองตัวติดกัน $k$ และ $k+1$ จะต้องมีตัวหนึ่งเป็นเลขคู่เสมอ ดังนั้น $k(k+1) = 2p$ ส่งผลให้ $3k(k+1) = 3(2p) = 6p$ ซึ่งหารด้วย 6 ลงตัวเสมอ
   * ผลบวกของจำนวนสองจำนวนที่หารด้วย 6 ลงตัว ย่อมหารด้วย 6 ลงตัว

**บทสรุป:** $6 \\mid (n^3 - n)$ เป็นจริงสำหรับทุกจำนวนเต็มบวก $n$`,
        callout: {
          type: 'correction',
          title: 'ข้อสังเกตเกี่ยวกับสัญลักษณ์ในเอกสารต้นฉบับ',
          text: 'ในเอกสารต้นฉบับหน้า 28 มีการเขียนสัญลักษณ์เป็น 6/(n³-n) ซึ่งอาจทำให้สับสนกับเศษส่วน การเขียนทางคณิตศาสตร์ที่ถูกต้องสำหรับการหารลงตัวคือ 6 | (n³ - n) (อ่านว่า 6 หาร n³ - n ลงตัว)',
        },
      },
      {
        id: '6-5-sum-of-cubes',
        heading: '6.5 Proof 3 (Page 29): Sum of Cubes Formula',
        headingTh: 'ตัวอย่างการพิสูจน์ 3: ผลบวกกำลังสาม',
        content: `**ข้อความที่ต้องการพิสูจน์:** สำหรับทุกจำนวนเต็ม $n \\ge 1$:
$$1^3 + 2^3 + 3^3 + \\dots + n^3 = \\left[\\frac{n(n+1)}{2}\\right]^2$$

1. **กรณีฐาน ($n = 1$):**
   *(ในเอกสารต้นฉบับละเลยขั้นตอนนี้ เว็บไซต์นี้จึงเติมเต็มให้สมบูรณ์)*
   * ด้านซ้าย: $1^3 = 1$
   * ด้านขวา: $[(1)(2)/2]^2 = 1^2 = 1$ ทั้งสองข้างเท่ากัน $P(1)$ เป็นจริง

2. **สมมติฐานอุปนัย ($n = k$):**
   $$1^3 + 2^3 + \\dots + k^3 = \\left[\\frac{k(k+1)}{2}\\right]^2 = \\frac{k^2(k+1)^2}{4}$$

3. **ขั้นอุปนัย ($n = k + 1$):**
   $$[1^3 + \\dots + k^3] + (k+1)^3 = \\frac{k^2(k+1)^2}{4} + (k+1)^3$$
   ดึงตัวคูณร่วม $(k+1)^2$ ออกมา:
   $$= (k+1)^2 \\left[\\frac{k^2}{4} + (k+1)\\right] = (k+1)^2 \\left[\\frac{k^2 + 4k + 4}{4}\\right]$$
   $$= (k+1)^2 \\frac{(k+2)^2}{4} = \\left[\\frac{(k+1)(k+2)}{2}\\right]^2$$
   ซึ่งตรงกับสูตรเมื่อแทน $n = k+1$`,
      },
    ],
    interactiveToolRef: 'induction-lab',
    summary: [
      'การให้เหตุผลแบบอุปนัยทั่วไปให้ข้อสรุปที่น่าจะเป็น แต่การพิสูจน์แบบอุปนัยเชิงคณิตศาสตร์ (PMI) เป็นการพิสูจน์แบบนิรนัยที่ให้ความแน่นอน 100%',
      'โครงสร้าง 3 ขั้นของ PMI: Base Case, Inductive Hypothesis, Inductive Step',
      'ขาดขั้นตอนใดขั้นตอนหนึ่งไม่ได้ โดยเฉพาะ Base Case หากไม่มีฐาน โดมิโนตัวแรกจะไม่เริ่มล้ม',
      'Strong Induction ใช้สมมติฐานว่าจริงตั้งแต่ 1 ถึง k ซึ่งมีพลังในการพิสูจน์เทียบเท่ากับ PMI ปกติ',
    ],
    questions: [
      {
        id: 'q6-1',
        type: 'multiple_choice',
        prompt: 'ขั้นตอนใดในหลักอุปนัยเชิงคณิตศาสตร์ที่เปรียบเสมือนการ "ผลักโดมิโนตัวแรกให้ล้ม"?',
        options: [
          { id: 'a', text: 'Inductive Hypothesis' },
          { id: 'b', text: 'Base Case (กรณีฐาน)' },
          { id: 'c', text: 'Inductive Step' },
          { id: 'd', text: 'Conclusion' },
        ],
        correctAnswer: 'b',
        explanation: 'กรณีฐาน (Base Case) เป็นการตรวจสอบว่าข้อความเริ่มต้นเป็นจริงที่ค่าต่ำสุด (เช่น n=1) เปรียบเสมือนการผลักโดมิโนตัวแรก',
        hint: 'ขั้นตอนที่เริ่มตรวจสอบค่าแรกสุดของโดเมน',
      },
      {
        id: 'q6-2',
        type: 'true_false',
        prompt: 'การตรวจสอบตัวอย่างตัวเลข 1,000 ตัวแรกแล้วพบว่าเป็นจริงทั้งหมด ถือเป็นการพิสูจน์ข้อความสำหรับจำนวนนับทุกจำนวนได้อย่างสมบูรณ์',
        correctAnswer: false,
        explanation: 'ไม่ถูกต้อง! โดเมนของจำนวนนับมีขนาดเป็นอนันต์ การยกตัวอย่างเพียงจำนวนจำกัด (แม้จะมากถึง 1,000 หรือ 1 ล้านตัว) ไม่อาจรับประกันได้ว่าตัวถัดไปจะไม่เป็นตัวอย่างค้าน',
        hint: 'โดเมนจำนวนนับมีที่สิ้นสุดหรือไม่?',
      },
      {
        id: 'q6-3',
        type: 'multiple_choice',
        prompt: 'ในการพิสูจน์ 1 + 3 + ... + (2n-1) = n² ขั้นอุปนัยเราต้องแสดงว่าสมมติฐาน P(k) นำไปสู่อะไร?',
        options: [
          { id: 'a', text: 'ผลบวกถึงพจน์ที่ k+1 เท่ากับ (k+1)²' },
          { id: 'b', text: 'ผลบวกถึงพจน์ที่ k เท่ากับ 2k+1' },
          { id: 'c', text: 'ผลบวกเท่ากับ k³' },
          { id: 'd', text: 'k ต้องเป็นจำนวนคี่' },
        ],
        correctAnswer: 'a',
        explanation: 'ขั้นอุปนัยต้องแสดงว่า ถ้า P(k) จริง แล้ว P(k+1) จะต้องจริงด้วย ซึ่งสำหรับสูตรนี้ P(k+1) คือการแสดงว่าผลบวกถึงพจน์ที่ k+1 มีค่าเท่ากับ (k+1)²',
        hint: 'พิจารณาสูตรเดิมเมื่อเปลี่ยน n เป็น k+1',
      },
    ],
  },
];



window.TRUTH_TABLE_PRESETS = [
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


window.ARGUMENT_PRESETS = [
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



window.GLOSSARY_DATA = [
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



window.PDF_CORRECTIONS_DATA = [
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

