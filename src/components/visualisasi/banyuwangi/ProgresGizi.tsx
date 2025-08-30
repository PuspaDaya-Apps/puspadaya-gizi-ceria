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
  desa?: string;
  posyandu?: string;
}

interface GiziData {
  bulan: string;
  stunting: number;
  wasting: number;
  underweight: number;
  normal: number;
}

const ProgresGiziBwi: React.FC<DataSectionProps> = ({
  region,
  desa,
  posyandu,
}) => {
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
    const fetchData = async () => {
      setLoading(true);
      try {
        // Bangun query param dinamis
        const query = new URLSearchParams({
          kabupaten_kota: region,
          ...(desa ? { desa } : {}),
          ...(posyandu ? { posyandu } : {}),
        });
        const res = await fetch(`/progres-status-gizi?${query.toString()}`);
        const json = await res.json();

        if (json.data) {
          // Mapping data response ke array untuk recharts
          const mappedData: GiziData[] = Object.entries(json.data).map(
            ([bulan, values]: any) => ({
              bulan,
              stunting: values.total_stunting ?? 0,
              wasting: values.total_wasting ?? 0,
              underweight: values.total_underweight ?? 0,
              normal: values.total_normal ?? 0,
            })
          );

          setGiziData(mappedData);
        } else {
          setGiziData([]);
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
  }, [region, desa, posyandu]);

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
          Progres Status Gizi - {region}
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
          <LineChart
            data={giziData}
            margin={{ top: 20, right: 30, left: 10, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="bulan"
              interval={0} // pastikan semua bulan tampil
              padding={{ left: 20, right: 20 }} // kasih space kanan-kiri
              angle={-15} // opsional: miringin dikit biar gak tabrakan
              textAnchor="end"
            />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="stunting"
              stroke="#ef4444"
              strokeWidth={2}
              name="Stunting"
            >
              <LabelList dataKey="stunting" position="top" />
            </Line>
            <Line
              type="monotone"
              dataKey="wasting"
              stroke="#3b82f6"
              strokeWidth={2}
              name="Wasting"
            >
              <LabelList dataKey="wasting" position="top" />
            </Line>
            <Line
              type="monotone"
              dataKey="underweight"
              stroke="#8B4513"
              strokeWidth={2}
              name="Underweight"
            >
              <LabelList dataKey="underweight" position="top" />
            </Line>
            <Line
              type="monotone"
              dataKey="normal"
              stroke="#16a34a"
              strokeWidth={2}
              name="Normal"
            >
              <LabelList dataKey="normal" position="top" />
            </Line>
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ProgresGiziBwi;
