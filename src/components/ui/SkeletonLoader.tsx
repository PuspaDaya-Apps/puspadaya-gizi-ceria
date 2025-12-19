import React from 'react';

interface SkeletonLoaderProps {
  type?: 'text' | 'circle' | 'rectangle' | 'card';
  className?: string;
  count?: number;
}

const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({ 
  type = 'rectangle', 
  className = '', 
  count = 1 
}) => {
  const baseClasses = 'animate-pulse bg-gray-200 rounded-md';
  
  const getTypeClasses = () => {
    switch (type) {
      case 'text':
        return 'h-4 w-full mb-2';
      case 'circle':
        return 'w-10 h-10 rounded-full';
      case 'card':
        return 'w-full h-48 rounded-xl';
      case 'rectangle':
      default:
        return 'w-full h-12 rounded-md';
    }
  };

  return (
    <div className="space-y-2 w-full">
      {Array.from({ length: count }).map((_, index) => (
        <div 
          key={index} 
          className={`${baseClasses} ${getTypeClasses()} ${className}`}
        />
      ))}
    </div>
  );
};

export default SkeletonLoader;