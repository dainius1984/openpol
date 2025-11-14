import React from 'react';
import { logButtonClick } from '../utils/analytics';

export const Footer = ({ setModalOpen }) => (
  <footer className="bg-gray-900 border-t border-gray-700 text-gray-400">
    <div className="container mx-auto px-6 py-8">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center space-x-3 mb-4 md:mb-0">
          <img src="/img/logo/logo.png" alt="OpenPol Logo" className="h-24 w-auto object-contain drop-shadow-2xl brightness-150" loading="lazy" width="96" height="96" />
          <span className="text-lg font-semibold text-white">OpenPol</span>
        </div>
        <div className="flex flex-col items-center md:items-end gap-3">
          <button
            onClick={() => {
              logButtonClick('Footer Consultation Button');
              setModalOpen(true);
            }}
            className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 px-6 rounded-xl text-sm shadow-lg transition-transform duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-cyan-400"
          >
            Skontaktuj się z nami w sprawie konsultacji AI
          </button>
          <div className="text-center md:text-right">
            <p>&copy; {new Date().getFullYear()} OpenPol. Wszelkie prawa zastrzeżone.</p>
            <p className="text-sm mt-2">Zabezpieczamy przyszłość polskiego biznesu.</p>
          </div>
        </div>
      </div>
    </div>
  </footer>
);
