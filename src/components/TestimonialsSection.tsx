
import React from 'react';
import TestimonialCard from './TestimonialCard';

const TestimonialsSection = () => {
  const testimonials = [
    {
      quote: "Berkat Puspadaya, saya jadi lebih memahami kebutuhan gizi anak saya. Grafik pertumbuhannya sangat membantu!",
      author: "Anindita Pratiwi",
      role: "Ibu dari Kirana, 14 bulan",
      imageUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop"
    },
    {
      quote: "Aplikasi yang sangat mudah digunakan dan informatif. Rekomendasi menu hariannya sangat membantu untuk variasi MPASI.",
      author: "Bayu Nugroho",
      role: "Ayah dari Arjuna, 10 bulan",
      imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop"
    },
    {
      quote: "Sebagai dokter anak, saya merekomendasikan Puspadaya untuk para orangtua. Data pertumbuhan yang akurat dan mudah dipantau.",
      author: "dr. Sari Dewi, Sp.A",
      role: "Dokter Spesialis Anak",
      imageUrl: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=2070&auto=format&fit=crop"
    }
  ];

  return (
    <section className="py-20 bg-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Testimoni Pengguna</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Lihat bagaimana Puspadaya telah membantu ribuan orang tua di Indonesia
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              quote={testimonial.quote}
              author={testimonial.author}
              role={testimonial.role}
              imageUrl={testimonial.imageUrl}
            />
          ))}
        </div>
        
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-center text-primary mb-8">Dipercaya Oleh</h3>
          <div className="flex flex-wrap justify-center gap-8 items-center">
            <div className="h-16 flex items-center justify-center">
              <span className="text-accent text-3xl font-bold">KemenkesRI</span>
            </div>
            <div className="h-16 flex items-center justify-center">
              <span className="text-primary text-3xl font-bold">UNICEF</span>
            </div>
            <div className="h-16 flex items-center justify-center">
              <span className="text-blue-800 text-3xl font-bold">WHO</span>
            </div>
            <div className="h-16 flex items-center justify-center">
              <span className="text-accent text-3xl font-bold">IDAI</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
