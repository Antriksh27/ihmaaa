import React from 'react';
import { getArticleById, getArticlesByCategory } from '@/lib/content';
import ArticleDetail from '@/components/articles/ArticleDetail';

export default function MembersListPage() {
  const article = getArticleById('8') || {
    id: '8',
    title: "IHMAAA Member's List",
    alias: 'member-s-list',
    slug: 'member-s-list',
    categoryId: '9',
    categoryTitle: 'IHMAAA',
    created: '',
    introtext: '',
    fulltext: '',
    contentHtml: '<p>Complete verified roster of Institute of Hotel Management Ahmedabad Alumni Association members across graduating batches.</p>',
  };

  const related = getArticlesByCategory('9').filter((a) => a.id !== '8');

  return (
    <ArticleDetail
      article={article}
      relatedArticles={related}
      parentPath="/ihmaaa/about-us"
      parentTitle="About Us"
    />
  );
}
