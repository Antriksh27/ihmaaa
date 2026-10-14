import React from 'react';
import { getArticlesByCategory } from '@/lib/content';
import CategoryBlog from '@/components/articles/CategoryBlog';

export default function NewsEventsPage() {
  const articles = getArticlesByCategory('80');

  return (
    <CategoryBlog
      title="IHMAAA News & Events"
      description="Official announcements, alumni award honors, memorial tributes, campus celebrations, and milestone achievements of IHM Ahmedabad and its alumni association."
      articles={articles}
      basePath="/news-events/ihmaaa-news"
    />
  );
}
