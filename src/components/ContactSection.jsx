import React, { useState } from 'react';
import { ContactForm } from './ContactForm';
import { ConsultationModal } from './ConsultationModal';

export const ContactSection = () => {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <section id="contact" className="py-20 bg-gray-900 text-white scroll-mt-28 relative overflow-hidden">
      {/* Placeholder for future background video */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
        <div className="w-full h-full bg-gradient-to-br from-cyan-900/60 via-gray-900/80 to-gray-800/90 flex items-center justify-center">
          <span className="text-3xl md:text-5xl font-black text-cyan-400 opacity-10 select-none">[VIDEO: Kontakt / AI / Office]</span>
        </div>
      </div>
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center mb-12">
          <span className="text-lg md:text-xl font-bold text-cyan-400 mb-4 text-center">Masz pytania? Skontaktuj się z nami!</span>
          <button
            onClick={() => setModalOpen(true)}
            className="mt-2 bg-cyan-500 hover:bg-cyan-600 text-white font-extrabold py-4 px-10 rounded-2xl text-xl shadow-xl transition-transform duration-300 ease-in-out transform hover:scale-105 focus:ring-4 focus:ring-cyan-400/40 animate-pulse"
          >
            <span className="inline-flex items-center gap-2">
              <svg xmlns='http://www.w3.org/2000/svg' className='h-6 w-6' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M21 10.5a8.38 8.38 0 01-.9 3.8c-.5 1-1.2 2-2.1 2.7-.7.6-1.6 1-2.5 1.2-.7.2-1.4.3-2.1.3s-1.4-.1-2.1-.3c-.9-.2-1.8-.6-2.5-1.2-.9-.7-1.6-1.7-2.1-2.7A8.38 8.38 0 013 10.5C3 6.4 7.1 3 12 3s9 3.4 9 7.5z' /></svg>
              Umów Bezpłatną Konsultację
            </span>
          </button>
        </div>
        <div className="flex flex-col items-center mb-8">
          <div className="w-24 h-1 bg-cyan-500 rounded mb-2"></div>
          <span className="text-cyan-300 text-sm uppercase tracking-widest mb-2">lub wypełnij formularz</span>
        </div>
        <div className="flex justify-center">
          <div className="w-full max-w-2xl md:max-w-3xl lg:max-w-4xl bg-gray-800/80 rounded-2xl shadow-lg p-6 md:p-10 border border-cyan-500/10">
            <ContactForm />
          </div>
        </div>
        <ConsultationModal open={modalOpen} onClose={() => setModalOpen(false)} />
      </div>
    </section>
  );
};
