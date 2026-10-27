"""
Formula Summary Page: Comprehensive cheat sheet and repository of all mathematical logic laws,
inference rules, quantifier equivalences, and induction summation identities.
"""

import streamlit as st
from modules.ui_components import inject_theme, render_hero, render_sidebar_header, render_sidebar_footer

inject_theme()
render_sidebar_header()
render_sidebar_footer()

render_hero(
    title="สรุปสูตรและกฎทางตรรกศาสตร์ทั้งหมด",
    subtitle="คลังสูตร กฎสมมูล กฎการอนุมาน และเอกลักษณ์อุปนัยเชิงคณิตศาสตร์ ครบถ้วนตามมาตรฐานสากลและเอกสารวิชาการ",
    badge="COMPREHENSIVE FORMULA SHEET"
)

tab_equiv, tab_inf, tab_quant, tab_ind = st.tabs([
    "📐 กฎสมมูลทางตรรกศาสตร์",
    "🛡️ กฎการอนุมาน (Inference)",
    "🌐 กฎตัวบ่งปริมาณ (Quantifiers)",
    "🀄 เอกลักษณ์อุปนัยคณิตศาสตร์"
])

# =========================================================================
# TAB 1: LOGICAL EQUIVALENCE LAWS
# =========================================================================
with tab_equiv:
    st.markdown("### 📐 กฎและเอกลักษณ์สมมูลทางตรรกศาสตร์ (Logical Equivalence Laws)")
    st.write(r"สูตรสองสูตรจะสมมูลกัน ($\varphi \equiv \psi$) ก็ต่อเมื่อ $\varphi \leftrightarrow \psi$ เป็นสัจนิรันดร์:")
    
    col_e1, col_e2 = st.columns(2)
    
    with col_e1:
        with st.container():
            st.markdown("#### 1. กฎของเดอมอร์แกน (De Morgan's Laws)")
            st.latex(r"\neg (P \land Q) \equiv \neg P \lor \neg Q")
            st.latex(r"\neg (P \lor Q) \equiv \neg P \land \neg Q")
            st.caption("นิเสธของและกลายเป็นหรือ, นิเสธของหรือกลายเป็นและ")

        with st.container():
            st.markdown("#### 2. กฎการแปลงเงื่อนไข (Implication Laws)")
            st.latex(r"P \to Q \equiv \neg P \lor Q")
            st.latex(r"P \to Q \equiv \neg Q \to \neg P \quad \text{(Contrapositive)}")
            st.latex(r"\neg(P \to Q) \equiv P \land \neg Q")

        with st.container():
            st.markdown("#### 3. กฎก็ต่อเมื่อ (Biconditional Laws)")
            st.latex(r"P \leftrightarrow Q \equiv (P \to Q) \land (Q \to P)")
            st.latex(r"P \leftrightarrow Q \equiv (P \land Q) \lor (\neg P \land \neg Q)")
            st.latex(r"P \leftrightarrow Q \equiv \neg P \leftrightarrow \neg Q")

        with st.container():
            st.markdown("#### 4. กฎการแย้งสลับที่ (Contrapositive Law)")
            st.latex(r"P \to Q \equiv \neg Q \to \neg P")
            st.caption("ถ้าเหตุแล้วผล สมมูลกับ ถ้าไม่เกิดผลแล้วย่อมไม่เกิดเหตุ")

    with col_e2:
        with st.container():
            st.markdown("#### 5. กฎการแจกแจง (Distributive Laws)")
            st.latex(r"P \land (Q \lor R) \equiv (P \land Q) \lor (P \land R)")
            st.latex(r"P \lor (Q \land R) \equiv (P \lor Q) \land (P \lor R)")

        with st.container():
            st.markdown("#### 6. กฎการเปลี่ยนหมู่และสลับที่ (Associative & Commutative)")
            st.latex(r"(P \land Q) \land R \equiv P \land (Q \land R)")
            st.latex(r"(P \lor Q) \lor R \equiv P \lor (Q \lor R)")
            st.latex(r"P \land Q \equiv Q \land P, \quad P \lor Q \equiv Q \lor P")

        with st.container():
            st.markdown("#### 7. กฎการซึมซับ (Absorption Laws)")
            st.latex(r"P \lor (P \land Q) \equiv P")
            st.latex(r"P \land (P \lor Q) \equiv P")

        with st.container():
            st.markdown("#### 8. กฎเอกลักษณ์และการครอบงำ (Identity & Domination)")
            st.latex(r"P \land \top \equiv P, \quad P \lor \bot \equiv P \quad \text{(Identity)}")
            st.latex(r"P \lor \top \equiv \top, \quad P \land \bot \equiv \bot \quad \text{(Domination)}")
            st.latex(r"P \lor \neg P \equiv \top, \quad P \land \neg P \equiv \bot \quad \text{(Negation)}")
            st.latex(r"\neg(\neg P) \equiv P \quad \text{(Double Negation)}")

