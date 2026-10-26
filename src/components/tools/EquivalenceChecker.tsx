'use client';

import React, { useState } from 'react';
import { checkEquivalence } from '../../logic-engine/equivalence';
import { EquivalenceResult } from '../../types/logic';
import { MathView } from '../common/MathView';
import { TruthBadge } from '../common/TruthBadge';
import { AlertCircle, CheckCircle2, Shuffle, XCircle } from 'lucide-react';

export const EquivalenceChecker: React.FC = () => {
  const [expr1, setExpr1] = useState('p → q');
  const [expr2, setExpr2] = useState('¬p ∨ q');
  const [result, setResult] = useState<EquivalenceResult | null>(() => {
    try {
      return checkEquivalence('p → q', '¬p ∨ q');
    } catch {
      return null;
    }
  });
  const [error, setError] = useState<string | null>(null);

  const handleCheck = () => {
    setError(null);
    try {
      if (!expr1.trim() || !expr2.trim()) {
        throw new Error('กรุณากรอกนิพจน์ทั้ง 2 ฝั่งเพื่อทำการเปรียบเทียบ');
      }
      const res = checkEquivalence(expr1, expr2);
      setResult(res);
    } catch (err: any) {
      setError(err.message || 'เกิดข้อผิดพลาดในการตรวจสอบสมมูล');
      setResult(null);
    }
  };

  const setPreset = (e1: string, e2: string) => {
    setExpr1(e1);
    setExpr2(e2);
    try {
      setResult(checkEquivalence(e1, e2));
      setError(null);
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 md:p-7 space-y-6">
      <div className="border-b border-slate-100 pb-4">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-teal-500" />
          <h3 className="text-xl font-bold text-slate-800">
            เครื่องมือตรวจสอบสมมูลและสัจนิรันดร์ (Equivalence Checker)
          </h3>
        </div>
        <p className="text-sm text-slate-500 mt-1">
          เปรียบเทียบสองประพจน์ว่ามีค่าความจริงตรงกันในทุกกรณีหรือไม่ ($A \equiv B$) พร้อมแสดงชุดค่าความจริงที่เป็นตัวอย่างค้าน
        </p>
      </div>

      {/* Preset Buttons */}
      <div className="flex flex-wrap items-center gap-2 text-xs">
        <span className="font-semibold text-slate-500">ตัวอย่างเปรียบเทียบ:</span>
        <button
          onClick={() => setPreset('p → q', '¬p ∨ q')}
          className="px-2.5 py-1.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 font-mono text-slate-700"
        >
          p → q ≡ ¬p ∨ q
        </button>
        <button
          onClick={() => setPreset('¬(p ∧ q)', '¬p ∨ ¬q')}
          className="px-2.5 py-1.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 font-mono text-slate-700"
        >
          De Morgan (∧)
        </button>
        <button
          onClick={() => setPreset('p → q', 'q → p')}
          className="px-2.5 py-1.5 rounded-lg border border-rose-200 bg-rose-50/50 hover:bg-rose-100 font-mono text-rose-800"
        >
          Converse Fallacy (ไม่สมมูล)
        </button>
        <button
          onClick={() => setPreset('(p ∧ q) → r', 'p → (q → r)')}
          className="px-2.5 py-1.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 font-mono text-slate-700"
        >
          Exportation Law (PDF p.16)
        </button>
      </div>

      {/* Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
            นิพจน์ที่ 1 (Expression A)
          </label>
          <input
            type="text"
            value={expr1}
            onChange={(e) => setExpr1(e.target.value)}
            className="w-full px-4 py-2.5 font-mono text-base rounded-xl border border-slate-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-100 focus:outline-none"
            placeholder="เช่น p → q"
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
            นิพจน์ที่ 2 (Expression B)
          </label>
          <input
            type="text"
            value={expr2}
            onChange={(e) => setExpr2(e.target.value)}
            className="w-full px-4 py-2.5 font-mono text-base rounded-xl border border-slate-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-100 focus:outline-none"
            placeholder="เช่น ¬p ∨ q"
          />
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleCheck}
          className="px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-semibold text-sm transition-all shadow-sm active:scale-95 flex items-center gap-2"
        >
          <Shuffle className="w-4 h-4" />
          ตรวจสอบความสมมูล
        </button>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-sm flex items-start gap-2.5">
          <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
          <p>{error}</p>
        </div>
      )}

      {result && (
        <div className="space-y-5 animate-in fade-in duration-300">
          {/* Status Banner */}
          <div
            className={`p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
              result.isEquivalent
                ? 'bg-teal-50 border-teal-200 text-teal-900'
                : 'bg-rose-50 border-rose-200 text-rose-900'
            }`}
          >
            <div className="flex items-center gap-3">
              {result.isEquivalent ? (
                <CheckCircle2 className="w-7 h-7 text-teal-600 shrink-0" />
              ) : (
                <XCircle className="w-7 h-7 text-rose-600 shrink-0" />
              )}
              <div>
                <h4 className="text-lg font-bold">
                  {result.isEquivalent
                    ? 'สมมูลกันเชิงตรรกะ (Logically Equivalent: A ≡ B)'
                    : 'ไม่สมมูลกัน (Not Equivalent: A ≢ B)'}
                </h4>
                <p className="text-xs md:text-sm mt-0.5 opacity-90">
                  {result.isEquivalent
                    ? 'ค่าความจริงของทั้งสองนิพจน์ตรงกันทุกแถว (100% Match) ส่งผลให้ A ↔ B เป็นสัจนิรันดร์'
                    : `พบ ${result.counterexamples.length} กรณีที่ให้ค่าความจริงแตกต่างกัน (Counterexamples)`}
                </p>
              </div>
            </div>
          </div>

          {/* Detailed Truth Comparison Table */}
          <div className="rounded-xl border border-slate-200 overflow-hidden">
            <table className="w-full text-center border-collapse text-xs md:text-sm">
              <thead className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
                <tr>
                  <th className="py-2.5 px-3 w-12">#</th>
                  {result.variables.map((v) => (
                    <th key={v} className="py-2.5 px-3 font-mono font-bold">
                      {v}
                    </th>
                  ))}
                  <th className="py-2.5 px-4 font-mono text-teal-900 border-l border-slate-200">
                    <MathView math={result.expr1} />
                  </th>
                  <th className="py-2.5 px-4 font-mono text-indigo-900 border-l border-slate-200">
                    <MathView math={result.expr2} />
                  </th>
                  <th className="py-2.5 px-4 border-l border-slate-200">สถานะ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono">
                {result.rows.map((row, idx) => (
                  <tr
                    key={idx}
                    className={`hover:bg-slate-50 transition-colors ${
                      !row.matches ? 'bg-rose-50/40' : ''
                    }`}
                  >
                    <td className="py-2 px-3 text-slate-400 font-normal">{idx + 1}</td>
                    {result.variables.map((v) => (
                      <td key={v} className="py-2 px-3">
                        <TruthBadge value={row.valuation[v]} size="sm" />
                      </td>
                    ))}
                    <td className="py-2 px-4 border-l border-slate-100 bg-teal-50/20">
                      <TruthBadge value={row.val1} size="sm" />
                    </td>
                    <td className="py-2 px-4 border-l border-slate-100 bg-indigo-50/20">
                      <TruthBadge value={row.val2} size="sm" />
                    </td>
                    <td className="py-2 px-4 border-l border-slate-100 font-sans text-xs">
                      {row.matches ? (
                        <span className="text-teal-700 font-semibold">✓ ตรงกัน</span>
                      ) : (
                        <span className="text-rose-700 font-bold bg-rose-100/70 px-2 py-0.5 rounded">
                          ✗ ต่างกัน (ค้าน)
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
