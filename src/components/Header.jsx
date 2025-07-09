import React, { useState } from 'react';
import { ConsultationModal } from './ConsultationModal';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const navLinks = [
    { href: '#services', label: 'Rozwiązania' },
    { href: '#about', label: 'Dlaczego my?' },
    { href: '#testimonials', label: 'Opinie' },
    { href: '#contact', label: 'Kontakt' },
  ];

  return (
    <header className="bg-gradient-to-b from-gray-900 via-gray-900/90 to-gray-800/80 shadow-lg border-b border-cyan-500/30 fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-3 py-1 md:px-6 md:py-2 flex justify-between items-center">
        <a href="/" aria-label="OpenPol homepage" className="flex items-center space-x-3 group transition-all duration-200">
          <img
            src="/img/logo/logo.png"
            alt="OpenPol Logo"
            className="h-24 w-auto object-contain group-hover:scale-110 transition-transform duration-200 drop-shadow-2xl brightness-150"
          />
          <span className="text-2xl font-extrabold text-cyan-400 select-none tracking-wide">
            OpenPol
          </span>
        </a>
        <nav className="hidden md:flex space-x-10 items-center">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="relative text-white font-semibold tracking-wide hover:text-cyan-400 transition-colors duration-200 after:content-[''] after:block after:h-0.5 after:bg-cyan-400 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-200 after:origin-left"
              style={{ paddingBottom: '2px' }}
            >
              {link.label}
            </a>
          ))}
          <button
            onClick={() => setModalOpen(true)}
            className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 px-6 rounded-lg shadow-md transition-transform duration-200 ease-in-out transform hover:scale-105 border-b-4 border-cyan-700"
          >
            Bezpłatna Konsultacja
          </button>
        </nav>
        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white focus:outline-none"
          >
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
              ></path>
            </svg>
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden bg-gray-900/95 border-t border-cyan-500/30 shadow-lg animate-fade-in-down">
          <nav className="flex flex-col items-center space-y-4 px-6 pt-4 pb-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="block text-white font-semibold hover:text-cyan-400 transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <button
              onClick={() => setModalOpen(true)}
              className="w-full text-center bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 px-4 rounded-lg shadow-md transition-transform duration-200 ease-in-out transform hover:scale-105 mt-2 border-b-4 border-cyan-700"
            >
              Bezpłatna Konsultacja
            </button>
          </nav>
        </div>
      )}
      <ConsultationModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </header>
  );
};