# =========================================================================
# TAB 2: RULES OF INFERENCE
# =========================================================================
with tab_inf:
    st.markdown("### 🛡️ กฎการอนุมานมาตรฐาน 8 ประการ (Standard Rules of Inference)")
    st.info(
        "💡 **กฎการอนุมาน (Rules of Inference) คืออะไร?**\n\n"
        "กฎการอนุมานคือ **แบบแผนการอ้างเหตุผลที่ถูกต้อง (Valid Argument Forms)** ซึ่งเป็นสัจนิรันดร์ (Tautology) "
        "นำมาใช้ใน **การพิสูจน์ทางคณิตศาสตร์ (Formal Proof)** เพื่อก้าวจากเหตุ (Premises) ที่ทราบค่าความจริง "
        "ไปสู่ข้อสรุปใหม่ (Conclusion) โดยไม่ต้องเสียเวลาสร้างตารางค่าความจริงขนาดใหญ่"
    )
    
    col_i1, col_i2 = st.columns(2)
    
    with col_i1:
        with st.container(border=True):
            st.markdown("#### 1. Modus Ponens (MP - กฎการยืนยันเหตุ)")
            st.latex(r"""
            \begin{array}{cl}
            & P \to Q \\
            & P \\
            \hline
            \therefore & Q
            \end{array}
            """)
            st.markdown(r"**คำอธิบาย:** ถ้ารู้ว่าเหตุ $P$ นำไปสู่ผล $Q$ และตัวเหตุ $P$ เกิดขึ้นจริง สรุปได้ทันทีว่าผล $Q$ ต้องเกิดขึ้นจริงตาม")
            st.caption(r"สูตรสัจนิรันดร์: $[(P \to Q) \land P] \to Q$")

        with st.container(border=True):
            st.markdown("#### 2. Modus Tollens (MT - กฎการปฏิเสธผล)")
            st.latex(r"""
            \begin{array}{cl}
            & P \to Q \\
            & \neg Q \\
            \hline
            \therefore & \neg P
            \end{array}
            """)
            st.markdown(r"**คำอธิบาย:** ถ้ารู้ว่า $P$ นำไปสู่ $Q$ แต่ตรวจพบว่าผล $Q$ ไม่จริง ย่อมสรุปได้แน่นอนว่าเหตุ $P$ ต้องไม่เป็นจริงตั้งแต่แรก")
            st.caption(r"สูตรสัจนิรันดร์: $[(P \to Q) \land \neg Q] \to \neg P$")

        with st.container(border=True):
            st.markdown("#### 3. Hypothetical Syllogism (HS - การถ่ายทอดลูกโซ่)")
            st.latex(r"""
            \begin{array}{cl}
            & P \to Q \\
            & Q \to R \\
            \hline
            \therefore & P \to R
            \end{array}
            """)
            st.markdown(r"**คำอธิบาย:** การส่งต่อเหตุผลแบบลูกโซ่ ถ้า $P$ ส่งผลให้เกิด $Q$ และ $Q$ ส่งผลให้เกิด $R$ ดังนั้น $P$ ย่อมส่งผลให้เกิด $R$")
            st.caption(r"สูตรสัจนิรันดร์: $[(P \to Q) \land (Q \to R)] \to (P \to R)$")

        with st.container(border=True):
            st.markdown("#### 4. Disjunctive Syllogism (DS - การตัดทางเลือก)")
            st.latex(r"""
            \begin{array}{cl}
            & P \lor Q \\
            & \neg P \\
            \hline
            \therefore & Q
            \end{array}
            """)
            st.markdown(r"**คำอธิบาย:** ในสองทางเลือก $P$ หรือ $Q$ ถ้าตรวจสอบแล้วพบว่า $P$ ไม่จริง ทางเลือกที่เหลือ $Q$ จะต้องเป็นจริงแน่นอน")
            st.caption(r"สูตรสัจนิรันดร์: $[(P \lor Q) \land \neg P] \to Q$")
            
    with col_i2:
        with st.container(border=True):
            st.markdown("#### 5. Constructive Dilemma (CD - สองทางเลือกสองผล)")
            st.latex(r"""
            \begin{array}{cl}
            & (P \to Q) \land (R \to S) \\
            & P \lor R \\
            \hline
            \therefore & Q \lor S
            \end{array}
            """)
            st.markdown(r"**คำอธิบาย:** มีเงื่อนไขคู่ขนานสองชุด หากเรารู้ว่าต้นเหตุตัวใดตัวหนึ่งเกิดขึ้น ผลลัพธ์ตัวใดตัวหนึ่งก็ย่อมเกิดขึ้นตาม")
            st.caption(r"สูตรสัจนิรันดร์: $[((P \to Q) \land (R \to S)) \land (P \lor R)] \to (Q \lor S)$")

        with st.container(border=True):
            st.markdown("#### 6. Simplification & Conjunction (การลดทอนและการรวม)")
            st.latex(r"""
            \begin{array}{cc}
            \text{[Simplification]} & \text{[Conjunction]} \\
            \begin{array}{cl}
            & P \land Q \\
            \hline
            \therefore & P
            \end{array}
            &
            \begin{array}{cl}
            & P \\
            & Q \\
            \hline
            \therefore & P \land Q
            \end{array}
            \end{array}
            """)
            st.markdown(r"**คำอธิบาย:** ถ้ารู้ว่า $P \land Q$ จริง ย่อมดึงเฉพาะ $P$ มาใช้ได้ (Simp) และถ้ามีข้อเท็จจริง $P$ กับ $Q$ แยกกัน ก็จับมารวมเป็น $P \land Q$ ได้ (Conj)")
            st.caption(r"สูตรสัจนิรันดร์: $(P \land Q) \to P \quad \text{และ} \quad (P \land Q) \to (P \land Q)$")

        with st.container(border=True):
            st.markdown("#### 7. Addition (Add - กฎการเพิ่มทางเลือก)")
            st.latex(r"""
            \begin{array}{cl}
            & P \\
            \hline
            \therefore & P \lor Q
            \end{array}
            """)
            st.markdown(r"**คำอธิบาย:** เมื่อ $P$ เป็นจริงแล้ว การนำประพจน์ $Q$ ใดๆ มาเชื่อมด้วย 'หรือ' ย่อมเป็นจริงเสมอ")
            st.caption(r"สูตรสัจนิรันดร์: $P \to (P \lor Q)$")

        with st.container(border=True):
            st.markdown("#### 8. Resolution (หลักการโซลูชัน)")
            st.latex(r"""
            \begin{array}{cl}
            & P \lor Q \\
            & \neg P \lor R \\
            \hline
            \therefore & Q \lor R
            \end{array}
            """)
            st.markdown(r"**คำอธิบาย:** เมื่อมีประพจน์แย้งกัน ($P$ กับ $\neg P$) ในสองข้อความที่เป็น 'หรือ' สามารถตัดคู่แย้งออกแล้วรวบข้อความที่เหลือเข้าด้วยกัน (รากฐานของระบบ Automatic Reasoning & AI)")
            st.caption(r"สูตรสัจนิรันดร์: $[(P \lor Q) \land (\neg P \lor R)] \to (Q \lor R)$")

