import React from "react";
import {
  ResponsiveContainer,
  ComposedChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Bar,
  ReferenceLine,
} from "recharts";

interface DataSectionProps {
  region: string;
}

interface BoxPlotData {
  name: string;
  category: string;
  min: number;
  q1: number;
  median: number;
  q3: number;
  max: number;
  outliers?: number[];
}

const DurasiKunjunganRumahBwi: React.FC<DataSectionProps> = ({ region }) => {
  const regionName = region || "BWI";
  // Box plot data
  const rawData: BoxPlotData[] = [
    {
      name: "Agustus",
      category: "< 30 menit",
      min: 12,
      q1: 18,
      median: 22,
      q3: 26,
      max: 29,
      outliers: [8, 31],
    },
    {
      name: "Agustus",
      category: "30-60 menit",
      min: 32,
      q1: 38,
      median: 45,
      q3: 52,
      max: 59,
      outliers: [61],
    },
    {
      name: "Agustus",
      category: "> 60 menit",
      min: 62,
      q1: 68,
      median: 75,
      q3: 83,
      max: 92,
      outliers: [95],
    },
  ];

  // Categories for coloring
  const categoryColors = {
    "< 30 menit": "#3D9970",
    "30-60 menit": "#FF851B",
    "> 60 menit": "#FF4136"
  };

  // Prepare data for chart - create stacked bars for box plot
  const chartData = rawData.map((item, index) => ({
    category: item.category,
    index,
    // Create segments for stacked visualization
    bottomWhisker: item.q1 - item.min,
    box: item.q3 - item.q1,
    topWhisker: item.max - item.q3,
    // Store all values for tooltip and reference lines
    min: item.min,
    q1: item.q1,
    median: item.median,
    q3: item.q3,
    max: item.max,
    outliers: item.outliers,
    color: categoryColors[item.category as keyof typeof categoryColors],
    // Base values for stacking
    minBase: 0,
    q1Base: item.min,
    boxBase: item.q1,
    medianValue: item.median,
    q3Base: item.q3,
  }));

  // Custom bar shape for box plot elements
  const CustomBoxPlot = (props: any) => {
    const { payload, x, y, width, height, index } = props;
    
    if (!payload) return null;

    const centerX = x + width / 2;
    const boxWidth = width * 0.4;
    const whiskerWidth = width * 0.2;
    
    // Calculate positions based on chart scaling
    const chartBottom = y + height;
    const scale = height / (payload.max + 10); // Add some padding
    
    const minY = chartBottom - (payload.min * scale);
    const q1Y = chartBottom - (payload.q1 * scale);
    const medianY = chartBottom - (payload.median * scale);
    const q3Y = chartBottom - (payload.q3 * scale);
    const maxY = chartBottom - (payload.max * scale);
    
    return (
      <g>
        {/* Main box (IQR) */}
        <rect
          x={centerX - boxWidth/2}
          y={q3Y}
          width={boxWidth}
          height={q1Y - q3Y}
          fill={payload.color}
          fillOpacity={0.7}
          stroke={payload.color}
          strokeWidth={2}
        />
        
        {/* Median line */}
        <line
          x1={centerX - boxWidth/2}
          y1={medianY}
          x2={centerX + boxWidth/2}
          y2={medianY}
          stroke="#DC2626"
          strokeWidth={3}
        />
        
        {/* Bottom whisker */}
        <line
          x1={centerX}
          y1={minY}
          x2={centerX}
          y2={q1Y}
          stroke="#374151"
          strokeWidth={2}
        />
        <line
          x1={centerX - whiskerWidth/2}
          y1={minY}
          x2={centerX + whiskerWidth/2}
          y2={minY}
          stroke="#374151"
          strokeWidth={2}
        />
        
        {/* Top whisker */}
        <line
          x1={centerX}
          y1={q3Y}
          x2={centerX}
          y2={maxY}
          stroke="#374151"
          strokeWidth={2}
        />
        <line
          x1={centerX - whiskerWidth/2}
          y1={maxY}
          x2={centerX + whiskerWidth/2}
          y2={maxY}
          stroke="#374151"
          strokeWidth={2}
        />
        
        {/* Outliers */}
        {payload.outliers?.map((outlier: number, i: number) => {
          const outlierY = chartBottom - (outlier * scale);
          return (
            <circle
              key={`outlier-${i}`}
              cx={centerX}
              cy={outlierY}
              r={4}
              fill="#F59E0B"
              stroke="#D97706"
              strokeWidth={1}
            />
          );
        })}
        
        {/* Labels for values */}
        <text
          x={centerX + boxWidth/2 + 5}
          y={medianY + 3}
          fontSize={10}
          fill="#374151"
          fontWeight="bold"
        >
          {payload.median}
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
            {data.category} - Agustus
          </p>
          <div className="space-y-1">
            <p><span className="font-medium">Minimum:</span> {data.min} menit</p>
            <p><span className="font-medium">Q1 (25%):</span> {data.q1} menit</p>
            <p><span className="font-medium text-red-600">Median:</span> {data.median} menit</p>
            <p><span className="font-medium">Q3 (75%):</span> {data.q3} menit</p>
            <p><span className="font-medium">Maksimum:</span> {data.max} menit</p>
            {data.outliers?.length ? (
              <p><span className="font-medium text-orange-600">Outliers:</span> {data.outliers.join(", ")} menit</p>
            ) : null}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 max-w-4xl mx-auto">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-gray-800 mb-2">
          Durasi Kunjungan Rumah {regionName}
        </h3>
        <p className="text-gray-600">Distribusi Waktu Kunjungan - Bulan Agustus</p>
      </div>

      <div className="bg-gray-50 rounded-xl p-4">
        <ResponsiveContainer width="100%" height={400}>
          <ComposedChart
            data={chartData}
            margin={{ top: 30, right: 40, left: 60, bottom: 80 }}
          >
            <CartesianGrid stroke="#e5e7eb" strokeDasharray="3 3" />
            <XAxis
              dataKey="category"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#374151' }}
              height={60}
            />
            <YAxis
              domain={[0, 100]}
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#374151' }}
              label={{ 
                value: "Durasi (menit)", 
                angle: -90, 
                position: "insideLeft",
                style: { textAnchor: 'middle', fontSize: '14px', fill: '#374151' }
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
                style={{ backgroundColor: color, opacity: 0.7, borderColor: color }}
              />
            </div>
            <span className="text-sm font-medium text-gray-700">{category}</span>
          </div>
        ))}
      </div>

      {/* Enhanced Explanation */}
      <div className="mt-6 grid md:grid-cols-2 gap-4">
        <div className="p-4 bg-blue-50 rounded-lg">
          <h4 className="font-semibold text-blue-800 mb-3">Keterangan Box Plot:</h4>
          <div className="space-y-2 text-sm text-gray-700">
            <div className="flex items-center gap-2">
              <div className="w-6 h-4 bg-gray-400 opacity-70 rounded-sm"></div>
              <span>Box = IQR (Q1–Q3)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-1 bg-red-500"></div>
              <span>Garis merah = Median</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-0.5 bg-gray-800"></div>
              <span>Whisker = Min-Max</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
              <span>Outliers</span>
            </div>
          </div>
        </div>
        
        <div className="p-4 bg-green-50 rounded-lg">
          <h4 className="font-semibold text-green-800 mb-3">Ringkasan Data:</h4>
          <div className="text-sm text-gray-700 space-y-1">
            <p><strong> {"<"} 30 menit:</strong> Median 22 menit</p>
            <p><strong>30-60 menit:</strong> Median 45 menit</p>
            <p><strong> {">"} 60 menit:</strong> Median 75 menit</p>
            <p className="text-xs text-gray-500 mt-2">
              Sebagian besar kunjungan berlangsung 30-60 menit
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DurasiKunjunganRumahBwi;