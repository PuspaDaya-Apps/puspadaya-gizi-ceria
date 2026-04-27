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
  month: number;
  year: number;
}

const GrafikSKDNBwi: React.FC<DataSectionProps> = ({ region, desa, posyandu, month, year }) => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const defaultData = [
    { name: "S", value: 0, fullName: "Sasaran" },
    { name: "K", value: 0, fullName: "KMS" },
    { name: "D", value: 0, fullName: "Ditimbang" },
    { name: "N", value: 0, fullName: "Naik BB" },
  ];

  // Handle responsive behavior
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };

    // Set initial value
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Clean up event listener
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const query = new URLSearchParams({
          kabupaten_kota: region,
          ...(desa ? { desa } : {}),
          ...(posyandu ? { posyandu } : {}),
          bulan: month.toString(),
          tahun: year.toString(),
        });
        const res = await fetch(`/data-skdn?${query.toString()}`);
        const json = await res.json();

        if (json.data) {
          const mappedData = [
            { name: "S", value: json.data.S ?? 0, fullName: "Sasaran" },
            { name: "K", value: json.data.K ?? 0, fullName: "KMS" },
            { name: "D", value: json.data.D ?? 0, fullName: "Ditimbang" },
            { name: "N", value: json.data.N ?? 0, fullName: "Naik BB" },
          ];
          setData(mappedData);
        } else {
          setData(defaultData);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        setData(defaultData);
      } finally {
        setLoading(false);
      }
    };

    if (region) {
      fetchData();
    }
  }, [region, desa, posyandu, month, year]);

  if (loading) {
    return (
      <div className="text-center py-10 text-gray-500">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary mb-3"></div>
          <p>Memuat data {region} {desa ? `- ${desa}` : ""}{" "}
          {posyandu ? `- ${posyandu}` : ""}...</p>
        </div>
      </div>
    );
  }

  const maxValue = data.length > 0 ? Math.max(...data.map((item) => item.value)) : 0;
  const yDomain = [0, Math.ceil(maxValue + maxValue * 0.1)];

  return (
    <div className="bg-white rounded-2xl shadow p-4 sm:p-6 relative">
      <h3 className="text-lg sm:text-xl font-semibold text-primary mb-4 text-center">
        Grafik SKDN {region}
        {desa ? ` - ${desa}` : ""} {posyandu ? ` - ${posyandu}` : ""}
      </h3>

      {/* Chart Container with Overlay */}
      <div className="relative">
        <ResponsiveContainer width="100%" height={isMobile ? 250 : 300}>
          <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="name" 
              tick={{ fontSize: isMobile ? 12 : 14 }}
            />
            <YAxis 
              domain={yDomain}
              tick={{ fontSize: isMobile ? 12 : 14 }}
            />
            <Tooltip
              formatter={(value: number) => [`${value}`, "Jumlah Balita"]}
              labelFormatter={(name, payload) => {
                const item = data.find(d => d.name === name);
                return item ? `${name} (${item.fullName})` : name;
              }}
            />
            <Bar
              dataKey="value"
              radius={[4, 4, 0, 0]}
              shape={(props) => {
                const { name } = props.payload;
                const colors = {
                  "S": "#ef4444",
                  "K": "#f59e0b",
                  "D": "#10b981",
                  "N": "#3b82f6"
                };
                return (
                  <rect
                    {...props}
                    fill={colors[name] || "#8884d8"}
                  />
                );
              }}
            >
              <LabelList 
                dataKey="value" 
                position="top" 
                fontSize={isMobile ? 10 : 12}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Info Cards */}
      <div className="mt-4 sm:mt-6 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 text-center transition-opacity duration-300 opacity-100">
        <div className="p-2 sm:p-3 bg-red-50 rounded-lg">
          <div className="font-bold text-red-800 text-sm sm:text-base">S</div>
          <div className="text-xs sm:text-sm text-gray-600">Sasaran</div>
        </div>
        <div className="p-2 sm:p-3 bg-yellow-50 rounded-lg">
          <div className="font-bold text-yellow-800 text-sm sm:text-base">K</div>
          <div className="text-xs sm:text-sm text-gray-600">KMS</div>
        </div>
        <div className="p-2 sm:p-3 bg-green-50 rounded-lg">
          <div className="font-bold text-green-800 text-sm sm:text-base">D</div>
          <div className="text-xs sm:text-sm text-gray-600">Ditimbang</div>
        </div>
        <div className="p-2 sm:p-3 bg-blue-50 rounded-lg">
          <div className="font-bold text-blue-800 text-sm sm:text-base">N</div>
          <div className="text-xs sm:text-sm text-gray-600">Naik BB</div>
        </div>
      </div>
    </div>
  );
};

export default GrafikSKDNBwi;
