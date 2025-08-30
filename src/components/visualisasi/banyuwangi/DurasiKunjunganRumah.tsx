import React, { useState, useEffect } from "react";
import {
  ResponsiveContainer,
  ComposedChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Bar,
} from "recharts";

interface DataSectionProps {
  region: string;
  desa?: string;
  posyandu?: string;
}

interface BoxPlotData {
  name: string;
  category: string;
  min: number;
  median: number;
  max: number;
}

interface ApiResponse {
  rata_rata: number;
  minimum: number;
  maksimum: number;
}

const DurasiKunjunganRumahBwi: React.FC<DataSectionProps> = ({
  region,
  desa,
  posyandu,
}) => {
  const [loading, setLoading] = useState(true);
  const [apiData, setApiData] = useState<ApiResponse | null>(null);
  const [currentMonth, setCurrentMonth] = useState("");

  useEffect(() => {
    // Dapatkan nama bulan saat ini
    const months = [
      "Januari", "Februari", "Maret", "April", "Mei", "Juni",
      "Juli", "Agustus", "September", "Oktober", "November", "Desember"
    ];
    const now = new Date();
    setCurrentMonth(months[now.getMonth()]);

    const fetchData = async () => {
      setLoading(true);
      try {
        const query = new URLSearchParams({
          kabupaten_kota: region,
          ...(desa ? { desa } : {}),
          ...(posyandu ? { posyandu } : {}),
        });
        
        const res = await fetch(`/waktu-kunjungan?${query.toString()}`);
        const json = await res.json();

        if (json.data) {
          setApiData(json.data);
        } else {
          setApiData(null);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        setApiData(null);
      } finally {
        setLoading(false);
      }
    };

    if (region) fetchData();
  }, [region, desa, posyandu]);

  // Siapkan data untuk box plot berdasarkan response API
  const prepareBoxPlotData = (): BoxPlotData[] => {
    if (!apiData) return [];

    return [
      {
        name: currentMonth,
        category: "Durasi Kunjungan Posyandu",
        min: apiData.minimum,
        median: apiData.rata_rata,
        max: apiData.maksimum,
      },
    ];
  };

  const boxPlotData = prepareBoxPlotData();

  // Categories for coloring
  const categoryColors = {
    "Durasi Kunjungan Posyandu": "#3D9970",
  };

  // Prepare data for chart
  const chartData = boxPlotData.map((item, index) => ({
    name: item.name,
    category: item.category,
    index,
    // Store all values for tooltip and reference lines
    min: item.min,
    median: item.median,
    max: item.max,
    color: categoryColors[item.category as keyof typeof categoryColors],
  }));

  // Custom bar shape for box plot elements
  const CustomBoxPlot = (props: any) => {
    const { payload, x, y, width, height } = props;

    if (!payload) return null;

    const centerX = x + width / 2;
    const boxWidth = width * 0.6;
    const whiskerWidth = width * 0.3;

    // Calculate positions based on chart scaling
    const chartBottom = y + height;
    
    // Gunakan domain yang dinamis berdasarkan data maksimum
    const maxDataValue = Math.max(payload.max, payload.median, payload.min);
    const domainMax = maxDataValue > 0 ? Math.ceil(maxDataValue * 1.2) : 5; // Fallback ke 5 jika data tidak valid
    const scale = height / domainMax;

    const minY = chartBottom - payload.min * scale;
    const medianY = chartBottom - payload.median * scale;
    const maxY = chartBottom - payload.max * scale;

    // Validasi nilai Y agar tidak keluar dari batas chart
    const validatedMinY = Math.max(y, Math.min(minY, chartBottom));
    const validatedMedianY = Math.max(y, Math.min(medianY, chartBottom));
    const validatedMaxY = Math.max(y, Math.min(maxY, chartBottom));

    return (
      <g>
        {/* Median line (now spans the full width) */}
        <line
          x1={x}
          y1={validatedMedianY}
          x2={x + width}
          y2={validatedMedianY}
          stroke="#DC2626"
          strokeWidth={3}
        />

        {/* Bottom whisker */}
        <line
          x1={centerX}
          y1={validatedMinY}
          x2={centerX}
          y2={validatedMedianY}
          stroke="#374151"
          strokeWidth={2}
        />
        <line
          x1={centerX - whiskerWidth / 2}
          y1={validatedMinY}
          x2={centerX + whiskerWidth / 2}
          y2={validatedMinY}
          stroke="#374151"
          strokeWidth={2}
        />

        {/* Top whisker */}
        <line
          x1={centerX}
          y1={validatedMedianY}
          x2={centerX}
          y2={validatedMaxY}
          stroke="#374151"
          strokeWidth={2}
        />
        <line
          x1={centerX - whiskerWidth / 2}
          y1={validatedMaxY}
          x2={centerX + whiskerWidth / 2}
          y2={validatedMaxY}
          stroke="#374151"
          strokeWidth={2}
        />

        {/* Value labels */}
        <text
          x={centerX}
          y={validatedMinY + 15}
          fontSize={10}
          fill="#374151"
          textAnchor="middle"
          fontWeight="bold"
        >
          {payload.min.toFixed(2)}
        </text>
        <text
          x={centerX}
          y={validatedMedianY - 5}
          fontSize={10}
          fill="#DC2626"
          textAnchor="middle"
          fontWeight="bold"
        >
          {payload.median.toFixed(2)}
        </text>
        <text
          x={centerX}
          y={validatedMaxY - 10}
          fontSize={10}
          fill="#374151"
          textAnchor="middle"
          fontWeight="bold"
        >
          {payload.max.toFixed(2)}
        </text>
      </g>
    );
  };

  // Custom tooltip
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;

      return (
        <div className="bg-white p-4 border border-gray-300 rounded-lg shadow-lg text-sm max-w-xs">
          <p className="font-semibold text-gray-800 border-b pb-2 mb-2">
            {data.name} - {data.category}
          </p>
          <div className="space-y-1">
            <p>
              <span className="font-medium">Minimum:</span> {data.min.toFixed(2)} menit
            </p>
            <p>
              <span className="font-medium text-red-600">Rata-rata:</span>{" "}
              {data.median.toFixed(2)} menit
            </p>
            <p>
              <span className="font-medium">Maksimum:</span> {data.max.toFixed(2)} menit
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-6 max-w-4xl mx-auto">
        <div className="animate-pulse">
          {/* Header skeleton */}
          <div className="text-center mb-6">
            <div className="h-6 bg-gray-200 rounded w-3/4 mx-auto mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
          </div>

          {/* Chart skeleton */}
          <div className="bg-gray-50 rounded-xl p-4 mb-6">
            <div className="h-80 bg-gray-200 rounded-lg w-full"></div>
          </div>

          {/* Legend skeleton */}
          <div className="flex justify-center gap-8 flex-wrap mb-6">
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-24"></div>
            </div>
          </div>

          {/* Explanation skeleton */}
          <div className="p-4 bg-gray-100 rounded-lg">
            <div className="h-5 bg-gray-200 rounded w-1/3 mb-3"></div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-6 h-1 bg-red-500"></div>
                <div className="h-4 bg-gray-200 rounded w-1/3"></div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-0.5 bg-gray-800"></div>
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!apiData) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-6 max-w-4xl mx-auto">
        <div className="text-center">
          <h3 className="text-2xl font-bold text-gray-800 mb-2">
            Durasi Pelaksanaan Kunjungan Posyandu Oleh Kader di {region}
          </h3>
          <p className="text-gray-600 mb-6">Distribusi Waktu Kunjungan Posyandu</p>
          <div className="bg-gray-50 rounded-xl p-8 text-center">
            <p className="text-gray-500">Tidak ada data yang tersedia untuk ditampilkan</p>
          </div>
        </div>
      </div>
    );
  }

  // Cek apakah data valid
  if (apiData.minimum < 0 || apiData.maksimum < 0 || apiData.rata_rata < 0) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-6 max-w-4xl mx-auto">
        <div className="text-center">
          <h3 className="text-2xl font-bold text-gray-800 mb-2">
            Durasi Pelaksanaan Kunjungan Posyandu Oleh Kader di {region}
          </h3>
          <p className="text-gray-600 mb-6">Distribusi Waktu Kunjungan Posyandu</p>
          <div className="bg-gray-50 rounded-xl p-8 text-center">
            <p className="text-gray-500">Data tidak valid untuk ditampilkan</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 max-w-4xl mx-auto">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-gray-800 mb-2">
          Durasi Pelaksanaan Kunjungan Oleh Kader di {region}
        </h3>
        <p className="text-gray-600">Distribusi Waktu Kunjungan Posyandu</p>
      </div>

      <div className="bg-gray-50 rounded-xl p-4">
        <ResponsiveContainer width="100%" height={400}>
          <ComposedChart
            data={chartData}
            margin={{ top: 30, right: 40, left: 60, bottom: 80 }}
          >
            <CartesianGrid stroke="#e5e7eb" strokeDasharray="3 3" />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#374151" }}
              height={60}
              label={{ value: "Bulan", position: "insideBottom", offset: -30 }}
            />
            <YAxis
              domain={[0, 'dataMax + 1']} // Domain dinamis dengan padding
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#374151" }}
              tickFormatter={(value) => {
                // Bulatkan ke atas jika memiliki 2 angka di belakang koma
                if (value % 1 !== 0) {
                  return Math.ceil(value * 100) / 100;
                }
                return value;
              }}
              label={{
                value: "Durasi (menit)",
                angle: -90,
                position: "insideLeft",
                style: {
                  textAnchor: "middle",
                  fontSize: "14px",
                  fill: "#374151",
                },
              }}
            />
            <Tooltip content={<CustomTooltip />} />

            {/* Invisible bar to create proper spacing and enable custom drawing */}
            <Bar
              dataKey="max"
              fill="transparent"
              shape={<CustomBoxPlot />}
              maxBarSize={100}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* Enhanced Legend */}
      <div className="mt-6 flex justify-center gap-8 flex-wrap">
        {Object.entries(categoryColors).map(([category, color]) => (
          <div key={category} className="flex items-center gap-3">
            <div className="flex items-center">
              <div
                className="w-5 h-5 rounded border-2"
                style={{
                  backgroundColor: color,
                  opacity: 0.7,
                  borderColor: color,
                }}
              />
            </div>
            <span className="text-sm font-medium text-gray-700">
              {category}
            </span>
          </div>
        ))}
      </div>

      {/* Enhanced Explanation */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h4 className="font-semibold text-blue-800 mb-3">
          Keterangan Visualisasi:
        </h4>
        <div className="space-y-2 text-sm text-gray-700">
          <div className="flex items-center gap-2">
            <div className="w-6 h-1 bg-red-500"></div>
            <span>Garis merah = Rata-rata</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-0.5 bg-gray-800"></div>
            <span>Whisker = Nilai Minimum dan Maksimum</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DurasiKunjunganRumahBwi;