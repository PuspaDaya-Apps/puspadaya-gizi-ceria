import React from "react";
import { AlertTriangle, Database, RefreshCw } from "lucide-react";

interface EmptyDataOverlayProps {
  title?: string;
  message?: string;
  icon?: "warning" | "database" | "custom";
  customIcon?: React.ReactNode;
  showRefreshButton?: boolean;
  onRefresh?: () => void;
  className?: string;
}

const EmptyDataOverlay: React.FC<EmptyDataOverlayProps> = ({
  title = "Data Tidak Tersedia",
  message = "Saat ini belum ada data yang masuk untuk wilayah dan periode yang dipilih.",
  icon = "database",
  customIcon,
  showRefreshButton = false,
  onRefresh,
  className = "",
}) => {
  const getIcon = () => {
    if (customIcon) return customIcon;

    switch (icon) {
      case "warning":
        return (
          <AlertTriangle className="w-12 h-12 text-amber-500" />
        );
      case "database":
      default:
        return (
          <Database className="w-12 h-12 text-blue-500" />
        );
    }
  };

  return (
    <div className={`absolute inset-0 bg-white/95 backdrop-blur-sm z-50 flex items-center justify-center p-6 ${className}`}>
      <div className="text-center max-w-md">
        {/* Icon with animation */}
        <div className="mb-4 flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full blur-xl opacity-50 animate-pulse"></div>
            <div className="relative p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-full shadow-lg">
              {getIcon()}
            </div>
          </div>
        </div>

        {/* Title */}
        <h4 className="text-xl font-bold text-gray-800 mb-2">
          {title}
        </h4>

        {/* Message */}
        <p className="text-gray-600 mb-4 leading-relaxed">
          {message}
        </p>

        {/* Additional info */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-3 mb-4 border border-blue-100">
          <p className="text-sm text-gray-600">
            💡 Sistem akan menampilkan data secara otomatis ketika tersedia
          </p>
        </div>

        {/* Refresh Button */}
        {showRefreshButton && onRefresh && (
          <button
            onClick={onRefresh}
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-lg shadow-md hover:shadow-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform hover:-translate-y-0.5"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Muat Ulang Data</span>
          </button>
        )}

        {/* Decorative bottom border */}
        <div className="mt-6 h-1 w-24 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full mx-auto"></div>
      </div>
    </div>
  );
};

export default EmptyDataOverlay;
