import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DatasSectionBwi from "./DataSectionBwi";
import DatasSectionMaluku from "./DataSectionMaluku";

const DashboardTabs = () => {
  return (
    <section id="dashboard" className="py-10">
      <div className="container mx-auto px-4">
        {/* Judul Dashboard */}
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-3">
            Dashboard Data Wilayah
          </h2>
          <p className="text-base text-gray-600 max-w-xl mx-auto">
            Pilih wilayah untuk melihat data pengguna, gizi, kesehatan, dan 
            informasi lainnya secara interaktif.
          </p>
        </div>

        {/* Tabs untuk memilih wilayah */}
        <Tabs defaultValue="bwi" className="w-full">
          <TabsList className="flex justify-center gap-2 mb-6 bg-gray-100 p-1 rounded-xl shadow-sm w-fit mx-auto">
            <TabsTrigger
              value="bwi"
              className="px-4 py-2 rounded-lg text-sm font-medium transition-colors
                         data-[state=active]:bg-primary data-[state=active]:text-white
                         hover:bg-primary/10"
            >
              Banyuwangi
            </TabsTrigger>
            <TabsTrigger
              value="mlk"
              className="px-4 py-2 rounded-lg text-sm font-medium transition-colors
                         data-[state=active]:bg-primary data-[state=active]:text-white
                         hover:bg-primary/10"
            >
              Maluku
            </TabsTrigger>
          </TabsList>

          {/* Konten Tab Banyuwangi */}
          <TabsContent value="bwi">
            <DatasSectionBwi />
          </TabsContent>

          {/* Konten Tab Maluku */}
          <TabsContent value="mlk">
            <DatasSectionMaluku />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default DashboardTabs;
