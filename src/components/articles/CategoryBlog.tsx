'use client';

import React from 'react';
import Link from 'next/link';
import { Calendar, ArrowRight, FolderOpen } from 'lucide-react';
import { Article } from '@/types/content';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import { cleanTitle } from '@/lib/content';

interface CategoryBlogProps {
  title: string;
  description: string;
  articles: Article[];
  basePath: string;
}

export default function CategoryBlog({
  title,
  description,
  articles,
  basePath,
}: CategoryBlogProps) {
  const crumbs = [{ label: cleanTitle(title) }];

  return (
    <>
      <Breadcrumbs items={crumbs} />

      <main className="section category-blog-page">
        <div className="container">
          <div className="section-title-wrap">
            <div className="section-badge">
              <FolderOpen size={14} />
              <span>Category Archive</span>
            </div>
            <h1 className="section-title">{cleanTitle(title)}</h1>
            <p className="section-desc">{description}</p>
          </div>

          {articles.length === 0 ? (
            <div className="glass-card empty-state">
              <p>No published articles found in this category archive.</p>
            </div>
          ) : (
            <div className="grid-3 articles-grid">
              {articles.map((item) => {
                const dateStr = item.created ? item.created.split(' ')[0] : '';

                return (
                  <article key={item.id} className="glass-card article-summary-card">
                    <div className="summary-header">
                      <span className="badge badge-gold">{cleanTitle(item.categoryTitle)}</span>
                      {dateStr && (
                        <span className="summary-date">
                          <Calendar size={13} />
                          <span>{dateStr}</span>
                        </span>
                      )}
                    </div>

                    <h2 className="summary-title">
                      <Link href={`${basePath}/${item.slug}`}>
                        {cleanTitle(item.title)}
                      </Link>
                    </h2>

                    <p className="summary-excerpt">
                      {item.introtext.replace(/<[^>]+>/g, '').slice(0, 160)}...
                    </p>

                    <div className="summary-footer">
                      <Link href={`${basePath}/${item.slug}`} className="btn-read-story">
                        <span>Read full article</span>
                        <ArrowRight size={14} />
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </main>

      
    </>
  );
}
