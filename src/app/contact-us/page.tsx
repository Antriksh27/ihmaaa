import React from 'react';
import ContactForm from '@/components/forms/ContactForm';
import Breadcrumbs from '@/components/layout/Breadcrumbs';

export default function ContactUsPage() {
  const crumbs = [{ label: 'Contact Us' }];

  return (
    <>
      <Breadcrumbs items={crumbs} />
      <main className="section contact-page">
        <div className="container">
          <ContactForm />
        </div>
      </main>
    </>
  );
}
