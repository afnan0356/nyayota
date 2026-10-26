import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Curated Legal Knowledge Paths',
  description: 'Step-by-step educational legal curriculums for students, researchers, and advocates to master constitutional, criminal, and civil procedure systematically.',
  openGraph: {
    title: 'Curated Legal Knowledge Paths | Nyayota',
    description: 'Structured educational legal pathways with milestone trackers, key takeaways, and self-check comprehension questions.',
  },
};

export default function KnowledgePathsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
