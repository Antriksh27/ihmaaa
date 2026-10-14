import React from 'react';
import OfficeBearersCarousel from '@/components/home/OfficeBearersCarousel';
import Breadcrumbs from '@/components/layout/Breadcrumbs';

export default function OfficeBearersPage() {
  const crumbs = [
    { label: 'IHMAAA', href: '/ihmaaa/about-us' },
    { label: 'Office Bearers' },
  ];

  return (
    <>
      <Breadcrumbs items={crumbs} />
      <main>
        <OfficeBearersCarousel />
      </main>
    </>
  );
}
