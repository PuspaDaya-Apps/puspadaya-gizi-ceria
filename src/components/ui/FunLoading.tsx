import React from 'react';
import { Baby, Heart, Apple, Activity, Stethoscope } from 'lucide-react';

interface FunLoadingProps {
  variant?: 'baby-bounce' | 'nutrition-flow' | 'pulse-hearts' | 'growth-arc' | 'doctor-spin';
  size?: 'sm' | 'md' | 'lg';
  message?: string;
}

const FunLoading: React.FC<FunLoadingProps> = ({ 
  variant = 'baby-bounce', 
  size = 'md', 
  message = 'Sedang memuat data...' 
}) => {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  };

  const containerSize = size === 'sm' ? 'w-20' : size === 'md' ? 'w-32' : 'w-40';

  switch (variant) {
    case 'baby-bounce':
      return (
        <div className={`flex flex-col items-center justify-center ${containerSize} h-32`}>
          <div className="relative">
            <Baby className={`${sizeClasses[size]} text-blue-500 animate-bounce`} />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-ping"></div>
          </div>
          <p className="mt-4 text-sm text-gray-600 text-center">{message}</p>
        </div>
      );

    case 'nutrition-flow':
      return (
        <div className="flex flex-col items-center justify-center w-32 h-32">
          <div className="flex space-x-1">
            <Apple className={`w-6 h-6 text-green-500 animate-bounce`} style={{ animationDelay: '0.1s' }} />
            <Heart className={`w-6 h-6 text-red-500 animate-bounce`} style={{ animationDelay: '0.2s' }} />
            <Activity className={`w-6 h-6 text-blue-500 animate-bounce`} style={{ animationDelay: '0.3s' }} />
            <Stethoscope className={`w-6 h-6 text-purple-500 animate-bounce`} style={{ animationDelay: '0.4s' }} />
          </div>
          <p className="mt-4 text-sm text-gray-600 text-center">{message}</p>
        </div>
      );

    case 'pulse-hearts':
      return (
        <div className="flex flex-col items-center justify-center w-32 h-32">
          <div className="flex space-x-1">
            <Heart className={`w-6 h-6 text-red-500 animate-pulse`} style={{ animationDelay: '0.1s' }} />
            <Heart className={`w-6 h-6 text-pink-500 animate-pulse`} style={{ animationDelay: '0.2s' }} />
            <Heart className={`w-6 h-6 text-rose-500 animate-pulse`} style={{ animationDelay: '0.3s' }} />
          </div>
          <p className="mt-4 text-sm text-gray-600 text-center">{message}</p>
        </div>
      );

    case 'growth-arc':
      return (
        <div className="flex flex-col items-center justify-center w-32 h-32">
          <div className="relative w-16 h-16">
            <div className="absolute w-full h-full border-4 border-blue-200 rounded-full opacity-30"></div>
            <div className="absolute w-full h-full border-4 border-blue-500 rounded-full animate-spin border-t-transparent"></div>
            <div className="absolute top-1/2 left-1/2 w-1/3 h-1/3 bg-green-500 rounded-full transform -translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
          </div>
          <p className="mt-4 text-sm text-gray-600 text-center">{message}</p>
        </div>
      );

    case 'doctor-spin':
      return (
        <div className="flex flex-col items-center justify-center w-32 h-32">
          <div className="relative w-16 h-16 flex items-center justify-center">
            <Stethoscope className={`w-8 h-8 text-blue-500 absolute animate-spin`} />
            <div className="absolute w-4 h-4 bg-green-400 rounded-full animate-ping"></div>
          </div>
          <p className="mt-4 text-sm text-gray-600 text-center">{message}</p>
        </div>
      );

    default:
      return (
        <div className={`flex flex-col items-center justify-center ${containerSize} h-32`}>
          <div className="relative">
            <Baby className={`${sizeClasses[size]} text-blue-500 animate-bounce`} />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-ping"></div>
          </div>
          <p className="mt-4 text-sm text-gray-600 text-center">{message}</p>
        </div>
      );
  }
};

export default FunLoading;