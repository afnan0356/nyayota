import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Legal Research & Citation Dossier',
  description: 'Compile case briefs, organize statutory citations, format academic bibliographies in Bluebook and Standard styles, and export research notes privately.',
  openGraph: {
    title: 'Legal Research & Citation Dossier | Nyayota',
    description: 'Compile legal case briefs, organize citations in multiple academic styles, and build research dossiers privately.',
  },
};

export default function ResearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
