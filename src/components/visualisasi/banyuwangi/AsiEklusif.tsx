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
              value: json.data.total_asi_eksklusif_iya,
              description: "Balita yang mendapat ASI Eksklusif",
            },
            {
              name: "Tidak",
              value: json.data.total_asi_eksklusif_tidak,
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

  return (
    <div className="bg-white rounded-2xl shadow p-6">
      <h3 className="text-xl font-semibold text-primary mb-4 text-center">
        Pemberian ASI Eksklusif {region}
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
            label={({ name, value }) => `${name}: ${value}%`}
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
