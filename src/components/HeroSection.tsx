
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
    <section className="min-h-screen bg-white relative overflow-hidden">
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
          <div className="card bg-white shadow-lg border-4 border-yellow-400 rounded-2xl p-4 w-[280px] max-w-full animate-pulse-gentle">
            <img 
              src="https://images.unsplash.com/photo-1576614086934-497daf90ffb5?q=80&w=2070&auto=format&fit=crop" 
              alt="Puspadaya App Interface" 
              className="rounded-xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
