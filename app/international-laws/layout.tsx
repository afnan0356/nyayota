import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'International Treaties & Human Rights Conventions',
  description: 'Research foundational international conventions and human rights treaties including the UDHR, ICCPR, and Geneva Conventions with comparative commentary.',
  openGraph: {
    title: 'International Treaties & Human Rights Conventions | Nyayota',
    description: 'Research foundational international conventions and human rights treaties with comparative legal commentary.',
  },
};

export default function InternationalLawsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
