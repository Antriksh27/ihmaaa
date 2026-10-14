import React from 'react';
import { getArticleById } from '@/lib/content';
import ArticleDetail from '@/components/articles/ArticleDetail';

export default function Reunion2016Page() {
  const article = getArticleById('144') || {
    id: '144',
    title: 'IHMAAA Reunion 2016',
    alias: 'ihmaaa-reunion-2016',
    slug: 'ihmaaa-reunion-2016',
    categoryId: '80',
    categoryTitle: 'News and Events',
    created: '2016-04-10',
    introtext: '',
    fulltext: '',
    contentHtml: '<p>Memories and proceedings from the memorable IHMAAA 2016 Alumni Reunion across the Old IHM Polytechnic Institute, IHM Campus Gandhinagar, and Crowne Plaza Ahmedabad.</p>',
  };

  return (
    <ArticleDetail
      article={article}
      parentPath="/social-views/photo-albums"
      parentTitle="Social Views"
    />
  );
}
