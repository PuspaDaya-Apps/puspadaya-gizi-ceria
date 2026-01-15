import React from 'react';
import './ErrorPage.css';

// Define error types
type ErrorType = '404' | '500' | '502' | '503' | 'offline' | 'generic';

interface ErrorPageProps {
  type?: ErrorType;
  title?: string;
  message?: string;
  showReloadButton?: boolean;
  onReload?: () => void;
}

const ErrorPage: React.FC<ErrorPageProps> = ({
  type = 'generic',
  title,
  message,
  showReloadButton = true,
  onReload
}) => {
  // Define error configurations
  const errorConfig = {
    '404': {
      title: 'Halaman Tidak Ditemukan',
      message: 'Maaf, halaman yang Anda cari tidak dapat ditemukan.',
      icon: '🔍'
    },
    '500': {
      title: 'Server Error',
      message: 'Terjadi kesalahan pada server. Silakan coba lagi nanti.',
      icon: '⚙️'
    },
    '502': {
      title: 'Bad Gateway',
      message: 'Server mengalami masalah saat mencoba memproses permintaan Anda.',
      icon: '📡'
    },
    '503': {
      title: 'Layanan Tidak Tersedia',
      message: 'Layanan sedang tidak tersedia saat ini. Silakan coba lagi nanti.',
      icon: '⏳'
    },
    'offline': {
      title: 'Tidak Ada Koneksi Internet',
      message: 'Anda sedang offline. Harap periksa koneksi internet Anda.',
      icon: '📶'
    },
    'generic': {
      title: 'Terjadi Kesalahan',
      message: 'Terjadi kesalahan tak terduga. Silakan coba lagi.',
      icon: '⚠️'
    }
  };

  const config = errorConfig[type];
  
  const displayedTitle = title || config.title;
  const displayedMessage = message || config.message;

  const handleReload = () => {
    if (onReload) {
      onReload();
    } else {
      window.location.reload();
    }
  };

  return (
    <div className="error-container">
      <div className="error-content">
        <div className="error-icon animated-bounce">
          {config.icon}
        </div>
        
        <h1 className="error-title animated-fade-in-down">
          {displayedTitle}
        </h1>
        
        <p className="error-message animated-fade-in-up">
          {displayedMessage}
        </p>
        
        {showReloadButton && (
          <button 
            className="reload-button animated-pulse"
            onClick={handleReload}
          >
            Muat Ulang Halaman
          </button>
        )}
        
        <div className="error-decoration">
          <div className="circle circle-1"></div>
          <div className="circle circle-2"></div>
          <div className="circle circle-3"></div>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;