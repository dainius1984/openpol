import React from 'react';

export const HeroSection = () => (
  <section className="bg-gray-900 text-white pt-32 pb-20 relative overflow-hidden">
    <div className="absolute inset-0 bg-grid-gray-700/[0.2] [mask-image:linear-gradient(to_bottom,white_5%,transparent_90%)]"></div>
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500 rounded-full opacity-10 blur-3xl"></div>
    <div className="container mx-auto px-6 text-center relative z-10">
      <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-4">
        Adaptacja do AI to konieczność, nie opcja. <span className="text-cyan-400">Pomożemy Ci w tym.</span>
      </h1>
      <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-8">
        Wiele firm o ugruntowanej pozycji na rynku stoi przed wyzwaniem AI. Nie wiedzą od czego zacząć. OpenPol przekształca tę niepewność w realną przewagę konkurencyjną.
      </p>
      <a href="#contact" className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 px-8 rounded-lg text-lg transition-transform duration-300 ease-in-out transform hover:scale-105 inline-block">
        Porozmawiajmy o Twojej firmie
      </a>
    </div>
  </section>
);
