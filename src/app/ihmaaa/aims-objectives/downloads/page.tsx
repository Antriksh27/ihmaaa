import React from 'react';
import Link from 'next/link';
import { getArticleById } from '@/lib/content';
import { FileText, Download, CheckCircle2 } from 'lucide-react';
import Breadcrumbs from '@/components/layout/Breadcrumbs';

export default function DownloadsPage() {
  const article = getArticleById('11');

  const officialDocs = [
    {
      title: 'Memorandum of Association (MoA)',
      description: 'Founding objectives, constitutional bylaws, and society registration framework.',
      format: 'PDF',
      size: '1.5 MB',
      link: '/downloads/moa.pdf',
    },
    {
      title: 'Articles of Association (AoA)',
      description: 'Internal operational regulations, election procedures, and membership duties.',
      format: 'PDF',
      size: '2.6 MB',
      link: '/downloads/aoa.pdf',
    },
    {
      title: 'Scholarship & Financial Aid Application Form',
      description: 'Official form to apply for alumni-sponsored scholarships and student aid programs.',
      format: 'PDF',
      size: '704 KB',
      link: '/downloads/membership-form.pdf',
    },
  ];

  const crumbs = [
    { label: 'IHMAAA', href: '/ihmaaa/about-us' },
    { label: 'Downloads' },
  ];

  return (
    <>
      <Breadcrumbs items={crumbs} />

      <main className="section downloads-page">
        <div className="container">
          <div className="section-title-wrap">
            <div className="section-badge">
              <Download size={14} />
              <span>Official Repository</span>
            </div>
            <h1 className="section-title">Association Downloads</h1>
            <p className="section-desc">
              Access and download official association constitution documents, membership forms, and archival event brochures.
            </p>
          </div>

          <div className="grid-2 docs-grid">
            {officialDocs.map((doc) => (
              <div key={doc.title} className="glass-card doc-card">
                <div className="doc-icon-box">
                  <FileText size={24} className="gold-text" />
                </div>
                <div className="doc-details">
                  <div className="doc-header-row">
                    <h3 className="doc-title">{doc.title}</h3>
                    <span className="badge badge-gold">{doc.format} &bull; {doc.size}</span>
                  </div>
                  <p className="doc-desc">{doc.description}</p>
                  <a href={doc.link} download className="btn btn-primary doc-btn">
                    <Download size={16} />
                    <span>Download Document</span>
                  </a>
                </div>
              </div>
            ))}
          </div>

          {article && article.contentHtml && (
            <div className="glass-card article-notes-card">
              <h3 className="notes-heading">Archival Notes</h3>
              <div 
                className="prose-content"
                dangerouslySetInnerHTML={{ __html: article.contentHtml }}
              />
            </div>
          )}
        </div>
      </main>

      
    </>
  );
}
