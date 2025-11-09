
import React from 'react';
import Navigation from '@/components/section/Navigation';
import HeroSection from '@/components/section/HeroSection';
import FeaturesSection from '@/components/FeaturesSection';
import DownloadSection from '@/components/DownloadSection';
import DemoSection from '@/components/DemoSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import FooterSection from '@/components/section/FooterSection';

const Index = () => {
  return (
    <div className="font-poppins">
      <Navigation />
      <HeroSection />
      <FeaturesSection />
      <DemoSection />
      <DownloadSection />
      <TestimonialsSection />
      <FooterSection />
    </div>
  );
};

export default Index;
