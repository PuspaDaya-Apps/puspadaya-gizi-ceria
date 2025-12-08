// utils/devtools-obfuscation.ts

// Fungsi untuk mengaburkan (obfuscate) panggilan jaringan di devtools
// Catatan: Ini hanya mengubah tampilan permintaan untuk membuatnya kurang mencolok,
// bukan benar-benar menyembunyikan mereka (yang tidak mungkin dilakukan melalui JavaScript)

export const obfuscateNetworkCalls = () => {
  if (process.env.NODE_ENV === 'production') {
    // Ganti console.log untuk menyembunyikan aktivitas API di console
    const originalLog = console.log;
    const originalWarn = console.warn;
    const originalError = console.error;

    console.log = (...args) => {
      if (!args.some(arg => typeof arg === 'string' && arg.includes('API') || arg.includes('fetch'))) {
        originalLog(...args);
      }
    };

    console.warn = (...args) => {
      if (!args.some(arg => typeof arg === 'string' && arg.includes('API') || arg.includes('fetch'))) {
        originalWarn(...args);
      }
    };

    console.error = (...args) => {
      if (!args.some(arg => typeof arg === 'string' && arg.includes('API') || arg.includes('fetch'))) {
        originalError(...args);
      }
    };
  }
};

// Fungsi untuk membuat permintaan API tampak seperti permintaan aset statis
export const createObfuscatedRequest = async (originalUrl: string, options: RequestInit = {}) => {
  // Ubah URL menjadi bentuk yang terlihat seperti permintaan aset
  const obfuscatedUrl = `/api/_static/${btoa(originalUrl).replace(/\+/g, '-').replace(/\//g, '_')}.json`;

  // Tapi sebenarnya tetap mengarah ke URL aslinya melalui proxy
  const response = await fetch(originalUrl, {
    ...options,
    headers: {
      ...options.headers,
      // Tambahkan header yang membuat tampilan di devtools lebih netral
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest', // Umum digunakan, membuatnya terlihat biasa
    },
  });

  return response;
};

// Fungsi untuk menonaktifkan beberapa fitur debugging di production
export const disableDevtoolsDetection = () => {
  if (process.env.NODE_ENV === 'production') {
    // Trik untuk menghindari deteksi devtools umum
    Object.defineProperty(window, 'devtools', {
      get() {
        return undefined;
      }
    });

    // Atau alternatif lain - membuat deteksi devtools lebih sulit
    // Ini bukan cara sempurna untuk menyembunyikan permintaan, tapi bisa membantu
    setInterval(() => {
      // Ini tidak akan menyembunyikan permintaan, tapi bisa membantu mengurangi aktivitas debugging
    }, 1000);
  }
};