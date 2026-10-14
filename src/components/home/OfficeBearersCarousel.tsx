'use client';

import React from 'react';
import Link from 'next/link';
import { Award, ChevronRight, Phone, Mail } from 'lucide-react';
import { officeBearers } from '@/content/office-bearers';

export default function OfficeBearersCarousel() {
  return (
    <section className="section ob-section">
      <div className="container">
        <div className="section-title-wrap">
          <div className="section-badge">
            <Award size={14} />
            <span>Association Leadership</span>
          </div>
          <h2 className="section-title">Office Bearers &amp; Patrons</h2>
          <p className="section-desc">
            Guided by veteran hospitality luminaries dedicated to alumni welfare, institutional progress, and student mentorship.
          </p>
        </div>

        <div className="grid-3 ob-grid">
          {officeBearers.map((ob) => (
            <div key={ob.id} className="glass-card ob-card">
              <div className="ob-image-wrap">
                <img 
                  src={ob.image} 
                  alt={ob.name}
                  className="ob-img"
                  onError={(e) => {
                    e.currentTarget.src = "/images/ob_pics/white.jpg";
                  }}
                />
                <div className="ob-role-pill">
                  {ob.role}
                </div>
              </div>

              <div className="ob-body">
                <h3 className="ob-name">{ob.name}</h3>
                <p className="ob-bio">{ob.bio}</p>

                <div className="ob-meta-footer">
                  {ob.phone && (
                    <a href={`tel:${ob.phone}`} className="ob-contact-link">
                      <Phone size={13} className="gold-text" />
                      <span>{ob.phone}</span>
                    </a>
                  )}
                  {ob.id === 'nm-rafique' && (
                    <Link href="/ihmaaa/about-us/founder-principal-s-message" className="ob-read-link">
                      <span>Read Message</span>
                      <ChevronRight size={14} />
                    </Link>
                  )}
                  {ob.id === 'anil-goyal' && (
                    <Link href="/ihmaaa/about-us/president-s-message" className="ob-read-link">
                      <span>Read Message</span>
                      <ChevronRight size={14} />
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="ob-all-wrap">
          <Link href="/ihmaaa/about-us/office-bearers" className="btn btn-secondary">
            <span>View Full Committee Directory</span>
            <ChevronRight size={16} />
          </Link>
        </div>
      </div>

      
    </section>
  );
}
