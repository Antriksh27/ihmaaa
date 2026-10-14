'use client';

import React, { useState } from 'react';
import { Send, CheckCircle2, Phone, Mail, MapPin, Building2, User } from 'lucide-react';
import { siteConfig } from '@/content/site-config';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    batch: '',
    subject: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setError('Please fill in all required fields (Name, Email, Message).');
      return;
    }
    // Simulation / local mailto action
    setSubmitted(true);
  };

  return (
    <div className="contact-wrapper">
      <div className="grid-2 contact-grid">
        {/* Left: Contact Info */}
        <div className="glass-card contact-info-card">
          <h2 className="contact-card-title">Get In Touch</h2>
          <p className="contact-card-desc">
            We welcome correspondence from all alumni, students, recruiting partners, and patrons. Reach out for membership inquiries, batch reunions, or association support.
          </p>

          <div className="contact-items-list">
            <div className="contact-entry">
              <div className="entry-icon"><MapPin size={20} className="gold-text" /></div>
              <div>
                <h4 className="entry-label">Headquarters Address</h4>
                <p className="entry-value">
                  Institute of Hotel Management Ahmedabad Alumni Association<br />
                  Bhaijipura Patia, P.O. Koba, Gandhinagar - 382426, Gujarat, India
                </p>
              </div>
            </div>

            <div className="contact-entry">
              <div className="entry-icon"><Phone size={20} className="gold-text" /></div>
              <div>
                <h4 className="entry-label">Telephone Contacts</h4>
                <p className="entry-value">
                  Office: <a href={`tel:${siteConfig.contact.phoneOffice}`}>{siteConfig.contact.phoneOffice}</a><br />
                  Mr. Anil Goyal (President): <a href={`tel:${siteConfig.contact.phoneMobile1}`}>{siteConfig.contact.phoneMobile1}</a><br />
                  Mr. Virendra Gaur (Gen. Secretary): <a href={`tel:${siteConfig.contact.phoneMobile2}`}>{siteConfig.contact.phoneMobile2}</a>
                </p>
              </div>
            </div>

            <div className="contact-entry">
              <div className="entry-icon"><Mail size={20} className="gold-text" /></div>
              <div>
                <h4 className="entry-label">Official Email</h4>
                <p className="entry-value">
                  <a href={`mailto:${siteConfig.contact.email}`} className="gold-link">
                    {siteConfig.contact.email}
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Interactive Form */}
        <div className="glass-card contact-form-card">
          {submitted ? (
            <div className="form-success-box animate-fade-in">
              <CheckCircle2 size={54} className="success-icon" />
              <h3 className="success-title">Message Received</h3>
              <p className="success-desc">
                Thank you, <strong>{formData.name}</strong>. Your message has been recorded. The executive committee will acknowledge your correspondence shortly.
              </p>
              <button 
                onClick={() => {
                  setSubmitted(false);
                  setFormData({ name: '', email: '', batch: '', subject: '', message: '' });
                }} 
                className="btn btn-secondary"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="contact-form">
              <h3 className="form-title">Send a Message</h3>

              {error && (
                <div className="form-error-banner animate-fade-in">
                  <span>{error}</span>
                </div>
              )}

              <div className="form-group">
                <label htmlFor="name" className="form-label">Full Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Sanjeev Kapoor"
                  className="form-input"
                />
              </div>

              <div className="form-row-2">
                <div className="form-group">
                  <label htmlFor="email" className="form-label">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@domain.com"
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="batch" className="form-label">Batch / Passing Year</label>
                  <input
                    type="text"
                    id="batch"
                    name="batch"
                    value={formData.batch}
                    onChange={handleChange}
                    placeholder="e.g. 1994 or 2012"
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="subject" className="form-label">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="e.g. Membership inquiry / Donation confirmation"
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="message" className="form-label">Message Content *</label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Type your message, counter receipt details, or inquiry here..."
                  className="form-input form-textarea"
                />
              </div>

              <button type="submit" className="btn btn-primary form-submit-btn">
                <Send size={16} />
                <span>Submit Message</span>
              </button>
            </form>
          )}
        </div>
      </div>

      
    </div>
  );
}
