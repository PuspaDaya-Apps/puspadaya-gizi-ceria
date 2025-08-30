import React, { useEffect, useRef, useState } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LabelList,
} from "recharts";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { MoreVertical } from "lucide-react";
import * as htmlToImage from "html-to-image";

interface DataSectionProps {
  region: string;
  desa?: string;
  posyandu?: string;
}

interface RiskData {
  name: string;
  value: number;
}

interface ApiResponse {
  data: {
    kek: number;
    anemia: number;
    pendek: number;
    terlalu_tua: number;
    terlalu_muda: number;
    total_pengukuran: number;
  };
}

const RestikIbuHamil: React.FC<DataSectionProps> = ({ region, desa, posyandu }) => {
  const barChartRef = useRef<HTMLDivElement>(null);
  const [riskData, setRiskData] = useState<RiskData[]>([]);
  const [totalPengukuran, setTotalPengukuran] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  // Ambil data dari API
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const query = new URLSearchParams({
          kabupaten_kota: region,
          ...(desa ? { desa } : {}),
          ...(posyandu ? { posyandu } : {}),
        });
        const res = await fetch(`/ibu-hamil?${query.toString()}`);
        const json: ApiResponse = await res.json();

        if (json.data) {
          const mappedData: RiskData[] = [
            { name: "KEK", value: json.data.kek },
            { name: "Anemia", value: json.data.anemia },
            { name: "Pendek", value: json.data.pendek },
            { name: "Terlalu Tua", value: json.data.terlalu_tua },
            { name: "Terlalu Muda", value: json.data.terlalu_muda },
          ];
          setRiskData(mappedData);
          setTotalPengukuran(json.data.total_pengukuran);
        } else {
          setRiskData([]);
          setTotalPengukuran(0);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        setRiskData([]);
        setTotalPengukuran(0);
      } finally {
        setLoading(false);
      }
    };

    if (region) fetchData();
  }, [region, desa, posyandu]);

  // Download chart
  const handleDownload = async (format: "png" | "jpeg") => {
    if (!barChartRef.current) return;

    const options = { backgroundColor: "#ffffff" };

    const dataUrl =
      format === "png"
        ? await htmlToImage.toPng(barChartRef.current, options)
        : await htmlToImage.toJpeg(barChartRef.current, {
            quality: 0.95,
            backgroundColor: "#ffffff",
          });

    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = `RisikoIbuHamil.${format}`;
    link.click();
  };

  const isAllZero = riskData.every((d) => d.value === 0);

  if (loading) {
    return (
      <div className="text-center py-10 text-gray-500">
        Memuat data {region}...
      </div>
    );
  }

  if (!loading && isAllZero) {
    return (
      <div className="bg-white rounded-2xl shadow p-6 text-center mb-8">
        <h3 className="text-xl font-semibold text-primary mb-4">
          Risiko Ibu Hamil
        </h3>
        <p className="text-gray-500">Tidak ada data risiko ibu hamil.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow p-6 relative mb-8">
      {/* Header + menu download */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
        <h3 className="text-xl font-semibold text-primary text-center w-full">
          Risiko Ibu Hamil
        </h3>

        <Menu as="div" className="relative inline-block text-left">
          <MenuButton className="p-2 rounded-full hover:bg-gray-100">
            <MoreVertical className="w-5 h-5 text-gray-600" />
          </MenuButton>
          <MenuItems className="absolute right-0 mt-2 w-40 origin-top-right bg-white border border-gray-200 rounded-lg shadow-lg focus:outline-none">
            <MenuItem>
              {({ active }) => (
                <button
                  onClick={() => handleDownload("png")}
                  className={`${active ? "bg-gray-100" : ""} w-full px-4 py-2 text-left text-sm text-gray-700`}
                >
                  Download PNG
                </button>
              )}
            </MenuItem>
            <MenuItem>
              {({ active }) => (
                <button
                  onClick={() => handleDownload("jpeg")}
                  className={`${active ? "bg-gray-100" : ""} w-full px-4 py-2 text-left text-sm text-gray-700`}
                >
                  Download JPG
                </button>
              )}
            </MenuItem>
          </MenuItems>
        </Menu>
      </div>

      {/* Chart + Title */}
      <div ref={barChartRef} className="bg-white p-6 rounded-lg">
        <h3 className="text-xl font-semibold text-primary mb-2 text-center">
          Risiko Ibu Hamil - {region}
        </h3>

        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            data={riskData}
            layout="vertical"
            margin={{ top: 20, right: 30, left: 100, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              type="number" 
              tick={{ fontSize: 12 }}
              tickFormatter={(value) => {
                if (value % 1 !== 0) {
                  return Math.ceil(value * 100) / 100;
                }
                return value;
              }}
            />
            <YAxis 
              dataKey="name" 
              type="category" 
              width={90}
              tick={{ fontSize: 12 }}
            />
            <Tooltip
              formatter={(value) => [`${value}`, "Jumlah"]}
              labelFormatter={(name) => `Risiko: ${name}`}
            />
            <Legend />
            <Bar dataKey="value" fill="#8884d8">
              <LabelList 
                dataKey="value" 
                position="right" 
                formatter={(value) => `${value}`}
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>

        {/* Total Pengukuran - Simple Style Below Chart */}
        <div className="mt-6 bg-gray-100 rounded-lg p-4 text-center">
          <p className="text-gray-600 font-medium">Total Pengukuran: 
            <span className="text-gray-800 font-semibold ml-2">{totalPengukuran.toLocaleString()}</span>
          </p>
        </div>

        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <h4 className="font-semibold text-blue-800 mb-2">Keterangan Risiko:</h4>
          <ul className="text-sm text-gray-700 list-disc pl-5 space-y-1">
            <li>KEK (Kurang Energi Kronis): Kondisi ibu hamil dengan asupan energi kurang dari kebutuhan</li>
            <li>Anemia: Kondisi ibu hamil dengan kadar hemoglobin rendah</li>
            <li>Pendek: Tinggi badan ibu hamil kurang dari 145 cm</li>
            <li>Terlalu Tua: Ibu hamil berusia di atas 35 tahun</li>
            <li>Terlalu Muda: Ibu hamil berusia di bawah 20 tahun</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default RestikIbuHamil;