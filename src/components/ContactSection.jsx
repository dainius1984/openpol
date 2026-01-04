import React, { useState, useRef, useEffect } from 'react';
import { ContactForm } from './ContactForm';
import { ConsultationModal } from './ConsultationModal';
import { logSectionView } from '../utils/analytics';

export const ContactSection = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const sectionRef = useRef(null);

  // Track section view when it enters viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            logSectionView('Contact Section');
            observer.disconnect();
          }
        });
      },
      { threshold: 0.5 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="contact" className="py-20 bg-gray-900 text-white scroll-mt-28 relative overflow-hidden">
      {/* Placeholder for future background video */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
        <div className="w-full h-full bg-gradient-to-br from-cyan-900/60 via-gray-900/80 to-gray-800/90 flex items-center justify-center">
          <span className="text-3xl md:text-5xl font-black text-cyan-400 opacity-10 select-none">[VIDEO: Kontakt / AI / Office]</span>
        </div>
      </div>
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center mb-12">
          <span className="text-lg md:text-xl font-bold text-cyan-400 mb-4 text-center">Masz pytania? Skontaktuj się z nami!</span>
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
