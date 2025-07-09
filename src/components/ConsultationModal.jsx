import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from '@emailjs/browser';

const EMAILJS_PUBLIC_KEY = "0f8Jce-Gsw4GbjCQ_";
const EMAILJS_SERVICE_ID = "service_m4uai4d";
const EMAILJS_TEMPLATE_ID = "template_r7rcz39";

emailjs.init(EMAILJS_PUBLIC_KEY);

export const ConsultationModal = ({ open, onClose }) => {
  const videoRef = useRef(null);
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
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
    if (!form.name || !form.email || !form.subject || !form.message) {
      setError('Proszę uzupełnić wymagane pola.');
      return;
    }
    setSubmitting(true);
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          title: form.subject,
          name: form.name,
          time: new Date().toLocaleString(),
          message: form.message,
          email: form.email
        }
      );
      setSubmitted(true);
      setForm({ name: '', email: '', subject: '', message: '' });
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
        className="fixed inset-0 z-50 flex items-center justify-center"
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
            className="w-full h-full object-cover blur-md brightness-75"
          >
            <source src="/img/video/1.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gray-900/70"></div>
        </div>
        {/* Modal content */}
        <motion.div
          className="relative z-10 w-full max-w-lg mx-auto p-6 md:p-10 bg-gray-800 bg-opacity-95 rounded-2xl shadow-2xl"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-cyan-400 text-2xl font-bold focus:outline-none"
            aria-label="Zamknij"
            type="button"
          >
            &times;
          </button>
          <h2 className="text-2xl font-bold text-cyan-400 mb-4 text-center">Umów Bezpłatną Konsultację</h2>
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
            <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
              {error && <div className="bg-red-100 text-red-700 p-2 rounded">{error}</div>}
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1">Imię i nazwisko *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
                  placeholder="Twoje imię i nazwisko"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">E-mail *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
                  placeholder="Twój e-mail"
                  required
                />
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium mb-1">Temat *</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
                  placeholder="Temat konsultacji"
                  required
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-1">Wiadomość *</label>
                <textarea
                  id="message"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 min-h-[100px]"
                  placeholder="Napisz swoją wiadomość..."
                  required
                />
              </div>
              <button
                type="submit"
                disabled={submitting}
                className={`bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 px-6 rounded-lg shadow-md transition-transform duration-200 ease-in-out transform hover:scale-105 mt-2 ${submitting ? 'opacity-70 cursor-wait' : ''}`}
              >
                {submitting ? "Wysyłanie..." : "Wyślij zgłoszenie"}
              </button>
            </form>
          )}
        </motion.div>
        {/* Overlay for closing modal */}
        <div
          className="fixed inset-0 z-0 cursor-pointer"
          onClick={onClose}
          aria-label="Zamknij modal"
        ></div>
      </motion.div>
    </AnimatePresence>
  );
}; 