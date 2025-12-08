import React, { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface DataSectionProps {
  region: string;
  desa?: string;
  posyandu?: string;
}

const AsiEklusifBwi: React.FC<DataSectionProps> = ({ region, desa, posyandu }) => {
  const [data, setData] = useState<any[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Get current month and year
        const currentMonth = (new Date().getMonth() + 1).toString(); // Months are 0-indexed, so add 1
        const currentYear = new Date().getFullYear().toString();

        const query = new URLSearchParams({
          kabupaten_kota: region,
          ...(desa ? { desa } : {}),
          ...(posyandu ? { posyandu } : {}),
          bulan: currentMonth,  // Add current month number (1-12)
          tahun: currentYear,   // Add current year in YYYY format
        });
        const res = await fetch(`/asi-eksklusif?${query.toString()}`);
        const json = await res.json();

        if (json.data) {
          const {
            prevalensi_asi_eksklusif_iya,
            prevalensi_asi_eksklusif_tidak,
            prevalensi_asi_eksklusif_tidak_tahu,
            prevalensi_asi_eksklusif_belum_diukur,
            total_balita_asi_eksklusif,
          } = json.data;

          const mappedData = [
            {
              name: "Ya",
              value: prevalensi_asi_eksklusif_iya ?? 0,
              description: "Balita yang mendapat ASI Eksklusif",
            },
            {
              name: "Tidak",
              value: prevalensi_asi_eksklusif_tidak ?? 0,
              description: "Balita yang tidak mendapat ASI Eksklusif",
            },
            {
              name: "Tidak Diisi",
              value: prevalensi_asi_eksklusif_tidak_tahu ?? 0,
              description: "Status ASI Eksklusif tidak diketahui",
            },
            // Removed "Belum Diukur" as per requirement
          ]; // Show all categories even when value is 0

          setData(mappedData);
          setTotal(total_balita_asi_eksklusif ?? 0);
        } else {
          // When json.data is null, set default values with 0
          const defaultData = [
            {
              name: "Ya",
              value: 0,
              description: "Balita yang mendapat ASI Eksklusif",
            },
            {
              name: "Tidak",
              value: 0,
              description: "Balita yang tidak mendapat ASI Eksklusif",
            },
            {
              name: "Tidak Diisi",
              value: 0,
              description: "Status ASI Eksklusif tidak diketahui",
            },
          ];
          setData(defaultData);
          setTotal(0);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        // Set default values with 0 when there's an error
        const defaultData = [
          {
            name: "Ya",
            value: 0,
            description: "Balita yang mendapat ASI Eksklusif",
          },
          {
            name: "Tidak",
            value: 0,
            description: "Balita yang tidak mendapat ASI Eksklusif",
          },
          {
            name: "Tidak Diisi",
            value: 0,
            description: "Status ASI Eksklusif tidak diketahui",
          },
        ];
        setData(defaultData);
        setTotal(0);
      } finally {
        setLoading(false);
      }
    };

    if (region) {
      fetchData();
    }
  }, [region, desa, posyandu]);

  if (loading) {
    return (
      <div className="text-center py-10 text-gray-500">
        Memuat data {region} {desa ? `- ${desa}` : ""}{" "}
        {posyandu ? `- ${posyandu}` : ""}...
      </div>
    );
  }

  const COLORS = ["#2b528a", "#d97706", "#e63946"]; // removed green color for "Belum Diukur"

  // Always show the chart, even if data is empty or all values are zero

  // Hitung total untuk persentase
  const totalValue = data.reduce((sum, d) => sum + d.value, 0);

  // Check if all values are zero
  const isAllZero = data.length > 0 && data.every((item) => item.value === 0);

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h3 className="text-xl font-semibold text-primary mb-4 text-center">
        Persentase Balita Mendapatkan ASI Eksklusif
        <h3>{region}</h3>
      </h3>

      {isAllZero && (
        <div className="mb-6 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100 flex flex-col items-center justify-center text-center">
          <div className="mb-4 p-3 bg-blue-100 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h4 className="text-lg font-semibold text-gray-800 mb-2">Data Masih Kosong</h4>
          <p className="text-gray-600 mb-3">
            Saat ini belum ada data yang masuk untuk wilayah ini.
          </p>
          <div className="text-sm text-gray-500 italic">
            Tidak ada data yang masuk pada saat ini. Sistem akan menampilkan data secara otomatis ketika tersedia.
          </div>
        </div>
      )}

      <ResponsiveContainer width="100%" height={500}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={isAllZero ? 80 : 100}
            label={({ name, value, percent }) => {
              // When value is 0 but total is also 0, we show the label with 0%
              const percentValue = totalValue
                ? ((value / totalValue) * 100).toFixed(1)
                : "0";
              // Menampilkan hanya persentase tanpa nilai absolut
              return `${name}: ${percentValue}%`;
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
              // Menampilkan nilai absolut dan persentase di tooltip
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
    </div>
  );
};

export default AsiEklusifBwi;
