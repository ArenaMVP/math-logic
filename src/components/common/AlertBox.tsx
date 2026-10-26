'use client';

import React from 'react';
import { AlertCircle, AlertTriangle, CheckCircle, Info } from 'lucide-react';

interface AlertBoxProps {
  type?: 'info' | 'tip' | 'warning' | 'correction';
  title?: string;
  children?: React.ReactNode;
  text?: string;
}

export const AlertBox: React.FC<AlertBoxProps> = ({
  type = 'info',
  title,
  children,
  text,
}) => {
  const configs = {
    info: {
      border: 'border-sky-200',
      bg: 'bg-sky-50/70',
      text: 'text-sky-900',
      iconColor: 'text-sky-600',
      Icon: Info,
      defaultTitle: 'ข้อสังเกต (Note)',
    },
    tip: {
      border: 'border-teal-200',
      bg: 'bg-teal-50/70',
      text: 'text-teal-900',
      iconColor: 'text-teal-600',
      Icon: CheckCircle,
      defaultTitle: 'เทคนิคการจำ (Tip)',
    },
    warning: {
      border: 'border-amber-200',
      bg: 'bg-amber-50/70',
      text: 'text-amber-900',
      iconColor: 'text-amber-600',
      Icon: AlertTriangle,
      defaultTitle: 'ข้อควรระวัง (Caution)',
    },
    correction: {
      border: 'border-indigo-300',
      bg: 'bg-indigo-50/80',
      text: 'text-indigo-950',
      iconColor: 'text-indigo-600',
      Icon: AlertCircle,
      defaultTitle: 'การตรวจสอบและแก้ไขต้นฉบับ (Mathematical Audit)',
    },
  };

  const current = configs[type];
  const Icon = current.Icon;

  return (
    <div
      className={`my-5 rounded-xl border ${current.border} ${current.bg} p-4.5 text-sm transition-all shadow-sm`}
    >
      <div className="flex items-start gap-3">
        <Icon className={`w-5 h-5 shrink-0 mt-0.5 ${current.iconColor}`} />
        <div className="space-y-1">
          <h5 className={`font-semibold ${current.text}`}>
            {title || current.defaultTitle}
          </h5>
          <div className={`${current.text} leading-relaxed text-xs md:text-sm opacity-95`}>
            {text && <p>{text}</p>}
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};
