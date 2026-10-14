'use client';

import React from 'react';
import Link from 'next/link';
import { Calendar, Tag, ArrowLeft, Share2, Award, ChevronRight } from 'lucide-react';
import { Article } from '@/types/content';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import { cleanTitle } from '@/lib/content';

interface ArticleDetailProps {
  article: Article;
  relatedArticles?: Article[];
  parentPath: string;
  parentTitle: string;
}

export default function ArticleDetail({
  article,
  relatedArticles = [],
  parentPath,
  parentTitle,
}: ArticleDetailProps) {
  const dateStr = article.created ? article.created.split(' ')[0] : '';

  const crumbs = [
    { label: cleanTitle(parentTitle), href: parentPath },
    { label: cleanTitle(article.title) },
  ];

  return (
    <>
      <Breadcrumbs items={crumbs} />

      <main className="section article-page">
        <div className="container article-container">
          {/* Back link */}
          <Link href={parentPath} className="back-link">
            <ArrowLeft size={16} />
            <span>Back to {parentTitle}</span>
          </Link>

          {/* Article Header */}
          <header className="article-header">
            <div className="header-meta-row">
              <span className="badge badge-gold">{cleanTitle(article.categoryTitle)}</span>
              {dateStr && (
                <span className="article-date">
                  <Calendar size={14} />
                  <span>{dateStr}</span>
                </span>
              )}
            </div>

            <h1 className="article-main-title">{cleanTitle(article.title)}</h1>
          </header>

          {/* Content Body */}
          <div className="glass-card article-content-card">
            <div 
              className="prose-content"
              dangerouslySetInnerHTML={{ __html: article.contentHtml }}
            />
          </div>

          {/* Related Articles in Category */}
          {relatedArticles.length > 0 && (
            <section className="related-section">
              <h3 className="related-heading">More from {cleanTitle(article.categoryTitle)}</h3>
              <div className="grid-3 related-grid">
                {relatedArticles.slice(0, 3).map((rel) => (
                  <Link 
                    key={rel.id} 
                    href={`${parentPath}/${rel.slug}`}
                    className="glass-card related-card"
                  >
                    <h4 className="related-title">{cleanTitle(rel.title)}</h4>
                    <p className="related-excerpt">
                      {rel.introtext.replace(/<[^>]+>/g, '').slice(0, 100)}...
                    </p>
                    <span className="related-link-text">
                      <span>Read article</span>
                      <ChevronRight size={14} />
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>

      
    </>
  );
}
