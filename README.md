# Math Logic Learning Studio (ระบบสื่อการสอนตรรกศาสตร์ทางคณิตศาสตร์)

> **เว็บไซต์สื่อการสอนและห้องทดลองเชิงโต้ตอบวิชาตรรกศาสตร์ทางคณิตศาสตร์ (Mathematical Logic)**  
> พัฒนาด้วย **Python** และ **Streamlit** ออกแบบใหม่ทั้งหมดในรูปแบบ **Modern Academic Learning Studio**  
> อ้างอิงเนื้อหา ทฤษฎีบท ตัวอย่าง และแบบฝึกหัดจากเอกสารวิชาการต้นฉบับ: `637868054818062507_Mathematical_Logic1.pdf` (32 หน้า)

---

## 🌟 จุดเด่นของระบบ (Key Highlights)

1. **สถาปัตยกรรม Python & Streamlit แบบ Multi-page (`st.navigation` & `st.Page`):**
   - เมนูเลือกบทเรียนและเครื่องมืออยู่ทางด้านซ้าย (Left Sidebar) ตลอดเวลาอย่างเป็นระเบียบ
   - รองรับการนำทาง 12 หน้า แบ่งหมวดหมู่ "หลักสูตรบทเรียน (Curriculum)" และ "ห้องทดลองและแบบประเมิน (Studio & Assessment)"
2. **เนื้อหาทางวิชาการครบถ้วนทั้ง 6 บทเรียนหลัก:**
   - ถอดบทเรียน นิยามเชิงรูปนัย สูตรไวยากรณ์ และขั้นตอนการพิสูจน์ครบ 100%
   - ภาษาไทยเชิงวิชาการเข้าใจง่าย ควบคู่สัญลักษณ์และศัพท์เทคนิคภาษาอังกฤษตามมาตรฐานสากล
3. **Logic Lab — 7 เครื่องมือตรรกศาสตร์เชิงโต้ตอบที่ทำงานจริง:**
   - **Truth Table Builder:** สร้างตารางค่าความจริง $2^n$ แถวพร้อมแตกคอลัมน์นิพจน์ย่อย และจำแนกประเภทสูตร
   - **Equivalence Checker:** ตรวจสอบสมมูล $\varphi \equiv \psi$ พร้อมดึง Countermodel (แถวตัวอย่างค้าน) อัตโนมัติเมื่อไม่สมมูล
   - **Tautology Checker:** จำแนกสัจนิรันดร์ ข้อขัดแย้ง และประพจน์ตามเงื่อนไข
   - **Argument Validity Inspector:** ตรวจสอบความสมเหตุสมผลของการอ้างเหตุผล $P_1, \dots, P_k \vdash C$ และชี้จุด Fallacy
   - **Inference Rules Playground:** ห้องทดลอง 8 กฎการอนุมานมาตรฐาน (Modus Ponens, Modus Tollens, Syllogisms ฯลฯ)
   - **Quantifier Matrix Explorer:** เมทริกซ์ 2 มิติจำลองตัวบ่งปริมาณ $\forall x \forall y, \forall x \exists y, \exists y \forall x, \exists x \exists y$
   - **Mathematical Induction Lab:** จำลองลูกโซ่โดมิโนและการพิสูจน์อุปนัยเชิงคณิตศาสตร์
4. **ความปลอดภัยทางคณิตศาสตร์ระดับสูง (Zero `eval()`):**
   - พัฒนา Custom Recursive-Descent AST Parser และ Evaluator (`modules/logic_engine.py`)
   - ปลอดภัย ไม่มีความเสี่ยงจากการ Injection และประมวลผลตามลำดับเครื่องหมายที่ถูกต้อง
5. **ระบบแบบทดสอบประเมินผล 18 ข้อ (Quiz Center):**
   - ครอบคลุม 6 บทเรียน (บทละ 3 ข้อ)
   - ตรวจคำตอบทันที มีระบบคำใบ้ (Hint) และเฉลยขั้นตอนคิดละเอียด (Explanation)
   - บันทึกคะแนนและวิเคราะห์ความก้าวหน้าใน `st.session_state`
6. **การตรวจสอบและรายงานจุดคลาดเคลื่อนทางวิชาการ (Mathematical Audit & Errata):**
   - วิเคราะห์ข้อผิดพลาดจากการตัดกิ่งพิสูจน์ (Incomplete Branch Fallacy) ในหน้า 15 ตัวอย่างที่ 3 ของเอกสารต้นฉบับ
   - แสดงตัวอย่างค้าน $P=F, Q=F, R=F, S=T$ ที่พิสูจน์ว่าสูตรเป็น Contingent ไม่ใช่สัจนิรันดร์

---

## 🚀 วิธีเปิดใช้งานในเครื่อง (Local Setup & Run)

