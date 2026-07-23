import React from "react";
import { Facebook, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react";
import ContactForm from "../ContactForm";
import { Link } from "react-router-dom";
import { navigationMenuTriggerStyle } from "../ui/navigation-menu";
import { cn } from "@/lib/utils";

const FooterSection = () => {
  return (
    <footer className="bg-gradient-to-br from-blue-900 to-indigo-900 text-white">
      {/* Contact Form and Map Section */}
      <div className="py-12 bg-blue-800/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Contact Form */}
            <div>
              <h3 className="text-2xl font-bold mb-6 text-white">
                Kirim Pesan Langsung
              </h3>
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                <ContactForm />
              </div>
            </div>

            {/* Google Maps Embed */}
            <div>
              <h3 className="text-2xl font-bold mb-6 text-white">
                Temukan Kami
              </h3>
              <div className="rounded-xl overflow-hidden shadow-lg border border-white/10">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!4v1768455341077!6m8!1m7!1sXzxNiWmfkhWklU5fCrTK2g!2m2!1d-8.232811602905475!2d114.3485164046211!3f232.6053457951457!4f-11.776089497032288!5f0.4000000000000002" 
                  width="100%"
                  height="256"
                  style={{border: 0}}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Puspadaya Location Map"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Contact Section */}
            <div>
              <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Hubungi Kami
              </h2>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Ada pertanyaan, saran, atau ingin berkolaborasi dengan
                Puspadaya? Jangan ragu untuk menghubungi tim kami.
              </p>

              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Mail className="text-blue-400 min-w-[20px]" size={20} />
                  <span className="text-gray-300">puspadayaofficial@gmail.com</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="text-blue-400 min-w-[20px]" size={20} />
                  <span className="text-gray-300">+62 851-4718-1601</span>
                </div>
                <div className="flex items-start space-x-3">
                  <MapPin className="text-blue-400 min-w-[20px] mt-1" size={20} />
                  <span className="text-gray-300">Jl. Cemara, Kebalenan, Kec. Banyuwangi, Kabupaten Banyuwangi, Jawa Timur 68417</span>
                </div>
              </div>
            </div>

            {/* Company Info */}
            <div>
              <h3 className="text-xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Puspadaya
              </h3>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Platform monitoring gizi dan tumbuh kembang bayi terbaik,
                dengan data berbasis standar kesehatan internasional dan
                rekomendasi dari ahli.
              </p>

              <div className="flex space-x-4">
                <a
                  href="#"
                  className="bg-blue-800 hover:bg-blue-700 p-2 rounded-full transition-all duration-300 transform hover:scale-110"
                  aria-label="Facebook"
                >
                  <Facebook size={20} />
                </a>
                <a
                  href="#"
                  className="bg-pink-800 hover:bg-pink-700 p-2 rounded-full transition-all duration-300 transform hover:scale-110"
                  aria-label="Instagram"
                >
                  <Instagram size={20} />
                </a>
                <a
                  href="#"
                  className="bg-blue-600 hover:bg-blue-500 p-2 rounded-full transition-all duration-300 transform hover:scale-110"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={20} />
                </a>
              </div>
            </div>

            {/* Navigation Links */}
            <div>
              <h4 className="text-lg font-semibold mb-6 text-blue-300">Navigasi</h4>
              <ul className="space-y-3">
                <li>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center"
                  >
                    <span className="mr-2">•</span> Beranda
                  </a>
                </li>
                <li>
                  <a
                    href="#features"
                    className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center"
                  >
                    <span className="mr-2">•</span> Fitur
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center"
                  >
                    <span className="mr-2">•</span> Tentang Kami
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center"
                  >
                    <span className="mr-2">•</span> Kontak
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center"
                  >
                    <span className="mr-2">•</span> Blog
                  </a>
                </li>
              </ul>
            </div>

            {/* Legal & Support */}
            <div>
              <h4 className="text-lg font-semibold mb-6 text-blue-300">Legal & Dukungan</h4>
              <ul className="space-y-3">
                <li>
                  <Link
                    to="/syaratdanketentuan"
                    className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center"
                  >
                    <span className="mr-2">•</span> Syarat & Ketentuan
                  </Link>
                </li>
                <li>
                  <Link
                    to="/kebijakanprivasi"
                    className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center"
                  >
                    <span className="mr-2">•</span> Kebijakan Privasi
                  </Link>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center"
                  >
                    <span className="mr-2">•</span> Panduan Pengguna
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center"
                  >
                    <span className="mr-2">•</span> FAQ
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center"
                  >
                    <span className="mr-2">•</span> Dukungan Pelanggan
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="py-6 bg-blue-950/80 border-t border-blue-800">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} Puspadaya. Hak Cipta Dilindungi.
            </p>
            <div className="mt-4 md:mt-0">
              <p className="text-gray-400 text-sm">
                Platform Monitoring Gizi & Tumbuh Kembang Bayi Terpercaya
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
