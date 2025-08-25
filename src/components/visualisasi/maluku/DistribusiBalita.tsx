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
interface DesaData {
  name: string;        
  stunting: number;
  wasting: number;
  underweight: number;
}


interface DesaData {
  nama_desa_kelurahan: string;
  jumlah_stunting: number;
  jumlah_wasting: number;
  jumlah_underweight: number;
}

const DistribusiBalitaMlk: React.FC<DataSectionProps> = ({ region }) => {
  const barChartRef = useRef<HTMLDivElement>(null);
  const [desaData, setDesaData] = useState<DesaData[]>([]);
  const [loading, setLoading] = useState(true);

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
    link.download = `DistribusiBalita.${format}`;
    link.click();
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/gizi-desa?kabupaten_kota=${region}`);
        const json = await res.json();

        if (json.data && Array.isArray(json.data)) {
          const mappedData = json.data.map((desa: any) => ({
            name: desa.nama_desa_kelurahan,
            stunting: desa.jumlah_stunting,
            wasting: desa.jumlah_wasting,
            underweight: desa.jumlah_underweight,
          }));
          setDesaData(mappedData);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    if (region) fetchData();
  }, [region]);

const isAllZero = desaData.every(
  (d) => d.stunting === 0 && d.wasting === 0 && d.underweight === 0
);

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
        Distribusi Balita per Desa
      </h3>
      <p className="text-gray-500">Tidak ada balita yang mengalami gizi buruk.</p>
    </div>
  );
}


  return (
    <div className="bg-white rounded-2xl shadow p-6 relative mb-8">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
        <h3 className="text-xl font-semibold text-primary text-center w-full">
          Distribusi Balita per Desa
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

      <div
        ref={barChartRef}
        className="bg-white p-6 rounded-lg"
        style={{ width: "100%" }}
      >
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            layout="vertical"
            data={desaData}
            margin={{ top: 20, right: 30, left: 40, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" />
            <YAxis dataKey="name" type="category" />
            <Tooltip />
            <Legend />
            <Bar dataKey="stunting" fill="#ef4444">
              <LabelList dataKey="stunting" position="right" />
            </Bar>
            <Bar dataKey="wasting" fill="#f59e0b">
              <LabelList dataKey="wasting" position="right" />
            </Bar>
            <Bar dataKey="underweight" fill="#1e40af">
              <LabelList dataKey="underweight" position="right" />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DistribusiBalitaMlk;
