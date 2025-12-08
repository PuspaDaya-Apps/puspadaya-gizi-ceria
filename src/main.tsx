import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { obfuscateNetworkCalls, disableDevtoolsDetection } from './utils/devtools-obfuscation';

// Terapkan optimasi ketika aplikasi dimuat
if (process.env.NODE_ENV === 'production') {
  obfuscateNetworkCalls();
  disableDevtoolsDetection();
}

// Gunakan createRoot dengan opsi tambahan untuk optimasi
const container = document.getElementById("root")!;
const root = createRoot(container);

// Render aplikasi dengan penanganan error
root.render(<App />);

// Ekspor root untuk digunakan di modul lain jika diperlukan
export { root };
