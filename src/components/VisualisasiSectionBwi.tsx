import React, { useRef } from "react";
import DistribusiPenggunaBwi from "./visualisasi/banyuwangi/DistribusiPengguna";
import CardInformation from "./visualisasi/CardInformation";
import DistribusiBalitaBwi from "./visualisasi/banyuwangi/DistribusiBalita";
import StatusGiziBwi from "./visualisasi/banyuwangi/StatusGizi";
import ChartSKDN from "./visualisasi/banyuwangi/ChartSKDN";
import ChartSKDNBwi from "./visualisasi/banyuwangi/ChartSKDN";

const VisualisasiSectionBwi = () => {


  return (
    <section id="visualisasi" className="py-10">
      {/* Chart Atas */}
      <div className="px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Pie Chart Gizi */}

          <StatusGiziBwi region="Banyuwangi" />

          {/* Pie Chart User */}
          <DistribusiPenggunaBwi region="Banyuwangi" />
        </div>
      </div>

      {/* Info Card */}
      <CardInformation />

      {/* Bar Chart Distribusi Balita */}
      <DistribusiBalitaBwi region="Banyuwangi" />

      {/* Chart SKDN */}

          <ChartSKDNBwi region="Banyuwangi" />
    </section>
  );
};

export default VisualisasiSectionBwi;
