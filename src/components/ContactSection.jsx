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
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-cyan-400 mb-2">Kontakt</h2>
          <p className="text-gray-300">Masz pytania? Skontaktuj się z nami!</p>
          <button
            onClick={() => setModalOpen(true)}
            className="mt-8 bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 px-8 rounded-xl text-lg shadow-lg transition-transform duration-300 ease-in-out transform hover:scale-105"
          >
            Umów Bezpłatną Konsultację
          </button>
        </div>
        <div className="flex justify-center">
          <div className="w-full max-w-2xl md:max-w-3xl lg:max-w-4xl">
            <ContactForm />
          </div>
        </div>
        <ConsultationModal open={modalOpen} onClose={() => setModalOpen(false)} />
      </div>
    </section>
  );
};
