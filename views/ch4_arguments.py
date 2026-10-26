"""
Chapter 4: Arguments, Validity, Inference Rules & Formal Fallacies.
"""

import streamlit as st
import pandas as pd
from modules.ui_components import inject_theme, render_hero, render_sidebar_header, render_sidebar_footer
from modules.data import CHAPTERS, QUIZZES
from modules.logic_engine import check_argument_validity

inject_theme()
render_sidebar_header()
render_sidebar_footer()

ch = CHAPTERS["ch4"]

render_hero(
    title=f"บทที่ {ch['number']}: {ch['title']}",
    subtitle=f"{ch['title_en']} — โครงสร้างเหตุและผลสรุป ความสมเหตุสมผล กฎการอนุมาน 8 ประการ และการวิเคราะห์เหตุผลวิบัติ",
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

# Embedded Interactive Tool: Argument Validity Checker
st.markdown("### 🧪 กิจกรรมทดลองเชิงโต้ตอบ: ตรวจสอบความสมเหตุสมผลของการอ้างเหตุผล (Validity Inspector)")
st.write("เลือกรูปแบบการอ้างเหตุผลมาตรฐาน หรือกำหนดข้อสมมติและข้อสรุปด้วยตนเอง:")

sample_args = {
    "Modus Ponens (สมเหตุสมผล)": {"premises": "P -> Q\nP", "conclusion": "Q"},
    "Modus Tollens (สมเหตุสมผล)": {"premises": "P -> Q\n~Q", "conclusion": "~P"},
    "Disjunctive Syllogism (สมเหตุสมผล)": {"premises": "P | Q\n~P", "conclusion": "Q"},
    "Hypothetical Syllogism (สมเหตุสมผล)": {"premises": "P -> Q\nQ -> R", "conclusion": "P -> R"},
    "Affirming the Consequent (เหตุผลวิบัติ)": {"premises": "P -> Q\nQ", "conclusion": "P"},
    "Denying the Antecedent (เหตุผลวิบัติ)": {"premises": "P -> Q\n~P", "conclusion": "~Q"},
}

chosen_arg_preset = st.selectbox("เลือกรูปแบบการอ้างเหตุผล:", list(sample_args.keys()))
default_prem = sample_args[chosen_arg_preset]["premises"]
default_conc = sample_args[chosen_arg_preset]["conclusion"]

prem_input = st.text_area("ข้อสมมติ/เหตุ (ใส่ทีละบรรทัดสำหรับแต่ละข้อ):", value=default_prem, height=100)
conc_input = st.text_input("ข้อสรุป (Conclusion):", value=default_conc)

if st.button("ตรวจสอบความสมเหตุสมผล", key="btn_ch4_validate"):
    try:
        prem_list = [line.strip() for line in prem_input.strip().split("\n") if line.strip()]
        val_res = check_argument_validity(prem_list, conc_input.strip())
        
        st.markdown(f"**ประพจน์เงื่อนไขรวม:** `{val_res['full_conditional']}`")
        
        if val_res["is_valid"]:
            st.success("🎉 **การอ้างเหตุผลนี้ 'สมเหตุสมผล' (VALID)**")
            st.write("ในทุกกรณีที่ข้อสมมติทุกข้อเป็นจริงพร้อมกัน ข้อสรุปจะเป็นจริงตามไปด้วยเสมอ (สูตรเงื่อนไขรวมเป็นสัจนิรันดร์)")
        else:
            st.error("🚨 **การอ้างเหตุผลนี้ 'ไม่สมเหตุสมผล' (INVALID / FALLACY)**")
            st.write("พบแถววิกฤตที่ข้อสมมติทุกข้อเป็นจริง แต่ข้อสรุปกลับเป็นเท็จ (เกิด Counterexample)")
            
            # Show counterexamples
            st.markdown("#### แถวตัวอย่างค้าน (Counterexample):")
            ce_data = []
            for ce in val_res["counterexamples"]:
                d = {v: ("T" if ce["valuation"][v] else "F") for v in val_res["variables"]}
                d["ข้อสมมติทั้งหมดเป็นจริง"] = "True"
                d["ข้อสรุป"] = "False"
                ce_data.append(d)
            st.dataframe(pd.DataFrame(ce_data), use_container_width=True)
            
        st.metric("จำนวนแถววิกฤต (ที่เหตุทุกข้อเป็นจริง)", f"{len(val_res['critical_rows'])} / {val_res['total_rows']} แถว")
    except Exception as e:
        st.error(f"ข้อผิดพลาดในการประมวลผล: {str(e)}")

st.markdown("---")

# Chapter Quiz Component
st.markdown("### ✍️ แบบทดสอบท้ายบทที่ 4")
st.write("ทดสอบความเข้าใจเนื้อหาประจำบท (3 ข้อ) พร้อมระบบตรวจคำตอบทันที:")

if "quiz_answers" not in st.session_state:
    st.session_state["quiz_answers"] = {}

for q in QUIZZES["ch4"]:
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
st.caption("สามารถเลือกเรียนบทถัดไป (บทที่ 5: ประโยคเปิดและตัวบ่งปริมาณ) ได้จากเมนูทางซ้าย")
