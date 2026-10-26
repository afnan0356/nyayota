import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Statute & Provision Comparison Tool',
  description: 'Compare statutory provisions side-by-side across domestic codes and international instruments to identify alignments and jurisprudential differences.',
  openGraph: {
    title: 'Statute & Provision Comparison Tool | Nyayota',
    description: 'Compare legal provisions side-by-side across jurisdictions and statutory acts.',
  },
};

export default function CompareLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
