import React, { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { logButtonClick, logServiceInterest, logSectionView } from '../utils/analytics';

const OpenPolChatSection = () => {
  const sectionRef = useRef(null);
  const navigate = useNavigate();

  // Track section view and service interest
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            logSectionView('OpenPol Chat Section');
            logServiceInterest('OpenPol Chat');
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

  const handleChatClick = () => {
    logButtonClick('OpenPol Chat - Wypróbuj Chat');
    navigate('/chat');
  };

  return (
    <section ref={sectionRef} className="flex flex-col md:flex-row items-center justify-center py-16 md:py-28 bg-gray-900 rounded-3xl shadow-2xl mx-2 md:mx-16 my-12 md:my-20">
    {/* Image */}
    <div className="w-full md:w-[55%] flex justify-center items-center md:pr-12 mb-8 md:mb-0">
      <div className="w-[95vw] max-w-[600px] h-[320px] md:h-[420px] bg-gray-800 rounded-3xl flex items-center justify-center border-2 border-gray-700 overflow-hidden shadow-xl relative">
        <img
          src="/img/services/1.jpg"
          alt="OpenPol Chat - przykład działania"
          className="w-full h-full object-cover rounded-3xl"
          loading="lazy"
        />
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-gray-900/30 to-transparent pointer-events-none" />
      </div>
    </div>
    {/* Text and button */}
    <div className="w-full md:w-[45%] flex flex-col items-center justify-center px-4 md:px-0">
      <h2 className="text-4xl md:text-6xl font-extrabold text-white mb-8 text-center leading-tight drop-shadow-lg">OpenPol Chat</h2>
      <p className="text-lg md:text-xl text-gray-300 mb-10 text-center max-w-xl leading-relaxed">
        Sztuczna inteligencja dla firm, wdrażana odpowiedzialnie. Wykorzystaj LLM-y z kontrolą, przejrzystością i zgodnością z najwyższymi standardami bezpieczeństwa. Każda interakcja spełnia wymagania compliance i etyki.
      </p>
      <div className="flex justify-center w-full">
        <button
          onClick={handleChatClick}
          className="bg-cyan-500 hover:bg-cyan-600 text-white text-lg md:text-xl font-bold rounded-full px-12 py-5 shadow-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-cyan-400"
        >
          Wypróbuj OpenPol Chat →
        </button>
      </div>
    </div>
  </section>
  );
};

export default OpenPolChatSection; 