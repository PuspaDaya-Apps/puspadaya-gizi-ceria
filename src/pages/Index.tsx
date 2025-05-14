
import React from 'react';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import FeaturesSection from '@/components/FeaturesSection';
import DownloadSection from '@/components/DownloadSection';
import DemoSection from '@/components/DemoSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import TeamSection from '@/components/TeamSection';
import FooterSection from '@/components/FooterSection';

const Index = () => {
  return (
    <div className="font-poppins">
      <Navigation />
      <HeroSection />
      <FeaturesSection />
      <DemoSection />
      <DownloadSection />
      <TestimonialsSection />
      <TeamSection />
      <FooterSection />
    </div>
  );
};

export default Index;
