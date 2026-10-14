import React from 'react';
import { getArticleById, getArticlesByCategory } from '@/lib/content';
import ArticleDetail from '@/components/articles/ArticleDetail';

export default function AboutUsPage() {
  const article = getArticleById('1') || {
    id: '1',
    title: 'About Us',
    alias: 'about-us',
    slug: 'about-us',
    categoryId: '9',
    categoryTitle: 'IHMAAA',
    created: '',
    introtext: '',
    fulltext: '',
    contentHtml: '<p>The Institute of Hotel Management Ahmedabad Alumni Association (IHMAAA) was established to connect and support graduates across all batches worldwide.</p>',
  };

  const related = getArticlesByCategory('9').filter((a) => a.id !== '1');

  return (
    <ArticleDetail
      article={article}
      relatedArticles={related}
      parentPath="/ihmaaa/about-us"
      parentTitle="IHMAAA"
    />
  );
}
