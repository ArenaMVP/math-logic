'use client';

import React, { useState } from 'react';
import { MathView } from '../common/MathView';
import { CheckCircle2, ChevronRight, HelpCircle, RotateCcw, XCircle } from 'lucide-react';

interface InferenceChallenge {
  id: string;
  category: 'valid_rule' | 'missing_step' | 'spot_fallacy';
  premises: string[];
  conclusion: string;
  questionText: string;
  options: { id: string; label: string; isCorrect: boolean }[];
  explanation: string;
  ruleName: string;
}

const CHALLENGES: InferenceChallenge[] = [
  {
    id: 'inf-1',
    category: 'valid_rule',
    premises: ['p → q', 'p'],
    conclusion: 'q',
    questionText: 'การอนุมานนี้สอดคล้องกับกฎการอนุมานใด?',
    options: [
      { id: 'a', label: 'Modus Ponens (การยืนยันเหตุ)', isCorrect: true },
      { id: 'b', label: 'Modus Tollens (การปฏิเสธผล)', isCorrect: false },
      { id: 'c', label: 'Hypothetical Syllogism', isCorrect: false },
      { id: 'd', label: 'Affirming the Consequent', isCorrect: false },
    ],
    explanation: 'Modus Ponens ระบุว่า เมื่อกำหนด p → q และ p เราสามารถสรุป q ได้เสมอ',
    ruleName: 'Modus Ponens',
  },
  {
    id: 'inf-2',
    category: 'valid_rule',
    premises: ['p → q', '¬q'],
    conclusion: '¬p',
    questionText: 'การอนุมานนี้สอดคล้องกับกฎการอนุมานใด?',
    options: [
      { id: 'a', label: 'Modus Ponens', isCorrect: false },
      { id: 'b', label: 'Modus Tollens (การปฏิเสธผล)', isCorrect: true },
      { id: 'c', label: 'Disjunctive Syllogism', isCorrect: false },
      { id: 'd', label: 'Denying the Antecedent', isCorrect: false },
    ],
    explanation: 'Modus Tollens ระบุว่า เมื่อกำหนด p → q และ ¬q เราสามารถสรุป ¬p ได้เสมอ (สอดคล้องกับแย้งสลับที่)',
    ruleName: 'Modus Tollens',
  },
  {
    id: 'inf-3',
    category: 'valid_rule',
    premises: ['p → q', 'q → r'],
    conclusion: 'p → r',
    questionText: 'การถ่ายทอดเงื่อนไขนี้ตรงกับกฎข้อใด?',
    options: [
      { id: 'a', label: 'Hypothetical Syllogism (ตรรกบทสมมติฐาน)', isCorrect: true },
      { id: 'b', label: 'Constructive Dilemma', isCorrect: false },
      { id: 'c', label: 'Modus Ponens', isCorrect: false },
      { id: 'd', label: 'Disjunctive Syllogism', isCorrect: false },
    ],
    explanation: 'Hypothetical Syllogism (HS) ระบุว่าถ้า p นำไปสู่ q และ q นำไปสู่ r แล้ว p ย่อมนำไปสู่ r',
    ruleName: 'Hypothetical Syllogism',
  },
  {
    id: 'inf-4',
    category: 'missing_step',
    premises: ['p ∨ q', '¬p'],
    conclusion: '?',
    questionText: 'จากเหตุ p ∨ q และ ¬p ข้อสรุปที่ถูกต้องตาม Disjunctive Syllogism คืออะไร?',
    options: [
      { id: 'a', label: 'q', isCorrect: true },
      { id: 'b', label: '¬q', isCorrect: false },
      { id: 'c', label: 'p ∧ q', isCorrect: false },
      { id: 'd', label: 'p', isCorrect: false },
    ],
    explanation: 'Disjunctive Syllogism (DS): เมื่ออย่างน้อยหนึ่งตัวต้องเป็นจริง (p หรือ q) และ p เป็นเท็จ (¬p) ตัวที่เหลือ (q) ต้องเป็นจริง',
    ruleName: 'Disjunctive Syllogism',
  },
  {
    id: 'inf-5',
    category: 'spot_fallacy',
    premises: ['p → q', 'q'],
    conclusion: 'p',
    questionText: 'การอ้างเหตุผลนี้สมเหตุสมผลหรือไม่?',
    options: [
      { id: 'a', label: 'สมเหตุสมผลตามกฎ Modus Ponens', isCorrect: false },
      { id: 'b', label: 'ไม่สมเหตุสมผล เป็นความผิดพลาดแบบ Affirming the Consequent', isCorrect: true },
      { id: 'c', label: 'สมเหตุสมผลตามกฎ Modus Tollens', isCorrect: false },
      { id: 'd', label: 'ไม่สมเหตุสมผล เพราะไม่มีตัวเชื่อม ∧', isCorrect: false },
    ],
    explanation: 'การยืนยันผล (Affirming the Consequent) ไม่ถูกต้อง! ตัวอย่างค้านคือ เมื่อ p=F, q=T เหตุ p→q เป็นจริง และ q เป็นจริง แต่ข้อสรุป p กลับเป็นเท็จ',
    ruleName: 'Formal Fallacy',
  },
  {
    id: 'inf-6',
    category: 'spot_fallacy',
    premises: ['p → q', '¬p'],
    conclusion: '¬q',
    questionText: 'การอ้างเหตุผลนี้มีความผิดพลาดแบบใด?',
    options: [
      { id: 'a', label: 'Denying the Antecedent (การปฏิเสธเหตุ)', isCorrect: true },
      { id: 'b', label: 'Affirming the Consequent', isCorrect: false },
      { id: 'c', label: 'Hypothetical Syllogism', isCorrect: false },
      { id: 'd', label: 'ถูกต้องแล้วตามหลักการ', isCorrect: false },
    ],
    explanation: 'การปฏิเสธเหตุ (Denying the Antecedent) เป็นข้อผิดพลาดเชิงรูปนัย การที่เหตุไม่เกิด มิได้รับประกันว่าผลจะไม่เกิดจากสาเหตุอื่น',
    ruleName: 'Formal Fallacy',
  },
];

