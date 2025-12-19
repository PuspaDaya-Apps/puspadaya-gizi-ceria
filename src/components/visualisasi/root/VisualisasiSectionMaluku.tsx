import React, { useRef } from "react";
import GeafikSkdnMlk from "../maluku/GrafikSKDN";

import GrafikSKDNMlk from "../maluku/GrafikSKDN";
import ProgresGiziMlk from "../maluku/ProgresGizi";
import MpasiMlk from "../maluku/Mpasi";
import AsiEklusifMlk from "../maluku/AsiEklusif";
import RestikIbuHamilMlk from "../maluku/RestikIbuHamil";
import ProgresIbuHamilMlk from "../maluku/ProgresIbuHamil";
import KompetensiBebanKerjaMlk from "../maluku/KompetensiBebanKerja";
import DurasiKunjunganRumahMlk from "../maluku/DurasiKunjunganRumahOld";
import StatusGiziMlk from "../maluku/StatusGizi";
import DurasiKunjunganAnakMlk from "../maluku/DurasiKunjunganAnak";
import DurasiKunjunganIbuHamilMlk from "../maluku/DurasiKunjunganIbuHamil";
import DurasiPelaksanaanPosyanduMlk from "../maluku/DurasiPelaksanaanPosyandu";



interface VisualisasiSectionBwiProps {
  region: string;
  desa: string;
  posyandu: string;
  month: number;
  year: number;
}

const VisualisasiSectionMaluku: React.FC<VisualisasiSectionBwiProps> = ({ region, desa, posyandu, month, year }) => {
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
