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

const VisualisasiSectionBwi = () => {
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

  // Pie Chart Status Gizi
  const nutritionData = [
    { name: "Stunting", value: 35 },
    { name: "Wasting", value: 20 },
    { name: "Underweight", value: 25 },
  ];
  const COLORS = ["#ef4444", "#f59e0b", "#1e40af"];

  // Pie Chart User
  const userData = [
    { name: "Kader", value: 120 },
    { name: "Ketua Kader", value: 30 },
  ];
  const USER_COLORS = ["#3b82f6", "#10b981"];

  // Info data
  const infoData = {
    totalUser: 150,
    desaMaluku: 20,
    desaBanyuwangi: 15,
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
          <div className="bg-white rounded-2xl shadow p-6">
            <h3 className="text-xl font-semibold text-primary mb-4 text-center">
              Status Gizi Balita
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={nutritionData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                >
                  {nutritionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Pie Chart User */}
          <div className="bg-white rounded-2xl shadow p-6">
            <h3 className="text-xl font-semibold text-primary mb-4 text-center">
              Distribusi Pengguna
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={userData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                >
                  {userData.map((entry, index) => (
                    <Cell
                      key={`cell-user-${index}`}
                      fill={USER_COLORS[index]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Info Card */}
      <div className="px-4 md:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-blue-50 rounded-2xl shadow p-6 text-center">
            <h4 className="text-lg font-semibold text-gray-700">
              Jumlah Puskesmas Terdaftar di Maluku
            </h4>
            <p className="text-2xl font-bold text-blue-600">
              {infoData.totalUser}
            </p>
          </div>
          <div className="bg-blue-50 rounded-2xl shadow p-6 text-center">
            <h4 className="text-lg font-semibold text-gray-700">
              Jumlah Puskesmas Terdaftar di Banyuwangi
            </h4>
            <p className="text-2xl font-bold text-blue-600">
              {infoData.totalUser}
            </p>
          </div>
          <div className="bg-green-50 rounded-2xl shadow p-6 text-center">
            <h4 className="text-lg font-semibold text-gray-700">
              Jumlah Desa Maluku Terdaftar
            </h4>
            <p className="text-2xl font-bold text-green-600">
              {infoData.desaMaluku}
            </p>
          </div>
          <div className="bg-yellow-50 rounded-2xl shadow p-6 text-center">
            <h4 className="text-lg font-semibold text-gray-700">
              Jumlah Desa Banyuwangi Terdaftar
            </h4>
            <p className="text-2xl font-bold text-yellow-600">
              {infoData.desaBanyuwangi}
            </p>
          </div>
        </div>
      </div>

      {/* Bar Chart Distribusi Balita */}
      <div className="bg-white rounded-2xl shadow p-6 relative mb-8">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
          <h3 className="text-xl font-semibold text-primary text-center w-full">
            Distribusi Balita per Desa
          </h3>

          {/* Burger Button */}
          <Menu as="div" className="relative inline-block text-left">
            <MenuButton className="p-2 rounded-full hover:bg-gray-100">
              <MoreVertical className="w-5 h-5 text-gray-600" />
            </MenuButton>
            <MenuItems className="absolute right-0 mt-2 w-40 origin-top-right bg-white border border-gray-200 rounded-lg shadow-lg focus:outline-none">
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

        <div
          ref={barChartRef}
          className="bg-white p-6 rounded-lg"
          style={{ width: "100%" }}
        >
          <ResponsiveContainer width="100%" height={400}>
            <BarChart
              layout="vertical"
              data={desaData}
              margin={{ top: 20, right: 30, left: 40, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="name" type="category" />
              <Tooltip />
              <Legend />
              <Bar dataKey="stunting" fill="#ef4444" />
              <Bar dataKey="wasting" fill="#f59e0b" />
              <Bar dataKey="underweight" fill="#1e40af" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

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

export default VisualisasiSectionBwi;
