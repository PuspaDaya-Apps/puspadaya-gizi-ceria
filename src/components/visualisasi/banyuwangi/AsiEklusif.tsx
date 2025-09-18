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
        const query = new URLSearchParams({
          kabupaten_kota: region,
          ...(desa ? { desa } : {}),
          ...(posyandu ? { posyandu } : {}),
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
            {
              name: "Belum Diukur",
              value: prevalensi_asi_eksklusif_belum_diukur ?? 0,
              description: "Balita yang belum diukur",
            },
          ];

          setData(mappedData);
          setTotal(total_balita_asi_eksklusif ?? 0);
        } else {
          setData([]);
          setTotal(0);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        setData([]);
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

  const COLORS = ["#2b528a", "#d97706", "#e63946", "#2ca02c"]; // tambah hijau utk "Belum Diukur"

  const isAllZero = data.length > 0 && data.every((item) => item.value === 0);

  if (isAllZero) {
    return (
      <div className="bg-white rounded-2xl shadow p-6 text-center">
        <h3 className="text-xl font-semibold text-primary mb-4">
          Persentase Balita ASI Eksklusif {region}
        </h3>
        <div className="bg-gray-100 rounded-lg p-6 my-4">
          <p className="text-gray-600 text-lg">
            Tidak ada data Persentase Balita ASI Eksklusif yang tersedia untuk {region}
            {desa ? ` - ${desa}` : ""}
            {posyandu ? ` - ${posyandu}` : ""}
          </p>
          <p className="text-gray-500 text-sm mt-2">Total Balita: {total}</p>
        </div>
        <p className="text-gray-500 text-sm">
          Data akan ditampilkan setelah ada informasi Persentase Balita ASI Eksklusif dari balita di wilayah ini.
        </p>
      </div>
    );
  }

  // Hitung total untuk persentase
  const totalValue = data.reduce((sum, d) => sum + d.value, 0);

  return (
    <div className="bg-white rounded-2xl shadow p-6">
      <h3 className="text-xl font-semibold text-primary mb-4 text-center">
        Persentase Balita ASI Eksklusif {region}
      </h3>

      <ResponsiveContainer width="100%" height={500}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            label={({ name, value, percent }) => {
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
        <div className="inline-block bg-gray-200 rounded-lg px-4 py-2">
          <span className="text-gray-700 font-medium">Total Balita: </span>
          <span className="text-gray-800 font-semibold">{total}</span>
        </div>
      </div>
    </div>
  );
};

export default AsiEklusifBwi;
