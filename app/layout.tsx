import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://nyayota.vercel.app'),
  title: 'Nyayota: Free Legal Information and Research Platform',
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
    title: 'Nyayota: Legal Information and Research Platform',
    description: 'Understand laws easily with simple language summaries, multilingual translations, comparison tools, and educational outcome guides.',
    url: 'https://nyayota.vercel.app',
    siteName: 'Nyayota',
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
      <body className={`${inter.variable} font-sans min-h-screen flex flex-col bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 antialiased selection:bg-amber-500 selection:text-white transition-colors duration-150`}>
        {/* Skip to Main Content Link for WCAG 2.2 AA accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-amber-500 focus:text-zinc-950 focus:font-semibold focus:rounded-md focus:shadow-lg focus:outline-none"
        >
          Skip to main content
        </a>
        <ThemeProvider>
          <Header />
          <main id="main-content" className="flex-1 w-full flex flex-col">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
