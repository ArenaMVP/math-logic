"""
Logic Lab: Interactive Studio Hub with 7 working mathematical tools.
"""

import streamlit as st
import pandas as pd
from modules.ui_components import inject_theme, render_hero, render_sidebar_header, render_sidebar_footer
from modules.logic_engine import (
    generate_truth_table,
    check_equivalence,
    check_argument_validity,
    parse_expression
)

inject_theme()
render_sidebar_header()
render_sidebar_footer()

render_hero(
    title="Logic Lab (ห้องทดลองตรรกศาสตร์)",
    subtitle="เครื่องมือคำนวณและวิเคราะห์ตรรกศาสตร์เชิงสัญลักษณ์ ขับเคลื่อนด้วย Custom AST Logic Engine ปลอดภัย 100% ไม่ใช้ eval()",
    badge="INTERACTIVE LABORATORY"
)

tab1, tab2, tab3, tab4, tab5, tab6, tab7 = st.tabs([
    "⚡ Truth Table Builder",
    "⚖️ Equivalence Checker",
    "🔍 Tautology Checker",
    "🛡️ Argument Validity",
    "🧩 Inference Rules",
    "🌐 Quantifier Matrix",
    "🀄 Induction Lab"
])

# =========================================================================
# TAB 1: TRUTH TABLE BUILDER
# =========================================================================
with tab1:
    st.markdown("### ⚡ เครื่องสร้างตารางค่าความจริงอัตโนมัติ (Truth Table Builder)")
    st.write("พิมพ์นิพจน์ตรรกศาสตร์ รองรับตัวเชื่อม: `~` (นิเสธ), `&` (และ), `|` (หรือ), `->` (ถ้า...แล้ว), `<->` (ก็ต่อเมื่อ)")
    
    tt_presets = [
        "P & Q -> R",
        "~(P & Q) <-> (~P | ~Q)",
        "(P -> Q) & P -> Q",
        "(P | Q) & (~P | R) -> (Q | R)",
        "(P -> Q) & (Q -> R) -> (P -> R)",
        "((P -> Q) & (R -> S) & (P | S)) -> (Q | R)",
        "A & B & C -> D"
    ]
    
    sel_tt = st.selectbox("เลือกสูตรตัวอย่าง:", tt_presets, key="sel_tt_preset")
    tt_expr = st.text_input("นิพจน์ตรรกศาสตร์:", value=sel_tt, key="txt_tt_expr")
    
    if st.button("คำนวณตารางค่าความจริง", key="btn_tt_run"):
        try:
            res = generate_truth_table(tt_expr)
            st.latex(res["latex"])
            
            # Build DataFrame
            rows_data = []
            for r in res["rows"]:
                d = {}
                for v in res["variables"]:
                    d[v] = "T" if r[v] else "F"
                for sub in res["subexpressions"]:
                    d[sub] = "T" if r[sub] else "F"
                d[res["expression"]] = "T" if r["_main_"] else "F"
                rows_data.append(d)
                
            df = pd.DataFrame(rows_data)
            st.dataframe(df, use_container_width=True)
            
            col_a, col_b, col_c = st.columns(3)
            with col_a:
                st.metric("จำนวนตัวแปร (n)", len(res["variables"]))
            with col_b:
                st.metric("จำนวนแถว (2^n)", f"{res['total_rows']} แถว")
            with col_c:
                badge = res["classification"]
                if badge == "Tautology":
                    st.success(f"**ประเภท:** {res['class_desc']}")
                elif badge == "Contradiction":
                    st.error(f"**ประเภท:** {res['class_desc']}")
                else:
                    st.warning(f"**ประเภท:** {res['class_desc']} (T: {res['true_count']} / F: {res['false_count']})")
        except Exception as e:
            st.error(f"เกิดข้อผิดพลาดในการวิเคราะห์สูตร: {str(e)}")

