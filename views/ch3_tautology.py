"""
Chapter 3: Tautologies, Contradictions, and Contingent Propositions.
"""

import streamlit as st
import pandas as pd
from modules.ui_components import inject_theme, render_hero, render_sidebar_header, render_sidebar_footer
from modules.data import CHAPTERS, QUIZZES
from modules.logic_engine import generate_truth_table

inject_theme()
render_sidebar_header()
render_sidebar_footer()

ch = CHAPTERS["ch3"]

render_hero(
    title=f"บทที่ {ch['number']}: {ch['title']}",
    subtitle=f"{ch['title_en']} — จำแนกสัจนิรันดร์ ข้อขัดแย้ง และประพจน์ตามเงื่อนไข พร้อมเทคนิคการพิสูจน์เชิงวิเคราะห์",
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

# Embedded Interactive Tool: Tautology & Countermodel Inspector
st.markdown("### 🧪 กิจกรรมทดลองเชิงโต้ตอบ: ตรวจสอบสัจนิรันดร์และค้นหาตัวอย่างค้าน (Countermodel)")
st.write("เลือกสูตรเพื่อตรวจสอบ หรือทดสอบสูตรจากหน้า 15 ของเอกสารต้นฉบับ:")

preset_formulas = {
    "ตัวอย่างหน้า 15 (PDF Example 3)": "((P -> Q) & (R -> S) & (P | S)) -> (Q | R)",
    "กฎการแปลงนิเสธ (De Morgan)": "~(P | Q) <-> (~P & ~Q)",
    "กฎ Modus Ponens": "(P -> Q) & P -> Q",
    "กฎ Modus Tollens": "(P -> Q) & ~Q -> ~P",
    "Hypothetical Syllogism": "(P -> Q) & (Q -> R) -> (P -> R)",
    "ข้อขัดแย้ง (Contradiction)": "P & ~P",
    "ประพจน์เงื่อนไขทั่วไป (Contingent)": "P -> Q"
}

chosen_key = st.selectbox("เลือกสูตรสำหรับทดสอบ:", list(preset_formulas.keys()))
active_formula = st.text_input("สูตรที่ทำการตรวจสอบ:", value=preset_formulas[chosen_key])

if st.button("วิเคราะห์คุณสมบัติของสูตร", key="btn_ch3_eval"):
    try:
        res = generate_truth_table(active_formula)
        st.latex(res["latex"])
        
        # Classification card
        c_badge, c_count = st.columns(2)
        with c_badge:
            if res["classification"] == "Tautology":
                st.success("🏆 **เป็นสัจนิรันดร์ (Tautology)** — จริงทุกกรณี")
            elif res["classification"] == "Contradiction":
                st.error("💥 **เป็นข้อขัดแย้ง (Contradiction)** — เท็จทุกกรณี")
            else:
                st.warning("⚖️ **เป็นประพจน์ตามเงื่อนไข (Contingent)** — มีทั้งจริงและเท็จ")
        with c_count:
            st.metric("สถิติจำนวนกรณี", f"จริง {res['true_count']} / เท็จ {res['false_count']} (รวม {res['total_rows']} แถว)")
            
        # If not tautology, show counterexamples
        if res["false_count"] > 0:
            st.markdown("#### 🚨 แถวที่เป็นตัวอย่างค้าน (Countermodels):")
            st.write("การกำหนดค่าความจริงต่อไปนี้ทำให้สูตรเป็นเท็จ (หักล้างการเป็นสัจนิรันดร์):")
            
            counter_rows = []
            for r in res["rows"]:
                if not r["_main_"]:
                    c_dict = {v: ("T" if r[v] else "F") for v in res["variables"]}
                    c_dict["ผลลัพธ์ของสูตร"] = "False"
                    counter_rows.append(c_dict)
            st.dataframe(pd.DataFrame(counter_rows), use_container_width=True)
            
            if chosen_key == "ตัวอย่างหน้า 15 (PDF Example 3)":
                st.info(
                    "📌 **บทวิเคราะห์ทางวิชาการ:** ในเอกสารหน้า 15 ระบุว่าสูตรนี้เป็นสัจนิรันดร์ แต่การคำนวณพิสูจน์จริงพบว่า "
                    "เมื่อ $P=F, Q=F, R=F, S=T$ เหตุทุกข้อจะเป็นจริงพร้อมกัน แต่ข้อสรุป $(Q \\lor R)$ เป็นเท็จ "
                    "ทำให้สูตรมีค่าเป็น False! จึงไม่ใช่สัจนิรันดร์"
                )
    except Exception as e:
        st.error(f"ข้อผิดพลาด: {str(e)}")

st.markdown("---")

# Chapter Quiz Component
st.markdown("### ✍️ แบบทดสอบท้ายบทที่ 3")
st.write("ทดสอบความเข้าใจเนื้อหาประจำบท (3 ข้อ) พร้อมระบบตรวจคำตอบทันที:")

if "quiz_answers" not in st.session_state:
    st.session_state["quiz_answers"] = {}

for q in QUIZZES["ch3"]:
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
st.caption("สามารถเลือกเรียนบทถัดไป (บทที่ 4: การอ้างเหตุผล) ได้จากเมนูทางซ้าย")
