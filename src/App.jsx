import React from 'react';
import { initGA, logPageView } from './utils/analytics';

// Importowanie komponentów poszczególnych sekcji
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { ServicesSection } from './components/ServicesSection';
import { AboutSection } from './components/AboutSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ConsultationModal } from './components/ConsultationModal';

// Główny komponent aplikacji, który renderuje całą stronę
export default function App() {
  const [modalOpen, setModalOpen] = React.useState(false);
  
  // Initialize Google Analytics on component mount
  React.useEffect(() => {
    initGA();
    logPageView();
  }, []);
  
  return (
    <div className="bg-gray-900 font-sans">
      <Header setModalOpen={setModalOpen} />
      <main>
        <HeroSection setModalOpen={setModalOpen} />
        <ServicesSection />
        <AboutSection />
        <TestimonialsSection />
        <ContactSection />
      </main>
      <Footer />
      <ConsultationModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}
