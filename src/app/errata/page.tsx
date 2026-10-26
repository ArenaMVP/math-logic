'use client';

import React from 'react';
import Link from 'next/link';
import { PDF_CORRECTIONS_DATA } from '../../data/corrections';
import { MathView } from '../../components/common/MathView';
import {
  AlertCircle,
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  Cpu,
  FileCheck2,
  Info,
} from 'lucide-react';

export default function ErrataPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="border-b border-slate-200 pb-5 space-y-1.5">
        <div className="flex items-center gap-2 text-indigo-800 text-xs font-bold uppercase tracking-wider">
          <FileCheck2 className="w-4 h-4 text-indigo-600" />
          <span>Mathematical Audit & Errata Notes</span>
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900">
          บันทึกการตรวจสอบและแก้ไขข้อผิดพลาดในต้นฉบับ
        </h1>
        <p className="text-slate-500 text-sm max-w-3xl leading-relaxed">
          ตามมาตรฐานความถูกต้องทางวิชาการและข้อกำหนดในการพัฒนาเว็บไซต์ ทีมงานได้ตรวจสอบสูตร ตารางค่าความจริง และขั้นตอนการพิสูจน์ในไฟล์เอกสาร PDF <em>Mathematical Logic</em> อย่างละเอียด และได้บันทึกข้อผิดพลาดพร้อมคำอธิบายการแก้ไขที่ถูกต้องไว้ในหน้านี้
        </p>
      </div>

      {/* Audit Summary Notice */}
      <div className="bg-indigo-50/70 border border-indigo-200 rounded-2xl p-5 md:p-6 text-indigo-950 text-xs md:text-sm space-y-2">
        <h3 className="font-bold text-indigo-900 flex items-center gap-2 text-base">
          <CheckCircle2 className="w-5 h-5 text-indigo-600" />
          หลักการตรวจสอบทางคณิตศาสตร์ (Rigorous Verification Policy)
        </h3>
        <p className="leading-relaxed">
          ห้ามนำข้อมูลที่คำนวณผิดพลาดไปนำเสนอเสมือนว่าเป็นคำตอบที่ถูกต้อง ทุกสูตรและตัวอย่างได้รับการประมวลผลผ่าน Logic Engine ของระบบที่ทดสอบด้วย Automated Test Suite ทั้ง 100% เพื่อให้ผู้เรียนได้รับความรู้ที่ถูกต้อง แม่นยำ และพร้อมนำไปใช้ในการศึกษาต่อระดับมหาวิทยาลัย
        </p>
      </div>

      {/* Errata List Cards */}
      <div className="space-y-6">
        {PDF_CORRECTIONS_DATA.map((errata) => {
          const isFallacy = errata.issueType === 'mathematical_fallacy';
          const isTypo = errata.issueType === 'typographical_error';
          const isIncomplete = errata.issueType === 'incomplete_proof';

          return (
            <div
              key={errata.id}
              className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden space-y-4 p-6 md:p-7"
            >
              {/* Badge & Page Header */}
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700">
                    PDF หน้าที่ {errata.pageNumber}
                  </span>
                  <span
                    className={`text-xs font-semibold px-2.5 py-1 rounded-lg border ${
                      isFallacy
                        ? 'bg-rose-50 text-rose-700 border-rose-200'
                        : isTypo
                        ? 'bg-amber-50 text-amber-800 border-amber-200'
                        : isIncomplete
                        ? 'bg-indigo-50 text-indigo-800 border-indigo-200'
                        : 'bg-slate-50 text-slate-600 border-slate-200'
                    }`}
                  >
                    {isFallacy && 'ข้อผิดพลาดทางตรรกศาสตร์ (Mathematical Fallacy)'}
                    {isTypo && 'ข้อผิดพลาดทางการพิมพ์ (Typographical Error)'}
                    {isIncomplete && 'การพิสูจน์ไม่ครบถ้วน (Incomplete Proof)'}
                    {errata.issueType === 'translation_artifact' &&
                      'ร่องรอยการแปลอัตโนมัติ (Translation Artifact)'}
                  </span>
                </div>
              </div>

              {/* Title */}
              <h3 className="text-lg md:text-xl font-bold text-slate-900">
                {errata.titleTh}
              </h3>

              {/* Original snippet comparison */}
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 font-mono text-xs space-y-1">
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  ข้อความเดิมในเอกสารต้นฉบับ:
                </div>
                <div className="text-rose-800 break-words">{errata.originalText}</div>
              </div>

              {/* Detailed Explanation */}
              <div className="text-xs md:text-sm text-slate-700 leading-relaxed space-y-2 whitespace-pre-line">
                {errata.descriptionTh}
              </div>

              {/* Correct LaTeX representation */}
              {errata.correctionLatex && (
                <div className="bg-teal-50/50 p-4 rounded-xl border border-teal-200 space-y-1.5 text-center">
                  <div className="text-[11px] font-bold text-teal-800 uppercase tracking-wider">
                    รูปสูตรและบทสรุปที่ถูกต้องตามหลักคณิตศาสตร์:
                  </div>
                  <div className="font-mono text-sm md:text-base text-teal-950">
                    <MathView math={errata.correctionLatex} block />
                  </div>
                </div>
              )}

              {/* Action Note */}
              <div className="pt-2 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-500">
                <div className="flex items-center gap-1.5 text-teal-700 font-medium">
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-teal-600" />
                  <span>{errata.correctedTextTh}</span>
                </div>
                {isFallacy && (
                  <Link
                    href="/tools"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal-700 hover:text-teal-800 bg-teal-50 hover:bg-teal-100 px-3 py-1.5 rounded-lg border border-teal-200 transition-all self-start sm:self-auto"
                  >
                    <Cpu className="w-3.5 h-3.5" />
                    <span>ทดลองใน Truth Table Builder</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
