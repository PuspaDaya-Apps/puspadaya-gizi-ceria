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
          const mappedData = [
            {
              name: "Ya",
              value: json.data.prevalensi_asi_eksklusif_iya,
              description: "Balita yang mendapat ASI Eksklusif",
            },
            {
              name: "Tidak",
              value: json.data.prevalensi_asi_eksklusif_tidak,
              description: "Balita yang tidak mendapat ASI Eksklusif",
            },
          ];
          setData(mappedData);
          setTotal(json.data.total_balita_asi_eksklusif);
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

  const COLORS = ["#2b528a", "#d97706"];

  // Cek jika semua data bernilai 0
  const isAllZero = data.length > 0 && data.every(item => item.value === 0);
  
  // Cek jika ada data yang bernilai 0 (salah satu bernilai 0)
  const hasZeroValue = data.length > 0 && data.some(item => item.value === 0);

  if (isAllZero) {
    return (
      <div className="bg-white rounded-2xl shadow p-6 text-center">
        <h3 className="text-xl font-semibold text-primary mb-4">
          Persentase Balita ASI Ekslusif {region}
        </h3>
        <div className="bg-gray-100 rounded-lg p-6 my-4">
          <p className="text-gray-600 text-lg">
            Tidak ada data Persentase Balita ASI Ekslusif yang tersedia untuk {region}
            {desa ? ` - ${desa}` : ""}
            {posyandu ? ` - ${posyandu}` : ""}
          </p>
          <p className="text-gray-500 text-sm mt-2">
            Total Balita: {total}
          </p>
        </div>
        <p className="text-gray-500 text-sm">
          Data akan ditampilkan setelah ada informasi Persentase Balita ASI Ekslusif dari balita di wilayah ini.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow p-6">
      <h3 className="text-xl font-semibold text-primary mb-4 text-center">
        Persentase Balita ASI Ekslusif {region}
      </h3>

      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label={({ name, value, percent }) => {
                // Tampilkan label hanya jika nilai tidak 0
                if (value === 0) return "";
                return `${name}: ${value}%`;
              }}
            >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
              formatter={(value, name, props) => {
                const entry = data.find((d) => d.name === props.name);
                return [`${value}%`, entry?.description || name];
              }}
              // Sembunyikan tooltip jika nilai 0
              content={({ active, payload }) => {
                if (active && payload && payload.length && payload[0].value !== 0) {
                  const entry = data.find((d) => d.name === payload[0].name);
                  return (
                    <div className="bg-white p-2 border border-gray-200 rounded shadow">
                      <p className="font-semibold">{entry?.description || payload[0].name}</p>
                      <p>{`${payload[0].value}%`}</p>
                    </div>
                  );
                }
                return null;
              }}
            />
          <Legend
            formatter={(value) => {
              const dataEntry = data.find((d) => d.name === value);
              return dataEntry ? `${value}: ${dataEntry.description}` : value;
            }}
          />
        </PieChart>
      </ResponsiveContainer>

      <div className="text-center mt-4 text-gray-600">
        Total Balita: {total}
      </div>
    </div>
  );
};

export default AsiEklusifBwi;
