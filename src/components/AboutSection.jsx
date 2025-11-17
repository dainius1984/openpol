import React, { useRef, useEffect } from 'react';
import { CheckCircle } from './Icons';
import { logButtonClick, logSectionView } from '../utils/analytics';

export const AboutSection = ({ setModalOpen }) => {
  const sectionRef = useRef(null);

  // Track section view when it enters viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            logSectionView('About Section');
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
    <section ref={sectionRef} id="about" className="py-20 bg-gray-900 text-white scroll-mt-28">
    <div className="container mx-auto px-6 flex flex-col md:flex-row items-center gap-12">
      <div className="md:w-1/2">
        <div className="relative group">
          <div className="absolute -inset-2 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg blur opacity-50"></div>
          {/* Video frame with overlay and play button */}
          <div className="relative rounded-lg overflow-hidden shadow-2xl border-4 border-cyan-500/40">
            <video
              src="/img/video/3.mp4"
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              className="w-full h-64 md:h-80 object-cover brightness-90 group-hover:brightness-100 transition duration-300 blur-[2px] group-hover:blur-0"
            />
          </div>
        </div>
      </div>
      <div className="md:w-1/2">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Dlaczego OpenPol?</h2>
        <p className="text-gray-300 mb-6">Jesteśmy mostem łączącym tradycyjny, polski biznes z technologią jutra. Nie sprzedajemy modnych haseł, lecz budujemy trwałą wartość.</p>
        <ul className="space-y-4">
          <li className="flex items-start">
            <CheckCircle className="w-6 h-6 text-cyan-400 mr-3 mt-1 flex-shrink-0" />
            <div>
              <h4 className="font-bold">Rozumiemy Twój Biznes</h4>
              <p className="text-gray-400">Mówimy Twoim językiem. Skupiamy się na Twoich celach biznesowych, a nie na skomplikowanej technologii.</p>
            </div>
          </li>
          <li className="flex items-start">
            <CheckCircle className="w-6 h-6 text-cyan-400 mr-3 mt-1 flex-shrink-0" />
            <div>
              <h4 className="font-bold">Praktyczne Doświadczenie</h4>
              <p className="text-gray-400">Dostarczamy sprawdzone rozwiązania, które przynoszą mierzalny zwrot z inwestycji (ROI).</p>
            </div>
          </li>
          <li className="flex items-start">
            <CheckCircle className="w-6 h-6 text-cyan-400 mr-3 mt-1 flex-shrink-0" />
            <div>
              <h4 className="font-bold">Partnerstwo i Wsparcie</h4>
              <p className="text-gray-400">Jesteśmy z Tobą na każdym kroku – od pierwszej rozmowy, przez wdrożenie, aż po dalszy rozwój.</p>
            </div>
          </li>
        </ul>
        <div className="mt-8 flex justify-center md:justify-start">
          <button
            onClick={() => {
              logButtonClick('About Section Consultation Button');
              setModalOpen(true);
            }}
            className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 px-8 rounded-xl text-lg shadow-xl transition-transform duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-cyan-400"
          >
            Skontaktuj się z nami w sprawie konsultacji AI
          </button>
        </div>
      </div>
    </div>
  </section>
  );
};
