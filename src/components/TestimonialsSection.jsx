import React, { useState } from 'react';
import { FaStar, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const testimonials = [
  {
    id: 1,
    company: "TechNova Solutions",
    logo: "/img/logo/logo.png", // Use your local logo or fallback
    image: "/img/logo/logo.png", // Use your local image or fallback
    name: "Anna Kowalski",
    role: "CEO",
    content: "Początkowo podchodziliśmy do AI sceptycznie. Zespół OpenPol pokazał nam krok po kroku, jak możemy wykorzystać tę technologię do optymalizacji produkcji. Wyniki przerosły nasze oczekiwania!",
    rating: 5,
  },
  {
    id: 2,
    company: "GreenEco Industries",
    logo: "/img/logo/logo.png",
    image: "/img/logo/logo.png",
    name: "Mark Jensen",
    role: "Kierownik Operacyjny",
    content: "Niezawodny partner z innowacyjną technologią. Ich podejście do optymalizacji procesów było naprawdę imponujące.",
    rating: 4,
  },
  {
    id: 3,
    company: "BuildMaster Corp",
    logo: "/img/logo/logo.png",
    image: "/img/logo/logo.png",
    name: "Lina Patel",
    role: "Kierownik Produkcji",
    content: "Mając 30 lat tradycji, znaleźliśmy nowoczesne rozwiązanie w ich narzędziach AI. Gorąco polecam tę współpracę!",
    rating: 5,
  },
];

export const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section id="testimonials" className="bg-gradient-to-b from-gray-900 to-gray-800 py-20 text-white">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-16 text-cyan-400 animate-fade-in">Co mówią nasi klienci</h2>
        <div className="relative">
          <div className="overflow-hidden">
            <div className="flex transition-transform duration-700 ease-in-out" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="min-w-full p-6 flex items-center justify-center">
                  <div className="bg-gray-800 p-10 rounded-xl shadow-2xl hover:shadow-cyan-500/50 transition-shadow duration-300 border border-cyan-500/20">
                    <div className="flex items-center mb-6">
                      <img src={testimonial.logo} alt={`${testimonial.company} logo`} className="w-16 h-16 mr-6 rounded-full border-2 border-cyan-500" />
                      <div>
                        <h3 className="text-2xl font-semibold text-white">{testimonial.company}</h3>
                        <p className="text-cyan-300">{testimonial.role}</p>
                      </div>
                    </div>
                    <img src={testimonial.image} alt={testimonial.name} className="w-32 h-32 rounded-full mx-auto mb-6 border-4 border-cyan-500/30 object-cover animate-pulse-slow" />
                    <p className="text-gray-200 italic text-lg mb-6">" {testimonial.content} "</p>
                    <div className="flex items-center justify-center">
                      {[...Array(5)].map((_, i) => (
                        <FaStar key={i} className={i < testimonial.rating ? "text-yellow-400" : "text-gray-500"} />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <button onClick={prevSlide} className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-cyan-600 p-3 rounded-full hover:bg-cyan-700 transition-colors">
            <FaChevronLeft className="text-white" />
          </button>
          <button onClick={nextSlide} className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-cyan-600 p-3 rounded-full hover:bg-cyan-700 transition-colors">
            <FaChevronRight className="text-white" />
          </button>
          <div className="flex justify-center mt-6 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full ${currentIndex === index ? 'bg-cyan-500' : 'bg-gray-500'} hover:bg-cyan-400 transition-colors`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
