import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/'],
      },
    ],
    sitemap: 'https://nyayota.vercel.app/sitemap.xml',
    host: 'https://nyayota.vercel.app',
  };
}
