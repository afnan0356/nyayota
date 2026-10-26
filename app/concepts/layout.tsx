import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Legal Concepts & Doctrine Encyclopedia',
  description: 'Plain-language explanations of essential legal concepts, Latin maxims, constitutional doctrines, and procedural principles.',
  openGraph: {
    title: 'Legal Concepts & Doctrine Encyclopedia | Nyayota',
    description: 'Explore foundational legal doctrines, constitutional rights, and procedural terms explained simply.',
  },
};

export default function ConceptsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
