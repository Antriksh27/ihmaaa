import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

interface Crumb {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: Crumb[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="breadcrumbs-nav">
      <div className="container">
        <ol className="breadcrumbs-list">
          <li className="crumb-item">
            <Link href="/" className="crumb-link" aria-label="Home">
              <Home size={14} />
              <span>Home</span>
            </Link>
          </li>
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            return (
              <li key={item.label} className="crumb-item">
                <ChevronRight size={13} className="crumb-separator" />
                {isLast || !item.href ? (
                  <span className="crumb-current" aria-current="page">
                    {item.label}
                  </span>
                ) : (
                  <Link href={item.href} className="crumb-link">
                    {item.label}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </div>

      
    </nav>
  );
}
