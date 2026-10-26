'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { ChapterData } from '../../../types/logic';
import { useProgress } from '../../../context/ProgressContext';
import { MathView } from '../../../components/common/MathView';
import { ProofStepBox } from '../../../components/common/ProofStepBox';
import { AlertBox } from '../../../components/common/AlertBox';
import { QuizCard } from '../../../components/exercises/QuizCard';
import { TruthTableBuilder } from '../../../components/tools/TruthTableBuilder';
import { EquivalenceChecker } from '../../../components/tools/EquivalenceChecker';
import { ArgumentChecker } from '../../../components/tools/ArgumentChecker';
import { InferenceTrainer } from '../../../components/tools/InferenceTrainer';
import { QuantifierExplorer } from '../../../components/tools/QuantifierExplorer';
import { InductionLab } from '../../../components/tools/InductionLab';
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Clock,
  Cpu,
  ListChecks,
} from 'lucide-react';

interface ChapterContentClientProps {
  chapter: ChapterData;
  prevChapter?: ChapterData;
  nextChapter?: ChapterData;
}

export const ChapterContentClient: React.FC<ChapterContentClientProps> = ({
  chapter,
  prevChapter,
  nextChapter,
}) => {
  const { setLastActiveChapter, isChapterCompleted } = useProgress();

  useEffect(() => {
    setLastActiveChapter(chapter.id);
  }, [chapter.id, setLastActiveChapter]);

  const completed = isChapterCompleted(chapter.id);

  // Render the most relevant interactive tool for this chapter
  const renderInteractiveTool = () => {
    switch (chapter.id) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-teal-800 text-xs font-bold uppercase tracking-wider">
              <Cpu className="w-4 h-4 text-teal-600" />
              <span>เครื่องมือทดลองประจำบทที่ 1: ตรวจสอบการอนุมานลูกโซ่</span>
            </div>
            <ArgumentChecker />
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-teal-800 text-xs font-bold uppercase tracking-wider">
              <Cpu className="w-4 h-4 text-teal-600" />
              <span>เครื่องมือทดลองประจำบทที่ 2: สร้างตารางค่าความจริง</span>
            </div>
            <TruthTableBuilder />
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-teal-800 text-xs font-bold uppercase tracking-wider">
              <Cpu className="w-4 h-4 text-teal-600" />
              <span>เครื่องมือทดลองประจำบทที่ 3: ตรวจสอบสัจนิรันดร์และสมมูล</span>
            </div>
            <EquivalenceChecker />
          </div>
        );
      case 4:
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-teal-800 text-xs font-bold uppercase tracking-wider">
              <Cpu className="w-4 h-4 text-teal-600" />
              <span>เครื่องมือทดลองประจำบทที่ 4: ฝึกฝนกฎการอนุมาน</span>
            </div>
            <InferenceTrainer />
          </div>
        );
      case 5:
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-teal-800 text-xs font-bold uppercase tracking-wider">
              <Cpu className="w-4 h-4 text-teal-600" />
              <span>เครื่องมือทดลองประจำบทที่ 5: สำรวจลำดับตัวบ่งปริมาณ</span>
            </div>
            <QuantifierExplorer />
          </div>
        );
      case 6:
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-teal-800 text-xs font-bold uppercase tracking-wider">
              <Cpu className="w-4 h-4 text-teal-600" />
              <span>เครื่องมือทดลองประจำบทที่ 6: ห้องทดลองอุปนัยเชิงคณิตศาสตร์</span>
            </div>
            <InductionLab />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-300">
      {/* Chapter Top Breadcrumb & Status */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
        <Link
          href="/chapters"
          className="text-xs font-semibold text-slate-500 hover:text-teal-700 flex items-center gap-1.5 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>กลับหน้ารวมบทเรียน</span>
        </Link>

        <div className="flex items-center gap-2 text-xs">
          <span className="text-slate-400 flex items-center gap-1 font-mono">
            <Clock className="w-3.5 h-3.5" />
            {chapter.readingTime}
          </span>
          {completed && (
            <span className="font-semibold text-teal-700 bg-teal-50 px-2.5 py-0.5 rounded-full border border-teal-200 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              บทเรียนนี้เรียนจบแล้ว
            </span>
          )}
        </div>
      </div>

      {/* Chapter Title Banner */}
      <header className="space-y-2">
        <div className="font-mono text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-2.5 py-1 rounded-md inline-block border border-teal-200">
          Chapter {chapter.id}
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight">
          {chapter.titleTh}
        </h1>
        <div className="font-mono text-sm md:text-base text-slate-500">
          {chapter.title}
        </div>
        <p className="text-sm md:text-base text-slate-600 max-w-3xl pt-1">
          {chapter.subtitle}
        </p>
      </header>

      {/* Objectives Box */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 md:p-6 shadow-xs space-y-3">
        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
          <ListChecks className="w-4 h-4 text-teal-600" />
          จุดประสงค์การเรียนรู้ (Learning Objectives)
        </h3>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs md:text-sm text-slate-700">
          {chapter.objectives.map((obj, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-500 shrink-0 mt-2" />
              <span className="leading-relaxed">{obj}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Main Chapter Content Sections */}
      <div className="space-y-10">
        {chapter.sections.map((sec) => (
          <section
            key={sec.id}
            id={sec.id}
            className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-xs space-y-4"
          >
            <div className="border-b border-slate-100 pb-3">
              <h2 className="text-xl md:text-2xl font-bold text-slate-900">
                {sec.headingTh}
              </h2>
              <div className="font-mono text-xs md:text-sm text-slate-400 mt-0.5">
                {sec.heading}
              </div>
            </div>

            {/* Markdown paragraphs */}
            <div className="prose prose-slate max-w-none text-sm md:text-base text-slate-700 leading-relaxed space-y-3">
              {sec.content.split('\n\n').map((para, idx) => (
                <div key={idx}>
                  {para.startsWith('* ') ? (
                    <ul className="list-disc pl-5 space-y-1">
                      {para.split('\n* ').map((item, i) => (
                        <li key={i}>{item.replace(/^\* /, '')}</li>
                      ))}
                    </ul>
                  ) : para.startsWith('1. ') ? (
                    <ol className="list-decimal pl-5 space-y-1">
                      {para.split(/\n\d+\.\s+/).map((item, i) => (
                        <li key={i}>{item.replace(/^\d+\.\s+/, '')}</li>
                      ))}
                    </ol>
                  ) : (
                    <p>{para}</p>
                  )}
                </div>
              ))}
            </div>

            {/* Optional LaTeX Snippets */}
            {sec.latexSnippets && sec.latexSnippets.length > 0 && (
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2 text-center my-3">
                {sec.latexSnippets.map((snip, idx) => (
                  <MathView key={idx} math={snip} block />
                ))}
              </div>
            )}

            {/* Optional Callout Box */}
            {sec.callout && (
              <AlertBox
                type={sec.callout.type}
                title={sec.callout.title}
                text={sec.callout.text}
              />
            )}

            {/* Optional Worked Proof Box */}
            {sec.workedProof && (
              <ProofStepBox
                title={sec.workedProof.title}
                premises={sec.workedProof.premises}
                prove={sec.workedProof.prove}
                steps={sec.workedProof.steps}
                notes={sec.workedProof.notes}
              />
            )}
          </section>
        ))}
      </div>

      {/* Embedded Interactive Tool Section */}
      <section className="pt-2">{renderInteractiveTool()}</section>

      {/* Chapter Summary Box */}
      <section className="bg-gradient-to-br from-teal-50/60 to-slate-50 rounded-2xl border border-teal-200 p-6 md:p-8 space-y-3">
        <h3 className="text-lg font-bold text-teal-950 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-teal-700" />
          สรุปบทเรียน (Chapter Summary)
        </h3>
        <ul className="space-y-2 text-xs md:text-sm text-teal-900">
          {chapter.summary.map((sum, i) => (
            <li key={i} className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
              <span className="leading-relaxed">{sum}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Chapter Quiz */}
      <section id="quiz">
        <QuizCard chapterId={chapter.id} questions={chapter.questions} />
      </section>

      {/* Previous & Next Navigation */}
      <nav className="flex items-center justify-between border-t border-slate-200 pt-6">
        {prevChapter ? (
          <Link
            href={`/chapters/${prevChapter.id}`}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 hover:border-teal-400 bg-white text-xs md:text-sm font-semibold text-slate-700 transition-all shadow-xs"
          >
            <ArrowLeft className="w-4 h-4 text-slate-400" />
            <div className="text-left">
              <div className="text-[10px] text-slate-400 uppercase">บทก่อนหน้า</div>
              <div>บทที่ {prevChapter.id}: {prevChapter.titleTh}</div>
            </div>
          </Link>
        ) : (
          <div />
        )}

        {nextChapter ? (
          <Link
            href={`/chapters/${nextChapter.id}`}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs md:text-sm font-semibold transition-all shadow-xs"
          >
            <div className="text-right">
              <div className="text-[10px] text-teal-200 uppercase">บทถัดไป</div>
              <div>บทที่ {nextChapter.id}: {nextChapter.titleTh}</div>
            </div>
            <ArrowRight className="w-4 h-4" />
          </Link>
        ) : (
          <Link
            href="/chapters"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs md:text-sm font-semibold transition-all shadow-xs"
          >
            <span>สำเร็จหลักสูตรทั้งหมด</span>
            <CheckCircle2 className="w-4 h-4" />
          </Link>
        )}
      </nav>
    </div>
  );
};
