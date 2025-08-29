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
}

const GrafikSKDNBwi: React.FC<DataSectionProps> = ({ region }) => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Data dummy SKDN
        const dummyData = [
          { name: "Sasaran", value: 120 },
          { name: "KMS", value: 95 },
          { name: "Ditimbang", value: 88 },
          { name: "Naik BB", value: 70 },
        ];
        setData(dummyData);
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [region]);

  if (loading) {
    return (
      <div className="text-center py-10 text-gray-500">
        Memuat data {region}...
      </div>
    );
  }

  // Menentukan domain sumbu Y dengan menambahkan 10 dari nilai maksimum
  const maxValue = Math.max(...data.map(item => item.value));
  const yDomain = [0, maxValue + 10];

  return (
    <div className="bg-white rounded-2xl shadow p-6">
      <h3 className="text-xl font-semibold text-primary mb-4 text-center">
        Grafik SKDN {region}
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis domain={yDomain} />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" fill="#2563eb" radius={[8, 8, 0, 0]}>
            <LabelList dataKey="value" position="top" />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default GrafikSKDNBwi;
