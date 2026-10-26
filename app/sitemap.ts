import { MetadataRoute } from 'next';
import { LAWS_DATABASE } from '@/lib/legal-data';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://nyayota.vercel.app';
  const currentDate = new Date().toISOString();

  const staticRoutes: { path: string; priority: number; changeFrequency: 'daily' | 'weekly' | 'monthly' }[] = [
    { path: '', priority: 1.0, changeFrequency: 'daily' },
    { path: '/bangladesh-laws', priority: 0.9, changeFrequency: 'daily' },
    { path: '/international-laws', priority: 0.9, changeFrequency: 'weekly' },
    { path: '/legal-outcome-guide', priority: 0.85, changeFrequency: 'weekly' },
    { path: '/knowledge-paths', priority: 0.85, changeFrequency: 'weekly' },
    { path: '/concepts', priority: 0.85, changeFrequency: 'weekly' },
    { path: '/glossary', priority: 0.8, changeFrequency: 'weekly' },
    { path: '/categories', priority: 0.8, changeFrequency: 'weekly' },
    { path: '/compare', priority: 0.8, changeFrequency: 'weekly' },
    { path: '/research', priority: 0.8, changeFrequency: 'weekly' },
    { path: '/search', priority: 0.8, changeFrequency: 'daily' },
    { path: '/discover', priority: 0.75, changeFrequency: 'weekly' },
    { path: '/ai-assistant', priority: 0.75, changeFrequency: 'weekly' },
    { path: '/about', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/contact', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/roadmap', priority: 0.65, changeFrequency: 'monthly' },
    { path: '/accessibility', priority: 0.6, changeFrequency: 'monthly' },
    { path: '/disclaimer', priority: 0.6, changeFrequency: 'monthly' },
    { path: '/terms', priority: 0.6, changeFrequency: 'monthly' },
    { path: '/privacy', priority: 0.6, changeFrequency: 'monthly' },
  ];

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${baseUrl}${route.path}`,
    lastModified: currentDate,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const lawEntries: MetadataRoute.Sitemap = LAWS_DATABASE.map((law) => ({
    url: `${baseUrl}/law/${law.id}`,
    lastModified: currentDate,
    changeFrequency: 'weekly',
    priority: 0.85,
  }));

  return [...staticEntries, ...lawEntries];
}
