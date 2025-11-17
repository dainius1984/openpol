import React, { useRef, useEffect } from 'react';
import { logButtonClick, logVideoPlay, logVideoPause, logVideoComplete, logSectionView } from '../utils/analytics';

// Import Google Fonts in the document head (for demo, add to index.html):
// <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;700;900&display=swap" rel="stylesheet" />

export const HeroSection = ({ setModalOpen }) => {
  const videoRef = useRef(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.5;
    }
  }, []);

  // Track section view when it enters viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            logSectionView('Hero Section');
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

  // Track video interactions
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handlePlay = () => logVideoPlay('Hero Background Video');
    const handlePause = () => logVideoPause('Hero Background Video');
    const handleEnded = () => logVideoComplete('Hero Background Video');

    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);
    video.addEventListener('ended', handleEnded);

    return () => {
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
      video.removeEventListener('ended', handleEnded);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative bg-gray-900 text-white min-h-screen pt-24 md:pt-0 flex items-center justify-center scroll-mt-28 overflow-hidden font-[Poppins] mb-16 md:mb-28"
    >
      {/* Background video */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          className="w-full h-full object-cover blur-sm"
        >
          <source src="/img/video/1.mp4" type="video/mp4" />
        </video>
      </div>
      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900/90 via-gray-900/70 to-gray-800/80 z-10"></div>
      <div className="container mx-auto px-6 flex flex-col items-center justify-center text-center relative z-20">
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-4 tracking-tight drop-shadow-2xl">
          <span className="block">Adaptacja do AI to konieczność, nie opcja.</span>
          <span className="text-cyan-400 block mt-2">Pomożemy Ci w tym.</span>
        </h1>
        <p className="text-lg md:text-2xl text-gray-200 max-w-2xl md:max-w-3xl mx-auto mb-10 font-medium drop-shadow-lg">
          Wiele firm o ugruntowanej pozycji na rynku stoi przed wyzwaniem AI. Nie wiedzą od czego zacząć. <span className="text-cyan-300 font-semibold">OpenPol</span> przekształca tę niepewność w realną przewagę konkurencyjną.
        </p>
        <button
          onClick={() => {
            logButtonClick('Hero Section Consultation Button');
            setModalOpen(true);
          }}
          className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-4 px-10 rounded-xl text-xl shadow-xl transition-transform duration-300 ease-in-out transform hover:scale-105 mb-2"
        >
          Porozmawiajmy o Twojej firmie
        </button>
      </div>
    </section>
  );
};
