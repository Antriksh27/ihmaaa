import React from 'react';
import { getArticlesByCategory } from '@/lib/content';
import CategoryBlog from '@/components/articles/CategoryBlog';

export default function VacanciesPage() {
  const articles = getArticlesByCategory('28');

  return (
    <CategoryBlog
      title="Hotels & Restaurants Vacancies"
      description="Exclusive hospitality career openings, culinary executive requirements, and corporate hotel management vacancies shared within our alumni network."
      articles={articles}
      basePath="/vacancies/hotels-restaurants"
    />
  );
}
