import React from 'react';
import SponsorsSlider from '@/components/home/SponsorsSlider';
import Breadcrumbs from '@/components/layout/Breadcrumbs';

export default function SponsorsPage() {
  const crumbs = [{ label: 'Sponsors' }];

  return (
    <>
      <Breadcrumbs items={crumbs} />
      <main>
        <SponsorsSlider />
      </main>
    </>
  );
}
