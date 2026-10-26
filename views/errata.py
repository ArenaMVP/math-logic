"""
Mathematical Audit & Errata: Rigorous documentation of mathematical discrepancies in the source document.
"""

import streamlit as st
import pandas as pd
from modules.ui_components import inject_theme, render_hero, render_sidebar_header, render_sidebar_footer
from modules.data import ERRATA_ITEMS
from modules.logic_engine import generate_truth_table

inject_theme()
render_sidebar_header()
render_sidebar_footer()

render_hero(
    title="บันทึกการตรวจสอบเอกสาร (Mathematical Audit & Errata)",
    subtitle="รายงานการตรวจสอบความถูกต้องทางคณิตศาสตร์จากเอกสาร PDF ต้นฉบับ พร้อมข้อพิสูจน์และตัวอย่างค้าน (Countermodel)",
    badge="ACADEMIC RIGOR & AUDIT"
)

st.markdown("### 🔍 จุดประสงค์ของการตรวจสอบทางวิชาการ")
st.write(
    """
    ในการพัฒนาสื่อการสอนเชิงวิชาการระดับอุดมศึกษา **ความถูกต้องทางคณิตศาสตร์เป็นสิ่งที่ต้องยึดมั่นอย่างสูงสุด**
    ทีมพัฒนาได้นำทุกตัวอย่างและข้อพิสูจน์ในเอกสาร `637868054818062507_Mathematical_Logic1.pdf` 
    เข้าสู่การตรวจสอบด้วย Custom Logic Engine ที่อ้างอิงตามทฤษฎีอรรถศาสตร์เชิงรูปนัย (Formal Model Theory) 
    และพบข้อคลาดเคลื่อนสำคัญในเอกสารต้นฉบับดังต่อไปนี้:
    """
)

# Render Errata Items
for item in ERRATA_ITEMS:
    with st.container():
        st.markdown(
            f"""
            <div class="academic-card">
                <span class="badge-pill" style="background-color: #fee2e2; color: #b91c1c;">⚠️ {item['flaw_type']}</span>
                <span style="font-size: 0.85rem; color: #64748b;">ตำแหน่ง: <b>{item['page']} — {item['location']}</b></span>
                <h3 style="margin-top: 0.6rem; color: #0f172a;">ประพจน์ที่ตรวจสอบ: <code>{item.get('formula', '')}</code></h3>
                <p><b>ข้ออ้างในเอกสารต้นฉบับ:</b> {item['pdf_claim']}</p>
                <div class="callout-warning">
                    <b>ผลการตรวจสอบทางคณิตศาสตร์ที่แท้จริง:</b><br>
                    {item['conclusion']}
                </div>
                <p style="font-size: 0.92rem; color: #334155;"><b>คำอธิบายเชิงลึก:</b> {item['academic_note']}</p>
            </div>
            """,
            unsafe_allow_html=True
        )

st.markdown("---")

# Interactive Verification for Page 15 Example 3
st.markdown("### 🧪 พิสูจน์ตัวอย่างค้านหน้า 15 ด้วยตนเอง (Live Interactive Verification)")
st.write("สูตรที่มีปัญหาในเอกสารหน้า 15: `((P -> Q) & (R -> S) & (P | S)) -> (Q | R)`")

if st.button("กดที่นี่เพื่อคำนวณและแสดงผลตารางค่าความจริง 16 แถวแบบเต็ม"):
    res = generate_truth_table("((P -> Q) & (R -> S) & (P | S)) -> (Q | R)")
    
    st.markdown(f"**การจำแนกประเภท:** `{res['classification']}` (จริง {res['true_count']} แถว, เท็จ {res['false_count']} แถว)")
    
    # Highlight the false row
    table_rows = []
    for r in res["rows"]:
        d = {v: ("T" if r[v] else "F") for v in res["variables"]}
        d["ผลลัพธ์สูตร"] = "TRUE" if r["_main_"] else "💥 FALSE (Countermodel)"
        table_rows.append(d)
        
    df = pd.DataFrame(table_rows)
    st.dataframe(df, use_container_width=True)
    
    st.success("✅ **ยืนยันผลลัพธ์:** มีกรณีหนึ่งที่ทำให้สูตรเป็นเท็จ (P=F, Q=F, R=F, S=T) จึงไม่ใช่สัจนิรันดร์อย่างแน่นอน!")
