"""
Main entry point for Math Logic Learning Studio.
Streamlit 1.66+ Modern Multipage navigation using st.navigation and st.Page.
"""

import streamlit as st

# Configure page metadata
st.set_page_config(
    page_title="Math Logic Learning Studio",
    page_icon="🧠",
    layout="wide",
    initial_sidebar_state="expanded"
)

# Navigation definition with categorized sections
pages = {
    "หลักสูตรบทเรียน (Curriculum)": [
        st.Page("views/home.py", title="หน้าแรก (Home)", icon="🏠", default=True),
        st.Page("views/overview.py", title="ภาพรวมบทเรียน (Course Overview)", icon="📖"),
        st.Page("views/ch1_intro.py", title="บทที่ 1: Introduction to Logic", icon="1️⃣"),
        st.Page("views/ch2_connectives.py", title="บทที่ 2: Connectives & Truth Tables", icon="2️⃣"),
        st.Page("views/ch3_tautology.py", title="บทที่ 3: Tautologies", icon="3️⃣"),
        st.Page("views/ch4_arguments.py", title="บทที่ 4: Arguments", icon="4️⃣"),
        st.Page("views/ch5_quantifiers.py", title="บทที่ 5: Open Sentences & Quantifiers", icon="5️⃣"),
        st.Page("views/ch6_induction.py", title="บทที่ 6: Inductive & Deductive", icon="6️⃣"),
    ],
    "ห้องทดลองและแบบประเมิน (Studio & Assessment)": [
        st.Page("views/formula_summary.py", title="สรุปสูตรทั้งหมด (Formula Sheet)", icon="📐"),
        st.Page("views/logic_lab.py", title="Logic Lab (ห้องทดลองตรรกศาสตร์)", icon="🧪"),
        st.Page("views/quiz.py", title="แบบฝึกหัดและแบบทดสอบ (Quizzes)", icon="✍️"),
        st.Page("views/glossary.py", title="สรุปสัญลักษณ์และนิยามทางตรรกศาสตร์", icon="📚"),
        st.Page("views/errata.py", title="การตรวจสอบเอกสาร (Errata Audit)", icon="🔍"),
    ]
}

pg = st.navigation(pages)
pg.run()
