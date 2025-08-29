import React, { useRef } from "react";
import StatusGiziMlk from "./visualisasi/maluku/StatusGizi";
import GeafikSkdnMlk from "./visualisasi/maluku/GrafikSKDN";
import DistribusiBalitaMlk from "./visualisasi/maluku/DistribusiBalita";
import ChartSKDNMlk from "./visualisasi/maluku/ChartSKDN";
import GrafikSKDNMlk from "./visualisasi/maluku/GrafikSKDN";

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
          <GeafikSkdnMlk region="Maluku" />
        </div>
      </div>

      {/* Bar Chart Distribusi Balita */}
      <GrafikSKDNMlk region="Maluku" />

      {/* Chart SKDN */}
     <ChartSKDNMlk region="Maluku" />
    </section>
  );
};

export default VisualisasiSectionMaluku;
