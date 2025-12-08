// utils/performance.ts

/**
 * Fungsi untuk mengukur performa komponen
 */
export const measurePerformance = (fn: Function, name: string) => {
  if (process.env.NODE_ENV === 'production') return fn();

  const start = performance.now();
  const result = fn();
  const end = performance.now();
  console.info(`${name} took ${end - start} milliseconds`);
  return result;
};

/**
 * Debounce fungsi untuk mengurangi jumlah eksekusi
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return function executedFunction(...args: Parameters<T>): void {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Fungsi throttle untuk membatasi frekuensi eksekusi
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  return function executedFunction(...args: Parameters<T>): void {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

/**
 * Fungsi untuk mengoptimalkan render komponen
 */
export const shouldComponentUpdate = (prevProps: any, nextProps: any) => {
  for (const prop in prevProps) {
    if (prevProps[prop] !== nextProps[prop]) {
      return true;
    }
  }
  return false;
};

/**
 * Fungsi untuk membersihkan cache secara manual jika perlu
 */
export const clearCache = () => {
  if ('caches' in window) {
    caches.keys().then(names => {
      names.forEach(name => {
        caches.delete(name);
      });
    });
  }
};

/**
 * Fungsi untuk menghapus data localStorage secara selektif
 */
export const clearLocalStorage = (prefix?: string) => {
  if (!prefix) {
    localStorage.clear();
    return;
  }

  const keysToRemove: string[] = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.startsWith(prefix)) {
      keysToRemove.push(key);
    }
  }

  keysToRemove.forEach(key => localStorage.removeItem(key));
};