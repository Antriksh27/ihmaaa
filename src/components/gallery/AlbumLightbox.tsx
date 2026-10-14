'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Grid, 
  Maximize2, 
  Minimize2, 
  Calendar, 
  Camera, 
  ExternalLink,
  Layers
} from 'lucide-react';
import { PhotoAlbum, AlbumPhoto } from '@/content/albums';

interface AlbumLightboxProps {
  album: PhotoAlbum | null;
  initialIndex?: number;
  onClose: () => void;
}

export default function AlbumLightbox({
  album,
  initialIndex = 0,
  onClose,
}: AlbumLightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [viewMode, setViewMode] = useState<'slideshow' | 'grid'>('slideshow');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const thumbsRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setCurrentIndex(initialIndex);
    setViewMode('slideshow');
    setImgLoaded(false);
  }, [album, initialIndex]);

  // Lock background scroll when lightbox is open
  useEffect(() => {
    if (album) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [album]);

  // Handle keyboard navigation
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!album) return;

      if (e.key === 'Escape') {
        if (isFullscreen) {
          if (document.fullscreenElement) {
            document.exitFullscreen().catch(() => {});
          }
          setIsFullscreen(false);
        } else {
          onClose();
        }
      } else if (e.key === 'ArrowRight' && viewMode === 'slideshow') {
        setCurrentIndex((prev) => (prev + 1) % album.photos.length);
        setImgLoaded(false);
      } else if (e.key === 'ArrowLeft' && viewMode === 'slideshow') {
        setCurrentIndex((prev) => (prev - 1 + album.photos.length) % album.photos.length);
        setImgLoaded(false);
      } else if (e.key.toLowerCase() === 'g') {
        setViewMode((prev) => (prev === 'slideshow' ? 'grid' : 'slideshow'));
      }
    },
    [album, onClose, viewMode, isFullscreen]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  // Scroll active thumbnail into view
  useEffect(() => {
    if (viewMode === 'slideshow' && thumbsRef.current) {
      const activeThumb = thumbsRef.current.children[currentIndex] as HTMLElement;
      if (activeThumb) {
        activeThumb.scrollIntoView({
          behavior: 'smooth',
          inline: 'center',
          block: 'nearest',
        });
      }
    }
  }, [currentIndex, viewMode]);

  if (!album) return null;

  const currentPhoto: AlbumPhoto | undefined = album.photos[currentIndex];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + album.photos.length) % album.photos.length);
    setImgLoaded(false);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % album.photos.length);
    setImgLoaded(false);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement && modalRef.current) {
      modalRef.current.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else if (document.fullscreenElement) {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  return (
    <div 
      className="album-lightbox-backdrop"
      role="dialog"
      aria-modal="true"
      aria-label={album.title}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="album-lightbox-modal" ref={modalRef}>
        {/* Top Control Bar */}
        <header className="album-lightbox-header">
          <div className="album-lightbox-info">
            <h2 className="album-lightbox-title">{album.title}</h2>
            <div className="album-lightbox-meta">
              <span className="album-lightbox-tag">
                <Calendar size={12} />
                <span>{album.date}</span>
              </span>
              <span className="album-lightbox-counter">
                Photo {currentIndex + 1} of {album.photos.length}
              </span>
            </div>
          </div>

          <div className="album-lightbox-actions">
            {/* View Mode Toggle: Slideshow vs Grid */}
            <button
              type="button"
              className={`album-lb-btn ${viewMode === 'grid' ? 'active' : ''}`}
              title={viewMode === 'grid' ? 'Back to Slideshow (G)' : 'View All as Grid (G)'}
              onClick={() => setViewMode(viewMode === 'grid' ? 'slideshow' : 'grid')}
            >
              {viewMode === 'grid' ? (
                <>
                  <Layers size={16} />
                  <span className="album-btn-text">Slideshow</span>
                </>
              ) : (
                <>
                  <Grid size={16} />
                  <span className="album-btn-text">All Photos ({album.photos.length})</span>
                </>
              )}
            </button>

            {/* Fullscreen Toggle */}
            <button
              type="button"
              className="album-lb-btn"
              title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
              onClick={toggleFullscreen}
            >
              {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
            </button>

            {/* Open Original Image */}
            {currentPhoto && (
              <a
                href={currentPhoto.src}
                target="_blank"
                rel="noopener noreferrer"
                className="album-lb-btn"
                title="Open Original Photo in New Tab"
              >
                <ExternalLink size={16} />
              </a>
            )}

            {/* Close Button */}
            <button
              type="button"
              className="album-lb-btn album-lb-close"
              title="Close (Esc)"
              onClick={onClose}
            >
              <X size={20} />
            </button>
          </div>
        </header>

        {/* Modal Body */}
        {viewMode === 'slideshow' ? (
          <div className="album-lightbox-body">
            {/* Main Stage */}
            <div className="album-lightbox-stage">
              {/* Prev Button */}
              {album.photos.length > 1 && (
                <button
                  type="button"
                  className="album-lb-nav album-lb-prev"
                  aria-label="Previous Photo"
                  onClick={handlePrev}
                >
                  <ChevronLeft size={36} />
                </button>
              )}

              {/* Central Image Viewer */}
              <div className="album-lightbox-img-wrap">
                {!imgLoaded && (
                  <div className="album-lb-loader">
                    <div className="spinner" />
                    <span>Loading photograph...</span>
                  </div>
                )}
                {currentPhoto && (
                  <img
                    key={currentPhoto.src}
                    src={currentPhoto.src}
                    alt={currentPhoto.title || `${album.title} photo ${currentIndex + 1}`}
                    className={`album-lightbox-img ${imgLoaded ? 'loaded' : 'loading'}`}
                    onLoad={() => setImgLoaded(true)}
                  />
                )}
              </div>

              {/* Next Button */}
              {album.photos.length > 1 && (
                <button
                  type="button"
                  className="album-lb-nav album-lb-next"
                  aria-label="Next Photo"
                  onClick={handleNext}
                >
                  <ChevronRight size={36} />
                </button>
              )}
            </div>

            {/* Caption & Filename */}
            <div className="album-lightbox-caption">
              <span className="album-lb-caption-text">
                {currentPhoto?.title || `Photograph ${currentIndex + 1}`}
              </span>
              <span className="album-lb-caption-sub">
                {album.description}
              </span>
            </div>

            {/* Thumbnail Strip */}
            {album.photos.length > 1 && (
              <div className="album-lightbox-thumbs-container">
                <div className="album-lightbox-thumbs" ref={thumbsRef}>
                  {album.photos.map((photo, idx) => (
                    <button
                      key={photo.src}
                      type="button"
                      className={`album-lb-thumb ${idx === currentIndex ? 'active' : ''}`}
                      onClick={() => {
                        setCurrentIndex(idx);
                        setImgLoaded(false);
                      }}
                      title={`Go to photo ${idx + 1}`}
                    >
                      <img src={photo.thumb} alt={`Thumbnail ${idx + 1}`} />
                      <span className="album-lb-thumb-num">{idx + 1}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          /* Grid View Mode */
          <div className="album-lightbox-grid-view">
            <div className="album-grid-toolbar">
              <span className="album-grid-title">
                Showing all {album.photos.length} photographs in &ldquo;{album.title}&rdquo;
              </span>
              <span className="album-grid-hint">
                Click any photograph to view in full resolution
              </span>
            </div>

            <div className="album-grid-container">
              {album.photos.map((photo, idx) => (
                <button
                  key={photo.src}
                  type="button"
                  className={`album-grid-card ${idx === currentIndex ? 'selected' : ''}`}
                  onClick={() => {
                    setCurrentIndex(idx);
                    setViewMode('slideshow');
                    setImgLoaded(false);
                  }}
                >
                  <div className="album-grid-img-wrap">
                    <img 
                      src={photo.thumb} 
                      alt={photo.title || `Photo ${idx + 1}`} 
                      loading="lazy" 
                    />
                    <span className="album-grid-badge">#{idx + 1}</span>
                  </div>
                  <div className="album-grid-label">
                    <span>{photo.title || `Photo ${idx + 1}`}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
