import React, { useRef } from "react";
import StatusGiziMlk from "./visualisasi/maluku/StatusGizi";
import DistribusiPenggunaMlk from "./visualisasi/maluku/DistribusiPengguna";
import CardInformation from "./visualisasi/CardInformation";
import DistribusiBalitaMlk from "./visualisasi/maluku/DistribusiBalita";
import ChartSKDNMlk from "./visualisasi/maluku/ChartSKDN";

const VisualisasiSectionMaluku = () => {
  const barChartRef = useRef<HTMLDivElement>(null);

  return (
    <section id="visualisasi" className="py-10">
      {/* Chart Atas */}
      <div className="px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Pie Chart Gizi */}

          <StatusGiziMlk region="Maluku" />

          {/* Pie Chart User */}
          <DistribusiPenggunaMlk region="Maluku" />
        </div>
      </div>

      {/* Info Card */}
      <CardInformation />

      {/* Bar Chart Distribusi Balita */}
      <DistribusiBalitaMlk region="Maluku" />

      {/* Chart SKDN */}
     <ChartSKDNMlk region="Maluku" />
    </section>
  );
};

export default VisualisasiSectionMaluku;
