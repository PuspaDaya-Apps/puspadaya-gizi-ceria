
import React from 'react';
import { Apple } from 'lucide-react';
import { Button } from '@/components/ui/button';

const DownloadSection = () => {
  return (
    <section className="py-20 bg-blue-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="w-full lg:w-1/2">
            <img 
              src="https://images.unsplash.com/photo-1516627145497-ae6968895b74?q=80&w=2040&auto=format&fit=crop" 
              alt="Anak menggunakan smartphone" 
              className="rounded-2xl shadow-lg max-w-md mx-auto"
            />
          </div>
          
          <div className="w-full lg:w-1/2 space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-primary">
              Unduh Aplikasi Puspadaya Sekarang
            </h2>
            <p className="text-lg text-gray-600">
              Dapatkan akses ke fitur lengkap untuk memantau tumbuh kembang Si Kecil dengan mengunduh aplikasi kami di platform pilihan Anda.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button className="btn btn-accent gap-2">
                <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
                </svg>
                Download di Google Play
              </Button>
              
              <Button variant="outline" className="btn btn-outline btn-accent gap-2">
                <Apple size={20} />
                Download di App Store
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DownloadSection;
