'use client';

import React, { useState, useEffect } from 'react';
import { TruthTableBuilder } from '../../components/tools/TruthTableBuilder';
import { EquivalenceChecker } from '../../components/tools/EquivalenceChecker';
import { ArgumentChecker } from '../../components/tools/ArgumentChecker';
import { InferenceTrainer } from '../../components/tools/InferenceTrainer';
import { QuantifierExplorer } from '../../components/tools/QuantifierExplorer';
import { InductionLab } from '../../components/tools/InductionLab';
import { useProgress } from '../../context/ProgressContext';
import {
  Calculator,
  Cpu,
  GraduationCap,
  Grid,
  Layers,
  Shuffle,
} from 'lucide-react';

const TOOLS = [
  {
    id: 'truth-table',
    title: 'Truth Table Builder',
    titleTh: 'สร้างตารางค่าความจริง',
    desc: 'ประเมิน 2ⁿ แถว และแยกคอลัมน์นิพจน์ย่อย',
    icon: Calculator,
  },
  {
    id: 'equivalence',
    title: 'Equivalence Checker',
    titleTh: 'ตรวจสอบสมมูลและสัจนิรันดร์',
    desc: 'เปรียบเทียบ A ≡ B พร้อมหาตัวอย่างค้าน',
    icon: Shuffle,
  },
  {
    id: 'arguments',
    title: 'Argument Checker',
    titleTh: 'ตรวจสอบการอ้างเหตุผล',
    desc: 'ประเมินความสมเหตุสมผลและหา Countervaluation',
    icon: Cpu,
  },
  {
    id: 'inference',
    title: 'Inference Trainer',
    titleTh: 'แบบฝึกกฎการอนุมาน',
    desc: 'ฝึกฝน Modus Ponens, Tollens และจับผิด Fallacy',
    icon: GraduationCap,
  },
  {
    id: 'quantifier',
    title: 'Quantifier Matrix',
    titleTh: 'สำรวจตัวบ่งปริมาณ',
    desc: 'เปรียบเทียบ ∀x∃y กับ ∃y∀x ผ่านเมทริกซ์ 2 มิติ',
    icon: Grid,
  },
  {
    id: 'induction',
    title: 'Induction Lab',
    titleTh: 'ห้องทดลองอุปนัยคณิตศาสตร์',
    desc: 'ทดลองปรับค่า n และแกะรอยขั้นตอนการพิสูจน์',
    icon: Layers,
  },
];

export default function ToolsHubPage() {
  const [activeTab, setActiveTab] = useState<string>('truth-table');
  const { markToolUsed } = useProgress();

  useEffect(() => {
    markToolUsed(activeTab);
  }, [activeTab, markToolUsed]);

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="border-b border-slate-200 pb-5 space-y-1.5">
        <div className="flex items-center gap-2 text-teal-800 text-xs font-bold uppercase tracking-wider">
          <Cpu className="w-4 h-4 text-teal-600" />
          <span>Interactive Logic Studio</span>
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900">
          ห้องทดลองและเครื่องมือตรรกศาสตร์
        </h1>
        <p className="text-slate-500 text-sm max-w-2xl">
          รวมเครื่องมือเชิงคำนวณและแบบฝึกหัดแบบโต้ตอบทั้ง 6 ตัว ทำงานบนเบราว์เซอร์อย่างปลอดภัยด้วย Safe AST Evaluator (ไม่มีการใช้ eval())
        </p>
      </div>

      {/* Tabs Navigation */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 bg-slate-100 p-1.5 rounded-2xl border border-slate-200">
        {TOOLS.map((t) => {
          const Icon = t.icon;
          const isActive = activeTab === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={`p-3 rounded-xl text-left transition-all flex flex-col justify-between ${
                isActive
                  ? 'bg-white text-teal-900 shadow-sm border border-slate-200 font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              <div className="flex items-center gap-2">
                <Icon
                  className={`w-4 h-4 ${
                    isActive ? 'text-teal-600' : 'text-slate-400'
                  }`}
                />
                <span className="text-xs font-semibold">{t.titleTh}</span>
              </div>
              <div className="text-[10px] text-slate-400 font-mono mt-1 truncate">
                {t.title}
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Tool View */}
      <div className="pt-2">
        {activeTab === 'truth-table' && <TruthTableBuilder />}
        {activeTab === 'equivalence' && <EquivalenceChecker />}
        {activeTab === 'arguments' && <ArgumentChecker />}
        {activeTab === 'inference' && <InferenceTrainer />}
        {activeTab === 'quantifier' && <QuantifierExplorer />}
        {activeTab === 'induction' && <InductionLab />}
      </div>
    </div>
  );
}
