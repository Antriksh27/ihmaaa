'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Phone, 
  Mail, 
  Menu, 
  X, 
  ChevronDown, 
  HeartHandshake, 
  GraduationCap,
  Globe,
  Award
} from 'lucide-react';
import { navigationMenu } from '@/content/navigation';
import { siteConfig } from '@/content/site-config';

interface HeaderProps {
  onOpenSearch?: () => void;
}

export default function Header({ onOpenSearch }: HeaderProps = {}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on path change
  useEffect(() => {
    setMobileMenuOpen(false);
    setOpenDropdown(null);
  }, [pathname]);

  return (
    <header className="header-wrapper">
      {/* Top Banner */}
      <div className="top-bar">
        <div className="container top-bar-inner">
          <div className="top-bar-left">
            <span className="top-item">
              <GraduationCap size={14} className="gold-text" />
              <span>Institute of Hotel Management Ahmedabad</span>
            </span>
            <span className="top-divider">|</span>
            <a href={`tel:${siteConfig.contact.phoneMobile1}`} className="top-item">
              <Phone size={13} className="gold-text" />
              <span>{siteConfig.contact.phoneOffice}</span>
            </a>
            <span className="top-divider">|</span>
            <a href={`mailto:${siteConfig.contact.email}`} className="top-item">
              <Mail size={13} className="gold-text" />
              <span>{siteConfig.contact.email}</span>
            </a>
          </div>
          <div className="top-bar-right">
            <Link href={siteConfig.socialLinks.almaconnect} target="_blank" rel="noopener noreferrer" className="top-link">
              <Globe size={13} />
              <span>AlmaConnect</span>
            </Link>
            <Link href={siteConfig.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="top-link">
              <span>LinkedIn</span>
            </Link>
            <Link href={siteConfig.socialLinks.facebookPage} target="_blank" rel="noopener noreferrer" className="top-link">
              <span>Facebook</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Header Banner (Logo & Actions) */}
      <div className="header-main">
        <div className="container header-main-inner">
          {/* Logo & Identity */}
          <Link href="/" className="logo-link">
            <img 
              src="/images/logo.png" 
              alt="IHMAAA Logo" 
              className="logo-img" 
            />
            <div className="logo-text">
              <span className="brand-acronym">IHMAAA</span>
              <span className="brand-sub">Institute of Hotel Management Ahmedabad Alumni Association</span>
            </div>
          </Link>

          {/* Action CTAs & Mobile Hamburger */}
          <div className="header-actions">
            <Link href="/#support" className="btn btn-accent header-donate-btn">
              <HeartHandshake size={16} />
              <span>Support IHMAAA</span>
            </Link>

            <button 
              className="mobile-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar (Dedicated Full-Width Row) */}
      <nav className={`main-nav-bar ${isScrolled ? 'nav-scrolled' : ''}`} aria-label="Main Navigation">
        <div className="container main-nav-container">
          <div className="desktop-menu">
            {navigationMenu.map((item) => {
              const hasChildren = item.children && item.children.length > 0;
              const isActive = pathname === item.href || (hasChildren && item.children?.some(c => pathname === c.href));

              return (
                <div 
                  key={item.title} 
                  className="nav-item-dropdown"
                  onMouseEnter={() => hasChildren && setOpenDropdown(item.title)}
                  onMouseLeave={() => hasChildren && setOpenDropdown(null)}
                >
                  <Link 
                    href={item.href}
                    className={`nav-link ${isActive ? 'nav-link-active' : ''}`}
                  >
                    <span>{item.title}</span>
                    {hasChildren && <ChevronDown size={14} className="dropdown-arrow" />}
                  </Link>

                  {hasChildren && openDropdown === item.title && (
                    <div className="dropdown-panel animate-fade-in">
                      <div className="dropdown-items">
                        {item.children?.map((child) => {
                          const isChildActive = pathname === child.href;
                          return (
                            <Link 
                              key={child.title} 
                              href={child.href}
                              className={`dropdown-link ${isChildActive ? 'dropdown-link-active' : ''}`}
                            >
                              <span>{child.title}</span>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="mobile-drawer animate-fade-in">
          <div className="mobile-nav-list">
            {navigationMenu.map((item) => {
              const hasChildren = item.children && item.children.length > 0;
              const isExpanded = openDropdown === item.title;

              return (
                <div key={item.title} className="mobile-nav-group">
                  <div className="mobile-nav-head">
                    <Link 
                      href={item.href}
                      className="mobile-nav-link"
                      onClick={() => !hasChildren && setMobileMenuOpen(false)}
                    >
                      {item.title}
                    </Link>
                    {hasChildren && (
                      <button 
                        onClick={() => setOpenDropdown(isExpanded ? null : item.title)}
                        className="mobile-expand-btn"
                        aria-label={`Expand ${item.title}`}
                      >
                        <ChevronDown size={18} className={`expand-icon ${isExpanded ? 'rotated' : ''}`} />
                      </button>
                    )}
                  </div>

                  {hasChildren && isExpanded && (
                    <div className="mobile-submenu">
                      {item.children?.map((child) => (
                        <Link 
                          key={child.title}
                          href={child.href}
                          className="mobile-sublink"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {child.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}

            <div className="mobile-drawer-footer">
              <Link 
                href="/#support"
                className="btn btn-primary"
                style={{ width: '100%', marginTop: '1rem' }}
                onClick={() => setMobileMenuOpen(false)}
              >
                <HeartHandshake size={18} />
                <span>Support IHMAAA</span>
              </Link>
            </div>
          </div>
        </div>
      )}

      
    </header>
  );
}
