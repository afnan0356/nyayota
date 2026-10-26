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
  title: {
    default: 'Nyayota: Free Legal Information and Research Platform',
    template: '%s | Nyayota',
  },
  description: 'An open legal research and knowledge platform making laws understandable, searchable, comparable, and accessible globally.',
  keywords: [
    'legal research',
    'bangladesh laws',
    'international law',
    'penal code 1860',
    'constitution of bangladesh',
    'crpc 1898',
    'code of civil procedure 1908',
    'human rights',
    'udhr',
    'legal outcome guide',
    'ai legal explainer',
    'statute comparison'
  ],
  authors: [{ name: 'Nyayota Legal Initiative' }],
  creator: 'Nyayota Legal Initiative',
  publisher: 'Nyayota Legal Initiative',
  alternates: {
    canonical: 'https://nyayota.vercel.app',
  },
  openGraph: {
    title: 'Nyayota: Free Legal Information and Research Platform',
    description: 'Understand laws easily with simple language summaries, bilingual comparative analysis, structured outcome guides, and legal citations.',
    url: 'https://nyayota.vercel.app',
    siteName: 'Nyayota',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nyayota: Free Legal Information and Research Platform',
    description: 'Understand statutory provisions with plain language breakdowns, cross-statute comparisons, and procedural outcome guides.',
  },
  icons: {
    icon: '/icon.svg',
  },
};

const structuredSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': 'https://nyayota.vercel.app/#website',
      url: 'https://nyayota.vercel.app',
      name: 'Nyayota',
      description: 'An open legal research and knowledge platform making laws understandable, searchable, comparable, and accessible globally.',
      inLanguage: ['en', 'bn'],
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: 'https://nyayota.vercel.app/search?q={search_term_string}',
        },
        'query-input': 'required name=search_term_string',
      },
    },
    {
      '@type': 'WebApplication',
      '@id': 'https://nyayota.vercel.app/#webapp',
      name: 'Nyayota',
      applicationCategory: 'EducationalApplication',
      operatingSystem: 'All',
      url: 'https://nyayota.vercel.app',
      description: 'Public legal research platform featuring bilingual statutory analysis, legal outcome guides, comparative law grids, and citation tools.',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
    },
    {
      '@type': 'Organization',
      '@id': 'https://nyayota.vercel.app/#organization',
      name: 'Nyayota Legal Initiative',
      url: 'https://nyayota.vercel.app',
      email: 'nyayota.contact@gmail.com',
      sameAs: ['https://nyayota.vercel.app/about'],
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredSchema) }}
        />
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
