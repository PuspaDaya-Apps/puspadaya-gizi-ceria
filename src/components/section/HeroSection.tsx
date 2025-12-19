
import { ArrowDown, Heart, CheckCircle, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import ContactForm from '../ContactForm';

const HeroSection = () => {
  const scrollToFeatures = () => {
    const featuresElement = document.getElementById('features');
    if (featuresElement) {
      featuresElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="pt-24 min-h-screen bg-gradient-to-b from-blue-50 to-white relative overflow-hidden">
      {/* Modern background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-64 h-64 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-40 right-20 w-72 h-72 bg-amber-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-10 left-1/2 w-80 h-80 bg-indigo-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      <div className="container mx-auto px-4 py-20 flex flex-col lg:flex-row items-center relative z-10">
        <div className="w-full lg:w-1/2 space-y-6 mb-12 lg:mb-0">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
            <Star className="w-4 h-4" />
            <span>Platform Terpercaya</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
            Pantau Tumbuh Kembang{' '}
            <span className="text-primary">Si Kecil</span> dengan{' '}
            <span className="text-blue-600">Puspadaya</span>
          </h1>

          <p className="text-xl text-gray-600 max-w-lg">
            Solusi komprehensif untuk memantau gizi dan pertumbuhan balita.
            Mudah digunakan, akurat, dan terpercaya untuk para kader posyandu dan orang tua.
          </p>

          <div className="flex flex-wrap gap-4 pt-4">
            <Button
              onClick={scrollToFeatures}
              className="bg-primary hover:bg-blue-700 text-white px-8 py-6 rounded-xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <span className="flex items-center gap-2">
                Mulai Sekarang
                <ArrowDown size={18} />
              </span>
            </Button>

            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="border-2 border-primary text-primary hover:bg-blue-50 px-8 py-6 rounded-xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
                  Hubungi Kami
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <div className="p-6">
                  <h2 className="text-2xl font-bold text-primary mb-4">Hubungi Tim Puspadaya</h2>
                  <ContactForm />
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Trust indicators */}
          <div className="grid grid-cols-3 gap-6 pt-8">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-2">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <span className="text-sm font-medium text-gray-700">Akurat</span>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-2">
                <Heart className="w-6 h-6 text-blue-600" />
              </div>
              <span className="text-sm font-medium text-gray-700">Amanah</span>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mb-2">
                <Star className="w-6 h-6 text-amber-500" />
              </div>
              <span className="text-sm font-medium text-gray-700">Terpercaya</span>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-1/2 flex justify-center">
          <div className="relative">
            {/* Phone mockup with better styling */}
            <div className="relative bg-gray-200 border-8 border-gray-800 rounded-[2.5rem] p-4 shadow-2xl max-w-sm mx-auto">
              <div className="bg-black rounded-[2rem] overflow-hidden">
                <img
                  src="/lovable-uploads/95e14473-190b-4fd1-8942-8b32f7627ce1.png"
                  alt="Puspadaya App Interface"
                  className="w-full block"
                />
              </div>

              {/* Status bar */}
              <div className="absolute top-0 left-0 right-0 h-8 bg-gray-800 rounded-t-[2.2rem] rounded-b-md flex items-center justify-center">
                <div className="flex space-x-1">
                  <div className="w-1 h-1 bg-white rounded-full"></div>
                  <div className="w-1 h-1 bg-white rounded-full"></div>
                  <div className="w-1 h-1 bg-white rounded-full"></div>
                </div>
              </div>
            </div>

            {/* Floating elements around the phone */}
            <div className="absolute -top-6 -right-6 w-14 h-14 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full flex items-center justify-center shadow-lg animate-bounce">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <div className="absolute -bottom-6 -left-6 w-12 h-12 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-lg animate-bounce" style={{ animationDelay: '0.5s' }}>
              <CheckCircle className="w-5 h-5 text-white" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