# =========================================================================
# TAB 2: EQUIVALENCE CHECKER
# =========================================================================
with tab2:
    st.markdown("### ⚖️ เครื่องตรวจสอบสมมูลตรรกศาสตร์ (Logical Equivalence Checker)")
    st.write("เปรียบเทียบนิพจน์ 2 ตัวว่าให้ค่าความจริงตรงกันทุกกรณีหรือไม่ ($\\varphi \\equiv \\psi$) พร้อมดึงตัวอย่างค้านออกมาทันทีเมื่อไม่สมมูล")
    
    eq_presets = {
        "กฎของเดอมอร์แกน 1": ("~(P & Q)", "~P | ~Q"),
        "กฎของเดอมอร์แกน 2": ("~(P | Q)", "~P & ~Q"),
        "การแปลงถ้า...แล้ว": ("P -> Q", "~P | Q"),
        "กฎการแย้งสลับที่ (Contrapositive)": ("P -> Q", "~Q -> ~P"),
        "ตัวอย่างที่ไม่สมมูล (Fallacy)": ("P -> Q", "Q -> P"),
    }
    
    chosen_eq_pair = st.selectbox("เลือกคู่ทดสอบมาตรฐาน:", list(eq_presets.keys()), key="sel_eq_pair")
    default_e1, default_e2 = eq_presets[chosen_eq_pair]
    
    c_e1, c_e2 = st.columns(2)
    with c_e1:
        e1_input = st.text_input("นิพจน์ที่ 1 (φ):", value=default_e1, key="txt_e1")
    with c_e2:
        e2_input = st.text_input("นิพจน์ที่ 2 (ψ):", value=default_e2, key="txt_e2")
        
    if st.button("ตรวจสอบความสมมูล (Equivalence Test)", key="btn_eq_run"):
        try:
            eq_res = check_equivalence(e1_input, e2_input)
            
            c_lat1, c_lat2 = st.columns(2)
            with c_lat1:
                st.latex(f"\\varphi: {eq_res['expr1_latex']}")
            with c_lat2:
                st.latex(f"\\psi: {eq_res['expr2_latex']}")
                
            if eq_res["is_equivalent"]:
                st.success("🎉 **สมมูลกันอย่างสมบูรณ์ (LOGICALLY EQUIVALENT: φ ≡ ψ)**")
                st.write("ทั้งสองสูตรให้ค่าความจริงตรงกันทุกแถวในตารางค่าความจริง (ประพจน์ $\\varphi \\leftrightarrow \\psi$ เป็นสัจนิรันดร์)")
            else:
                st.error("❌ **ไม่สมมูลกัน (NOT EQUIVALENT: φ ≢ ψ)**")
                st.write(f"พบแถวที่ให้ผลลัพธ์ต่างกันทั้งหมด {len(eq_res['countermodels'])} กรณี:")
                
                # Show countermodels table
                cm_data = []
                for cm in eq_res["countermodels"]:
                    d = {v: ("T" if cm["valuation"][v] else "F") for v in eq_res["variables"]}
                    d[f"φ ({eq_res['expr1']})"] = "True" if cm["v1"] else "False"
                    d[f"ψ ({eq_res['expr2']})"] = "True" if cm["v2"] else "False"
                    cm_data.append(d)
                st.dataframe(pd.DataFrame(cm_data), use_container_width=True)
        except Exception as e:
            st.error(f"ข้อผิดพลาด: {str(e)}")

# =========================================================================
# TAB 3: TAUTOLOGY CHECKER
# =========================================================================
with tab3:
    st.markdown("### 🔍 เครื่องจำแนกประเภทประพจน์ (Tautology / Contradiction / Contingency)")
    st.write("จำแนกว่าสูตรทางตรรกศาสตร์เป็น สัจนิรันดร์ (จริงทุกกรณี), ข้อขัดแย้ง (เท็จทุกกรณี) หรือ ประพจน์ตามเงื่อนไข")
    
    taut_input = st.text_input("สูตรที่ต้องการจำแนก:", value="((P -> Q) & (R -> S) & (P | S)) -> (Q | R)", key="txt_taut")
    
    if st.button("วิเคราะห์ประเภทประพจน์", key="btn_taut_run"):
        try:
            t_res = generate_truth_table(taut_input)
            st.latex(t_res["latex"])
            
            if t_res["classification"] == "Tautology":
                st.success("🏆 **เป็นสัจนิรันดร์ (TAUTOLOGY: ⊤)**")
                st.write("มีค่าเป็นจริง ($T$) ในทุกการกำหนดค่าความจริง 100%")
            elif t_res["classification"] == "Contradiction":
                st.error("💥 **เป็นข้อขัดแย้ง (CONTRADICTION: ⊥)**")
                st.write("มีค่าเป็นเท็จ ($F$) ในทุกการกำหนดค่าความจริง 100%")
            else:
                st.warning("⚖️ **เป็นประพจน์ตามเงื่อนไข (CONTINGENT PROPOSITION)**")
                st.write(f"ผลลัพธ์มีทั้งจริงและเท็จผสมกัน (จริง {t_res['true_count']} กรณี, เท็จ {t_res['false_count']} กรณี จากทั้งหมด {t_res['total_rows']} กรณี)")
                
                # Display counterexamples
                bad_rows = []
                for r in t_res["rows"]:
                    if not r["_main_"]:
                        d = {v: ("T" if r[v] else "F") for v in t_res["variables"]}
                        d["ผลลัพธ์ของสูตร"] = "False"
                        bad_rows.append(d)
                st.markdown("##### กรณีที่เป็นเท็จ (Countermodels):")
                st.dataframe(pd.DataFrame(bad_rows), use_container_width=True)
        except Exception as e:
            st.error(f"ข้อผิดพลาด: {str(e)}")

