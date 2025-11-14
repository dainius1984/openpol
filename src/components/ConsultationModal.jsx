import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { logModalInteraction, logFormSubmission, logButtonClick } from '../utils/analytics';

const EMAILJS_PUBLIC_KEY = "0f8Jce-Gsw4GbjCQ_";
const EMAILJS_SERVICE_ID = "service_m4uai4d";
const EMAILJS_TEMPLATE_ID = "template_r7rcz39";

emailjs.init(EMAILJS_PUBLIC_KEY);

export const ConsultationModal = ({ open, onClose }) => {
  const videoRef = useRef(null);
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.5;
    }
  }, [open]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
      // Track modal open
      logModalInteraction('Open');
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  if (!open) return null;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setError('Proszę uzupełnić wymagane pola.');
      return;
    }
    setSubmitting(true);
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          title: 'Konsultacje', // Hardcoded subject
          name: form.name,
          time: new Date().toLocaleString(),
          message: form.message,
          email: form.email
        }
      );
      // Track successful form submission
      logFormSubmission('Consultation Modal Form');
      setSubmitted(true);
      setForm({ name: '', email: '', message: '' });
      setTimeout(() => {
        setSubmitted(false);
        onClose();
      }, 3000);
    } catch (err) {
      setError('Przepraszamy, wystąpił błąd podczas wysyłania wiadomości. Spróbuj ponownie później.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[9999] flex items-center justify-center font-[Poppins,sans-serif]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Video background */}
        <div className="absolute inset-0">
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            className="w-full h-full object-cover blur-md brightness-75"
          >
            <source src="/img/video/1.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gray-900/70 backdrop-blur-[2px]"></div>
        </div>
        {/* Modal content */}
        <motion.div
          className="relative z-[9999] w-full max-w-lg mx-auto p-4 sm:p-8 md:p-10 bg-gray-800/80 backdrop-blur-xl rounded-3xl shadow-2xl"
          initial={{ scale: 0.85, opacity: 0, y: 40 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.85, opacity: 0, y: 40 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >
          <button
            onClick={() => {
              logModalInteraction('Close');
              onClose();
            }}
            className="absolute top-2 md:top-4 right-2 md:right-4 text-gray-400 hover:text-cyan-400 text-xl md:text-2xl font-bold focus:outline-none"
            aria-label="Zamknij"
            type="button"
          >
            &times;
          </button>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-cyan-400 mb-8 text-center tracking-tight drop-shadow-xl">
            Umów Bezpłatną Konsultację
          </h2>
          {submitted ? (
            <motion.div
              className="bg-green-100 text-green-800 p-6 rounded-xl text-center font-semibold shadow"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              Dziękujemy za zgłoszenie! Skontaktujemy się z Tobą najszybciej jak to możliwe.
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col space-y-6">
              {error && <div className="bg-red-100 text-red-700 p-2 rounded text-sm text-center">{error}</div>}
              <div>
                <label htmlFor="name" className="block text-xs font-medium mb-2 text-gray-300">Imię i nazwisko *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-gray-700/80 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 placeholder-gray-400 text-base transition-all"
                  placeholder="Twoje imię i nazwisko"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-xs font-medium mb-2 text-gray-300">E-mail *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-gray-700/80 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 placeholder-gray-400 text-base transition-all"
                  placeholder="Twój e-mail"
                  required
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-xs font-medium mb-2 text-gray-300">Wiadomość *</label>
                <textarea
                  id="message"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-gray-700/80 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 placeholder-gray-400 text-base min-h-[100px] transition-all"
                  placeholder="Napisz swoją wiadomość..."
                  required
                />
              </div>
              <button
                type="submit"
                disabled={submitting}
                onClick={() => logButtonClick('Consultation Modal Submit')}
                className={`w-full bg-gradient-to-r from-cyan-400 to-cyan-600 hover:from-cyan-500 hover:to-cyan-700 text-white font-bold py-4 px-6 rounded-xl shadow-lg transition-all duration-200 ease-in-out transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-cyan-400 text-lg ${submitting ? 'opacity-70 cursor-wait' : ''}`}
              >
                {submitting ? "Wysyłanie..." : "Wyślij zgłoszenie"}
              </button>
            </form>
          )}
        </motion.div>
        {/* Overlay for closing modal */}
        <motion.div
          className="fixed inset-0 z-0 cursor-pointer"
          onClick={() => {
            logModalInteraction('Close via Overlay');
            onClose();
          }}
          aria-label="Zamknij modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
    </AnimatePresence>
  );
}; 