# =========================================================================
# TAB 3: QUANTIFIER LAWS
# =========================================================================
with tab_quant:
    st.markdown("### 🌐 สูตรและกฎตัวบ่งปริมาณ (Quantifier Equivalences & Rules)")
    
    col_q1, col_q2 = st.columns(2)
    with col_q1:
        st.markdown("#### 1. กฎการกระจายนิเสธ (Duality of Quantifiers)")
        st.latex(r"\neg [\forall x P(x)] \equiv \exists x [\neg P(x)]")
        st.latex(r"\neg [\exists x P(x)] \equiv \forall x [\neg P(x)]")
        
        st.markdown("#### 2. กฎการแจกแจงผ่านตัวเชื่อม (Distribution over Connectives)")
        st.latex(r"\forall x [P(x) \land Q(x)] \equiv \forall x P(x) \land \forall x Q(x)")
        st.latex(r"\exists x [P(x) \lor Q(x)] \equiv \exists x P(x) \lor \exists x Q(x)")
        st.warning(r"⚠️ **ข้อควรระวัง:** $\forall$ ไม่สามารถแจกแจงผ่าน $\lor$ ได้ และ $\exists$ ไม่สามารถแจกแจงผ่าน $\land$ ได้!")

    with col_q2:
        st.markdown("#### 3. กฎลำดับตัวบ่งปริมาณ (Order Exchange Theorems)")
        st.latex(r"\exists y \forall x P(x, y) \implies \forall x \exists y P(x, y)")
        st.latex(r"\forall x \forall y P(x, y) \equiv \forall y \forall x P(x, y)")
        st.latex(r"\exists x \exists y P(x, y) \equiv \exists y \exists x P(x, y)")
        st.info(r"💡 แต่ $\forall x \exists y P(x, y) \not\implies \exists y \forall x P(x, y)$ (Pointwise Choice ไม่การันตี Uniform Choice)")

