'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, FileText, Calendar, ArrowRight, CornerDownLeft } from 'lucide-react';
import { articles } from '@/content/articles';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import { cleanTitle } from '@/lib/content';

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState(articles);

  useEffect(() => {
    if (!query.trim()) {
      setResults(articles);
      return;
    }
    const q = query.toLowerCase();
    const filtered = articles.filter(
      (a) =>
        a.title.toLowerCase().includes(q) ||
        cleanTitle(a.title).toLowerCase().includes(q) ||
        a.categoryTitle.toLowerCase().includes(q) ||
        a.introtext.toLowerCase().includes(q) ||
        (a.metadesc && a.metadesc.toLowerCase().includes(q))
    );
    setResults(filtered);
  }, [query]);

  const crumbs = [{ label: 'Search' }];

  return (
    <>
      <Breadcrumbs items={crumbs} />

      <main className="section search-page">
        <div className="container">
          <div className="section-title-wrap">
            <h1 className="section-title">Search Archive</h1>
            <p className="section-desc">Search through articles, vacancy notices, executive updates, and sponsor listings.</p>
          </div>

          <div className="glass-card search-box-wrap">
            <div className="search-bar">
              <Search size={22} className="gold-text" />
              <input
                type="text"
                className="search-field"
                placeholder="Search by keywords, alumni names, batches, or sponsor brands..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                autoFocus
              />
            </div>
          </div>

          <div className="results-header">
            <span>Showing {results.length} record{results.length !== 1 ? 's' : ''}</span>
          </div>

          <div className="grid-3 search-grid">
            {results.map((art) => {
              let linkHref = `/news-events/ihmaaa-news/${art.slug}`;
              if (art.categoryId === '9') linkHref = `/ihmaaa/about-us`;
              else if (art.categoryId === '27') linkHref = `/curriculum-vitae/${art.slug}`;
              else if (art.categoryId === '28') linkHref = `/vacancies/hotels-restaurants/${art.slug}`;
              else if (art.categoryId === '79') linkHref = `/sponsors`;
              else if (art.categoryId === '29') linkHref = `/ihmaaa/about-us/office-bearers`;

              return (
                <div key={art.id} className="glass-card search-card">
                  <div className="search-card-meta">
                    <span className="badge badge-gold">{cleanTitle(art.categoryTitle)}</span>
                    {art.created && (
                      <span className="date-str">
                        <Calendar size={12} />
                        <span>{art.created.split(' ')[0]}</span>
                      </span>
                    )}
                  </div>

                  <h3 className="card-title">
                    <Link href={linkHref}>{cleanTitle(art.title)}</Link>
                  </h3>

                  <p className="card-excerpt">
                    {art.introtext.replace(/<[^>]+>/g, '').slice(0, 130)}...
                  </p>

                  <div className="card-action">
                    <Link href={linkHref} className="read-btn">
                      <span>View Record</span>
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>

      
    </>
  );
}
