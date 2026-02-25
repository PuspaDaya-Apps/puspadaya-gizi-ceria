import { useState, useEffect, useCallback } from 'react';
import { secureFetch, cachedFetch, clearSecureCache } from '@/lib/secure-api-client';

interface UseSecureApiReturn<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  clearCache: () => void;
}

interface UseSecureApiOptions {
  useCache?: boolean;
  cacheDuration?: number;
  retry?: number;
  timeout?: number;
}

/**
 * Custom hook untuk secure API calls
 * 
 * @param endpoint - API endpoint (akan di-obfuscate otomatis)
 * @param params - Query parameters (akan di-encode otomatis)
 * @param options - Configuration options
 */
export function useSecureApi<T = any>(
  endpoint: string,
  params?: Record<string, any>,
  options: UseSecureApiOptions = {}
): UseSecureApiReturn<T> {
  const {
    useCache = true,
    cacheDuration = 5 * 60 * 1000, // 5 minutes
    retry = 3,
    timeout = 30000,
  } = options;

  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      let result: T;

      if (useCache) {
        result = await cachedFetch<T>(endpoint, params, cacheDuration);
      } else {
        result = await secureFetch<T>(endpoint, params, { retry, timeout });
      }

      setData(result);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
      console.error('Secure API error:', err);
    } finally {
      setLoading(false);
    }
  }, [endpoint, JSON.stringify(params || {}), useCache, cacheDuration, retry, timeout]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const clearCacheCallback = useCallback(() => {
    clearSecureCache(endpoint);
  }, [endpoint]);

  return {
    data,
    loading,
    error,
    refetch: fetchData,
    clearCache: clearCacheCallback,
  };
}

/**
 * Hook untuk multiple API calls sekaligus
 */
export function useBatchSecureApi<T extends any[]>(
  requests: Array<{
    endpoint: string;
    params?: Record<string, any>;
  }>
): UseSecureApiReturn<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const { batchFetch } = await import('@/lib/secure-api-client');
      const result = await batchFetch<T>(requests);
      setData(result);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [JSON.stringify(requests)]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const clearCacheCallback = useCallback(() => {
    requests.forEach(req => {
      clearSecureCache(req.endpoint);
    });
  }, [requests]);

  return {
    data,
    loading,
    error,
    refetch: fetchData,
    clearCache: clearCacheCallback,
  };
}
