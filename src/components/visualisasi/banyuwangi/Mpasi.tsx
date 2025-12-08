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
}

const MpasiBwi: React.FC<DataSectionProps> = ({ region, desa, posyandu }) => {
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
  }, [region, desa, posyandu]);

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
    <div className="bg-white rounded-2xl shadow p-6">
      <h3 className="text-xl font-semibold text-primary mb-4 text-center">
        Persentase Balita Mendapatkan Makanan Selain ASI {region}
      </h3>

      {isAllZero && (
        <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg text-center">
          <p className="text-blue-700 font-medium">
            Saat ini belum ada data yang masuk untuk wilayah ini.
          </p>
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
        <div className="inline-block bg-gray-200 rounded-lg px-4 py-2">
          <span className="text-gray-700 font-medium">Total Balita: </span>
          <span className="text-gray-800 font-semibold">{total}</span>
        </div>
      </div>
    </div>
  );
};

export default MpasiBwi;