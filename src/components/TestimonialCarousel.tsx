import React, { useState, useEffect } from 'react';
import TestimonialCard from './cardcomponents/TestimonialCard';

// Generate random testimonial data
const generateRandomTestimonials = () => {
  const quotes = [
    "Puspadaya sangat membantu saya sebagai kader dalam mengelola data gizi masyarakat. Kini saya bisa mengakses informasi dari berbagai sumber dalam satu platform.",
    "Sebagai kader, saya sangat terbantu dengan fitur agregasi data Puspadaya. Saya bisa dengan mudah mengumpulkan dan menganalisis data gizi di wilayah saya.",
    "Aplikasi Puspadaya memudahkan saya dalam memberikan edukasi gizi kepada masyarakat. Semua informasi penting tersedia dalam satu tempat.",
    "Dengan Puspadaya, saya bisa memantau perkembangan gizi anak-anak di wilayah saya secara efektif dan efisien.",
    "Fitur pelaporan di Puspadaya sangat membantu kami para kader dalam membuat laporan mingguan dan bulanan.",
    "Puspadaya membuat pekerjaan kami sebagai kader menjadi lebih terorganisir dan sistematis.",
    "Sebagai kader gizi, saya merasa sangat terbantu dengan informasi yang terkini dan akurat dari platform Puspadaya.",
    "Melalui Puspadaya, saya bisa berbagi informasi gizi dengan kader lainnya dari berbagai wilayah.",
    "Platform Puspadaya memudahkan saya untuk mengakses materi edukasi gizi yang bisa saya berikan langsung ke masyarakat.",
    "Puspadaya menjadi alat yang sangat efektif dalam membantu kader dalam melaksanakan tugasnya di bidang gizi.",
    "Fitur-fitur di Puspadaya sangat komprehensif dan membantu saya dalam memberikan layanan gizi yang terbaik untuk masyarakat.",
    "Sebagai kader, saya merasa lebih percaya diri setelah menggunakan Puspadaya dalam memberikan konsultasi gizi kepada warga."
  ];

  const firstNames = ['Siti', 'Ani', 'Dewi', 'Lina', 'Rina', 'Mita', 'Kiki', 'Yuni', 'Nina', 'Tina', 'Budi', 'Agus', 'Joko', 'Anton', 'Rudi', 'Santoso', 'Hadi', 'Dedi', 'Eko', 'Fajar'];
  const lastNames = ['Sari', 'Lestari', 'Putri', 'Wati', 'Kurnia', 'Mega', 'Sari', 'Wulan', 'Dewi', 'Pertiwi', 'Santoso', 'Nugroho', 'Kurniawan', 'Pratama', 'Wibowo', 'Hidayat', 'Prasetya', 'Firmansyah', 'Maulana', 'Susanto'];

  return Array.from({ length: 12 }, (_, i) => {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const censoredName = firstName.charAt(0) + '*'.repeat(firstName.length - 1) + ' ' + lastName.charAt(0) + '*'.repeat(lastName.length - 1);

    return {
      id: i,
      quote: quotes[i],
      author: censoredName,
      role: "Kader",
      rating: 5, // All ratings are 5 stars
      imageUrl: "" // Empty to show real content without placeholder images
    };
  });
};

const TestimonialCarousel = () => {
  const [testimonials] = useState(generateRandomTestimonials());
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [itemsToShow, setItemsToShow] = useState(3); // Default to 3 items on desktop

  // Handle responsive behavior based on screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setItemsToShow(1); // Show 1 item on mobile
      } else if (window.innerWidth < 1024) {
        setItemsToShow(2); // Show 2 items on tablet
      } else {
        setItemsToShow(3); // Show 3 items on desktop
      }
    };

    // Set initial value
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Clean up event listener
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Auto-scroll functionality (pauses when user hovers over the section)
  useEffect(() => {
    if (isHovered) return;

    const interval = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + itemsToShow) % testimonials.length);
    }, 4000); // Change testimonial set every 4 seconds

    return () => clearInterval(interval);
  }, [testimonials.length, isHovered, itemsToShow]);

  // Function to go to a specific testimonial set
  const goToTestimonialSet = (index: number) => {
    setCurrentIndex(index);
  };

  // Calculate the number of navigation dots needed based on itemsToShow
  const totalPages = Math.ceil(testimonials.length / itemsToShow);

  return (
    <div className="w-full overflow-hidden">
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{
          transform: `translateX(-${(currentIndex / itemsToShow) * 100}%)`
        }}
      >
        <div className="flex w-full">
          {testimonials.map((testimonial, index) => (
            <div 
              key={testimonial.id} 
              className={`px-4 flex-shrink-0 ${itemsToShow === 1 ? 'w-full' : itemsToShow === 2 ? 'w-1/2' : 'w-1/3'}`}
            >
              <TestimonialCard
                quote={testimonial.quote}
                author={testimonial.author}
                role={testimonial.role}
                imageUrl={testimonial.imageUrl}
                rating={testimonial.rating}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Navigation dots */}
      <div className="flex justify-center mt-6 space-x-2">
        {Array.from({ length: totalPages }).map((_, pageIndex) => {
          const setIndex = pageIndex * itemsToShow;
          return (
            <button
              key={pageIndex}
              onClick={() => goToTestimonialSet(setIndex)}
              className={`w-3 h-3 rounded-full ${
                Math.floor(currentIndex / itemsToShow) === pageIndex ? 'bg-primary' : 'bg-gray-300'
              }`}
              aria-label={`Go to testimonial set ${pageIndex + 1}`}
            />
          );
        })}
      </div>
    </div>
  );
};

export default TestimonialCarousel;