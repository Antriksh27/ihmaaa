'use client';

import React, { useState } from 'react';
import { 
  Building2, 
  Copy, 
  Check, 
  Phone, 
  Mail, 
  ShieldCheck, 
  HeartHandshake 
} from 'lucide-react';
import { siteConfig } from '@/content/site-config';

export default function BankSupportCard() {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <section id="support" className="section bank-section">
      <div className="container">
        <div className="glass-card bank-card">
          <div className="bank-card-grid">
            {/* Left: Purpose & Call to Action */}
            <div className="bank-info-left">
              <div className="section-badge">
                <HeartHandshake size={14} />
                <span>Alumni Association Welfare</span>
              </div>
              <h2 className="bank-title">Support <span className="gold-text">IHMAAA</span></h2>
              <p className="bank-desc">
                {siteConfig.bankDetails.supportMessage}
              </p>
              <p className="bank-notice">
                Please email us your transfer confirmation / counter receipt at{' '}
                <a href={`mailto:${siteConfig.contact.email}`} className="gold-text-link">
                  {siteConfig.contact.email}
                </a>{' '}
                so your membership and contribution can be acknowledged immediately.
              </p>

              <div className="bank-contacts-box">
                <h4 className="contacts-heading">For Details & Verification:</h4>
                <div className="contacts-list">
                  <div className="contact-item">
                    <span className="contact-name">Mr. Anil Goyal (President):</span>
                    <a href={`tel:${siteConfig.contact.phoneMobile1}`} className="contact-phone">
                      <Phone size={14} />
                      <span>{siteConfig.contact.phoneMobile1}</span>
                    </a>
                  </div>
                  <div className="contact-item">
                    <span className="contact-name">Mr. Virendra Singh Gaur (Gen. Secretary):</span>
                    <a href={`tel:${siteConfig.contact.phoneMobile2}`} className="contact-phone">
                      <Phone size={14} />
                      <span>{siteConfig.contact.phoneMobile2}</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Bank Details Card */}
            <div className="bank-details-frame">
              <div className="bank-passbook">
                <div className="passbook-header">
                  <div className="bank-logo-wrap">
                    <Building2 size={24} className="gold-text" />
                    <div>
                      <h3 className="bank-inst-name">{siteConfig.bankDetails.bankName}</h3>
                      <span className="bank-inst-branch">{siteConfig.bankDetails.branch}</span>
                    </div>
                  </div>
                  <span className="verified-pill">
                    <ShieldCheck size={14} />
                    <span>Verified Official Account</span>
                  </span>
                </div>

                <div className="passbook-body">
                  {/* Account Name */}
                  <div className="passbook-row">
                    <span className="field-label">Account Name</span>
                    <span className="field-value-strong">{siteConfig.bankDetails.accountName}</span>
                  </div>

                  {/* Account Number */}
                  <div className="passbook-row copyable-row">
                    <div>
                      <span className="field-label">Account Number</span>
                      <span className="field-value-highlight">{siteConfig.bankDetails.accountNumber}</span>
                    </div>
                    <button 
                      onClick={() => handleCopy(siteConfig.bankDetails.accountNumber, 'acc')}
                      className="copy-btn"
                      title="Copy Account Number"
                      aria-label="Copy Account Number"
                    >
                      {copiedField === 'acc' ? <Check size={16} className="text-success" /> : <Copy size={16} />}
                      <span>{copiedField === 'acc' ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>

                  {/* IFSC Code */}
                  <div className="passbook-row copyable-row">
                    <div>
                      <span className="field-label">IFSC Code</span>
                      <span className="field-value-highlight">{siteConfig.bankDetails.ifscCode}</span>
                    </div>
                    <button 
                      onClick={() => handleCopy(siteConfig.bankDetails.ifscCode, 'ifsc')}
                      className="copy-btn"
                      title="Copy IFSC Code"
                      aria-label="Copy IFSC Code"
                    >
                      {copiedField === 'ifsc' ? <Check size={16} className="text-success" /> : <Copy size={16} />}
                      <span>{copiedField === 'ifsc' ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>

                  {/* MICR & Address */}
                  <div className="passbook-row">
                    <span className="field-label">MICR Code</span>
                    <span className="field-value">{siteConfig.bankDetails.micrCode}</span>
                  </div>

                  <div className="passbook-row">
                    <span className="field-label">Branch Address</span>
                    <span className="field-value">{siteConfig.bankDetails.branchAddress}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      
    </section>
  );
}
