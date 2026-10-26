'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { UserProgressState } from '../types/logic';

const STORAGE_KEY = 'math_logic_studio_progress_v1';

const defaultState: UserProgressState = {
  completedChapters: [],
  chapterScores: {},
  lastActiveChapter: 1,
  completedQuizzes: {},
  completedTools: [],
  updatedAt: new Date().toISOString(),
};

interface ProgressContextType {
  progress: UserProgressState;
  markChapterComplete: (chapterId: number) => void;
  recordQuizScore: (chapterId: number, score: number) => void;
  setLastActiveChapter: (chapterId: number) => void;
  markToolUsed: (toolId: string) => void;
  resetProgress: () => void;
  isChapterCompleted: (chapterId: number) => boolean;
  getOverallProgressPercentage: () => number;
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export const ProgressProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [progress, setProgress] = useState<UserProgressState>(defaultState);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setProgress(JSON.parse(saved));
      }
    } catch (e) {
      console.warn('Failed to load progress from localStorage', e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
      } catch (e) {
        console.warn('Failed to save progress to localStorage', e);
      }
    }
  }, [progress, isLoaded]);

  const markChapterComplete = (chapterId: number) => {
    setProgress((prev) => {
      if (prev.completedChapters.includes(chapterId)) return prev;
      return {
        ...prev,
        completedChapters: [...prev.completedChapters, chapterId],
        updatedAt: new Date().toISOString(),
      };
    });
  };

  const recordQuizScore = (chapterId: number, score: number) => {
    setProgress((prev) => ({
      ...prev,
      chapterScores: { ...prev.chapterScores, [chapterId]: score },
      completedQuizzes: { ...prev.completedQuizzes, [chapterId]: true },
      updatedAt: new Date().toISOString(),
    }));
  };

  const setLastActiveChapter = (chapterId: number) => {
    setProgress((prev) => ({
      ...prev,
      lastActiveChapter: chapterId,
      updatedAt: new Date().toISOString(),
    }));
  };

  const markToolUsed = (toolId: string) => {
    setProgress((prev) => {
      if (prev.completedTools.includes(toolId)) return prev;
      return {
        ...prev,
        completedTools: [...prev.completedTools, toolId],
        updatedAt: new Date().toISOString(),
      };
    });
  };

  const resetProgress = () => {
    setProgress({
      ...defaultState,
      updatedAt: new Date().toISOString(),
    });
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.warn('Failed to remove progress from localStorage', e);
    }
  };

  const isChapterCompleted = (chapterId: number) => {
    return progress.completedChapters.includes(chapterId);
  };

  const getOverallProgressPercentage = () => {
    const totalItems = 6; // 6 chapters
    const completed = progress.completedChapters.length;
    return Math.round((completed / totalItems) * 100);
  };

  return (
    <ProgressContext.Provider
      value={{
        progress,
        markChapterComplete,
        recordQuizScore,
        setLastActiveChapter,
        markToolUsed,
        resetProgress,
        isChapterCompleted,
        getOverallProgressPercentage,
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
};