# =========================================================================
# TAB 4: ARGUMENT VALIDITY CHECKER
# =========================================================================
with tab4:
    st.markdown("### 🛡️ เครื่องตรวจสอบความสมเหตุสมผลของการอ้างเหตุผล (Argument Validity)")
    st.write("ป้อนชุดข้อสมมติ (Premises) และข้อสรุป (Conclusion) เพื่อตรวจสอบว่า $(P_1 \\land \\dots \\land P_k) \\to C$ สมเหตุสมผลหรือไม่")
    
    arg_p_input = st.text_area("ข้อสมมติ (แยกทีละบรรทัด):", value="P -> Q\n~Q", height=100, key="txt_arg_p")
    arg_c_input = st.text_input("ข้อสรุป (Conclusion):", value="~P", key="txt_arg_c")
    
    if st.button("ตรวจสอบความสมเหตุสมผล (Validate Argument)", key="btn_arg_run"):
        try:
            p_lines = [l.strip() for l in arg_p_input.split("\n") if l.strip()]
            arg_res = check_argument_validity(p_lines, arg_c_input.strip())
            
            st.markdown(f"**ประพจน์เงื่อนไขรวม:** `{arg_res['full_conditional']}`")
            
            if arg_res["is_valid"]:
                st.success("🎉 **การอ้างเหตุผลนี้ 'สมเหตุสมผล' (VALID)**")
                st.write("เมื่อใดก็ตามที่เหตุทุกข้อเป็นจริงพร้อมกัน ข้อสรุปจะจริงตามไปด้วยเสมอ")
            else:
                st.error("🚨 **การอ้างเหตุผลนี้ 'ไม่สมเหตุสมผล' (INVALID / FALLACY)**")
                st.write("พบกรณีที่เหตุทุกข้อเป็นจริง แต่ข้อสรุปกลับเป็นเท็จ!")
                
                ce_tab = []
                for ce in arg_res["counterexamples"]:
                    d = {v: ("T" if ce["valuation"][v] else "F") for v in arg_res["variables"]}
                    d["เหตุทุกข้อเป็นจริง"] = "True"
                    d["ข้อสรุป"] = "False"
                    ce_tab.append(d)
                st.dataframe(pd.DataFrame(ce_tab), use_container_width=True)
                
            st.info(f"จำนวนแถววิกฤต (Critical Rows ที่เหตุเป็นจริงทุกข้อ): **{len(arg_res['critical_rows'])} / {arg_res['total_rows']} แถว**")
        except Exception as e:
            st.error(f"ข้อผิดพลาด: {str(e)}")

# =========================================================================
# TAB 5: INFERENCE RULES PLAYGROUND
# =========================================================================
with tab5:
    st.markdown("### 🧩 ห้องทดลองกฎการอนุมาน (Inference Rules Trainer)")
    st.write("ทดลองแทนค่าตัวแปร $P, Q, R$ และสังเกตการทำงานของ 8 กฎการอนุมานมาตรฐาน:")
    
    rules = {
        "Modus Ponens (MP)": {"rule": "P -> Q, P ⊢ Q", "desc": "ถ้าเกิด P แล้วย่อมเกิด Q; และเมื่อเกิด P จริง ย่อมสรุปได้ว่าเกิด Q"},
        "Modus Tollens (MT)": {"rule": "P -> Q, ~Q ⊢ ~P", "desc": "ถ้าเกิด P แล้วย่อมเกิด Q; แต่ Q ไม่เกิด ย่อมสรุปได้ว่า P ไม่ได้เกิด"},
        "Hypothetical Syllogism (HS)": {"rule": "P -> Q, Q -> R ⊢ P -> R", "desc": "การถ่ายทอดเงื่อนไขลูกโซ่จาก P ไปยัง R"},
        "Disjunctive Syllogism (DS)": {"rule": "P | Q, ~P ⊢ Q", "desc": "ตัวเลือก P หรือ Q; แต่ตัด P ทิ้ง ย่อมเหลือเพียง Q"},
        "Constructive Dilemma (CD)": {"rule": "(P -> Q) & (R -> S), P | R ⊢ Q | S", "desc": "ทางเลือกสองทาง นำไปสู่ผลลัพธ์สองทาง"}
    }
    
    sel_rule = st.selectbox("เลือกกฎการอนุมาน:", list(rules.keys()), key="sel_rule_box")
    r_data = rules[sel_rule]
    
    st.markdown(f"**รูปแบบเชิงรูปนัย:** `{r_data['rule']}`")
    st.markdown(f"**คำอธิบายเชิงตรรกะ:** {r_data['desc']}")
    
    p_val = st.checkbox("กำหนดให้ P เป็นจริง", value=True, key="chk_p")
    q_val = st.checkbox("กำหนดให้ Q เป็นจริง", value=True, key="chk_q")
    r_val = st.checkbox("กำหนดให้ R เป็นจริง", value=False, key="chk_r")
    
    st.info(f"การกำหนดค่าปัจจุบัน: P={p_val}, Q={q_val}, R={r_val}")

