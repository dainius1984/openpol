import React from 'react';

// Import Google Fonts in the document head (for demo, add to index.html):
// <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;700;900&display=swap" rel="stylesheet" />

export const HeroSection = () => (
  <section className="relative bg-gray-900 text-white pt-32 pb-20 overflow-hidden font-[Poppins]">
    {/* Background video placeholder */}
    <div className="absolute inset-0 z-0">
      {/* Replace this div with a <video> tag when you have the video */}
      <div className="w-full h-full bg-gradient-to-br from-cyan-900/60 via-gray-900/80 to-gray-800/90 flex items-center justify-center">
        <span className="text-3xl md:text-5xl font-black text-cyan-400 opacity-20 select-none">[VIDEO: Business Growth]</span>
      </div>
    </div>
    {/* Overlay for readability */}
    <div className="absolute inset-0 bg-gradient-to-b from-gray-900/80 via-gray-900/60 to-transparent z-10"></div>
    <div className="container mx-auto px-6 text-center relative z-20">
      <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-4 tracking-tight drop-shadow-xl">
        <span className="block">Adaptacja do AI to konieczność, nie opcja.</span>
        <span className="text-cyan-400 block mt-2">Pomożemy Ci w tym.</span>
      </h1>
      <p className="text-lg md:text-2xl text-gray-200 max-w-3xl mx-auto mb-10 font-medium drop-shadow">
        Wiele firm o ugruntowanej pozycji na rynku stoi przed wyzwaniem AI. Nie wiedzą od czego zacząć. <span className="text-cyan-300 font-semibold">OpenPol</span> przekształca tę niepewność w realną przewagę konkurencyjną.
      </p>
      <a href="#contact" className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-4 px-10 rounded-xl text-xl shadow-lg transition-transform duration-300 ease-in-out transform hover:scale-105 inline-block">
        Porozmawiajmy o Twojej firmie
      </a>
    </div>
  </section>
);
