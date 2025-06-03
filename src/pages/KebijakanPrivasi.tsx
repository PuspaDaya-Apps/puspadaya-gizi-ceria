import FooterSection from '@/components/FooterSection';
import Navigation from '@/components/Navigation';
import React from 'react';

const KebijakanPrivasi = () => {
  return (
     <div className="font-poppins">
      <Navigation />
      <div className="max-w-4xl mx-auto px-4 py-20">
         <h1 className="text-3xl font-bold mb-6">
        Kebijakan Privasi <span className="text-primary font-bold">PUSPADAYA</span>
      </h1>
      <p className="mb-4">
        Di PUSPADAYA, kami berkomitmen untuk menjaga privasi dan keamanan data Anda. Kebijakan ini menjelaskan bagaimana kami mengumpulkan, menggunakan, dan melindungi informasi Anda saat menggunakan situs web atau aplikasi kami.
      </p>
      
      <h2 className="text-2xl font-bold mt-8 mb-4">1. Pengumpulan Data</h2>
      <p className="mb-4">
        Kami hanya mengumpulkan informasi yang diperlukan untuk menjalankan aplikasi dan memberikan layanan terbaik bagi Anda. Informasi yang kami kumpulkan termasuk, namun tidak terbatas pada:
        <ul className="list-disc pl-6 mb-4">
          <li>Nama lengkap</li>
          <li>Alamat email</li>
          <li>Nomor telepon</li>
          <li>Alamat fisik (jika relevan)</li>
          <li>Informasi penggunaan aplikasi atau situs web kami</li>
        </ul>
      </p>
      
      <h2 className="text-2xl font-bold mt-8 mb-4">2. Penggunaan Data</h2>
      <p className="mb-4">
        Data yang kami kumpulkan digunakan untuk:
        <ul className="list-disc pl-6 mb-4">
          <li>Meningkatkan pengalaman pengguna</li>
          <li>Memberikan layanan yang lebih baik</li>
          <li>Memproses permintaan atau transaksi Anda</li>
          <li>Mengirimkan informasi tentang produk dan layanan kami (jika Anda setuju)</li>
          <li>Analisis dan penelitian untuk memahami preferensi pengguna</li>
        </ul>
      </p>
      
      <p className="mb-4">
        Kami tidak akan menjual, menyewakan, atau memperdagangkan informasi pribadi Anda kepada pihak ketiga tanpa izin Anda, kecuali jika diwajibkan oleh hukum.
      </p>
      
      <h2 className="text-2xl font-bold mt-8 mb-4">3. Pembagian Informasi dengan Pihak Ketiga</h2>
      <p className="mb-4">
        Kami dapat membagikan informasi Anda dengan:
        <ul className="list-disc pl-6 mb-4">
          <li>Pihak ketiga yang bekerja atas nama kami untuk memberikan layanan kepada Anda</li>
          <li>Penegak hukum atau otoritas lainnya jika kami diwajibkan oleh hukum untuk melakukannya</li>
        </ul>
      </p>
      
      <h2 className="text-2xl font-bold mt-8 mb-4">4. Keamanan Data</h2>
      <p className="mb-4">
        Kami menggunakan langkah-langkah keamanan yang sesuai untuk melindungi data Anda dari akses yang tidak sah, perubahan, atau pengungkapan. Kami menerapkan teknologi dan prosedur keamanan yang wajar untuk melindungi informasi pribadi Anda.
      </p>
      
      <h2 className="text-2xl font-bold mt-8 mb-4">5. Hak Anda atas Informasi Anda</h2>
      <p className="mb-4">
        Anda memiliki hak untuk:
        <ul className="list-disc pl-6 mb-4">
          <li>Mengakses dan memperbarui informasi pribadi Anda</li>
          <li>Meminta penghapusan informasi pribadi Anda</li>
          <li>Menarik persetujuan Anda untuk penggunaan tertentu informasi pribadi Anda</li>
        </ul>
      </p>
      
      <h2 className="text-2xl font-bold mt-8 mb-4">6. Perubahan pada Kebijakan Privasi</h2>
      <p className="mb-4">
        Kami dapat memperbarui kebijakan privasi ini dari waktu ke waktu untuk mencerminkan perubahan dalam praktik privasi kami. Versi terbaru dari kebijakan privasi ini akan diposting di situs web kami, dan Anda harus meninjau kebijakan privasi ini secara berkala untuk tetap mendapatkan informasi terbaru tentang praktik privasi kami.
      </p>
      
      <h2 className="text-2xl font-bold mt-8 mb-4">7. Kontak Kami</h2>
      <p className="mb-4">
        Jika Anda memiliki pertanyaan atau kekhawatiran tentang kebijakan privasi kami, atau jika Anda ingin menggunakan hak Anda atas informasi Anda, silakan hubungi kami melalui layanan yang tersedia.
      
      </p>
    </div>
      <FooterSection/>
     </div>
   
  );
};

export default KebijakanPrivasi;

