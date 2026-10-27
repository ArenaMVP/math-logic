"""
Chapter 2: Logical Connectives & Truth Tables.
"""

import streamlit as st
import pandas as pd
from modules.ui_components import inject_theme, render_hero, render_sidebar_header, render_sidebar_footer
from modules.data import CHAPTERS, QUIZZES
from modules.logic_engine import generate_truth_table, check_equivalence

inject_theme()
render_sidebar_header()
render_sidebar_footer()

ch = CHAPTERS["ch2"]

render_hero(
    title=f"บทที่ {ch['number']}: {ch['title']}",
    subtitle=f"{ch['title_en']} — เจาะลึกตัวเชื่อมทั้ง 5 ชนิด ตารางค่าความจริง 2^n แถว และกฎสมมูลทางตรรกศาสตร์",
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

# Embedded Interactive Tool for Chapter 2: Truth Table Generator
st.markdown("### 🧪 กิจกรรมทดลองเชิงโต้ตอบ: สร้างตารางค่าความจริงอัตโนมัติ")
st.write("พิมพ์นิพจน์ตรรกศาสตร์ หรือเลือกสูตรตัวอย่างเพื่อสร้างตารางค่าความจริงขนาด $2^n$ แถวพร้อมแตกคอลัมน์นิพจน์ย่อย:")

preset_options = [
    "P & Q -> R",
    "~(P & Q) <-> (~P | ~Q)",
    "P -> (Q -> P)",
    "(P | Q) & (~P | R) -> (Q | R)",
    "(P -> Q) & (Q -> R) -> (P -> R)",
    "P & ~P",
    "A & B & C -> D"
]

selected_preset = st.selectbox("เลือกสูตรตัวอย่างจากเอกสาร:", preset_options)
custom_formula = st.text_input("หรือพิมพ์สูตรเอง (ใช้ ~, &, |, ->, <-> และตัวแปร P, Q, R...):", value=selected_preset)

if st.button("คำนวณตารางค่าความจริง", key="btn_ch2_calc"):
    try:
        res = generate_truth_table(custom_formula)
        st.markdown(f"**สูตรในรูปแบบ KaTeX:**")
        st.latex(res["latex"])
        
        # Build pandas DataFrame for clean presentation
        df_data = []
        cols = res["variables"] + res["subexpressions"] + [res["expression"]]
        for r in res["rows"]:
            row_dict = {}
            for v in res["variables"]:
                row_dict[v] = "T" if r[v] else "F"
            for sub in res["subexpressions"]:
                row_dict[sub] = "T" if r[sub] else "F"
            row_dict[res["expression"]] = "T" if r["_main_"] else "F"
            df_data.append(row_dict)
            
        df = pd.DataFrame(df_data)
        st.dataframe(df, use_container_width=True)
        
        c1, c2 = st.columns(2)
        with c1:
            st.metric("จำนวนแถวทั้งหมด (2^n)", f"{res['total_rows']} แถว")
        with c2:
            badge_type = res["classification"]
            if badge_type == "Tautology":
                st.success(f"**ผลลัพธ์:** {res['class_desc']}")
            elif badge_type == "Contradiction":
                st.error(f"**ผลลัพธ์:** {res['class_desc']}")
            else:
                st.warning(f"**ผลลัพธ์:** {res['class_desc']} (จริง {res['true_count']} / เท็จ {res['false_count']})")
    except Exception as e:
        st.error(f"รูปแบบสูตรไม่ถูกต้อง: {str(e)}")

st.markdown("---")

# Chapter Quiz Component
st.markdown("### ✍️ แบบทดสอบท้ายบทที่ 2")
st.write("ทดสอบความเข้าใจเนื้อหาประจำบท (3 ข้อ) พร้อมระบบตรวจคำตอบทันที:")

if "quiz_answers" not in st.session_state:
    st.session_state["quiz_answers"] = {}

for q in QUIZZES["ch2"]:
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
            with st.expander("📖 ดูเฉลยและวิธีคิดละเอียด (Step-by-Step Solution)", expanded=True):
                st.markdown(q["explanation"])
        elif qid in st.session_state["quiz_answers"]:
            ans_info = st.session_state["quiz_answers"][qid]
            if ans_info["is_correct"]:
                st.success("✅ บันทึกแล้ว: คุณตอบข้อนี้ถูกต้อง")
            else:
                st.error("❌ บันทึกแล้ว: คุณตอบข้อนี้ยังไม่ถูกต้อง")
            with st.expander("📖 ดูเฉลยและวิธีคิดละเอียด (Step-by-Step Solution)", expanded=False):
                st.markdown(q["explanation"])

st.markdown("---")
col_prev, col_next = st.columns(2)
with col_prev:
    st.page_link("views/ch1_intro.py", label="⬅️ ย้อนกลับ: บทที่ 1 Introduction to Logic", icon="1️⃣")
with col_next:
    st.page_link("views/ch3_tautology.py", label="➡️ ไปยังบทเรียนถัดไป: บทที่ 3 Tautologies", icon="3️⃣")
