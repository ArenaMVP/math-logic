'use client';

import React, { useState } from 'react';
import { buildTruthTable } from '../../logic-engine/truthTable';
import { TruthTableResult } from '../../types/logic';
import { TRUTH_TABLE_PRESETS } from '../../data/presets';
import { MathView } from '../common/MathView';
import { TruthBadge } from '../common/TruthBadge';
import { AlertCircle, CheckCircle2, RotateCcw, Sparkles } from 'lucide-react';

export const TruthTableBuilder: React.FC = () => {
  const [formulaInput, setFormulaInput] = useState<string>('(p ∧ q) → r');
  const [result, setResult] = useState<TruthTableResult | null>(() => {
    try {
      return buildTruthTable('(p ∧ q) → r');
    } catch {
      return null;
    }
  });
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = (formulaToUse?: string) => {
    const f = formulaToUse !== undefined ? formulaToUse : formulaInput;
    setError(null);
    try {
      if (!f.trim()) {
        throw new Error('กรุณากรอกนิพจน์ทางตรรกศาสตร์');
      }
      const table = buildTruthTable(f);
      setResult(table);
    } catch (err: any) {
      setError(err.message || 'เกิดข้อผิดพลาดในการประมวลผลนิพจน์');
      setResult(null);
    }
  };

  const handleInsertSymbol = (symbol: string) => {
    setFormulaInput((prev) => prev + symbol);
  };

  const handleBackspace = () => {
    setFormulaInput((prev) => prev.slice(0, -1));
  };

  const handleClear = () => {
    setFormulaInput('');
    setError(null);
    setResult(null);
  };

  const handleSelectPreset = (presetId: string) => {
    const found = TRUTH_TABLE_PRESETS.find((p) => p.id === presetId);
    if (found) {
      setFormulaInput(found.formula);
      handleGenerate(found.formula);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 md:p-7 space-y-6">
      {/* Header */}
      <div className="border-b border-slate-100 pb-4">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-teal-500" />
          <h3 className="text-xl font-bold text-slate-800">
            เครื่องมือสร้างตารางค่าความจริง (Truth Table Builder)
          </h3>
        </div>
        <p className="text-sm text-slate-500 mt-1">
          กรอกสูตรหรือคลิกปุ่มสัญลักษณ์ ระบบจะคำนวณแถวค่าความจริง $2^n$ แถวพร้อมแยกคอลัมน์นิพจน์ย่อยอย่างปลอดภัย
        </p>
      </div>

      {/* Preset Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-xs md:text-sm">
        <span className="font-semibold text-slate-700 flex items-center gap-1.5">
          <Sparkles className="w-4 h-4 text-teal-600" />
          เลือกตัวอย่างจากเอกสาร:
        </span>
        <select
          onChange={(e) => handleSelectPreset(e.target.value)}
          defaultValue=""
          className="bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-500 text-xs md:text-sm"
        >
          <option value="" disabled>
            -- เลือกสูตรตัวอย่าง --
          </option>
          {TRUTH_TABLE_PRESETS.map((p) => (
            <option key={p.id} value={p.id}>
              {p.labelTh} ({p.formula})
            </option>
          ))}
        </select>
      </div>

      {/* Formula Input & Quick Keypad */}
      <div className="space-y-3">
        <div className="relative">
          <input
            type="text"
            value={formulaInput}
            onChange={(e) => setFormulaInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
            placeholder="เช่น ((p ∧ q) → r) หรือพิมพ์ p -> q & r"
            className="w-full px-4 py-3 text-base md:text-lg font-mono rounded-xl border border-slate-300 focus:border-teal-500 focus:ring-3 focus:ring-teal-100 focus:outline-none bg-slate-50/50 text-slate-900 transition-all pr-24"
          />
          <button
            onClick={() => handleGenerate()}
            className="absolute right-2 top-2 bottom-2 px-4 rounded-lg bg-teal-600 hover:bg-teal-700 text-white font-medium text-sm transition-all shadow-sm active:scale-95 flex items-center gap-1.5"
          >
            สร้างตาราง
          </button>
        </div>

        {/* Buttons Keypad */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-xs font-semibold text-slate-400 mr-1 uppercase">ตัวแปร:</span>
          {['p', 'q', 'r', 's', 't'].map((v) => (
            <button
              key={v}
              onClick={() => handleInsertSymbol(v)}
              className="px-2.5 py-1.5 text-xs font-mono font-bold rounded-lg border border-slate-200 bg-white hover:bg-slate-100 active:scale-95 text-slate-800 transition-all"
            >
              {v}
            </button>
          ))}

          <span className="text-xs font-semibold text-slate-400 mx-1 uppercase">ตัวเชื่อม:</span>
          {[
            { s: '¬', label: '¬ (นิเสธ)' },
            { s: ' ∧ ', label: '∧ (และ)' },
            { s: ' ∨ ', label: '∨ (หรือ)' },
            { s: ' → ', label: '→ (ถ้า...แล้ว)' },
            { s: ' ↔ ', label: '↔ (ก็ต่อเมื่อ)' },
            { s: '(', label: '(' },
            { s: ')', label: ')' },
          ].map((op) => (
            <button
              key={op.s}
              onClick={() => handleInsertSymbol(op.s)}
              className="px-3 py-1.5 text-xs font-mono font-bold rounded-lg border border-teal-200 bg-teal-50/50 hover:bg-teal-100 text-teal-800 active:scale-95 transition-all"
              title={op.label}
            >
              {op.s.trim()}
            </button>
          ))}

          <div className="ml-auto flex items-center gap-1.5">
            <button
              onClick={handleBackspace}
              className="px-2.5 py-1.5 text-xs font-medium rounded-lg border border-slate-200 bg-white hover:bg-slate-100 text-slate-600"
              title="ลบตัวอักษรท้ายสุด"
            >
              ← ลบ
            </button>
            <button
              onClick={handleClear}
              className="px-2.5 py-1.5 text-xs font-medium rounded-lg border border-slate-200 bg-white hover:bg-rose-50 hover:text-rose-600 text-slate-500"
              title="ล้างทั้งหมด"
            >
              <RotateCcw className="w-3.5 h-3.5 inline mr-1" />
              ล้าง
            </button>
          </div>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-sm flex items-start gap-2.5">
          <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold">ไม่สามารถสร้างตารางค่าความจริงได้</p>
            <p className="text-xs text-rose-700 mt-0.5">{error}</p>
          </div>
        </div>
      )}

      {/* Results View */}
      {result && (
        <div className="space-y-5 animate-in fade-in duration-300">
          {/* Classification Banner */}
          <div
            className={`p-4 rounded-xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 ${
              result.classification === 'tautology'
                ? 'bg-teal-50/80 border-teal-200 text-teal-900'
                : result.classification === 'contradiction'
                ? 'bg-rose-50/80 border-rose-200 text-rose-900'
                : 'bg-amber-50/80 border-amber-200 text-amber-900'
            }`}
          >
            <div className="flex items-center gap-3">
              <CheckCircle2
                className={`w-6 h-6 shrink-0 ${
                  result.classification === 'tautology'
                    ? 'text-teal-600'
                    : result.classification === 'contradiction'
                    ? 'text-rose-600'
                    : 'text-amber-600'
                }`}
              />
              <div>
                <span className="text-xs uppercase font-bold tracking-wider opacity-75">
                  ผลการจำแนกประเภท (Classification):
                </span>
                <h4 className="text-lg font-bold">
                  {result.classification === 'tautology' && 'เป็นสัจนิรันดร์ (Tautology: ⊤)'}
                  {result.classification === 'contradiction' && 'เป็นข้อขัดแย้ง (Contradiction: ⊥)'}
                  {result.classification === 'contingent' &&
                    'เป็นประพจน์มีเงื่อนไข (Contingent Proposition)'}
                </h4>
              </div>
            </div>

            <div className="text-xs md:text-sm font-mono bg-white/80 px-3.5 py-1.5 rounded-lg border border-black/5 self-stretch sm:self-auto text-center">
              <span>จริง: </span>
              <strong className="text-teal-700">{result.trueCount}</strong>
              <span className="text-slate-400 mx-1.5">|</span>
              <span>เท็จ: </span>
              <strong className="text-rose-700">{result.falseCount}</strong>
              <span className="text-slate-400 mx-1.5">|</span>
              <span>ทั้งหมด: </span>
              <strong>{result.totalRows} แถว</strong>
            </div>
          </div>

          {/* Truth Table */}
          <div className="rounded-xl border border-slate-200 overflow-hidden shadow-xs">
            <div className="overflow-x-auto max-h-[500px]">
              <table className="w-full text-center border-collapse">
                <thead className="bg-slate-100 text-slate-700 text-xs md:text-sm font-semibold sticky top-0 z-10 shadow-xs">
                  <tr className="border-b border-slate-200">
                    <th className="py-3 px-3 w-12 bg-slate-100">#</th>
                    {result.variables.map((v) => (
                      <th key={v} className="py-3 px-4 font-mono font-bold text-slate-900 bg-slate-100/90">
                        {v}
                      </th>
                    ))}
                    {result.subExpressions.map((se) => (
                      <th
                        key={se}
                        className="py-3 px-4 font-mono font-normal text-slate-600 bg-slate-100 border-l border-slate-200"
                      >
                        <MathView math={se} />
                      </th>
                    ))}
                    <th className="py-3 px-5 font-mono font-bold text-teal-900 bg-teal-100/80 border-l border-teal-200">
                      <MathView math={result.formula} />
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs md:text-sm">
                  {result.rows.map((row) => (
                    <tr
                      key={row.id}
                      className={`hover:bg-slate-50 transition-colors ${
                        !row.result && result.classification === 'contingent'
                          ? 'bg-rose-50/20'
                          : ''
                      }`}
                    >
                      <td className="py-2.5 px-3 font-mono text-xs text-slate-400 bg-slate-50/40">
                        {row.id}
                      </td>
                      {result.variables.map((v) => (
                        <td key={v} className="py-2.5 px-4 font-mono">
                          <TruthBadge value={row.valuation[v]} size="sm" />
                        </td>
                      ))}
                      {result.subExpressions.map((se) => (
                        <td key={se} className="py-2.5 px-4 font-mono border-l border-slate-100">
                          <TruthBadge value={row.intermediates[se]} size="sm" />
                        </td>
                      ))}
                      <td className="py-2.5 px-5 font-mono border-l border-teal-100 bg-teal-50/30">
                        <TruthBadge value={row.result} size="md" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
