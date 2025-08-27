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
}

const DistribusiPenggunaBwi: React.FC<DataSectionProps> = ({ region }) => {
  const USER_COLORS = ["#2563eb", "#10b981", "#f59e0b", "#ef4444"];

  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/pengguna?kabupaten_kota=${region}`);
        const json = await res.json();

        if (json.data) {
          // mapping API response → langsung pakai angka asli
          const mappedData = [
            { name: "Kader", value: json.data.total_kader },
            { name: "Ketua Kader", value: json.data.total_ketua_kader },
          ];
          setData(mappedData);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    if (region) {
      fetchData();
    }
  }, [region]);

  if (loading) {
    return (
      <div className="text-center py-10 text-gray-500">
        Memuat data {region}...
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow p-6">
      <h3 className="text-xl font-semibold text-primary mb-4 text-center">
        Distribusi Pengguna {region}
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
            label={({ name, value }) => `${name}: ${value}`}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-user-${index}`}
                fill={USER_COLORS[index % USER_COLORS.length]}
              />
            ))}
          </Pie>

          <Tooltip formatter={(value) => `${value}`} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DistribusiPenggunaBwi;
