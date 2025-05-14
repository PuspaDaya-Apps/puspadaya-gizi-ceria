
import React from 'react';

const DemoSection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="border-t-4 border-yellow-400 p-8 rounded-2xl shadow-md max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-primary mb-8 text-center">Lihat Bagaimana Puspadaya Bekerja</h2>
          
          <div className="aspect-w-16 aspect-h-9 rounded-xl overflow-hidden">
            <div className="w-full h-96 bg-blue-50 rounded-xl flex items-center justify-center">
              {/* This would be a Lottie animation in production */}
              <div className="text-center">
                <div className="inline-block animate-float">
                  <img 
                    src="https://images.unsplash.com/photo-1580824456622-8afcd66abb95?q=80&w=2070&auto=format&fit=crop" 
                    alt="Demo aplikasi Puspadaya" 
                    className="w-full max-w-md rounded-xl shadow-lg mx-auto"
                  />
                </div>
                <p className="text-blue-600 mt-6 font-medium">Monitoring si kecil jadi lebih mudah</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DemoSection;
