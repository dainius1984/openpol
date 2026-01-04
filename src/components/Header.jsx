import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { logButtonClick, logNavigationClick, logMobileMenuInteraction, logLogoClick } from '../utils/analytics';

export const Header = ({ setModalOpen }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hideOnMobile, setHideOnMobile] = useState(false);
  const lastScrollY = useRef(0);
  const location = useLocation();
  const navigate = useNavigate();

  const navLinks = [
    { href: '#services', label: 'Rozwiązania' },
    { href: '#about', label: 'Dlaczego my?' },
    { href: '#testimonials', label: 'Opinie' },
    { href: '#contact', label: 'Kontakt' },
  ];

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

  // Hide header on scroll down, show on scroll up (all screen sizes)
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY.current && currentScrollY > 40) {
        setHideOnMobile(true); // scrolling down
      } else {
        setHideOnMobile(false); // scrolling up
      }
      lastScrollY.current = currentScrollY;
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Hide header when modal is open
  const headerHidden = hideOnMobile;

  return (
    <header
      className={
        `bg-gradient-to-b from-gray-900 via-gray-900/95 to-gray-800/95 shadow-xl border-b-2 border-cyan-400/60 fixed top-0 left-0 right-0 z-50 transition-all duration-300
        ${headerHidden ? 'opacity-0 pointer-events-none translate-y-[-100%]' : 'opacity-100 pointer-events-auto translate-y-0'}
        backdrop-blur-md md:backdrop-blur-none`
      }
      style={{ minHeight: '64px' }}
    >
      <div className="container mx-auto px-3 py-2 md:px-8 md:py-3 flex justify-between items-center min-h-[64px]">
        <Link 
          to="/" 
          aria-label="OpenPol homepage" 
          className="flex items-center space-x-3 group transition-all duration-200 hover:scale-105"
          onClick={() => logLogoClick()}
        >
          <img
            src="/img/logo/logo.png"
            alt="OpenPol Logo"
            className="h-14 md:h-20 w-auto object-contain group-hover:scale-110 transition-transform duration-200 drop-shadow-2xl brightness-150"
            loading="eager"
            width="80"
            height="80"
          />
          <span className="text-2xl md:text-3xl font-extrabold text-cyan-400 select-none tracking-wide drop-shadow-lg">
            OpenPol
          </span>
        </Link>
        <nav className="hidden md:flex space-x-12 items-center">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href, link.label)}
              className="relative text-white font-semibold tracking-wide text-lg md:text-xl hover:text-cyan-400 transition-colors duration-200 after:content-[''] after:block after:h-0.5 after:bg-cyan-400 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-200 after:origin-left px-2 py-1 rounded-lg hover:bg-cyan-400/10 cursor-pointer"
              style={{ paddingBottom: '2px' }}
            >
              {link.label}
            </a>
          ))}
        </nav>
        <div className="md:hidden">
          <button
            onClick={() => {
              setIsMenuOpen(!isMenuOpen);
              logMobileMenuInteraction(isMenuOpen ? 'Close' : 'Open');
            }}
            className="text-white focus:outline-none p-2 rounded-lg bg-gray-800/70 hover:bg-cyan-500/30 transition-colors duration-200 shadow"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                className="block text-white font-semibold hover:text-cyan-400 transition-colors duration-200 cursor-pointer"
                onClick={(e) => {
                  setIsMenuOpen(false);
                  handleNavClick(e, link.href, link.label);
                  logMobileMenuInteraction('Link Click');
                }}
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};
