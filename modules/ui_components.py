"""
UI styling and component helpers for the Modern Academic Learning Studio in Streamlit.
"""

import streamlit as st

CUSTOM_CSS = """
<style>
/* Modern Academic Learning Studio Styling */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Sarabun:wght@300;400;500;600;700&display=swap');

html, body, [class*="css"] {
    font-family: 'Sarabun', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
    color: #0f172a;
}

/* =========================================================================
   CLEAN TOP BAR: HIDE DEPLOY/GITHUB/MENU WHILE PRESERVING SIDEBAR TOGGLE
   ========================================================================= */
/* Top Header transparent so page background shines through */
header[data-testid="stHeader"] {
    background: transparent !important;
    pointer-events: none !important;
    z-index: 999990 !important;
    height: 3.5rem !important;
}

[data-testid="stToolbar"] {
    background: transparent !important;
    pointer-events: none !important;
}

/* HIDE ONLY UNWANTED TOP-RIGHT ELEMENTS:
   - Colored decoration bar
   - Status widget
   - Deploy button
   - GitHub view app button
   - 3-dots MainMenu
*/
[data-testid="stDecoration"],
[data-testid="stStatusWidget"],
[data-testid="stAppDeployButton"],
.stAppDeployButton,
div[class*="stAppDeployButton"],
button[title="View app in GitHub"],
[data-testid="stToolbarActionButton"],
#MainMenu,
[data-testid="stMainMenu"],
[data-testid="stMainMenuButton"] {
    display: none !important;
    visibility: hidden !important;
    pointer-events: none !important;
    width: 0px !important;
    height: 0px !important;
}

/* =========================================================================
   SIDEBAR TOGGLE CONTROLS: ALWAYS ACCESSIBLE, PROMINENT & CLICKABLE
   ========================================================================= */
/* The sidebar expand/open button when sidebar is collapsed */
[data-testid="stExpandSidebarButton"],
button[aria-label="Expand sidebar"],
[data-testid="stSidebarCollapsedControl"],
[data-testid="collapsedControl"] {
    display: inline-flex !important;
    visibility: visible !important;
    pointer-events: auto !important;
    opacity: 1 !important;
    z-index: 999999 !important;
    background-color: #0f766e !important;
    color: #ffffff !important;
    border-radius: 8px !important;
    padding: 6px 10px !important;
    margin: 8px !important;
    box-shadow: 0 4px 10px rgba(15, 118, 110, 0.35) !important;
    cursor: pointer !important;
    transition: all 0.2s ease-in-out !important;
}

[data-testid="stExpandSidebarButton"]:hover,
button[aria-label="Expand sidebar"]:hover {
    background-color: #115e59 !important;
    transform: scale(1.08) !important;
    box-shadow: 0 6px 14px rgba(15, 118, 110, 0.45) !important;
}

[data-testid="stExpandSidebarButton"] svg,
button[aria-label="Expand sidebar"] svg {
    fill: #ffffff !important;
    color: #ffffff !important;
    stroke: #ffffff !important;
}

/* The sidebar collapse/close button inside sidebar */
[data-testid="stSidebarCollapseButton"],
button[aria-label="Collapse sidebar"] {
    display: inline-flex !important;
    visibility: visible !important;
    pointer-events: auto !important;
    opacity: 1 !important;
    cursor: pointer !important;
    border-radius: 6px !important;
    color: #0f766e !important;
}

/* Adjust top padding so content is not obscured by the floating toggle */
.main .block-container {
    padding-top: 3.2rem !important;
    padding-bottom: 2.5rem !important;
}

/* Hide Bottom-Right Streamlit Badge, Manage App button, Hosted with Streamlit */
footer,
footer * {
    display: none !important;
    visibility: hidden !important;
    height: 0px !important;
}

#manage-app-button,
[data-testid="manage-app-button"],
div[class*="manageApp"],
div[class*="ManageApp"],
div[class*="manage-app"],
div[class*="Manage-app"],
button[class*="manageApp"],
button[class*="ManageApp"],
div[class*="viewerBadge"],
.viewerBadge_container__1QSob,
.viewerBadge_link__1S137,
[data-testid="manage-app-button"],
div[class*="stAppDeployButton"],
iframe[title="manage-app"] {
    display: none !important;
    visibility: hidden !important;
    opacity: 0 !important;
    height: 0px !important;
    width: 0px !important;
    pointer-events: none !important;
}

/* Sidebar styling */
[data-testid="stSidebar"] {
    background: linear-gradient(180deg, #f8fafc 0%, #f1f5f9 100%);
    border-right: 1px solid #e2e8f0;
}

[data-testid="stSidebarNav"] {
    padding-top: 0.5rem;
}

[data-testid="stSidebarNav"] span {
    font-size: 0.95rem;
    font-weight: 500;
}

/* Header Banner Card */
.studio-hero {
    background: linear-gradient(135deg, #0f766e 0%, #115e59 50%, #134e4a 100%);
    color: white;
    padding: 2.2rem 2.5rem;
    border-radius: 16px;
    margin-bottom: 2rem;
    box-shadow: 0 10px 25px -5px rgba(15, 118, 110, 0.2), 0 8px 10px -6px rgba(15, 118, 110, 0.2);
}

.studio-hero h1 {
    color: #ffffff !important;
    font-size: 2.2rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
}

.studio-hero p {
    color: #ccfbf1 !important;
    font-size: 1.1rem;
    line-height: 1.6;
    margin-bottom: 0;
}

/* Academic Card Container */
.academic-card {
    background: #ffffff;
    border: 1px solid #e2e8f0;
    border-radius: 12px;
    padding: 1.5rem;
    margin-bottom: 1.25rem;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.05);
    transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.academic-card:hover {
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.07);
}

.academic-card h3 {
    color: #0f766e;
    font-size: 1.3rem;
    font-weight: 600;
    margin-top: 0;
    margin-bottom: 0.75rem;
}

/* Callout Boxes */
.callout-info {
    background-color: #f0fdf4;
    border-left: 4px solid #16a34a;
    padding: 1rem 1.25rem;
    border-radius: 0 8px 8px 0;
    margin: 1rem 0;
}

.callout-warning {
    background-color: #fffbeb;
    border-left: 4px solid #d97706;
    padding: 1rem 1.25rem;
    border-radius: 0 8px 8px 0;
    margin: 1rem 0;
}

.callout-definition {
    background-color: #f0fdfa;
    border-left: 4px solid #0f766e;
    padding: 1.2rem 1.4rem;
    border-radius: 0 8px 8px 0;
    margin: 1.2rem 0;
}

/* Badge Pills */
.badge-pill {
    display: inline-block;
    padding: 0.25rem 0.75rem;
    font-size: 0.8rem;
    font-weight: 600;
    border-radius: 9999px;
    background-color: #ccfbf1;
    color: #0f766e;
    margin-right: 0.5rem;
}

.badge-true {
    background-color: #dcfce7;
    color: #15803d;
    font-weight: 600;
    padding: 2px 8px;
    border-radius: 6px;
}

.badge-false {
    background-color: #fee2e2;
    color: #b91c1c;
    font-weight: 600;
    padding: 2px 8px;
    border-radius: 6px;
}

.badge-critical {
    background-color: #fef3c7;
    color: #b45309;
    font-weight: 600;
    padding: 2px 8px;
    border-radius: 6px;
}

/* Table styling */
.truth-table-container table {
    width: 100%;
    border-collapse: collapse;
    margin: 1.2rem 0;
    background-color: #ffffff;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 1px 3px rgba(0,0,0,0.06);
}

.truth-table-container th {
    background-color: #0f766e;
    color: #ffffff !important;
    text-align: center;
    padding: 10px 14px;
    font-weight: 600;
    font-size: 0.95rem;
}

.truth-table-container td {
    padding: 9px 12px;
    text-align: center;
    border-bottom: 1px solid #e2e8f0;
    font-size: 0.95rem;
}

.truth-table-container tr:nth-child(even) {
    background-color: #f8fafc;
}

.truth-table-container tr:hover {
    background-color: #f0fdfa;
}

/* Quiz UI */
.quiz-card {
    background: #ffffff;
    border: 1px solid #cbd5e1;
    border-radius: 12px;
    padding: 1.5rem;
    margin-bottom: 1.5rem;
}

.quiz-explanation {
    background-color: #f8fafc;
    border-left: 4px solid #3b82f6;
    padding: 1.2rem;
    border-radius: 0 8px 8px 0;
    margin-top: 1rem;
    line-height: 1.6;
}

/* Proof Step Container */
.proof-step {
    border-left: 3px solid #0d9488;
    padding-left: 1.2rem;
    margin: 1rem 0;
    background-color: #f8fafc;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    border-radius: 0 6px 6px 0;
}
</style>
"""

