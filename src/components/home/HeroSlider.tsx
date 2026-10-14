'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Award, 
  Users, 
  Calendar, 
  ArrowRight, 
  HeartHandshake, 
  Sparkles,
  CheckCircle2,
  Maximize2,
  X
} from 'lucide-react';

export default function HeroSlider() {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  return (
    <section className="hero-section">
      <div className="hero-bg-overlay" />
      <div className="hero-glow-orb" />

      <div className="container hero-container">
        <div className="hero-grid">
          {/* Left: Text & Pitch */}
          <div className="hero-content">
            <div className="hero-pill">
              <Sparkles size={14} className="gold-text" />
              <span>Official Alumni Portal &bull; Est. 1972</span>
            </div>

            <h1 className="hero-title">
              Welcome to <span className="gold-gradient-text">IHMAAA</span>
            </h1>

            <p className="hero-subtitle">
              Institute of Hotel Management Ahmedabad Alumni Association
            </p>

            <p className="hero-description">
              Connecting thousands of distinguished alumni across the globe who are leading the worldwide hospitality, culinary, tourism, and corporate sectors. Fostering institutional heritage, lifelong mentorship, and professional growth.
            </p>

            <div className="hero-actions">
              <Link href="#support" className="btn btn-primary hero-btn">
                <HeartHandshake size={18} />
                <span>Support Association</span>
              </Link>
              <Link href="/ihmaaa/about-us" className="btn btn-secondary hero-btn">
                <span>Explore Legacy</span>
                <ArrowRight size={16} />
              </Link>
            </div>

            {/* Quick Stats Grid */}
            <div className="hero-stats-row">
              <div className="stat-card">
                <span className="stat-value">50+</span>
                <span className="stat-label">Graduating Batches</span>
              </div>
              <div className="stat-divider" />
              <div className="stat-card">
                <span className="stat-value">10,000+</span>
                <span className="stat-label">Global Alumni</span>
              </div>
              <div className="stat-divider" />
              <div className="stat-card">
                <span className="stat-value">#3</span>
                <span className="stat-label">Rank in India</span>
              </div>
            </div>
          </div>

          {/* Right: Visual Showcase */}
          <div className="hero-visual">
            <div className="hero-image-frame glass-card">
              <div className="hero-frame-header">
                <div className="floating-status">
                  <span className="floating-dot" />
                  <span>Annual Meet &bull; Active Network</span>
                </div>
                <button 
                  type="button"
                  onClick={() => setIsLightboxOpen(true)} 
                  className="hero-badge-pill hero-enlarge-btn"
                  title="Click to view full photo"
                >
                  <Maximize2 size={12} />
                  <span>View Full Photo</span>
                </button>
              </div>

              <div 
                className="image-wrapper cursor-pointer group"
                onClick={() => setIsLightboxOpen(true)}
                title="Click to expand full image"
              >
                <img 
                  src="/images/sliders/slider0.jpg" 
                  alt="IHM Ahmedabad Alumni Association - Welcomes All The Delegates" 
                  className="hero-main-img"
                  onError={(e) => {
                    // Fallback to banner if slider missing
                    e.currentTarget.src = "/images/banners/ihma.jpg";
                  }}
                />
                <div className="hero-zoom-hint">
                  <Maximize2 size={16} />
                  <span>Click to expand</span>
                </div>
              </div>

              <div className="hero-frame-footer">
                <div className="floating-icon-box">
                  <Award size={20} className="gold-text" />
                </div>
                <div>
                  <h4 className="floating-card-title">Legacy of Hospitality</h4>
                  <p className="floating-card-sub">Nurturing Leaders Since FCI Days &bull; Welcoming All Delegates</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen Lightbox Modal */}
      {isLightboxOpen && (
        <div 
          className="hero-lightbox-backdrop"
          onClick={() => setIsLightboxOpen(false)}
        >
          <div 
            className="hero-lightbox-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              type="button"
              className="hero-lightbox-close"
              onClick={() => setIsLightboxOpen(false)}
              aria-label="Close full photo view"
            >
              <X size={24} />
            </button>
            <div className="hero-lightbox-img-wrapper">
              <img 
                src="/images/sliders/slider0.jpg" 
                alt="IHM Ahmedabad Alumni Association - Welcomes All The Delegates (Full Size)" 
                className="hero-lightbox-img"
              />
            </div>
            <div className="hero-lightbox-caption">
              <h4>Institute of Hotel Management Ahmedabad Alumni Association</h4>
              <p>Official Annual Alumni Meet &bull; Welcomes All The Delegates</p>
            </div>
          </div>
        </div>
      )}

      
    </section>
  );
}
