import React, { useEffect, useState } from "react";

interface CardInfo {
  title: string;
  value: number | string;
  bgColor: string;
  textColor: string;
}

const CardInformation: React.FC = () => {
  const [cardData, setCardData] = useState<CardInfo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/data-wilayah`);
        const json = await res.json();

        if (json.data) {
          const maluku = json.data["maluku tengah"];
          const banyuwangi = json.data["banyuwangi"];

          const mappedCardData: CardInfo[] = [
            {
              title: `Jumlah Puskesmas Terdaftar di ${maluku.nama_kabupaten_kota}`,
              value: maluku.jumlah_puskesmas,
              bgColor: "bg-blue-50",
              textColor: "text-blue-600",
            },
            {
              title: `Jumlah Puskesmas Terdaftar di ${banyuwangi.nama_kabupaten_kota}`,
              value: banyuwangi.jumlah_puskesmas,
              bgColor: "bg-blue-50",
              textColor: "text-blue-600",
            },
            {
              title: `Jumlah Desa ${maluku.nama_kabupaten_kota} Terdaftar`,
              value: maluku.jumlah_desa,
              bgColor: "bg-green-50",
              textColor: "text-green-600",
            },
            {
              title: `Jumlah Desa ${banyuwangi.nama_kabupaten_kota} Terdaftar`,
              value: banyuwangi.jumlah_desa,
              bgColor: "bg-yellow-50",
              textColor: "text-yellow-600",
            },
          ];

          setCardData(mappedCardData);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-10 text-gray-500">
        Memuat data wilayah...
      </div>
    );
  }

  return (
    <div className="px-4 md:px-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        {cardData.map((item, index) => (
          <div
            key={index}
            className={`${item.bgColor} rounded-2xl shadow p-6 text-center`}
          >
            <h4 className="text-lg font-semibold text-gray-700">
              {item.title}
            </h4>
            <p className={`text-2xl font-bold ${item.textColor}`}>
              {item.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardInformation;
