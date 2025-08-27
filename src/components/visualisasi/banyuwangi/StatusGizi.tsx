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

const StatusGiziBwi: React.FC<DataSectionProps> = ({ region }) => {
  const COLORS = ["#ef4444", "#f59e0b", "#1e40af"];

  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/balita?kabupaten_kota=${region}`);
        const json = await res.json();

        if (json.data) {
          const total =
            json.data.total_stunting +
            json.data.total_wasting +
            json.data.total_underweight;

          // mapping API response → persentase
          const mappedData = [
            {
              name: "Stunting",
              value: total > 0 ? (json.data.total_stunting / total) * 100 : 0,
            },
            {
              name: "Wasting",
              value: total > 0 ? (json.data.total_wasting / total) * 100 : 0,
            },
            {
              name: "Underweight",
              value: total > 0 ? (json.data.total_underweight / total) * 100 : 0,
            },
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

  // ✅ cek apakah semua value = 0
  const allZero = data.every((item) => item.value === 0);

  return (
    <div className="bg-white rounded-2xl shadow p-6">
      <h3 className="text-xl font-semibold text-primary mb-4 text-center">
        Status Gizi Balita {region}
      </h3>

      {allZero ? (
        <div className="text-center text-gray-600 py-10">
          Tidak ada balita yang mengalami gizi buruk di {region}.
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label={({ name, value }) =>
                `${name}: ${value.toFixed(2)}%`
              }
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip
              formatter={(value) => `${Number(value).toFixed(2)}%`}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default StatusGiziBwi;