export const InferenceTrainer: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);

  const current = CHALLENGES[currentIndex];

  const handleSelect = (optId: string) => {
    if (selectedOption !== null) return;
    setSelectedOption(optId);
    setShowExplanation(true);
    const chosen = current.options.find((o) => o.id === optId);
    if (chosen?.isCorrect) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    setSelectedOption(null);
    setShowExplanation(false);
    if (currentIndex < CHALLENGES.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      // Loop or finish
      setCurrentIndex(0);
    }
  };

  const handleReset = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setShowExplanation(false);
    setScore(0);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 md:p-7 space-y-6">
      <div className="border-b border-slate-100 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-teal-500" />
            <h3 className="text-xl font-bold text-slate-800">
              แบบฝึกการใช้กฎอนุมาน (Inference Rules Trainer)
            </h3>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            ฝึกทักษะการจำแนกกฎ Modus Ponens, Modus Tollens, Syllogism และการจับผิดข้อผิดพลาดเชิงรูปนัย
          </p>
        </div>
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <span className="text-xs font-semibold px-3 py-1 bg-teal-50 text-teal-800 rounded-lg border border-teal-200">
            คะแนน: {score} / {CHALLENGES.length}
          </span>
          <button
            onClick={handleReset}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg transition-colors"
            title="เริ่มใหม่"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Challenge Card */}
      <div className="bg-slate-50 rounded-xl border border-slate-200 p-5 space-y-4">
        <div className="flex items-center justify-between text-xs text-slate-500">
          <span className="font-semibold uppercase tracking-wider text-teal-700">
            โจทย์ข้อที่ {currentIndex + 1} จาก {CHALLENGES.length}
          </span>
          <span className="px-2 py-0.5 rounded bg-white border border-slate-200 font-mono">
            {current.ruleName}
          </span>
        </div>

        {/* Premises & Conclusion Box */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 space-y-2">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            กำหนดการอ้างเหตุผล:
          </div>
          <div className="space-y-1 font-mono text-sm md:text-base">
            {current.premises.map((p, i) => (
              <div key={i} className="flex items-center gap-2 text-slate-700">
                <span className="text-xs font-bold text-slate-400 w-8">เหตุ {i + 1}:</span>
                <MathView math={p} />
              </div>
            ))}
            <div className="flex items-center gap-2 text-teal-800 font-bold border-t border-slate-100 pt-1.5 mt-1.5">
              <span className="text-xs font-bold text-teal-600 w-8">ผลสรุป:</span>
              <MathView math={current.conclusion} />
            </div>
          </div>
        </div>

        <p className="font-semibold text-slate-800 text-sm md:text-base pt-1">
          {current.questionText}
        </p>

        {/* Options */}
        <div className="grid grid-cols-1 gap-2.5">
          {current.options.map((opt) => {
            const isSelected = selectedOption === opt.id;
            let btnStyle =
              'border-slate-200 bg-white text-slate-800 hover:border-teal-400 hover:bg-teal-50/20';

            if (selectedOption !== null) {
              if (opt.isCorrect) {
                btnStyle = 'border-teal-400 bg-teal-50 text-teal-900 font-bold';
              } else if (isSelected && !opt.isCorrect) {
                btnStyle = 'border-rose-300 bg-rose-50 text-rose-900 font-bold';
              } else {
                btnStyle = 'border-slate-200 bg-slate-100/50 text-slate-400 opacity-60';
              }
            }

            return (
              <button
                key={opt.id}
                onClick={() => handleSelect(opt.id)}
                disabled={selectedOption !== null}
                className={`p-3.5 rounded-xl border text-left text-xs md:text-sm transition-all flex items-center justify-between ${btnStyle}`}
              >
                <span>{opt.label}</span>
                {selectedOption !== null && opt.isCorrect && (
                  <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 ml-2" />
                )}
                {selectedOption === opt.id && !opt.isCorrect && (
                  <XCircle className="w-4 h-4 text-rose-600 shrink-0 ml-2" />
                )}
              </button>
            );
          })}
        </div>

        {/* Explanation */}
        {showExplanation && (
          <div className="p-4 rounded-xl bg-teal-50/80 border border-teal-200 text-teal-950 text-xs md:text-sm space-y-2 animate-in fade-in duration-200">
            <div className="font-bold flex items-center gap-1.5 text-teal-800">
              <HelpCircle className="w-4 h-4 text-teal-600" />
              คำอธิบายหลักการ:
            </div>
            <p className="leading-relaxed">{current.explanation}</p>
            <div className="pt-2 flex justify-end">
              <button
                onClick={handleNext}
                className="px-4 py-2 rounded-lg bg-teal-600 hover:bg-teal-700 text-white font-semibold text-xs transition-all shadow-sm flex items-center gap-1"
              >
                <span>{currentIndex < CHALLENGES.length - 1 ? 'ข้อถัดไป' : 'ทำใหม่อีกรอบ'}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
