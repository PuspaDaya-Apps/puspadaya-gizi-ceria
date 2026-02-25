import { useState, useEffect, useCallback } from "react";

interface UseEmptyDataStateProps {
  fetchData: () => Promise<any>;
  region: string;
  dependencies?: any[];
}

interface UseEmptyDataStateReturn<T> {
  data: T[];
  loading: boolean;
  isEmpty: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

/**
 * Custom hook untuk menangani state data kosong dengan konsisten
 * di seluruh komponen visualisasi
 */
export function useEmptyDataState<T>({
  fetchData,
  region,
  dependencies = [],
}: UseEmptyDataStateProps): UseEmptyDataStateReturn<T> {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEmpty, setIsEmpty] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const executeFetch = useCallback(async () => {
    if (!region) {
      setData([]);
      setIsEmpty(true);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const result = await fetchData();
      
      if (!result || (Array.isArray(result) && result.length === 0)) {
        setData([]);
        setIsEmpty(true);
      } else {
        setData(result);
        setIsEmpty(false);
      }
    } catch (err) {
      console.error("Error fetching data:", err);
      setError(err instanceof Error ? err.message : "Terjadi kesalahan saat mengambil data");
      setData([]);
      setIsEmpty(true);
    } finally {
      setLoading(false);
    }
  }, [fetchData, region, ...dependencies]);

  useEffect(() => {
    executeFetch();
  }, [executeFetch]);

  return {
    data,
    loading,
    isEmpty,
    error,
    refetch: executeFetch,
  };
}

/**
 * Helper function untuk mengecek apakah data kosong
 * (semua nilai adalah 0 atau null/undefined)
 */
export function isDataEmpty(data: any[], valueKey = "value"): boolean {
  if (!data || data.length === 0) return true;
  
  return data.every((item) => {
    if (typeof item === "object" && item !== null) {
      const value = item[valueKey];
      return value === 0 || value === null || value === undefined;
    }
    return item === 0 || item === null || item === undefined;
  });
}

/**
 * Helper function untuk mengecek apakah semua nilai null/0
 */
export function areAllValuesZero(data: any[], valueKey = "value"): boolean {
  if (!data || data.length === 0) return true;
  return data.every((item) => {
    if (typeof item === "object" && item !== null) {
      return (item[valueKey] ?? 0) === 0;
    }
    return (item ?? 0) === 0;
  });
}
