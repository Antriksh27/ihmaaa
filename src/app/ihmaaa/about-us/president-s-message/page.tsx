import React from 'react';
import { getArticleById, getArticlesByCategory } from '@/lib/content';
import ArticleDetail from '@/components/articles/ArticleDetail';

export default function PresidentsMessagePage() {
  const article = getArticleById('3') || {
    id: '3',
    title: "President's Message",
    alias: 'president-s-message',
    slug: 'president-s-message',
    categoryId: '9',
    categoryTitle: 'IHMAAA',
    created: '',
    introtext: '',
    fulltext: '',
    contentHtml: '<p>Message from the President of IHM Ahmedabad Alumni Association.</p>',
  };

  const related = getArticlesByCategory('9').filter((a) => a.id !== '3');

  return (
    <ArticleDetail
      article={article}
      relatedArticles={related}
      parentPath="/ihmaaa/about-us"
      parentTitle="About Us"
    />
  );
}
