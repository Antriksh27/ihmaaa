import React from 'react';
import Link from 'next/link';
import { 
  Award, 
  MapPin, 
  Phone, 
  Mail, 
  Globe, 
  ArrowUpRight, 
  Building2, 
  ShieldCheck 
} from 'lucide-react';
import { siteConfig } from '@/content/site-config';

export default function Footer() {
  return (
    <footer className="footer-root">
      <div className="container">
        {/* Main Footer Grid */}
        <div className="footer-grid">
          {/* Col 1: About Association */}
          <div className="footer-col footer-brand-col">
            <div className="footer-brand">
              <img 
                src="/images/logo.png" 
                alt="IHMAAA Logo" 
                className="footer-logo-img" 
              />
              <div>
                <h3 className="footer-brand-title">IHMAAA</h3>
                <p className="footer-brand-sub">IHM Ahmedabad Alumni Association</p>
              </div>
            </div>
            <p className="footer-about-text">
              Uniting hospitality leaders, alumni batches, educators, and students from the Institute of Hotel Management Ahmedabad since 1972. Fostering mentorship, career opportunities, and lifelong institutional bonds.
            </p>
            <div className="footer-social-row">
              <Link href={siteConfig.socialLinks.almaconnect} target="_blank" rel="noopener noreferrer" className="social-pill" title="AlmaConnect">
                <Globe size={15} />
                <span>AlmaConnect</span>
              </Link>
              <Link href={siteConfig.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="social-pill" title="LinkedIn">
                <span>LinkedIn</span>
              </Link>
              <Link href={siteConfig.socialLinks.facebookPage} target="_blank" rel="noopener noreferrer" className="social-pill" title="Facebook">
                <span>Facebook</span>
              </Link>
            </div>
          </div>

          {/* Col 2: Navigation & Sections */}
          <div className="footer-col">
            <h4 className="footer-heading">Quick Links</h4>
            <ul className="footer-nav-list">
              <li><Link href="/ihmaaa/about-us" className="footer-link">About the Association</Link></li>
              <li><Link href="/ihmaaa/about-us/chairmans-message" className="footer-link">Chairman&apos;s Message</Link></li>
              <li><Link href="/ihmaaa/about-us/president-s-message" className="footer-link">President&apos;s Message</Link></li>
              <li><Link href="/ihmaaa/about-us/founder-principal-s-message" className="footer-link">Founder Principal&apos;s Message</Link></li>
              <li><Link href="/ihmaaa/about-us/office-bearers" className="footer-link">Executive Committee</Link></li>
              <li><Link href="/ihmaaa/about-us/member-s-list" className="footer-link">Alumni Directory</Link></li>
              <li><Link href="/sponsors" className="footer-link">Our Proud Sponsors</Link></li>
            </ul>
          </div>

          {/* Col 3: Documents & Careers */}
          <div className="footer-col">
            <h4 className="footer-heading">Governance & Careers</h4>
            <ul className="footer-nav-list">
              <li><Link href="/ihmaaa/aims-objectives/memorandum-of-association" className="footer-link">Memorandum of Association</Link></li>
              <li><Link href="/ihmaaa/aims-objectives/article-of-association" className="footer-link">Articles of Association</Link></li>
              <li><Link href="/ihmaaa/aims-objectives/downloads" className="footer-link">Official Downloads Center</Link></li>
              <li><Link href="/curriculum-vitae" className="footer-link">Alumni Curriculum Vitae</Link></li>
              <li><Link href="/vacancies/hotels-restaurants" className="footer-link">Hospitality Job Vacancies</Link></li>
              <li><Link href="/news-events/ihmaaa-news" className="footer-link">News & Event Highlights</Link></li>
              <li><Link href="/social-views/photo-albums" className="footer-link">Historical Photo Gallery</Link></li>
            </ul>
          </div>

          {/* Col 4: Bank Details & Direct Contact */}
          <div className="footer-col footer-contact-col">
            <h4 className="footer-heading">Official Support & Bank</h4>
            <div className="footer-bank-mini">
              <div className="bank-mini-header">
                <Building2 size={16} className="gold-text" />
                <span className="bank-mini-name">{siteConfig.bankDetails.bankName}</span>
              </div>
              <p className="bank-mini-line"><strong>A/C:</strong> {siteConfig.bankDetails.accountNumber}</p>
              <p className="bank-mini-line"><strong>IFSC:</strong> {siteConfig.bankDetails.ifscCode}</p>
              <p className="bank-mini-line"><strong>Branch:</strong> {siteConfig.bankDetails.branch}</p>
            </div>

            <div className="footer-contact-details">
              <div className="contact-row">
                <MapPin size={16} className="contact-icon" />
                <span>Bhaijipura Patia, P.O. Koba, Gandhinagar - 382426, Gujarat</span>
              </div>
              <div className="contact-row">
                <Phone size={16} className="contact-icon" />
                <span>{siteConfig.contact.phoneOffice}</span>
              </div>
              <div className="contact-row">
                <Mail size={16} className="contact-icon" />
                <span>{siteConfig.contact.email}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <p className="copyright-text">
            &copy; {new Date().getFullYear()} Institute of Hotel Management Ahmedabad Alumni Association (IHMAAA). All rights reserved.
          </p>
          <div className="footer-meta-links">
            <span className="verified-badge">
              <ShieldCheck size={14} className="gold-text" />
              <span>Official Alumni Portal</span>
            </span>
          </div>
        </div>
      </div>

      
    </footer>
  );
}
