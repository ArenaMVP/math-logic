import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { CHAPTERS_DATA } from '../../../data/chapters';
import { ChapterContentClient } from './ChapterContentClient';

export function generateStaticParams() {
  return CHAPTERS_DATA.map((ch) => ({
    id: ch.id.toString(),
  }));
}

export default async function ChapterPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const chapterId = parseInt(id, 10);
  const chapter = CHAPTERS_DATA.find((c) => c.id === chapterId);

  if (!chapter) {
    notFound();
  }

  const prevChapter = CHAPTERS_DATA.find((c) => c.id === chapterId - 1);
  const nextChapter = CHAPTERS_DATA.find((c) => c.id === chapterId + 1);

  return (
    <ChapterContentClient
      chapter={chapter}
      prevChapter={prevChapter}
      nextChapter={nextChapter}
    />
  );
}
