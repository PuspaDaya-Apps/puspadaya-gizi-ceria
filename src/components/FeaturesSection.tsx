
import { ChartBar, Calendar, Bell } from 'lucide-react';
import FeatureCard from './FeatureCard';

const FeaturesSection = () => {
  return (
    <section id="features" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Fitur Utama</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Puspadaya hadir dengan fitur lengkap untuk memantau gizi dan tumbuh kembang si kecil secara menyeluruh
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <FeatureCard 
            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
            </svg>}
            title="Pemantauan Berat & Tinggi Badan"
            description="Catat dan pantau pertumbuhan fisik bayi Anda dengan grafik yang mudah dipahami"
          />
          
          <FeatureCard 
            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>}
            title="Rekomendasi Gizi Harian"
            description="Dapatkan saran menu makanan sesuai dengan kebutuhan gizi dan usia bayi Anda"
          />
          
          <FeatureCard 
            icon={<ChartBar size={48} />}
            title="Grafik Tumbuh Kembang Interaktif"
            description="Visualisasi interaktif perkembangan anak berdasarkan standar WHO"
          />
          
          <FeatureCard 
            icon={<Calendar size={48} />}
            title="Notifikasi Jadwal Imunisasi"
            description="Pengingat lengkap jadwal imunisasi sesuai dengan rekomendasi pedoman kesehatan"
          />
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
