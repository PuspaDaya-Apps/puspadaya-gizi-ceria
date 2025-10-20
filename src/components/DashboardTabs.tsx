"use client";
import React, { useState } from "react";
import DatasSectionBwi from "./DataSectionBwi";
import DatasSectionMaluku from "./DataSectionMaluku";

const DashboardTabs = () => {
  const [selectedWilayah, setSelectedWilayah] = useState("Banyuwangi");
  const [selectedDesa, setSelectedDesa] = useState("");
  const [selectedPosyandu, setSelectedPosyandu] = useState("");

  // Data dummy
  const dataWilayah = {
    Banyuwangi: {
      desa: ["Benculuk", "Sembulung", "Sraten", "Tampo"],
      posyandu: {
        Benculuk: [
          "MELATI 1",
          "Melati 2",
          "Melati 6",
          "Dahlia 2",
          "Melati 3",
          "Melati 4",
          "Nusa Indah 2",
          "Dahlia 1",
          "Dahlia 3",
          "Mawar 1",
          "Mawar 2",
          "Nusa Indah 1",
          "Melati 5",
        ],
        Sembulung: [
          "Mawar Ungu I",
          "Mawar Jingga II",
          "Mawar Merah I",
          "Mawar Putih I",
          "Mawar Putih II",
          "Mawar Jingga I",
          "Mawar Jingga III",
          "Mawar Merah II",
          "Mawar Ungu II",
        ],
        Sraten: [
          "Mawar Merah",
          "Anggrek Biru",
          "Anggrek Merah",
          "Anggrek Putih",
          "Anggrek Kuning",
          "Anggrek",
          "Mawar Kuning",
          "Anggrek Ungu",
          "Anggrek Jingga",
          "Mawar Putih",
          "Aggrek Biru",
        ],
        Tampo: [
          "Anggrek II",
          "Anggrek III",
          "Dahlia I",
          "Dahlia II",
          "Mawar I",
          "Mawar II",
          "Teratai",
          "Anggrek I",
        ],
      },
    },
    Maluku: {
      desa: ["Portho", "Haria", "Tiow", "Kulur", "Saparua"],
      posyandu: {
        Portho: ["Roos-Portho", "Cempaka-Portho", "Flamboyan", "Mawar-Portho"],
        Haria: ["Sakura-Haria", "Teratai-Haria", "Anggrek-Haria", "Aster-Haria", "Dahlia-Haria", "Dalies-Haria", "Matahari-Haria", "Melati-Haria"],
        Tiow: ["Kemiri-Tiow", "Kenari-Tiow"],
        Kulur: ["Mawar-Kulur"],
        Saparua: ["Melati-Saparua", "Anggrek-Saparua", "Kamboja-Saparua"]
      }
    }

  };

  const handleWilayahChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedWilayah(e.target.value);
    setSelectedDesa("");
    setSelectedPosyandu("");
  };

  const handleDesaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDesa(e.target.value);
    setSelectedPosyandu("");
  };

  const handlePosyanduChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedPosyandu(e.target.value);
  };

  return (
    <section id="dashboard" className="py-10">
      <div className="container mx-auto px-4">
        {/* Judul Dashboard */}
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-3">
            Dashboard Data Wilayah
          </h2>
          <p className="text-base text-gray-600 max-w-xl mx-auto">
            Pilih wilayah, desa, dan posyandu untuk melihat data pengguna, gizi,
            kesehatan, dan informasi lainnya secara interaktif.
          </p>
        </div>

        {/* Filter Horizontal */}
        <div className="bg-white shadow-lg rounded-xl p-6 mb-8 flex flex-col md:flex-row gap-5 justify-center items-center w-full max-w-4xl mx-auto">
          {/* Filter Wilayah */}
          <div className="relative w-full md:w-1/3">
            <label className="block text-sm font-medium text-gray-700 mb-1 ml-1">
              Wilayah
            </label>
            <select
              value={selectedWilayah}
              onChange={handleWilayahChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            >
              {Object.keys(dataWilayah).map((wilayah) => (
                <option key={wilayah} value={wilayah}>
                  {wilayah}
                </option>
              ))}
            </select>
          </div>

          {/* Filter Desa */}
          <div className="relative w-full md:w-1/3">
            <label className="block text-sm font-medium text-gray-700 mb-1 ml-1">
              Desa
            </label>
            <select
              value={selectedDesa}
              onChange={handleDesaChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            >
              <option value="">Semua Desa</option>
              {dataWilayah[selectedWilayah].desa.map((desa) => (
                <option key={desa} value={desa}>
                  {desa}
                </option>
              ))}
            </select>
          </div>

          {/* Filter Posyandu */}
          <div className="relative w-full md:w-1/3">
            <label className="block text-sm font-medium text-gray-700 mb-1 ml-1">
              Posyandu
            </label>
            <select
              value={selectedPosyandu}
              onChange={handlePosyanduChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
              disabled={!selectedDesa}
            >
              <option value="">Semua Posyandu</option>
              {selectedDesa &&
                dataWilayah[selectedWilayah].posyandu[selectedDesa]?.map(
                  (pos) => (
                    <option key={pos} value={pos}>
                      {pos}
                    </option>
                  )
                )}
            </select>
          </div>
        </div>

        {/* Section Data */}
        {selectedWilayah === "Banyuwangi" ? (
          <DatasSectionBwi
            region={selectedWilayah}
            desa={selectedDesa}
            posyandu={selectedPosyandu}
          />
        ) : (
          <DatasSectionMaluku
            region={selectedWilayah}
            desa={selectedDesa}
            posyandu={selectedPosyandu}
          />
        )}
      </div>
    </section>
  );
};

export default DashboardTabs;
