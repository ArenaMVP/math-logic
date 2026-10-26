import type { Metadata } from 'next';
import './globals.css';
import { ProgressProvider } from '../context/ProgressContext';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';

export const metadata: Metadata = {
  title: 'Mathematical Logic Studio — พื้นที่เรียนรู้ตรรกศาสตร์ทางคณิตศาสตร์แบบโต้ตอบ',
  description:
    'เว็บไซต์การเรียนรู้เรื่องตรรกศาสตร์ทางคณิตศาสตร์แบบโต้ตอบ ครอบคลุม 6 บทเรียน ตารางค่าความจริง สัจนิรันดร์ การอ้างเหตุผล ตัวบ่งปริมาณ และอุปนัยเชิงคณิตศาสตร์',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="th">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;500;600&family=Inter:wght@300;400;500;600;700;800&family=Prompt:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/katex@0.16.21/dist/katex.min.css"
          integrity="sha384-zh0WIMV2rRQDHheLfGQDNCdfZLE6SoYguCXCydbumquCKUarb41AssON9vndaKVX"
          crossOrigin="anonymous"
        />
      </head>
      <body className="min-h-screen flex flex-col antialiased bg-slate-50 text-slate-800 selection:bg-teal-500 selection:text-white">
        <ProgressProvider>
          <Navbar />
          <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10">
            {children}
          </main>
          <Footer />
        </ProgressProvider>
      </body>
    </html>
  );
}
