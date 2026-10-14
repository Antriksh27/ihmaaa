'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Search, X, FileText, ArrowRight, CornerDownLeft } from 'lucide-react';
import { articles } from '@/content/articles';
import { Article } from '@/types/content';
import { cleanTitle } from '@/lib/content';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Article[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
      setQuery('');
      setResults([]);
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Search logic
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }
    const q = query.toLowerCase();
    const filtered = articles.filter(a => {
      return (
        a.title.toLowerCase().includes(q) ||
        a.categoryTitle.toLowerCase().includes(q) ||
        a.introtext.toLowerCase().includes(q) ||
        (a.metadesc && a.metadesc.toLowerCase().includes(q))
      );
    }).slice(0, 8);
    setResults(filtered);
  }, [query]);

  if (!isOpen) return null;

  return (
    <div className="search-backdrop animate-fade-in" onClick={onClose}>
      <div className="search-container" onClick={(e) => e.stopPropagation()}>
        <div className="search-input-header">
          <Search size={20} className="gold-text" />
          <input
            ref={inputRef}
            type="text"
            className="search-input"
            placeholder="Search alumni articles, news, sponsors, vacancies..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {query && (
            <button className="clear-btn" onClick={() => setQuery('')} aria-label="Clear query">
              <X size={18} />
            </button>
          )}
          <button className="close-btn" onClick={onClose} aria-label="Close search">
            ESC
          </button>
        </div>

        <div className="search-body">
          {query.trim() === '' ? (
            <div className="search-empty-state">
              <p>Type keywords to search across all IHMAAA association records and archives.</p>
              <div className="popular-tags">
                <span className="tag-hint">Quick links:</span>
                <button onClick={() => setQuery('Office Bearers')} className="quick-tag">Office Bearers</button>
                <button onClick={() => setQuery('Sponsors')} className="quick-tag">Sponsors</button>
                <button onClick={() => setQuery('News')} className="quick-tag">News & Events</button>
                <button onClick={() => setQuery('Bank')} className="quick-tag">Bank Support</button>
              </div>
            </div>
          ) : results.length === 0 ? (
            <div className="search-no-results">
              <p>No results found for &ldquo;<strong>{query}</strong>&rdquo;.</p>
              <span className="no-result-sub">Try searching for sponsor names, committee members, or batch news.</span>
            </div>
          ) : (
            <div className="search-results-list">
              <div className="results-count-banner">
                Found {results.length} relevant record{results.length > 1 ? 's' : ''}
              </div>
              {results.map((art) => {
                // Determine appropriate route
                let linkHref = `/news-events/ihmaaa-news/${art.slug}`;
                if (art.categoryId === '9') linkHref = `/ihmaaa/about-us`;
                else if (art.categoryId === '27') linkHref = `/curriculum-vitae/${art.slug}`;
                else if (art.categoryId === '28') linkHref = `/vacancies/hotels-restaurants/${art.slug}`;
                else if (art.categoryId === '79') linkHref = `/sponsors`;
                else if (art.categoryId === '29') linkHref = `/ihmaaa/about-us/office-bearers`;

                return (
                  <Link
                    key={art.id}
                    href={linkHref}
                    className="search-result-item"
                    onClick={onClose}
                  >
                    <div className="result-icon-box">
                      <FileText size={18} className="gold-text" />
                    </div>
                    <div className="result-text-box">
                      <h4 className="result-title">{cleanTitle(art.title)}</h4>
                      <div className="result-meta">
                        <span className="result-category">{cleanTitle(art.categoryTitle)}</span>
                        {art.created && <span className="result-date">&bull; {art.created.split(' ')[0]}</span>}
                      </div>
                    </div>
                    <div className="result-action">
                      <CornerDownLeft size={16} />
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </div>

      
    </div>
  );
}
