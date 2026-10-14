import { MetadataRoute } from 'next';
import { articles } from '@/content/articles';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://ihmaaa.com';

  const staticRoutes = [
    '',
    '/ihmaaa/about-us',
    '/ihmaaa/about-us/chairmans-message',
    '/ihmaaa/about-us/president-s-message',
    '/ihmaaa/about-us/founder-principal-s-message',
    '/ihmaaa/about-us/office-bearers',
    '/ihmaaa/about-us/member-s-list',
    '/ihmaaa/aims-objectives/memorandum-of-association',
    '/ihmaaa/aims-objectives/article-of-association',
    '/ihmaaa/aims-objectives/downloads',
    '/curriculum-vitae',
    '/vacancies/hotels-restaurants',
    '/news-events/ihmaaa-news',
    '/social-views/photo-albums',
    '/social-views/user-page-blog',
    '/social-views/social-connect',
    '/sponsors',
    '/contact-us',
    '/search',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  const articleRoutes = articles.map((art) => {
    let route = `/news-events/ihmaaa-news/${art.slug}`;
    if (art.categoryId === '27') route = `/curriculum-vitae/${art.slug}`;
    else if (art.categoryId === '28') route = `/vacancies/hotels-restaurants/${art.slug}`;

    return {
      url: `${baseUrl}${route}`,
      lastModified: art.created ? new Date(art.created) : new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.6,
    };
  });

  return [...staticRoutes, ...articleRoutes];
}
