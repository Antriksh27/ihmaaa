import React from 'react';
import { getArticleById, getArticlesByCategory } from '@/lib/content';
import ArticleDetail from '@/components/articles/ArticleDetail';

export default function ArticleOfAssociationPage() {
  const article = getArticleById('10') || {
    id: '10',
    title: 'Article of Association',
    alias: 'article-of-association',
    slug: 'article-of-association',
    categoryId: '9',
    categoryTitle: 'IHMAAA',
    created: '',
    introtext: '',
    fulltext: '',
    contentHtml: '<p>Rules and regulations defining the operations and governance of IHMAAA.</p>',
  };

  const related = getArticlesByCategory('9').filter((a) => a.id !== '10');

  return (
    <ArticleDetail
      article={article}
      relatedArticles={related}
      parentPath="/ihmaaa/about-us"
      parentTitle="Aims & Objectives"
    />
  );
}
