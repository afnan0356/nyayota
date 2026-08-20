import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Nyayota — Free Legal Information & Research Platform',
  description: 'An open legal research and knowledge platform making laws understandable, searchable, comparable, and accessible globally.',
  keywords: [
    'legal research',
    'bangladesh laws',
    'international law',
    'penal code 1860',
    'constitution of bangladesh',
    'crpc',
    'human rights',
    'udhr',
    'legal outcome guide',
    'ai legal explainer'
  ],
  authors: [{ name: 'Nyayota Legal Initiative' }],
  openGraph: {
    title: 'Nyayota — Legal Information & Research Platform',
    description: 'Understand laws easily with simple language summaries, multilingual translations, comparison tools, and educational outcome guides.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className="min-h-screen flex flex-col bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 antialiased selection:bg-amber-500 selection:text-white transition-colors duration-150">
        <ThemeProvider>
          <Header />
          <main className="flex-1 w-full flex flex-col">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
