'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useProgress } from '../../context/ProgressContext';
import {
  BookOpen,
  CheckCircle,
  Cpu,
  FileCheck2,
  HelpCircle,
  Menu,
  RotateCcw,
  Sparkles,
  X,
} from 'lucide-react';
import { ResetModal } from '../common/ResetModal';

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const { getOverallProgressPercentage, resetProgress } = useProgress();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);

  const percentage = getOverallProgressPercentage();

  const navLinks = [
    { href: '/', label: 'หน้าแรก', icon: Sparkles },
    { href: '/chapters', label: 'บทเรียน 6 บท', icon: BookOpen },
    { href: '/tools', label: 'เครื่องมือทดลอง', icon: Cpu },
    { href: '/glossary', label: 'สัญลักษณ์ & คำศัพท์', icon: HelpCircle },
    { href: '/errata', label: 'บันทึกการแก้ไขต้นฉบับ', icon: FileCheck2 },
  ];

  return (
    <>
      <nav className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Brand Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-teal-600 group-hover:bg-teal-700 flex items-center justify-center text-white shadow-sm transition-all transform group-hover:scale-105">
                <span className="font-mono text-xl font-black">∧</span>
              </div>
              <div>
                <div className="font-bold text-slate-900 text-base leading-tight tracking-tight">
                  Mathematical Logic
                </div>
                <div className="text-[11px] font-medium text-teal-600 leading-none">
                  Interactive Studio
                </div>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((item) => {
                const Icon = item.icon;
                const isActive =
                  item.href === '/'
                    ? pathname === '/'
                    : pathname?.startsWith(item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
                      isActive
                        ? 'bg-teal-50 text-teal-800 border border-teal-200'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>

            {/* Progress Pill & Reset */}
            <div className="hidden sm:flex items-center gap-3">
              <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-200 text-xs">
                <CheckCircle className="w-3.5 h-3.5 text-teal-600" />
                <span className="text-slate-500 font-medium">ความคืบหน้า:</span>
                <span className="font-mono font-bold text-teal-800">{percentage}%</span>
              </div>
              <button
                onClick={() => setShowResetModal(true)}
                className="text-xs text-slate-400 hover:text-slate-600 p-1.5 hover:bg-slate-100 rounded-lg transition-colors"
                title="ล้างความคืบหน้า"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="flex md:hidden items-center gap-2">
              <div className="text-xs font-mono font-bold text-teal-700 bg-teal-50 px-2.5 py-1 rounded-full border border-teal-200">
                {percentage}%
              </div>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-5 space-y-2 animate-in slide-in-from-top-2 duration-200">
            {navLinks.map((item) => {
              const Icon = item.icon;
              const isActive =
                item.href === '/'
                  ? pathname === '/'
                  : pathname?.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-3.5 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2.5 transition-all ${
                    isActive
                      ? 'bg-teal-50 text-teal-800 border border-teal-200'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <Icon className="w-4 h-4 text-teal-600" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 px-2">
              <span>ความคืบหน้ารวม: {percentage}%</span>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setShowResetModal(true);
                }}
                className="text-rose-600 hover:text-rose-700 flex items-center gap-1 font-semibold"
              >
                <RotateCcw className="w-3.5 h-3.5" /> ล้างข้อมูล
              </button>
            </div>
          </div>
        )}
      </nav>

      <ResetModal
        isOpen={showResetModal}
        onClose={() => setShowResetModal(false)}
        onConfirm={resetProgress}
      />
    </>
  );
};
