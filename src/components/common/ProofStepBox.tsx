'use client';

import React from 'react';
import { MathView } from './MathView';
import { CheckCircle2, ChevronRight } from 'lucide-react';

interface ProofStepBoxProps {
  title: string;
  premises?: string;
  prove: string;
  steps: {
    step: number;
    statement: string;
    justification: string;
  }[];
  notes?: string;
}

export const ProofStepBox: React.FC<ProofStepBoxProps> = ({
  title,
  premises,
  prove,
  steps,
  notes,
}) => {
  return (
    <div className="my-6 rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
      {/* Header */}
      <div className="bg-slate-50 border-b border-slate-200 px-5 py-4 flex flex-col md:flex-row md:items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-teal-500" />
          <h4 className="font-semibold text-slate-800 text-base">{title}</h4>
        </div>
        <div className="flex flex-wrap items-center gap-3 text-xs md:text-sm text-slate-600 bg-white px-3 py-1.5 rounded-lg border border-slate-200">
          {premises && (
            <div>
              <span className="font-medium text-slate-500">Premises:</span>{' '}
              <MathView math={premises} />
            </div>
          )}
          <div className="flex items-center gap-1 font-semibold text-teal-700">
            <span>Prove:</span> <MathView math={prove} />
          </div>
        </div>
      </div>

      {/* Steps Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm border-collapse">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/50 text-slate-500 text-xs uppercase tracking-wider">
              <th className="py-2.5 px-4 w-16 text-center">ขั้นที่</th>
              <th className="py-2.5 px-4">ข้อความตรรกศาสตร์ (Statement)</th>
              <th className="py-2.5 px-4 text-slate-500">เหตุผลประกอบ (Justification)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {steps.map((s) => (
              <tr key={s.step} className="hover:bg-slate-50/60 transition-colors">
                <td className="py-3 px-4 text-center font-mono text-xs font-semibold text-teal-700 bg-teal-50/30">
                  {s.step}
                </td>
                <td className="py-3 px-4 font-medium text-slate-800">
                  <div className="flex items-center gap-2">
                    <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />
                    <MathView math={s.statement} />
                  </div>
                </td>
                <td className="py-3 px-4 text-slate-600 text-xs md:text-sm">
                  <span className="inline-block px-2 py-0.5 rounded bg-slate-100 border border-slate-200 text-slate-700 font-mono text-xs">
                    {s.justification}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer / Notes */}
      {notes && (
        <div className="bg-teal-50/50 border-t border-teal-100 px-5 py-3 text-xs md:text-sm text-teal-900 flex items-start gap-2">
          <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
          <span>{notes}</span>
        </div>
      )}
    </div>
  );
};