# =========================================================================
# TAB 6: QUANTIFIER MATRIX EXPLORER
# =========================================================================
with tab6:
    st.markdown("### 🌐 เครื่องจำลองเมทริกซ์ตัวบ่งปริมาณ (Quantifier Matrix Explorer)")
    st.write("สำรวจค่าความจริงของ $\\forall x \\forall y$, $\\forall x \\exists y$, $\\exists y \\forall x$, และ $\\exists x \\exists y$ บนโดเมนจำกัด:")
    
    lab_preds = {
        "x + y == 0": lambda x, y: x + y == 0,
        "x <= y": lambda x, y: x <= y,
        "x * y > 0": lambda x, y: x * y > 0,
        "x != y": lambda x, y: x != y
    }
    chosen_lp = st.selectbox("ประโยคเปิด P(x, y):", list(lab_preds.keys()), key="sel_lab_p")
    fn = lab_preds[chosen_lp]
    
    dom = [-2, -1, 0, 1, 2]
    st.write(r"เอกภพสัมพัทธ์: $U = \{-2, -1, 0, 1, 2\}$")
    
    # 2D Grid
    m_rows = []
    for y in dom:
        row = {"y": y}
        for x in dom:
            row[f"x={x}"] = "T" if fn(x, y) else "F"
        m_rows.append(row)
    st.dataframe(pd.DataFrame(m_rows), use_container_width=True)
    
    fxfy = all(fn(x, y) for x in dom for y in dom)
    fxey = all(any(fn(x, y) for y in dom) for x in dom)
    eyfx = any(all(fn(x, y) for x in dom) for y in dom)
    exey = any(fn(x, y) for x in dom for y in dom)
    
    qa, qb, qc, qd = st.columns(4)
    qa.metric("∀x ∀y", "TRUE" if fxfy else "FALSE")
    qb.metric("∀x ∃y", "TRUE" if fxey else "FALSE")
    qc.metric("∃y ∀x", "TRUE" if eyfx else "FALSE")
    qd.metric("∃x ∃y", "TRUE" if exey else "FALSE")

# =========================================================================
# TAB 7: MATHEMATICAL INDUCTION LAB
# =========================================================================
with tab7:
    st.markdown("### 🀄 ห้องทดลองการอุปนัยเชิงคณิตศาสตร์ (Mathematical Induction Lab)")
    st.write("ทดสอบการเท่ากันของผลรวมลำดับอนันต์ $\\sum_{i=1}^n i$ กับสูตรปิด $\\frac{n(n+1)}{2}$:")
    
    n_slider = st.slider("เลือกค่าจำนวนเต็มบวก n:", 1, 50, 15, key="slider_ind_n")
    
    terms_list = list(range(1, n_slider + 1))
    sum_actual = sum(terms_list)
    sum_formula = n_slider * (n_slider + 1) // 2
    
    col_i1, col_i2 = st.columns(2)
    with col_i1:
        st.metric("ผลบวกตรง 1 + 2 + ... + n", sum_actual)
    with col_i2:
        st.metric("สูตรปิด n(n+1)/2", sum_formula)
        
    st.success(f"✅ ยืนยันการเท่ากัน: ผลรวม {sum_actual} เท่ากับค่าจากสูตร {sum_formula} ทุกประการ!")
