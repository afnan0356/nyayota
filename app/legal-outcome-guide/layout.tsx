import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Legal Outcome Scenarios & Procedural Guides',
  description: 'Practical outcome guides for civil injunctions, cyber harassment, cheque dishonor, tenancy disputes, and criminal defense with procedural roadmaps.',
  openGraph: {
    title: 'Legal Outcome Scenarios & Procedural Guides | Nyayota',
    description: 'Practical legal outcome guides with step-by-step procedural roadmaps, statutory authorities, and evidence checklists.',
  },
};

export default function LegalOutcomeGuideLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
