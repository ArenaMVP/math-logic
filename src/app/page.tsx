'use client';

import React from 'react';
import Link from 'next/link';
import { useProgress } from '../context/ProgressContext';
import { CHAPTERS_DATA } from '../data/chapters';
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Cpu,
  FileCheck2,
  HelpCircle,
  Play,
  RotateCcw,
  Sparkles,
} from 'lucide-react';

export default function HomePage() {
  const { progress, isChapterCompleted, getOverallProgressPercentage } = useProgress();
  const percentage = getOverallProgressPercentage();

  const lastChapter = CHAPTERS_DATA.find(
    (c) => c.id === progress.lastActiveChapter
  ) || CHAPTERS_DATA[0];

  return (
    <div className="space-y-12 md:space-y-16 animate-in fade-in duration-300">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-teal-900 via-slate-900 to-navy-950 text-white p-7 md:p-12 shadow-xl border border-teal-800/30">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-500/20 border border-teal-400/30 text-teal-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Logic Studio — พัฒนาจากเอกสาร Mathematical Logic</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
            เรียนรู้ตรรกศาสตร์คณิตศาสตร์ <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-teal-200 to-sky-300">
              ผ่านการอ่าน การทดลอง และลงมือทำ
            </span>
          </h1>

          <p className="text-slate-300 text-sm md:text-base leading-relaxed">
            เปลี่ยนเนื้อหาตรรกศาสตร์ทั้ง 6 บทเรียนจากเอกสารต้นฉบับ ให้กลายเป็นบทเรียนออนไลน์ที่มีระบบโต้ตอบจริง พร้อมเครื่องมือคำนวณตารางค่าความจริง ตรวจสอบสัจนิรันดร์ ตรวจสอบการอ้างเหตุผล และห้องทดลองการพิสูจน์อุปนัย
          </p>

          {/* Action Buttons */}
          <div className="pt-2 flex flex-wrap items-center gap-3">
            {progress.completedChapters.length > 0 ? (
              <Link
                href={`/chapters/${lastChapter.id}`}
                className="px-6 py-3 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-sm transition-all shadow-md active:scale-95 flex items-center gap-2"
              >
                <Play className="w-4 h-4 fill-slate-950" />
                <span>เรียนต่อ: บทที่ {lastChapter.id}</span>
              </Link>
            ) : (
              <Link
                href="/chapters/1"
                className="px-6 py-3 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-sm transition-all shadow-md active:scale-95 flex items-center gap-2"
              >
                <span>เริ่มเรียนบทที่ 1</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            )}

            <Link
              href="/tools"
              className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm transition-all border border-white/10 flex items-center gap-2"
            >
              <Cpu className="w-4 h-4 text-teal-300" />
              <span>เปิดเครื่องมือทดลอง (Studio)</span>
            </Link>

            <Link
              href="/errata"
              className="px-4 py-3 rounded-xl hover:bg-white/5 text-slate-300 hover:text-white text-xs md:text-sm transition-all flex items-center gap-1.5"
            >
              <FileCheck2 className="w-4 h-4 text-teal-400" />
              <span>รายงานข้อผิดพลาดในต้นฉบับ</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Progress & Quick Stats Card */}
      <section className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                ความคืบหน้าการเรียนรู้ของคุณ
              </span>
              <span className="text-[11px] font-mono text-slate-400">
                (บันทึกในเบราว์เซอร์เครื่องนี้)
              </span>
            </div>
            <div className="text-xl md:text-2xl font-bold text-slate-800 flex items-center gap-2">
              <span>เรียนจบแล้ว {progress.completedChapters.length} จาก 6 บท</span>
              <span className="text-teal-600 font-mono text-lg">({percentage}%)</span>
            </div>
          </div>

          <div className="w-full sm:w-48 space-y-1.5">
            <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden border border-slate-200">
              <div
                className="bg-teal-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${percentage}%` }}
              />
            </div>
            <div className="flex justify-between text-[11px] text-slate-400 font-mono">
              <span>0%</span>
              <span>100%</span>
            </div>
          </div>
        </div>
      </section>

      {/* Chapters Grid */}
      <section className="space-y-5">
        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">บทเรียนทั้ง 6 บท (Curriculum)</h2>
            <p className="text-sm text-slate-500">
              เนื้อหาตรงตามเอกสารต้นฉบับ Mathematical Logic ครบถ้วน พร้อมตัวอย่างและการพิสูจน์
            </p>
          </div>
          <Link
            href="/chapters"
            className="text-xs md:text-sm font-semibold text-teal-700 hover:text-teal-800 flex items-center gap-1"
          >
            <span>ดูทั้งหมด</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {CHAPTERS_DATA.map((ch) => {
            const completed = isChapterCompleted(ch.id);
            const score = progress.chapterScores[ch.id];

            return (
              <Link
                key={ch.id}
                href={`/chapters/${ch.id}`}
                className="group bg-white rounded-2xl border border-slate-200 hover:border-teal-400 p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 group-hover:bg-teal-50 group-hover:text-teal-800 transition-colors">
                      บทที่ {ch.id}
                    </span>
                    {completed ? (
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-teal-700 bg-teal-50 px-2.5 py-0.5 rounded-full border border-teal-200">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        จบแล้ว {score !== undefined && `(${score}/${ch.questions.length})`}
                      </span>
                    ) : (
                      <span className="text-xs text-slate-400">{ch.readingTime}</span>
                    )}
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-slate-800 group-hover:text-teal-700 transition-colors">
                      {ch.titleTh}
                    </h3>
                    <div className="text-xs font-mono text-slate-400 mt-0.5">
                      {ch.title}
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {ch.subtitle}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-teal-700">
                  <span>เข้าสู่บทเรียน</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Interactive Studio Tools Preview */}
      <section className="bg-gradient-to-br from-slate-100/70 to-teal-50/40 rounded-3xl border border-slate-200 p-6 md:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 text-teal-800 text-xs font-bold uppercase tracking-wider">
              <Cpu className="w-4 h-4 text-teal-600" />
              Interactive Logic Tools
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mt-0.5">
              เครื่องมือทดลองเชิงตรรกศาสตร์
            </h2>
            <p className="text-sm text-slate-500">
              เครื่องมือคำนวณที่ทำงานจริงด้วย Safe Parser ไม่ใช้ eval() ให้ผู้เรียนได้ทดลองสร้างสมมติฐาน
            </p>
          </div>
          <Link
            href="/tools"
            className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-semibold text-xs md:text-sm self-start sm:self-auto transition-all shadow-xs"
          >
            เข้าสู่ห้องทดลองเต็มรูปแบบ
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            {
              title: 'Truth Table Builder',
              titleTh: 'เครื่องมือสร้างตารางค่าความจริง',
              desc: 'คำนวณตาราง 2ⁿ แถว แยกนิพจน์ย่อย จำแนกสัจนิรันดร์/ข้อขัดแย้ง',
            },
            {
              title: 'Equivalence Checker',
              titleTh: 'เครื่องมือตรวจสอบสมมูล (A ≡ B)',
              desc: 'เปรียบเทียบสองประพจน์ พร้อมค้นหาตัวอย่างค้านทันทีหากไม่สมมูล',
            },
            {
              title: 'Argument Checker',
              titleTh: 'เครื่องมือตรวจสอบการอ้างเหตุผล',
              desc: 'ป้อนชุดข้อสมมติและข้อสรุป หา Countervaluation อย่างแม่นยำ',
            },
            {
              title: 'Inference Rules Trainer',
              titleTh: 'แบบฝึกการใช้กฎอนุมาน',
              desc: 'ฝึกฝน Modus Ponens, Tollens และจับผิด Formal Fallacies',
            },
            {
              title: 'Quantifier Matrix Explorer',
              titleTh: 'เครื่องมือสำรวจตัวบ่งปริมาณ',
              desc: 'เปรียบเทียบ ∀x∃y กับ ∃y∀x ผ่านเมทริกซ์ความจริง 2 มิติ',
            },
            {
              title: 'Induction Lab',
              titleTh: 'ห้องทดลองอุปนัยเชิงคณิตศาสตร์',
              desc: 'ปรับค่า n แบบสดๆ เพื่อดูการพิสูจน์ผลบวกและทฤษฎีการหารลงตัว',
            },
          ].map((tool, idx) => (
            <Link
              key={idx}
              href="/tools"
              className="bg-white p-4 rounded-xl border border-slate-200 hover:border-teal-400 hover:shadow-xs transition-all space-y-1.5"
            >
              <div className="text-xs font-mono font-bold text-teal-700">{tool.title}</div>
              <h4 className="font-bold text-slate-800 text-sm">{tool.titleTh}</h4>
              <p className="text-xs text-slate-500 leading-relaxed">{tool.desc}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
