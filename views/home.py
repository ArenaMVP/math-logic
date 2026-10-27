"""
Home Page: Welcoming landing page for Math Logic Learning Studio.
"""

import streamlit as st
from modules.ui_components import inject_theme, render_hero, render_sidebar_header, render_sidebar_footer
from modules.data import CHAPTERS

inject_theme()
render_sidebar_header()
render_sidebar_footer()

render_hero(
    title="Math Logic Learning Studio",
    subtitle="ระบบการเรียนรู้ตรรกศาสตร์ทางคณิตศาสตร์เชิงโต้ตอบ ครอบคลุมเนื้อหาทั้ง 6 บทเรียนตามเอกสารวิชาการ พร้อมห้องทดลองตรรกศาสตร์และระบบประเมินผลอัตโนมัติ",
    badge="MODERN ACADEMIC LEARNING STUDIO"
)

# Highlights Metrics Row
col1, col2, col3, col4 = st.columns(4)
with col1:
    st.metric(label="📚 บทเรียนเข้มข้น", value="6 บทเรียน", delta="ครบตาม PDF ต้นฉบับ")
with col2:
    st.metric(label="🧪 เครื่องมือทดลอง", value="7 เครื่องมือ", delta="Logic Engine ปลอดภัย 100%")
with col3:
    st.metric(label="✍️ แบบทดสอบประเมิน", value="18 ข้อสอบ", delta="เฉลยละเอียดทุกข้อ")
with col4:
    st.metric(label="🔍 การตรวจสอบทางวิชาการ", value="Errata Audit", delta="ชี้จุดคลาดเคลื่อนหน้า 15")

st.markdown("---")

st.markdown("### 🎯 ยินดีต้อนรับสู่สตูดิโอการเรียนรู้ตรรกศาสตร์")
st.write(
    """
    เว็บไซต์นี้ได้รับการพัฒนาขึ้นเพื่อเป็น **สื่อการสอนและห้องทดลองเชิงโต้ตอบ** สำหรับวิชาตรรกศาสตร์ทางคณิตศาสตร์ (Mathematical Logic)
    โดยถอดบทเรียน ทฤษฎีบท ตัวอย่าง และแบบฝึกหัดจากเอกสารวิชาการต้นฉบับอย่างเป็นระบบ
    มุ่งเน้นการเสริมสร้างทักษะการคิดเชิงวิเคราะห์และการพิสูจน์ทางคณิตศาสตร์ที่รัดกุม
    """
)

st.markdown("### 📖 โครงสร้างบทเรียนหลัก (Curriculum Overview)")
st.write("เลือกศึกษาบทเรียนตามลำดับ หรือคลิกเลือกจากเมนูด้านซ้าย:")

# Render Chapter Cards in 2 columns
c_left, c_right = st.columns(2)

CHAPTER_FILES = {
    "ch1": "views/ch1_intro.py",
    "ch2": "views/ch2_connectives.py",
    "ch3": "views/ch3_tautology.py",
    "ch4": "views/ch4_arguments.py",
    "ch5": "views/ch5_quantifiers.py",
    "ch6": "views/ch6_induction.py",
}

for idx, (cid, ch) in enumerate(CHAPTERS.items()):
    target_col = c_left if idx % 2 == 0 else c_right
    with target_col:
        with st.container():
            st.markdown(
                f"""
                <div class="academic-card">
                    <span class="badge-pill">{ch['badge']}</span>
                    <span style="font-size: 0.8rem; color: #64748b;">⏱️ {ch['read_time']}</span>
                    <h3 style="margin-top: 0.5rem;">บทที่ {ch['number']}: {ch['title']}</h3>
                    <div style="font-size: 0.88rem; color: #475569; font-style: italic; margin-bottom: 0.6rem;">{ch['title_en']}</div>
                    <p style="font-size: 0.92rem; color: #334155; line-height: 1.5;">{ch['desc']}</p>
                </div>
                """,
                unsafe_allow_html=True
            )
            target_page = CHAPTER_FILES.get(cid)
            if target_page:
                st.page_link(target_page, label=f"👉 เข้าสู่เนื้อหาบทที่ {ch['number']}: {ch['title']}")

st.markdown("---")

# Logic Lab Spotlight
st.markdown("### 🧪 ไฮไลต์พื้นที่ทดลองตรรกศาสตร์ (Logic Lab)")
lab1, lab2, lab3 = st.columns(3)
with lab1:
    st.markdown("#### ⚡ Truth Table Builder")
    st.write("สร้างตารางค่าความจริง $2^n$ แถวอัตโนมัติ แตกคอลัมน์นิพจน์ย่อย และจำแนกสัจนิรันดร์ / ข้อขัดแย้ง / ตามเงื่อนไข")
with lab2:
    st.markdown("#### ⚖️ Equivalence Checker")
    st.write("ตรวจสอบสมมูล $\\varphi \\equiv \\psi$ พร้อมดึง Countermodel (แถวตัวอย่างค้าน) ออกมาแสดงทันทีเมื่อไม่สมมูล")
with lab3:
    st.markdown("#### 🛡️ Argument Validity")
    st.write("ตรวจสอบความสมเหตุสมผลของข้อสมมติ $P_1, \\dots, P_k \\vdash C$ และชี้จุด Fallacy อย่างแม่นยำ")

st.info("💡 **คำแนะนำการใช้งาน:** ท่านสามารถใช้เมนู Sidebar ด้านซ้ายเพื่อเลือกอ่านบทเรียน เข้าสู่ห้องทดลอง หรือทำแบบทดสอบประเมินผลได้ตลอดเวลา")
