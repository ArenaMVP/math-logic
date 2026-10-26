"""
Glossary & Mathematical Symbols Dictionary.
"""

import streamlit as st
from modules.ui_components import inject_theme, render_hero, render_sidebar_header, render_sidebar_footer
from modules.data import GLOSSARY

inject_theme()
render_sidebar_header()
render_sidebar_footer()

render_hero(
    title="คลังสัญลักษณ์และนิยามตรรกศาสตร์ (Glossary & Symbols)",
    subtitle="พจนานุกรมศัพท์ทางคณิตศาสตร์ สัญลักษณ์มาตรฐานสากล คำอ่าน และตัวอย่างการใช้งานอย่างเป็นระบบ",
    badge="REFERENCE & DICTIONARY"
)

# Search & Filter
c_search, c_filter = st.columns([2, 1])
with c_search:
    search_query = st.text_input("🔍 ค้นหาคำศัพท์ หรือสัญลักษณ์:", value="").strip().lower()
with c_filter:
    categories = ["ทั้งหมด"] + sorted(list(set(item["category"] for item in GLOSSARY)))
    selected_cat = st.selectbox("หมวดหมู่:", categories)

# Filter items
filtered = []
for item in GLOSSARY:
    if selected_cat != "ทั้งหมด" and item["category"] != selected_cat:
        continue
    if search_query:
        match_term = search_query in item["term"].lower()
        match_sym = search_query in item["symbol"].lower()
        match_def = search_query in item["definition"].lower()
        if not (match_term or match_sym or match_def):
            continue
    filtered.append(item)

st.markdown(f"**พบคำศัพท์ทั้งหมด {len(filtered)} รายการ:**")

# Render Cards
for item in filtered:
    with st.container():
        st.markdown(
            f"""
            <div class="academic-card">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
                    <span style="font-size: 1.25rem; font-weight: 700; color: #0f766e;">{item['term']}</span>
                    <span class="badge-pill" style="font-size: 1.1rem; padding: 0.3rem 0.8rem; font-family: monospace;">{item['symbol']}</span>
                </div>
                <div style="font-size: 0.85rem; color: #64748b; margin-bottom: 0.6rem;">หมวดหมู่: <b>{item['category']}</b></div>
                <p style="font-size: 0.95rem; color: #1e293b; line-height: 1.5; margin-bottom: 0.5rem;">{item['definition']}</p>
                <div style="font-size: 0.88rem; background-color: #f8fafc; padding: 0.6rem 0.8rem; border-radius: 6px; border-left: 3px solid #0d9488;">
                    <b>ตัวอย่าง:</b> <code>{item['example']}</code>
                </div>
            </div>
            """,
            unsafe_allow_html=True
        )

if not filtered:
    st.info("ไม่พบคำศัพท์ที่ตรงกับคำค้นหา กรุณาลองใช้คำค้นหาอื่น")
