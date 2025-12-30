import React, { useState, useRef, useEffect } from 'react';
import { ContactForm } from '../components/ContactForm';
import { logChatInteraction, logPageView } from '../utils/analytics';
import { sendChatMessage } from '../utils/chatApi';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [interactionCount, setInteractionCount] = useState(0);
  const [showContactForm, setShowContactForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const MAX_INTERACTIONS = 2;

  // Track page view and scroll to top
  useEffect(() => {
    logPageView();
    // Scroll to top when page loads
    window.scrollTo(0, 0);
  }, []);

  // Initial greeting
  useEffect(() => {
    const greeting = {
      id: Date.now(),
      text: 'Cześć! 👋 Jestem asystentem OpenPol. Jak mogę Ci pomóc w zakresie odpowiedzialnego wdrażania AI w Twojej firmie?',
      sender: 'bot',
      timestamp: new Date()
    };
    setMessages([greeting]);
    logChatInteraction('Chat Opened', 'OpenPol Chat');
  }, []);

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input when page loads
  useEffect(() => {
    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  }, []);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputValue.trim() || showContactForm || isLoading) return;

    const userMessage = {
      id: Date.now(),
      text: inputValue.trim(),
      sender: 'user',
      timestamp: new Date()
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInputValue('');
    setInteractionCount(prev => prev + 1);
    setIsLoading(true);
    logChatInteraction('Message Sent', 'OpenPol Chat');

    try {
      // Try to use NanoChat API
      const response = await sendChatMessage(updatedMessages);
      
      const botMessage = {
        id: Date.now() + 1,
        text: response,
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
      setIsLoading(false);
      logChatInteraction('Bot Response', 'OpenPol Chat');

      if (interactionCount + 1 >= MAX_INTERACTIONS) {
        setTimeout(() => {
          setShowContactForm(true);
          logChatInteraction('Contact Form Shown', 'OpenPol Chat');
        }, 500);
      }
    } catch (error) {
      // Fallback to mock responses if API is not available
      console.warn('NanoChat API not available, using fallback:', error.message);
      
      const botResponses = [
        'Dziękuję za pytanie! OpenPol Chat oferuje bezpieczne wdrożenie LLM-ów z pełną kontrolą i zgodnością z wymogami compliance. Jakie konkretne potrzeby ma Twoja firma?',
        'Rozumiem. Aby lepiej pomóc, proszę wypełnij formularz kontaktowy poniżej, a nasz zespół skontaktuje się z Tobą i zaproponuje najlepsze rozwiązanie dostosowane do Twoich potrzeb.'
      ];

      const botMessage = {
        id: Date.now() + 1,
        text: botResponses[Math.min(interactionCount, botResponses.length - 1)],
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
      setIsLoading(false);
      logChatInteraction('Bot Response (Fallback)', 'OpenPol Chat');

      if (interactionCount + 1 >= MAX_INTERACTIONS) {
        setTimeout(() => {
          setShowContactForm(true);
          logChatInteraction('Contact Form Shown', 'OpenPol Chat');
        }, 500);
      }
    }
  };

  return (
    <div className="bg-gray-900 font-sans min-h-screen flex flex-col">
      <Header setModalOpen={() => {}} />
      <main className="flex-1 flex flex-col pt-20 md:pt-24">
        {/* Chat Container - Full Height */}
        <div className="flex-1 flex flex-col max-w-4xl mx-auto w-full px-4 py-8">
          {/* Chat Header */}
          <div className="mb-6 text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
              OpenPol Chat
            </h1>
            <p className="text-gray-400 text-lg">
              Sztuczna inteligencja dla firm, wdrażana odpowiedzialnie
            </p>
          </div>

          {/* Messages Area */}
          {!showContactForm ? (
            <>
              <div className="flex-1 overflow-y-auto mb-4 space-y-6 bg-gray-800 rounded-2xl p-6 min-h-[400px] max-h-[calc(100vh-300px)]">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className="flex items-start space-x-3 max-w-[85%]">
                      {message.sender === 'bot' && (
                        <div className="w-8 h-8 bg-cyan-500 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-white font-bold text-sm">OP</span>
                        </div>
                      )}
                      <div
                        className={`rounded-2xl px-4 py-3 ${
                          message.sender === 'user'
                            ? 'bg-cyan-500 text-white'
                            : 'bg-gray-700 text-gray-100'
                        }`}
                      >
                        <p className="text-sm md:text-base leading-relaxed whitespace-pre-wrap">
                          {message.text}
                        </p>
                      </div>
                      {message.sender === 'user' && (
                        <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-gray-300 font-bold text-sm">U</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-cyan-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-bold text-sm">OP</span>
                      </div>
                      <div className="bg-gray-700 text-gray-100 rounded-2xl px-4 py-3">
                        <div className="flex space-x-1">
                          <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                          <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                          <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <form onSubmit={handleSendMessage} className="bg-gray-800 rounded-2xl p-4">
                <div className="flex space-x-3">
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Napisz wiadomość..."
                    className="flex-1 bg-gray-700 text-white rounded-lg px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-cyan-400"
                    disabled={interactionCount >= MAX_INTERACTIONS || isLoading}
                  />
                  <button
                    type="submit"
                    disabled={!inputValue.trim() || interactionCount >= MAX_INTERACTIONS || isLoading}
                    className="bg-cyan-500 hover:bg-cyan-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-lg px-6 py-3 transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-400 flex items-center justify-center"
                    aria-label="Wyślij wiadomość"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  </button>
                </div>
                {interactionCount >= MAX_INTERACTIONS && (
                  <p className="text-xs text-gray-400 mt-3 text-center">
                    Proszę wypełnij formularz poniżej, aby kontynuować
                  </p>
                )}
              </form>
            </>
          ) : (
            <div className="bg-gray-800 rounded-2xl p-6">
              <div className="mb-6 text-center">
                <p className="text-gray-300 text-lg mb-2">
                  Dziękuję za rozmowę! 🎉
                </p>
                <p className="text-gray-400 text-sm">
                  Aby kontynuować, proszę wypełnij formularz kontaktowy, a nasz zespół skontaktuje się z Tobą:
                </p>
              </div>
              <ContactForm redirectOnSuccess={false} />
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ChatPage;

