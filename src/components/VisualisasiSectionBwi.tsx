import React, { useRef } from "react";
import DistribusiBalitaBwi from "./visualisasi/banyuwangi/DistribusiBalita";
import StatusGiziBwi from "./visualisasi/banyuwangi/StatusGizi";
import ChartSKDNBwi from "./visualisasi/banyuwangi/ChartSKDN";
import GrafikSKDNBwi from "./visualisasi/banyuwangi/GrafikSKDN";
import ProgresGiziBwi from "./visualisasi/banyuwangi/ProgresGizi";
import MpasiAsielkusifBwi from "./visualisasi/banyuwangi/Mpasi";
import AsiEKlusifBwi from "./visualisasi/banyuwangi/AsiEklusif";
import RestikIbuHamil from "./visualisasi/banyuwangi/RestikIbuHamil";
import ProgresIbuHamilBwi from "./visualisasi/banyuwangi/ProgresIbuHamil";

const VisualisasiSectionBwi = () => {


  return (
    <section id="visualisasi" className="py-10">
      {/* Chart Atas */}
      <div className="px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Pie Chart Gizi */}

          <StatusGiziBwi region="Banyuwangi" />

          {/* Pie Chart User */}
          <GrafikSKDNBwi region="Banyuwangi" />
        </div>
      </div>

      {/* Bar Chart Distribusi Balita */}
      <ProgresGiziBwi region="Banyuwangi" />

      <div className="px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <MpasiAsielkusifBwi region="Banyuwangi" />
          <AsiEKlusifBwi region="Banyuwangi" />

        </div>
      </div>

       <RestikIbuHamil region="Banyuwangi" />
       <ProgresIbuHamilBwi region="Banyuwangi" />

      <DistribusiBalitaBwi region="Banyuwangi" />

      {/* Chart SKDN */}

          <ChartSKDNBwi region="Banyuwangi" />
    </section>
  );
};

export default VisualisasiSectionBwi;
