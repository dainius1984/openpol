import React from 'react';

export const TestimonialsSection = () => (
    <section id="testimonials" className="py-20 bg-gray-800">
        <div className="container mx-auto px-6">
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-white">Zaufali nam liderzy rynku</h2>
                <p className="text-gray-400 mt-2">Zobacz, co mówią o nas właściciele firm z wieloletnim doświadczeniem.</p>
                <div className="inline-block w-24 h-1 bg-cyan-500 rounded mt-4"></div>
            </div>
             <div className="mt-16">
                <div className="max-w-3xl mx-auto bg-gray-900 p-8 rounded-xl shadow-lg relative">
                    <div className="absolute top-0 left-8 -mt-4 text-8xl text-cyan-500 opacity-20 font-serif">“</div>
                    <p className="text-gray-300 italic text-lg z-10 relative">
                        Początkowo podchodziliśmy do AI sceptycznie. Zespół OpenPol pokazał nam jednak krok po kroku, jak możemy wykorzystać tę technologię do optymalizacji produkcji. Wyniki przerosły nasze oczekiwania. To partner godny zaufania.
                    </p>
                    <div className="text-right mt-4 text-white font-bold">
                        - Właściciel, Firma Produkcyjna z 30-letnią tradycją
                    </div>
                </div>
            </div>
        </div>
    </section>
);
