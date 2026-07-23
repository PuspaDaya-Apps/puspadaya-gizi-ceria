import { createRoot, hydrateRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { obfuscateNetworkCalls, disableDevtoolsDetection } from './utils/devtools-obfuscation';

// Terapkan optimasi ketika aplikasi dimuat
if (process.env.NODE_ENV === 'production') {
  obfuscateNetworkCalls();
  disableDevtoolsDetection();
}

// Error boundary untuk menangani error dari script eksternal
window.addEventListener('error', (event) => {
  // Log error untuk debugging tapi jangan biarkan crash aplikasi
  console.error('Global error caught:', event.error);
  
  // Cegah error dari script eksternal menghentikan aplikasi
  if (event.target && (event.target as HTMLElement).tagName === 'SCRIPT') {
    console.warn('Script load error detected, continuing without external script');
  }
});

window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason);
});

// Gunakan createRoot dengan opsi tambahan untuk optimasi
const container = document.getElementById("root")!;

// Render aplikasi dengan penanganan error
const root = createRoot(container);

// Error boundary untuk React rendering
try {
  root.render(<App />);
} catch (error) {
  console.error('Failed to render app:', error);
  // Fallback UI jika rendering gagal
  const fallbackUI = document.createElement('div');
  fallbackUI.innerHTML = `
    <div style="display: flex; align-items: center; justify-content: center; min-height: 100vh; flex-direction: column; text-align: center; padding: 20px; font-family: sans-serif;">
      <h1 style="color: #1E40AF; margin-bottom: 16px;">Puspadaya</h1>
      <p style="color: #666; margin-bottom: 24px;">Maaf, terjadi kesalahan saat memuat aplikasi.</p>
      <button onclick="window.location.reload()" style="background: #1E40AF; color: white; border: none; padding: 12px 24px; border-radius: 8px; cursor: pointer; font-size: 16px;">
        Muat Ulang
      </button>
    </div>
  `;
  container.innerHTML = '';
  container.appendChild(fallbackUI);
}

// Ekspor root untuk digunakan di modul lain jika diperlukan
export { root };
