import React, { createContext, useContext, useState, ReactNode } from 'react';
import FunLoading from '../components/ui/FunLoading';

interface LoadingContextType {
  showGlobalLoading: (message?: string) => void;
  hideGlobalLoading: () => void;
  loading: boolean;
  loadingMessage: string;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

interface LoadingProviderProps {
  children: ReactNode;
}

export const LoadingProvider: React.FC<LoadingProviderProps> = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('Memuat...');

  const showGlobalLoading = (message = 'Memuat...') => {
    setLoadingMessage(message);
    setLoading(true);
  };

  const hideGlobalLoading = () => {
    setLoading(false);
  };

  return (
    <LoadingContext.Provider value={{ showGlobalLoading, hideGlobalLoading, loading, loadingMessage }}>
      {children}
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-8 shadow-2xl">
            <FunLoading variant="nutrition-flow" message={loadingMessage} size="lg" />
          </div>
        </div>
      )}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
};