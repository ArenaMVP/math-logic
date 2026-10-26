'use client';

import React, { useState } from 'react';
import { MathView } from '../common/MathView';
import { CheckCircle2, Grid, HelpCircle, XCircle } from 'lucide-react';

interface RelationConfig {
  id: string;
  nameTh: string;
  latex: string;
  predicate: (x: number, y: number) => boolean;
  explanationAllExist: string;
  explanationExistAll: string;
}

const DOMAIN_ELEMENTS = [1, 2, 3, 4, 5];

const RELATIONS: RelationConfig[] = [
  {
    id: 'less_than',
    nameTh: 'ความสัมพันธ์ น้อยกว่า (x < y)',
    latex: 'x < y',
    predicate: (x, y) => x < y,
    explanationAllExist:
      '∀x∃y (x < y) เป็นจริงเมื่อ x ∈ {1,2,3,4} เพราะมี y ที่มากกว่า แต่ที่ x=5 ไม่มี y ในโดเมนที่มากกว่า 5 ดังนั้นบนโดเมนจำกัดนี้จึงเป็นเท็จ (แต่บนจำนวนเต็ม Z ที่ไม่มีขอบเขตบน จะเป็นจริงเสมอโดยเลือก y = x+1)',
    explanationExistAll:
      '∃y∀x (x < y) เป็นเท็จเสมอ เพราะไม่มีเลข y เดี่ยว ๆ ตัวใดในโดเมนที่สามารถมีค่ามากกว่าตัวเลขทุกตัวได้ (เช่น ถ้าเลือก y=5 ค่า x=5 จะทำให้ 5 < 5 เป็นเท็จ)',
  },
  {
    id: 'less_equal',
    nameTh: 'ความสัมพันธ์ น้อยกว่าหรือเท่ากับ (x ≤ y)',
    latex: 'x \\le y',
    predicate: (x, y) => x <= y,
    explanationAllExist:
      '∀x∃y (x ≤ y) เป็นจริงเสมอ เพราะสำหรับ x ทุกตัว เราสามารถเลือก y = 5 (หรือเลือก y = x) ได้เสมอ ทุกแถวจึงมีช่องสีเขียว',
    explanationExistAll:
      '∃y∀x (x ≤ y) เป็นจริง! โดยเลือก y = 5 จะสังเกตเห็นว่าคอลัมน์ y=5 เป็นสีเขียวตลอดทั้งแนวตั้งแต่แถวแรกถึงแถวสุดท้าย (5 คือค่าสูงสุดของโดเมน)',
  },
  {
    id: 'sum_six',
    nameTh: 'ผลบวกเท่ากับ 6 (x + y = 6)',
    latex: 'x + y = 6',
    predicate: (x, y) => x + y === 6,
    explanationAllExist:
      '∀x∃y (x + y = 6) เป็นจริง! สำหรับ x ทุกตัวใน {1,2,3,4,5} เราสามารถเลือก y = 6 - x ซึ่งยังคงอยู่ในโดเมนเสมอ (1+5, 2+4, 3+3, 4+2, 5+1)',
    explanationExistAll:
      '∃y∀x (x + y = 6) เป็นเท็จ! ไม่มีเลข y เดี่ยว ๆ ตัวใดที่เมื่อบวกกับตัวเลข x ทุกตัวในโดเมนแล้วได้ผลลัพธ์เป็น 6 เท่ากันหมด',
  },
  {
    id: 'divides',
    nameTh: 'การหารลงตัว (x | y)',
    latex: 'x \\mid y',
    predicate: (x, y) => y % x === 0,
    explanationAllExist:
      '∀x∃y (x | y) เป็นจริง เพราะสำหรับ x ใด ๆ สามารถเลือก y = x เสมอ (ตัวมันเองหารตัวมันเองลงตัว)',
    explanationExistAll:
      '∃y∀x (x | y) เป็นเท็จ เพราะไม่มีจำนวนใดใน {1..5} ที่ถูกหารลงตัวด้วยตัวเลขทุกตัวพร้อมกัน (ค.ร.น. ของ 1..5 คือ 60 ซึ่งเกินโดเมน)',
  },
];