def inject_theme():
    """Injects custom CSS theme into the active Streamlit app."""
    st.markdown(CUSTOM_CSS, unsafe_allow_html=True)


def render_sidebar_header():
    """Renders the top branding of the sidebar."""
    with st.sidebar:
        st.markdown(
            """
            <div style="text-align: center; padding: 1rem 0 1.2rem 0; border-bottom: 1px solid #e2e8f0; margin-bottom: 1rem;">
                <div style="font-size: 2.2rem; margin-bottom: 0.2rem;">📐 🧠</div>
                <div style="font-size: 1.25rem; font-weight: 700; color: #0f766e; letter-spacing: -0.02em;">Math Logic Learning</div>
                <div style="font-size: 0.8rem; font-weight: 500; color: #64748b; margin-top: 2px;">Modern Academic Learning Studio</div>
            </div>
            """,
            unsafe_allow_html=True
        )


def render_sidebar_footer():
    """Renders academic credits and progress in the sidebar."""
    with st.sidebar:
        st.markdown("---")
        # Compute quiz progress
        answered = 0
        correct = 0
        total_questions = 18
        if "quiz_answers" in st.session_state:
            for qid, ans in st.session_state["quiz_answers"].items():
                answered += 1
                if ans.get("is_correct"):
                    correct += 1
        
        st.markdown(f"**📊 ความก้าวหน้าการเรียน:**")
        progress_val = min(1.0, answered / total_questions) if total_questions > 0 else 0
        st.progress(progress_val)
        st.caption(f"ทำแบบทดสอบขั้นสูงแล้ว {answered}/{total_questions} ข้อ (ได้คะแนน {correct}/{answered if answered > 0 else 0})")
        
        if st.button("🔄 รีเซ็ตความก้าวหน้าทั้งหมด", use_container_width=True):
            st.session_state["quiz_answers"] = {}
            st.rerun()

        st.markdown(
            """
            <div style="font-size: 0.72rem; color: #94a3b8; text-align: center; margin-top: 1rem;">
                อ้างอิงเอกสาร: <i>Mathematical Logic</i><br>
                Interactive Educational Platform
            </div>
            """,
            unsafe_allow_html=True
        )


def render_hero(title: str, subtitle: str, badge: str = "MATHEMATICAL LOGIC"):
    """Renders the standard top hero card for each page."""
    st.markdown(
        f"""
        <div class="studio-hero">
            <span class="badge-pill" style="background: rgba(255,255,255,0.2); color: #ffffff;">{badge}</span>
            <h1 style="margin-top: 0.6rem;">{title}</h1>
            <p>{subtitle}</p>
        </div>
        """,
        unsafe_allow_html=True
    )
