"""
Chapter 6: Inductive and Deductive Reasoning.
"""

import streamlit as st
import pandas as pd
from modules.ui_components import inject_theme, render_hero, render_sidebar_header, render_sidebar_footer
from modules.data import CHAPTERS, QUIZZES

inject_theme()
render_sidebar_header()
render_sidebar_footer()

ch = CHAPTERS["ch6"]

render_hero(
    title=f"บทที่ {ch['number']}: {ch['title']}",
    subtitle=f"{ch['title_en']} — การนิรนัย vs การอุปนัย พร้อมหลักการอุปนัยเชิงคณิตศาสตร์ (Mathematical Induction) 3 ขั้นตอน",
    badge=ch['badge']
)

with st.container():
    st.markdown("### 🎯 จุดประสงค์การเรียนรู้ประจำบท")
    for obj in ch['objectives']:
        st.markdown(f"- ✅ {obj}")

st.markdown("---")

for sec in ch['sections']:
    st.markdown(f"### {sec['title']}")
    st.markdown(sec['content'])
    st.markdown("<br>", unsafe_allow_html=True)

st.markdown("---")

# Embedded Interactive Tool: Mathematical Induction Simulator
st.markdown("### 🧪 กิจกรรมทดลองเชิงโต้ตอบ: ห้องทดลองการอุปนัยเชิงคณิตศาสตร์ (Induction Sandbox)")
st.write("เลือกสูตรอนุกรมและปรับค่า $n$ เพื่อสังเกตการล้มของโดมิโนทางคณิตศาสตร์และการเท่ากันของผลรวมจริงกับสูตร:")

induction_formulas = {
    "1 + 2 + ... + n = n(n+1)/2": {
        "formula_latex": "\\sum_{i=1}^n i = \\frac{n(n+1)}{2}",
        "term_fn": lambda i: i,
        "formula_fn": lambda n: n * (n + 1) // 2
    },
    "1 + 3 + 5 + ... + (2n-1) = n^2": {
        "formula_latex": "\\sum_{i=1}^n (2i-1) = n^2",
        "term_fn": lambda i: 2 * i - 1,
        "formula_fn": lambda n: n * n
    },
    "1^2 + 2^2 + ... + n^2 = n(n+1)(2n+1)/6": {
        "formula_latex": "\\sum_{i=1}^n i^2 = \\frac{n(n+1)(2n+1)}{6}",
        "term_fn": lambda i: i * i,
        "formula_fn": lambda n: n * (n + 1) * (2 * n + 1) // 6
    }
}

chosen_ind_key = st.selectbox("เลือกเอกลักษณ์ทางคณิตศาสตร์:", list(induction_formulas.keys()))
ind_info = induction_formulas[chosen_ind_key]

st.latex(ind_info["formula_latex"])

n_val = st.slider("เลือกค่า n:", min_value=1, max_value=40, value=10)

# Compute actual sum vs formula
terms = [ind_info["term_fn"](i) for i in range(1, n_val + 1)]
actual_sum = sum(terms)
formula_result = ind_info["formula_fn"](n_val)
is_match = (actual_sum == formula_result)

m1, m2, m3 = st.columns(3)
with m1:
    st.metric("ผลรวมจากการบวกทีละพจน์ (LHS)", f"{actual_sum}")
with m2:
    st.metric("ผลลัพธ์จากสูตรพีชคณิต (RHS)", f"{formula_result}")
with m3:
    if is_match:
        st.success("✅ **LHS == RHS สมบูรณ์**")
    else:
        st.error("❌ ไม่เท่ากัน")

# Show Domino progression
st.markdown("#### 🀄 การจำลองลูกโซ่โดมิโน (Domino Verification Chain):")
progress_text = " ➡️ ".join([f"P({i})" for i in range(1, min(n_val + 1, 12))])
if n_val > 11:
    progress_text += f" ➡️ ... ➡️ P({n_val})"
st.code(progress_text, language="text")

st.markdown("---")

# Chapter Quiz Component
st.markdown("### ✍️ แบบทดสอบท้ายบทที่ 6")
st.write("ทดสอบความเข้าใจเนื้อหาประจำบท (3 ข้อ) พร้อมระบบตรวจคำตอบทันที:")

if "quiz_answers" not in st.session_state:
    st.session_state["quiz_answers"] = {}

for q in QUIZZES["ch6"]:
    qid = q["id"]
    with st.container():
        st.markdown(f"**{q['question']}**")
        saved_ans = st.session_state["quiz_answers"].get(qid, {}).get("selected_idx", None)
        
        user_choice = st.radio(
            "เลือกคำตอบที่ถูกต้อง:",
            options=range(len(q["options"])),
            format_func=lambda i: q["options"][i],
            key=f"radio_{qid}",
            index=saved_ans if saved_ans is not None else 0
        )
        
        c_btn, c_hint = st.columns([1, 4])
        with c_btn:
            check_clicked = st.button("ส่งคำตอบ", key=f"btn_{qid}")
        with c_hint:
            with st.expander("💡 ดูคำใบ้"):
                st.caption(q["hint"])
                
        if check_clicked:
            is_correct = (user_choice == q["answer_idx"])
            st.session_state["quiz_answers"][qid] = {
                "selected_idx": user_choice,
                "is_correct": is_correct
            }
            if is_correct:
                st.success("🎉 ถูกต้องยอดเยี่ยม!")
            else:
                st.error(f"❌ ยังไม่ถูกต้อง (คำตอบที่ถูกต้องคือ: {q['options'][q['answer_idx']]})")
            st.info(f"**คำอธิบายเฉลย:** {q['explanation']}")
        elif qid in st.session_state["quiz_answers"]:
            ans_info = st.session_state["quiz_answers"][qid]
            if ans_info["is_correct"]:
                st.success("✅ บันทึกแล้ว: คุณตอบข้อนี้ถูกต้อง")
            else:
                st.error("❌ บันทึกแล้ว: คุณตอบข้อนี้ยังไม่ถูกต้อง")
            st.caption(f"เฉลย: {q['explanation']}")

st.markdown("---")
st.caption("ยินดีด้วย! คุณได้ศึกษาเนื้อหาครบทั้ง 6 บทแล้ว สามารถเข้าสู่หน้า Logic Lab เพื่อทดลองเครื่องมือทั้งหมด หรือทำแบบทดสอบรวมได้จากเมนูด้านซ้าย")
