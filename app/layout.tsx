import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Андрей Аликин — Fullstack Developer & Архитектор',
  description:
    'Разрабатываю продукты, которые масштабируются и приносят деньги. Открыт к новым проектам и коллаборациям.',
  keywords: ['fullstack', 'developer', 'next.js', 'react', 'typescript', 'portfolio'],
  authors: [{ name: 'Андрей Аликин' }],
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    title: 'Андрей Аликин — Fullstack Developer',
    description:
      'Разрабатываю продукты, которые масштабируются и приносят деньги.',
    siteName: 'Alikin.dev',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={inter.variable}>
      <body className="bg-white antialiased text-slate-800 font-sans">
        {children}
      </body>
    </html>
  );
}
