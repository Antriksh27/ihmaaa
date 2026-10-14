import React from 'react';
import HeroSlider from '@/components/home/HeroSlider';
import BankSupportCard from '@/components/home/BankSupportCard';
import OfficeBearersCarousel from '@/components/home/OfficeBearersCarousel';
import NewsSection from '@/components/home/NewsSection';
import SponsorsSlider from '@/components/home/SponsorsSlider';
import SocialConnectBlock from '@/components/home/SocialConnectBlock';

export default function HomePage() {
  return (
    <main>
      <HeroSlider />
      <NewsSection />
      <OfficeBearersCarousel />
      <SponsorsSlider />
      <SocialConnectBlock />
      <BankSupportCard />
    </main>
  );
}
