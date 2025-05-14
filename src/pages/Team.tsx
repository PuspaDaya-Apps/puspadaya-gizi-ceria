
import React from 'react';
import Navigation from '@/components/Navigation';
import TeamSection from '@/components/TeamSection';
import FooterSection from '@/components/FooterSection';

const Team = () => {
  return (
    <div className="font-poppins">
      <Navigation />
      <div className="pt-16">
        <div className="bg-blue-50 py-16">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold text-primary text-center">
              Tim Puspadaya
            </h1>
            <p className="text-lg text-gray-600 text-center mt-4 max-w-2xl mx-auto">
              Berkenalan dengan para ahli di balik aplikasi Puspadaya
            </p>
          </div>
        </div>
        <TeamSection />
      </div>
      <FooterSection />
    </div>
  );
};

export default Team;
