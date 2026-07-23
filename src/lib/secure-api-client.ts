/**
 * Secure API Client
 * 
 * Menggunakan security layer untuk semua API calls
 * - Encoded parameters
 * - Obfuscated endpoints
 * - Secure headers
 * - Response validation
 */

import {
  encodeData,
  decodeData,
  obfuscateEndpoint,
  createSecureHeaders,
  isValidTimestamp,
} from '@/lib/api-security';

interface FetchOptions extends RequestInit {
  timeout?: number;
  retry?: number;
  useCache?: boolean;
}

/**
 * Secure fetch wrapper dengan retry logic
 */
export async function secureFetch<T>(
  endpoint: string,
  params?: Record<string, any>,
  options: FetchOptions = {}
): Promise<T> {
  const {
    timeout = 30000,
    retry = 3,
    useCache = true,
    ...fetchOptions
  } = options;

  // Obfuscate endpoint
  const obfuscatedEndpoint = obfuscateEndpoint(endpoint);
  
  // Encode parameters
  const encodedParams = params ? encodeData(params) : null;
  
  // Create secure URL dengan encoded params
  const url = encodedParams 
    ? `/secure/${obfuscatedEndpoint}?data=${encodedParams}`
    : `/secure/${obfuscatedEndpoint}`;
  
  // Create secure headers
  const headers = createSecureHeaders(endpoint);
  
  let lastError: Error | null = null;
  
  // Retry logic
  for (let attempt = 1; attempt <= retry; attempt++) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeout);
      
      const response = await fetch(url, {
        ...fetchOptions,
        headers,
        signal: controller.signal,
      });
      
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const responseData = await response.json();
      
      // Validate response timestamp
      if (responseData.timestamp && !isValidTimestamp(responseData.timestamp)) {
        throw new Error('Response expired');
      }
      
      return responseData.data as T;
      
    } catch (error) {
      lastError = error instanceof Error ? error : new Error('Unknown error');
      
      // Don't retry on abort
      if (lastError.name === 'AbortError') {
        break;
      }
      
      // Wait before retry (exponential backoff)
      if (attempt < retry) {
        await new Promise(resolve => 
          setTimeout(resolve, Math.pow(2, attempt) * 1000)
        );
      }
    }
  }
  
  throw lastError || new Error('Failed to fetch after retries');
}

/**
 * Batch multiple API calls
 */
export async function batchFetch<T extends any[]>(
  requests: Array<{
    endpoint: string;
    params?: Record<string, any>;
  }>
): Promise<T> {
  const promises = requests.map(req => 
    secureFetch(req.endpoint, req.params)
  );
  
  try {
    return await Promise.all(promises) as T;
  } catch (error) {
    console.error('Batch fetch error:', error);
    throw error;
  }
}

/**
 * Cache-aware fetch dengan localStorage
 */
export async function cachedFetch<T>(
  endpoint: string,
  params?: Record<string, any>,
  cacheDuration: number = 5 * 60 * 1000 // 5 minutes
): Promise<T> {
  const cacheKey = `secure_cache_${endpoint}_${JSON.stringify(params)}`;
  
  // Check cache first
  if (typeof localStorage !== 'undefined') {
    const cached = localStorage.getItem(cacheKey);
    
    if (cached) {
      const { data, timestamp } = JSON.parse(cached);
      
      // Check if cache is still valid
      if (Date.now() - timestamp < cacheDuration) {
        return data as T;
      }
      
      // Cache expired, remove it
      localStorage.removeItem(cacheKey);
    }
  }
  
  // Fetch from API
  const data = await secureFetch<T>(endpoint, params);
  
  // Save to cache
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem(cacheKey, JSON.stringify({
      data,
      timestamp: Date.now(),
    }));
  }
  
  return data;
}

/**
 * Clear secure cache
 */
export function clearSecureCache(pattern?: string): void {
  if (typeof localStorage === 'undefined') return;
  
  const keys = Object.keys(localStorage);
  
  keys.forEach(key => {
    if (key.startsWith('secure_cache_')) {
      if (!pattern || key.includes(pattern)) {
        localStorage.removeItem(key);
      }
    }
  });
}

/**
 * Get cache statistics
 */
export function getCacheStats(): {
  totalKeys: number;
  totalSize: number;
  oldestCache: number | null;
} {
  if (typeof localStorage === 'undefined') {
    return { totalKeys: 0, totalSize: 0, oldestCache: null };
  }
  
  const keys = Object.keys(localStorage).filter(k => k.startsWith('secure_cache_'));
  let totalSize = 0;
  let oldestCache: number | null = null;
  
  keys.forEach(key => {
    const value = localStorage.getItem(key);
    if (value) {
      totalSize += value.length;
      
      try {
        const { timestamp } = JSON.parse(value);
        if (timestamp && (oldestCache === null || timestamp < oldestCache)) {
          oldestCache = timestamp;
        }
      } catch {
        // Ignore parse errors
      }
    }
  });
  
  return {
    totalKeys: keys.length,
    totalSize,
    oldestCache,
  };
}
