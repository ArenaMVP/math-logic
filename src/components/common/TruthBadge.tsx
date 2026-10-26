'use client';

import React from 'react';

interface TruthBadgeProps {
  value: boolean;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

export const TruthBadge: React.FC<TruthBadgeProps> = ({
  value,
  size = 'md',
  showLabel = false,
}) => {
  const isTrue = Boolean(value);

  const sizeClasses = {
    sm: 'w-6 h-6 text-xs',
    md: 'w-8 h-8 text-sm font-semibold',
    lg: 'px-3 py-1 text-base font-bold',
  };

  const trueStyles =
    'bg-teal-50 text-teal-700 border border-teal-300 shadow-sm font-mono';
  const falseStyles =
    'bg-rose-50 text-rose-700 border border-rose-300 shadow-sm font-mono';

  return (
    <span
      className={`inline-flex items-center justify-center rounded-md transition-all ${
        sizeClasses[size]
      } ${isTrue ? trueStyles : falseStyles}`}
      title={isTrue ? 'True (จริง)' : 'False (เท็จ)'}
    >
      {isTrue ? 'T' : 'F'}
      {showLabel && (
        <span className="ml-1.5 text-xs font-normal">
          {isTrue ? 'จริง' : 'เท็จ'}
        </span>
      )}
    </span>
  );
};
