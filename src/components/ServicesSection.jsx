import React from 'react';
import { BrainCircuit, Bot, BarChart, Briefcase } from './Icons';

export const ServicesSection = () => {
  const services = [
    { icon: <BrainCircuit className="w-12 h-12 text-cyan-400 mb-4" />, title: 'Strategia i Doradztwo AI', description: 'Tłumaczymy skomplikowany świat AI na zrozumiały język biznesu. Tworzymy jasną mapę drogową wdrożenia, skoncentrowaną na Twoich celach.' },
    { icon: <Bot className="w-12 h-12 text-cyan-400 mb-4" />, title: 'Praktyczne Wdrożenia AI', description: 'Implementujemy konkretne rozwiązania, które rozwiązują realne problemy – od automatyzacji procesów po inteligentne analizy i obsługę klienta.' },
    { icon: <BarChart className="w-12 h-12 text-cyan-400 mb-4" />, title: 'Analiza Danych i Wzrost', description: 'Pomagamy wykorzystać dane, które już posiadasz, aby podejmować lepsze decyzje, prognozować trendy i zwiększać rentowność.' },
    { icon: <Briefcase className="w-12 h-12 text-cyan-400 mb-4" />, title: 'Szkolenia dla Zespołów', description: 'Przygotowujemy Twoich pracowników na zmiany. Prowadzimy warsztaty, które budują zrozumienie i kompetencje do pracy z nowymi narzędziami.' },
  ];

  return (
    <section id="services" className="py-20 bg-gray-800 mt-16 md:mt-28">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white">Rozwiązania dla Twojej Firmy</h2>
          <p className="text-gray-400 mt-2">Konkretne wsparcie, które przynosi mierzalne rezultaty.</p>
          <div className="inline-block w-24 h-1 bg-cyan-500 rounded mt-4"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-gray-900 p-8 rounded-xl shadow-lg hover:shadow-cyan-500/20 transform hover:-translate-y-2 transition-all duration-300 flex flex-col items-center text-center">
              {service.icon}
              <h3 className="text-xl font-bold text-white mb-2">{service.title}</h3>
              <p className="text-gray-400">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
