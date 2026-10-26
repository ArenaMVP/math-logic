'use client';

import React, { useEffect, useRef } from 'react';

declare global {
  interface Window {
    katex?: {
      render: (
        tex: string,
        element: HTMLElement,
        options?: { displayMode?: boolean; throwOnError?: boolean }
      ) => void;
    };
  }
}

interface MathViewProps {
  math: string;
  block?: boolean;
  className?: string;
}

export const MathView: React.FC<MathViewProps> = ({ math, block = false, className = '' }) => {
  const containerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    if (typeof window !== 'undefined' && window.katex) {
      try {
        window.katex.render(math, containerRef.current, {
          displayMode: block,
          throwOnError: false,
        });
        return;
      } catch (err) {
        console.warn('KaTeX render error:', err);
      }
    }

    // Fallback: format clean standard unicode logic symbols
    let formatted = math
      .replace(/\\neg/g, '¬')
      .replace(/\\land/g, '∧')
      .replace(/\\lor/g, '∨')
      .replace(/\\to/g, '→')
      .replace(/\\rightarrow/g, '→')
      .replace(/\\leftrightarrow/g, '↔')
      .replace(/\\iff/g, '↔')
      .replace(/\\equiv/g, '≡')
      .replace(/\\vdash/g, '⊢')
      .replace(/\\models/g, '⊨')
      .replace(/\\forall/g, '∀')
      .replace(/\\exists/g, '∃')
      .replace(/\\top/g, '⊤')
      .replace(/\\bot/g, '⊥')
      .replace(/\\mid/g, '|')
      .replace(/\\quad/g, '   ')
      .replace(/\\text\{([^}]+)\}/g, '$1')
      .replace(/\\mathbb\{([A-Z])\}/g, '$1');

    containerRef.current.textContent = formatted;
  }, [math, block]);

  return (
    <span
      ref={containerRef}
      className={`font-mono text-slate-800 ${
        block ? 'block my-2 overflow-x-auto text-center py-2' : 'inline-block px-1'
      } ${className}`}
    />
  );
};
