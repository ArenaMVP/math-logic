'use client';

import React, { useState } from 'react';
import { evaluateArgument } from '../../logic-engine/arguments';
import { ArgumentEvaluationResult } from '../../types/logic';
import { ARGUMENT_PRESETS } from '../../data/presets';
import { MathView } from '../common/MathView';
import { TruthBadge } from '../common/TruthBadge';
import { AlertCircle, CheckCircle2, Plus, Trash2, XCircle } from 'lucide-react';

export const ArgumentChecker: React.FC = () => {
  const [premises, setPremises] = useState<string[]>(['p → q', 'p']);
  const [conclusion, setConclusion] = useState<string>('q');
  const [result, setResult] = useState<ArgumentEvaluationResult | null>(() => {
    try {
      return evaluateArgument(['p → q', 'p'], 'q');
    } catch {
      return null;
    }
  });
  const [error, setError] = useState<string | null>(null);

  const handleEvaluate = (premsToUse = premises, concToUse = conclusion) => {
    setError(null);
    try {
      const res = evaluateArgument(premsToUse, concToUse);
      setResult(res);
    } catch (err: any) {
      setError(err.message || 'เกิดข้อผิดพลาดในการตรวจสอบการอ้างเหตุผล');
      setResult(null);
    }
  };

  const handleAddPremise = () => {
    setPremises((prev) => [...prev, '']);
  };

  const handleRemovePremise = (index: number) => {
    if (premises.length <= 1) return;
    const updated = premises.filter((_, i) => i !== index);
    setPremises(updated);
  };

  const handlePremiseChange = (index: number, val: string) => {
    const updated = [...premises];
    updated[index] = val;
    setPremises(updated);
  };

  const handleSelectPreset = (presetId: string) => {
    const found = ARGUMENT_PRESETS.find((p) => p.id === presetId);
    if (found) {
      setPremises(found.premises);
      setConclusion(found.conclusion);
      handleEvaluate(found.premises, found.conclusion);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 md:p-7 space-y-6">
      {/* Header */}
      <div className="border-b border-slate-100 pb-4">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-teal-500" />
          <h3 className="text-xl font-bold text-slate-800">
            เครื่องมือตรวจสอบการอ้างเหตุผล (Argument Validity Checker)
          </h3>
        </div>
        <p className="text-sm text-slate-500 mt-1">
          ป้อนชุดข้อสมมติ (Premises) และข้อสรุป (Conclusion) ระบบจะประเมินความสมเหตุสมผลตามหลักตรรกศาสตร์ และหา Countervaluation หากไม่ถูกต้อง
        </p>
      </div>

      {/* Preset Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-xs md:text-sm">
        <span className="font-semibold text-slate-700">เลือกตัวอย่างการอ้างเหตุผลจากเอกสาร:</span>
        <select
          onChange={(e) => handleSelectPreset(e.target.value)}
          defaultValue=""
          className="bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-500 text-xs md:text-sm"
        >
          <option value="" disabled>
            -- เลือกกรณีตัวอย่าง --
          </option>
          {ARGUMENT_PRESETS.map((p) => (
            <option key={p.id} value={p.id}>
              {p.titleTh} ({p.isValid ? 'Valid' : 'Invalid'})
            </option>
          ))}
        </select>
      </div>

      {/* Premises Input List */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">
            ข้อสมมติหรือเหตุ (Premises: P₁, P₂, ...)
          </label>
          <button
            onClick={handleAddPremise}
            className="text-xs font-semibold text-teal-700 hover:text-teal-800 flex items-center gap-1 bg-teal-50 hover:bg-teal-100 px-2.5 py-1 rounded-lg border border-teal-200 transition-all"
          >
            <Plus className="w-3.5 h-3.5" /> เพิ่มเหตุ
          </button>
        </div>

        <div className="space-y-2">
          {premises.map((prem, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <span className="w-8 text-center text-xs font-mono font-bold text-slate-400">
                P{idx + 1}:
              </span>
              <input
                type="text"
                value={prem}
                onChange={(e) => handlePremiseChange(idx, e.target.value)}
                placeholder={`ข้อสมมติที่ ${idx + 1} เช่น p → q`}
                className="flex-1 px-3.5 py-2 font-mono text-sm rounded-xl border border-slate-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-100 focus:outline-none bg-slate-50/40"
              />
              {premises.length > 1 && (
                <button
                  onClick={() => handleRemovePremise(idx)}
                  className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                  title="ลบข้อสมมตินี้"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Conclusion Input */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">
          ข้อสรุป (Conclusion: C)
        </label>
        <div className="flex items-center gap-2">
          <span className="w-8 text-center text-base font-bold text-teal-700 font-mono">
            ∴
          </span>
          <input
            type="text"
            value={conclusion}
            onChange={(e) => setConclusion(e.target.value)}
            placeholder="ข้อสรุป เช่น q"
            className="flex-1 px-3.5 py-2 font-mono text-sm font-semibold rounded-xl border border-teal-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-100 focus:outline-none bg-teal-50/20 text-teal-950"
          />
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={() => handleEvaluate()}
          className="px-6 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-semibold text-sm transition-all shadow-sm active:scale-95 flex items-center gap-2"
        >
          ตรวจสอบความสมเหตุสมผล
        </button>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-sm flex items-start gap-2.5">
          <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
          <p>{error}</p>
        </div>
      )}

      {/* Results View */}
      {result && (
        <div className="space-y-5 animate-in fade-in duration-300">
          {/* Validity Banner */}
          <div
            className={`p-5 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
              result.isValid
                ? 'bg-teal-50 border-teal-200 text-teal-900'
                : 'bg-rose-50 border-rose-200 text-rose-900'
            }`}
          >
            <div className="flex items-center gap-3.5">
              {result.isValid ? (
                <CheckCircle2 className="w-8 h-8 text-teal-600 shrink-0" />
              ) : (
                <XCircle className="w-8 h-8 text-rose-600 shrink-0" />
              )}
              <div>
                <h4 className="text-xl font-bold">
                  {result.isValid
                    ? 'การอ้างเหตุผลสมเหตุสมผล (Valid Argument)'
                    : 'การอ้างเหตุผลไม่สมเหตุสมผล (Invalid Argument)'}
                </h4>
                <p className="text-xs md:text-sm mt-1 opacity-90">
                  {result.isValid
                    ? 'ในทุกกรณีที่ข้อสมมติทุกข้อเป็นจริง ข้อสรุปจะเป็นจริงตามไปด้วยเสมอ (ไม่มี Countervaluation)'
                    : `พบ ${result.counterexamples.length} กรณีที่เหตุทุกข้อเป็นจริง แต่ข้อสรุปกลับเป็นเท็จ!`}
                </p>
              </div>
            </div>
          </div>

          {/* Counterexamples explanation if invalid */}
          {!result.isValid && result.counterexamples.length > 0 && (
            <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs md:text-sm space-y-2">
              <h5 className="font-bold flex items-center gap-1.5 text-amber-800">
                <AlertCircle className="w-4 h-4" />
                คำอธิบายตัวอย่างค้าน (Countervaluation Explanation):
              </h5>
              <p>
                การอ้างเหตุผลนี้ไม่ถูกต้อง เพราะพบว่าเมื่อกำหนดค่าความจริงดังต่อไปนี้:
              </p>
              <div className="flex flex-wrap gap-2 pt-1">
                {result.counterexamples.map((c, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-white rounded-lg border border-amber-300 font-mono text-xs shadow-xs"
                  >
                    {Object.entries(c)
                      .map(([k, v]) => `${k} = ${v ? 'T' : 'F'}`)
                      .join(', ')}
                  </span>
                ))}
              </div>
              <p className="text-xs text-amber-700 italic">
                ในกรณีเหล่านี้ ข้อสมมติทุกข้อล้วนมีค่าเป็นจริง (True) แต่ข้อสรุปกลับได้ผลเป็นเท็จ (False) ซึ่งขัดกับนิยามของความสมเหตุสมผล
              </p>
            </div>
          )}

          {/* Truth Table */}
          <div className="rounded-xl border border-slate-200 overflow-hidden shadow-xs">
            <div className="overflow-x-auto max-h-[450px]">
              <table className="w-full text-center border-collapse text-xs md:text-sm">
                <thead className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200 sticky top-0 z-10">
                  <tr>
                    <th className="py-2.5 px-3 w-12 bg-slate-100">#</th>
                    {result.variables.map((v) => (
                      <th key={v} className="py-2.5 px-3 font-mono font-bold">
                        {v}
                      </th>
                    ))}
                    {result.premises.map((p, idx) => (
                      <th
                        key={idx}
                        className="py-2.5 px-3 font-mono font-normal border-l border-slate-200"
                      >
                        P{idx + 1}: <MathView math={p} />
                      </th>
                    ))}
                    <th className="py-2.5 px-4 font-mono font-bold text-indigo-900 bg-indigo-50 border-l border-indigo-200">
                      เหตุทั้งหมด (∧P)
                    </th>
                    <th className="py-2.5 px-4 font-mono font-bold text-teal-900 bg-teal-50 border-l border-teal-200">
                      ∴ <MathView math={result.conclusion} />
                    </th>
                    <th className="py-2.5 px-3 border-l border-slate-200">สถานะ</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-mono">
                  {result.rows.map((row) => (
                    <tr
                      key={row.id}
                      className={`hover:bg-slate-50 transition-colors ${
                        row.isCounterexample
                          ? 'bg-rose-100/60 font-bold'
                          : row.allPremisesTrue
                          ? 'bg-teal-50/40'
                          : ''
                      }`}
                    >
                      <td className="py-2 px-3 text-slate-400 font-normal">{row.id}</td>
                      {result.variables.map((v) => (
                        <td key={v} className="py-2 px-3">
                          <TruthBadge value={row.valuation[v]} size="sm" />
                        </td>
                      ))}
                      {row.premisesValues.map((pv, idx) => (
                        <td key={idx} className="py-2 px-3 border-l border-slate-100">
                          <TruthBadge value={pv} size="sm" />
                        </td>
                      ))}
                      <td className="py-2 px-4 border-l border-indigo-100 bg-indigo-50/20">
                        <TruthBadge value={row.allPremisesTrue} size="sm" />
                      </td>
                      <td className="py-2 px-4 border-l border-teal-100 bg-teal-50/20">
                        <TruthBadge value={row.conclusionValue} size="sm" />
                      </td>
                      <td className="py-2 px-3 border-l border-slate-100 font-sans text-xs">
                        {row.isCounterexample ? (
                          <span className="text-rose-700 font-bold bg-rose-200 px-2 py-0.5 rounded">
                            ⚠️ ตัวอย่างค้าน
                          </span>
                        ) : row.allPremisesTrue ? (
                          <span className="text-teal-700 font-semibold">✓ เหตุจริง ผลจริง</span>
                        ) : (
                          <span className="text-slate-400">-</span>
                        )}
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
