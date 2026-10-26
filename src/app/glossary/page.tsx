'use client';

import React, { useState } from 'react';
import { GLOSSARY_DATA, GlossaryItem } from '../../data/glossary';
import { MathView } from '../../components/common/MathView';
import { BookOpen, HelpCircle, Search } from 'lucide-react';

export default function GlossaryPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const filtered = GLOSSARY_DATA.filter((item) => {
    const matchesSearch =
      item.nameEn.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.nameTh.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.symbol.includes(searchTerm) ||
      item.meaning.includes(searchTerm);

    const matchesCategory =
      activeCategory === 'all' || item.category === activeCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="border-b border-slate-200 pb-5 space-y-1.5">
        <div className="flex items-center gap-2 text-teal-800 text-xs font-bold uppercase tracking-wider">
          <BookOpen className="w-4 h-4 text-teal-600" />
          <span>Notation & Definitions Dictionary</span>
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900">
          อภิธานศัพท์และสัญลักษณ์ตรรกศาสตร์
        </h1>
        <p className="text-slate-500 text-sm max-w-2xl">
          รวบรวมสัญลักษณ์มาตรฐานสากล คำอ่าน ความหมาย และตัวอย่างการใช้งาน เพื่อใช้อ้างอิงตลอดการเรียนรู้
        </p>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="ค้นหาสัญลักษณ์หรือคำศัพท์..."
            className="w-full pl-9 pr-4 py-2 text-sm rounded-xl border border-slate-200 focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100 bg-slate-50"
          />
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5 self-start sm:self-auto text-xs">
          {[
            { id: 'all', label: 'ทั้งหมด' },
            { id: 'connective', label: 'ตัวเชื่อม (Connectives)' },
            { id: 'quantifier', label: 'ตัวบ่งปริมาณ (Quantifiers)' },
            { id: 'meta', label: 'เมทาทฤษฎี (⊢, ⊨, ≡)' },
            { id: 'set', label: 'สัญลักษณ์อื่น ๆ' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                activeCategory === cat.id
                  ? 'bg-teal-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Glossary Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs md:text-sm">
            <thead className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200 text-xs uppercase tracking-wider">
              <tr>
                <th className="py-3.5 px-4 w-28 text-center">สัญลักษณ์</th>
                <th className="py-3.5 px-5 w-52">ชื่อภาษาอังกฤษ / ภาษาไทย</th>
                <th className="py-3.5 px-5">ความหมายและบทบาท</th>
                <th className="py-3.5 px-5 w-60">ตัวอย่างการใช้งาน</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3.5 px-4 text-center font-mono font-bold text-base md:text-lg text-teal-800 bg-teal-50/20">
                    <MathView math={item.latex} />
                  </td>
                  <td className="py-3.5 px-5">
                    <div className="font-bold text-slate-900">{item.nameEn}</div>
                    <div className="text-xs text-slate-500 mt-0.5">{item.nameTh}</div>
                  </td>
                  <td className="py-3.5 px-5 text-slate-700 leading-relaxed">
                    {item.meaning}
                  </td>
                  <td className="py-3.5 px-5 font-mono text-xs text-slate-600 bg-slate-50/40">
                    <MathView math={item.example} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filtered.length === 0 && (
          <div className="p-8 text-center text-slate-400 text-sm">
            ไม่พบคำศัพท์หรือสัญลักษณ์ที่ตรงกับคำค้นหา
          </div>
        )}
      </div>
    </div>
  );
}
