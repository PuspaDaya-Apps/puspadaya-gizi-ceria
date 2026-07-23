/**
 * API Security Layer - Enkripsi dan Obfuscation
 * 
 * Fitur:
 * - Base64 encoding untuk query parameters
 * - Endpoint obfuscation
 * - Request timestamp untuk prevent replay attacks
 * - Response masking
 */

// Simple encryption key (should be from env in production)
const ENCRYPTION_KEY = import.meta.env.VITE_API_ENCRYPTION_KEY || 'puspadaya_secure_key_2026';

/**
 * Encode data ke base64 untuk obfuscation
 */
export const encodeData = (data: any): string => {
  try {
    const jsonString = JSON.stringify(data);
    return btoa(encodeURIComponent(jsonString));
  } catch (error) {
    console.error('Encode error:', error);
    return '';
  }
};

/**
 * Decode data dari base64
 */
export const decodeData = (encoded: string): any => {
  try {
    const jsonString = decodeURIComponent(atob(encoded));
    return JSON.parse(jsonString);
  } catch (error) {
    console.error('Decode error:', error);
    return null;
  }
};

/**
 * Generate request signature untuk validasi
 */
export const generateSignature = (timestamp: number, endpoint: string): string => {
  const data = `${timestamp}-${endpoint}-${ENCRYPTION_KEY}`;
  return btoa(data);
};

/**
 * Obfuscate endpoint name
 */
export const obfuscateEndpoint = (endpoint: string): string => {
  const mapping: Record<string, string> = {
    '/api': 'x1',
    '/balita': 'x2',
    '/progres-status-gizi': 'x3',
    '/anak-mpasi': 'x4',
    '/asi-eksklusif': 'x5',
    '/data-skdn': 'x6',
    '/ibu-hamil': 'x7',
    '/ibu-hamil-periodik': 'x8',
    '/jenis-kompetensi': 'x9',
    '/waktu-kunjungan': 'x10',
    '/waktu-jadwal-posyandu': 'x11',
    '/waktu-kunjungan-anak': 'x12',
    '/waktu-kunjungan-ibu-hamil': 'x13',
  };
  
  return mapping[endpoint] || endpoint;
};

/**
 * Reverse obfuscation untuk backend
 */
export const deobfuscateEndpoint = (obfuscated: string): string => {
  const reverseMapping: Record<string, string> = {
    'x1': '/api',
    'x2': '/balita',
    'x3': '/progres-status-gizi',
    'x4': '/anak-mpasi',
    'x5': '/asi-eksklusif',
    'x6': '/data-skdn',
    'x7': '/ibu-hamil',
    'x8': '/ibu-hamil-periodik',
    'x9': '/jenis-kompetensi',
    'x10': '/waktu-kunjungan',
    'x11': '/waktu-jadwal-posyandu',
    'x12': '/waktu-kunjungan-anak',
    'x13': '/waktu-kunjungan-ibu-hamil',
  };
  
  return reverseMapping[obfuscated] || obfuscated;
};

/**
 * Create secure headers untuk request
 */
export const createSecureHeaders = (endpoint: string): Headers => {
  const timestamp = Date.now();
  const signature = generateSignature(timestamp, endpoint);
  
  const headers = new Headers({
    'Content-Type': 'application/json',
    'X-Request-Timestamp': timestamp.toString(),
    'X-Request-Signature': signature,
    'X-Request-ID': crypto.randomUUID(),
  });
  
  return headers;
};

/**
 * Mask sensitive data dalam response
 */
export const maskResponse = (data: any, fields?: string[]): any => {
  if (!fields || fields.length === 0) {
    return data;
  }
  
  const masked = { ...data };
  fields.forEach(field => {
    if (masked[field] !== undefined) {
      masked[field] = '***MASKED***';
    }
  });
  
  return masked;
};

/**
 * Validate response timestamp (prevent old responses)
 */
export const isValidTimestamp = (timestamp: number, maxAge: number = 5 * 60 * 1000): boolean => {
  const now = Date.now();
  return (now - timestamp) < maxAge;
};
