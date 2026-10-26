import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Bangladesh Laws & Statutes Archive',
  description: 'Explore authentic, indexed statutory texts of Bangladesh including the Penal Code 1860, Constitution, CrPC 1898, and CPC 1908 with section-level breakdowns.',
  openGraph: {
    title: 'Bangladesh Laws & Statutes Archive | Nyayota',
    description: 'Explore authentic, indexed statutory texts of Bangladesh with section-level breakdowns and bilingual translations.',
  },
};

export default function BangladeshLawsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
