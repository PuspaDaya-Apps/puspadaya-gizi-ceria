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
}

interface RiskData {
  name: string;
  value: number;
}

const RestikIbuHamil: React.FC<DataSectionProps> = ({ region }) => {
  const barChartRef = useRef<HTMLDivElement>(null);
  const [riskData, setRiskData] = useState<RiskData[]>([]);
  const [loading, setLoading] = useState(true);

  // Data dummy untuk risiko ibu hamil
  const dummyData: RiskData[] = [
    { name: "KEK", value: 45 },
    { name: "Anemia", value: 62 },
    { name: "Pendek", value: 28 },
    { name: "Terlalu Tua", value: 15 },
    { name: "Terlalu Muda", value: 32 },
  ];

  // Fungsi download chart sebagai PNG/JPEG
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

  // Simulasi pengambilan data
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Simulasi delay untuk loading
        await new Promise(resolve => setTimeout(resolve, 1000));
        setRiskData(dummyData);
      } catch (err) {
        console.error("Error fetching data:", err);
        // Gunakan data dummy jika terjadi error
        setRiskData(dummyData);
      } finally {
        setLoading(false);
      }
    };

    if (region) fetchData();
  }, [region]);

  const isAllZero = riskData.every(d => d.value === 0);

  if (loading) {
    return (
      <div className="text-center py-10 text-gray-500">
        Memuat data {region}...
      </div>
    );
  }

  // Jika semua 0
  if (!loading && isAllZero) {
    return (
      <div className="bg-white rounded-2xl shadow p-6 text-center mb-8">
        <h3 className="text-xl font-semibold text-primary mb-4">
          Risiko Ibu Hamil
        </h3>
        <p className="text-gray-500">
          Tidak ada data risiko ibu hamil.
        </p>
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
                  className={`${
                    active ? "bg-gray-100" : ""
                  } w-full px-4 py-2 text-left text-sm text-gray-700`}
                >
                  Download PNG
                </button>
              )}
            </MenuItem>
            <MenuItem>
              {({ active }) => (
                <button
                  onClick={() => handleDownload("jpeg")}
                  className={`${
                    active ? "bg-gray-100" : ""
                  } w-full px-4 py-2 text-left text-sm text-gray-700`}
                >
                  Download JPG
                </button>
              )}
            </MenuItem>
          </MenuItems>
        </Menu>
      </div>

      {/* Chart + Title dalam 1 ref supaya judul ikut ke gambar */}
      <div ref={barChartRef} className="bg-white p-6 rounded-lg">
        <h3 className="text-xl font-semibold text-primary mb-4 text-center">
          Risiko Ibu Hamil - {region}
        </h3>

        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            data={riskData}
            layout="vertical"
            margin={{ top: 20, right: 30, left: 100, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" />
            <YAxis 
              dataKey="name" 
              type="category" 
              width={90}
            />
            <Tooltip 
              formatter={(value) => [`${value} `, "Jumlah"]}
              labelFormatter={(name) => `Risiko: ${name}`}
            />
            <Legend />
            <Bar dataKey="value" fill="#8884d8">
              <LabelList 
                dataKey="value" 
                position="right" 
                formatter={(value) => `${value} `}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        
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
