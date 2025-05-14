
import React from 'react';
import { Facebook, Instagram, Linkedin } from 'lucide-react';
import ContactForm from './ContactForm';

const FooterSection = () => {
  return (
    <footer>
      <div className="bg-blue-50 py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-12">
            <div className="w-full lg:w-1/2">
              <h2 className="text-3xl font-bold text-primary mb-6">Hubungi Kami</h2>
              <p className="text-gray-600 mb-6">
                Ada pertanyaan, saran, atau ingin berkolaborasi dengan Puspadaya? Jangan ragu untuk menghubungi tim kami.
              </p>
              
              <div className="card bg-blue-50 border border-blue-100">
                <div className="card-body">
                  <ContactForm />
                </div>
              </div>
            </div>
            
            <div className="w-full lg:w-1/2 flex flex-col justify-between">
              <div>
                <h3 className="text-2xl font-bold text-primary mb-6">Puspadaya</h3>
                <p className="text-gray-600 mb-6">
                  Platform monitoring gizi dan tumbuh kembang bayi terbaik, dengan data berbasis standar kesehatan internasional dan rekomendasi dari ahli.
                </p>
                
                <div className="grid grid-cols-2 gap-8 mb-8">
                  <div>
                    <h4 className="font-bold text-blue-600 mb-4">Navigasi</h4>
                    <ul className="space-y-2">
                      <li><a href="#" className="text-gray-600 hover:text-primary">Beranda</a></li>
                      <li><a href="#features" className="text-gray-600 hover:text-primary">Fitur</a></li>
                      <li><a href="#" className="text-gray-600 hover:text-primary">Tentang Kami</a></li>
                      <li><a href="#" className="text-gray-600 hover:text-primary">Kontak</a></li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-bold text-blue-600 mb-4">Legal</h4>
                    <ul className="space-y-2">
                      <li><a href="#" className="text-gray-600 hover:text-primary">Syarat & Ketentuan</a></li>
                      <li><a href="#" className="text-gray-600 hover:text-primary">Kebijakan Privasi</a></li>
                      <li><a href="#" className="text-gray-600 hover:text-primary">FAQ</a></li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-bold text-blue-600 mb-4">Ikuti Kami</h4>
                <div className="flex space-x-4">
                  <a href="#" className="text-blue-500 hover:text-primary">
                    <Facebook size={24} />
                  </a>
                  <a href="#" className="text-blue-500 hover:text-primary">
                    <Instagram size={24} />
                  </a>
                  <a href="#" className="text-blue-500 hover:text-primary">
                    <Linkedin size={24} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-primary py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-xs text-white">
              © {new Date().getFullYear()} Puspadaya. Hak Cipta Dilindungi.
            </p>
            <p className="text-xs text-white">
              Jl. Kesehatan No. 123, Jakarta Selatan, Indonesia
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
