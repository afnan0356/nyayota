import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About the Nyayota Legal Initiative',
  description: 'Learn about the mission, editorial standards, research methodology, and non-profit public interest values behind the Nyayota platform.',
  openGraph: {
    title: 'About the Nyayota Legal Initiative | Nyayota',
    description: 'Our mission to demystify statutes, empower civic research, and make legal knowledge accessible.',
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
