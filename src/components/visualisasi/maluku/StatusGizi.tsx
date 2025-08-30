import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LabelList,
} from "recharts";

interface DataSectionProps {
  region: string;
  desa?: string;
  posyandu?: string;
}

const StatusGiziMlk: React.FC<DataSectionProps> = ({ region, desa, posyandu }) => {
  const COLORS = ["#ef4444", "#f59e0b", "#1e40af", "#22c55e"];

  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Bangun query param dinamis
        const query = new URLSearchParams({
          kabupaten_kota: region,
          ...(desa ? { desa } : {}),
          ...(posyandu ? { posyandu } : {}),
        });
        const res = await fetch(`/balita?${query.toString()}`);
        const json = await res.json();

        if (json.data) {
          const mappedData = [
            { name: "Stunting", value: json.data.total_stunting },
            { name: "Wasting", value: json.data.total_wasting },
            { name: "Underweight", value: json.data.total_underweight },
            { name: "Normal", value: json.data.total_normal },
          ];
          setData(mappedData);
        } else {
          setData([]);
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
  }, [region, desa, posyandu]);

  if (loading) {
    return (
      <div className="text-center py-10 text-gray-500">
        Memuat data {region} {desa ? `- ${desa}` : ""}{" "}
        {posyandu ? `- ${posyandu}` : ""}...
      </div>
    );
  }

  // Menghitung total nilai (opsional, kalau masih mau ditampilkan)
  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="bg-white rounded-2xl shadow p-6">
      <h3 className="text-xl font-semibold text-primary mb-4 text-center">
        Status Gizi Balita {region}
        {desa ? ` - ${desa}` : ""} {posyandu ? ` - ${posyandu}` : ""}
      </h3>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis
            label={{ value: "Persentase (%)", angle: -90, position: "insideLeft" }}
          />
          <Tooltip formatter={(value: number) => [`${value}%`, "Persentase"]} />
          <Legend />
          <Bar dataKey="value" name="Persentase">
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
            <LabelList
              dataKey="value"
              position="top"
              formatter={(value: number) => `${value}%`}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      {/* Menampilkan informasi nilai total (opsional, kalau masih dibutuhkan) */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg text-center">
        <p className="text-lg font-semibold text-gray-800">
          Total Balita: <span className="text-blue-600">{total}</span>
        </p>
      </div>
    </div>
  );
};

export default StatusGiziMlk;
