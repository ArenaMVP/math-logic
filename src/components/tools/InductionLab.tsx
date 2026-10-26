'use client';

import React, { useState } from 'react';
import { MathView } from '../common/MathView';
import { CheckCircle2, ChevronRight, HelpCircle, Layers, Sliders } from 'lucide-react';

interface InductionTheorem {
  id: string;
  titleTh: string;
  latexStatement: string;
  baseCaseN: number;
  evaluateLHS: (n: number) => number;
  evaluateRHS: (n: number) => number;
  steps: {
    stage: string;
    stageTh: string;
    contentTh: string;
    latex?: string;
  }[];
}

const THEOREMS: InductionTheorem[] = [
  {
    id: 'odd-sum',
    titleTh: 'ผลบวกจำนวนคี่ n จำนวนแรก: 1 + 3 + ... + (2n-1) = n²',
    latexStatement: '1 + 3 + 5 + \\dots + (2n-1) = n^2',
    baseCaseN: 1,
    evaluateLHS: (n) => {
      let sum = 0;
      for (let i = 1; i <= n; i++) sum += 2 * i - 1;
      return sum;
    },
    evaluateRHS: (n) => n * n,
    steps: [
      {
        stage: 'Base Case',
        stageTh: 'กรณีฐาน (n = 1)',
        contentTh: 'ตรวจสอบว่าสูตรเป็นจริงที่ค่าเริ่มต้น n = 1',
        latex: '\\text{LHS} = 2(1) - 1 = 1, \\quad \\text{RHS} = 1^2 = 1 \\implies 1 = 1 \\quad (\\text{True})',
      },
      {
        stage: 'Inductive Hypothesis',
        stageTh: 'สมมติฐานอุปนัย (n = k)',
        contentTh: 'สมมติให้ข้อความเป็นจริงเมื่อ n = k สำหรับจำนวนเต็มบวก k ใด ๆ',
        latex: '1 + 3 + 5 + \\dots + (2k-1) = k^2',
      },
      {
        stage: 'Inductive Step',
        stageTh: 'ขั้นอุปนัย (n = k + 1)',
        contentTh: 'แสดงว่าผลบวกถึงพจน์ที่ k+1 เท่ากับ (k+1)²',
        latex: '[1 + 3 + \\dots + (2k-1)] + (2(k+1)-1) = k^2 + (2k+1) = (k+1)^2',
      },
      {
        stage: 'Conclusion',
        stageTh: 'บทสรุป',
        contentTh: 'เนื่องจากกรณีฐานเป็นจริง และขั้นอุปนัยเป็นจริง ดังนั้นสูตรนี้จึงเป็นจริงสำหรับทุกจำนวนเต็มบวก n',
        latex: '\\forall n \\in \\mathbb{Z}^+, \\quad \\sum_{i=1}^n (2i-1) = n^2',
      },
    ],
  },
  {
    id: 'divisibility-six',
    titleTh: 'การหารลงตัว: 6 หาร (n³ - n) ลงตัว',
    latexStatement: '6 \\mid (n^3 - n)',
    baseCaseN: 1,
    evaluateLHS: (n) => n * n * n - n,
    evaluateRHS: (n) => (n * n * n - n) % 6,
    steps: [
      {
        stage: 'Base Case',
        stageTh: 'กรณีฐาน (n = 1)',
        contentTh: 'แทน n = 1: 1³ - 1 = 0 ซึ่ง 0 = 6 × 0 หารด้วย 6 ลงตัว',
        latex: '1^3 - 1 = 0 = 6 \\times 0 \\implies 6 \\mid 0 \\quad (\\text{True})',
      },
      {
        stage: 'Inductive Hypothesis',
        stageTh: 'สมมติฐานอุปนัย (n = k)',
        contentTh: 'สมมติว่า 6 หาร (k³ - k) ลงตัว นั่นคือ k³ - k = 6m สำหรับจำนวนเต็ม m บางตัว',
        latex: 'k^3 - k = 6m',
      },
      {
        stage: 'Inductive Step',
        stageTh: 'ขั้นอุปนัย (n = k + 1)',
        contentTh: 'จัดรูป (k+1)³ - (k+1) ให้อยู่ในรูปที่ดึงตัวคูณ 6 ออกมาได้',
        latex: '(k+1)^3 - (k+1) = (k^3 - k) + 3k(k+1) = 6m + 3(2p) = 6(m + p)',
      },
      {
        stage: 'Conclusion',
        stageTh: 'บทสรุป',
        contentTh: 'ผลบวกทั้งสองพจน์หารด้วย 6 ลงตัว ดังนั้น 6 | (n³ - n) สำหรับทุกจำนวนเต็มบวก n',
        latex: '\\forall n \\in \\mathbb{Z}^+, \\quad 6 \\mid (n^3 - n)',
      },
    ],
  },
  {
    id: 'sum-cubes',
    titleTh: 'ผลบวกกำลังสาม: 1³ + 2³ + ... + n³ = [n(n+1)/2]²',
    latexStatement: '1^3 + 2^3 + \\dots + n^3 = \\left[\\frac{n(n+1)}{2}\\right]^2',
    baseCaseN: 1,
    evaluateLHS: (n) => {
      let sum = 0;
      for (let i = 1; i <= n; i++) sum += i * i * i;
      return sum;
    },
    evaluateRHS: (n) => {
      const t = (n * (n + 1)) / 2;
      return t * t;
    },
    steps: [
      {
        stage: 'Base Case',
        stageTh: 'กรณีฐาน (n = 1)',
        contentTh: 'ตรวจสอบพจน์เริ่มต้น (เติมเต็มจากเอกสารหน้า 29)',
        latex: '1^3 = 1, \\quad \\left[\\frac{1(2)}{2}\\right]^2 = 1^2 = 1 \\implies 1 = 1 \\quad (\\text{True})',
      },
      {
        stage: 'Inductive Hypothesis',
        stageTh: 'สมมติฐานอุปนัย (n = k)',
        contentTh: 'สมมติว่าสูตรเป็นจริงที่ n = k',
        latex: '1^3 + 2^3 + \\dots + k^3 = \\frac{k^2(k+1)^2}{4}',
      },
      {
        stage: 'Inductive Step',
        stageTh: 'ขั้นอุปนัย (n = k + 1)',
        contentTh: 'บวกพจน์ (k+1)³ เข้าทั้งสองข้างแล้วดึงตัวร่วม (k+1)²',
        latex: '\\frac{k^2(k+1)^2}{4} + (k+1)^3 = (k+1)^2 \\left[\\frac{k^2+4k+4}{4}\\right] = \\left[\\frac{(k+1)(k+2)}{2}\\right]^2',
      },
      {
        stage: 'Conclusion',
        stageTh: 'บทสรุป',
        contentTh: 'สูตรผลบวกกำลังสามถูกต้องสำหรับทุกจำนวนนับ n ≥ 1',
        latex: '\\forall n \\ge 1, \\quad \\sum_{i=1}^n i^3 = \\left[\\frac{n(n+1)}{2}\\right]^2',
      },
    ],
  },
];

