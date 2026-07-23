import React from "react";
import FeatureCard from "./cardcomponents/FeatureCard";
import { BarChart3, Calendar, Baby, Stethoscope, TrendingUp, Users } from "lucide-react";
import DataCard from "./cardcomponents/DataCard";
import DatasSection from "./visualisasi/root/DataSectionBwi";
import DatasSectionBwi from "./visualisasi/root/DataSectionBwi";
import DatasSectionMaluku from "./visualisasi/root/DataSectionMaluku";
import DashboardTabs from "./visualisasi/root/DashboardTabs";

const FeaturesSection = () => {
  return (
    <section id="features" className="py-16">
      <div className="container mx-auto px-4">

        <div className="bg-blue-50 rounded-2xl p-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              Fitur Utama
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Puspadaya hadir dengan fitur lengkap untuk memantau gizi dan tumbuh
              kembang si kecil secara menyeluruh
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureCard
              icon={
                <div className="p-3 bg-blue-100 rounded-full">
                  <TrendingUp className="h-12 w-12 text-blue-600" />
                </div>
              }
              title="Pemantauan Berat & Tinggi Badan"
              description="Catat dan pantau pertumbuhan fisik bayi Anda dengan grafik yang mudah dipahami"
            />

            <FeatureCard
              icon={
                <div className="p-3 bg-green-100 rounded-full">
                  <Users className="h-12 w-12 text-green-600" />
                </div>
              }
              title="Pemantauan Kunjungan Posyandu"
              description="Pantau kehadiran balita, kasus stunting, dan kondisi ibu hamil."
            />

            <FeatureCard
              icon={
                <div className="p-3 bg-purple-100 rounded-full">
                  <BarChart3 className="h-12 w-12 text-purple-600" />
                </div>
              }
              title="Grafik Tumbuh Kembang Interaktif"
              description="Visualisasi interaktif untuk memantau perkembangan anak secara optimal."
            />

            <FeatureCard
              icon={
                <div className="p-3 bg-amber-100 rounded-full">
                  <Stethoscope className="h-12 w-12 text-amber-600" />
                </div>
              }
              title="Notifikasi Persalinan Ibu Hamil"
              description="Pengingat jadwal konsultasi dan tips persalinan aman."
            />
          </div>
        </div>
      </div>
      <DashboardTabs />



    </section>
  );
};

export default FeaturesSection;
