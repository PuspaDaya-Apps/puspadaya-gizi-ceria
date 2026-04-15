import React, { useEffect, useRef, useState, useMemo } from "react";
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
import EmptyDataOverlay from "@/components/ui/EmptyDataOverlay";
import { areAllValuesZero } from "@/hooks/useEmptyDataState";

interface DataSectionProps {
  region: string;
  desa?: string;
  posyandu?: string;
  month: number;
  year: number;
}

interface IbuHamilData {
  bulan: string;
  kek: number;
  pendek: number;
  terlaluTua: number;
  terlaluMuda: number;
}

const getMonthNumber = (monthName: string): number => {
  const months = [
    "januari", "februari", "maret", "april", "mei", "juni",
    "juli", "agustus", "september", "oktober", "november", "desember"
  ];
  const monthsEn = [
    "january", "february", "march", "april", "may", "june",
    "july", "august", "september", "october", "november", "december"
  ];

  const lowerName = monthName.toLowerCase();
  let index = months.indexOf(lowerName);
  if (index === -1) {
    index = monthsEn.indexOf(lowerName);
  }
  return index + 1;
};

const ProgresIbuHamilMaluku: React.FC<DataSectionProps> = ({ region, desa, posyandu, month, year }) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const [ibuHamilData, setIbuHamilData] = useState<IbuHamilData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const query = new URLSearchParams({
          kabupaten_kota: region,
          ...(desa ? { desa } : {}),
          ...(posyandu ? { posyandu } : {}),
          bulan: "0",
          tahun: year.toString(),
        });

        const res = await fetch(`/ibu-hamil-periodik?${query.toString()}`);
        const json = await res.json();

        if (json.data) {
          let mappedData: IbuHamilData[] = Object.entries(json.data).map(
            ([bulan, values]: [string, any]) => ({
              bulan,
              kek: values.kek ?? 0,
              pendek: values.pendek ?? 0,
              terlaluTua: values.terlalu_tua ?? 0,
              terlaluMuda: values.terlalu_muda ?? 0,
            })
          );

          mappedData.sort((a, b) => getMonthNumber(a.bulan) - getMonthNumber(b.bulan));

          if (month > 0) {
            mappedData = mappedData.filter((item) => {
              const itemMonthNum = getMonthNumber(item.bulan);
              return itemMonthNum > 0 && itemMonthNum <= month;
            });
          }

          setIbuHamilData(mappedData);
        } else {
          setIbuHamilData([]);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        setIbuHamilData([]);
      } finally {
        setLoading(false);
      }
    };

    if (region) fetchData();

  }, [region, desa, posyandu, month, year]);

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
    link.download = `ProgresIbuHamil.${format}`;
    link.click();
  };

 const isEmptyData = useMemo(() => {
  if (!ibuHamilData || ibuHamilData.length === 0) return true;
  return !ibuHamilData.some(item =>
    item.kek > 0 || item.pendek > 0 ||
    item.terlaluTua > 0 || item.terlaluMuda > 0
  );
}, [ibuHamilData]);
  

  if (loading) {
    return (
      <div className="text-center py-10 text-gray-500">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary mb-3"></div>
          <p>Memuat data {region}...</p>
        </div>
      </div>
    );
  }

  const COLORS = {
    kek: "#1f77b4",
    pendek: "#2ca02c",
    terlaluTua: "#d62728",
    terlaluMuda: "#9467bd",
  };

  const LINE_STYLES = {
    kek: { strokeDasharray: "0" },
    pendek: { strokeDasharray: "10 5" },
    terlaluTua: { strokeDasharray: "3 3 9 3" },
    terlaluMuda: { strokeDasharray: "1 1" },
  };

  return (
    <div className="bg-white rounded-2xl shadow p-6 relative mb-8">
      <div className={`flex flex-col md:flex-row md:justify-between md:items-center mb-4 ${isEmptyData ? 'opacity-50' : ''}`}>
        <h3 className="text-xl font-semibold text-primary text-center w-full">
          Progres Ibu Hamil Berisiko - {region} ({year})
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

      <div ref={chartRef} className="bg-white p-6 rounded-lg relative">
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={ibuHamilData} margin={{ top: 20, right: 30, left: 10, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="bulan"
              interval={0}
              padding={{ left: 20, right: 20 }}
            />

            <YAxis label={{ value: "Persentase (%)", angle: -90, position: "insideLeft" }} />
            <Tooltip
              formatter={(value, name) => {
                const labels: Record<string, string> = {
                  kek: "KEK",
                  pendek: "Pendek",
                  terlaluTua: "Terlalu Tua",
                  terlaluMuda: "Terlalu Muda",
                };
                return [`${value}%`, labels[name] || name];
              }}
              labelFormatter={(label) => `Bulan: ${label}`}
            />
            <Legend />

            <Line type="monotone" dataKey="kek" stroke={COLORS.kek} strokeWidth={2} {...LINE_STYLES.kek}>
              <LabelList dataKey="kek" position="top" formatter={(value: number) => `${value}`} />
            </Line>
            <Line type="monotone" dataKey="pendek" stroke={COLORS.pendek} strokeWidth={2} {...LINE_STYLES.pendek}>
              <LabelList dataKey="pendek" position="top" formatter={(value: number) => `${value}`} />
            </Line>
            <Line type="monotone" dataKey="terlaluTua" stroke={COLORS.terlaluTua} strokeWidth={2} {...LINE_STYLES.terlaluTua}>
              <LabelList dataKey="terlaluTua" position="top" formatter={(value: number) => `${value}`} />
            </Line>
            <Line type="monotone" dataKey="terlaluMuda" stroke={COLORS.terlaluMuda} strokeWidth={2} {...LINE_STYLES.terlaluMuda}>
              <LabelList dataKey="terlaluMuda" position="top" formatter={(value: number) => `${value}`} />
            </Line>
          </LineChart>
        </ResponsiveContainer>

        {/* Empty Data Overlay */}
        {isEmptyData && (
          <EmptyDataOverlay
            title="Data Ibu Hamil Berisiko Belum Tersedia"
            message={`Tidak ada data ibu hamil berisiko yang tercatat untuk wilayah ${region} pada tahun ${year}.`}
            icon="database"
          />
        )}
      </div>
    </div>
  );
};

export default ProgresIbuHamilMaluku;
