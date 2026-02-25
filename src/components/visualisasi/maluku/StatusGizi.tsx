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
import FunLoading from '@/components/ui/FunLoading';
import EmptyDataOverlay from '@/components/ui/EmptyDataOverlay';
import { areAllValuesZero } from '@/hooks/useEmptyDataState';

interface DataSectionProps {
  region: string;
  desa?: string;
  posyandu?: string;
  month: number;
  year: number;
}

const StatusGiziMlk: React.FC<DataSectionProps> = ({ region, desa, posyandu, month, year }) => {
  const COLORS = ["#ef4444", "#f59e0b", "#1e40af"];

  const [data, setData] = useState<any[]>([]);
  const [totalBalitaSasaran, setTotalBalitaSasaran] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

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
        const res = await fetch(`/balita?${query.toString()}`);
        const json = await res.json();

        if (json.data) {
          const mappedData = [
            { name: "Stunting", value: json.data.total_stunting ?? 0 },
            { name: "Wasting", value: json.data.total_wasting ?? 0 },
            { name: "Underweight", value: json.data.total_underweight ?? 0 },
          ];
          setData(mappedData);
          setTotalBalitaSasaran(json.data.total_balita_sasaran ?? 0);
        } else {
          const defaultData = [
            { name: "Stunting", value: 0 },
            { name: "Wasting", value: 0 },
            { name: "Underweight", value: 0 },
          ];
          setData(defaultData);
          setTotalBalitaSasaran(0);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        const defaultData = [
          { name: "Stunting", value: 0 },
          { name: "Wasting", value: 0 },
          { name: "Underweight", value: 0 },
        ];
        setData(defaultData);
        setTotalBalitaSasaran(0);
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
      <div className="text-center py-10">
        <FunLoading
          variant="baby-bounce"
          message={`Memuat data ${region} ${desa ? `- ${desa}` : ""} ${posyandu ? `- ${posyandu}` : ""}...`}
        />
      </div>
    );
  }

  const isAllZero = areAllValuesZero(data, "value");
  const hasNoTarget = totalBalitaSasaran === 0;

  return (
    <div className="bg-white rounded-2xl shadow p-4 sm:p-6 relative">
      <h3 className="text-lg sm:text-xl font-semibold text-primary mb-4 text-center">
        Status Gizi Balita {region}
        {desa ? ` - ${desa}` : ""} {posyandu ? ` - ${posyandu}` : ""}
      </h3>

      {/* Chart Container with Overlay */}
      <div className="relative">
        <ResponsiveContainer width="100%" height={isMobile ? 250 : 300}>
          <BarChart
            data={data}
            margin={{ top: isMobile ? 10 : 20, right: isMobile ? 10 : 30, left: isMobile ? 10 : 20, bottom: isMobile ? 10 : 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="name" 
              tick={{ fontSize: isMobile ? 11 : 14 }}
              angle={isMobile ? -15 : 0}
              textAnchor={isMobile ? "end" : "middle"}
              height={isMobile ? 60 : undefined}
            />
            <YAxis
              label={{ 
                value: "Persentase (%)", 
                angle: -90, 
                position: "insideLeft",
                fontSize: isMobile ? 11 : 14,
                offset: isMobile ? 0 : 10
              }}
              tick={{ fontSize: isMobile ? 11 : 14 }}
            />
            <Tooltip 
              formatter={(value: number) => [`${value}%`, "Persentase"]}
              contentStyle={{ fontSize: isMobile ? 12 : 14 }}
            />

            <Bar dataKey="value" name="Persentase">
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
              <LabelList
                dataKey="value"
                position="top"
                formatter={(value: number) => `${value}%`}
                fontSize={isMobile ? 10 : 12}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>

        {/* Empty Data Overlay */}
        {isAllZero && (
          <EmptyDataOverlay
            title="Data Belum Tersedia"
            message={`Belum ada data status gizi yang tercatat untuk ${region} ${desa ? `- ${desa}` : ""} pada periode ini.`}
            icon="database"
          />
        )}
      </div>

      {/* Total Balita Sasaran */}
      <div className={`mt-4 sm:mt-6 p-3 sm:p-4 rounded-lg text-center transition-all duration-300 ${
        hasNoTarget ? 'bg-amber-50 border border-amber-200' : 'bg-gray-50'
      }`}>
        <p className="text-base sm:text-lg font-semibold text-gray-800">
          Total Balita Sasasaran:{" "}
          <span className={`${hasNoTarget ? 'text-amber-600' : 'text-blue-600'} text-sm sm:text-base`}>
            {totalBalitaSasaran}
          </span>
        </p>
        {hasNoTarget && (
          <p className="text-xs sm:text-sm text-amber-600 mt-1">
            Belum ada data balita sasaran untuk periode ini
          </p>
        )}
      </div>
    </div>
  );
};

export default StatusGiziMlk;
