import React, { useState, useEffect, useCallback } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Play,
  ChevronLeft,
  ChevronRight,
  Youtube,
  Clock,
  Eye,
  Star,
  X,
  Trash2,
  Info,
} from "lucide-react";
import { useYouTubeCache } from "@/hooks/useYouTubeCache";

interface YouTubeVideo {
  id: string;
  title: string;
  description: string;
  videoId: string;
  duration: string;
  views: string;
}

const youtubeVideos: YouTubeVideo[] = [
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

const YouTubeCarousel: React.FC = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const [itemsPerView, setItemsPerView] = useState(3);
  const [selectedVideo, setSelectedVideo] = useState<YouTubeVideo | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showCacheInfo, setShowCacheInfo] = useState(false);
  
  // Use cache hook
  const { videos, isLoading, clearCache, getCacheInfo } = useYouTubeCache();

  // Calculate items per view based on screen size
  useEffect(() => {
    const updateItemsPerView = () => {
      if (window.innerWidth < 768) {
        setItemsPerView(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerView(2);
      } else {
        setItemsPerView(3);
      }
    };

    updateItemsPerView();
    window.addEventListener("resize", updateItemsPerView);
    return () => window.removeEventListener("resize", updateItemsPerView);
  }, []);

  // Setup carousel API
  useEffect(() => {
    if (!api) return;

    setScrollSnaps(api.scrollSnapList());

    const onSelect = () => {
      const selected = api.selectedScrollSnap();
      setCurrentSlide(selected);
    };

    onSelect();
    api.on("select", onSelect);
    api.on("reInit", onSelect);

    return () => {
      api.off("select", onSelect);
      api.off("reInit", onSelect);
    };
  }, [api]);

  const scrollToIndex = useCallback(
    (index: number) => {
      if (api) {
        api.scrollTo(index, true);
      }
    },
    [api],
  );

  const totalPages = Math.ceil(videos.length / itemsPerView);

  return (
    <section className="py-20 bg-gradient-to-b from-blue-50 to-white relative overflow-hidden">
      {/* Background Decorations - Matching your theme */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-64 h-64 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-40 right-20 w-72 h-72 bg-amber-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-10 left-1/2 w-80 h-80 bg-indigo-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header Section - Matching your design system */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-6">
            <Star className="w-4 h-4" />
            <span>Konten Edukasi & Penguatan Kader</span>
            <Star className="w-4 h-4" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            Penguatan Kapasitas Kader melalui{" "}
            <span className="text-blue-600">Puspadaya</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Tonton video tutorial berikut untuk mempelajari cara menggunakan
            aplikasi Puspadaya dengan efektif dan efisien
          </p>
          
    
        </div>

        {/* Carousel Section */}
        <div className="relative">
          {isLoading ? (
            <div className="text-center py-20">
              <div className="flex flex-col items-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
                <p className="text-gray-600 font-medium">Memuat video tutorial...</p>
              </div>
            </div>
          ) : (
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full max-w-7xl mx-auto"
            setApi={setApi}
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {videos.map((video, index) => (
                <CarouselItem
                  key={video.id}
                  className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3"
                >
                  <div className="group h-full">
                    <Dialog
                      open={isModalOpen && selectedVideo?.id === video.id}
                      onOpenChange={(open) => {
                        setIsModalOpen(open);
                        if (!open) setSelectedVideo(null);
                      }}
                    >
                      <DialogTrigger asChild>
                        <Card
                          className="
                          h-full
                          border-0
                          overflow-hidden
                          rounded-2xl
                          shadow-lg
                          hover:shadow-2xl
                          hover:shadow-blue-500/20
                          transition-all
                          duration-500
                          ease-out
                          hover:-translate-y-2
                          bg-white
                          cursor-pointer
                        "
                          onClick={() => {
                            setSelectedVideo(video);
                            setIsModalOpen(true);
                          }}
                        >
                          <CardContent className="p-0 h-full flex flex-col">
                            {/* Video Thumbnail with Overlay */}
                            <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-red-500 to-red-600">
                              <iframe
                                src={`https://www.youtube.com/embed/${video.videoId}`}
                                title={video.title}
                                className="absolute inset-0 w-full h-full"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                              />

                              {/* Hover Overlay with Play Button */}
                              <div
                                className="
                            absolute inset-0
                            bg-gradient-to-t from-black/70 via-black/30 to-transparent
                            opacity-0 group-hover:opacity-100
                            transition-all duration-300
                            flex items-center justify-center
                          "
                              >
                                <div className="w-20 h-20 rounded-full bg-white/95 backdrop-blur-sm flex items-center justify-center transform scale-0 group-hover:scale-100 transition-all duration-300 delay-75 shadow-2xl">
                                  <Play className="w-10 h-10 text-red-500 fill-red-500 ml-1" />
                                </div>
                              </div>

                              {/* Duration Badge */}
                              <div className="absolute bottom-3 right-3 bg-black/80 backdrop-blur-sm text-white text-xs px-2 py-1.5 rounded-md flex items-center gap-1.5 shadow-lg">
                                <Clock className="w-3.5 h-3.5" />
                                <span className="font-medium">
                                  {video.duration}
                                </span>
                              </div>

                              {/* Views Badge */}
                              <div className="absolute bottom-3 left-3 bg-black/80 backdrop-blur-sm text-white text-xs px-2 py-1.5 rounded-md flex items-center gap-1.5 shadow-lg">
                                <Eye className="w-3.5 h-3.5" />
                                <span className="font-medium">{video.views}</span>
                              </div>

                              {/* Number Badge */}
                              <div className="absolute top-3 left-3 w-9 h-9 bg-gradient-to-br from-blue-500 to-blue-700 text-white rounded-full flex items-center justify-center font-bold text-sm shadow-lg border-2 border-white/50">
                                {index + 1}
                              </div>
                            </div>

                            {/* Content Section */}
                            <div className="p-5 flex-1 flex flex-col bg-white">
                              <div className="flex items-start gap-3 mb-3">
                                <div className="w-11 h-11 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md group-hover:shadow-lg transition-shadow">
                                  <Youtube className="w-6 h-6 text-white fill-white" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <h3 className="font-bold text-gray-900 text-base md:text-lg line-clamp-2 leading-tight group-hover:text-blue-600 transition-colors">
                                    {video.title}
                                  </h3>
                                </div>
                              </div>
                              <p className="text-gray-600 text-sm line-clamp-2 leading-relaxed flex-1">
                                {video.description}
                              </p>

                              {/* Animated Progress Line */}
                              <div className="mt-4 h-0.5 bg-gray-200 rounded-full overflow-hidden">
                                <div className="h-full bg-gradient-to-r from-blue-500 to-blue-700 w-0 group-hover:w-full transition-all duration-700 ease-out" />
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl p-0 overflow-hidden bg-transparent border-0 shadow-2xl">
                        <DialogTitle className="sr-only">
                          {video.title}
                        </DialogTitle>
                        <div className="relative w-full">
                          {/* Close Button */}
                          <button
                            onClick={() => {
                              setIsModalOpen(false);
                              setSelectedVideo(null);
                            }}
                            className="absolute -top-12 right-0 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-all duration-300 shadow-lg z-50"
                            aria-label="Close modal"
                          >
                            <X className="w-5 h-5 text-gray-800" />
                          </button>

                          {/* Video Container */}
                          <div className="relative aspect-video bg-black rounded-xl overflow-hidden shadow-2xl">
                            <iframe
                              src={`https://www.youtube.com/embed/${video.videoId}?autoplay=1&rel=0`}
                              title={video.title}
                              className="absolute inset-0 w-full h-full"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                            />
                          </div>

                          {/* Video Info */}
                          <div className="mt-4 bg-white rounded-xl p-6 shadow-lg">
                            <h3 className="text-xl font-bold text-gray-900 mb-2">
                              {video.title}
                            </h3>
                            <p className="text-gray-600">
                              {video.description}
                            </p>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            {/* Custom Navigation Buttons - Matching your theme */}
            <CarouselPrevious
              className="
                hidden md:flex 
                -left-4 lg:-left-8 
                w-12 h-12 md:w-14 md:h-14 
                rounded-full 
                border-2 border-blue-200 
                bg-white/90 backdrop-blur-sm 
                hover:bg-blue-50 
                hover:border-blue-400 
                hover:scale-110
                shadow-lg hover:shadow-xl
                transition-all duration-300
                group
              "
            >
              <ChevronLeft className="w-6 h-6 md:w-7 md:h-7 text-blue-600 group-hover:text-blue-700" />
            </CarouselPrevious>
            <CarouselNext
              className="
                hidden md:flex 
                -right-4 lg:-right-8 
                w-12 h-12 md:w-14 md:h-14 
                rounded-full 
                border-2 border-blue-200 
                bg-white/90 backdrop-blur-sm 
                hover:bg-blue-50 
                hover:border-blue-400 
                hover:scale-110
                shadow-lg hover:shadow-xl
                transition-all duration-300
                group
              "
            >
              <ChevronRight className="w-6 h-6 md:w-7 md:h-7 text-blue-600 group-hover:text-blue-700" />
            </CarouselNext>
          </Carousel>
          )}
        </div>

        {/* Navigation Dots - Working Implementation */}
        <div className="flex justify-center items-center gap-3 mt-10 flex-wrap">
          {Array.from({ length: totalPages }).map((_, index) => {
            const isActive = Math.floor(currentSlide / itemsPerView) === index;
            return (
              <button
                key={index}
                onClick={() => scrollToIndex(index * itemsPerView)}
                className={`
                  flex items-center gap-2 px-4 py-2.5 
                  rounded-full 
                  transition-all duration-300 
                  font-medium text-sm
                  ${
                    isActive
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30 scale-105"
                      : "bg-white text-gray-600 hover:bg-gray-100 shadow-md hover:shadow-lg"
                  }
                `}
                aria-label={`Go to slide ${index + 1}`}
              >
                <span
                  className={`w-2.5 h-2.5 rounded-full ${isActive ? "bg-white" : "bg-gray-400"}`}
                />
                <span className="hidden sm:inline">{index + 1}</span>
              </button>
            );
          })}
        </div>

        {/* Mobile navigation hint */}
        <div className="md:hidden text-center mt-6">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2.5 rounded-full text-gray-600 text-sm shadow-md">
            <ChevronLeft className="w-4 h-4" />
            <span className="font-medium">
              Swipe untuk melihat video lainnya
            </span>
            <ChevronRight className="w-4 h-4" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default YouTubeCarousel;
