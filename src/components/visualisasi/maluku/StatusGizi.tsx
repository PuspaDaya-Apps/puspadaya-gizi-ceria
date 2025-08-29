import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
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
}

const StatusGiziMlk: React.FC<DataSectionProps> = ({ region }) => {
  const COLORS = ["#ef4444", "#f59e0b", "#1e40af", "#22c55e"]; // Merah, Kuning, Biru, Hijau

  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Menggunakan data dummy karena ini adalah contoh
        const dummyData = [
          { name: "Stunting", value: 22 },
          { name: "Wasting", value: 18 },
          { name: "Underweight", value: 12 },
          { name: "Normal", value: 48 }, // Menambahkan variabel normal
        ];
        setData(dummyData);
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

  // Menghitung total nilai
  const total = data.reduce((sum, item) => sum + item.value, 0);

  // Fungsi untuk memformat tooltip
  const formatTooltip = (value: number) => {
    return [`${value}%`, "Persentase"];
  };

  // Fungsi untuk memformat label
  const formatLabel = (value: number) => {
    return `${value}%`;
  };

  return (
    <div className="bg-white rounded-2xl shadow p-6">
      <h3 className="text-xl font-semibold text-primary mb-4 text-center">
        Status Gizi Balita {region}
      </h3>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis 
            domain={[0, 100]} 
            label={{ value: "Persentase (%)", angle: -90, position: "insideLeft" }} 
          />
          <Tooltip formatter={formatTooltip} />
          <Legend />
          <Bar dataKey="value" name="Persentase">
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
            <LabelList dataKey="value" position="top" formatter={formatLabel} />
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      {/* Keterangan */}
      <div className="mt-4 text-sm text-gray-600">
        <p><strong>Keterangan:</strong></p>
        <ul className="list-disc pl-5 mt-1 space-y-1">
          <li>Stunting: Tinggi badan kurang dari standar usia</li>
          <li>Wasting: Berat badan kurang dari standar tinggi badan</li>
          <li>Underweight: Berat badan kurang dari standar usia</li>
          <li>Normal: Status gizi sesuai standar</li>
        </ul>
      </div>

      {/* Menampilkan informasi nilai total */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg text-center">
        <p className="text-lg font-semibold text-gray-800">
          Total Balita: <span className="text-blue-600">{total}%</span>
        </p>
        <p className="text-sm text-gray-600 mt-1">
          Jumlah persentase di atas merupakan total dari semua kategori status gizi
        </p>
      </div>
    </div>
  );
};

export default StatusGiziMlk;
