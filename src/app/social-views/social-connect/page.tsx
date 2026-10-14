import React from 'react';
import SocialConnectBlock from '@/components/home/SocialConnectBlock';
import Breadcrumbs from '@/components/layout/Breadcrumbs';

export default function SocialConnectPage() {
  const crumbs = [{ label: 'Social Views', href: '/social-views/photo-albums' }, { label: 'Social Connect' }];

  return (
    <>
      <Breadcrumbs items={crumbs} />
      <main>
        <SocialConnectBlock />
      </main>
    </>
  );
}
