"""
Course Overview Page: Comprehensive curriculum outline and learning pathways.
"""

import streamlit as st
from modules.ui_components import inject_theme, render_hero, render_sidebar_header, render_sidebar_footer
from modules.data import CHAPTERS

inject_theme()
render_sidebar_header()
render_sidebar_footer()

render_hero(
    title="ภาพรวมหลักสูตรบทเรียน",
    subtitle="แผนผังการเรียนรู้ วัตถุประสงค์เชิงพฤติกรรม และลำดับการศึกษาตรรกศาสตร์ทางคณิตศาสตร์ทั้ง 6 บทเรียน",
    badge="COURSE OVERVIEW & ROADMAP"
)

st.markdown("### 🗺️ แผนผังการเรียนรู้ (Learning Pathway)")
st.write(
    """
    หลักสูตรนี้จัดวางเนื้อหาจาก **รากฐานพื้นฐานที่สุด (ระดับอะตอม)** ไปสู่ **การคำนวณเชิงสัญลักษณ์**, **การตรวจสอบความจริงสัมบูรณ์**, 
    **การอ้างเหตุผล**, **ตรรกศาสตร์ภาคแสดงที่มีตัวแปร**, จนถึง **การพิสูจน์ทฤษฎีบทขั้นสูงด้วยการอุปนัยเชิงคณิตศาสตร์**
    """
)

# Render Chapters Roadmap in expandable cards
for cid, ch in CHAPTERS.items():
    with st.expander(f"📘 บทที่ {ch['number']}: {ch['title']} ({ch['title_en']})", expanded=(ch['number'] == 1)):
        st.markdown(f"**คำอธิบายบทเรียน:** {ch['desc']}")
        st.markdown(f"**ระยะเวลาศึกษาโดยประมาณ:** ⏱️ {ch['read_time']}")
        st.markdown("**🎯 วัตถุประสงค์การเรียนรู้ (Learning Objectives):**")
        for obj in ch['objectives']:
            st.markdown(f"- {obj}")
        
        st.markdown("**📑 หัวข้อย่อยในบทเรียน:**")
        for sec in ch['sections']:
            st.markdown(f"- `{sec['title']}`")

st.markdown("---")

st.markdown("### 📊 ตารางเปรียบเทียบมโนทัศน์สำคัญ (Conceptual Matrix)")
st.table([
    {"บทที่": "บทที่ 1", "ระดับตรรกศาสตร์": "Propositional", "หน่วยวิเคราะห์": "ประพจน์อะตอม (P, Q)", "แก่นสำคัญ": "Syntax vs Semantics, Satisfiability"},
    {"บทที่": "บทที่ 2", "ระดับตรรกศาสตร์": "Propositional", "หน่วยวิเคราะห์": "ประพจน์เชิงประกอบ", "แก่นสำคัญ": "5 Connectives, Truth Tables 2^n, Equivalence"},
    {"บทที่": "บทที่ 3", "ระดับตรรกศาสตร์": "Propositional", "หน่วยวิเคราะห์": "คุณสมบัติสูตร", "แก่นสำคัญ": "Tautology, Contradiction, Contingency, False Assignment"},
    {"บทที่": "บทที่ 4", "ระดับตรรกศาสตร์": "Inference", "หน่วยวิเคราะห์": "เหตุและผลสรุป", "แก่นสำคัญ": "Validity, Soundness, Modus Ponens, Formal Fallacies"},
    {"บทที่": "บทที่ 5", "ระดับตรรกศาสตร์": "Predicate (First-Order)", "หน่วยวิเคราะห์": "ประโยคเปิด P(x), U", "แก่นสำคัญ": "Quantifiers (∀, ∃), Negation, Quantifier Ordering"},
    {"บทที่": "บทที่ 6", "ระดับตรรกศาสตร์": "Metamathematics", "หน่วยวิเคราะห์": "การให้เหตุผล & อุปนัย", "แก่นสำคัญ": "Deduction vs Induction, PMI (Base, Hypothesis, Step)"}
])
