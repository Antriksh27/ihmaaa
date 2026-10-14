import React from 'react';
import { getArticleById, getArticlesByCategory } from '@/lib/content';
import ArticleDetail from '@/components/articles/ArticleDetail';

export default function ChairmansMessagePage() {
  const article = getArticleById('2') || {
    id: '2',
    title: "Chairman's Message",
    alias: 'chairmans-message',
    slug: 'chairmans-message',
    categoryId: '9',
    categoryTitle: 'IHMAAA',
    created: '',
    introtext: '',
    fulltext: '',
    contentHtml: '<p>Message from the Chairman of IHM Ahmedabad Alumni Association.</p>',
  };

  const related = getArticlesByCategory('9').filter((a) => a.id !== '2');

  return (
    <ArticleDetail
      article={article}
      relatedArticles={related}
      parentPath="/ihmaaa/about-us"
      parentTitle="About Us"
    />
  );
}
