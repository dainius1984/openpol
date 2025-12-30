import React from 'react';
import { useLocation } from 'react-router-dom';
import { initGA, logPageView, trackScrollDepth } from '../utils/analytics';

// Importowanie komponentów poszczególnych sekcji
import { Header } from '../components/Header';
import { HeroSection } from '../components/HeroSection';
import { ServicesSection } from '../components/ServicesSection';
import { AboutSection } from '../components/AboutSection';
import { TestimonialsSection } from '../components/TestimonialsSection';
import { ContactSection } from '../components/ContactSection';
import { Footer } from '../components/Footer';
import { ConsultationModal } from '../components/ConsultationModal';

// Główny komponent strony głównej
export default function HomePage() {
  const [modalOpen, setModalOpen] = React.useState(false);
  const location = useLocation();
  
  // Initialize Google Analytics on component mount
  React.useEffect(() => {
    initGA();
    logPageView();
  }, []);

  // Handle hash navigation - scroll to section if hash is present
  React.useEffect(() => {
    const hash = location.hash;
    if (hash) {
      // Wait for page to render, then scroll to section
      setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          const headerOffset = 100;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }, 100);
    }
  }, [location.hash]);

  // Track scroll depth
  React.useEffect(() => {
    const handleScroll = () => {
      trackScrollDepth();
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <div className="bg-gray-900 font-sans">
      <Header setModalOpen={setModalOpen} />
      <main>
        <HeroSection setModalOpen={setModalOpen} />
        <ServicesSection setModalOpen={setModalOpen} />
        <AboutSection setModalOpen={setModalOpen} />
        <TestimonialsSection setModalOpen={setModalOpen} />
        <ContactSection />
      </main>
      <Footer />
      <ConsultationModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}

