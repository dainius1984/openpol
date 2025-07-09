import React, { useRef, useEffect, useState } from 'react';
import { ConsultationModal } from './ConsultationModal';

// Import Google Fonts in the document head (for demo, add to index.html):
// <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;700;900&display=swap" rel="stylesheet" />

export const HeroSection = () => {
  const videoRef = useRef(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.5;
    }
  }, []);

  return (
    <section id="hero" className="relative bg-gray-900 text-white pt-32 pb-28 md:pb-36 overflow-hidden font-[Poppins] mb-16 md:mb-28 scroll-mt-28">
      {/* Background video */}
      <div className="absolute inset-0 z-0">
        <video 
          ref={videoRef}
          autoPlay 
          loop 
          muted 
          className="w-full h-full object-cover blur-sm"
        >
          <source src="/img/video/1.mp4" type="video/mp4" />
        </video>
      </div>
      {/* Overlay for readability - matches theme colors */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900/90 via-gray-900/70 to-gray-800/80 z-10"></div>
      <div className="container mx-auto px-6 text-center relative z-20">
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-4 tracking-tight drop-shadow-xl">
          <span className="block">Adaptacja do AI to konieczność, nie opcja.</span>
          <span className="text-cyan-400 block mt-2">Pomożemy Ci w tym.</span>
        </h1>
        <p className="text-lg md:text-2xl text-gray-200 max-w-3xl mx-auto mb-10 font-medium drop-shadow">
          Wiele firm o ugruntowanej pozycji na rynku stoi przed wyzwaniem AI. Nie wiedzą od czego zacząć. <span className="text-cyan-300 font-semibold">OpenPol</span> przekształca tę niepewność w realną przewagę konkurencyjną.
        </p>
        <button
          onClick={() => setModalOpen(true)}
          className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-4 px-10 rounded-xl text-xl shadow-lg transition-transform duration-300 ease-in-out transform hover:scale-105 inline-block"
        >
          Porozmawiajmy o Twojej firmie
        </button>
      </div>
      <ConsultationModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </section>
  );
};
