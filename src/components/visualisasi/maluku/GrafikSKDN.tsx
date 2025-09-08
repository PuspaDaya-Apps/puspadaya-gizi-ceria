import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
  LabelList,
} from "recharts";

interface DataSectionProps {
  region: string;
  desa?: string;
  posyandu?: string;
}

const GrafikSKDNMlk: React.FC<DataSectionProps> = ({ region, desa, posyandu }) => {
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
        const res = await fetch(`/data-skdn?${query.toString()}`);
        const json = await res.json();

        if (json.data) {
          const mappedData = [
            { name: "S", value: json.data.S, fullName: "Sasaran" },
            { name: "K", value: json.data.K, fullName: "KMS" },
            { name: "D", value: json.data.D, fullName: "Ditimbang" },
            { name: "N", value: json.data.N, fullName: "Naik BB" },
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

  // Menentukan domain sumbu Y dengan menambahkan margin 10% dari nilai maksimum
  const maxValue = data.length > 0 ? Math.max(...data.map((item) => item.value)) : 0;
  const yDomain = [0, Math.ceil(maxValue + maxValue * 0.1)];

  return (
    <div className="bg-white rounded-2xl shadow p-6">
      <h3 className="text-xl font-semibold text-primary mb-4 text-center">
        Grafik SKDN {region}
        {desa ? ` - ${desa}` : ""} {posyandu ? ` - ${posyandu}` : ""}
      </h3>
      
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis domain={yDomain} />
          <Tooltip 
            formatter={(value: number) => [`${value}`, "Jumlah Balita"]} 
            labelFormatter={(name, payload) => {
              const item = data.find(d => d.name === name);
              return item ? `${name} (${item.fullName})` : name;
            }}
          />
          <Bar 
            dataKey="value" 
            radius={[8, 8, 0, 0]}
            shape={(props) => {
              const { name } = props.payload;
              const colors = {
                "S": "#ef4444", // merah
                "K": "#f59e0b", // kuning
                "D": "#10b981", // hijau
                "N": "#3b82f6"  // biru
              };
              return (
                <rect
                  {...props}
                  fill={colors[name] || "#8884d8"}
                />
              );
            }}
          >
            <LabelList dataKey="value" position="top" />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      
      {/* Penjelasan terpisah untuk S, K, D, N */}
      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
        <div className="p-3 bg-red-50 rounded-lg">
          <div className="font-bold text-red-800">S</div>
          <div className="text-sm text-gray-600">Sasaran</div>
        </div>
        <div className="p-3 bg-yellow-50 rounded-lg">
          <div className="font-bold text-yellow-800">K</div>
          <div className="text-sm text-gray-600">KMS</div>
        </div>
        <div className="p-3 bg-green-50 rounded-lg">
          <div className="font-bold text-green-800">D</div>
          <div className="text-sm text-gray-600">Ditimbang</div>
        </div>
        <div className="p-3 bg-blue-50 rounded-lg">
          <div className="font-bold text-blue-800">N</div>
          <div className="text-sm text-gray-600">Naik BB</div>
        </div>
      </div>
    </div>
  );
};

export default GrafikSKDNMlk;
