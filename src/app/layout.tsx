import React from 'react';
import type { Metadata, Viewport } from 'next';
import '@/styles/globals.css';
import '@/styles/components.css';
import AppLayout from '@/components/layout/AppLayout';
import { siteConfig } from '@/content/site-config';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0c426f',
};

export const metadata: Metadata = {
  metadataBase: new URL('https://ihmaaa.com'),
  title: {
    default: 'IHMAAA | Institute of Hotel Management Ahmedabad Alumni Association',
    template: '%s | IHMAAA',
  },
  description: 'Official portal of Institute of Hotel Management Ahmedabad Alumni Association (IHMAAA). Connecting hospitality leaders, mentors, batches, and students worldwide.',
  keywords: [
    'IHMAAA',
    'IHM Ahmedabad Alumni',
    'Institute of Hotel Management Ahmedabad',
    'Hospitality alumni',
    'FCI Ahmedabad',
    'Hotel Management Alumni Network',
  ],
  authors: [{ name: 'IHMAAA Executive Committee' }],
  creator: 'IHMAAA',
  publisher: 'Institute of Hotel Management Ahmedabad Alumni Association',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://ihmaaa.com',
    siteName: 'IHMAAA',
    title: 'IHMAAA | Institute of Hotel Management Ahmedabad Alumni Association',
    description: 'Connecting generations of hospitality leaders from IHM Ahmedabad worldwide.',
    images: [
      {
        url: '/images/page-banner/ihma.jpg',
        width: 1200,
        height: 630,
        alt: 'IHMAAA - Institute of Hotel Management Ahmedabad Alumni Association',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'IHMAAA | IHM Ahmedabad Alumni Association',
    description: 'Connecting generations of hospitality leaders from IHM Ahmedabad worldwide.',
    images: ['/images/page-banner/ihma.jpg'],
  },
  alternates: {
    canonical: 'https://ihmaaa.com',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: siteConfig.fullName,
    alternateName: siteConfig.name,
    url: 'https://ihmaaa.com',
    logo: 'https://ihmaaa.com/images/page-banner/ihma.jpg',
    description: siteConfig.tagline,
    address: {
      '@type': 'PostalAddress',
      streetAddress: `${siteConfig.address.line1}, ${siteConfig.address.line2}`,
      addressLocality: siteConfig.address.city,
      addressRegion: siteConfig.address.state,
      postalCode: siteConfig.address.pincode,
      addressCountry: siteConfig.address.country,
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: siteConfig.contact.phoneOffice,
      contactType: 'Alumni Association Office',
      email: siteConfig.contact.email,
    },
    sameAs: [
      siteConfig.socialLinks.facebookPage,
      siteConfig.socialLinks.facebookGroup,
      siteConfig.socialLinks.linkedin,
      siteConfig.socialLinks.almaconnect,
    ],
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <AppLayout>{children}</AppLayout>
      </body>
    </html>
  );
}
