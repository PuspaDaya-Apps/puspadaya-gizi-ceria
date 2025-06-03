import FooterSection from '@/components/FooterSection';
import Navigation from '@/components/Navigation';
import React from 'react';

const SyaratdanKetentuan = () => {
  return (
     <div className="font-poppins">
      <Navigation />
   <div className="max-w-4xl mx-auto px-4 py-20">
      <h1 className="text-3xl font-bold mb-6">
        Syarat dan Ketentuan <span className="text-primary font-bold">PUSPADAYA</span>
      </h1>
      
      <p className="mb-4">
        Selamat datang di PUSPADAYA! Dengan menggunakan situs web atau aplikasi kami, Anda setuju untuk mematuhi syarat dan ketentuan berikut:
      </p>
      
      <h2 className="text-2xl font-bold mt-8 mb-4">1. Penggunaan Layanan</h2>
      <p className="mb-4">
        <ul className="list-disc pl-6 mb-4">
          <li>Anda harus berusia minimal 18 tahun atau mencapai usia mayoritas di tempat tinggal Anda untuk menggunakan layanan kami.</li>
          <li>Anda bertanggung jawab untuk menjaga kerahasiaan informasi akun Anda, termasuk nama pengguna dan kata sandi.</li>
          <li>Anda tidak diperbolehkan menggunakan layanan kami untuk tujuan ilegal atau tidak etis.</li>
        </ul>
      </p>
      
      <h2 className="text-2xl font-bold mt-8 mb-4">2. Hak Milik Kekayaan Intelektual</h2>
      <p className="mb-4">
        <ul className="list-disc pl-6 mb-4">
          <li>Semua konten yang ada di situs web atau aplikasi kami, termasuk teks, gambar, merek dagang, dan kode sumber, adalah milik PUSPADAYA atau pihak ketiga yang memberikan lisensi kepada kami.</li>
          <li>Anda tidak diperbolehkan untuk mereproduksi, mengubah, atau menyebarluaskan konten kami tanpa izin tertulis dari kami.</li>
        </ul>
      </p>
      
      <h2 className="text-2xl font-bold mt-8 mb-4">3. Batasan Tanggung Jawab</h2>
      <p className="mb-4">
        <ul className="list-disc pl-6 mb-4">
          <li>PUSPADAYA tidak bertanggung jawab atas kerugian atau kerusakan yang timbul akibat penggunaan situs web atau aplikasi kami.</li>
          <li>Kami tidak menjamin bahwa situs web atau aplikasi kami akan selalu tersedia atau bebas dari kesalahan.</li>
        </ul>
      </p>
      
      <h2 className="text-2xl font-bold mt-8 mb-4">4. Perubahan pada Syarat dan Ketentuan</h2>
      <p className="mb-4">
        Kami berhak untuk memperbarui syarat dan ketentuan ini kapan saja. Versi terbaru dari syarat dan ketentuan ini akan diposting di situs web kami, dan Anda harus meninjau syarat dan ketentuan ini secara berkala untuk tetap mendapatkan informasi terbaru.
      </p>
      
      <h2 className="text-2xl font-bold mt-8 mb-4">5. Kontak Kami</h2>
      <p className="mb-4">
  Jika Anda memiliki pertanyaan atau kekhawatiran tentang kebijakan privasi kami, atau jika Anda ingin menggunakan hak Anda atas informasi Anda, silakan hubungi kami melalui layanan yang tersedia.
      
      </p>
    </div>
      <FooterSection/>
     </div>
   
  );
};

export default SyaratdanKetentuan;