export const QuantifierExplorer: React.FC = () => {
  const [selectedRelation, setSelectedRelation] = useState<RelationConfig>(RELATIONS[0]);

  // Compute truth of ∀x∃y
  const forallExistsTrue = DOMAIN_ELEMENTS.every((x) =>
    DOMAIN_ELEMENTS.some((y) => selectedRelation.predicate(x, y))
  );

  // Compute truth of ∃y∀x
  const existsForallTrue = DOMAIN_ELEMENTS.some((y) =>
    DOMAIN_ELEMENTS.every((x) => selectedRelation.predicate(x, y))
  );

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 md:p-7 space-y-6">
      <div className="border-b border-slate-100 pb-4">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-teal-500" />
          <h3 className="text-xl font-bold text-slate-800">
            เครื่องมือสำรวจตัวบ่งปริมาณ (Quantifier Matrix Explorer)
          </h3>
        </div>
        <p className="text-sm text-slate-500 mt-1">
          เห็นภาพความแตกต่างอย่างลึกซึ้งระหว่าง $\forall x \exists y$ กับ $\exists y \forall x$ ผ่านตารางเมทริกซ์ 2 มิติ บนโดเมนจำกัด $U = \{1, 2, 3, 4, 5\}$
        </p>
      </div>

      {/* Relation Selector */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">
          เลือกความสัมพันธ์ R(x, y):
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
          {RELATIONS.map((rel) => (
            <button
              key={rel.id}
              onClick={() => setSelectedRelation(rel)}
              className={`p-3 rounded-xl border text-left text-xs transition-all ${
                selectedRelation.id === rel.id
                  ? 'border-teal-500 bg-teal-50/70 text-teal-900 font-bold shadow-xs'
                  : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
              }`}
            >
              <div className="font-semibold">{rel.nameTh}</div>
              <div className="mt-1 font-mono text-teal-700">
                <MathView math={rel.latex} />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Matrix Visualizer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* The 2D Grid */}
        <div className="lg:col-span-7 bg-slate-50 p-4.5 rounded-2xl border border-slate-200 space-y-3">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-600">
            <span className="flex items-center gap-1.5">
              <Grid className="w-4 h-4 text-teal-600" />
              เมทริกซ์ความจริง R(x, y) สำหรับ x, y ∈ {'{1, 2, 3, 4, 5}'}
            </span>
            <span className="text-[11px] text-slate-400">แกนนอน: y | แกนตั้ง: x</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-center border-collapse text-xs md:text-sm font-mono">
              <thead>
                <tr>
                  <th className="p-2 text-slate-400 font-normal">x \ y</th>
                  {DOMAIN_ELEMENTS.map((y) => (
                    <th key={y} className="p-2 font-bold text-slate-700 bg-slate-100/80 rounded-t">
                      y={y}
                    </th>
                  ))}
                  <th className="p-2 text-slate-500 font-sans text-xs">∃y R(x,y)?</th>
                </tr>
              </thead>
              <tbody>
                {DOMAIN_ELEMENTS.map((x) => {
                  const hasTrueInRow = DOMAIN_ELEMENTS.some((y) =>
                    selectedRelation.predicate(x, y)
                  );
                  return (
                    <tr key={x} className="border-t border-slate-200/60">
                      <td className="p-2 font-bold text-slate-700 bg-slate-100/80">x={x}</td>
                      {DOMAIN_ELEMENTS.map((y) => {
                        const satisfied = selectedRelation.predicate(x, y);
                        return (
                          <td key={y} className="p-1.5">
                            <span
                              className={`w-8 h-8 md:w-9 md:h-9 mx-auto rounded-lg flex items-center justify-center font-bold text-xs transition-transform hover:scale-110 shadow-xs ${
                                satisfied
                                  ? 'bg-teal-500 text-white shadow-teal-200'
                                  : 'bg-slate-200 text-slate-400'
                              }`}
                              title={`R(${x}, ${y}) = ${satisfied ? 'True' : 'False'}`}
                            >
                              {satisfied ? 'T' : 'F'}
                            </span>
                          </td>
                        );
                      })}
                      <td className="p-2 font-sans text-xs">
                        {hasTrueInRow ? (
                          <span className="text-teal-700 font-semibold">✓ มี</span>
                        ) : (
                          <span className="text-rose-600 font-semibold">✗ ไม่มี</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
                {/* Column summary for ∃y∀x */}
                <tr className="border-t-2 border-slate-300 bg-slate-100/50">
                  <td className="p-2 font-sans text-xs font-bold text-slate-600">∀x R(x,y)?</td>
                  {DOMAIN_ELEMENTS.map((y) => {
                    const allTrueInCol = DOMAIN_ELEMENTS.every((x) =>
                      selectedRelation.predicate(x, y)
                    );
                    return (
                      <td key={y} className="p-2 font-sans text-xs">
                        {allTrueInCol ? (
                          <span className="text-teal-700 font-bold bg-teal-100 px-1 py-0.5 rounded">
                            ✓ จริงทุก x
                          </span>
                        ) : (
                          <span className="text-slate-400">ไม่ครบ</span>
                        )}
                      </td>
                    );
                  })}
                  <td className="p-2">-</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Comparison Cards */}
        <div className="lg:col-span-5 space-y-4">
          {/* Card 1: ∀x∃y */}
          <div
            className={`p-4.5 rounded-2xl border transition-all ${
              forallExistsTrue
                ? 'bg-teal-50/70 border-teal-200 text-teal-950'
                : 'bg-rose-50/70 border-rose-200 text-rose-950'
            }`}
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <span className="text-xs uppercase font-bold tracking-wider text-slate-500">
                  กรณีที่ 1: สำหรับทุก x มี y
                </span>
                <h4 className="text-base font-bold font-mono mt-0.5">
                  <MathView math={`\\forall x \\exists y (${selectedRelation.latex})`} />
                </h4>
              </div>
              <span
                className={`px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1 ${
                  forallExistsTrue
                    ? 'bg-teal-600 text-white'
                    : 'bg-rose-600 text-white'
                }`}
              >
                {forallExistsTrue ? <CheckCircle2 className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                {forallExistsTrue ? 'จริง (True)' : 'เท็จ (False)'}
              </span>
            </div>
            <p className="text-xs mt-2.5 leading-relaxed opacity-90">
              {selectedRelation.explanationAllExist}
            </p>
            <div className="mt-2 text-[11px] font-semibold text-slate-500 bg-white/70 px-2.5 py-1 rounded border border-black/5">
              💡 กฎภาพ: ต้องมีช่องสีเขียวอย่างน้อย 1 ช่องใน <strong>ทุก ๆ แถวแนวนอน</strong>
            </div>
          </div>

          {/* Card 2: ∃y∀x */}
          <div
            className={`p-4.5 rounded-2xl border transition-all ${
              existsForallTrue
                ? 'bg-teal-50/70 border-teal-200 text-teal-950'
                : 'bg-rose-50/70 border-rose-200 text-rose-950'
            }`}
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <span className="text-xs uppercase font-bold tracking-wider text-slate-500">
                  กรณีที่ 2: มี y ที่ใช้ได้กับทุก x
                </span>
                <h4 className="text-base font-bold font-mono mt-0.5">
                  <MathView math={`\\exists y \\forall x (${selectedRelation.latex})`} />
                </h4>
              </div>
              <span
                className={`px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1 ${
                  existsForallTrue
                    ? 'bg-teal-600 text-white'
                    : 'bg-rose-600 text-white'
                }`}
              >
                {existsForallTrue ? <CheckCircle2 className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                {existsForallTrue ? 'จริง (True)' : 'เท็จ (False)'}
              </span>
            </div>
            <p className="text-xs mt-2.5 leading-relaxed opacity-90">
              {selectedRelation.explanationExistAll}
            </p>
            <div className="mt-2 text-[11px] font-semibold text-slate-500 bg-white/70 px-2.5 py-1 rounded border border-black/5">
              💡 กฎภาพ: ต้องมี <strong>คอลัมน์แนวตั้งอย่างน้อย 1 คอลัมน์ที่เป็นสีเขียวทั้งแนว</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
