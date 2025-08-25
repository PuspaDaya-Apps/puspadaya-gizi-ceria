import React, { useRef } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { MoreVertical } from "lucide-react";
import * as htmlToImage from "html-to-image";
import StatusGiziMlk from "./visualisasi/maluku/StatusGizi";
import DistribusiPenggunaMlk from "./visualisasi/maluku/DistribusiPengguna";
import CardInformation from "./visualisasi/CardInformation";
import DistribusiBalitaMlk from "./visualisasi/maluku/DistribusiBalita";

const VisualisasiSectionMaluku = () => {
  const barChartRef = useRef<HTMLDivElement>(null);
  const skdnChartRef = useRef<HTMLDivElement>(null);

  const handleDownload = async (format: "png" | "jpeg") => {
    if (!barChartRef.current) return;

    const options = { backgroundColor: "#ffffff" }; // putih

    const dataUrl =
      format === "png"
        ? await htmlToImage.toPng(barChartRef.current, options)
        : await htmlToImage.toJpeg(barChartRef.current, {
            quality: 0.95,
            backgroundColor: "#ffffff",
          });

    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = `barchart.${format}`;
    link.click();
  };

  // Data Bar Chart Balita
  const desaData = [
    { name: "Desa A", stunting: 30, wasting: 20, underweight: 15 },
    { name: "Desa B", stunting: 25, wasting: 10, underweight: 20 },
    { name: "Desa C", stunting: 40, wasting: 15, underweight: 30 },
    { name: "Desa D", stunting: 20, wasting: 25, underweight: 10 },
  ];

  // Data SKDN (contoh)
  const skdnData = [{ name: "Agustus", S: 200, K: 150, D: 110, N: 50 }];

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
      <div className="bg-white rounded-2xl shadow p-6 relative">
        {/* Header + Burger Menu */}

        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
          <h3 className="text-xl font-semibold text-primary text-center w-full">
            Grafik SKDN Bulan Agustus
          </h3>

          <Menu as="div" className="relative inline-block text-left">
            <MenuButton className="p-2 rounded-full hover:bg-gray-100">
              <MoreVertical className="w-5 h-5 text-gray-600" />
            </MenuButton>
            <MenuItems className="absolute right-0 mt-2 w-44 origin-top-right bg-white border border-gray-200 rounded-lg shadow-lg focus:outline-none">
              <MenuItem>
                {({ active }) => (
                  <button
                    onClick={() => handleDownload("png")}
                    className={`${
                      active ? "bg-gray-100" : ""
                    } w-full px-4 py-2 text-left text-sm text-gray-700`}
                  >
                    Download PNG
                  </button>
                )}
              </MenuItem>
              <MenuItem>
                {({ active }) => (
                  <button
                    onClick={() => handleDownload("jpeg")}
                    className={`${
                      active ? "bg-gray-100" : ""
                    } w-full px-4 py-2 text-left text-sm text-gray-700`}
                  >
                    Download JPG
                  </button>
                )}
              </MenuItem>
            </MenuItems>
          </Menu>
        </div>

        {/* Chart Wrapper */}
        {/* Chart Wrapper */}
        <div ref={skdnChartRef} className="bg-white p-4 rounded-lg">
          <ResponsiveContainer width="100%" height={400}>
            <BarChart
              data={skdnData}
              margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="S" fill="#3b82f6" />
              <Bar dataKey="K" fill="#10b981" />
              <Bar dataKey="D" fill="#f59e0b" />
              <Bar dataKey="N" fill="#ef4444" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Keterangan SKDN */}
        <div className="p-4 bg-gray-50 rounded-lg text-sm text-gray-700 flex justify-center gap-6">
          <p>
            <span className="font-bold text-blue-600">S</span> = Sasaran
          </p>
          <p>
            <span className="font-bold text-green-600">K</span> = Kunjungan
          </p>
          <p>
            <span className="font-bold text-yellow-600">D</span> = Ditimbang
          </p>
          <p>
            <span className="font-bold text-red-600">N</span> = Naik Berat Badan
          </p>
        </div>
      </div>
    </section>
  );
};

export default VisualisasiSectionMaluku;
