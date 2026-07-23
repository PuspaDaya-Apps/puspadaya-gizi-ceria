import React, { ReactNode } from 'react';
import FunLoading from './FunLoading';

interface LoadingOverlayProps {
  isLoading: boolean;
  children?: ReactNode;
  message?: string;
  variant?: 'baby-bounce' | 'nutrition-flow' | 'pulse-hearts' | 'growth-arc' | 'doctor-spin';
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ 
  isLoading, 
  children, 
  message = 'Memuat...', 
  variant = 'baby-bounce' 
}) => {
  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-20 flex items-center justify-center z-50 backdrop-blur-sm">
        <div className="bg-white rounded-2xl p-10 shadow-2xl">
          <FunLoading variant={variant} message={message} size="lg" />
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default LoadingOverlay;