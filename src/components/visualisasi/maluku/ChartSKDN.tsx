import React, { useEffect, useRef, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LabelList,
} from "recharts";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { MoreVertical } from "lucide-react";
import * as htmlToImage from "html-to-image";

interface DataSectionProps {
  region: string;
}

const ChartSKDNMlk: React.FC<DataSectionProps> = ({ region }) => {
  // ref untuk seluruh chart + title
  const skdnChartRef = useRef<HTMLDivElement>(null);

  const [skdnData, setSkdnData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const currentMonth = new Date().toLocaleString("id-ID", { month: "long" });

  // Fungsi download chart sebagai PNG/JPEG
  const handleDownload = async (format: "png" | "jpeg") => {
    if (!skdnChartRef.current) return;

    const options = { backgroundColor: "#ffffff" };

    const dataUrl =
      format === "png"
        ? await htmlToImage.toPng(skdnChartRef.current, options)
        : await htmlToImage.toJpeg(skdnChartRef.current, {
            quality: 0.95,
            backgroundColor: "#ffffff",
          });

    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = `skdn-chart-${currentMonth}.${format}`;
    link.click();
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/data-skdn?kabupaten_kota=${region}`);
        const json = await res.json();

        if (json.data) {
          const mappedData = [
            {
              name: currentMonth,
              S: json.data.S,
              K: json.data.K,
              D: json.data.D,
              N: json.data.N,
            },
          ];
          setSkdnData(mappedData);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    if (region) {
      fetchData();
    }
  }, [region, currentMonth]);

  if (loading) {
    return (
      <div className="text-center py-10 text-gray-500">
        Memuat data {region}...
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow p-6 relative">
      {/* Header + Burger Menu */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
        <h3 className="text-xl font-semibold text-primary text-center w-full">
          {/* Grafik SKDN Bulan {currentMonth} */}
        </h3>

        <Menu as="div" className="relative inline-block text-left">
          <MenuButton className="p-2 rounded-full hover:bg-gray-100">
            <MoreVertical className="w-5 h-5 text-gray-600" />
          </MenuButton>
          <MenuItems className="absolute right-0 mt-2 w-44 origin-top-right bg-white border border-gray-200 rounded-lg shadow-lg focus:outline-none">
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

      {/* Chart + Title dibungkus dalam satu ref */}
      <div ref={skdnChartRef} className="bg-white p-4 rounded-lg">
        {/* Title khusus untuk gambar */}
     <h3   className="text-xl font-semibold text-primary text-center w-full">
          Grafik SKDN Bulan {currentMonth} - {region}
        </h3>

        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            data={skdnData}
            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="S" fill="#3b82f6">
              <LabelList
                dataKey="S"
                position="top"
                formatter={(value: number) =>
                  value === 0 ? "0 (Tidak ada data)" : value
                }
              />
            </Bar>
            <Bar dataKey="K" fill="#10b981">
              <LabelList
                dataKey="K"
                position="top"
                formatter={(value: number) =>
                  value === 0 ? "0 (Tidak ada data)" : value
                }
              />
            </Bar>
            <Bar dataKey="D" fill="#f59e0b">
              <LabelList
                dataKey="D"
                position="top"
                formatter={(value: number) =>
                  value === 0 ? "0 (Tidak ada data)" : value
                }
              />
            </Bar>
            <Bar dataKey="N" fill="#ef4444">
              <LabelList
                dataKey="N"
                position="top"
                formatter={(value: number) =>
                  value === 0 ? "0 (Tidak ada data)" : value
                }
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Keterangan SKDN */}
      <div className="p-4 bg-gray-50 rounded-lg text-sm text-gray-700 flex justify-center gap-6">
        <p>
          <span className="font-bold text-blue-600">S</span> = Sasaran
        </p>
        <p>
          <span className="font-bold text-green-600">K</span> = KMS/KIA
        </p>
        <p>
          <span className="font-bold text-yellow-600">D</span> = Ditimbang
        </p>
        <p>
          <span className="font-bold text-red-600">N</span> = Naik Berat Badan
        </p>
      </div>
    </div>
  );
};

export default ChartSKDNMlk;
