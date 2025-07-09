import React, { useState } from 'react';
import emailjs from '@emailjs/browser';

const EMAILJS_PUBLIC_KEY = "0f8Jce-Gsw4GbjCQ_";
const EMAILJS_SERVICE_ID = "service_m4uai4d";
const EMAILJS_TEMPLATE_ID = "template_r7rcz39";

emailjs.init(EMAILJS_PUBLIC_KEY);

export const ContactForm = () => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

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
          title: 'Konsultacje',
          name: form.name,
          time: new Date().toLocaleString(),
          message: form.message + (form.phone ? `\n\nTelefon: ${form.phone}` : ''),
          email: form.email
        }
      );
      setSubmitted(true);
      setForm({ name: '', email: '', phone: '', message: '' });
      setTimeout(() => setSubmitted(false), 3000);
    } catch (err) {
      setError('Przepraszamy, wystąpił błąd podczas wysyłania wiadomości. Spróbuj ponownie później.');
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="bg-green-100 text-green-800 p-6 rounded-xl text-center font-semibold shadow">
        Dziękujemy za kontakt! Odpowiemy najszybciej jak to możliwe.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-gray-800 rounded-xl p-8 shadow-lg flex flex-col space-y-4">
      <h3 className="text-xl font-semibold mb-2 text-cyan-400">Formularz kontaktowy</h3>
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
        <label htmlFor="phone" className="block text-sm font-medium mb-1">Telefon</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
          placeholder="Twój numer telefonu (opcjonalnie)"
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
        {submitting ? 'Wysyłanie...' : 'Wyślij wiadomość'}
      </button>
    </form>
  );
}; 