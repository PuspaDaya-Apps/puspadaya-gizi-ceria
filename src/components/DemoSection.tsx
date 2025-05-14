
import React from 'react';

const DemoSection = () => {
  return (
    <section id="demo" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="border-t-4 border-yellow-400 p-8 rounded-2xl shadow-md max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-primary mb-8 text-center">Lihat Bagaimana Puspadaya Bekerja</h2>
          
          <div className="aspect-w-16 aspect-h-9 rounded-xl overflow-hidden">
            <iframe 
              className="w-full h-full min-h-[400px]"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
              title="Puspadaya App Demo"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen>
            </iframe>
          </div>
          
          <p className="text-blue-600 mt-6 font-medium text-center">Monitoring si kecil jadi lebih mudah</p>
        </div>
      </div>
    </section>
  );
};

export default DemoSection;
