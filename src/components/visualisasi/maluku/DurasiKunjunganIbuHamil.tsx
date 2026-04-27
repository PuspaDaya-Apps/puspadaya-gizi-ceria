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
  month: number;
  year: number;
}

interface BoxPlotData {
  name: string;
  category: string;
  min: number;
  q1: number;
  median: number;
  q3: number;
  max: number;
}

interface ApiResponse {
  rata_rata: number;
  minimum: number;
  maksimum: number;
  median: number;
  q1: number;
  q3: number;
}

const DurasiKunjunganIbuHamilMlk: React.FC<DataSectionProps> = ({
  region,
  desa,
  posyandu,
  month,
  year,
}) => {
  const [loading, setLoading] = useState(true);
  const [apiData, setApiData] = useState<ApiResponse | null>(null);

  // --- LOGIKA PENENTUAN TANGGAL ---
  const now = new Date();
  // Jika month 0, gunakan bulan sekarang
  const effectiveMonth = month === 0 ? now.getMonth() + 1 : month;
  // Jika year 0, gunakan tahun sekarang
  const effectiveYear = year === 0 ? now.getFullYear() : year;

  // Helper: Nama Bulan
  const getMonthName = (m: number) => {
    const months = [
      "Januari", "Februari", "Maret", "April", "Mei", "Juni",
      "Juli", "Agustus", "September", "Oktober", "November", "Desember"
    ];
    return months[m - 1] || "";
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const query = new URLSearchParams({
          kabupaten_kota: region,
          ...(desa ? { desa } : {}),
          ...(posyandu ? { posyandu } : {}),
          bulan: effectiveMonth.toString(),
          tahun: effectiveYear.toString(),
        });

        const res = await fetch(`/api/waktu-kunjungan-ibu-hamil?${query.toString()}`);
        
        if (!res.ok) {
           throw new Error(`HTTP error! status: ${res.status}`);
        }
        
        const json = await res.json();

        if (json.data) {
          setApiData(json.data);
        } else if (json.rata_rata !== undefined || json.minimum !== undefined) {
           setApiData(json);
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
  }, [region, desa, posyandu, effectiveMonth, effectiveYear]);

  // Prepare Data
  const prepareBoxPlotData = (): BoxPlotData[] => {
    const safeData = apiData ?? {
      minimum: 0,
      q1: 0,
      median: 0,
      q3: 0,
      maksimum: 0,
    };

    // Helper function to convert values, handling "-" as 0
    const convertValue = (value: any): number => {
      if (value === null || value === undefined || value === "-" || value === "") {
        return 0;
      }
      const num = Number(value);
      return isNaN(num) ? 0 : num;
    };

    return [
      {
        name: `${getMonthName(effectiveMonth)} ${effectiveYear}`,
        category: "Durasi Kunjungan Ibu Hamil",
        min: convertValue(safeData.minimum),
        q1: convertValue(safeData.q1),
        median: convertValue(safeData.median),
        q3: convertValue(safeData.q3),
        max: convertValue(safeData.maksimum),
      },
    ];
  };

  const boxPlotData = prepareBoxPlotData();

  const categoryColors = {
    "Durasi Kunjungan Ibu Hamil": "#3D9970",
  };

  const chartData = boxPlotData.map((item, index) => ({
    name: item.name,
    category: item.category,
    index,
    min: item.min,
    q1: item.q1,
    median: item.median,
    q3: item.q3,
    max: item.max,
    color: categoryColors[item.category as keyof typeof categoryColors],
  }));

  // Custom Chart Component
  const CustomBoxPlot = (props: any) => {
    const { payload, x, y, width, height } = props;

    if (!payload) return null;

    const centerX = x + width / 2;
    const boxWidth = width * 0.6;
    const whiskerWidth = width * 0.3;
    const chartBottom = y + height;

    const maxDataValue = Math.max(payload.max, payload.q3, payload.median, payload.q1, payload.min);
    const domainMax = maxDataValue > 0 ? Math.ceil(maxDataValue * 1.2) : 5;
    const scale = height / domainMax;

    const minY = chartBottom - payload.min * scale;
    const q1Y = chartBottom - payload.q1 * scale;
    const medianY = chartBottom - payload.median * scale;
    const q3Y = chartBottom - payload.q3 * scale;
    const maxY = chartBottom - payload.max * scale;

    const validatedMinY = Math.max(y, Math.min(minY, chartBottom));
    const validatedQ1Y = Math.max(y, Math.min(q1Y, chartBottom));
    const validatedMedianY = Math.max(y, Math.min(medianY, chartBottom));
    const validatedQ3Y = Math.max(y, Math.min(q3Y, chartBottom));
    const validatedMaxY = Math.max(y, Math.min(maxY, chartBottom));

    return (
      <g>
        <rect
          x={centerX - boxWidth / 2}
          y={validatedQ3Y}
          width={boxWidth}
          height={Math.max(0, validatedQ1Y - validatedQ3Y)}
          fill={payload.color}
          opacity={0.6}
          stroke="#374151"
          strokeWidth={1}
        />
        <line
          x1={centerX - boxWidth / 2}
          y1={validatedMedianY}
          x2={centerX + boxWidth / 2}
          y2={validatedMedianY}
          stroke="#DC2626"
          strokeWidth={2}
        />
        <line
          x1={centerX}
          y1={validatedMinY}
          x2={centerX}
          y2={validatedQ1Y}
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
        <line
          x1={centerX}
          y1={validatedQ3Y}
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
        <text x={centerX} y={validatedMinY - 5} fontSize={10} fill="#374151" textAnchor="middle" fontWeight="bold">
          {payload.min.toFixed(2)}
        </text>
        <text x={centerX} y={validatedQ1Y + 15} fontSize={10} fill="#374151" textAnchor="middle">
          {payload.q1.toFixed(2)}
        </text>
        <text x={centerX} y={validatedMedianY - 5} fontSize={10} fill="#DC2626" textAnchor="middle" fontWeight="bold">
          {payload.median.toFixed(2)}
        </text>
        <text x={centerX} y={validatedQ3Y + 15} fontSize={10} fill="#374151" textAnchor="middle">
          {payload.q3.toFixed(2)}
        </text>
        <text x={centerX} y={validatedMaxY - 5} fontSize={10} fill="#374151" textAnchor="middle" fontWeight="bold">
          {payload.max.toFixed(2)}
        </text>
      </g>
    );
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-4 border border-gray-300 rounded-lg shadow-lg text-sm max-w-xs">
          <p className="font-semibold text-gray-800 border-b pb-2 mb-2">
            {data.name} - {data.category}
          </p>
          <div className="space-y-1">
            <p><span className="font-medium">Minimum:</span> {data.min.toFixed(2)} menit</p>
            <p><span className="font-medium">Kuartil 1 (Q1):</span> {data.q1.toFixed(2)} menit</p>
            <p><span className="font-medium text-red-600">Median:</span> {data.median.toFixed(2)} menit</p>
            <p><span className="font-medium">Kuartil 3 (Q3):</span> {data.q3.toFixed(2)} menit</p>
            <p><span className="font-medium">Maksimum:</span> {data.max.toFixed(2)} menit</p>
          </div>
        </div>
      );
    }
    return null;
  };

  const renderContainer = (content: React.ReactNode) => (
    <div className="bg-white rounded-2xl shadow-lg p-6 max-w-4xl mx-auto">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-gray-800 mb-2">
          Durasi Kunjungan Ibu Hamil Oleh Kader di {region}
        </h3>
        <p className="text-gray-600">Distribusi Waktu Kunjungan Ibu Hamil</p>
      </div>
      {content}
    </div>
  );

  if (loading) {
    return renderContainer(
      <div className="animate-pulse">
        <div className="bg-gray-50 rounded-xl p-4 mb-6">
          <div className="h-80 bg-gray-200 rounded-lg w-full"></div>
        </div>
      </div>
    );
  }

  // Continue to render the chart regardless of negative values

  return renderContainer(
    <>
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
              tick={false} // MENYEMBUNYIKAN NAMA BULAN DI GARIS AXIS
              height={50}
              label={{ 
                value: `Periode ${getMonthName(effectiveMonth)} ${effectiveYear}`, // Label Dinamis
                position: "insideBottom", 
                offset: -40, 
                fontSize: 14 
              }}
            />
            <YAxis
              domain={[0, 'dataMax + 1']}
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#374151" }}
              tickFormatter={(value) => {
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

            <Bar
              dataKey="max"
              fill="transparent"
              shape={<CustomBoxPlot />}
              maxBarSize={100}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

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

      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h4 className="font-semibold text-blue-800 mb-3">
          Keterangan Visualisasi Box Plot:
        </h4>
        <div className="space-y-2 text-sm text-gray-700">
          <div className="flex items-center gap-2">
            <div className="w-6 h-1 bg-red-500"></div>
            <span>Garis merah = Nilai Median (titik tengah data)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 border-2 border-gray-800 bg-green-500 opacity-60"></div>
            <span>Kotak = Rentang Interkuartil (Q1 hingga Q3) - 50% data tengah</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-0.5 bg-gray-800"></div>
            <span>Garis (whisker) = Rentang nilai minimum hingga maksimum</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="text-xs font-mono">Q1</div>
            <span> = Kuartil 1 </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="text-xs font-mono">Q3</div>
            <span> = Kuartil 3 </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default DurasiKunjunganIbuHamilMlk;
