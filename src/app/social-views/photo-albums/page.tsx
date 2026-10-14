'use client';

import React, { useState, useEffect, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { 
  Camera, 
  Calendar, 
  Layers, 
  Search, 
  Filter, 
  Images,
  FolderOpen
} from 'lucide-react';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import { photoAlbums, PhotoAlbum, getAlbumBySlug } from '@/content/albums';
import AlbumLightbox from '@/components/gallery/AlbumLightbox';

function PhotoAlbumsContent() {
  const searchParams = useSearchParams();
  const [selectedAlbum, setSelectedAlbum] = useState<PhotoAlbum | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Auto-open album if 'album' query param is present
  useEffect(() => {
    const albumParam = searchParams.get('album');
    if (albumParam) {
      const found = getAlbumBySlug(albumParam);
      if (found) {
        setSelectedAlbum(found);
      }
    }
  }, [searchParams]);

  const categories = useMemo(() => {
    const cats = ['All', 'Reunions & Meets', 'Batches', 'Annual Celebrations & Awards', 'Campus Life & Galleria'];
    return cats;
  }, []);

  const filteredAlbums = useMemo(() => {
    return photoAlbums.filter((album) => {
      const matchesCat = activeCategory === 'All' || album.category === activeCategory;
      const matchesSearch = !searchQuery.trim() || 
        album.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        album.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        album.date.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCat && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const totalPhotosCount = useMemo(() => {
    return photoAlbums.reduce((sum, a) => sum + a.photoCount, 0);
  }, []);

  const handleOpenAlbum = (album: PhotoAlbum) => {
    setSelectedAlbum(album);
    // Update URL query without full reload
    const url = new URL(window.location.href);
    url.searchParams.set('album', album.slug);
    window.history.pushState({}, '', url.toString());
  };

  const handleCloseAlbum = () => {
    setSelectedAlbum(null);
    const url = new URL(window.location.href);
    url.searchParams.delete('album');
    window.history.pushState({}, '', url.toString());
  };

  const crumbs = [
    { label: 'Social Views', href: '/social-views/photo-albums' },
    { label: 'Photo Albums' },
  ];

  return (
    <>
      <Breadcrumbs items={crumbs} />

      <main className="section albums-page">
        <div className="container">
          {/* Header Banner */}
          <div className="section-title-wrap">
            <div className="section-badge">
              <Camera size={14} />
              <span>Memories &amp; Nostalgia</span>
            </div>
            <h1 className="section-title">Alumni Photo Albums</h1>
            <p className="section-desc">
              Glimpses of milestones, batch gatherings, and celebrations across the rich history of IHM Ahmedabad.
            </p>
          </div>

          {/* Stats Bar */}
          <div className="album-stats-bar">
            <div className="album-stat-item">
              <Images size={18} className="stat-icon" />
              <span><strong>{photoAlbums.length}</strong> Archival Albums</span>
            </div>
            <div className="stat-separator">•</div>
            <div className="album-stat-item">
              <Camera size={18} className="stat-icon" />
              <span><strong>{totalPhotosCount}</strong> Authentic Photographs</span>
            </div>
            <div className="stat-separator">•</div>
            <div className="album-stat-item">
              <Calendar size={18} className="stat-icon" />
              <span>Spanning <strong>1981 – 2017</strong></span>
            </div>
          </div>

          {/* Controls: Search and Categories */}
          <div className="album-controls-bar">
            {/* Category Filter Pills */}
            <div className="album-filter-pills" role="tablist">
              {categories.map((cat) => {
                const count = cat === 'All' 
                  ? photoAlbums.length 
                  : photoAlbums.filter(a => a.category === cat).length;
                return (
                  <button
                    key={cat}
                    type="button"
                    role="tab"
                    aria-selected={activeCategory === cat}
                    className={`album-pill ${activeCategory === cat ? 'active' : ''}`}
                    onClick={() => setActiveCategory(cat)}
                  >
                    <span>{cat}</span>
                    <span className="pill-count">({count})</span>
                  </button>
                );
              })}
            </div>

            {/* Search Input */}
            <div className="album-search-wrap">
              <Search size={16} className="album-search-icon" />
              <input
                type="text"
                placeholder="Search albums by year or event..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="album-search-input"
              />
              {searchQuery && (
                <button 
                  type="button"
                  className="album-search-clear"
                  onClick={() => setSearchQuery('')}
                >
                  ×
                </button>
              )}
            </div>
          </div>

          {/* Albums Grid */}
          {filteredAlbums.length > 0 ? (
            <div className="grid-3 albums-grid">
              {filteredAlbums.map((album) => (
                <div 
                  key={album.id} 
                  className="glass-card album-card album-card-interactive"
                  onClick={() => handleOpenAlbum(album)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleOpenAlbum(album);
                    }
                  }}
                  aria-label={`Open album ${album.title}`}
                >
                  <div className="album-img-wrap">
                    <img 
                      src={album.coverImage} 
                      alt={album.title} 
                      className="album-img"
                      loading="lazy"
                    />
                    <span className="album-badge">{album.photoCount} Photos</span>
                    <span className="album-cat-tag">{album.category}</span>
                  </div>
                  <div className="album-content">
                    <span className="album-date">
                      <Calendar size={13} />
                      <span>{album.date}</span>
                    </span>
                    <h3 className="album-title">{album.title}</h3>
                    <p className="album-desc">{album.description}</p>
                    
                    <div className="album-action-row">
                      <span className="album-view-btn">
                        <FolderOpen size={15} />
                        <span>Open Album ({album.photoCount} Photos)</span>
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="album-empty-state">
              <Camera size={48} className="empty-icon" />
              <h3>No photo albums found</h3>
              <p>No albums matched your current search &ldquo;{searchQuery}&rdquo;.</p>
              <button 
                type="button" 
                className="btn btn-secondary"
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory('All');
                }}
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Lightbox Modal */}
      <AlbumLightbox 
        album={selectedAlbum} 
        onClose={handleCloseAlbum} 
      />
    </>
  );
}

export default function PhotoAlbumsPage() {
  return (
    <Suspense fallback={
      <div className="section container" style={{ padding: '4rem 1rem', textAlign: 'center' }}>
        <p>Loading photo albums...</p>
      </div>
    }>
      <PhotoAlbumsContent />
    </Suspense>
  );
}
