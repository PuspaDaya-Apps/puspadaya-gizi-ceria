import React from 'react';

interface ModernSpinnerProps {
  variant?: 'bouncing-balls' | 'pulse-rings' | 'rotating-cube' | 'flower-bloom' | 'orbiting-circles';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const ModernSpinner: React.FC<ModernSpinnerProps> = ({ 
  variant = 'bouncing-balls', 
  size = 'md', 
  className = '' 
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  };

  const spinnerClass = `${sizeClasses[size]} ${className}`;

  switch (variant) {
    case 'bouncing-balls':
      return (
        <div className={`relative ${spinnerClass}`}>
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
            <div className="absolute w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="absolute w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            <div className="absolute w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.3s' }}></div>
            <div className="absolute w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
          </div>
        </div>
      );

    case 'pulse-rings':
      return (
        <div className={`${spinnerClass} relative`}>
          <div className="absolute inset-0 border-4 border-primary rounded-full opacity-75 animate-ping"></div>
          <div className="absolute inset-0 border-4 border-primary rounded-full opacity-50 animate-ping" style={{ animationDelay: '0.5s' }}></div>
          <div className="absolute inset-0 border-4 border-primary rounded-full opacity-25 animate-ping" style={{ animationDelay: '1s' }}></div>
        </div>
      );

    case 'rotating-cube':
      return (
        <div className={`${spinnerClass} relative animate-spin`}>
          <div className="absolute inset-0 bg-primary rounded-lg transform rotate-45 animate-pulse"></div>
        </div>
      );

    case 'flower-bloom':
      return (
        <div className={`relative ${spinnerClass}`}>
          <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
            <div className="w-1/3 h-1/3 bg-primary rounded-full animate-ping"></div>
          </div>
          <div className="absolute top-0 left-0 w-full h-full">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1/4 h-1/4 bg-primary rounded-full"
                style={{
                  top: '50%',
                  left: '50%',
                  transform: `translate(-50%, -50%) rotate(${i * 45}deg) translate(40%) rotate(-${i * 45}deg)`,
                  animation: `pulse 1.5s infinite ${i * 0.1}s`
                }}
              />
            ))}
          </div>
        </div>
      );

    case 'orbiting-circles':
      return (
        <div className={`relative ${spinnerClass}`}>
          <div className="absolute top-1/2 left-1/2 w-1/2 h-1/2 border-2 border-primary rounded-full animate-spin"></div>
          <div className="absolute top-1/2 left-1/2 w-1/3 h-1/3 border-2 border-accent rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
          <div className="absolute top-1/2 left-1/2 w-1/4 h-1/4 bg-primary rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
        </div>
      );

    default:
      return (
        <div className={`flex items-center justify-center ${spinnerClass}`}>
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      );
  }
};

export default ModernSpinner;