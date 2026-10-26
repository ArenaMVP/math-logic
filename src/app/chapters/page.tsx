'use client';

import React from 'react';
import Link from 'next/link';
import { useProgress } from '../../context/ProgressContext';
import { CHAPTERS_DATA } from '../../data/chapters';
import { ArrowRight, BookOpen, CheckCircle2, Clock, ListChecks } from 'lucide-react';

export default function ChaptersListPage() {
  const { progress, isChapterCompleted } = useProgress();

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Page Header */}
      <div className="border-b border-slate-200 pb-5 space-y-1.5">
        <div className="flex items-center gap-2 text-teal-800 text-xs font-bold uppercase tracking-wider">
          <BookOpen className="w-4 h-4 text-teal-600" />
          <span>Curriculum Overview</span>
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900">
          หน้ารวมบทเรียนทั้ง 6 บท
        </h1>
        <p className="text-slate-500 text-sm max-w-2xl">
          โครงสร้างบทเรียนตรรกศาสตร์ทางคณิตศาสตร์ เรียงลำดับจากแนวคิดพื้นฐานสู่การพิสูจน์ขั้นสูงตามเอกสารต้นฉบับ
        </p>
      </div>

      {/* Chapters Detailed List */}
      <div className="space-y-5">
        {CHAPTERS_DATA.map((ch) => {
          const completed = isChapterCompleted(ch.id);
          const score = progress.chapterScores[ch.id];

          return (
            <div
              key={ch.id}
              className={`rounded-2xl border transition-all p-6 md:p-7 ${
                completed
                  ? 'bg-teal-50/20 border-teal-200 shadow-xs'
                  : 'bg-white border-slate-200 hover:border-slate-300 shadow-xs'
              }`}
            >
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div className="space-y-3 flex-1">
                  {/* Tags */}
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-lg bg-teal-100/70 text-teal-900 border border-teal-200">
                      บทที่ {ch.id}
                    </span>
                    <span className="text-xs text-slate-500 flex items-center gap-1 bg-slate-100 px-2.5 py-1 rounded-lg">
                      <Clock className="w-3.5 h-3.5" />
                      {ch.readingTime}
                    </span>
                    {completed && (
                      <span className="text-xs font-bold text-teal-700 bg-teal-100/80 px-2.5 py-1 rounded-lg border border-teal-300 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        เรียนจบแล้ว {score !== undefined && `(คะแนนแบบฝึกหัด: ${score}/${ch.questions.length})`}
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <div>
                    <h2 className="text-xl md:text-2xl font-bold text-slate-900">
                      {ch.titleTh}
                    </h2>
                    <div className="text-xs md:text-sm font-mono text-slate-400 mt-0.5">
                      {ch.title}
                    </div>
                  </div>

                  <p className="text-sm text-slate-600 leading-relaxed max-w-3xl">
                    {ch.subtitle}
                  </p>

                  {/* Objectives preview */}
                  <div className="pt-2">
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1">
                      <ListChecks className="w-3.5 h-3.5 text-teal-600" />
                      จุดประสงค์การเรียนรู้หลัก:
                    </div>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-1.5 text-xs text-slate-600">
                      {ch.objectives.slice(0, 4).map((obj, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-teal-600 shrink-0 mt-0.5">•</span>
                          <span>{obj}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Action button */}
                <div className="md:self-center shrink-0 pt-2 md:pt-0">
                  <Link
                    href={`/chapters/${ch.id}`}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-semibold text-sm transition-all shadow-sm active:scale-95"
                  >
                    <span>{completed ? 'ทบทวนบทเรียน' : 'เริ่มเรียนบทนี้'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
