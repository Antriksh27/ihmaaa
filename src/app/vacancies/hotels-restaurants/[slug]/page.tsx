import React from 'react';
import { notFound } from 'next/navigation';
import { getArticleBySlug, getArticlesByCategory } from '@/lib/content';
import ArticleDetail from '@/components/articles/ArticleDetail';

export function generateStaticParams() {
  const articles = getArticlesByCategory('28');
  return articles.map((a) => ({
    slug: a.slug,
  }));
}

export default function SingleVacancyPage({ params }: { params: { slug: string } }) {
  const article = getArticleBySlug(params.slug);
  if (!article) notFound();

  const related = getArticlesByCategory('28').filter((a) => a.id !== article.id);

  return (
    <ArticleDetail
      article={article}
      relatedArticles={related}
      parentPath="/vacancies/hotels-restaurants"
      parentTitle="Vacancies"
    />
  );
}
