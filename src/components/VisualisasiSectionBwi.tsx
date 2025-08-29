import React, { useRef } from "react";
import StatusGiziBwi from "./visualisasi/banyuwangi/StatusGizi";
import GrafikSKDNBwi from "./visualisasi/banyuwangi/GrafikSKDN";
import ProgresGiziBwi from "./visualisasi/banyuwangi/ProgresGizi";
import MpasiAsielkusifBwi from "./visualisasi/banyuwangi/Mpasi";
import AsiEKlusifBwi from "./visualisasi/banyuwangi/AsiEklusif";
import RestikIbuHamil from "./visualisasi/banyuwangi/RestikIbuHamil";
import ProgresIbuHamilBwi from "./visualisasi/banyuwangi/ProgresIbuHamil";
import KompetensiBebanKerja from "./visualisasi/banyuwangi/KompetensiBebanKerja";
import DurasiKunjunganRumahBwi from "./visualisasi/banyuwangi/DurasiKunjunganRumah";
import DurasiPelaksanaanPosyanduBwi from "./visualisasi/banyuwangi/DurasiPelaksanaanPosyandu";

interface VisualisasiSectionBwiProps {
  region: string;
  desa?: string;
  posyandu?: string;
}

const VisualisasiSectionBwi: React.FC<VisualisasiSectionBwiProps> = ({ region, desa, posyandu }) => {


  return (
    <section id="visualisasi" className="py-10">
      {/* Chart Atas */}
      <div className="px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Pie Chart Gizi */}

          <StatusGiziBwi region={region} desa={desa} posyandu={posyandu} />

          {/* Pie Chart User */}
          <GrafikSKDNBwi region={region} desa={desa} posyandu={posyandu}  />
        </div>
      </div>

      {/* Bar Chart Distribusi Balita */}
      <ProgresGiziBwi region={region} desa={desa} posyandu={posyandu} />

      <div className="px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <MpasiAsielkusifBwi region="Banyuwangi" />
          <AsiEKlusifBwi region="Banyuwangi" />

        </div>
      </div>

       <RestikIbuHamil region="Banyuwangi" />
       <ProgresIbuHamilBwi region="Banyuwangi" />

       <KompetensiBebanKerja region={region} desa={desa} posyandu={posyandu}/>

      <div className="px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <DurasiKunjunganRumahBwi region="Banyuwangi" />
          <DurasiPelaksanaanPosyanduBwi region="Banyuwangi" />

        </div>
      </div>


    </section>
  );
};

export default VisualisasiSectionBwi;
