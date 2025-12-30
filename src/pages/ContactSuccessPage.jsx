import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { logPageView, logButtonClick } from '../utils/analytics';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

const ContactSuccessPage = () => {
  // Track page view for Google Analytics
  useEffect(() => {
    logPageView();
  }, []);

  return (
    <div className="bg-gray-900 font-sans min-h-screen flex flex-col">
      <Header setModalOpen={() => {}} />
      <main className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="max-w-2xl w-full text-center">
          {/* Success Icon */}
          <div className="mb-8 flex justify-center">
            <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center shadow-2xl">
              <svg
                className="w-12 h-12 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </div>

          {/* Success Message */}
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6">
            Dziękujemy za kontakt! 🎉
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-4">
            Twoja wiadomość została wysłana pomyślnie.
          </p>
          <p className="text-lg text-gray-400 mb-8">
            Nasz zespół skontaktuje się z Tobą najszybciej jak to możliwe. Zwykle odpowiadamy w ciągu 24 godzin.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/"
              onClick={() => logButtonClick('Contact Success - Back to Home')}
              className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 px-8 rounded-full shadow-xl transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-cyan-400"
            >
              Wróć do strony głównej
            </Link>
            <Link
              to="/chat"
              onClick={() => logButtonClick('Contact Success - Try Chat')}
              className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-8 rounded-full shadow-xl transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-gray-500"
            >
              Wypróbuj OpenPol Chat
            </Link>
          </div>

          {/* Additional Info */}
          <div className="mt-12 p-6 bg-gray-800 rounded-xl border border-gray-700">
            <h2 className="text-xl font-semibold text-white mb-3">
              Co dalej?
            </h2>
            <ul className="text-left text-gray-400 space-y-2 max-w-md mx-auto">
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">✓</span>
                <span>Sprawdź swoją skrzynkę e-mail - potwierdzenie wysłaliśmy na adres podany w formularzu</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">✓</span>
                <span>Nasz zespół przeanalizuje Twoje zapytanie i przygotuje spersonalizowaną ofertę</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">✓</span>
                <span>Skontaktujemy się z Tobą w ciągu 24 godzin</span>
              </li>
            </ul>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ContactSuccessPage;

