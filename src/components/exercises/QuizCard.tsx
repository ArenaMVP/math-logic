'use client';

import React, { useState } from 'react';
import { QuizQuestion } from '../../types/logic';
import { MathView } from '../common/MathView';
import { useProgress } from '../../context/ProgressContext';
import { CheckCircle2, ChevronRight, HelpCircle, Lightbulb, RotateCcw, XCircle } from 'lucide-react';

interface QuizCardProps {
  chapterId: number;
  questions: QuizQuestion[];
}

export const QuizCard: React.FC<QuizCardProps> = ({ chapterId, questions }) => {
  const { recordQuizScore, markChapterComplete } = useProgress();
  const [currentIdx, setCurrentIdx] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, any>>({});
  const [showHint, setShowHint] = useState<Record<string, boolean>>({});
  const [submitted, setSubmitted] = useState<Record<string, boolean>>({});
  const [isFinished, setIsFinished] = useState(false);

  const q = questions[currentIdx];

  const handleSelectAnswer = (answer: string | boolean) => {
    if (submitted[q.id]) return;
    setUserAnswers((prev) => ({ ...prev, [q.id]: answer }));
  };

  const handleSubmitQuestion = () => {
    setSubmitted((prev) => ({ ...prev, [q.id]: true }));
  };

  const handleRetryQuestion = () => {
    setUserAnswers((prev) => {
      const copy = { ...prev };
      delete copy[q.id];
      return copy;
    });
    setSubmitted((prev) => {
      const copy = { ...prev };
      delete copy[q.id];
      return copy;
    });
  };

  const handleNext = () => {
    if (currentIdx < questions.length - 1) {
      setCurrentIdx((prev) => prev + 1);
    } else {
      // Calculate total score
      let score = 0;
      questions.forEach((question) => {
        if (userAnswers[question.id] === question.correctAnswer) {
          score++;
        }
      });
      recordQuizScore(chapterId, score);
      markChapterComplete(chapterId);
      setIsFinished(true);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentIdx(0);
    setUserAnswers({});
    setShowHint({});
    setSubmitted({});
    setIsFinished(false);
  };

  if (isFinished) {
    const totalScore = questions.reduce((acc, question) => {
      return userAnswers[question.id] === question.correctAnswer ? acc + 1 : acc;
    }, 0);
    const percentage = Math.round((totalScore / questions.length) * 100);

    return (
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 md:p-8 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center mx-auto text-2xl font-bold">
          🎉
        </div>
        <h4 className="text-2xl font-bold text-slate-800">
          ยินดีด้วย! คุณทำแบบทดสอบเสร็จเรียบร้อย
        </h4>
        <p className="text-slate-500 text-sm max-w-md mx-auto">
          ผลคะแนนได้รับการบันทึกในระบบติดตามความคืบหน้าของเบราว์เซอร์เครื่องนี้แล้ว
        </p>

        <div className="inline-block bg-slate-50 border border-slate-200 rounded-2xl px-8 py-4 my-2">
          <div className="text-4xl font-extrabold text-teal-700 font-mono">
            {totalScore} / {questions.length}
          </div>
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-1">
            คิดเป็น {percentage}%
          </div>
        </div>

        <div className="pt-4 flex justify-center gap-3">
          <button
            onClick={handleRestartQuiz}
            className="px-5 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-medium text-sm flex items-center gap-2 transition-all shadow-xs"
          >
            <RotateCcw className="w-4 h-4" /> ทำแบบทดสอบอีกครั้ง
          </button>
        </div>
      </div>
    );
  }

  const isCurrentSubmitted = Boolean(submitted[q.id]);
  const isCorrect = userAnswers[q.id] === q.correctAnswer;
  const hasAnswered = userAnswers[q.id] !== undefined;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 md:p-7 space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-teal-500" />
          <h4 className="font-bold text-slate-800 text-base md:text-lg">
            แบบฝึกหัดท้ายบทเรียน (Chapter Quiz)
          </h4>
        </div>
        <span className="text-xs font-mono font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
          ข้อ {currentIdx + 1} จาก {questions.length}
        </span>
      </div>

      {/* Question Prompt */}
      <div className="space-y-2">
        <p className="font-semibold text-slate-900 text-sm md:text-base leading-relaxed">
          {q.prompt}
        </p>
        {q.promptLatex && (
          <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200 font-mono text-center text-sm">
            <MathView math={q.promptLatex} block />
          </div>
        )}
      </div>

      {/* Hint toggle */}
      {q.hint && !isCurrentSubmitted && (
        <div>
          <button
            onClick={() =>
              setShowHint((prev) => ({ ...prev, [q.id]: !prev[q.id] }))
            }
            className="text-xs font-semibold text-amber-700 hover:text-amber-800 flex items-center gap-1.5"
          >
            <Lightbulb className="w-3.5 h-3.5" />
            {showHint[q.id] ? 'ซ่อนคำใบ้' : 'ขอคำใบ้ (Hint)'}
          </button>
          {showHint[q.id] && (
            <p className="mt-1.5 text-xs text-amber-900 bg-amber-50 p-3 rounded-lg border border-amber-200 animate-in fade-in duration-200">
              💡 {q.hint}
            </p>
          )}
        </div>
      )}

      {/* Answer Options */}
      {q.type === 'multiple_choice' && q.options && (
        <div className="space-y-2">
          {q.options.map((opt) => {
            const isSelected = userAnswers[q.id] === opt.id;
            let style =
              'border-slate-200 bg-white text-slate-800 hover:border-teal-400 hover:bg-teal-50/20';

            if (isCurrentSubmitted) {
              if (opt.id === q.correctAnswer) {
                style = 'border-teal-400 bg-teal-50 text-teal-900 font-bold';
              } else if (isSelected && !isCorrect) {
                style = 'border-rose-300 bg-rose-50 text-rose-900 font-bold';
              } else {
                style = 'border-slate-200 bg-slate-50/50 text-slate-400 opacity-60';
              }
            } else if (isSelected) {
              style = 'border-teal-500 bg-teal-50/60 text-teal-900 font-semibold ring-2 ring-teal-200';
            }

            return (
              <button
                key={opt.id}
                onClick={() => handleSelectAnswer(opt.id)}
                disabled={isCurrentSubmitted}
                className={`w-full p-3.5 rounded-xl border text-left text-xs md:text-sm transition-all flex items-center justify-between ${style}`}
              >
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center font-bold text-xs uppercase text-slate-600">
                    {opt.id}
                  </span>
                  <span>{opt.text}</span>
                </div>
                {isCurrentSubmitted && opt.id === q.correctAnswer && (
                  <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                )}
                {isCurrentSubmitted && isSelected && !isCorrect && (
                  <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
                )}
              </button>
            );
          })}
        </div>
      )}

      {/* True/False Buttons */}
      {q.type === 'true_false' && (
        <div className="grid grid-cols-2 gap-3">
          {[
            { val: true, label: 'จริง (True)' },
            { val: false, label: 'เท็จ (False)' },
          ].map((tf) => {
            const isSelected = userAnswers[q.id] === tf.val;
            let style =
              'border-slate-200 bg-white text-slate-800 hover:border-teal-400 hover:bg-teal-50/20';

            if (isCurrentSubmitted) {
              if (tf.val === q.correctAnswer) {
                style = 'border-teal-400 bg-teal-50 text-teal-900 font-bold';
              } else if (isSelected && !isCorrect) {
                style = 'border-rose-300 bg-rose-50 text-rose-900 font-bold';
              } else {
                style = 'border-slate-200 bg-slate-50/50 text-slate-400 opacity-60';
              }
            } else if (isSelected) {
              style = 'border-teal-500 bg-teal-50/60 text-teal-900 font-semibold ring-2 ring-teal-200';
            }

            return (
              <button
                key={String(tf.val)}
                onClick={() => handleSelectAnswer(tf.val)}
                disabled={isCurrentSubmitted}
                className={`p-3.5 rounded-xl border text-center font-semibold text-xs md:text-sm transition-all ${style}`}
              >
                {tf.label}
              </button>
            );
          })}
        </div>
      )}

      {/* Explanation Box on Submit */}
      {isCurrentSubmitted && (
        <div
          className={`p-4 rounded-xl border text-xs md:text-sm space-y-2 animate-in fade-in duration-200 ${
            isCorrect
              ? 'bg-teal-50/80 border-teal-200 text-teal-950'
              : 'bg-rose-50/80 border-rose-200 text-rose-950'
          }`}
        >
          <div className="font-bold flex items-center gap-1.5">
            {isCorrect ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-teal-600" />
                <span className="text-teal-800">ถูกต้อง! เก่งมาก</span>
              </>
            ) : (
              <>
                <XCircle className="w-4 h-4 text-rose-600" />
                <span className="text-rose-800">ยังไม่ถูกต้อง ลองศึกษาคำอธิบายด้านล่าง</span>
              </>
            )}
          </div>
          <p className="leading-relaxed opacity-95">{q.explanation}</p>
        </div>
      )}

      {/* Footer Controls */}
      <div className="flex items-center justify-between border-t border-slate-100 pt-3">
        {isCurrentSubmitted && !isCorrect ? (
          <button
            onClick={handleRetryQuestion}
            className="text-xs font-semibold text-slate-600 hover:text-slate-800 flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-200 bg-white"
          >
            <RotateCcw className="w-3.5 h-3.5" /> ลองตอบใหม่
          </button>
        ) : (
          <div />
        )}

        {!isCurrentSubmitted ? (
          <button
            onClick={handleSubmitQuestion}
            disabled={!hasAnswered}
            className={`px-5 py-2 rounded-xl text-xs md:text-sm font-semibold transition-all ${
              hasAnswered
                ? 'bg-teal-600 hover:bg-teal-700 text-white shadow-sm active:scale-95'
                : 'bg-slate-100 text-slate-400 cursor-not-allowed'
            }`}
          >
            ตรวจคำตอบ
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="px-5 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs md:text-sm font-semibold transition-all shadow-sm active:scale-95 flex items-center gap-1"
          >
            <span>{currentIdx < questions.length - 1 ? 'ข้อถัดไป' : 'ดูสรุปผลคะแนน'}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};
