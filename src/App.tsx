
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import { queryClient } from "./services/api";

// Lazy load pages for better performance
const Index = lazy(() => import("./pages/Index"));
const Team = lazy(() => import("./pages/Team"));
const NotFound = lazy(() => import("./pages/NotFound"));
const KebijakanPrivasi = lazy(() => import("./pages/KebijakanPrivasi"));
const SyaratdanKetentuan = lazy(() => import("./pages/SyaratdanKetentuan"));

// Loading component for lazy loaded routes
const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
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
  </QueryClientProvider>
);

export default App;
