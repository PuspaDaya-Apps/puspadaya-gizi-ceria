
import { ArrowDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import ContactForm from './ContactForm';

const HeroSection = () => {
  const scrollToFeatures = () => {
    const featuresElement = document.getElementById('features');
    if (featuresElement) {
      featuresElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="pt-24 min-h-screen bg-white relative overflow-hidden">
      {/* Floating animations */}
      <div className="absolute top-20 left-20 w-20 h-20 rounded-full bg-blue-100 opacity-60 animate-float"></div>
      <div className="absolute top-40 right-40 w-16 h-16 rounded-full bg-accent opacity-40 animate-float" style={{ animationDelay: '1s' }}></div>
      <div className="absolute bottom-20 left-1/3 w-12 h-12 rounded-full bg-blue-200 opacity-50 animate-float" style={{ animationDelay: '2s' }}></div>
      
      <div className="container mx-auto px-4 py-20 flex flex-col lg:flex-row items-center gap-12">
        <div className="w-full lg:w-1/2 space-y-6">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary leading-tight">
            Pantau Gizi & Perkembangan Si Kecil dengan Puspadaya
          </h1>
          <p className="text-xl text-gray-500">
            Mudah, Akurat, dan Terpercaya untuk Ibu Cerdas
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pt-6">
            <Button 
              onClick={scrollToFeatures}
              className="btn btn-primary btn-lg gap-2"
            >
              Mulai Sekarang
              <ArrowDown size={16} />
            </Button>
            
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="btn btn-outline btn-secondary btn-lg">
                  Hubungi Kami
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <div className="p-4">
                  <h2 className="text-2xl font-bold text-primary mb-4">Hubungi Tim Puspadaya</h2>
                  <ContactForm />
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        
        <div className="w-full lg:w-1/2 flex justify-center">
          <div className="relative w-[280px] max-w-full">
            {/* Phone frame with animated hover effect */}
            <div className="animate-float">
              <img 
                src="/lovable-uploads/95e14473-190b-4fd1-8942-8b32f7627ce1.png" 
                alt="Puspadaya App Interface" 
                className="w-full rounded-3xl shadow-lg animate-pulse-gentle"
              />
            </div>
            
            {/* Floating elements around the phone */}
            <div className="absolute -top-4 -right-4 w-12 h-12 bg-blue-100 rounded-full animate-float" style={{ animationDelay: '0.5s' }}></div>
            <div className="absolute -bottom-4 -left-4 w-8 h-8 bg-yellow-200 rounded-full animate-float" style={{ animationDelay: '1.2s' }}></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
