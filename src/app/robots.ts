import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/administrator', '/api/'],
    },
    sitemap: 'https://ihmaaa.com/sitemap.xml',
  };
}
