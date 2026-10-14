'use client';

import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

interface AppLayoutProps {
  children: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <>
      <Header />
      <div style={{ flex: 1, minHeight: '60vh' }}>{children}</div>
      <Footer />
    </>
  );
}
