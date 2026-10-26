// Mathematical Logic Studio - Main Application
(function () {
  'use strict';

  const { useState, useEffect, useMemo, useRef, useCallback } = React;
  const LE = window.LogicEngine;
  const { CHAPTERS_DATA, TRUTH_TABLE_PRESETS, GLOSSARY_DATA, PDF_CORRECTIONS_DATA } = window;

  // Local Storage Progress Helper
  const STORAGE_KEY = 'math_logic_studio_progress_v1';
  function loadProgress() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Could not load progress', e);
    }
    return {
      completedChapters: [],
      quizScores: {},
      lastActiveChapter: 1,
    };
  }

  function saveProgress(data) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.warn('Could not save progress', e);
    }
  }

  // --- Common UI Components ---

  // KaTeX Math Renderer with robust fallback
  function MathView({ math, block = false, className = '' }) {
    const spanRef = useRef(null);

    useEffect(() => {
      if (!spanRef.current) return;
      if (window.katex) {
        try {
          window.katex.render(math, spanRef.current, {
            displayMode: block,
            throwOnError: false,
          });
          return;
        } catch (e) {
          console.warn('KaTeX error:', e);
        }
      }
      // Fallback unicode replacement
      let clean = math
        .replace(/\\neg/g, '¬')
        .replace(/\\land/g, '∧')
        .replace(/\\lor/g, '∨')
        .replace(/\\to/g, '→')
        .replace(/\\rightarrow/g, '→')
        .replace(/\\leftrightarrow/g, '↔')
        .replace(/\\iff/g, '↔')
        .replace(/\\forall/g, '∀')
        .replace(/\\exists/g, '∃')
        .replace(/\\equiv/g, '≡')
        .replace(/\\vdash/g, '⊢')
        .replace(/\\top/g, '⊤')
        .replace(/\\bot/g, '⊥')
        .replace(/\\quad/g, '   ')
        .replace(/\\text\{([^}]+)\}/g, '$1');
      spanRef.current.textContent = clean;
    }, [math, block]);

    return React.createElement('span', {
      ref: spanRef,
      className: `font-mono inline-block ${block ? 'block text-center my-2 py-1 overflow-x-auto text-teal-900 font-semibold' : 'px-1 text-teal-800 font-medium'} ${className}`,
    });
  }

  // Color-coded True/False Badge
  function TruthBadge({ value, size = 'sm' }) {
    const isTrue = Boolean(value);
    const szClass = size === 'lg' ? 'px-3 py-1 text-sm font-bold' : 'px-2 py-0.5 text-xs font-semibold';
    return React.createElement(
      'span',
      {
        className: `inline-flex items-center justify-center rounded-md transition-colors ${szClass} ${
          isTrue
            ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
            : 'bg-rose-100 text-rose-800 border border-rose-300'
        }`,
      },
      isTrue ? 'T (จริง)' : 'F (เท็จ)'
    );
  }

  // Callout Alert Box
  function AlertBox({ type = 'info', title, children }) {
    const styles = {
      info: 'bg-sky-50 border-sky-300 text-sky-900',
      tip: 'bg-teal-50 border-teal-300 text-teal-900',
      warning: 'bg-amber-50 border-amber-300 text-amber-900',
      correction: 'bg-purple-50 border-purple-300 text-purple-900',
    };
    const badges = {
      info: 'คำแนะนำเพิ่มเติม (Info)',
      tip: 'เทคนิคการคิด (Tip)',
      warning: 'ข้อควรระวัง (Caution)',
      correction: 'การตรวจสอบทางคณิตศาสตร์ (Errata Audit)',
    };

    return React.createElement(
      'div',
      { className: `p-4 rounded-xl border my-4 shadow-xs ${styles[type] || styles.info}` },
      React.createElement(
        'div',
        { className: 'flex items-center gap-2 mb-1.5' },
        React.createElement(
          'span',
          { className: 'text-xs uppercase font-extrabold tracking-wider px-2 py-0.5 rounded bg-white/70 border border-current' },
          badges[type]
        ),
        title && React.createElement('span', { className: 'font-bold text-sm' }, title)
      ),
      React.createElement('div', { className: 'text-sm leading-relaxed' }, children)
    );
  }

  // Step-by-step Proof Box
  function ProofStepBox({ proof }) {
    if (!proof) return null;
    return React.createElement(
      'div',
      { className: 'my-6 rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm' },
      React.createElement(
        'div',
        { className: 'bg-slate-900 text-white px-5 py-3 flex flex-wrap items-center justify-between gap-2' },
        React.createElement('div', { className: 'font-bold text-sm sm:text-base' }, proof.title),
        proof.prove && React.createElement(
          'div',
          { className: 'text-xs font-mono bg-teal-800/80 px-2.5 py-1 rounded-md text-teal-100 border border-teal-600/50' },
          'ต้องพิสูจน์: ',
          proof.prove
        )
      ),
      proof.premises && React.createElement(
        'div',
        { className: 'bg-slate-50 border-b border-slate-200 px-5 py-2.5 text-xs text-slate-600 font-medium' },
        'ข้อสมมติฐาน (Premises): ',
        React.createElement('span', { className: 'font-mono text-slate-800 font-bold' }, proof.premises)
      ),
      React.createElement(
        'div',
        { className: 'overflow-x-auto' },
        React.createElement(
          'table',
          { className: 'w-full text-left text-sm' },
          React.createElement(
            'thead',
            { className: 'bg-slate-100/70 border-b border-slate-200 text-xs font-semibold text-slate-600' },
            React.createElement(
              'tr',
              null,
              React.createElement('th', { className: 'px-4 py-2 w-16 text-center' }, 'ขั้นตอน'),
              React.createElement('th', { className: 'px-4 py-2' }, 'ข้อความทางตรรกศาสตร์ (Statement)'),
              React.createElement('th', { className: 'px-4 py-2' }, 'เหตุผล / กฎการอ้างอิง (Justification)')
            )
          ),
          React.createElement(
            'tbody',
            { className: 'divide-y divide-slate-100' },
            proof.steps.map((s) =>
              React.createElement(
                'tr',
                { key: s.step, className: 'hover:bg-teal-50/40 transition-colors' },
                React.createElement('td', { className: 'px-4 py-2.5 text-center font-bold text-slate-400 text-xs' }, s.step),
                React.createElement(
                  'td',
                  { className: 'px-4 py-2.5 font-mono text-teal-900 font-semibold text-sm' },
                  s.statement
                ),
                React.createElement(
                  'td',
                  { className: 'px-4 py-2.5 text-slate-600 text-xs sm:text-sm' },
                  s.justification
                )
              )
            )
          )
        )
      ),
      proof.notes && React.createElement(
        'div',
        { className: 'bg-slate-50/50 border-t border-slate-200 px-5 py-2 text-xs text-slate-500 italic' },
        proof.notes
      )
    );
  }

  // --- Interactive Tools ---

  // TOOL 1: Truth Table Builder
  function TruthTableBuilder() {
    const [formula, setFormula] = useState('(p → q) ∧ p → q');
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);

    const calculate = useCallback((input) => {
      setError(null);
      try {
        const table = LE.generateTruthTable(input);
        setResult(table);
      } catch (err) {
        setError(err.message || 'เกิดข้อผิดพลาดในการวิเคราะห์สูตร');
        setResult(null);
      }
    }, []);

    useEffect(() => {
      calculate(formula);
    }, []);

    const insertSymbol = (sym) => {
      setFormula((prev) => prev + sym);
    };

    return React.createElement(
      'div',
      { className: 'bg-white rounded-2xl border border-slate-200 p-5 md:p-6 shadow-sm space-y-5' },
      React.createElement(
        'div',
        { className: 'flex flex-wrap items-center justify-between gap-3' },
        React.createElement(
          'div',
          null,
          React.createElement('h3', { className: 'text-lg font-bold text-slate-900' }, 'เครื่องมือ 1: เครื่องมือสร้างตารางค่าความจริง (Truth Table Builder)'),
          React.createElement('p', { className: 'text-xs text-slate-500' }, 'คำนวณตารางค่าความจริงอัตโนมัติ 2ⁿ แถว แยกคอลัมน์นิพจน์ย่อย และตรวจสอบสัจนิรันดร์')
        ),
        React.createElement(
          'select',
          {
            className: 'text-xs border border-slate-300 rounded-lg px-3 py-1.5 bg-slate-50 text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-teal-500',
            onChange: (e) => {
              if (e.target.value) {
                setFormula(e.target.value);
                calculate(e.target.value);
              }
            },
            defaultValue: '',
          },
          React.createElement('option', { value: '' }, '-- เลือกสูตรตัวอย่างจากเอกสาร --'),
          TRUTH_TABLE_PRESETS.map((p) =>
            React.createElement('option', { key: p.id, value: p.formula }, `${p.labelTh}: ${p.formula}`)
          )
        )
      ),

      // Input and symbol keyboard
      React.createElement(
        'div',
        { className: 'space-y-2' },
        React.createElement(
          'div',
          { className: 'flex gap-2' },
          React.createElement('input', {
            type: 'text',
            value: formula,
            onChange: (e) => setFormula(e.target.value),
            onKeyDown: (e) => e.key === 'Enter' && calculate(formula),
            placeholder: 'เช่น (p → q) ∧ ¬q → ¬p',
            className: 'flex-1 font-mono text-sm px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-slate-50/50',
          }),
          React.createElement(
            'button',
            {
              onClick: () => calculate(formula),
              className: 'px-5 py-2.5 bg-teal-600 hover:bg-teal-700 text-white text-sm font-bold rounded-xl transition shadow-xs',
            },
            'คำนวณตาราง'
          )
        ),
        // Virtual Keyboard
        React.createElement(
          'div',
          { className: 'flex flex-wrap gap-1.5 pt-1' },
          ['p', 'q', 'r', 's', '¬', '∧', '∨', '→', '↔', '(', ')'].map((sym) =>
            React.createElement(
              'button',
              {
                key: sym,
                onClick: () => insertSymbol(sym),
                className: 'px-3 py-1 bg-slate-100 hover:bg-teal-100 text-slate-800 hover:text-teal-900 border border-slate-300 rounded-lg font-mono text-sm font-semibold transition shadow-2xs',
              },
              sym
            )
          ),
          React.createElement(
            'button',
            {
              onClick: () => setFormula(''),
              className: 'px-3 py-1 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-lg text-xs font-semibold transition ml-auto',
            },
            'ล้าง'
          )
        )
      ),

      // Error banner
      error &&
        React.createElement(
          'div',
          { className: 'p-3 rounded-xl bg-rose-50 border border-rose-300 text-rose-800 text-sm font-medium' },
          'ข้อผิดพลาด: ',
          error
        ),

      // Table Output
      result &&
        React.createElement(
          'div',
          { className: 'space-y-4' },
          // Classification summary pill
          React.createElement(
            'div',
            { className: 'flex flex-wrap items-center justify-between gap-3 p-3.5 bg-slate-50 border border-slate-200 rounded-xl' },
            React.createElement(
              'div',
              { className: 'flex items-center gap-2' },
              React.createElement('span', { className: 'text-xs text-slate-500 font-semibold' }, 'การจัดประเภท:'),
              result.classification === 'tautology' &&
                React.createElement(
                  'span',
                  { className: 'px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 font-extrabold text-xs border border-emerald-300' },
                  '✓ สัจนิรันดร์ (Tautology) — จริงในทุกกรณี'
                ),
              result.classification === 'contradiction' &&
                React.createElement(
                  'span',
                  { className: 'px-3 py-1 rounded-full bg-rose-100 text-rose-800 font-extrabold text-xs border border-rose-300' },
                  '✗ ข้อขัดแย้ง (Contradiction) — เท็จในทุกกรณี'
                ),
              result.classification === 'contingent' &&
                React.createElement(
                  'span',
                  { className: 'px-3 py-1 rounded-full bg-amber-100 text-amber-800 font-extrabold text-xs border border-amber-300' },
                  '⚡ ประพจน์เงื่อนไข (Contingent) — มีทั้งกรณีจริงและเท็จ'
                )
            ),
            React.createElement(
              'div',
              { className: 'text-xs text-slate-500 font-medium' },
              `ตัวแปร: ${result.variables.join(', ')} (${result.totalRows} แถว)`
            )
          ),

          // Scrollable Table
          React.createElement(
            'div',
            { className: 'overflow-x-auto rounded-xl border border-slate-200' },
            React.createElement(
              'table',
              { className: 'w-full text-left text-sm border-collapse' },
              React.createElement(
                'thead',
                { className: 'bg-slate-100 text-slate-700 text-xs font-bold border-b border-slate-200' },
                React.createElement(
                  'tr',
                  null,
                  React.createElement('th', { className: 'px-3 py-2.5 text-center w-12 text-slate-400' }, '#'),
                  result.variables.map((v) =>
                    React.createElement('th', { key: v, className: 'px-3 py-2.5 text-center font-mono font-bold text-teal-900 border-r border-slate-200' }, v)
                  ),
                  result.subExpressions.map((sub) =>
                    React.createElement('th', { key: sub, className: 'px-3 py-2.5 text-center font-mono text-slate-600 border-r border-slate-200 text-xs' }, sub)
                  ),
                  React.createElement('th', { className: 'px-4 py-2.5 text-center font-mono font-extrabold text-teal-800 bg-teal-50/60' }, result.formula)
                )
              ),
              React.createElement(
                'tbody',
                { className: 'divide-y divide-slate-100' },
                result.rows.map((row) =>
                  React.createElement(
                    'tr',
                    { key: row.id, className: `hover:bg-slate-50 transition-colors ${row.result ? 'bg-white' : 'bg-rose-50/30'}` },
                    React.createElement('td', { className: 'px-3 py-2 text-center text-xs text-slate-400 font-mono' }, row.id),
                    result.variables.map((v) =>
                      React.createElement(
                        'td',
                        { key: v, className: 'px-3 py-2 text-center font-mono border-r border-slate-100 font-medium' },
                        React.createElement(TruthBadge, { value: row.valuation[v] })
                      )
                    ),
                    result.subExpressions.map((sub) =>
                      React.createElement(
                        'td',
                        { key: sub, className: 'px-3 py-2 text-center font-mono border-r border-slate-100' },
                        React.createElement(TruthBadge, { value: row.intermediates[sub] })
                      )
                    ),
                    React.createElement(
                      'td',
                      { className: 'px-4 py-2 text-center font-mono bg-teal-50/30' },
                      React.createElement(TruthBadge, { value: row.result, size: 'sm' })
                    )
                  )
                )
              )
            )
          )
        )
    );
  }

  // TOOL 2: Equivalence Checker
  function EquivalenceChecker() {
    const [expr1, setExpr1] = useState('p → q');
    const [expr2, setExpr2] = useState('¬p ∨ q');
    const [res, setRes] = useState(null);
    const [err, setErr] = useState(null);

    const check = useCallback((e1, e2) => {
      setErr(null);
      try {
        const out = LE.checkEquivalence(e1, e2);
        setRes(out);
      } catch (error) {
        setErr(error.message || 'เกิดข้อผิดพลาดในการตรวจสอบสมมูล');
        setRes(null);
      }
    }, []);

    useEffect(() => {
      check(expr1, expr2);
    }, []);

    return React.createElement(
      'div',
      { className: 'bg-white rounded-2xl border border-slate-200 p-5 md:p-6 shadow-sm space-y-5' },
      React.createElement(
        'div',
        null,
        React.createElement('h3', { className: 'text-lg font-bold text-slate-900' }, 'เครื่องมือ 2: ตัวตรวจสอบสมมูลทางตรรกศาสตร์ (Equivalence Checker)'),
        React.createElement('p', { className: 'text-xs text-slate-500' }, 'เปรียบเทียบค่าความจริงของประพจน์ 2 ตัว และไฮไลต์กรณีที่ค่าความจริงไม่ตรงกัน (Countermodel)')
      ),
      React.createElement(
        'div',
        { className: 'grid grid-cols-1 md:grid-cols-2 gap-4' },
        React.createElement(
          'div',
          { className: 'space-y-1' },
          React.createElement('label', { className: 'text-xs font-bold text-slate-700' }, 'นิพจน์ A:'),
          React.createElement('input', {
            type: 'text',
            value: expr1,
            onChange: (e) => setExpr1(e.target.value),
            className: 'w-full font-mono text-sm px-4 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-slate-50/50',
          })
        ),
        React.createElement(
          'div',
          { className: 'space-y-1' },
          React.createElement('label', { className: 'text-xs font-bold text-slate-700' }, 'นิพจน์ B:'),
          React.createElement('input', {
            type: 'text',
            value: expr2,
            onChange: (e) => setExpr2(e.target.value),
            className: 'w-full font-mono text-sm px-4 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-slate-50/50',
          })
        )
      ),
      React.createElement(
        'div',
        { className: 'flex flex-wrap items-center justify-between gap-2' },
        React.createElement(
          'div',
          { className: 'flex gap-2' },
          React.createElement(
            'button',
            {
              onClick: () => check(expr1, expr2),
              className: 'px-5 py-2 bg-teal-600 hover:bg-teal-700 text-white text-sm font-bold rounded-xl transition',
            },
            'ตรวจสอบสมมูล (A ≡ B)'
          )
        ),
        React.createElement(
          'div',
          { className: 'flex flex-wrap gap-1 text-xs' },
          React.createElement('span', { className: 'text-slate-400 py-1' }, 'ตัวอย่าง:'),
          [
            { l: 'De Morgan', a: '¬(p ∧ q)', b: '¬p ∨ ¬q' },
            { l: 'Conditional', a: 'p → q', b: '¬p ∨ q' },
            { l: 'Contrapositive', a: 'p → q', b: '¬q → ¬p' },
            { l: 'Converse (ไม่สมมูล)', a: 'p → q', b: 'q → p' },
          ].map((item) =>
            React.createElement(
              'button',
              {
                key: item.l,
                onClick: () => {
                  setExpr1(item.a);
                  setExpr2(item.b);
                  check(item.a, item.b);
                },
                className: 'px-2.5 py-1 bg-slate-100 hover:bg-teal-100 rounded-lg text-slate-700 hover:text-teal-900 border border-slate-200 transition',
              },
              item.l
            )
          )
        )
      ),
      err && React.createElement('div', { className: 'p-3 bg-rose-50 border border-rose-300 text-rose-800 text-sm rounded-xl' }, err),
      res &&
        React.createElement(
          'div',
          { className: 'space-y-4' },
          React.createElement(
            'div',
            {
              className: `p-4 rounded-xl border flex items-center justify-between ${
                res.isEquivalent ? 'bg-emerald-50 border-emerald-300 text-emerald-900' : 'bg-rose-50 border-rose-300 text-rose-900'
              }`,
            },
            React.createElement(
              'div',
              { className: 'space-y-0.5' },
              React.createElement(
                'div',
                { className: 'font-bold text-sm sm:text-base' },
                res.isEquivalent ? '✓ ประพจน์ทั้งสองสมมูลกัน (Logically Equivalent: A ≡ B)' : '✗ ประพจน์ทั้งสองไม่สมมูลกัน (Not Equivalent: A ≢ B)'
              ),
              React.createElement(
                'div',
                { className: 'text-xs opacity-80' },
                res.isEquivalent ? 'ค่าความจริงในตารางตรงกันทุกกรณี' : `พบกรณีที่ค่าความจริงต่างกัน ${res.counterexamples.length} กรณี`
              )
            )
          ),
          React.createElement(
            'div',
            { className: 'overflow-x-auto rounded-xl border border-slate-200' },
            React.createElement(
              'table',
              { className: 'w-full text-left text-sm' },
              React.createElement(
                'thead',
                { className: 'bg-slate-100 text-xs font-bold text-slate-700 border-b border-slate-200' },
                React.createElement(
                  'tr',
                  null,
                  res.variables.map((v) => React.createElement('th', { key: v, className: 'px-3 py-2 text-center' }, v)),
                  React.createElement('th', { className: 'px-4 py-2 text-center font-mono text-teal-900' }, `A: ${res.expr1}`),
                  React.createElement('th', { className: 'px-4 py-2 text-center font-mono text-teal-900' }, `B: ${res.expr2}`),
                  React.createElement('th', { className: 'px-3 py-2 text-center' }, 'สถานะ (A ↔ B)')
                )
              ),
              React.createElement(
                'tbody',
                { className: 'divide-y divide-slate-100 font-mono text-xs' },
                res.rows.map((r, i) =>
                  React.createElement(
                    'tr',
                    { key: i, className: r.match ? 'hover:bg-slate-50' : 'bg-rose-50/60 font-bold' },
                    res.variables.map((v) =>
                      React.createElement('td', { key: v, className: 'px-3 py-2 text-center' }, React.createElement(TruthBadge, { value: r.valuation[v] }))
                    ),
                    React.createElement('td', { className: 'px-4 py-2 text-center' }, React.createElement(TruthBadge, { value: r.val1 })),
                    React.createElement('td', { className: 'px-4 py-2 text-center' }, React.createElement(TruthBadge, { value: r.val2 })),
                    React.createElement(
                      'td',
                      { className: 'px-3 py-2 text-center' },
                      r.match
                        ? React.createElement('span', { className: 'text-emerald-700 font-bold' }, '✓ ตรงกัน')
                        : React.createElement('span', { className: 'text-rose-700 font-bold' }, '✗ ไม่ตรงกัน')
                    )
                  )
                )
              )
            )
          )
        )
    );
  }

  // TOOL 3: Argument Validity Checker
  function ArgumentChecker() {
    const [premises, setPremises] = useState(['p → q', 'p']);
    const [conclusion, setConclusion] = useState('q');
    const [res, setRes] = useState(null);
    const [err, setErr] = useState(null);

    const check = useCallback((pList, conc) => {
      setErr(null);
      try {
        const out = LE.checkArgumentValidity(pList, conc);
        setRes(out);
      } catch (error) {
        setErr(error.message || 'เกิดข้อผิดพลาดในการตรวจสอบการอ้างเหตุผล');
        setRes(null);
      }
    }, []);

    useEffect(() => {
      check(premises, conclusion);
    }, []);

    const addPremise = () => setPremises((p) => [...p, '']);
    const removePremise = (idx) => setPremises((p) => p.filter((_, i) => i !== idx));
    const updatePremise = (idx, val) => {
      const copy = [...premises];
      copy[idx] = val;
      setPremises(copy);
    };

    return React.createElement(
      'div',
      { className: 'bg-white rounded-2xl border border-slate-200 p-5 md:p-6 shadow-sm space-y-5' },
      React.createElement(
        'div',
        null,
        React.createElement('h3', { className: 'text-lg font-bold text-slate-900' }, 'เครื่องมือ 3: ตัวตรวจสอบความสมเหตุสมผลของการอ้างเหตุผล (Argument Validity Checker)'),
        React.createElement('p', { className: 'text-xs text-slate-500' }, 'ตรวจสอบข้อสมมติฐาน P₁ ∧ ... ∧ Pₖ ⊢ C ค้นหากรณีที่เหตุเป็นจริงทั้งหมดแต่ข้อสรุปเป็นเท็จ (Counterexample)')
      ),
      React.createElement(
        'div',
        { className: 'space-y-3' },
        premises.map((p, idx) =>
          React.createElement(
            'div',
            { key: idx, className: 'flex items-center gap-2' },
            React.createElement('span', { className: 'text-xs font-bold text-slate-500 w-16' }, `เหตุที่ ${idx + 1}:`),
            React.createElement('input', {
              type: 'text',
              value: p,
              onChange: (e) => updatePremise(idx, e.target.value),
              placeholder: 'เช่น p → q',
              className: 'flex-1 font-mono text-sm px-3.5 py-1.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-slate-50/50',
            }),
            premises.length > 1 &&
              React.createElement(
                'button',
                {
                  onClick: () => removePremise(idx),
                  className: 'text-rose-600 hover:text-rose-800 text-xs font-bold px-2 py-1',
                },
                'ลบ'
              )
          )
        ),
        React.createElement(
          'button',
          {
            onClick: addPremise,
            className: 'text-xs font-bold text-teal-600 hover:text-teal-800 px-3 py-1 bg-teal-50 rounded-lg border border-teal-200 transition',
          },
          '+ เพิ่มข้อสมมติฐาน (เหตุ)'
        ),
        React.createElement(
          'div',
          { className: 'flex items-center gap-2 pt-2 border-t border-slate-200' },
          React.createElement('span', { className: 'text-xs font-extrabold text-teal-900 w-16' }, 'ข้อสรุป:'),
          React.createElement('input', {
            type: 'text',
            value: conclusion,
            onChange: (e) => setConclusion(e.target.value),
            placeholder: 'เช่น q',
            className: 'flex-1 font-mono text-sm px-3.5 py-1.5 rounded-xl border border-teal-300 bg-teal-50/40 focus:outline-none focus:ring-2 focus:ring-teal-500 font-bold',
          })
        )
      ),
      React.createElement(
        'div',
        { className: 'flex flex-wrap items-center justify-between gap-2' },
        React.createElement(
          'button',
          {
            onClick: () => check(premises, conclusion),
            className: 'px-5 py-2 bg-teal-600 hover:bg-teal-700 text-white text-sm font-bold rounded-xl transition',
          },
          'ตรวจสอบการอ้างเหตุผล'
        ),
        React.createElement(
          'div',
          { className: 'flex flex-wrap gap-1 text-xs' },
          React.createElement('span', { className: 'text-slate-400 py-1' }, 'ตัวอย่าง:'),
          [
            { l: 'Modus Ponens', p: ['p → q', 'p'], c: 'q' },
            { l: 'Modus Tollens', p: ['p → q', '¬q'], c: '¬p' },
            { l: 'Syllogism', p: ['p → q', 'q → r'], c: 'p → r' },
            { l: 'Fallacy: ยอมรับผล', p: ['p → q', 'q'], c: 'p' },
          ].map((item) =>
            React.createElement(
              'button',
              {
                key: item.l,
                onClick: () => {
                  setPremises(item.p);
                  setConclusion(item.c);
                  check(item.p, item.c);
                },
                className: 'px-2.5 py-1 bg-slate-100 hover:bg-teal-100 rounded-lg text-slate-700 hover:text-teal-900 border border-slate-200 transition',
              },
              item.l
            )
          )
        )
      ),
      err && React.createElement('div', { className: 'p-3 bg-rose-50 border border-rose-300 text-rose-800 text-sm rounded-xl' }, err),
      res &&
        React.createElement(
          'div',
          { className: 'space-y-4' },
          React.createElement(
            'div',
            {
              className: `p-4 rounded-xl border ${
                res.isValid ? 'bg-emerald-50 border-emerald-300 text-emerald-900' : 'bg-rose-50 border-rose-300 text-rose-900'
              }`,
            },
            React.createElement(
              'div',
              { className: 'font-extrabold text-base' },
              res.isValid ? '✓ สมเหตุสมผล (Valid Argument)' : '✗ ไม่สมเหตุสมผล (Invalid Argument / Fallacy)'
            ),
            React.createElement(
              'div',
              { className: 'text-xs mt-1' },
              res.isValid
                ? 'ในทุกกรณีที่เหตุเป็นจริงพร้อมกันทั้งหมด ข้อสรุปจะเป็นจริงเสมอ (ไม่มี Counterexample)'
                : `พบตัวอย่างค้าน ${res.counterexamples.length} กรณี ที่เหตุเป็นจริงทั้งหมดแต่ข้อสรุปเป็นเท็จ!`
            )
          )
        )
    );
  }

  // TOOL 4: Inference Rules Trainer
  function InferenceTrainer() {
    const rules = [
      { id: 'mp', name: 'Modus Ponens (MP)', premises: 'p → q, p', conclusion: 'q', desc: 'หากมีเงื่อนไขและมีเหตุจริง ย่อมสรุปผลได้จริง' },
      { id: 'mt', name: 'Modus Tollens (MT)', premises: 'p → q, ¬q', conclusion: '¬p', desc: 'หากผลเป็นเท็จ ย่อมสรุปได้ว่าเหตุต้องเป็นเท็จ' },
      { id: 'hs', name: 'Hypothetical Syllogism (HS)', premises: 'p → q, q → r', conclusion: 'p → r', desc: 'การถ่ายทอดเงื่อนไขลูกโซ่' },
      { id: 'ds', name: 'Disjunctive Syllogism (DS)', premises: 'p ∨ q, ¬p', conclusion: 'q', desc: 'ตัดทางเลือกหนึ่งทิ้ง ย่อมเหลืออีกทางเลือก' },
      { id: 'cd', name: 'Constructive Dilemma (CD)', premises: '(p → q) ∧ (r → s), p ∨ r', conclusion: 'q ∨ s', desc: 'การอนุมานแยกกรณีสองทาง' },
      { id: 'fac', name: 'Fallacy of Affirming Consequent', premises: 'p → q, q', conclusion: 'p (ผิด!)', desc: 'ข้อผิดพลาด: นำผลที่เกิดมาสรุปว่าเกิดจากเหตุนี้เท่านั้น' },
      { id: 'fda', name: 'Fallacy of Denying Antecedent', premises: 'p → q, ¬p', conclusion: '¬q (ผิด!)', desc: 'ข้อผิดพลาด: ปฏิเสธเหตุแล้วด่วนสรุปว่าผลต้องไม่เกิด' },
    ];

    const [activeRule, setActiveRule] = useState(rules[0]);

    return React.createElement(
      'div',
      { className: 'bg-white rounded-2xl border border-slate-200 p-5 md:p-6 shadow-sm space-y-5' },
      React.createElement(
        'div',
        null,
        React.createElement('h3', { className: 'text-lg font-bold text-slate-900' }, 'เครื่องมือ 4: คลังและแบบฝึกหัดกฎการอนุมาน (Inference Rules Trainer)'),
        React.createElement('p', { className: 'text-xs text-slate-500' }, 'เรียนรู้กฎการอนุมานพื้นฐานและแยกแยะรูปแบบการอ้างเหตุผลที่ผิดพลาด (Formal Fallacies)')
      ),
      React.createElement(
        'div',
        { className: 'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2' },
        rules.map((r) =>
          React.createElement(
            'button',
            {
              key: r.id,
              onClick: () => setActiveRule(r),
              className: `px-3 py-2 rounded-xl text-left text-xs font-bold border transition ${
                activeRule.id === r.id
                  ? 'bg-teal-600 text-white border-teal-700 shadow-sm'
                  : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border-slate-200'
              }`,
            },
            r.name
          )
        )
      ),
      React.createElement(
        'div',
        { className: 'p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-3' },
        React.createElement(
          'div',
          { className: 'flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-3' },
          React.createElement('h4', { className: 'font-bold text-slate-900 text-base' }, activeRule.name),
          React.createElement(
            'span',
            { className: `text-xs px-2.5 py-1 rounded-full font-bold ${activeRule.id.startsWith('f') ? 'bg-rose-100 text-rose-800 border border-rose-300' : 'bg-emerald-100 text-emerald-800 border border-emerald-300'}` },
            activeRule.id.startsWith('f') ? 'รูปแบบไม่สมเหตุสมผล (Fallacy)' : 'กฎอนุมานที่ถูกต้อง (Valid Rule)'
          )
        ),
        React.createElement(
          'div',
          { className: 'grid grid-cols-1 sm:grid-cols-2 gap-4' },
          React.createElement(
            'div',
            { className: 'bg-white p-3.5 rounded-xl border border-slate-200' },
            React.createElement('div', { className: 'text-xs text-slate-500 font-semibold mb-1' }, 'เหตุ (Premises):'),
            React.createElement('div', { className: 'font-mono text-teal-900 font-bold text-base' }, activeRule.premises)
          ),
          React.createElement(
            'div',
            { className: 'bg-white p-3.5 rounded-xl border border-slate-200' },
            React.createElement('div', { className: 'text-xs text-slate-500 font-semibold mb-1' }, 'ผลสรุป (Conclusion):'),
            React.createElement('div', { className: 'font-mono text-teal-900 font-bold text-base' }, activeRule.conclusion)
          )
        ),
        React.createElement('p', { className: 'text-sm text-slate-700 leading-relaxed' }, activeRule.desc)
      )
    );
  }

  // TOOL 5: Quantifier Matrix Explorer
  function QuantifierExplorer() {
    // 4x4 matrix representing P(x, y) where x, y in {1, 2, 3, 4}
    const [matrix, setMatrix] = useState([
      [true, true, true, true],
      [false, true, true, false],
      [true, false, true, true],
      [false, false, false, true],
    ]);

    const toggleCell = (r, c) => {
      const copy = matrix.map((row, ri) =>
        row.map((val, ci) => (ri === r && ci === c ? !val : val))
      );
      setMatrix(copy);
    };

    // Computations
    // 1. ∀x ∀y P(x, y)
    const forallXforallY = matrix.every((row) => row.every((v) => v));
    // 2. ∀x ∃y P(x, y) (Every row has at least one True)
    const forallXexistsY = matrix.every((row) => row.some((v) => v));
    // 3. ∃y ∀x P(x, y) (There is a column that is all True)
    const existsYforallX = [0, 1, 2, 3].some((col) => matrix.every((row) => row[col]));
    // 4. ∃x ∃y P(x, y) (At least one cell is True)
    const existsXexistsY = matrix.some((row) => row.some((v) => v));

    return React.createElement(
      'div',
      { className: 'bg-white rounded-2xl border border-slate-200 p-5 md:p-6 shadow-sm space-y-5' },
      React.createElement(
        'div',
        null,
        React.createElement('h3', { className: 'text-lg font-bold text-slate-900' }, 'เครื่องมือ 5: ตารางสำรวจตัวบ่งปริมาณสองชั้น (Quantifier Matrix Explorer)'),
        React.createElement('p', { className: 'text-xs text-slate-500' }, 'คลิกช่องในตารางความสัมพันธ์ P(x, y) เพื่อสังเกตความแตกต่างระหว่าง ∀x ∃y P(x, y) และ ∃y ∀x P(x, y)')
      ),
      React.createElement(
        'div',
        { className: 'grid grid-cols-1 md:grid-cols-2 gap-6 items-center' },
        // Interactive 4x4 Grid
        React.createElement(
          'div',
          { className: 'space-y-2' },
          React.createElement('div', { className: 'text-xs font-bold text-slate-600 text-center' }, 'ตารางความจริง P(x, y) บนเอกภพสัมพัทธ์ U = {1, 2, 3, 4} (คลิกเพื่อสลับ T / F)'),
          React.createElement(
            'div',
            { className: 'inline-block mx-auto border-2 border-slate-300 rounded-xl overflow-hidden shadow-xs bg-slate-100 p-2' },
            React.createElement(
              'table',
              { className: 'border-collapse text-center text-xs' },
              React.createElement(
                'thead',
                null,
                React.createElement(
                  'tr',
                  null,
                  React.createElement('th', { className: 'p-1.5 font-mono text-slate-400' }, 'x\\y'),
                  [1, 2, 3, 4].map((y) =>
                    React.createElement('th', { key: y, className: 'p-1.5 font-mono text-teal-800 font-bold' }, `y=${y}`)
                  )
                )
              ),
              React.createElement(
                'tbody',
                null,
                matrix.map((row, r) =>
                  React.createElement(
                    'tr',
                    { key: r },
                    React.createElement('td', { className: 'p-1.5 font-mono text-teal-800 font-bold' }, `x=${r + 1}`),
                    row.map((val, c) =>
                      React.createElement(
                        'td',
                        { key: c, className: 'p-1' },
                        React.createElement(
                          'button',
                          {
                            onClick: () => toggleCell(r, c),
                            className: `w-9 h-9 rounded-lg font-mono font-extrabold text-sm transition shadow-2xs ${
                              val
                                ? 'bg-emerald-500 text-white hover:bg-emerald-600'
                                : 'bg-rose-100 text-rose-700 hover:bg-rose-200 border border-rose-300'
                            }`,
                          },
                          val ? 'T' : 'F'
                        )
                      )
                    )
                  )
                )
              )
            )
          )
        ),
        // Live Evaluations
        React.createElement(
          'div',
          { className: 'space-y-3' },
          [
            { label: '∀x ∀y P(x, y)', desc: 'จริงทุกช่องในตาราง', val: forallXforallY },
            { label: '∀x ∃y P(x, y)', desc: 'ทุกแถว มีอย่างน้อย 1 ช่องที่เป็นจริง', val: forallXexistsY },
            { label: '∃y ∀x P(x, y)', desc: 'มีอย่างน้อย 1 คอลัมน์ ที่เป็นจริงตลอดทั้งหลัก', val: existsYforallX },
            { label: '∃x ∃y P(x, y)', desc: 'มีอย่างน้อย 1 ช่องในตารางที่เป็นจริง', val: existsXexistsY },
          ].map((item) =>
            React.createElement(
              'div',
              { key: item.label, className: 'p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between gap-3' },
              React.createElement(
                'div',
                null,
                React.createElement('div', { className: 'font-mono text-sm font-bold text-teal-900' }, item.label),
                React.createElement('div', { className: 'text-xs text-slate-500' }, item.desc)
              ),
              React.createElement(TruthBadge, { value: item.val, size: 'sm' })
            )
          ),
          React.createElement(
            'div',
            { className: 'p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 leading-relaxed' },
            React.createElement('strong', null, 'ข้อสังเกตสำคัญ: '),
            'หาก ∃y ∀x P(x, y) เป็นจริง จะส่งผลให้ ∀x ∃y P(x, y) เป็นจริงเสมอ แต่บทกลับไม่จำเป็นต้องเป็นจริง!'
          )
        )
      )
    );
  }

  // TOOL 6: Mathematical Induction Lab
  function InductionLab() {
    const [n, setN] = useState(4);
    const sumOdd = n * n;

    return React.createElement(
      'div',
      { className: 'bg-white rounded-2xl border border-slate-200 p-5 md:p-6 shadow-sm space-y-5' },
      React.createElement(
        'div',
        null,
        React.createElement('h3', { className: 'text-lg font-bold text-slate-900' }, 'เครื่องมือ 6: ห้องทดลองอุปนัยเชิงคณิตศาสตร์ (Mathematical Induction Lab)'),
        React.createElement('p', { className: 'text-xs text-slate-500' }, 'สาธิตทฤษฎีบทผลบวกของจำนวนคี่ 1 + 3 + ... + (2n - 1) = n² ผ่านภาพเรขาคณิตและการพิสูจน์อุปนัย')
      ),
      React.createElement(
        'div',
        { className: 'space-y-2' },
        React.createElement(
          'div',
          { className: 'flex justify-between items-center text-sm font-bold text-slate-700' },
          React.createElement('span', null, 'ปรับค่า n:'),
          React.createElement('span', { className: 'font-mono text-teal-700 bg-teal-50 px-3 py-0.5 rounded-lg border border-teal-200' }, `n = ${n}`)
        ),
        React.createElement('input', {
          type: 'range',
          min: 1,
          max: 8,
          value: n,
          onChange: (e) => setN(parseInt(e.target.value, 10)),
          className: 'w-full accent-teal-600',
        })
      ),
      React.createElement(
        'div',
        { className: 'grid grid-cols-1 md:grid-cols-2 gap-6 items-center' },
        // Step details
        React.createElement(
          'div',
          { className: 'space-y-3' },
          React.createElement(
            'div',
            { className: 'p-3 bg-teal-50 border border-teal-200 rounded-xl space-y-1' },
            React.createElement('div', { className: 'text-xs font-bold text-teal-800' }, '1. ขั้นฐาน (Base Case: n = 1)'),
            React.createElement('div', { className: 'font-mono text-xs text-slate-700' }, 'LHS = 2(1) - 1 = 1 | RHS = 1² = 1 (เป็นจริง ✓)')
          ),
          React.createElement(
            'div',
            { className: 'p-3 bg-sky-50 border border-sky-200 rounded-xl space-y-1' },
            React.createElement('div', { className: 'text-xs font-bold text-sky-800' }, `2. สมมติฐานอุปนัย (Inductive Hypothesis: n = ${n})`),
            React.createElement(
              'div',
              { className: 'font-mono text-xs text-slate-700' },
              `1 + 3 + ... + ${2 * n - 1} = ${n}² = ${sumOdd}`
            )
          ),
          React.createElement(
            'div',
            { className: 'p-3 bg-indigo-50 border border-indigo-200 rounded-xl space-y-1' },
            React.createElement('div', { className: 'text-xs font-bold text-indigo-800' }, `3. ขั้นอุปนัย (Inductive Step: n = ${n + 1})`),
            React.createElement(
              'div',
              { className: 'font-mono text-xs text-slate-700' },
              `${sumOdd} + (2(${n + 1}) - 1) = ${sumOdd} + ${2 * n + 1} = ${sumOdd + 2 * n + 1} = (${n + 1})² ✓`
            )
          )
        ),
        // Geometric Square Visualizer
        React.createElement(
          'div',
          { className: 'flex flex-col items-center justify-center p-4 bg-slate-50 border border-slate-200 rounded-2xl' },
          React.createElement('div', { className: 'text-xs font-bold text-slate-600 mb-3' }, `การพิสูจน์ด้วยภาพ: สี่เหลี่ยมจัตุรัสขนาด ${n} × ${n} = ${sumOdd} ช่อง`),
          React.createElement(
            'div',
            {
              className: 'grid gap-1',
              style: {
                gridTemplateColumns: `repeat(${n}, minmax(0, 1fr))`,
              },
            },
            Array.from({ length: n * n }).map((_, i) => {
              const r = Math.floor(i / n);
              const c = i % n;
              const layer = Math.max(r, c); // Layer 0, 1, ..., n-1
              const colors = [
                'bg-teal-500',
                'bg-sky-500',
                'bg-indigo-500',
                'bg-purple-500',
                'bg-pink-500',
                'bg-rose-500',
                'bg-amber-500',
                'bg-emerald-500',
              ];
              const colorClass = colors[layer % colors.length];
              return React.createElement('div', {
                key: i,
                className: `w-6 h-6 sm:w-7 sm:h-7 rounded-sm ${colorClass} transition-all duration-300 shadow-2xs`,
                title: `Layer ${layer + 1}`,
              });
            })
          ),
          React.createElement('div', { className: 'text-2xs text-slate-400 mt-2' }, 'แต่ละชั้นสีที่ล้อมรอบแทนจำนวนคี่ถัดไป (+1, +3, +5, +7...)')
        )
      )
    );
  }

  // --- Quiz Component ---
  function ChapterQuiz({ chapter, progress, onUpdateScore }) {
    const questions = chapter.questions || [];
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [submitted, setSubmitted] = useState({});
    const [showHints, setShowHints] = useState({});

    const handleSelect = (qId, optionIdx) => {
      if (submitted[qId]) return;
      setSelectedAnswers((prev) => ({ ...prev, [qId]: optionIdx }));
    };

    const handleSubmit = (qId, correctIdx) => {
      const isCorrect = selectedAnswers[qId] === correctIdx;
      setSubmitted((prev) => ({ ...prev, [qId]: true }));
      onUpdateScore(chapter.id, qId, isCorrect);
    };

    const handleRetry = (qId) => {
      setSubmitted((prev) => ({ ...prev, [qId]: false }));
      setSelectedAnswers((prev) => {
        const copy = { ...prev };
        delete copy[qId];
        return copy;
      });
    };

    return React.createElement(
      'div',
      { className: 'my-10 bg-white rounded-3xl border border-slate-200 p-6 md:p-8 shadow-sm space-y-6' },
      React.createElement(
        'div',
        { className: 'flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-4' },
        React.createElement(
          'div',
          null,
          React.createElement('h3', { className: 'text-xl font-extrabold text-slate-900' }, `แบบฝึกหัดท้ายบท: ${chapter.titleTh}`),
          React.createElement('p', { className: 'text-xs text-slate-500' }, 'ทดสอบความเข้าใจ พร้อมระบบเฉลยและอธิบายขั้นตอนการคิด')
        ),
        React.createElement(
          'span',
          { className: 'text-xs font-bold px-3 py-1 bg-teal-50 text-teal-800 rounded-full border border-teal-200' },
          `${questions.length} คำถาม`
        )
      ),
      React.createElement(
        'div',
        { className: 'space-y-6' },
        questions.map((q, idx) => {
          const isDone = submitted[q.id];
          const chosen = selectedAnswers[q.id];
          const isRight = chosen === q.correctAnswer;

          return React.createElement(
            'div',
            { key: q.id, className: 'p-5 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-3' },
            React.createElement(
              'div',
              { className: 'font-bold text-sm sm:text-base text-slate-800 flex gap-2' },
              React.createElement('span', { className: 'text-teal-600 font-extrabold' }, `ข้อที่ ${idx + 1}.`),
              React.createElement('span', null, q.question)
            ),
            // Options
            React.createElement(
              'div',
              { className: 'space-y-2 pt-1' },
              q.options.map((opt, oIdx) => {
                let btnStyle = 'bg-white border-slate-200 text-slate-700 hover:border-teal-400 hover:bg-teal-50/30';
                if (chosen === oIdx) {
                  btnStyle = 'bg-teal-50 border-teal-500 text-teal-900 font-bold';
                }
                if (isDone) {
                  if (oIdx === q.correctAnswer) {
                    btnStyle = 'bg-emerald-100 border-emerald-500 text-emerald-900 font-bold';
                  } else if (chosen === oIdx) {
                    btnStyle = 'bg-rose-100 border-rose-500 text-rose-900 font-bold';
                  } else {
                    btnStyle = 'bg-white/50 border-slate-200 text-slate-400';
                  }
                }

                return React.createElement(
                  'button',
                  {
                    key: oIdx,
                    onClick: () => handleSelect(q.id, oIdx),
                    disabled: isDone,
                    className: `w-full text-left px-4 py-2.5 rounded-xl border text-sm transition flex items-center justify-between ${btnStyle}`,
                  },
                  React.createElement('span', null, opt),
                  isDone && oIdx === q.correctAnswer && React.createElement('span', { className: 'text-emerald-700 text-xs font-bold' }, '✓ ถูกต้อง'),
                  isDone && chosen === oIdx && oIdx !== q.correctAnswer && React.createElement('span', { className: 'text-rose-700 text-xs font-bold' }, '✗ ไม่ถูกต้อง')
                );
              })
            ),
            // Actions & Hint
            React.createElement(
              'div',
              { className: 'flex flex-wrap items-center justify-between gap-2 pt-2' },
              React.createElement(
                'div',
                { className: 'flex gap-2' },
                !isDone ? (
                  React.createElement(
                    'button',
                    {
                      onClick: () => handleSubmit(q.id, q.correctAnswer),
                      disabled: chosen === undefined,
                      className: 'px-4 py-1.5 bg-teal-600 disabled:opacity-50 hover:bg-teal-700 text-white text-xs font-bold rounded-lg transition',
                    },
                    'ส่งคำตอบ'
                  )
                ) : (
                  React.createElement(
                    'button',
                    {
                      onClick: () => handleRetry(q.id),
                      className: 'px-3 py-1 bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-bold rounded-lg transition',
                    },
                    'ลองทำใหม่'
                  )
                ),
                q.hint &&
                  React.createElement(
                    'button',
                    {
                      onClick: () => setShowHints((h) => ({ ...h, [q.id]: !h[q.id] })),
                      className: 'text-xs text-amber-700 hover:text-amber-900 font-medium underline px-1',
                    },
                    showHints[q.id] ? 'ซ่อนคำใบ้' : '💡 แสดงคำใบ้'
                  )
              )
            ),
            // Hint body
            showHints[q.id] &&
              React.createElement(
                'div',
                { className: 'p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900' },
                React.createElement('strong', null, 'คำใบ้: '),
                q.hint
              ),
            // Explanation
            isDone &&
              React.createElement(
                'div',
                {
                  className: `p-3.5 rounded-xl border text-xs leading-relaxed ${
                    isRight ? 'bg-emerald-50 border-emerald-300 text-emerald-950' : 'bg-rose-50 border-rose-300 text-rose-950'
                  }`,
                },
                React.createElement('div', { className: 'font-bold mb-1' }, isRight ? '✓ ยอดเยี่ยม! คำตอบถูกต้อง' : '✗ ยังไม่ถูกต้อง ลองศึกษาคำอธิบายด้านล่าง:'),
                React.createElement('p', null, q.explanation)
              )
          );
        })
      )
    );
  }

  // --- Main App Root ---
  function App() {
    const [progress, setProgress] = useState(loadProgress());
    const [route, setRoute] = useState(window.location.hash || '#home');
    const [showResetModal, setShowResetModal] = useState(false);
    const [activeToolTab, setActiveToolTab] = useState('tool-1');

    // Hash router listener
    useEffect(() => {
      const handleHashChange = () => {
        const hash = window.location.hash || '#home';
        setRoute(hash);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      };
      window.addEventListener('hashchange', handleHashChange);
      return () => window.removeEventListener('hashchange', handleHashChange);
    }, []);

    // Update progress
    const markChapterCompleted = (chapterId) => {
      setProgress((prev) => {
        const set = new Set(prev.completedChapters);
        set.add(chapterId);
        const next = { ...prev, completedChapters: Array.from(set), lastActiveChapter: chapterId };
        saveProgress(next);
        return next;
      });
    };

    const handleUpdateScore = (chapterId, questionId, isCorrect) => {
      setProgress((prev) => {
        const next = {
          ...prev,
          quizScores: { ...prev.quizScores, [questionId]: isCorrect },
        };
        saveProgress(next);
        return next;
      });
    };

    const resetAllProgress = () => {
      const fresh = { completedChapters: [], quizScores: {}, lastActiveChapter: 1 };
      setProgress(fresh);
      saveProgress(fresh);
      setShowResetModal(false);
    };

    // Calculate percentage
    const totalChapters = CHAPTERS_DATA.length;
    const completedCount = progress.completedChapters.length;
    const progressPercent = Math.round((completedCount / totalChapters) * 100);

    // Active chapter helper
    const activeChapterId = useMemo(() => {
      const m = route.match(/^#chapter-(\d+)$/);
      return m ? parseInt(m[1], 10) : null;
    }, [route]);

    const activeChapter = useMemo(() => {
      return activeChapterId ? CHAPTERS_DATA.find((c) => c.id === activeChapterId) : null;
    }, [activeChapterId]);

    return React.createElement(
      'div',
      { className: 'min-h-screen flex flex-col antialiased bg-slate-50 text-slate-800' },

      // Header / Navbar
      React.createElement(
        'header',
        { className: 'sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200' },
        React.createElement(
          'div',
          { className: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4' },
          // Logo
          React.createElement(
            'a',
            { href: '#home', className: 'flex items-center gap-2.5 text-slate-900 hover:opacity-90 transition' },
            React.createElement(
              'div',
              { className: 'w-9 h-9 rounded-xl bg-gradient-to-tr from-teal-600 to-teal-400 flex items-center justify-center text-white font-extrabold text-base shadow-sm' },
              '∧'
            ),
            React.createElement(
              'div',
              null,
              React.createElement('div', { className: 'font-extrabold text-sm sm:text-base leading-tight tracking-tight' }, 'Mathematical Logic Studio'),
              React.createElement('div', { className: 'text-2xs text-slate-500 font-medium' }, 'ตรรกศาสตร์ทางคณิตศาสตร์แบบโต้ตอบ')
            )
          ),
          // Nav links
          React.createElement(
            'nav',
            { className: 'hidden md:flex items-center gap-1 text-xs font-bold text-slate-600' },
            [
              { hash: '#home', label: 'หน้าแรก' },
              { hash: '#chapters', label: 'บทเรียนทั้ง 6 บท' },
              { hash: '#tools', label: 'สตูดิโอเครื่องมือ' },
              { hash: '#glossary', label: 'คลังคำศัพท์' },
              { hash: '#errata', label: 'การตรวจสอบทางคณิตศาสตร์' },
            ].map((item) =>
              React.createElement(
                'a',
                {
                  key: item.hash,
                  href: item.hash,
                  className: `px-3 py-1.5 rounded-lg transition ${
                    route === item.hash ? 'bg-teal-50 text-teal-700 font-extrabold' : 'hover:bg-slate-100 hover:text-slate-900'
                  }`,
                },
                item.label
              )
            )
          ),
          // Progress Pill
          React.createElement(
            'div',
            { className: 'flex items-center gap-2.5' },
            React.createElement(
              'button',
              {
                onClick: () => setShowResetModal(true),
                className: 'hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-bold hover:bg-teal-100 transition',
                title: 'คลิกเพื่อจัดการหรือรีเซ็ตความคืบหน้า',
              },
              React.createElement('span', { className: 'w-2 h-2 rounded-full bg-teal-500 animate-pulse' }),
              React.createElement('span', null, `ความคืบหน้า: ${progressPercent}%`)
            )
          )
        )
      ),

      // Main Content Router
      React.createElement(
        'main',
        { className: 'flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10' },

        // VIEW 1: HOME PAGE
        route === '#home' &&
          React.createElement(
            'div',
            { className: 'space-y-12 animate-in fade-in duration-300' },
            // Hero
            React.createElement(
              'section',
              { className: 'relative overflow-hidden rounded-3xl bg-gradient-to-b from-teal-950 via-slate-900 to-slate-950 text-white p-7 md:p-12 shadow-xl border border-teal-800/30' },
              React.createElement(
                'div',
                { className: 'max-w-3xl space-y-4' },
                React.createElement(
                  'div',
                  { className: 'inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/20 border border-teal-400/30 text-teal-300 text-xs font-semibold' },
                  '✨ Interactive Logic Studio — ถอดบทเรียนจากเอกสาร Mathematical Logic'
                ),
                React.createElement(
                  'h1',
                  { className: 'text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight' },
                  'เรียนรู้ตรรกศาสตร์ทางคณิตศาสตร์ ',
                  React.createElement('br', { className: 'hidden sm:inline' }),
                  React.createElement('span', { className: 'text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-teal-200 to-sky-300' }, 'ผ่านการอ่าน การทดลอง และลงมือทำ')
                ),
                React.createElement(
                  'p',
                  { className: 'text-slate-300 text-sm md:text-base leading-relaxed' },
                  'เว็บไซต์บทเรียนออนไลน์ที่รวบรวมเนื้อหาครบถ้วนทั้ง 6 บทจากเอกสาร พร้อมเครื่องมือคำนวณตารางค่าความจริง ตรวจสอบสัจนิรันดร์ ตรวจสอบความสมเหตุสมผลของการอ้างเหตุผล และห้องทดลองอุปนัยเชิงคณิตศาสตร์'
                ),
                React.createElement(
                  'div',
                  { className: 'pt-2 flex flex-wrap gap-3' },
                  React.createElement(
                    'a',
                    {
                      href: `#chapter-${progress.lastActiveChapter || 1}`,
                      className: 'px-6 py-3 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-extrabold text-sm transition shadow-lg shadow-teal-500/20 flex items-center gap-2',
                    },
                    `เข้าสู่บทเรียน: บทที่ ${progress.lastActiveChapter || 1} →`
                  ),
                  React.createElement(
                    'a',
                    {
                      href: '#tools',
                      className: 'px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm border border-white/20 transition',
                    },
                    'เปิดสตูดิโอเครื่องมือ 6 ชนิด'
                  )
                )
              )
            ),

            // Errata Notice Callout
            React.createElement(
              'div',
              { className: 'p-5 bg-purple-50 border border-purple-200 rounded-2xl flex flex-wrap items-center justify-between gap-4' },
              React.createElement(
                'div',
                { className: 'space-y-1' },
                React.createElement('div', { className: 'font-extrabold text-purple-900 text-sm' }, '🔍 การตรวจสอบความถูกต้องทางคณิตศาสตร์ (Mathematical Audit)'),
                React.createElement('p', { className: 'text-xs text-purple-800' }, 'ตรวจพบข้อบกพร่องในเอกสารต้นฉบับ หน้า 15 (ตัวอย่างที่ 3: สัจนิรันดร์ที่เป็นโมฆะจาก Incomplete Branch) พร้อมบทวิเคราะห์ทางตรรกศาสตร์ที่ถูกต้อง')
              ),
              React.createElement(
                'a',
                { href: '#errata', className: 'text-xs font-bold px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl transition' },
                'อ่านรายงานตรวจสอบ →'
              )
            ),

            // Chapters Grid
            React.createElement(
              'section',
              { className: 'space-y-5' },
              React.createElement(
                'div',
                null,
                React.createElement('h2', { className: 'text-2xl font-black text-slate-900' }, 'บทเรียนทั้ง 6 บทตามเอกสารต้นฉบับ'),
                React.createElement('p', { className: 'text-xs text-slate-500' }, 'ครอบคลุมนิยาม สัจพจน์ กฎการอนุมาน ตารางค่าความจริง และขั้นตอนการพิสูจน์')
              ),
              React.createElement(
                'div',
                { className: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5' },
                CHAPTERS_DATA.map((ch) => {
                  const isDone = progress.completedChapters.includes(ch.id);
                  return React.createElement(
                    'a',
                    {
                      key: ch.id,
                      href: `#chapter-${ch.id}`,
                      className: 'p-6 rounded-2xl border border-slate-200 bg-white hover:border-teal-500 hover:shadow-md transition flex flex-col justify-between group space-y-4',
                    },
                    React.createElement(
                      'div',
                      { className: 'space-y-2' },
                      React.createElement(
                        'div',
                        { className: 'flex justify-between items-center text-xs' },
                        React.createElement('span', { className: 'font-extrabold text-teal-600' }, `บทที่ ${ch.id}`),
                        React.createElement('span', { className: 'text-slate-400 font-medium' }, ch.readingTime)
                      ),
                      React.createElement('h3', { className: 'font-bold text-slate-900 group-hover:text-teal-700 transition' }, ch.titleTh),
                      React.createElement('p', { className: 'text-2xs text-slate-500 font-medium font-mono' }, ch.title),
                      React.createElement('p', { className: 'text-xs text-slate-600 leading-relaxed line-clamp-2' }, ch.subtitle)
                    ),
                    React.createElement(
                      'div',
                      { className: 'pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold' },
                      isDone
                        ? React.createElement('span', { className: 'text-emerald-700' }, '✓ ศึกษาแล้ว')
                        : React.createElement('span', { className: 'text-slate-400' }, 'คลิกเพื่อเข้าเรียน'),
                      React.createElement('span', { className: 'text-teal-600 group-hover:translate-x-1 transition' }, '→')
                    )
                  );
                })
              )
            )
          ),

        // VIEW 2: CHAPTERS CURRICULUM LIST
        route === '#chapters' &&
          React.createElement(
            'div',
            { className: 'space-y-6 animate-in fade-in duration-300' },
            React.createElement(
              'div',
              null,
              React.createElement('h2', { className: 'text-2xl font-black text-slate-900' }, 'สารบัญบทเรียนตรรกศาสตร์ (Curriculum)'),
              React.createElement('p', { className: 'text-xs text-slate-500' }, 'เลือกบทเรียนที่ต้องการศึกษา แต่ละบทมีเนื้อหา ตัวอย่างการพิสูจน์ เครื่องมือโต้ตอบ และแบบฝึกหัด')
            ),
            React.createElement(
              'div',
              { className: 'space-y-4' },
              CHAPTERS_DATA.map((ch) =>
                React.createElement(
                  'div',
                  {
                    key: ch.id,
                    className: 'p-6 rounded-2xl border border-slate-200 bg-white hover:border-slate-300 transition shadow-2xs space-y-4',
                  },
                  React.createElement(
                    'div',
                    { className: 'flex flex-wrap items-center justify-between gap-2' },
                    React.createElement(
                      'div',
                      null,
                      React.createElement('span', { className: 'text-xs font-extrabold text-teal-600 uppercase' }, `บทที่ ${ch.id}`),
                      React.createElement('h3', { className: 'text-lg font-bold text-slate-900' }, ch.titleTh),
                      React.createElement('div', { className: 'text-xs text-slate-500 font-mono' }, ch.title)
                    ),
                    React.createElement(
                      'a',
                      {
                        href: `#chapter-${ch.id}`,
                        className: 'px-5 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold transition',
                      },
                      'เข้าสู่บทเรียน →'
                    )
                  ),
                  React.createElement('p', { className: 'text-sm text-slate-600 leading-relaxed' }, ch.subtitle),
                  // Objectives tags
                  React.createElement(
                    'div',
                    { className: 'flex flex-wrap gap-1.5 pt-1' },
                    ch.objectives.map((obj, i) =>
                      React.createElement(
                        'span',
                        { key: i, className: 'px-2.5 py-1 bg-slate-100 text-slate-700 text-2xs rounded-lg font-medium' },
                        `• ${obj}`
                      )
                    )
                  )
                )
              )
            )
          ),

        // VIEW 3: CHAPTER READER
        activeChapter &&
          React.createElement(
            'article',
            { className: 'max-w-4xl mx-auto space-y-8 animate-in fade-in duration-300' },
            // Chapter Header
            React.createElement(
              'header',
              { className: 'space-y-3 border-b border-slate-200 pb-6' },
              React.createElement(
                'div',
                { className: 'flex items-center justify-between text-xs font-bold' },
                React.createElement('a', { href: '#chapters', className: 'text-teal-600 hover:underline' }, '← กลับหน้ารวมบทเรียน'),
                React.createElement('span', { className: 'text-slate-400' }, `เวลาอ่านประมาณ: ${activeChapter.readingTime}`)
              ),
              React.createElement('div', { className: 'text-xs font-extrabold text-teal-600 uppercase tracking-wider' }, `บทที่ ${activeChapter.id}`),
              React.createElement('h1', { className: 'text-2xl sm:text-3xl font-black text-slate-900' }, activeChapter.titleTh),
              React.createElement('p', { className: 'text-sm text-slate-500 font-mono' }, activeChapter.title),
              React.createElement('p', { className: 'text-slate-700 text-sm sm:text-base leading-relaxed pt-1' }, activeChapter.subtitle)
            ),

            // Objectives callout
            React.createElement(
              'div',
              { className: 'p-5 bg-teal-50/70 border border-teal-200 rounded-2xl space-y-2' },
              React.createElement('h4', { className: 'font-bold text-teal-900 text-sm' }, '🎯 วัตถุประสงค์การเรียนรู้ประจำบท'),
              React.createElement(
                'ul',
                { className: 'space-y-1 text-xs text-teal-800 font-medium' },
                activeChapter.objectives.map((obj, idx) =>
                  React.createElement('li', { key: idx, className: 'flex items-start gap-1.5' }, React.createElement('span', null, '✓'), React.createElement('span', null, obj))
                )
              )
            ),

            // Sections
            React.createElement(
              'div',
              { className: 'space-y-8' },
              activeChapter.sections.map((sec) =>
                React.createElement(
                  'section',
                  { key: sec.id, className: 'space-y-4 pt-4' },
                  React.createElement(
                    'div',
                    { className: 'border-b border-slate-200 pb-2' },
                    React.createElement('h3', { className: 'text-lg sm:text-xl font-bold text-slate-900' }, sec.headingTh),
                    React.createElement('span', { className: 'text-2xs text-slate-500 font-mono' }, sec.heading)
                  ),
                  React.createElement(
                    'div',
                    { className: 'text-sm sm:text-base text-slate-700 leading-relaxed whitespace-pre-line' },
                    sec.content
                  ),
                  sec.callout && React.createElement(AlertBox, { type: sec.callout.type, title: sec.callout.title }, sec.callout.text),
                  sec.workedProof && React.createElement(ProofStepBox, { proof: sec.workedProof })
                )
              )
            ),

            // Embedded Interactive Tool relevant to this chapter
            React.createElement(
              'div',
              { className: 'my-10 pt-6 border-t-2 border-dashed border-teal-200 space-y-4' },
              React.createElement(
                'div',
                null,
                React.createElement('div', { className: 'text-xs font-bold uppercase text-teal-600 tracking-wider' }, 'เครื่องมือทดลองเชิงโต้ตอบประจำบทเรียน'),
                React.createElement('h3', { className: 'text-xl font-black text-slate-900' }, 'Interactive Practice Lab')
              ),
              activeChapter.id === 1 && React.createElement(TruthTableBuilder, null),
              activeChapter.id === 2 && React.createElement(TruthTableBuilder, null),
              activeChapter.id === 3 && React.createElement(EquivalenceChecker, null),
              activeChapter.id === 4 && React.createElement(ArgumentChecker, null),
              activeChapter.id === 5 && React.createElement(QuantifierExplorer, null),
              activeChapter.id === 6 && React.createElement(InductionLab, null)
            ),

            // Interactive Quiz
            React.createElement(ChapterQuiz, {
              chapter: activeChapter,
              progress: progress,
              onUpdateScore: handleUpdateScore,
            }),

            // Mark complete button and Navigation
            React.createElement(
              'div',
              { className: 'pt-6 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4' },
              React.createElement(
                'button',
                {
                  onClick: () => markChapterCompleted(activeChapter.id),
                  className: `px-5 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
                    progress.completedChapters.includes(activeChapter.id)
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      : 'bg-teal-600 hover:bg-teal-700 text-white shadow-xs'
                  }`,
                },
                progress.completedChapters.includes(activeChapter.id) ? '✓ บันทึกว่าศึกษาจบบทนี้แล้ว' : 'ทำเครื่องหมายว่าศึกษาจบแล้ว'
              ),
              React.createElement(
                'div',
                { className: 'flex gap-2' },
                activeChapter.id > 1 &&
                  React.createElement(
                    'a',
                    {
                      href: `#chapter-${activeChapter.id - 1}`,
                      className: 'px-4 py-2 border border-slate-300 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-100 transition',
                    },
                    `← บทที่ ${activeChapter.id - 1}`
                  ),
                activeChapter.id < totalChapters &&
                  React.createElement(
                    'a',
                    {
                      href: `#chapter-${activeChapter.id + 1}`,
                      className: 'px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold transition',
                    },
                    `บทถัดไป: บทที่ ${activeChapter.id + 1} →`
                  )
              )
            )
          ),

        // VIEW 4: STUDIO HUB (All 6 Tools)
        route === '#tools' &&
          React.createElement(
            'div',
            { className: 'space-y-6 animate-in fade-in duration-300' },
            React.createElement(
              'div',
              null,
              React.createElement('h2', { className: 'text-2xl font-black text-slate-900' }, 'สตูดิโอเครื่องมือคำนวณและทดลองทางตรรกศาสตร์ (Tools Studio)'),
              React.createElement('p', { className: 'text-xs text-slate-500' }, 'ชุดเครื่องมือ 6 ชนิดสำหรับทดลองตรรกศาสตร์ ตารางค่าความจริง สัจนิรันดร์ การอนุมาน ตัวบ่งปริมาณ และอุปนัย')
            ),
            // Tool Tabs
            React.createElement(
              'div',
              { className: 'flex flex-wrap gap-2 border-b border-slate-200 pb-3' },
              [
                { id: 'tool-1', label: '1. Truth Table Builder' },
                { id: 'tool-2', label: '2. Equivalence Checker' },
                { id: 'tool-3', label: '3. Argument Checker' },
                { id: 'tool-4', label: '4. Inference Trainer' },
                { id: 'tool-5', label: '5. Quantifier Matrix' },
                { id: 'tool-6', label: '6. Induction Lab' },
              ].map((t) =>
                React.createElement(
                  'button',
                  {
                    key: t.id,
                    onClick: () => setActiveToolTab(t.id),
                    className: `px-4 py-2 rounded-xl text-xs font-bold transition ${
                      activeToolTab === t.id
                        ? 'bg-teal-600 text-white shadow-sm'
                        : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                    }`,
                  },
                  t.label
                )
              )
            ),
            // Active Tool Tab Display
            activeToolTab === 'tool-1' && React.createElement(TruthTableBuilder, null),
            activeToolTab === 'tool-2' && React.createElement(EquivalenceChecker, null),
            activeToolTab === 'tool-3' && React.createElement(ArgumentChecker, null),
            activeToolTab === 'tool-4' && React.createElement(InferenceTrainer, null),
            activeToolTab === 'tool-5' && React.createElement(QuantifierExplorer, null),
            activeToolTab === 'tool-6' && React.createElement(InductionLab, null)
          ),

        // VIEW 5: GLOSSARY & SYMBOL DICTIONARY
        route === '#glossary' &&
          React.createElement(
            'div',
            { className: 'space-y-6 animate-in fade-in duration-300' },
            React.createElement(
              'div',
              null,
              React.createElement('h2', { className: 'text-2xl font-black text-slate-900' }, 'คลังสัญลักษณ์และคำศัพท์ตรรกศาสตร์ (Logic Glossary)'),
              React.createElement('p', { className: 'text-xs text-slate-500' }, 'รวบรวมสัญลักษณ์ นิยามทางการ และคำแปลสองภาษา ไทย-อังกฤษ')
            ),
            React.createElement(
              'div',
              { className: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4' },
              GLOSSARY_DATA.map((item, idx) =>
                React.createElement(
                  'div',
                  { key: idx, className: 'p-5 rounded-2xl border border-slate-200 bg-white shadow-2xs space-y-2' },
                  React.createElement(
                    'div',
                    { className: 'flex items-center justify-between' },
                    React.createElement('span', { className: 'font-mono text-2xl font-black text-teal-700 bg-teal-50 px-2.5 py-1 rounded-lg border border-teal-200' }, item.symbol),
                    React.createElement('span', { className: 'text-2xs font-extrabold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600' }, item.category)
                  ),
                  React.createElement('div', { className: 'font-bold text-base text-slate-900 pt-1' }, item.termTh),
                  React.createElement('div', { className: 'text-xs text-slate-500 font-mono' }, item.term),
                  React.createElement('p', { className: 'text-xs text-slate-600 leading-relaxed' }, item.meaningTh),
                  React.createElement(
                    'div',
                    { className: 'pt-2 border-t border-slate-100 text-2xs text-slate-500 font-mono' },
                    'ตัวอย่าง: ',
                    React.createElement('span', { className: 'text-teal-800 font-bold' }, item.example)
                  )
                )
              )
            )
          ),

        // VIEW 6: MATHEMATICAL AUDIT & ERRATA
        route === '#errata' &&
          React.createElement(
            'div',
            { className: 'max-w-4xl mx-auto space-y-6 animate-in fade-in duration-300' },
            React.createElement(
              'header',
              { className: 'space-y-2 border-b border-slate-200 pb-4' },
              React.createElement('span', { className: 'text-xs font-extrabold text-purple-700 uppercase tracking-wider' }, 'Mathematical Audit & Errata Report'),
              React.createElement('h2', { className: 'text-2xl font-black text-slate-900' }, 'รายงานการตรวจสอบความถูกต้องทางคณิตศาสตร์ในเอกสารต้นฉบับ'),
              React.createElement(
                'p',
                { className: 'text-xs text-slate-500 leading-relaxed' },
                'จากการตรวจสอบเนื้อหา 32 หน้าของเอกสาร Mathematical Logic (637868054818062507_Mathematical_Logic1.pdf) พบข้อผิดพลาดทางตรรกศาสตร์และการพิมพ์จำนวน 5 จุด ดังต่อไปนี้'
              )
            ),
            React.createElement(
              'div',
              { className: 'space-y-6' },
              PDF_CORRECTIONS_DATA.map((errItem) =>
                React.createElement(
                  'div',
                  {
                    key: errItem.id,
                    className: 'p-6 rounded-2xl border border-slate-200 bg-white shadow-2xs space-y-4',
                  },
                  React.createElement(
                    'div',
                    { className: 'flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3' },
                    React.createElement(
                      'div',
                      null,
                      React.createElement('span', { className: 'text-xs font-extrabold text-purple-700' }, `จุดที่ ${errItem.id}: เอกสารหน้า ${errItem.page}`),
                      React.createElement('h3', { className: 'text-base font-bold text-slate-900' }, errItem.titleTh)
                    ),
                    React.createElement(
                      'span',
                      {
                        className: `text-xs px-2.5 py-1 rounded-full font-bold ${
                          errItem.severity === 'critical'
                            ? 'bg-rose-100 text-rose-800 border border-rose-300'
                            : errItem.severity === 'moderate'
                            ? 'bg-amber-100 text-amber-800 border border-amber-300'
                            : 'bg-slate-100 text-slate-700 border border-slate-300'
                        }`,
                      },
                      errItem.severity === 'critical' ? 'ข้อผิดพลาดเชิงตรรกศาสตร์ร้ายแรง' : 'ข้อผิดพลาดการพิมพ์/สัญลักษณ์'
                    )
                  ),
                  React.createElement(
                    'div',
                    { className: 'grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs' },
                    React.createElement(
                      'div',
                      { className: 'p-3 bg-rose-50 border border-rose-200 rounded-xl space-y-1' },
                      React.createElement('div', { className: 'font-bold text-rose-900' }, 'ข้อความเดิมในเอกสาร:'),
                      React.createElement('div', { className: 'font-mono text-rose-800 whitespace-pre-wrap' }, errItem.originalText)
                    ),
                    React.createElement(
                      'div',
                      { className: 'p-3 bg-emerald-50 border border-emerald-200 rounded-xl space-y-1' },
                      React.createElement('div', { className: 'font-bold text-emerald-900' }, 'การแก้ไขทางคณิตศาสตร์ที่ถูกต้อง:'),
                      React.createElement('div', { className: 'font-mono text-emerald-800 whitespace-pre-wrap' }, errItem.correctedText)
                    )
                  ),
                  React.createElement('p', { className: 'text-sm text-slate-700 leading-relaxed' }, errItem.explanationTh)
                )
              )
            )
          )
      ),

      // Reset Confirmation Modal
      showResetModal &&
        React.createElement(
          'div',
          { className: 'fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4' },
          React.createElement(
            'div',
            { className: 'bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-slate-200 animate-in zoom-in-95 duration-200' },
            React.createElement('h3', { className: 'text-lg font-bold text-slate-900' }, 'ต้องการรีเซ็ตความคืบหน้าทั้งหมดหรือไม่?'),
            React.createElement(
              'p',
              { className: 'text-xs text-slate-600 leading-relaxed' },
              'ระบบจะล้างข้อมูลบทเรียนที่ศึกษาแล้ว คะแนนแบบฝึกหัด และประวัติการทำข้อสอบที่บันทึกไว้ในเบราว์เซอร์ (Local Storage) ของคุณทั้งหมด'
            ),
            React.createElement(
              'div',
              { className: 'flex justify-end gap-2 pt-2' },
              React.createElement(
                'button',
                {
                  onClick: () => setShowResetModal(false),
                  className: 'px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition',
                },
                'ยกเลิก'
              ),
              React.createElement(
                'button',
                {
                  onClick: resetAllProgress,
                  className: 'px-4 py-2 rounded-xl text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white transition',
                },
                'ยืนยันการล้างข้อมูล'
              )
            )
          )
        ),

      // Footer
      React.createElement(
        'footer',
        { className: 'bg-white border-t border-slate-200 mt-16 py-8 text-xs text-slate-500' },
        React.createElement(
          'div',
          { className: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-4' },
          React.createElement(
            'div',
            { className: 'space-y-1' },
            React.createElement('div', { className: 'font-bold text-slate-800' }, 'Mathematical Logic Studio — พื้นที่เรียนรู้ตรรกศาสตร์ทางคณิตศาสตร์'),
            React.createElement('div', null, 'เนื้อหาถอดรหัสและพิสูจน์ตามเอกสารต้นฉบับ Mathematical Logic (32 หน้า) ครบถ้วนทั้ง 6 บทเรียน')
          ),
          React.createElement(
            'div',
            { className: 'flex items-center gap-4 text-slate-600 font-medium' },
            React.createElement('a', { href: '#home', className: 'hover:text-teal-700' }, 'หน้าแรก'),
            React.createElement('a', { href: '#chapters', className: 'hover:text-teal-700' }, 'บทเรียน'),
            React.createElement('a', { href: '#tools', className: 'hover:text-teal-700' }, 'สตูดิโอเครื่องมือ'),
            React.createElement('a', { href: '#errata', className: 'hover:text-teal-700' }, 'การตรวจสอบทางคณิตศาสตร์'),
            React.createElement(
              'button',
              { onClick: () => setShowResetModal(true), className: 'text-rose-600 hover:underline font-bold' },
              'รีเซ็ตความคืบหน้า'
            )
          )
        )
      )
    );
  }

  // Mount React App
  const rootElement = document.getElementById('root');
  if (rootElement) {
    const root = ReactDOM.createRoot(rootElement);
    root.render(React.createElement(App));
  }
})();
