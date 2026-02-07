import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { logNavigationClick } from '../utils/analytics';

export const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Handle navigation - if not on home page, navigate to home with hash
  const handleNavClick = (e, href, label) => {
    e.preventDefault();
    logNavigationClick(label, href);
    
    if (location.pathname !== '/') {
      // Navigate to home page with hash - HomePage will handle scrolling
      navigate(`/${href}`);
    } else {
      // On home page, just scroll to section
      const element = document.querySelector(href);
      if (element) {
        const headerOffset = 100;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }
  };

  return (
  <footer className="bg-gray-900 border-t border-gray-700 text-gray-400">
    <div className="container mx-auto px-6 py-12">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        {/* Logo and Description */}
        <div className="md:col-span-1">
          <div className="flex items-center space-x-3 mb-4">
            <img 
              src="/img/logo/logo.png" 
              alt="OpenPol Logo" 
              className="h-16 w-auto object-contain drop-shadow-2xl brightness-150" 
              loading="lazy" 
              width="64" 
              height="64" 
            />
            <span className="text-xl font-bold text-white">OpenPol</span>
          </div>
          <p className="text-sm text-gray-400 leading-relaxed">
            Sztuczna inteligencja dla firm, wdrażana odpowiedzialnie. Zabezpieczamy przyszłość polskiego biznesu.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white font-semibold mb-4 text-lg">Szybkie linki</h3>
          <ul className="space-y-2">
            <li>
              <a 
              href="#services" 
              onClick={(e) => handleNavClick(e, '#services', 'Footer - Rozwiązania')}
              className="text-gray-400 hover:text-cyan-400 transition-colors duration-200 text-sm cursor-pointer"
            >
              Rozwiązania
            </a>
          </li>
          <li>
            <a 
              href="#about" 
              onClick={(e) => handleNavClick(e, '#about', 'Footer - Dlaczego my?')}
              className="text-gray-400 hover:text-cyan-400 transition-colors duration-200 text-sm cursor-pointer"
            >
              Dlaczego my?
            </a>
          </li>
          <li>
            <a 
              href="#testimonials" 
              onClick={(e) => handleNavClick(e, '#testimonials', 'Footer - Opinie')}
              className="text-gray-400 hover:text-cyan-400 transition-colors duration-200 text-sm cursor-pointer"
            >
              Opinie
            </a>
          </li>
          <li>
            <a 
              href="#contact" 
              onClick={(e) => handleNavClick(e, '#contact', 'Footer - Kontakt')}
              className="text-gray-400 hover:text-cyan-400 transition-colors duration-200 text-sm cursor-pointer"
            >
              Kontakt
            </a>
          </li>
          <li>
            <Link 
              to="/chat" 
              onClick={() => logNavigationClick('Footer - OpenPol Chat', '/chat')}
              className="text-gray-400 hover:text-cyan-400 transition-colors duration-200 text-sm"
            >
              OpenPol Chat
            </Link>
          </li>
        </ul>
      </div>

      {/* Services */}
      <div>
        <h3 className="text-white font-semibold mb-4 text-lg">Usługi</h3>
        <ul className="space-y-2">
          <li>
            <a 
              href="#services" 
              onClick={(e) => handleNavClick(e, '#services', 'Footer - OpenPol Chat Service')}
              className="text-gray-400 hover:text-cyan-400 transition-colors duration-200 text-sm cursor-pointer"
            >
              OpenPol Chat
            </a>
          </li>
          <li>
            <a 
              href="#services" 
              onClick={(e) => handleNavClick(e, '#services', 'Footer - Analiza Danych')}
              className="text-gray-400 hover:text-cyan-400 transition-colors duration-200 text-sm cursor-pointer"
            >
              Analiza Danych i Wzrost
            </a>
          </li>
          <li>
            <a 
              href="#services" 
              onClick={(e) => handleNavClick(e, '#services', 'Footer - Wdrożenia AI')}
              className="text-gray-400 hover:text-cyan-400 transition-colors duration-200 text-sm cursor-pointer"
            >
              Praktyczne Wdrożenia AI
            </a>
          </li>
          <li>
            <a 
              href="#services" 
              onClick={(e) => handleNavClick(e, '#services', 'Footer - Szkolenia')}
              className="text-gray-400 hover:text-cyan-400 transition-colors duration-200 text-sm cursor-pointer"
            >
              Szkolenia dla Zespołów
            </a>
          </li>
        </ul>
      </div>

      {/* Contact Info */}
      <div>
        <h3 className="text-white font-semibold mb-4 text-lg">Kontakt</h3>
        <ul className="space-y-2 text-sm">
          <li className="text-gray-400">
            <span className="text-cyan-400">Email:</span> kontakt@openpol.pl
          </li>
          <li className="text-gray-400">
            <span className="text-cyan-400">Lokalizacja:</span> Wrocław, Polska
          </li>
        </ul>
      </div>
      </div>
    </div>

    {/* Bottom Bar */}
    <div className="border-t border-gray-800 pt-6">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-sm text-gray-500 text-center md:text-left">
          &copy; {new Date().getFullYear()} OpenPol. Wszelkie prawa zastrzeżone. |{' '}
          <a 
            href="https://www.stalowewitryny.pl" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-cyan-400 transition-colors duration-200"
          >
            Projekt i realizacja: stalowewitryny.pl
          </a>
        </p>
        <div className="flex flex-wrap justify-center md:justify-end gap-4 text-sm">
          <a 
            href="#privacy" 
            onClick={(e) => handleNavClick(e, '#privacy', 'Footer - Polityka Prywatności')}
            className="text-gray-500 hover:text-cyan-400 transition-colors duration-200 cursor-pointer"
          >
            Polityka Prywatności
          </a>
          <span className="text-gray-600">|</span>
          <a 
            href="#terms" 
            onClick={(e) => handleNavClick(e, '#terms', 'Footer - Regulamin')}
            className="text-gray-500 hover:text-cyan-400 transition-colors duration-200 cursor-pointer"
          >
            Regulamin
          </a>
        </div>
      </div>
    </div>
  </footer>
  );
};
