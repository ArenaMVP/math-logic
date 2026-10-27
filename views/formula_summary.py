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
    st.write("กฎการอนุมานคือรูปแบบสัจนิรันดร์ที่ใช้ในการก้าวจากเหตุ (Premises) ไปสู่ข้อสรุป (Conclusion):")
    
    col_i1, col_i2 = st.columns(2)
    
    with col_i1:
        st.markdown(
            r"""
            <div class="academic-card">
                <h4>1. Modus Ponens (MP)</h4>
                $$\begin{aligned} &P \to Q \\ &P \\ \hline \therefore &Q \end{aligned}$$
                <small>สูตรสัจนิรันดร์: $[(P \to Q) \land P] \to Q$</small>
            </div>
            <div class="academic-card">
                <h4>2. Modus Tollens (MT)</h4>
                $$\begin{aligned} &P \to Q \\ &\neg Q \\ \hline \therefore &\neg P \end{aligned}$$
                <small>สูตรสัจนิรันดร์: $[(P \to Q) \land \neg Q] \to \neg P$</small>
            </div>
            <div class="academic-card">
                <h4>3. Hypothetical Syllogism (HS)</h4>
                $$\begin{aligned} &P \to Q \\ &Q \to R \\ \hline \therefore &P \to R \end{aligned}$$
                <small>การถ่ายทอดลูกโซ่: $[(P \to Q) \land (Q \to R)] \to (P \to R)$</small>
            </div>
            <div class="academic-card">
                <h4>4. Disjunctive Syllogism (DS)</h4>
                $$\begin{aligned} &P \lor Q \\ &\neg P \\ \hline \therefore &Q \end{aligned}$$
                <small>การตัดทางเลือก: $[(P \lor Q) \land \neg P] \to Q$</small>
            </div>
            """,
            unsafe_allow_html=True
        )
        
    with col_i2:
        st.markdown(
            r"""
            <div class="academic-card">
                <h4>5. Constructive Dilemma (CD)</h4>
                $$\begin{aligned} &(P \to Q) \land (R \to S) \\ &P \lor R \\ \hline \therefore &Q \lor S \end{aligned}$$
                <small>สองทางเลือกนำไปสู่ผลสองทาง</small>
            </div>
            <div class="academic-card">
                <h4>6. Simplification (Simp) & Conjunction (Conj)</h4>
                $$\begin{aligned} &P \land Q \\ \hline \therefore &P \end{aligned} \qquad \begin{aligned} &P \\ &Q \\ \hline \therefore &P \land Q \end{aligned}$$
            </div>
            <div class="academic-card">
                <h4>7. Addition (Add)</h4>
                $$\begin{aligned} &P \\ \hline \therefore &P \lor Q \end{aligned}$$
            </div>
            <div class="academic-card">
                <h4>8. Resolution (หลักการโซลูชัน)</h4>
                $$\begin{aligned} &P \lor Q \\ &\neg P \lor R \\ \hline \therefore &Q \lor R \end{aligned}$$
                <small>รากฐานของ Automated Theorem Proving</small>
            </div>
            """,
            unsafe_allow_html=True
        )

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
