"""
Chapter 1: Introduction to Mathematical Logic.
"""

import streamlit as st
from modules.ui_components import inject_theme, render_hero, render_sidebar_header, render_sidebar_footer
from modules.data import CHAPTERS, QUIZZES

inject_theme()
render_sidebar_header()
render_sidebar_footer()

ch = CHAPTERS["ch1"]

render_hero(
    title=f"บทที่ {ch['number']}: {ch['title']}",
    subtitle=f"{ch['title_en']} — ศึกษาธรรมชาติของข้อความเชิงคณิตศาสตร์ ประพจน์อะตอม ค่าความจริง ไวยากรณ์ และอรรถศาสตร์",
    badge=ch['badge']
)

# Objectives Card
with st.container():
    st.markdown("### 🎯 จุดประสงค์การเรียนรู้ประจำบท")
    for obj in ch['objectives']:
        st.markdown(f"- ✅ {obj}")

st.markdown("---")

# Sections Content
for sec in ch['sections']:
    st.markdown(f"### {sec['title']}")
    st.markdown(sec['content'])
    st.markdown("<br>", unsafe_allow_html=True)

st.markdown("---")

# Interactive Mini-Lab for Chapter 1: Proposition & Truth Value Inspector
st.markdown("### 🧪 กิจกรรมทดลองเชิงโต้ตอบ: จำแนกประโยคและประพจน์")
st.write("ทดลองเลือกข้อความตัวอย่างเพื่อวิเคราะห์ว่าเป็นประพจน์หรือไม่ และมีค่าความจริงเป็นเช่นไร:")

sample_sentences = {
    "7 เป็นจำนวนเฉพาะ": {"is_prop": True, "truth": "จริง (True)", "reason": "เป็นประโยคบอกเล่าที่มีความหมายชัดเจน และ 7 มีตัวประกอบเฉพาะแค่ 1 กับ 7"},
    "2 + 3 = 6": {"is_prop": True, "truth": "เท็จ (False)", "reason": "เป็นประโยคบอกเล่าทางคณิตศาสตร์ และค่าที่ถูกต้องคือ 5 ดังนั้นค่าความจริงจึงเป็นเท็จแน่นอน"},
    "x + 5 = 12": {"is_prop": False, "truth": "ยังไม่มีค่าความจริง", "reason": "เป็นประโยคเปิด (Open Sentence) เพราะค่าความจริงขึ้นอยู่กับค่าของตัวแปร x"},
    "กรุณาเดินชิดขวา": {"is_prop": False, "truth": "ไม่มีค่าความจริง", "reason": "เป็นประโยคขอร้อง/คำสั่ง ไม่ใช่ประโยคบอกเล่าหรือปฏิเสธ"},
    "ว้าว! ดอกไม้นี้สวยมาก": {"is_prop": False, "truth": "ไม่มีค่าความจริง", "reason": "เป็นประโยคอุทานและเป็นอัตวิสัย (Subjective)"}
}

chosen_sent = st.selectbox("เลือกข้อความเพื่อทดสอบการวิเคราะห์:", list(sample_sentences.keys()))
analysis = sample_sentences[chosen_sent]

c1, c2 = st.columns(2)
with c1:
    if analysis["is_prop"]:
        st.success("✅ **เป็นประพจน์ (Proposition)**")
    else:
        st.warning("⚠️ **ไม่เป็นประพจน์ (Not a Proposition)**")
with c2:
    st.info(f"**ค่าความจริง:** {analysis['truth']}")

st.markdown(f"**คำอธิบายเชิงวิชาการ:** {analysis['reason']}")

st.markdown("---")

# Chapter Quiz Component
st.markdown("### ✍️ แบบทดสอบท้ายบทที่ 1")
st.write("ทดสอบความเข้าใจเนื้อหาประจำบท (3 ข้อ) พร้อมระบบตรวจคำตอบทันที:")

if "quiz_answers" not in st.session_state:
    st.session_state["quiz_answers"] = {}

for q in QUIZZES["ch1"]:
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
st.caption("สามารถเลือกเรียนบทถัดไป (บทที่ 2: ตัวเชื่อมทางตรรกศาสตร์และตารางค่าความจริง) ได้จากเมนูทางซ้าย")
