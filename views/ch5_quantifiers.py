"""
Chapter 5: Open Sentences & Quantifiers.
"""

import streamlit as st
import pandas as pd
from modules.ui_components import inject_theme, render_hero, render_sidebar_header, render_sidebar_footer
from modules.data import CHAPTERS, QUIZZES

inject_theme()
render_sidebar_header()
render_sidebar_footer()

ch = CHAPTERS["ch5"]

render_hero(
    title=f"บทที่ {ch['number']}: {ch['title']}",
    subtitle=f"{ch['title_en']} — ประโยคเปิด ตัวแปรอิสระ เอกภพสัมพัทธ์ ตัวบ่งปริมาณสากลและมีอยู่ และผลของการสลับลำดับตัวบ่งปริมาณ",
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

# Embedded Interactive Tool: Quantifier Matrix Explorer
st.markdown("### 🧪 กิจกรรมทดลองเชิงโต้ตอบ: เมทริกซ์ตัวบ่งปริมาณ 2 มิติ (Quantifier Matrix Explorer)")
st.write(
    """
    ทดลองสำรวจค่าความจริงของประโยคเปิด $P(x, y)$ บนโดเมนจำกัด เพื่อทำความเข้าใจความแตกต่างของ
    $\\forall x \\forall y$, $\\forall x \\exists y$, $\\exists y \\forall x$, และ $\\exists x \\exists y$:
    """
)

predicates = {
    "x + y == 0 (การบวกได้ศูนย์)": lambda x, y: (x + y == 0),
    "x <= y (การเรียงลำดับน้อยกว่าหรือเท่ากับ)": lambda x, y: (x <= y),
    "x * y > 0 (ผลคูณเป็นบวก)": lambda x, y: (x * y > 0),
    "x == y (ความเท่ากัน)": lambda x, y: (x == y)
}

domains = {
    "U = {-2, -1, 0, 1, 2} (มีศูนย์และค่าลบ)": [-2, -1, 0, 1, 2],
    "U = {1, 2, 3, 4} (จำนวนเต็มบวก)": [1, 2, 3, 4],
    "U = {-1, 1} (โดเมนไบนารี)": [-1, 1]
}

p_col, d_col = st.columns(2)
with p_col:
    chosen_pred = st.selectbox("เลือกประโยคเปิด P(x, y):", list(predicates.keys()))
with d_col:
    chosen_dom = st.selectbox("เลือกเอกภพสัมพัทธ์ U:", list(domains.keys()))

pred_fn = predicates[chosen_pred]
domain_vals = domains[chosen_dom]

# Build 2D truth matrix
matrix_data = []
all_true = True
exists_true = False
for y in domain_vals:
    row = {"y": y}
    for x in domain_vals:
        v = pred_fn(x, y)
        row[f"x = {x}"] = "T" if v else "F"
    matrix_data.append(row)

st.markdown("#### ตารางเมทริกซ์ค่าความจริง P(x, y):")
st.dataframe(pd.DataFrame(matrix_data), use_container_width=True)

# Evaluate the 4 quantified statements
for_all_x_for_all_y = all(pred_fn(x, y) for x in domain_vals for y in domain_vals)
for_all_x_exists_y = all(any(pred_fn(x, y) for y in domain_vals) for x in domain_vals)
exists_y_for_all_x = any(all(pred_fn(x, y) for x in domain_vals) for y in domain_vals)
exists_x_exists_y = any(pred_fn(x, y) for x in domain_vals for y in domain_vals)

res1, res2, res3, res4 = st.columns(4)
with res1:
    st.markdown("**∀x ∀y P(x, y)**")
    st.write("จริงทุกช่อง?" + (" ✅ **TRUE**" if for_all_x_for_all_y else " ❌ **FALSE**"))
with res2:
    st.markdown("**∀x ∃y P(x, y)**")
    st.write("ทุก x มี y คู่ใจ?" + (" ✅ **TRUE**" if for_all_x_exists_y else " ❌ **FALSE**"))
with res3:
    st.markdown("**∃y ∀x P(x, y)**")
    st.write("มีแถว y จริงยกแถว?" + (" ✅ **TRUE**" if exists_y_for_all_x else " ❌ **FALSE**"))
with res4:
    st.markdown("**∃x ∃y P(x, y)**")
    st.write("มี T อย่างน้อย 1 ช่อง?" + (" ✅ **TRUE**" if exists_x_exists_y else " ❌ **FALSE**"))

if for_all_x_exists_y != exists_y_for_all_x:
    st.info("💡 **สังเกต:** $\\forall x \\exists y$ และ $\\exists y \\forall x$ มีค่าความจริงต่างกัน! แสดงให้เห็นอย่างชัดเจนว่าลำดับตัวบ่งปริมาณไม่สามารถสลับที่กันได้")

st.markdown("---")

# Chapter Quiz Component
st.markdown("### ✍️ แบบทดสอบท้ายบทที่ 5")
st.write("ทดสอบความเข้าใจเนื้อหาประจำบท (3 ข้อ) พร้อมระบบตรวจคำตอบทันที:")

if "quiz_answers" not in st.session_state:
    st.session_state["quiz_answers"] = {}

for q in QUIZZES["ch5"]:
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
    st.page_link("views/ch4_arguments.py", label="⬅️ ย้อนกลับ: บทที่ 4 Arguments", icon="4️⃣")
with col_next:
    st.page_link("views/ch6_induction.py", label="➡️ ไปยังบทเรียนถัดไป: บทที่ 6 Inductive & Deductive", icon="6️⃣")
