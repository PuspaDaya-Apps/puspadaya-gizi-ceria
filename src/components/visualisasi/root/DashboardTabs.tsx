"use client";
import React, { useState, useEffect, useRef } from "react";
import DatasSectionBwi from "./DataSectionBwi";
import DatasSectionMaluku from "./DataSectionMaluku";

// --- COMPONENTS ---
const MapPinIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>
);
const BuildingIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="16" height="20" x="4" y="2" rx="2" ry="2" /><path d="M9 22v-4h6v4" /><path d="M8 6h.01" /><path d="M16 6h.01" /><path d="M8 10h.01" /><path d="M16 10h.01" /><path d="M8 14h.01" /><path d="M16 14h.01" /></svg>
);
const HomeIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>
);
const CalendarIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="18" height="18" x="3" y="4" rx="2" ry="2" /><line x1="16" x2="16" y1="2" y2="6" /><line x1="8" x2="8" y1="2" y2="6" /><line x1="3" x2="21" y1="10" y2="10" /></svg>
);
const FilterIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" /></svg>
);
const ChevronDownIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m6 9 6 6 6-6"/></svg>
);

const DashboardTabs = () => {
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonthStr = String(now.getMonth() + 1).padStart(2, '0');
  const currentPeriodValue = `${currentYear}-${currentMonthStr}`;

  const dateInputRef = useRef<HTMLInputElement>(null);

  const [selectedWilayah, setSelectedWilayah] = useState("Banyuwangi");
  const [selectedDesa, setSelectedDesa] = useState("");
  const [selectedPosyandu, setSelectedPosyandu] = useState("");
  const [selectedPeriod, setSelectedPeriod] = useState(currentPeriodValue);

  type DataWilayahType = {
    [key: string]: {
      desa: string[];
      posyandu: { [key: string]: string[] };
    };
  };

  const dataWilayah: DataWilayahType = {
    Banyuwangi: {
      desa: ["Benculuk", "Sembulung", "Sraten", "Tampo"],
      posyandu: {
        Benculuk: ["MELATI 1", "Melati 2", "Melati 6", "Dahlia 2", "Melati 3", "Melati 4", "Nusa Indah 2", "Dahlia 1", "Dahlia 3", "Mawar 1", "Mawar 2", "Nusa Indah 1", "Melati 5"],
        Sembulung: ["Mawar Ungu I", "Mawar Jingga II", "Mawar Merah I", "Mawar Putih I", "Mawar Putih II", "Mawar Jingga I", "Mawar Jingga III", "Mawar Merah II", "Mawar Ungu II"],
        Sraten: ["Mawar Merah", "Anggrek Merah", "Anggrek Putih", "Anggrek Kuning", "Anggrek", "Mawar Kuning", "Anggrek Ungu", "Anggrek Jingga", "Mawar Putih", "Aggrek Biru"],
        Tampo: ["Anggrek II", "Anggrek III", "Dahlia I", "Dahlia II", "Mawar I", "Mawar II", "Teratai", "Anggrek I"],
      },
    },
    Maluku: {
      desa: ["Portho", "Haria", "Tiow", "Kulur", "Saparua"],
      posyandu: {
        Portho: ["Roos-Portho", "Cempaka-Portho", "Flamboyan", "Mawar-Portho"],
        Haria: ["Sakura-Haria", "Teratai-Haria", "Anggrek-Haria", "Aster-Haria", "Dahlia-Haria", "Dalies-Haria", "Matahari-Haria", "Melati-Haria"],
        Tiow: ["Kemiri-Tiow", "Kenari-Tiow"],
        Kulur: ["Mawar-Kulur"],
        Saparua: ["Melati-Saparua", "Anggrek-Saparua", "Kamboja-Saparua"],
      },
    },
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

  const handleDateClick = () => {
    if (dateInputRef.current) {
        try { dateInputRef.current.showPicker(); } 
        catch (error) { dateInputRef.current.focus(); }
    }
  };

  useEffect(() => {
    setSelectedPeriod(currentPeriodValue);
  }, [selectedWilayah]);

  const getValuesToSend = () => {
    if (!selectedPeriod) return { month: 0, year: 0 };

    const [yearStr, monthStr] = selectedPeriod.split("-");
    return {
        month: parseInt(monthStr),
        year: parseInt(yearStr)
    };
  };

  const valuesToSend = getValuesToSend();

  // Helper UI
  const getPeriodLabel = () => {
    if (!selectedPeriod) return "Pilih Periode";
    const [y, m] = selectedPeriod.split("-");
    const date = new Date(parseInt(y), parseInt(m) - 1);
    return date.toLocaleDateString("id-ID", { month: "long", year: "numeric" });
  };

  const isRealtime = selectedPeriod === currentPeriodValue;

  // Styles
  const selectWrapperClass = "relative group";
  const selectIconClass = "absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-indigo-600 transition-colors duration-200";
  const selectWithIconClass = "w-full py-3 bg-gray-50 border border-gray-200 text-gray-700 text-sm rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all duration-200 hover:bg-white hover:border-gray-300 appearance-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed pl-10 pr-10";
  const chevronClass = "absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none";

  return (
    <section id="dashboard" className="py-12 bg-gray-50/50 min-h-screen">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Dashboard Monitoring</h2>
            <p className="text-gray-500 mt-2 text-sm md:text-base">
              Pantau data kesehatan dan gizi secara <span className="font-semibold text-indigo-600 ml-1">Real-time</span>
            </p>
          </div>
          <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-gray-200 shadow-sm text-sm text-gray-600">
            <CalendarIcon className="w-4 h-4 text-indigo-500" />
            <span>
              Periode: <span className="font-semibold text-gray-900">{getPeriodLabel()}</span>
              {isRealtime && <span className="ml-2 text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full border border-green-200">Aktif</span>}
            </span>
          </div>
        </div>

        {/* Filter Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8 relative overflow-hidden">
           <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2 opacity-60"></div>
           <div className="flex items-center gap-2 mb-4 text-gray-800 font-semibold border-b border-gray-100 pb-3">
             <FilterIcon className="w-5 h-5 text-indigo-600" />
             <h3>Filter Data Wilayah</h3>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
             {/* 1. Wilayah */}
             <div className={selectWrapperClass}>
                 <label className="block text-xs font-medium text-gray-500 mb-1.5 ml-1">Wilayah</label>
                 <div className="relative">
                    <MapPinIcon className={selectIconClass} />
                    <select value={selectedWilayah} onChange={handleWilayahChange} className={selectWithIconClass}>
                      {Object.keys(dataWilayah).map((wilayah) => ( <option key={wilayah} value={wilayah}>{wilayah}</option> ))}
                    </select>
                    <div className={chevronClass}><ChevronDownIcon className="w-4 h-4" /></div>
                 </div>
             </div>

             {/* 2. Desa */}
            <div className={selectWrapperClass}>
              <label className="block text-xs font-medium text-gray-500 mb-1.5 ml-1">Desa / Kelurahan</label>
              <div className="relative">
                <BuildingIcon className={selectIconClass} />
                <select value={selectedDesa} onChange={handleDesaChange} className={selectWithIconClass}>
                  <option value="">Semua Desa</option>
                  {dataWilayah[selectedWilayah].desa.map((desa) => ( <option key={desa} value={desa}>{desa}</option> ))}
                </select>
                <div className={chevronClass}><ChevronDownIcon className="w-4 h-4" /></div>
              </div>
            </div>

            {/* 3. Posyandu */}
            <div className={selectWrapperClass}>
              <label className="block text-xs font-medium text-gray-500 mb-1.5 ml-1">Posyandu</label>
              <div className="relative">
                <HomeIcon className={selectIconClass} />
                <select value={selectedPosyandu} onChange={(e) => setSelectedPosyandu(e.target.value)} className={selectWithIconClass} disabled={!selectedDesa}>
                  <option value="">Semua Posyandu</option>
                  {selectedDesa && dataWilayah[selectedWilayah].posyandu[selectedDesa]?.map((pos) => ( <option key={pos} value={pos}>{pos}</option> ))}
                </select>
                <div className={chevronClass}><ChevronDownIcon className="w-4 h-4" /></div>
              </div>
            </div>

             {/* 4. Waktu Laporan */}
            <div className="flex flex-col">
              <label className="block text-xs font-medium text-gray-500 mb-1.5 ml-1">Waktu Laporan</label>
              <div onClick={handleDateClick} className="relative w-full py-3 pl-10 pr-4 bg-gray-50 border border-gray-200 rounded-xl cursor-pointer hover:bg-white hover:border-indigo-400 hover:shadow-sm transition-all duration-200 group">
                 <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-hover:text-indigo-500 transition-colors" />
                 <div className="flex items-center justify-between">
                    <span className={`text-sm ${isRealtime ? 'font-semibold text-gray-900' : 'text-gray-700'}`}>{getPeriodLabel()}</span>
                    {isRealtime && <span className="text-[10px] bg-green-100 text-green-700 px-1.5 py-0.5 rounded border border-green-200 font-medium ml-2">Realtime</span>}
                    <ChevronDownIcon className="w-4 h-4 text-gray-400 ml-auto" />
                 </div>
                 <input ref={dateInputRef} type="month" value={selectedPeriod} onChange={(e) => setSelectedPeriod(e.target.value)} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" min="2024-01" />
              </div>
            </div>
           </div>
        </div>

        {/* Data Sections */}
        <div className="transition-all duration-500 ease-in-out">
          {selectedWilayah === "Banyuwangi" ? (
            <DatasSectionBwi
              region={selectedWilayah}
              desa={selectedDesa}
              posyandu={selectedPosyandu}
              month={valuesToSend.month} 
              year={valuesToSend.year}
            />
          ) : (
            <DatasSectionMaluku
              region={selectedWilayah}
              desa={selectedDesa}
              posyandu={selectedPosyandu}
              month={valuesToSend.month}
              year={valuesToSend.year}
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default DashboardTabs;