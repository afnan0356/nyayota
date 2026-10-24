import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://nyayota.vercel.app';
  const currentDate = new Date().toISOString();

  const routes = [
    '',
    '/bangladesh-laws',
    '/international-laws',
    '/legal-outcome-guide',
    '/ai-assistant',
    '/compare',
    '/search',
    '/concepts',
    '/about',
    '/research',
    '/roadmap',
    '/contact',
    '/accessibility',
    '/disclaimer',
    '/terms',
    '/privacy',
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: currentDate,
    changeFrequency: route === '' ? 'daily' : 'weekly',
    priority: route === '' ? 1.0 : route.startsWith('/bangladesh-laws') || route.startsWith('/international-laws') ? 0.9 : 0.7,
  }));
}
