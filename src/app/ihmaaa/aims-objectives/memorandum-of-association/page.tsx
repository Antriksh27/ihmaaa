import React from 'react';
import { getArticleById, getArticlesByCategory } from '@/lib/content';
import ArticleDetail from '@/components/articles/ArticleDetail';

export default function MemorandumOfAssociationPage() {
  const article = getArticleById('9') || {
    id: '9',
    title: 'Memorandum of Association',
    alias: 'memorandum-of-association',
    slug: 'memorandum-of-association',
    categoryId: '9',
    categoryTitle: 'IHMAAA',
    created: '',
    introtext: '',
    fulltext: '',
    contentHtml: '<p>Official Memorandum of Association of the Institute of Hotel Management Ahmedabad Alumni Association.</p>',
  };

  const related = getArticlesByCategory('9').filter((a) => a.id !== '9');

  return (
    <ArticleDetail
      article={article}
      relatedArticles={related}
      parentPath="/ihmaaa/about-us"
      parentTitle="Aims & Objectives"
    />
  );
}
