import React from 'react';

export const ContactSection = () => (
  <section id="contact" className="py-20 bg-gray-900">
    <div className="container mx-auto px-6 text-center">
      <h2 className="text-3xl md:text-4xl font-bold text-white">Zrób pierwszy krok w stronę AI</h2>
      <p className="text-gray-300 mt-4 mb-8 max-w-2xl mx-auto">
        Zrób pierwszy, bezpieczny krok w świat sztucznej inteligencji. Nasza wstępna konsultacja jest w 100% niezobowiązująca i ma na celu pokazanie Ci realnych możliwości, bez technicznego żargonu.
      </p>
      <a href="mailto:kontakt@aipol.pl" className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 px-8 rounded-lg text-lg transition-transform duration-300 ease-in-out transform hover:scale-105 inline-block">
        Umów Bezpłatną Konsultację
      </a>
    </div>
  </section>
);
