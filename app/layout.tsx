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
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                var theme = localStorage.getItem('nyayota_theme');
                if (theme === 'light') {
                  document.documentElement.classList.remove('dark');
                  document.documentElement.classList.add('light');
                } else if (theme === 'dark') {
                  document.documentElement.classList.add('dark');
                  document.documentElement.classList.remove('light');
                } else {
                  var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  if (prefersDark) {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                    document.documentElement.classList.add('light');
                  }
                }
              } catch (e) {
                document.documentElement.classList.add('dark');
              }
            `,
          }}
        />
      </head>
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
