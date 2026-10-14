'use client';

import React from 'react';
import Link from 'next/link';
import { Globe, Users, ArrowUpRight, Share2, Sparkles } from 'lucide-react';
import { siteConfig } from '@/content/site-config';

export default function SocialConnectBlock() {
  const networks = [
    {
      name: 'AlmaConnect Portal',
      description: 'Exclusive verified network for IHM Ahmedabad alumni. Directory, job boards, and mentorship.',
      link: siteConfig.socialLinks.almaconnect,
      cta: 'Join AlmaConnect',
      icon: <Globe size={22} className="gold-text" />,
      highlight: true
    },
    {
      name: 'LinkedIn Official Page',
      description: 'Follow official association corporate updates, industry milestones, and executive announcements.',
      link: siteConfig.socialLinks.linkedin,
      cta: 'Follow on LinkedIn',
      icon: <Users size={22} className="gold-text" />,
      highlight: false
    },
    {
      name: 'Facebook Alumni Group',
      description: 'Connect with fellow batchmates, share nostalgic campus photos, and plan informal reunions.',
      link: siteConfig.socialLinks.facebookGroup,
      cta: 'Join Group',
      icon: <Share2 size={22} className="gold-text" />,
      highlight: false
    },
    {
      name: 'Instagram @humansofihma',
      description: 'Celebrating stories, career journeys, and inspiring achievements of our alumni worldwide.',
      link: 'https://instagram.com',
      cta: 'Follow Instagram',
      icon: <Sparkles size={22} className="gold-text" />,
      highlight: false
    }
  ];

  return (
    <section className="section social-section">
      <div className="container">
        <div className="section-title-wrap">
          <div className="section-badge">
            <Share2 size={14} />
            <span>Community &amp; Networks</span>
          </div>
          <h2 className="section-title">Stay Connected Worldwide</h2>
          <p className="section-desc">
            Whether you graduated in 1975 or 2024, our digital alumni networks keep you close to your alma mater and batchmates.
          </p>
        </div>

        <div className="grid-2 social-grid">
          {networks.map((net) => (
            <div key={net.name} className={`glass-card social-card ${net.highlight ? 'social-highlight' : ''}`}>
              <div className="social-header">
                <div className="social-icon-box">{net.icon}</div>
                <div>
                  <h3 className="social-card-title">{net.name}</h3>
                  {net.highlight && <span className="official-tag">Recommended Network</span>}
                </div>
              </div>

              <p className="social-desc">{net.description}</p>

              <div className="social-card-action">
                <Link 
                  href={net.link} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className={`btn ${net.highlight ? 'btn-primary' : 'btn-secondary'} social-btn`}
                >
                  <span>{net.cta}</span>
                  <ArrowUpRight size={16} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      
    </section>
  );
}
