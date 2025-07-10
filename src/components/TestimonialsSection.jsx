import React, { useState } from 'react';
import { FaStar, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const testimonials = [
  {
    id: 1,
    company: "TechNova Solutions",
    logo: "/img/testimonials/techlogo.jpg", // Use your local logo or fallback
    image: "/img/testimonials/tech1.jpg", // Use your local image or fallback
    name: "Anna Kowalski",
    role: "CEO",
    content: "Początkowo podchodziliśmy do AI sceptycznie. Zespół OpenPol pokazał nam krok po kroku, jak możemy wykorzystać tę technologię do optymalizacji produkcji. Wyniki przerosły nasze oczekiwania!",
    rating: 5,
  },
  {
    id: 2,
    company: "GreenEco Industries",
    logo: "/img/testimonials/greenlogo.jpg",
    image: "/img/testimonials/green1.jpg",
    name: "Mark Jensen",
    role: "Kierownik Operacyjny",
    content: "Niezawodny partner z innowacyjną technologią. Ich podejście do optymalizacji procesów było naprawdę imponujące.",
    rating: 5,
  },
  {
    id: 3,
    company: "BuildMaster Corp",
    logo: "/img/logo/buildlogo.jpg",
    image: "/img/testimonials/build1.jpg",
    name: "Lina Patel",
    role: "Kierownik Produkcji",
    content: "Mając 30 lat tradycji, znaleźliśmy nowoczesne rozwiązanie w ich narzędziach AI. Gorąco polecam tę współpracę!",
    rating: 5,
  },
];

export const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    if (currentIndex < testimonials.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  return (
    <section id="testimonials" className="bg-gradient-to-b from-gray-900 to-gray-800 py-12 text-white">
      <div className="container mx-auto px-2 md:px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-cyan-400 animate-fade-in">Co mówią nasi klienci</h2>
        <div className="relative">
          <div className="overflow-hidden">
            <div className="flex transition-transform duration-700 ease-in-out" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="min-w-full flex items-center justify-center">
                  <div className="bg-gray-800/95 px-4 py-4 md:px-8 md:py-6 rounded-2xl shadow-xl border border-cyan-500/20 w-full max-w-4xl flex flex-col md:flex-row items-center md:items-stretch gap-4 md:gap-0">
                    {/* Left: Logo, Name, Role */}
                    <div className="flex flex-col items-center md:items-start justify-center md:justify-center md:w-1/4 px-2">
                      {testimonial.company === 'BuildMaster Corp' ? (
                        <div className="mb-2 rounded-full border-2 border-cyan-500 bg-white flex items-center justify-center w-10 h-10 md:w-12 md:h-12">
                          <img src={testimonial.logo} alt={`${testimonial.company} logo`} className="w-8 h-8 md:w-10 md:h-10 object-contain" />
                        </div>
                      ) : (
                        <img src={testimonial.logo} alt={`${testimonial.company} logo`} className="mb-2 rounded-full border-2 border-cyan-500 w-10 h-10 md:w-12 md:h-12 object-cover" />
                      )}
                      <h3 className="text-base md:text-lg font-semibold text-white text-center md:text-left leading-tight">{testimonial.company}</h3>
                      <p className="text-cyan-300 text-xs md:text-sm text-center md:text-left">{testimonial.role}</p>
                    </div>
                    {/* Center: Avatar */}
                    <div className="flex flex-col items-center justify-center md:w-1/5 px-2">
                      <img src={testimonial.image} alt={testimonial.name} className="w-16 h-16 md:w-20 md:h-20 rounded-full border-4 border-cyan-500/30 object-cover" />
                    </div>
                    {/* Right: Text and Stars */}
                    <div className="flex-1 flex flex-col justify-center items-center md:items-start px-2">
                      <p className="text-gray-200 italic text-sm md:text-base mb-2 text-center md:text-left leading-snug max-w-xl">" {testimonial.content} "</p>
                      <div className="flex items-center justify-center md:justify-start mt-1">
                        {[...Array(5)].map((_, i) => (
                          <FaStar key={i} className={i < testimonial.rating ? "text-yellow-400" : "text-gray-500"} />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <button
            onClick={prevSlide}
            disabled={currentIndex === 0}
            className={`absolute left-2 md:left-4 top-1/2 transform -translate-y-1/2 bg-cyan-600 p-2 md:p-3 rounded-full transition-colors ${currentIndex === 0 ? 'opacity-40 cursor-not-allowed' : 'hover:bg-cyan-700'}`}
          >
            <FaChevronLeft className="text-white" />
          </button>
          <button
            onClick={nextSlide}
            disabled={currentIndex === testimonials.length - 1}
            className={`absolute right-2 md:right-4 top-1/2 transform -translate-y-1/2 bg-cyan-600 p-2 md:p-3 rounded-full transition-colors ${currentIndex === testimonials.length - 1 ? 'opacity-40 cursor-not-allowed' : 'hover:bg-cyan-700'}`}
          >
            <FaChevronRight className="text-white" />
          </button>
          <div className="flex justify-center mt-4 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full ${currentIndex === index ? 'bg-cyan-500' : 'bg-gray-500'} hover:bg-cyan-400 transition-colors`}
                aria-label={`Przejdź do opinii ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
