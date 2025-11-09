import React from "react";
import FeatureCard from "./cardcomponents/FeatureCard";
import { BarChart3, Calendar } from "lucide-react";
import DataCard from "./cardcomponents/DataCard";
import DatasSection from "./DataSectionBwi";
import DatasSectionBwi from "./DataSectionBwi";
import DatasSectionMaluku from "./DataSectionMaluku";
import DashboardTabs from "./DashboardTabs";

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
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
                  />
                </svg>
              }
              title="Pemantauan Berat & Tinggi Badan"
              description="Catat dan pantau pertumbuhan fisik bayi Anda dengan grafik yang mudah dipahami"
            />

            <FeatureCard
              icon={
                <svg
                  fill="#1e40af"
                  xmlns="http://www.w3.org/2000/svg"
                  width="50px"
                  height="50px"
                  viewBox="0 0 80 80"
                >
                  <g id="SVGRepo_bgCarrier" stroke-width="0" />

                  <g
                    id="SVGRepo_tracerCarrier"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />

                  <g id="SVGRepo_iconCarrier">
                    {" "}
                    <path d="M30,58c-1.1,0-2-0.9-2-2v-2c0-1.1,0.9-2,2-2h20c0.5,0,0.9,0.2,1.3,0.5C54.5,49,59,46.6,64,46.1V26 c0-3.3-2.7-6-6-6H26c-3.3,0-6,2.7-6,6v34c0,3.3,2.7,6,6,6h20c0-2.8,0.6-5.5,1.7-8H30z M28,30c0-1.1,0.9-2,2-2h20c1.1,0,2,0.9,2,2v2 c0,1.1-0.9,2-2,2H30c-1.1,0-2-0.9-2-2V30z M28,42c0-1.1,0.9-2,2-2h24c1.1,0,2,0.9,2,2v2c0,1.1-0.9,2-2,2H30c-1.1,0-2-0.9-2-2V42z" />{" "}
                    <path d="M66,52c-7.7,0-14,6.3-14,14s6.3,14,14,14s14-6.3,14-14S73.7,52,66,52z M73.9,62.5c0,0-8.9,9.7-8.9,9.7 c-0.4,0.4-0.8,0.6-1.4,0.6c-0.5,0-1-0.2-1.4-0.6l-4.8-4.7c-0.4-0.4-0.4-1,0-1.3l1.4-1.3c0.4-0.4,1-0.4,1.4,0l3.4,3.4l7.5-8.4 c0.4-0.4,1-0.4,1.4,0l1.4,1.3C74.2,61.5,74.2,62.2,73.9,62.5z" />{" "}
                  </g>
                </svg>
              }
              title="Pemantauan Kunjungan Posyandu"
              description="Pantau kehadiran balita, kasus stunting, dan kondisi ibu hamil."
            />

            <FeatureCard
              icon={<BarChart3 size={48} />}
              title="Grafik Tumbuh Kembang Interaktif"
              description="Visualisasi interaktif untuk memantau perkembangan anak secara optimal."
            />

            <FeatureCard
              icon={
                <svg
                  className="h-12 w-12"
                  viewBox="0 0 24 24"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#1e40af"
                >
                  <g id="SVGRepo_bgCarrier" stroke-width="0" />
                  <g
                    id="SVGRepo_tracerCarrier"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <g id="SVGRepo_iconCarrier">
                    <title>notification_bell [#1e40af]</title>
                    <desc>Created with Sketch.</desc>
                    <defs />
                    <g
                      id="Page-1"
                      stroke="none"
                      stroke-width="1"
                      fill="none"
                      fill-rule="evenodd"
                    >
                      <g
                        id="Dribbble-Light-Preview"
                        transform="translate(-221.000000, -720.000000)"
                        fill="#1e40af"
                      >
                        <g
                          id="icons"
                          transform="translate(56.000000, 160.000000)"
                        >
                          <path
                            d="M177.75,574 L169.25,574 L169.25,568 C169.25,565.334 171.375,564 173.498937,564 L173.501063,564 C175.625,564 177.75,565.334 177.75,568 L177.75,574 Z M174.5625,577 C174.5625,577.552 174.0865,578 173.5,578 C172.9135,578 172.4375,577.552 172.4375,577 L172.4375,576 L174.5625,576 L174.5625,577 Z M179.875,572 L179.875,568 C179.875,564.447 177.359,562.475 174.5625,562.079 L174.5625,560 L172.4375,560 L172.4375,562.079 C169.641,562.475 167.125,564.447 167.125,568 L167.125,572 C167.125,573.105 166.174062,574 165,574 L165,576 L170.3125,576 L170.3125,577 C170.3125,578.657 171.739437,580 173.5,580 C175.260563,580 176.6875,578.657 176.6875,577 L176.6875,576 L182,576 L182,574 C180.825938,574 179.875,573.105 179.875,572 L179.875,572 Z"
                            id="notification_bell-[#1e40af]"
                          />
                        </g>
                      </g>
                    </g>
                  </g>
                </svg>
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
