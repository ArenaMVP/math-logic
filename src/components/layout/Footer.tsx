'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { BookOpen, CheckCircle, RotateCcw, ShieldCheck } from 'lucide-react';
import { ResetModal } from '../common/ResetModal';
import { useProgress } from '../../context/ProgressContext';

export const Footer: React.FC = () => {
  const [resetModalOpen, setResetModalOpen] = useState(false);
  const { resetProgress } = useProgress();

  return (
    <>
      <footer className="mt-20 border-t border-slate-200 bg-white text-slate-600 text-xs md:text-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {/* Column 1: Brand & Purpose */}
            <div className="md:col-span-5 space-y-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-teal-600 text-white font-mono font-bold flex items-center justify-center text-sm">
                  ∧
                </div>
                <span className="font-bold text-slate-900 text-base">
                  Mathematical Logic Studio
                </span>
              </div>
              <p className="text-slate-500 leading-relaxed text-xs">
                พื้นที่เรียนรู้ตรรกศาสตร์ทางคณิตศาสตร์แบบโต้ตอบ ครอบคลุมทั้ง 6 บทเรียน
                พัฒนาขึ้นจากเอกสารการเรียนรู้ <em>Mathematical Logic</em> โดยมุ่งเน้นการอ่านแนวคิด
                การสร้างความเข้าใจเชิงลึก การทดลองด้วยเครื่องมือจริง และการฝึกฝนแบบฝึกหัด
              </p>
              <div className="flex items-center gap-2 text-xs text-slate-500 pt-1">
                <ShieldCheck className="w-4 h-4 text-teal-600" />
                <span>ความคืบหน้าถูกบันทึกในเบราว์เซอร์เครื่องนี้ (Local Storage)</span>
              </div>
            </div>

            {/* Column 2: Quick Links */}
            <div className="md:col-span-3 space-y-3">
              <h5 className="font-semibold text-slate-900 text-xs uppercase tracking-wider">
                เมนูลัดบทเรียน
              </h5>
              <ul className="space-y-2 text-xs">
                <li>
                  <Link href="/chapters/1" className="hover:text-teal-600 transition-colors">
                    บทที่ 1: บทนำสู่ตรรกศาสตร์
                  </Link>
                </li>
                <li>
                  <Link href="/chapters/2" className="hover:text-teal-600 transition-colors">
                    บทที่ 2: ตัวเชื่อม & ตารางค่าความจริง
                  </Link>
                </li>
                <li>
                  <Link href="/chapters/3" className="hover:text-teal-600 transition-colors">
                    บทที่ 3: สัจนิรันดร์ (Tautologies)
                  </Link>
                </li>
                <li>
                  <Link href="/chapters/4" className="hover:text-teal-600 transition-colors">
                    บทที่ 4: การอ้างเหตุผล (Arguments)
                  </Link>
                </li>
                <li>
                  <Link href="/chapters/5" className="hover:text-teal-600 transition-colors">
                    บทที่ 5: ประโยคเปิด & ตัวบ่งปริมาณ
                  </Link>
                </li>
                <li>
                  <Link href="/chapters/6" className="hover:text-teal-600 transition-colors">
                    บทที่ 6: การให้เหตุผลแบบอุปนัยและนิรนัย
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3: Academic References */}
            <div className="md:col-span-4 space-y-3">
              <h5 className="font-semibold text-slate-900 text-xs uppercase tracking-wider flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-teal-600" />
                เอกสารอ้างอิงทางวิชาการ (References)
              </h5>
              <ul className="space-y-2 text-[11px] text-slate-500 leading-relaxed font-mono">
                <li>• Epp, S. S. (2011). <em>Discrete Mathematics with Applications</em> (4th ed.).</li>
                <li>• Rosen, K. H. (2019). <em>Discrete Mathematics and Its Applications</em> (8th ed.).</li>
                <li>• Enderton, H. B. (2001). <em>A Mathematical Introduction to Logic</em> (2nd ed.).</li>
                <li>• Velleman, D. J. (2019). <em>How to Prove It: A Structured Approach</em> (3rd ed.).</li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
            <div>
              © 2026 Mathematical Logic Interactive Studio — สื่อการสอนตรรกศาสตร์ทางคณิตศาสตร์
            </div>
            <div className="flex items-center gap-4">
              <Link href="/errata" className="hover:text-teal-600 transition-colors">
                บันทึกการตรวจสอบต้นฉบับ
              </Link>
              <button
                onClick={() => setResetModalOpen(true)}
                className="text-slate-400 hover:text-rose-600 flex items-center gap-1 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" /> ล้างข้อมูลความคืบหน้า
              </button>
            </div>
          </div>
        </div>
      </footer>

      <ResetModal
        isOpen={resetModalOpen}
        onClose={() => setResetModalOpen(false)}
        onConfirm={resetProgress}
      />
    </>
  );
};
