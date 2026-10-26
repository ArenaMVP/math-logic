"""
Quiz & Assessment Center: 18 interactive questions with instant grading, hints, and explanations.
"""

import streamlit as st
from modules.ui_components import inject_theme, render_hero, render_sidebar_header, render_sidebar_footer
from modules.data import CHAPTERS, QUIZZES

inject_theme()
render_sidebar_header()
render_sidebar_footer()

render_hero(
    title="ศูนย์แบบทดสอบและประเมินผล (Quiz Center)",
    subtitle="แบบทดสอบประเมินความรู้ครบทั้ง 6 บทเรียน (18 ข้อ) พร้อมระบบเฉลยละเอียดและวิเคราะห์คะแนนแบบเรียลไทม์",
    badge="COMPREHENSIVE ASSESSMENT"
)

if "quiz_answers" not in st.session_state:
    st.session_state["quiz_answers"] = {}

# Compute overall score
total_questions = sum(len(qlist) for qlist in QUIZZES.values())
answered_count = len(st.session_state["quiz_answers"])
correct_count = sum(1 for a in st.session_state["quiz_answers"].values() if a.get("is_correct"))

# Score Summary Row
sc1, sc2, sc3 = st.columns(3)
with sc1:
    st.metric("ทำไปแล้วทั้งหมด", f"{answered_count} / {total_questions} ข้อ")
with sc2:
    st.metric("คะแนนที่ได้", f"{correct_count} / {answered_count if answered_count > 0 else 0} คะแนน")
with sc3:
    pct = (correct_count / total_questions) * 100 if total_questions > 0 else 0
    st.metric("ความสำเร็จรวม", f"{pct:.1f}%")

st.progress(answered_count / total_questions if total_questions > 0 else 0)

st.markdown("---")

# Chapter Selector for Quizzes
ch_tabs = st.tabs([
    "บทที่ 1: บทนำ",
    "บทที่ 2: ตัวเชื่อม",
    "บทที่ 3: สัจนิรันดร์",
    "บทที่ 4: การอ้างเหตุผล",
    "บทที่ 5: ตัวบ่งปริมาณ",
    "บทที่ 6: การอุปนัย"
])

ch_keys = ["ch1", "ch2", "ch3", "ch4", "ch5", "ch6"]

for tab, ch_key in zip(ch_tabs, ch_keys):
    with tab:
        ch_meta = CHAPTERS[ch_key]
        st.markdown(f"### แบบทดสอบ {ch_meta['title']} ({ch_meta['title_en']})")
        st.caption(f"จำนวน 3 ข้อ — กรุณาเลือกคำตอบที่ถูกต้องที่สุด")
        
        for q_idx, q in enumerate(QUIZZES[ch_key]):
            qid = q["id"]
            st.markdown(f"#### ข้อที่ {q_idx + 1}: {q['question']}")
            
            saved_ans = st.session_state["quiz_answers"].get(qid, {}).get("selected_idx", None)
            
            user_choice = st.radio(
                "ตัวเลือก:",
                options=range(len(q["options"])),
                format_func=lambda i, opts=q["options"]: opts[i],
                key=f"full_quiz_{qid}",
                index=saved_ans if saved_ans is not None else 0
            )
            
            c_sub, c_hint = st.columns([1, 4])
            with c_sub:
                sub_clicked = st.button("ส่งคำตอบ", key=f"btn_full_quiz_{qid}")
            with c_hint:
                with st.expander("💡 ดูคำใบ้"):
                    st.caption(q["hint"])
                    
            if sub_clicked:
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
            
            st.markdown("<hr style='border: 0.5px dashed #cbd5e1;'>", unsafe_allow_html=True)

st.markdown("---")
if st.button("🔄 รีเซ็ตผลการทำแบบทดสอบทั้งหมด (Reset Progress)"):
    st.session_state["quiz_answers"] = {}
    st.rerun()
