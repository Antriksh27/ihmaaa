import React from 'react';
import { getArticleById, getArticlesByCategory } from '@/lib/content';
import ArticleDetail from '@/components/articles/ArticleDetail';

export default function FounderPrincipalsMessagePage() {
  const article = getArticleById('4') || {
    id: '4',
    title: "Founder Principal's Message - A Journey From FCI To IHM",
    alias: 'founder-principal-s-message',
    slug: 'founder-principal-s-message',
    categoryId: '24',
    categoryTitle: 'A Journey',
    created: '',
    introtext: '',
    fulltext: '',
    contentHtml: '<p>Reminiscences and founding journey of Food Craft Institute (FCI) to Institute of Hotel Management (IHM) Ahmedabad by Founder Principal Mr. N.M. Rafique.</p>',
  };

  const related = getArticlesByCategory('9');

  return (
    <ArticleDetail
      article={article}
      relatedArticles={related}
      parentPath="/ihmaaa/about-us"
      parentTitle="About Us"
    />
  );
}
