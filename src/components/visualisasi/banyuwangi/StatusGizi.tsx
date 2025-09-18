import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LabelList,
} from "recharts";

interface DataSectionProps {
  region: string;
  desa?: string;
  posyandu?: string;
}

const StatusGiziBwi: React.FC<DataSectionProps> = ({ region, desa, posyandu }) => {
  const COLORS = ["#ef4444", "#f59e0b", "#1e40af"];

  const [data, setData] = useState<any[]>([]);
  const [totalBalitaSasaran, setTotalBalitaSasaran] = useState<number>(0);
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
        const res = await fetch(`/balita?${query.toString()}`);
        const json = await res.json();

        if (json.data) {
          const mappedData = [
            { name: "Stunting", value: json.data.total_stunting ?? 0 },
            { name: "Wasting", value: json.data.total_wasting ?? 0 },
            { name: "Underweight", value: json.data.total_underweight ?? 0 },
            // Excluding Normal status as per requirement
          ].filter(item => item.value > 0); // Only show categories with data
          setData(mappedData);
          setTotalBalitaSasaran(json.data.total_balita_sasaran ?? 0);
        } else {
          setData([]);
          setTotalBalitaSasaran(0);
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

  // Don't display component if there's no data or only normal status
  if (data.length === 0) {
    return null;
  }

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

      {/* Menampilkan total balita sasaran dari API */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg text-center">
        <p className="text-lg font-semibold text-gray-800">
          Total Balita Sasaran:{" "}
          <span className="text-blue-600">{totalBalitaSasaran}</span>
        </p>
      </div>
    </div>
  );
};

export default StatusGiziBwi;