# =========================================================================
# TAB 4: MATHEMATICAL INDUCTION IDENTITIES
# =========================================================================
with tab_ind:
    st.markdown("### 🀄 เอกลักษณ์และสูตรสำหรับการพิสูจน์อุปนัยเชิงคณิตศาสตร์")
    
    st.markdown("#### 1. สูตรผลรวมอนุกรมเลขคณิตและยกกำลัง (Summation Formulas)")
    s1, s2 = st.columns(2)
    with s1:
        st.latex(r"\sum_{i=1}^n i = 1 + 2 + \dots + n = \frac{n(n+1)}{2}")
        st.latex(r"\sum_{i=1}^n (2i-1) = 1 + 3 + \dots + (2n-1) = n^2")
        st.latex(r"\sum_{i=1}^n i^2 = 1^2 + 2^2 + \dots + n^2 = \frac{n(n+1)(2n+1)}{6}")
    with s2:
        st.latex(r"\sum_{i=1}^n i^3 = 1^3 + 2^3 + \dots + n^3 = \left(\frac{n(n+1)}{2}\right)^2 = \left(\sum_{i=1}^n i\right)^2")
        st.latex(r"\sum_{i=0}^n r^i = 1 + r + r^2 + \dots + r^n = \frac{r^{n+1}-1}{r-1} \quad (r \ne 1)")

    st.markdown("---")
    st.markdown("#### 2. เอกลักษณ์การหารลงตัว (Divisibility Identity Template)")
    st.latex(r"a^n - b^n = (a - b)(a^{n-1} + a^{n-2}b + \dots + ab^{n-2} + b^{n-1}) \implies (a - b) \mid (a^n - b^n)")
    st.write(r"สูตรนี้เป็นรากฐานของการพิสูจน์โจทย์อุปนัยคลาสสิก เช่น $8 \mid (3^{2n} - 1)$ หรือ $7 \mid (3^{2n+1} + 2^{n+2})$")