### 1. ติดตั้งไลบรารีที่จำเป็น
```bash
pip install -r requirements.txt
```

### 2. รันเว็บไซต์ด้วย Streamlit
```bash
streamlit run streamlit_app.py
```
*หรือหากไม่ได้เพิ่ม Scripts ลงใน PATH:*
```bash
python -m streamlit run streamlit_app.py
```

เมื่อรันเสร็จ เว็บไซต์จะเปิดขึ้นที่:
👉 **`http://localhost:8501`**

---

## 🌐 การนำเว็บไซต์ขึ้นเผยแพร่ออนไลน์ (Deployment Guide)

### วิธีที่ 1: Streamlit Community Cloud (แนะนำ - ฟรี 100%)
1. อัปโหลดโค้ดขึ้น **GitHub Repository** (แบบ Public หรือ Private ก็ได้)
2. ไปที่ [share.streamlit.io](https://share.streamlit.io) แล้วล็อกอินด้วย GitHub
3. คลิกปุ่ม **"Create app"**
4. ระบุข้อมูล:
   - **Repository:** เลือก Repo ของคุณ
   - **Branch:** `main`
   - **Main file path:** `streamlit_app.py`
5. คลิก **"Deploy!"** ระบบจะติดตั้งแพ็กเกจตาม `requirements.txt` และสร้าง Public URL (เช่น `https://your-math-logic.streamlit.app`) พร้อมใช้งานทันที

### วิธีที่ 2: Hugging Face Spaces (Docker / Streamlit)
1. สร้าง Space ใหม่บน [Hugging Face Spaces](https://huggingface.co/spaces)
2. เลือก SDK: **Streamlit**
3. Push ไฟล์ทั้งหมดขึ้น Space พร้อมใช้งานได้ทันที

---

## 📁 โครงสร้างโปรเจกต์ (Project Directory)

```text
WEBSITE สื่อการสอน/
├── .streamlit/
│   └── config.toml          # การตั้งค่า Streamlit Theme (Modern Academic Palette), Headless & Port
├── modules/
│   ├── logic_engine.py      # Custom AST Parser & Semantic Evaluator ปลอดภัย 100% ไม่ใช้ eval()
│   ├── data.py              # คลังเนื้อหาทั้ง 6 บทเรียน, ข้อสอบ 18 ข้อ, พจนานุกรมศัพท์ และ Errata
│   └── ui_components.py     # ระบบตกแต่ง CSS, Header Hero, Sidebar และการแสดงผล
├── views/
│   ├── home.py              # หน้าแรก (Home & Welcoming)
│   ├── overview.py          # ภาพรวมหลักสูตรและผังการเรียนรู้ (Course Overview)
│   ├── ch1_intro.py         # บทที่ 1: บทนำสู่ตรรกศาสตร์ทางคณิตศาสตร์
│   ├── ch2_connectives.py   # บทที่ 2: ตัวเชื่อมทางตรรกศาสตร์และตารางค่าความจริง
│   ├── ch3_tautology.py     # บทที่ 3: สัจนิรันดร์และตัวอย่างค้าน
│   ├── ch4_arguments.py     # บทที่ 4: การอ้างเหตุผลและกฎการอนุมาน
│   ├── ch5_quantifiers.py   # บทที่ 5: ประโยคเปิดและตัวบ่งปริมาณ
│   ├── ch6_induction.py     # บทที่ 6: การให้เหตุผลแบบอุปนัยและนิรนัย
│   ├── logic_lab.py         # Logic Lab (ห้องทดลองตรรกศาสตร์ 7 เครื่องมือ)
│   ├── quiz.py              # ศูนย์แบบทดสอบ 18 ข้อ (Quiz Center)
│   ├── glossary.py          # สรุปสัญลักษณ์และพจนานุกรมศัพท์
│   └── errata.py            # รายงานการตรวจสอบเอกสารต้นฉบับ (Errata Audit)
├── streamlit_app.py         # ไฟล์ Entry Point หลัก ควบคุม Navigation ด้วย st.navigation
├── requirements.txt         # รายการแพ็กเกจ Python สำหรับ Deployment
└── 637868054818062507_Mathematical_Logic1.pdf  # เอกสารวิชาการต้นฉบับ
```

---

## 🧪 ผลการทดสอบระบบ (Test Results)

- **Unit Tests:** ทดสอบ Tokenizer, AST Parser, Truth Table, Equivalence, และ Argument Validity ผ่าน 100%
- **Streamlit AppTest:** รันชุดทดสอบ Integration Test ครบทั้ง 12 หน้า ผลการทดสอบ **0 Exceptions**
- **HTTP Server:** ตรวจสอบ Health Endpoint `/_stcore/health` ตอบกลับสถานะ `200 ok`
