'use client';

import React from 'react';
import { AlertTriangle, X } from 'lucide-react';

interface ResetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const ResetModal: React.FC<ResetModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-slate-200 overflow-hidden transform transition-all">
        {/* Header */}
        <div className="bg-rose-50 border-b border-rose-100 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5 text-rose-800">
            <AlertTriangle className="w-5 h-5 text-rose-600" />
            <h3 className="font-bold text-base">ยืนยันการล้างความคืบหน้า</h3>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 rounded-lg p-1 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4 text-sm text-slate-600 leading-relaxed">
          <p>
            คุณต้องการ <strong className="text-rose-600">ล้างประวัติการเรียนและคะแนนแบบทดสอบทั้งหมด</strong> ใช่หรือไม่?
          </p>
          <div className="rounded-xl bg-slate-50 border border-slate-200 p-3.5 text-xs text-slate-500 space-y-1">
            <p className="font-semibold text-slate-700">คำชี้แจงการจัดเก็บข้อมูล:</p>
            <p>
              ข้อมูลความคืบหน้าของคุณถูกบันทึกอยู่ในหน่วยความจำเบราว์เซอร์ของเครื่องนี้ (Local Storage) เท่านั้น และไม่ได้ซิงก์ขึ้นเซิร์ฟเวอร์ภายนอก เมื่อล้างข้อมูลแล้วจะไม่สามารถกู้คืนได้
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="bg-slate-50 px-6 py-3.5 border-t border-slate-100 flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-800 hover:bg-slate-200/60 rounded-xl transition-all"
          >
            ยกเลิก
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="px-4 py-2 text-sm font-semibold text-white bg-rose-600 hover:bg-rose-700 active:scale-95 rounded-xl shadow-sm transition-all"
          >
            ยืนยันการล้างข้อมูล
          </button>
        </div>
      </div>
    </div>
  );
};
