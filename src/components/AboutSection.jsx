import React from 'react';
import { CheckCircle } from './Icons';

export const AboutSection = () => (
  <section id="about" className="py-20 bg-gray-900 text-white">
    <div className="container mx-auto px-6 flex flex-col md:flex-row items-center gap-12">
      <div className="md:w-1/2">
        <div className="relative">
          <div className="absolute -inset-2 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg blur opacity-50"></div>
          <img src="https://placehold.co/600x400/0A0A0A/FFFFFF?text=Zespół+AI+POL" alt="Zespół ekspertów OpenPol przy pracy" className="rounded-lg shadow-2xl relative z-10 w-full" />
        </div>
      </div>
      <div className="md:w-1/2">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Dlaczego OpenPol?</h2>
        <p className="text-gray-300 mb-6">Jesteśmy mostem łączącym tradycyjny, polski biznes z technologią jutra. Nie sprzedajemy modnych haseł, lecz budujemy trwałą wartość.</p>
        <ul className="space-y-4">
          <li className="flex items-start">
            <CheckCircle className="w-6 h-6 text-cyan-400 mr-3 mt-1 flex-shrink-0" />
            <div>
              <h4 className="font-bold">Rozumiemy Twój Biznes</h4>
              <p className="text-gray-400">Mówimy Twoim językiem. Skupiamy się na Twoich celach biznesowych, a nie na skomplikowanej technologii.</p>
            </div>
          </li>
          <li className="flex items-start">
            <CheckCircle className="w-6 h-6 text-cyan-400 mr-3 mt-1 flex-shrink-0" />
            <div>
              <h4 className="font-bold">Praktyczne Doświadczenie</h4>
              <p className="text-gray-400">Dostarczamy sprawdzone rozwiązania, które przynoszą mierzalny zwrot z inwestycji (ROI).</p>
            </div>
          </li>
          <li className="flex items-start">
            <CheckCircle className="w-6 h-6 text-cyan-400 mr-3 mt-1 flex-shrink-0" />
            <div>
              <h4 className="font-bold">Partnerstwo i Wsparcie</h4>
              <p className="text-gray-400">Jesteśmy z Tobą na każdym kroku – od pierwszej rozmowy, przez wdrożenie, aż po dalszy rozwój.</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </section>
);
