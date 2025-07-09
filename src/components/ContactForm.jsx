import React, { useState } from 'react';

export const ContactForm = () => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simple validation
    if (!form.name || !form.email || !form.message) {
      setError('Proszę uzupełnić wymagane pola.');
      return;
    }
    setSubmitted(true);
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
        className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 px-6 rounded-lg shadow-md transition-transform duration-200 ease-in-out transform hover:scale-105 mt-2"
      >
        Wyślij wiadomość
      </button>
    </form>
  );
}; 