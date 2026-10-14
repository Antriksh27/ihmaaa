import React from 'react';
import { notFound, redirect } from 'next/navigation';
import { getArticleBySlug, getArticlesByCategory } from '@/lib/content';
import ArticleDetail from '@/components/articles/ArticleDetail';

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function AboutUsSubSlugPage({ params }: Props) {
  const { slug } = await params;

  // Handle known redirects to canonical subpages
  if (slug === 'about-us') {
    redirect('/ihmaaa/about-us');
  }
  if (slug === 'ihmaaa-members-list' || slug === 'member-s-list' || slug === 'members-list') {
    redirect('/ihmaaa/about-us/member-s-list');
  }
  if (slug === 'chairmans-message') {
    redirect('/ihmaaa/about-us/chairmans-message');
  }
  if (slug === 'president-s-message') {
    redirect('/ihmaaa/about-us/president-s-message');
  }
  if (slug === 'founder-principal-s-message' || slug === 'founders-message') {
    redirect('/ihmaaa/about-us/founder-principal-s-message');
  }
  if (slug === 'office-bearers') {
    redirect('/ihmaaa/about-us/office-bearers');
  }
  if (slug === 'memorandum-of-association') {
    redirect('/ihmaaa/aims-objectives/memorandum-of-association');
  }
  if (slug === 'article-of-association') {
    redirect('/ihmaaa/aims-objectives/article-of-association');
  }
  if (slug === 'downloads') {
    redirect('/ihmaaa/aims-objectives/downloads');
  }

  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const related = getArticlesByCategory('9').filter((a) => a.id !== article.id);

  return (
    <ArticleDetail
      article={article}
      relatedArticles={related}
      parentPath="/ihmaaa/about-us"
      parentTitle="IHMAAA"
    />
  );
}
