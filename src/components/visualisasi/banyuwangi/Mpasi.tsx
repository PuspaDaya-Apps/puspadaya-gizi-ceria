import React, { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Label,
} from "recharts";

interface DataSectionProps {
  region: string;
  desa?: string;
  posyandu?: string;
  month: number;
  year: number;
}

const MpasiBwi: React.FC<DataSectionProps> = ({ region, desa, posyandu, month, year }) => {
  const [data, setData] = useState<any[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const query = new URLSearchParams({
          kabupaten_kota: region,
          ...(desa ? { desa } : {}),
          ...(posyandu ? { posyandu } : {}),
          bulan: month.toString(),  // Add specified month number (1-12)
          tahun: year.toString(),   // Add specified year in YYYY format
        });
        const res = await fetch(`/anak-mpasi?${query.toString()}`);
        const json = await res.json();

        if (json.data) {
          const {
            prevalensi_mpasi_iya,
            prevalensi_mpasi_tidak,
            prevalensi_mpasi_tidak_tahu,
            prevalensi_mpasi_belum_diukur,
            total_balita_mpasi,
          } = json.data;

          const mpasiIya = prevalensi_mpasi_iya ?? 0;
          const mpasiTidak = prevalensi_mpasi_tidak ?? 0;
          const mpasiTidakTahu = prevalensi_mpasi_tidak_tahu ?? 0;
          const mpasiBelumDiukur = prevalensi_mpasi_belum_diukur ?? 0;

          const mappedData = [
            { name: "Ya", value: mpasiIya, description: "Balita yang mendapat selain ASI" },
            { name: "Tidak", value: mpasiTidak, description: "Balita yang tidak mendapat selain ASI" },
            { name: "Tidak Diisi", value: mpasiTidakTahu, description: "Status MPASI tidak diketahui" },
            // Removed "Belum Diukur" as per requirement
          ]; // Show all categories even when value is 0

          setData(mappedData);
          setTotal(total_balita_mpasi ?? 0);
        } else {
          // When json.data is null, set default values with 0
          const defaultData = [
            { name: "Ya", value: 0, description: "Balita yang mendapat selain ASI" },
            { name: "Tidak", value: 0, description: "Balita yang tidak mendapat selain ASI" },
            { name: "Tidak Diisi", value: 0, description: "Status MPASI tidak diketahui" },
          ];
          setData(defaultData);
          setTotal(0);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        // Set default values with 0 when there's an error
        const defaultData = [
          { name: "Ya", value: 0, description: "Balita yang mendapat selain ASI" },
          { name: "Tidak", value: 0, description: "Balita yang tidak mendapat selain ASI" },
          { name: "Tidak Diisi", value: 0, description: "Status MPASI tidak diketahui" },
        ];
        setData(defaultData);
        setTotal(0);
      } finally {
        setLoading(false);
      }
    };

    if (region) fetchData();
  }, [region, desa, posyandu, month, year]);

  if (loading) {
    return (
      <div className="text-center py-10 text-gray-500">
        Memuat data {region} {desa ? `- ${desa}` : ""} {posyandu ? `- ${posyandu}` : ""}...
      </div>
    );
  }

  const COLORS = ["#1f77b4", "#ff7f0e", "#e63946"];


  const totalValue = data.reduce((sum, d) => sum + d.value, 0);

  // Check if all values are zero
  const isAllZero = data.length > 0 && data.every((item) => item.value === 0);

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h3 className="text-xl font-semibold text-primary mb-4 text-center">
        Persentase Balita Mendapatkan Makanan Selain ASI {region}
      </h3>

      {isAllZero ? (
        <div className="py-10 flex flex-col items-center justify-center text-center">
          <div className="mb-4 p-3 bg-blue-100 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h4 className="text-xl font-semibold text-gray-800 mb-2">Data Tidak Tersedia</h4>
          <p className="text-gray-600 mb-1">
            Saat ini belum ada data yang masuk untuk wilayah ini.
          </p>
          <div className="text-sm text-gray-500 italic">
            Tidak ada data yang masuk pada saat ini. Sistem akan menampilkan data secara otomatis ketika tersedia.
          </div>
        </div>
      ) : (
        <>
          <ResponsiveContainer width="100%" height={500}>
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={110}
                labelLine={true} // tarik garis keluar
                label={({ name, value }) => {
                  // When value is 0 but total is also 0, we show the label with 0%
                  const percentValue = totalValue
                    ? ((value / totalValue) * 100).toFixed(1)
                    : "0";
                  return `${name} ${percentValue}%`;
                }}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>

              <Tooltip
                formatter={(value, name) => {
                  const percent = totalValue
                    ? ((Number(value) / totalValue) * 100).toFixed(1)
                    : "0";
                  const entry = data.find((d) => d.name === name);
                  return [`${value} (${percent}%)`, entry?.description || name];
                }}
              />

              <Legend
                formatter={(value) => {
                  const dataEntry = data.find((d) => d.name === value);
                  return dataEntry
                    ? `${value}: ${dataEntry.description}`
                    : value;
                }}
              />
            </PieChart>
          </ResponsiveContainer>

          <div className="mt-4 text-center">
            <div className="inline-block bg-gradient-to-r from-gray-100 to-gray-200 rounded-lg px-4 py-2 border border-gray-300">
              <span className="text-gray-700 font-medium">Total Balita: </span>
              <span className="text-gray-800 font-semibold">{total}</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default MpasiBwi;