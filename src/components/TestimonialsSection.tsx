
import React from 'react';
import TestimonialCarousel from './TestimonialCarousel';

const TestimonialsSection = () => {
  return (
    <section className="py-12 sm:py-16 bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary mb-3 sm:mb-4 px-2">Testimoni Kader Gizi</h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto px-4 sm:px-0">
            Lihat bagaimana Puspadaya telah membantu para kader dalam mengelola dan menyediakan informasi gizi kepada masyarakat
          </p>
        </div>

        <div className="max-w-6xl mx-auto px-2 sm:px-0">
          <TestimonialCarousel />
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
