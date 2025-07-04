import React from 'react';

export const Footer = () => (
  <footer className="bg-gray-900 border-t border-gray-700 text-gray-400">
    <div className="container mx-auto px-6 py-8">
      <div className="flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center space-x-3 mb-4 md:mb-0">
          <img src="/img/logo/logo.png" alt="OpenPol Logo" className="h-24 w-auto object-contain drop-shadow-2xl brightness-150" />
          <span className="text-lg font-semibold text-white">OpenPol</span>
        </div>
        <div className="text-center md:text-right">
          <p>&copy; {new Date().getFullYear()} OpenPol. Wszelkie prawa zastrzeżone.</p>
          <p className="text-sm mt-2">Zabezpieczamy przyszłość polskiego biznesu.</p>
        </div>
      </div>
    </div>
  </footer>
);
