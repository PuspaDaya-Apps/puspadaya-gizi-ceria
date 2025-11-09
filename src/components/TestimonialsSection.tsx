
import React from 'react';
import TestimonialCarousel from './TestimonialCarousel';

const TestimonialsSection = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Testimoni Kader Gizi</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Lihat bagaimana Puspadaya telah membantu para kader dalam mengelola dan menyediakan informasi gizi kepada masyarakat
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <TestimonialCarousel />
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
