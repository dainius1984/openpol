import React, { useState } from 'react';
import { ContactForm } from './ContactForm';
import { ConsultationModal } from './ConsultationModal';

export const ContactSection = () => {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <section id="contact" className="py-20 bg-gray-900 text-white scroll-mt-28">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-cyan-400 mb-2">Kontakt</h2>
          <p className="text-gray-300">Masz pytania? Skontaktuj się z nami!</p>
          <div className="inline-block w-24 h-1 bg-cyan-500 rounded mt-4"></div>
          <button
            onClick={() => setModalOpen(true)}
            className="mt-8 bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 px-8 rounded-xl text-lg shadow-lg transition-transform duration-300 ease-in-out transform hover:scale-105"
          >
            Umów Bezpłatną Konsultację
          </button>
        </div>
        <div className="flex flex-col md:flex-row md:space-x-12 items-start justify-center">
          <div className="mb-10 md:mb-0 md:w-1/2 w-full">
            <ContactForm />
          </div>
          <div className="w-full md:w-1/2 flex flex-col items-center">
            <div className="bg-gray-800 rounded-xl p-8 shadow-lg w-full mb-6">
              <h3 className="text-xl font-semibold mb-4">Dane kontaktowe</h3>
              <p className="mb-2"><span className="font-bold">Imię i nazwisko:</span> Marcin Chmielnicki</p>
              <p className="mb-2"><span className="font-bold">E-mail:</span> <a href="mailto:kontakt@openpol.pl" className="text-cyan-400 hover:underline">kontakt@openpol.pl</a></p>
              <p className="mb-2"><span className="font-bold">Telefon:</span> <a href="tel:532690876" className="text-cyan-400 hover:underline">532 690 876</a></p>
              <p className="mb-2"><span className="font-bold">Lokalizacja:</span> Wrocław, Wilkszyn, Leśna</p>
            </div>
            <div className="w-full h-80 rounded-xl overflow-hidden shadow-lg">
              <iframe
                title="OpenPol Location"
                src="https://www.google.com/maps?q=Wilkszyn+Le%C5%9Bna,+Wroc%C5%82aw&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
        <ConsultationModal open={modalOpen} onClose={() => setModalOpen(false)} />
      </div>
    </section>
  );
};
