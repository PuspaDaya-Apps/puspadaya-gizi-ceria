import React, { useRef } from "react";
import GeafikSkdnMlk from "./visualisasi/maluku/GrafikSKDN";

import GrafikSKDNMlk from "./visualisasi/maluku/GrafikSKDN";
import ProgresGiziMlk from "./visualisasi/maluku/ProgresGizi";
import MpasiMlk from "./visualisasi/maluku/Mpasi";
import AsiEklusifMlk from "./visualisasi/maluku/AsiEklusif";
import RestikIbuHamilMlk from "./visualisasi/maluku/RestikIbuHamil";
import ProgresIbuHamilMlk from "./visualisasi/maluku/ProgresIbuHamil";
import KompetensiBebanKerjaMlk from "./visualisasi/maluku/KompetensiBebanKerja";
import DurasiKunjunganRumahMlk from "./visualisasi/maluku/DurasiKunjunganRumahOld";
import StatusGiziMlk from "./visualisasi/maluku/StatusGizi";
import DurasiKunjunganAnakMlk from "./visualisasi/maluku/DurasiKunjunganAnak";
import DurasiKunjunganIbuHamilMlk from "./visualisasi/maluku/DurasiKunjunganIbuHamil";
import DurasiPelaksanaanPosyanduMlk from "./visualisasi/maluku/DurasiPelaksanaanPosyandu";



interface VisualisasiSectionMlkProps {
  region: string;
  desa?: string;
  posyandu?: string;
}

const VisualisasiSectionMaluku: React.FC<VisualisasiSectionMlkProps> = ({ region, desa, posyandu }) => {
  const barChartRef = useRef<HTMLDivElement>(null);

  return (
    <section id="visualisasi" className="py-10">
      {/* Chart Atas */}
      <div className="px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Pie Chart Gizi */}

          <StatusGiziMlk region={region} desa={desa} posyandu={posyandu} />

          {/* Pie Chart User */}
          <GrafikSKDNMlk region={region} desa={desa} posyandu={posyandu} />
        </div>
      </div>

      {/* Bar Chart Distribusi Balita */}
      <ProgresGiziMlk region={region} desa={desa} posyandu={posyandu} />

      <div className="px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <MpasiMlk region={region} desa={desa} posyandu={posyandu} />
          <AsiEklusifMlk region={region} desa={desa} posyandu={posyandu} />

        </div>
      </div>

      <RestikIbuHamilMlk region={region} desa={desa} posyandu={posyandu} />
      <ProgresIbuHamilMlk region={region} desa={desa} posyandu={posyandu} />

      <KompetensiBebanKerjaMlk region={region} desa={desa} posyandu={posyandu} />

      <div className="px-4 md:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          <DurasiKunjunganAnakMlk region={region} desa={desa} posyandu={posyandu} />
          <DurasiKunjunganIbuHamilMlk region={region} desa={desa} posyandu={posyandu} />
          <DurasiPelaksanaanPosyanduMlk region={region} desa={desa} posyandu={posyandu} />

        </div>
      </div>


    </section>
  );
};

export default VisualisasiSectionMaluku;
