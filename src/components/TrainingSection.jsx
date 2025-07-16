import React from 'react';

const TrainingSection = () => (
  <section className="flex flex-col md:flex-row items-center justify-center py-16 md:py-28 bg-gray-900 rounded-3xl shadow-2xl mx-2 md:mx-16 my-12 md:my-20">
    {/* Text and button */}
    <div className="w-full md:w-[45%] flex flex-col items-center justify-center px-4 md:px-0 order-2 md:order-1">
      <h2 className="text-4xl md:text-6xl font-extrabold text-white mb-8 text-center leading-tight drop-shadow-lg">Szkolenia dla Zespołów</h2>
      <p className="text-lg md:text-xl text-gray-300 mb-10 text-center max-w-xl leading-relaxed">
        Przygotowujemy Twoich pracowników na zmiany. Prowadzimy warsztaty, które budują zrozumienie i kompetencje do pracy z nowymi narzędziami.
      </p>
      <div className="flex justify-center w-full">
        <button className="bg-white text-gray-900 text-lg md:text-xl font-bold rounded-full px-12 py-5 shadow-xl hover:bg-cyan-600 hover:text-white transition-all duration-200 mb-2 focus:outline-none focus:ring-4 focus:ring-cyan-400">
          JUŻ WKRÓTCE - ZAREJESTRUJ SIĘ
        </button>
      </div>
    </div>
    {/* Image */}
    <div className="w-full md:w-[55%] flex justify-center items-center md:pl-12 mb-8 md:mb-0 order-1 md:order-2">
      <div className="w-[95vw] max-w-[600px] h-[320px] md:h-[420px] bg-gray-800 rounded-3xl flex items-center justify-center border-2 border-gray-700 overflow-hidden shadow-xl relative">
        <img
          src="/img/services/4.jpg"
          alt="Szkolenia dla Zespołów - przykład działania"
          className="w-full h-full object-cover rounded-3xl"
        />
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-gray-900/30 to-transparent pointer-events-none" />
      </div>
    </div>
  </section>
);

export default TrainingSection; 