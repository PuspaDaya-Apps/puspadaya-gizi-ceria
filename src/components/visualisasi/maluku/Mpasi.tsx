import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface DataSectionProps {
  region: string;
}

const MpasiMlk: React.FC<DataSectionProps> = ({ region,  }) => {
  
  
  
  // Dummy data for "Ya" dan "Tidak" dengan penjelasan
  const data = [
    { 
      name: "Ya", 
      value: 65,
      description: "Balita yang mendapat MPASI (Makanan Pendamping ASI)"
    },
    { 
      name: "Tidak", 
      value: 35,
      description: "Balita yang tidak mendapat MPASI"
    },
  ];

  // Warna yang ramah bagi tunanetra warna
  // Menggunakan palet warna yang dirancang khusus untuk aksesibilitas
  const COLORS = ["#1f77b4", "#ff7f0e"]; // Biru dan oranye yang kontras 

  // Calculate total for display
  const total = data.reduce((sum, entry) => sum + entry.value, 0);

  return (
    <div className="bg-white rounded-2xl shadow p-6">
      <h3 className="text-xl font-semibold text-primary mb-4 text-center">
        Pemberian MPASI {region}
      </h3>

      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            label={({ name, value, percent }) => 
              `${name}: ${value} (${(percent * 100).toFixed(0)}%)`
            }
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip 
            formatter={(value, name, props) => {
              const entry = data.find(d => d.name === props.name);
              return [
                `${value} balita (${((Number(value) / total) * 100).toFixed(1)}%)`, 
                entry?.description || name
              ];
            }}
          />
          <Legend 
            formatter={(value, entry, index) => {
              const dataEntry = data.find(d => d.name === value);
              return dataEntry ? `${value}: ${dataEntry.description}` : value;
            }}
          />
        </PieChart>
      </ResponsiveContainer>
      
      <div className="text-center mt-4 text-gray-600">
        Total Balita: {total}
      </div>
      

    </div>
  );
};

export default MpasiMlk;
