import { useState, useEffect } from 'react';

interface PageLoadingHook {
  isLoading: boolean;
  showLoading: () => void;
  hideLoading: () => void;
}

export const usePageLoading = (initialState: boolean = false): PageLoadingHook => {
  const [isLoading, setIsLoading] = useState(initialState);

  const showLoading = () => {
    setIsLoading(true);
  };

  const hideLoading = () => {
    setIsLoading(false);
  };

  return { isLoading, showLoading, hideLoading };
};