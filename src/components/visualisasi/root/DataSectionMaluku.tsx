import React, { useEffect, useState } from "react";
import DataCard from "../../cardcomponents/DataCard";
import VisualisasiSectionMaluku from "./VisualisasiSectionMaluku";

interface DataSectionProps {
  region: string;
  desa: string;
  posyandu: string;
  month: number;
  year: number;
}

const DatasSectionMaluku: React.FC<DataSectionProps> = ({
  region,
  desa,
  posyandu,
  month,
  year
}) => {
  // Handle case where month and year are 0 - use current date
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1; // getMonth() returns 0-11, so add 1
  const currentYear = currentDate.getFullYear();

  const displayMonth = month === 0 ? currentMonth : month;
  const displayYear = year === 0 ? currentYear : year;

  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // 2. Bangun query string menggunakan props year dan month
        const query = new URLSearchParams({
          kabupaten_kota: region,
          ...(desa ? { desa } : {}),
          ...(posyandu ? { posyandu } : {}),
          tahun: displayYear.toString(),   // Menggunakan displayYear yang bisa jadi nilai saat ini
          bulan: displayMonth.toString(),  // Menggunakan displayMonth yang bisa jadi nilai saat ini
        });

        const res = await fetch(`/api?${query.toString()}`);
        const json = await res.json();

        let processedData = json.data;
        if (posyandu && json.data) {
          processedData = { ...json.data, total_posyandu: 1 };
        }
        setData(processedData);
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    if (region) {
      fetchData();
    }
  }, [region, desa, posyandu, displayMonth, displayYear]);

  if (loading) {
    return (
      <div className="text-center py-10 text-gray-500">
        Memuat data Banyuwangi...
      </div>
    );
  }

  // Helper function to convert month number to month name in Indonesian
  const getMonthName = (monthNumber: number): string => {
    const monthNames = [
      "Januari", "Februari", "Maret", "April", "Mei", "Juni",
      "Juli", "Agustus", "September", "Oktober", "November", "Desember"
    ];

    // Ensure monthNumber is between 1-12
    if (monthNumber >= 1 && monthNumber <= 12) {
      return monthNames[monthNumber - 1]; // Array index starts at 0
    }
    return "Invalid Month"; // Fallback for invalid values
  };

  return (
    <section id="features" className="py-0">
      <div className="container mx-auto px-4 py-1">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Informasi Data Pengguna Banyuwangi
          </h2>
          <p className="text-sm font-semibold text-indigo-600 mb-2">
            Periode: Bulan {getMonthName(displayMonth)} Tahun {displayYear}
          </p>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Fitur ini menyajikan berbagai data penting terkait informasi gizi,
            kesehatan, serta tumbuh kembang anak secara lengkap dan mudah
            dipantau.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* 1. Balita */}
          <DataCard
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 text-primary"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M10 13.0002C10.5523 13.0002 11 12.5525 11 12.0002C11 11.448 10.5523 11.0002 10 11.0002C9.44771 11.0002 9 11.448 9 12.0002C9 12.5525 9.44771 13.0002 10 13.0002Z"
                  fill="currentColor"
                />
                <path
                  d="M15 12.0002C15 12.5525 14.5523 13.0002 14 13.0002C13.4477 13.0002 13 12.5525 13 12.0002C13 11.448 13.4477 11.0002 14 11.0002C14.5523 11.0002 15 11.448 15 12.0002Z"
                  fill="currentColor"
                />
                <path
                  d="M8.29289 15.2931C8.68006 14.906 9.30573 14.9026 9.69699 15.2832C9.8449 15.415 10.021 15.5177 10.1972 15.6058C10.5749 15.7947 11.1728 16.0002 12 16.0002C12.8272 16.0002 13.4251 15.7947 13.8028 15.6058C13.979 15.5177 14.1551 15.415 14.303 15.2832C14.6943 14.9026 15.3199 14.906 15.7071 15.2931C16.0976 15.6837 16.0976 16.3168 15.7071 16.7074C15.6303 16.784 15.5522 16.8517 15.4125 16.9565C15.245 17.0821 15.0067 17.2399 14.6972 17.3947C14.0749 17.7058 13.1728 18.0002 12 18.0002C10.8272 18.0002 9.92507 17.7058 9.30278 17.3947C8.99327 17.2399 8.75496 17.0821 8.58749 16.9565C8.44826 16.8521 8.37026 16.7843 8.29359 16.7081C7.90307 16.3175 7.90236 15.6837 8.29289 15.2931Z"
                  fill="currentColor"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M13.1296 2.80381C13.295 3.09712 13.4047 3.51797 13.1972 4.07117C12.8047 4.02434 12.4051 4.00024 12 4.00024C7.59784 4.00024 3.86005 6.84476 2.52438 10.796C1.07592 11.1461 0 12.4508 0 14.0068C0 15.5645 1.0783 16.8703 2.52918 17.2186C3.86899 21.1625 7.6031 24.0002 12 24.0002C16.3969 24.0002 20.131 21.1625 21.4708 17.2186C22.9217 16.8703 24 15.5645 24 14.0068C24 12.4508 22.9241 11.1461 21.4756 10.796C20.4747 7.83506 18.1249 5.4956 15.1574 4.50892C15.4491 3.53208 15.3113 2.60099 14.8718 1.82153C14.2627 0.741235 13.079 0.000244141 12 0.000244141C11.0671 0.000244141 10.3617 0.35319 9.89902 0.700448C9.66924 0.872899 9.49579 1.04612 9.37674 1.18029C9.31687 1.24776 9.2697 1.30655 9.23506 1.35211C8.88381 1.81421 8.94196 2.49769 9.44638 2.83302C9.9818 3.18895 10.4984 2.92957 10.8727 2.5077C10.92 2.45437 10.9962 2.37759 11.0996 2.30004C11.3031 2.1473 11.5976 2.00024 12 2.00024C12.2562 2.00024 12.8225 2.25915 13.1296 2.80381ZM19.9318 15.5313L21.004 15.2739C21.5763 15.1365 22 14.6186 22 14.0068C22 13.3956 21.5773 12.8782 21.0058 12.7401L19.934 12.4811L19.5809 11.4365C18.5116 8.27312 15.5186 6.00024 12 6.00024C8.48136 6.00024 5.48839 8.27312 4.41906 11.4365L4.06595 12.4811L2.99417 12.7401C2.42271 12.8782 2 13.3956 2 14.0068C2 14.6186 2.42366 15.1365 2.99604 15.2739L4.06821 15.5313L4.42289 16.5753C5.49555 19.7328 8.48558 22.0002 12 22.0002C15.5144 22.0002 18.5044 19.7328 19.5771 16.5753L19.9318 15.5313Z"
                  fill="currentColor"
                />
              </svg>
            }
            title="Balita Terdaftar"
            description={data?.total_balita ?? "0"}
          />

          {/* 2. Ibu Hamil */}
          <DataCard
            icon={
              <svg
                className="h-12 w-12 text-primary"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 205.25 205.25"
              >
                <path
                  d="M140.841,200.131c0.26,0.893,0.21,1.866-0.183,2.749c-0.644,1.442-2.075,2.37-3.653,2.37H50.912
  c-1.174,0-2.289-0.516-3.048-1.41c-0.34-0.4-8.32-10.042-8.32-31.65c0-8.972,6.328-19.153,12.447-28.999
  c4.757-7.654,9.676-15.568,9.817-20.519c0.136-4.751-3.612-11.48-7.952-19.273c-5.414-9.721-12.151-21.818-13.816-35.339
  c-2.972-24.15,8.364-63.513,8.848-65.176C49.385,1.175,50.95,0,52.729,0h37.416c1.667,0,3.16,1.034,3.745,2.595
  c0.075,0.199,7.532,19.973,14.403,29.593c3.211,4.496,12.474,9.417,25.414,13.5c5.752,1.814,9.021,7.809,7.443,13.646
  c-0.592,2.186-1.36,4.387-2.285,6.543c-1.888,4.404-5.275,8.499-8.146,11.457c3.875,1.686,9.032,4.381,14.2,8.428
  c9.482,7.425,20.786,20.947,20.786,43.199c0,27.873-16.767,45.585-28.513,54.578c-5.285-5.874-11.615-12.391-17.541-17.157
  c-13.153-10.577-16.98-13.432-17.137-13.548c-1.772-1.318-4.277-0.95-5.596,0.822c-1.318,1.772-0.951,4.277,0.82,5.597
  c0.038,0.028,3.925,2.932,16.898,13.364C124.555,180.591,136.139,194.352,140.841,200.131z"
                />
              </svg>
            }
            title="Ibu Hamil Terdaftar"
            description={data?.total_ibu_hamil ?? "0"}
          />

          {/* 3. Posyandu */}
          <DataCard
            icon={
              <svg
                className="h-12 w-12 "
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18.5 9.00002H16.5M16.5 9.00002L14.5 9.00002M16.5 9.00002L16.5 7M16.5 9.00002L16.5 11"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <path
                  d="M8.96173 19.3786L9.43432 18.7963L8.96173 19.3786ZM12 5.57412L11.4522 6.08635C11.594 6.23803 11.7923 6.32412 12 6.32412C12.2077 6.32412 12.406 6.23803 12.5478 6.08635L12 5.57412ZM15.0383 19.3787L15.5109 19.961L15.0383 19.3787ZM12 21L12 20.25L12 21ZM2.65159 13.6821C2.86595 14.0366 3.32705 14.1501 3.68148 13.9358C4.03591 13.7214 4.14946 13.2603 3.9351 12.9059L2.65159 13.6821ZM6.53733 16.1707C6.24836 15.8739 5.77352 15.8676 5.47676 16.1566C5.18 16.4455 5.17369 16.9204 5.46267 17.2171L6.53733 16.1707ZM2.75 9.3175C2.75 6.41289 4.01766 4.61731 5.58602 4.00319C7.15092 3.39043 9.34039 3.82778 11.4522 6.08635L12.5478 5.06189C10.1598 2.50784 7.34924 1.70187 5.0391 2.60645C2.73242 3.50967 1.25 5.99209 1.25 9.3175H2.75ZM15.5109 19.961C17.0033 18.7499 18.7914 17.1268 20.2127 15.314C21.6196 13.5196 22.75 11.4354 22.75 9.31747H21.25C21.25 10.9289 20.3707 12.6814 19.0323 14.3884C17.7084 16.077 16.0156 17.6197 14.5657 18.7963L15.5109 19.961ZM22.75 9.31747C22.75 5.99208 21.2676 3.50966 18.9609 2.60645C16.6508 1.70187 13.8402 2.50784 11.4522 5.06189L12.5478 6.08635C14.6596 3.82778 16.8491 3.39042 18.414 4.00319C19.9823 4.6173 21.25 6.41287 21.25 9.31747H22.75ZM8.48914 19.961C9.76058 20.9928 10.6423 21.75 12 21.75L12 20.25C11.2771 20.25 10.8269 19.9263 9.43432 18.7963L8.48914 19.961ZM14.5657 18.7963C13.1731 19.9263 12.7229 20.25 12 20.25L12 21.75C13.3577 21.75 14.2394 20.9928 15.5109 19.961L14.5657 18.7963ZM3.9351 12.9059C3.18811 11.6708 2.75 10.455 2.75 9.3175H1.25C1.25 10.8297 1.82646 12.3179 2.65159 13.6821L3.9351 12.9059ZM9.43432 18.7963C8.51731 18.0521 7.49893 17.1582 6.53733 16.1707L5.46267 17.2171C6.47548 18.2572 7.53996 19.1908 8.48914 19.961L9.43432 18.7963Z"
                  fill="currentColor"
                />
              </svg>
            }
            title="Posyandu Terdaftar"
            description={data?.total_posyandu ?? "0"}
          />

          {/* 4. Kader */}
          <DataCard
            icon={
              <svg
                className="h-12 w-12 "
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19.8978 16H7.89778C6.96781 16 6.50282 16 6.12132 16.1022C5.08604 16.3796 4.2774 17.1883 4 18.2235"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                <path
                  d="M8 7H16"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <path
                  d="M8 10.5H13"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <path
                  d="M19.5 19H8"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <path
                  d="M10 22C7.17157 22 5.75736 22 4.87868 21.1213C4 20.2426 4 18.8284 4 16V8C4 5.17157 4 3.75736 4.87868 2.87868C5.75736 2 7.17157 2 10 2H14C16.8284 2 18.2426 2 19.1213 2.87868C20 3.75736 20 5.17157 20 8M14 22C16.8284 22 18.2426 22 19.1213 21.1213C20 20.2426 20 18.8284 20 16V12"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            }
            title="Kader Terdaftar"
            description={data?.total_kader ?? "0"}
          />
        </div>
      </div>
      <VisualisasiSectionMaluku
        region={region}
        desa={desa}
        posyandu={posyandu}
        month={displayMonth}
        year={displayYear}
      />
    </section>
  );
};

export default DatasSectionMaluku;