export const InductionLab: React.FC = () => {
  const [selectedTheorem, setSelectedTheorem] = useState<InductionTheorem>(THEOREMS[0]);
  const [nValue, setNValue] = useState<number>(4);
  const [activeStep, setActiveStep] = useState<number>(0);

  const lhsVal = selectedTheorem.evaluateLHS(nValue);
  const rhsVal = selectedTheorem.evaluateRHS(nValue);
  const isMatch =
    selectedTheorem.id === 'divisibility-six' ? rhsVal === 0 : lhsVal === rhsVal;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 md:p-7 space-y-6">
      <div className="border-b border-slate-100 pb-4">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-teal-500" />
          <h3 className="text-xl font-bold text-slate-800">
            ห้องทดลองอุปนัยเชิงคณิตศาสตร์ (Mathematical Induction Lab)
          </h3>
        </div>
        <p className="text-sm text-slate-500 mt-1">
          ทดลองปรับค่าตัวแปร $n$ แบบเรียลไทม์ และสำรวจขั้นตอนการพิสูจน์ทั้ง 3 ขั้นอย่างเป็นระบบ
        </p>
      </div>

      {/* Theorem Selection Tabs */}
      <div className="flex flex-wrap gap-2">
        {THEOREMS.map((t) => (
          <button
            key={t.id}
            onClick={() => {
              setSelectedTheorem(t);
              setActiveStep(0);
            }}
            className={`px-4 py-2 rounded-xl text-xs md:text-sm font-semibold transition-all ${
              selectedTheorem.id === t.id
                ? 'bg-teal-600 text-white shadow-sm'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            {t.titleTh.split(':')[0]}
          </button>
        ))}
      </div>

      {/* Main Interactive Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Step-by-Step Proof Explorer */}
        <div className="lg:col-span-7 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-600 uppercase tracking-wider flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-teal-600" />
              ขั้นตอนการพิสูจน์แบบละเอียด (Proof Stages):
            </span>
            <span className="text-xs text-slate-400">คลิกเพื่อดูแต่ละขั้น</span>
          </div>

          <div className="space-y-2">
            {selectedTheorem.steps.map((step, idx) => {
              const isOpen = activeStep === idx;
              return (
                <div
                  key={idx}
                  className={`rounded-xl border transition-all ${
                    isOpen
                      ? 'border-teal-400 bg-teal-50/30 shadow-xs'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <button
                    onClick={() => setActiveStep(idx)}
                    className="w-full px-4 py-3 text-left flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                          isOpen ? 'bg-teal-600 text-white' : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {idx + 1}
                      </span>
                      <span className="font-semibold text-slate-800 text-xs md:text-sm">
                        {step.stageTh}
                      </span>
                    </div>
                    <ChevronRight
                      className={`w-4 h-4 text-slate-400 transition-transform ${
                        isOpen ? 'rotate-90 text-teal-600' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-4 pt-1 border-t border-slate-100 space-y-2 text-xs md:text-sm text-slate-700 animate-in fade-in duration-200">
                      <p>{step.contentTh}</p>
                      {step.latex && (
                        <div className="bg-white p-3 rounded-lg border border-slate-200 font-mono text-center">
                          <MathView math={step.latex} block />
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Live Slider & Numerical Verifier */}
        <div className="lg:col-span-5 bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-600 uppercase tracking-wider flex items-center gap-1.5">
              <Sliders className="w-4 h-4 text-teal-600" />
              การทดลองเชิงตัวเลข (Numerical Test):
            </span>
            <span className="font-mono font-bold text-sm bg-white px-2.5 py-0.5 rounded-lg border border-slate-200 text-teal-800">
              n = {nValue}
            </span>
          </div>

          {/* Slider */}
          <div className="space-y-1.5">
            <input
              type="range"
              min={1}
              max={12}
              value={nValue}
              onChange={(e) => setNValue(parseInt(e.target.value, 10))}
              className="w-full accent-teal-600 cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-slate-400 font-mono">
              <span>n=1</span>
              <span>n=6</span>
              <span>n=12</span>
            </div>
          </div>

          {/* Live Values Display */}
          <div className="space-y-2 pt-1">
            <div className="bg-white p-3.5 rounded-xl border border-slate-200 space-y-1.5">
              <div className="text-xs text-slate-500 font-medium">
                {selectedTheorem.id === 'divisibility-six' ? 'ค่าของ n³ - n:' : 'ผลบวกฝั่งซ้าย (LHS):'}
              </div>
              <div className="font-mono text-lg font-bold text-slate-900">{lhsVal}</div>
            </div>

            <div className="bg-white p-3.5 rounded-xl border border-slate-200 space-y-1.5">
              <div className="text-xs text-slate-500 font-medium">
                {selectedTheorem.id === 'divisibility-six' ? 'เศษจากการหารด้วย 6:' : 'ค่าตามสูตรฝั่งขวา (RHS):'}
              </div>
              <div className="font-mono text-lg font-bold text-teal-700">{rhsVal}</div>
            </div>

            {/* Match status */}
            <div
              className={`p-3 rounded-xl border flex items-center gap-2 text-xs font-semibold ${
                isMatch
                  ? 'bg-teal-100/60 border-teal-300 text-teal-900'
                  : 'bg-rose-100/60 border-rose-300 text-rose-900'
              }`}
            >
              <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
              <span>
                {selectedTheorem.id === 'divisibility-six'
                  ? `ที่ n=${nValue} ค่า ${lhsVal} หารด้วย 6 ลงตัว (เศษ 0) สอดคล้องตามทฤษฎี!`
                  : `ที่ n=${nValue} ค่า LHS (${lhsVal}) เท่ากับ RHS (${rhsVal}) สมบูรณ์แบบ!`}
              </span>
            </div>
          </div>

          {/* Odd numbers geometric square visualizer */}
          {selectedTheorem.id === 'odd-sum' && (
            <div className="pt-2 border-t border-slate-200">
              <div className="text-[11px] font-semibold text-slate-500 mb-2">
                รูปทรงเรขาคณิตจัตุรัส ({nValue} × {nValue} = {nValue * nValue} หน่วย):
              </div>
              <div
                className="grid gap-1 bg-white p-3 rounded-xl border border-slate-200 max-w-[200px] mx-auto"
                style={{
                  gridTemplateColumns: `repeat(${nValue}, minmax(0, 1fr))`,
                }}
              >
                {Array.from({ length: nValue * nValue }).map((_, i) => (
                  <div
                    key={i}
                    className="aspect-square rounded-xs bg-teal-400 hover:bg-teal-500 transition-colors"
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
