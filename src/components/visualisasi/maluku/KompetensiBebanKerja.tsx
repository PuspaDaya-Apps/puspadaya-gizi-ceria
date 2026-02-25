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
  month: number;
  year: number;
}

interface WorkloadData {
  name: string;
  value: number;
}

const KompetensiBebanKerjaMlk: React.FC<DataSectionProps> = ({
  region,
  desa,
  posyandu,
  month,
  year,
}) => {
  const barChartRef = useRef<HTMLDivElement>(null);
  const [workloadData, setWorkloadData] = useState<WorkloadData[]>([]);
  const [jumlahKaderMengisi, setJumlahKaderMengisi] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Handle responsive behavior
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };

    // Set initial value
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Clean up event listener
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
    link.download = `KompetensiBebanKerja.${format}`;
    link.click();
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const query = new URLSearchParams({
          kabupaten_kota: region,
          ...(desa ? { desa } : {}),
          ...(posyandu ? { posyandu } : {}),
          bulan: month.toString(),
          tahun: year.toString(),
        });
        const res = await fetch(`/jenis-kompetensi?${query.toString()}`);
        const json = await res.json();

        if (json.data) {
          const mappedData: WorkloadData[] = Object.entries(json.data)
            .filter(([key]) => key !== "jumlah_kader_mengisi")
            .map(([key, value]) => ({
              name:
                key === "Balita"
                  ? "Posyandu Balita"
                  : key === "Ibu_Hamil_dan_Menyusui"
                  ? "Posyandu Ibu Hamil"
                  : key === "Kunjungan_Rumah"
                  ? "Kunjungan Rumah"
                  : key === "Tugas_Tambahan"
                  ? "Tugas Tambahan"
                  : key,
              value: (value as number) ?? 0,
            }));

          setWorkloadData(mappedData);

          setJumlahKaderMengisi(json.data.jumlah_kader_mengisi || 0);
        } else {
          setWorkloadData([]);
          setJumlahKaderMengisi(0);
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
  }, [region, desa, posyandu, month, year]);

  const isAllZero = workloadData.every((d) => d.value === 0);

  if (loading) {
    return (
      <div className="text-center py-10 text-gray-500">
        Memuat data {region || "Maluku"}...
      </div>
    );
  }

  if (!loading && isAllZero) {
    return (
      <div className="bg-white rounded-2xl shadow p-6 text-center mb-8">
        <h3 className="text-xl font-semibold text-primary mb-4 text-center">
          Jumlah Kader Berdasarkan Kompetensi Beban Kerja Kader
        </h3>
        <p className="text-gray-500">Tidak ada data kompetensi beban kerja.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow p-4 md:p-6 relative mb-6 md:mb-8">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4 gap-2">
        <h3 className="text-xl font-semibold text-primary text-center w-full"></h3>

        <Menu as="div" className="relative inline-block text-left">
          <MenuButton className="p-2 rounded-full hover:bg-gray-100">
            <MoreVertical className="w-5 h-5 text-gray-600" />
          </MenuButton>
          <MenuItems className="absolute right-0 mt-2 w-40 origin-top-right bg-white border border-gray-200 rounded-lg shadow-lg focus:outline-none z-10">
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

      <div ref={barChartRef} className="bg-white p-3 sm:p-4 md:p-6 rounded-lg">
        <h3 className="text-base sm:text-lg md:text-xl font-semibold text-primary mb-4 text-center">
          Jumlah Kader Berdasarkan Kompetensi Beban Kerja Kader -{" "}
          {region || "Maluku"}
        </h3>

        <ResponsiveContainer width="100%" height={isMobile ? 300 : 400}>
          <BarChart
            layout="vertical"
            data={workloadData}
            margin={{ 
              top: 20, 
              right: isMobile ? 20 : 30, 
              left: isMobile ? 80 : 150, 
              bottom: 20 
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              type="number" 
              tick={{ fontSize: isMobile ? 11 : 12 }}
            />
            <YAxis
              dataKey="name"
              type="category"
              width={isMobile ? 70 : 140}
              tick={{ fontSize: isMobile ? 10 : 12 }}
            />
            <Tooltip
              formatter={(value) => [`${value}`, "Jumlah Kader"]}
              labelFormatter={(name) => `Kategori: ${name}`}
              contentStyle={{ fontSize: isMobile ? 12 : 14 }}
            />
            <Legend />
            <Bar dataKey="value" fill="#2b528a" name="Jumlah Kader">
              <LabelList
                dataKey="value"
                position="right"
                formatter={(value: number) => `${value}`}
                fontSize={isMobile ? 10 : 12}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>

        <div className="mt-4 sm:mt-6 bg-gray-100 rounded-lg p-3 sm:p-4 text-center">
          <p className="text-sm sm:text-base text-gray-600 font-medium">
            Jumlah Kader Mengisi
            <span className="text-gray-800 font-semibold ml-2">
              {jumlahKaderMengisi}
            </span>
          </p>
        </div>

        <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-blue-50 rounded-lg">
          <h4 className="font-semibold text-blue-800 mb-2 text-sm sm:text-base">
            Keterangan Kategori:
          </h4>
          <ul className="text-xs sm:text-sm text-gray-700 list-disc pl-5 space-y-1">
            <li>
              Posyandu Balita: Kegiatan pelayanan kesehatan untuk balita di
              posyandu
            </li>
            <li>
              Posyandu Ibu Hamil: Kegiatan pelayanan kesehatan untuk ibu hamil
              di posyandu
            </li>
            <li>
              Kunjungan Rumah: Kunjungan langsung ke rumah untuk pendampingan
              kesehatan
            </li>
            <li>
              Tugas Tambahan: Tugas lainnya yang berkaitan dengan program gizi
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default KompetensiBebanKerjaMlk;