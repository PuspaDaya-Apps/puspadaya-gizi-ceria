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
        const query = new URLSearchParams({
          kabupaten_kota: region,
          ...(desa ? { desa } : {}),
          ...(posyandu ? { posyandu } : {}),
        });
        const res = await fetch(`/anak-mpasi?${query.toString()}`);
        const json = await res.json();

        if (json.data) {
          const {
            prevalensi_mpasi_iya,
            prevalensi_mpasi_tidak,
            prevalensi_mpasi_tidak_tahu,
            prevalensi_mpasi_belum_diukur,
          } = json.data;

          const mpasiIya = prevalensi_mpasi_iya ?? 0;
          const mpasiTidak = prevalensi_mpasi_tidak ?? 0;
          const mpasiTidakTahu = prevalensi_mpasi_tidak_tahu ?? 0;
          const mpasiBelumDiukur = prevalensi_mpasi_belum_diukur ?? 0;

          const mappedData = [
            { name: "Ya", value: mpasiIya, description: "Balita yang mendapat MPASI" },
            { name: "Tidak", value: mpasiTidak, description: "Balita yang tidak mendapat MPASI" },
            { name: "Tidak Diisi", value: mpasiTidakTahu, description: "Status MPASI tidak diketahui" },
            { name: "Belum Diukur", value: mpasiBelumDiukur, description: "Balita yang belum diukur MPASI" },
          ];

          setData(mappedData);
          setTotal(mpasiIya + mpasiTidak + mpasiTidakTahu + mpasiBelumDiukur);
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

    if (region) fetchData();
  }, [region, desa, posyandu]);

  if (loading) {
    return (
      <div className="text-center py-10 text-gray-500">
        Memuat data {region} {desa ? `- ${desa}` : ""} {posyandu ? `- ${posyandu}` : ""}...
      </div>
    );
  }

  const COLORS = ["#1f77b4", "#ff7f0e", "#e63946", "#2ca02c"];

  const isAllZero = data.length > 0 && data.every((item) => item.value === 0);

  if (isAllZero) {
    return (
      <div className="bg-white rounded-2xl shadow p-6 text-center">
        <h3 className="text-xl font-semibold text-primary mb-4">
          Persentase Balita Mendapatkan Makanan Selain ASI {region}
        </h3>
        <div className="bg-gray-100 rounded-lg p-6 my-4">
          <p className="text-gray-600 text-lg">
            Tidak ada data Persentase Balita MPASI yang tersedia untuk {region}
            {desa ? ` - ${desa}` : ""}
            {posyandu ? ` - ${posyandu}` : ""}
          </p>
          <p className="text-gray-500 text-sm mt-2">Total Balita: {total}</p>
        </div>
      </div>
    );
  }

  const totalValue = data.reduce((sum, d) => sum + d.value, 0);

  return (
    <div className="bg-white rounded-2xl shadow p-6">
      <h3 className="text-xl font-semibold text-primary mb-4 text-center">
        Persentase Balita Mendapatkan Makanan Selain ASI {region}
      </h3>

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
