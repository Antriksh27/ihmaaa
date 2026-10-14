'use client';

import React from 'react';
import Link from 'next/link';
import { Newspaper, Calendar, ChevronRight, ArrowRight } from 'lucide-react';
import { articles } from '@/content/articles';
import { cleanTitle } from '@/lib/content';

export default function NewsSection() {
  // Category 80 is News and Events
  const newsItems = articles
    .filter((a) => a.categoryId === '80')
    .slice(0, 6);

  return (
    <section className="section news-section">
      <div className="container">
        <div className="section-title-wrap">
          <div className="section-badge">
            <Newspaper size={14} />
            <span>Updates &amp; Highlights</span>
          </div>
          <h2 className="section-title">Latest News &amp; Events</h2>
          <p className="section-desc">
            Stay informed with association celebrations, memorial honors, batch reunions, and institutional milestones.
          </p>
        </div>

        <div className="grid-3 news-grid">
          {newsItems.map((item) => {
            const dateStr = item.created ? item.created.split(' ')[0] : 'IHMAAA';

            return (
              <article key={item.id} className="glass-card news-card">
                <div className="news-card-header">
                  <span className="badge badge-gold">News</span>
                  <span className="news-date">
                    <Calendar size={13} />
                    <span>{dateStr}</span>
                  </span>
                </div>

                <h3 className="news-card-title">
                  <Link href={`/news-events/ihmaaa-news/${item.slug}`}>
                    {cleanTitle(item.title)}
                  </Link>
                </h3>

                <p className="news-card-excerpt">
                  {item.introtext.replace(/<[^>]+>/g, '').slice(0, 140)}...
                </p>

                <div className="news-card-footer">
                  <Link href={`/news-events/ihmaaa-news/${item.slug}`} className="read-more-link">
                    <span>Read Full Story</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>

        <div className="news-all-wrap">
          <Link href="/news-events/ihmaaa-news" className="btn btn-secondary">
            <span>Browse News &amp; Events Archive</span>
            <ChevronRight size={16} />
          </Link>
        </div>
      </div>

      
    </section>
  );
}
