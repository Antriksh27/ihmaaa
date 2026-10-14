'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles, ExternalLink, ChevronRight } from 'lucide-react';
import { sponsors } from '@/content/sponsors';
import { cleanTitle } from '@/lib/content';

export default function SponsorsSlider() {
  return (
    <section className="section sponsors-section">
      <div className="container">
        <div className="section-title-wrap">
          <div className="section-badge">
            <Sparkles size={14} />
            <span>Alumni Enterprises &amp; Partners</span>
          </div>
          <h2 className="section-title">Our Proud Sponsors</h2>
          <p className="section-desc">
            Honouring alumni-led enterprises, premier hotel chains, restaurant brands, and corporate partners supporting IHMAAA.
          </p>
        </div>

        {/* Responsive Grid of Sponsors */}
        <div className="grid-4 sponsors-grid">
          {sponsors.map((sp) => (
            <div key={sp.id} className="glass-card sponsor-card">
              <div className="sponsor-logo-box">
                <img 
                  src={sp.logo} 
                  alt={cleanTitle(sp.name)}
                  className="sponsor-logo-img"
                  onError={(e) => {
                    e.currentTarget.src = "/images/ob_pics/white.jpg";
                  }}
                />
              </div>
              <h4 className="sponsor-name">{cleanTitle(sp.name)}</h4>
              <span className="sponsor-cat">{sp.category}</span>

              {sp.website && sp.website !== '#' && (
                <a 
                  href={sp.website} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="sponsor-link"
                  title={`Visit ${sp.name}`}
                >
                  <span>Visit Website</span>
                  <ExternalLink size={13} />
                </a>
              )}
            </div>
          ))}
        </div>

        <div className="sponsors-footer-cta">
          <Link href="/sponsors" className="btn btn-outline-gold">
            <span>View All 24 Sponsors &amp; Profiles</span>
            <ChevronRight size={16} />
          </Link>
        </div>
      </div>

      
    </section>
  );
}
