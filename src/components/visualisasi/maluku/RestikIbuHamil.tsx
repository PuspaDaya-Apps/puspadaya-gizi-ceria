import React, { useEffect, useRef, useState } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
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
    anemia: {
      jumlah: number;
      hbb_tidak_diketahui: number;
    };
    pendek: number;
    terlalu_tua: number;
    terlalu_muda: number;
    total_sasaran: number;
  };
}

const RestikIbuHamilMlk : React.FC<DataSectionProps> = ({ region, desa, posyandu }) => {
  const barChartRef = useRef<HTMLDivElement>(null);
  const [riskData, setRiskData] = useState<RiskData[]>([]);
  const [totalPengukuran, setTotalPengukuran] = useState<number>(0);
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
        const res = await fetch(`/ibu-hamil?${query.toString()}`);
        const json: ApiResponse = await res.json();

        if (json.data) {
          const mappedData: RiskData[] = [
            { name: "KEK", value: json.data.kek },
            { name: "Anemia", value: json.data.anemia.jumlah },
            { name: "Pendek", value: json.data.pendek },
            { name: "Terlalu Tua", value: json.data.terlalu_tua },
            { name: "Terlalu Muda", value: json.data.terlalu_muda },
            { name: "Hb Belum Diketahui", value: json.data.anemia.hbb_tidak_diketahui },
          ];
          setRiskData(mappedData);
          setTotalPengukuran(json.data.total_sasaran);
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

  const displayData =
    riskData.length > 0
      ? riskData
      : [
          { name: "KEK", value: 0 },
          { name: "Anemia", value: 0 },
          { name: "Pendek", value: 0 },
          { name: "Terlalu Tua", value: 0 },
          { name: "Terlalu Muda", value: 0 },
          { name: "Hb Belum Diketahui", value: 0 },
        ];

  if (loading) {
    return (
      <div className="text-center py-10 text-gray-500">
        Memuat data {region}...
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow p-6 relative mb-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
        <h3 className="text-xl font-semibold text-primary text-center w-full">
          Ibu Hamil Beresiko - {region}
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

      {/* Chart */}
      <div ref={barChartRef} className="bg-white p-6 rounded-lg">
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            data={displayData}
            layout="vertical"
            margin={{ top: 20, right: 30, left: 130, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" tick={{ fontSize: 12 }} />
            <YAxis dataKey="name" type="category" width={90} tick={{ fontSize: 12 }} />
            <Tooltip />
            <Bar dataKey="value" fill="#8884d8">
              <LabelList dataKey="value" position="right" fontSize={12} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>

        <div className="mt-6 bg-gray-100 rounded-lg p-4 text-center">
          <p className="text-gray-600 font-medium">
            Total Sasaran:
            <span className="text-gray-800 font-semibold ml-2">
              {totalPengukuran.toLocaleString()}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RestikIbuHamilMlk ;
