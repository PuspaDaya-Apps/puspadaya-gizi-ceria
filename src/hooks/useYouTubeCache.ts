import { useState, useEffect, useCallback } from 'react';

interface YouTubeVideo {
  id: string;
  title: string;
  description: string;
  videoId: string;
  duration: string;
  views: string;
}

interface CacheData {
  videos: YouTubeVideo[];
  timestamp: number;
}

const CACHE_KEY = 'puspadaya_youtube_videos_cache';
const CACHE_DURATION = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds

/**
 * Custom hook untuk mengelola caching YouTube videos
 * Menggunakan localStorage untuk persist data
 * Cache akan expired setelah 7 hari
 */
export const useYouTubeCache = () => {
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load data from cache or use default videos
  useEffect(() => {
    const loadVideos = () => {
      try {
        const cached = localStorage.getItem(CACHE_KEY);
        
        if (cached) {
          const cacheData: CacheData = JSON.parse(cached);
          const now = Date.now();
          
          // Check if cache is still valid (not expired)
          if (now - cacheData.timestamp < CACHE_DURATION) {
            setVideos(cacheData.videos);
            setIsLoading(false);
            return;
          } else {
            // Cache expired, remove it
            localStorage.removeItem(CACHE_KEY);
          }
        }
        
        // If no cache or cache expired, use default videos
        const defaultVideos: YouTubeVideo[] = [
          {
            id: "1",
            title: "Aplikasi Puspadaya (Part 1)",
            description:
              "Pengenalan aplikasi Puspadaya yang membahas fitur utama, menu, dan tampilan antarmuka sebagai dasar penggunaan oleh kader.",
            videoId: "RIimlfHMt2I",
            duration: "13:05",
            views: "lihat",
          },
          {
            id: "2",
            title: "Aplikasi Puspadaya (Part 2)",
            description:
              "Penjelasan lanjutan mengenai proses registrasi, login, dan langkah awal penggunaan aplikasi Puspadaya.",
            videoId: "81xnXVAQ7bw",
            duration: "9:17",
            views: "lihat",
          },
          {
            id: "3",
            title: "Interpretasi Data bagi Kader Posyandu (Part 1)",
            description:
              "Pembahasan dasar mengenai cara memahami dan membaca data hasil pencatatan gizi dalam aplikasi.",
            videoId: "LuoyhnoQj6o",
            duration: "3:42",
            views: "lihat",
          },
          {
            id: "4",
            title: "Interpretasi Data bagi Kader Posyandu (Part 2)",
            description:
              "Penjelasan lanjutan tentang pemanfaatan data untuk penyusunan laporan dan pemantauan kondisi gizi masyarakat.",
            videoId: "aQtisBfFua4",
            duration: "3:42",
            views: "lihat",
          },
          {
            id: "5",
            title: "Negosiasi bagi Kader Posyandu",
            description:
              "Materi penguatan keterampilan komunikasi dan negosiasi kader dalam menyampaikan temuan atau kondisi di lapangan.",
            videoId: "7md8JUNmRHk",
            duration: "6:15",
            views: "lihat",
          },
          {
            id: "6",
            title: "Presentasi bagi Kader Posyandu",
            description:
              "Panduan menyusun dan menyampaikan presentasi laporan kegiatan atau hasil data secara sistematis dan mudah dipahami.",
            videoId: "bfDYAB38daA",
            duration: "6:39",
            views: "lihat",
          },
        ];
        
        setVideos(defaultVideos);
        saveToCache(defaultVideos);
        setIsLoading(false);
      } catch (err) {
        console.error('Error loading videos from cache:', err);
        setError('Gagal memuat data video');
        setIsLoading(false);
      }
    };

    loadVideos();
  }, []);

  // Save videos to cache
  const saveToCache = useCallback((videosToSave: YouTubeVideo[]) => {
    try {
      const cacheData: CacheData = {
        videos: videosToSave,
        timestamp: Date.now(),
      };
      localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
    } catch (err) {
      console.error('Error saving to cache:', err);
    }
  }, []);

  // Clear cache
  const clearCache = useCallback(() => {
    try {
      localStorage.removeItem(CACHE_KEY);
      // Reload default videos after clearing cache
      window.location.reload();
    } catch (err) {
      console.error('Error clearing cache:', err);
      setError('Gagal menghapus cache');
    }
  }, []);

  // Update videos (if needed in the future)
  const updateVideos = useCallback((newVideos: YouTubeVideo[]) => {
    setVideos(newVideos);
    saveToCache(newVideos);
  }, [saveToCache]);

  // Get cache info
  const getCacheInfo = useCallback(() => {
    try {
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) {
        const cacheData: CacheData = JSON.parse(cached);
        const now = Date.now();
        const age = now - cacheData.timestamp;
        const expiresIn = CACHE_DURATION - age;
        
        return {
          exists: true,
          timestamp: cacheData.timestamp,
          age: age,
          expiresIn: expiresIn,
          isExpired: expiresIn <= 0,
        };
      }
      return { exists: false };
    } catch (err) {
      return { exists: false, error: err };
    }
  }, []);

  return {
    videos,
    isLoading,
    error,
    clearCache,
    updateVideos,
    getCacheInfo,
  };
};

/**
 * Utility function untuk clear cache dari luar component
 * Bisa dipanggil dari console browser untuk debugging
 */
export const clearYouTubeCache = () => {
  try {
    localStorage.removeItem(CACHE_KEY);
    console.log('✅ YouTube cache berhasil dihapus!');
    console.log('🔄 Refresh halaman untuk memuat ulang data.');
    return true;
  } catch (err) {
    console.error('❌ Gagal menghapus cache:', err);
    return false;
  }
};

/**
 * Utility function untuk check cache status
 * Bisa dipanggil dari console browser untuk debugging
 */
export const getYouTubeCacheStatus = () => {
  try {
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
      const cacheData: CacheData = JSON.parse(cached);
      const now = Date.now();
      const age = now - cacheData.timestamp;
      const expiresIn = CACHE_DURATION - age;
      
      console.log('📦 YouTube Cache Status:');
      console.log('   - Cache exists: ✅ Yes');
      console.log('   - Created at:', new Date(cacheData.timestamp).toLocaleString('id-ID'));
      console.log('   - Age:', formatDuration(age));
      console.log('   - Expires in:', formatDuration(expiresIn));
      console.log('   - Videos count:', cacheData.videos.length);
      
      return {
        exists: true,
        timestamp: cacheData.timestamp,
        age,
        expiresIn,
        videosCount: cacheData.videos.length,
      };
    } else {
      console.log('❌ No cache found');
      return { exists: false };
    }
  } catch (err) {
    console.error('Error checking cache status:', err);
    return { exists: false, error: err };
  }
};

// Helper function to format duration
function formatDuration(ms: number): string {
  if (ms < 0) return 'Expired';
  
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  
  if (days > 0) {
    return `${days} hari ${hours % 24} jam`;
  }
  if (hours > 0) {
    return `${hours} jam ${minutes % 60} menit`;
  }
  if (minutes > 0) {
    return `${minutes} menit ${seconds % 60} detik`;
  }
  return `${seconds} detik`;
}

// Make utilities available globally for debugging
if (typeof window !== 'undefined') {
  (window as any).clearYouTubeCache = clearYouTubeCache;
  (window as any).getYouTubeCacheStatus = getYouTubeCacheStatus;
}
