import React, { useEffect, useRef, useState } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
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

interface GiziData {
  bulan: string;
  stunting: number;
  wasting: number;
  underweight: number;
  normal: number;
}

const ProgresIbuHamilBwi: React.FC<DataSectionProps> = ({ region }) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const [giziData, setGiziData] = useState<GiziData[]>([]);
  const [loading, setLoading] = useState(true);

  const handleDownload = async (format: "png" | "jpeg") => {
    if (!chartRef.current) return;
    const options = { backgroundColor: "#ffffff" };
    const dataUrl =
      format === "png"
        ? await htmlToImage.toPng(chartRef.current, options)
        : await htmlToImage.toJpeg(chartRef.current, {
            quality: 0.95,
            backgroundColor: "#ffffff",
          });
    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = `ProgresGizi.${format}`;
    link.click();
  };

  useEffect(() => {
    setLoading(true);
    try {
      const dummyData: GiziData[] = [
        { bulan: "Jan", stunting: 15, wasting: 10, underweight: 8, normal: 67 },
        { bulan: "Feb", stunting: 12, wasting: 11, underweight: 7, normal: 70 },
        { bulan: "Mar", stunting: 14, wasting: 9, underweight: 6, normal: 71 },
        { bulan: "Apr", stunting: 11, wasting: 8, underweight: 5, normal: 76 },
        { bulan: "Mei", stunting: 10, wasting: 7, underweight: 5, normal: 78 },
        { bulan: "Jun", stunting: 9, wasting: 7, underweight: 4, normal: 80 },
      ];
      setGiziData(dummyData);
    } catch (err) {
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false);
    }
  }, [region]);

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
          Progres Ibu Hamil - {region}
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

      {/* Chart */}
      <div ref={chartRef} className="bg-white p-6 rounded-lg">
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={giziData} margin={{ top: 20, right: 30, left: 10, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="bulan" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="stunting" stroke="#ef4444" strokeWidth={2}>
              <LabelList dataKey="stunting" position="top" />
            </Line>
            <Line type="monotone" dataKey="wasting" stroke="#3b82f6" strokeWidth={2}>
              <LabelList dataKey="wasting" position="top" />
            </Line>
            <Line type="monotone" dataKey="underweight" stroke="#8B4513" strokeWidth={2}>
              <LabelList dataKey="underweight" position="top" />
            </Line>
            <Line type="monotone" dataKey="normal" stroke="#000000" strokeWidth={2}>
              <LabelList dataKey="normal" position="top" />
            </Line>
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ProgresIbuHamilBwi;
