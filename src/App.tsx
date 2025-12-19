
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import { LoadingProvider } from "./context/LoadingContext";
import { queryClient } from "./services/api";

// Lazy load pages for better performance
const Index = lazy(() => import("./pages/Index"));
const Team = lazy(() => import("./pages/Team"));
const NotFound = lazy(() => import("./pages/NotFound"));
const KebijakanPrivasi = lazy(() => import("./pages/KebijakanPrivasi"));
const SyaratdanKetentuan = lazy(() => import("./pages/SyaratdanKetentuan"));

// Loading component for lazy loaded routes
const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
    <div className="text-center">
      <div className="relative inline-block">
        <div className="w-16 h-16 border-4 border-blue-200 rounded-full"></div>
        <div className="absolute top-0 left-0 w-16 h-16 border-4 border-blue-500 rounded-full animate-spin border-t-transparent"></div>
        <div className="absolute top-1/2 left-1/2 w-6 h-6 bg-blue-500 rounded-full transform -translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
      </div>
      <p className="mt-6 text-lg font-medium text-gray-700">Memuat halaman...</p>
      <div className="mt-2 text-sm text-gray-500">Pantau gizi & tumbuh kembang si kecil</div>
    </div>
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LoadingProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={
              <Suspense fallback={<LoadingSpinner />}>
                <Index />
              </Suspense>
            } />
            <Route path="/team" element={
              <Suspense fallback={<LoadingSpinner />}>
                <Team />
              </Suspense>
            } />
            <Route path="/kebijakanprivasi" element={
              <Suspense fallback={<LoadingSpinner />}>
                <KebijakanPrivasi />
              </Suspense>
            } />
            <Route path="/syaratdanketentuan" element={
              <Suspense fallback={<LoadingSpinner />}>
                <SyaratdanKetentuan />
              </Suspense>
            } />

            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={
              <Suspense fallback={<LoadingSpinner />}>
                <NotFound />
              </Suspense>
            } />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </LoadingProvider>
  </QueryClientProvider>
);

export default App;
