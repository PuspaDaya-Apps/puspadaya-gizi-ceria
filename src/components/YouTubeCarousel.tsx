import React, { useState, useEffect, useCallback } from 'react';
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
import { Play, ChevronLeft, ChevronRight, Youtube, Clock, Eye, Star } from "lucide-react";

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
    title: "Pengenalan Aplikasi Puspadaya",
    description: "Mengenal fitur-fitur utama dan antarmuka aplikasi Puspadaya untuk kader gizi",
    videoId: "SzXrU8d6v8M",
    duration: "5:23",
    views: "12K"
  },
  {
    id: "2",
    title: "Cara Login dan Registrasi",
    description: "Panduan lengkap cara login dan registrasi akun untuk pengguna baru Puspadaya",
    videoId: "LXb3EKWsInQ",
    duration: "3:45",
    views: "8.5K"
  },
  {
    id: "3",
    title: "Input Data Gizi Masyarakat",
    description: "Tutorial cara menginput data gizi masyarakat dengan benar dan efisien",
    videoId: "9YffrCViTVk",
    duration: "7:12",
    views: "15K"
  },
  {
    id: "4",
    title: "Mengelola Laporan Gizi",
    description: "Cara membuat dan mengelola laporan gizi bulanan menggunakan fitur Puspadaya",
    videoId: "jNQXAC9IVRw",
    duration: "6:30",
    views: "10K"
  },
  {
    id: "5",
    title: "Fitur Visualisasi Data",
    description: "Memahami cara membaca dan menggunakan visualisasi data untuk analisis gizi",
    videoId: "yXLL8lDV5Ek",
    duration: "8:15",
    views: "9.2K"
  },
  {
    id: "6",
    title: "Tips dan Trik Puspadaya",
    description: "Kiat-kiat efektif menggunakan aplikasi Puspadaya untuk optimalisasi kerja kader",
    videoId: "oHg5SJYRHA0",
    duration: "4:50",
    views: "11K"
  }
];

const YouTubeCarousel: React.FC = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const [itemsPerView, setItemsPerView] = useState(3);

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
    window.addEventListener('resize', updateItemsPerView);
    return () => window.removeEventListener('resize', updateItemsPerView);
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

  const scrollToIndex = useCallback((index: number) => {
    if (api) {
      api.scrollTo(index, true);
    }
  }, [api]);

  const totalPages = Math.ceil(youtubeVideos.length / itemsPerView);

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
            <span>Video Tutorial</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            Cara Efektif Mengoperasikan Aplikasi <span className="text-blue-600">Puspadaya</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Tonton video tutorial berikut untuk mempelajari cara menggunakan aplikasi Puspadaya dengan efektif dan efisien
          </p>
        </div>

        {/* Carousel Section */}
        <div className="relative">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full max-w-7xl mx-auto"
            setApi={setApi}
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {youtubeVideos.map((video, index) => (
                <CarouselItem key={video.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                  <div className="group h-full">
                    <Card className="
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
                    ">
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
                          <div className="
                            absolute inset-0 
                            bg-gradient-to-t from-black/70 via-black/30 to-transparent
                            opacity-0 group-hover:opacity-100 
                            transition-all duration-300
                            flex items-center justify-center
                          ">
                            <div className="w-20 h-20 rounded-full bg-white/95 backdrop-blur-sm flex items-center justify-center transform scale-0 group-hover:scale-100 transition-all duration-300 delay-75 shadow-2xl">
                              <Play className="w-10 h-10 text-red-500 fill-red-500 ml-1" />
                            </div>
                          </div>

                          {/* Duration Badge */}
                          <div className="absolute bottom-3 right-3 bg-black/80 backdrop-blur-sm text-white text-xs px-2 py-1.5 rounded-md flex items-center gap-1.5 shadow-lg">
                            <Clock className="w-3.5 h-3.5" />
                            <span className="font-medium">{video.duration}</span>
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
                  ${isActive 
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30 scale-105' 
                    : 'bg-white text-gray-600 hover:bg-gray-100 shadow-md hover:shadow-lg'
                  }
                `}
                aria-label={`Go to slide ${index + 1}`}
              >
                <span className={`w-2.5 h-2.5 rounded-full ${isActive ? 'bg-white' : 'bg-gray-400'}`} />
                <span className="hidden sm:inline">{index + 1}</span>
              </button>
            );
          })}
        </div>

        {/* Mobile navigation hint */}
        <div className="md:hidden text-center mt-6">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2.5 rounded-full text-gray-600 text-sm shadow-md">
            <ChevronLeft className="w-4 h-4" />
            <span className="font-medium">Swipe untuk melihat video lainnya</span>
            <ChevronRight className="w-4 h-4" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default YouTubeCarousel;
