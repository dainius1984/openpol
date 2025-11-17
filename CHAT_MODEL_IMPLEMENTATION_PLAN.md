# Plan Implementacji Modelu Chat dla OpenPol Chat

## Obecny Stan
- ✅ Chat interface zaimplementowany w sekcji OpenPol Chat
- ✅ 2 interakcje przed pokazaniem formularza kontaktowego
- ⚠️ Obecnie używa mockowych odpowiedzi (TODO w linii 73)

## Opcje Implementacji Modelu

### Opcja 1: OpenAI API (GPT-4/GPT-3.5)
**Zalety:**
- Szybka implementacja
- Wysoka jakość odpowiedzi
- Gotowe API
- Możliwość fine-tuningu

**Wady:**
- Koszty per request
- Dane wysyłane do zewnętrznego API
- Wymaga klucza API

**Implementacja:**
```javascript
// Wymaga: npm install openai
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true // tylko dla frontend, lepiej backend
});

const response = await openai.chat.completions.create({
  model: "gpt-4",
  messages: [
    { role: "system", content: "Jesteś asystentem OpenPol, pomagasz firmom w odpowiedzialnym wdrażaniu AI..." },
    ...messages.map(m => ({ role: m.sender === 'user' ? 'user' : 'assistant', content: m.text }))
  ],
});
```

### Opcja 2: Backend API + Model (Rekomendowane)
**Zalety:**
- Bezpieczeństwo (klucze API na backendzie)
- Możliwość użycia różnych modeli
- Kontrola nad kosztami
- Możliwość logowania i analizy

**Architektura:**
```
Frontend (React) → Backend API (Node.js/Python) → Model API (OpenAI/Anthropic/Local)
```

**Backend Endpoint:**
```
POST /api/chat
Body: { messages: [...], conversationId: "..." }
Response: { message: "...", conversationId: "..." }
```

### Opcja 3: Hugging Face Inference API
**Zalety:**
- Darmowe modele dostępne
- Możliwość użycia polskich modeli (np. GPT-2 Polish)
- Łatwa integracja

**Wady:**
- Ograniczenia rate limitów
- Mniejsza jakość niż GPT-4

**Implementacja:**
```javascript
const response = await fetch(
  "https://api-inference.huggingface.co/models/gpt2",
  {
    headers: { Authorization: `Bearer ${HF_TOKEN}` },
    method: "POST",
    body: JSON.stringify({ inputs: userMessage }),
  }
);
```

### Opcja 4: Lokalny Model (Ollama/LM Studio)
**Zalety:**
- Pełna kontrola
- Brak kosztów API
- Dane nie opuszczają infrastruktury

**Wady:**
- Wymaga serwera z GPU
- Większa złożoność deploymentu
- Może być wolniejsze

**Implementacja:**
```javascript
const response = await fetch('http://localhost:11434/api/generate', {
  method: 'POST',
  body: JSON.stringify({
    model: 'llama2',
    prompt: userMessage,
    stream: false
  })
});
```

## Rekomendacja: Opcja 2 (Backend API)

### Struktura Projektu
```
openpol/
├── frontend/ (obecny React)
└── backend/
    ├── server.js (Express/FastAPI)
    ├── routes/
    │   └── chat.js
    ├── services/
    │   └── chatService.js
    └── .env (API keys)
```

### Backend Endpoint (Node.js + Express)
```javascript
// backend/routes/chat.js
const express = require('express');
const router = express.Router();
const { generateResponse } = require('../services/chatService');

router.post('/chat', async (req, res) => {
  try {
    const { messages } = req.body;
    const response = await generateResponse(messages);
    res.json({ message: response });
  } catch (error) {
    res.status(500).json({ error: 'Chat service error' });
  }
});
```

### Frontend Integration
```javascript
// src/components/OpenPolChatSection.jsx
const handleSendMessage = async (e) => {
  // ... existing code ...
  
  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        messages: [...messages, userMessage].map(m => ({
          role: m.sender === 'user' ? 'user' : 'assistant',
          content: m.text
        }))
      })
    });
    
    const data = await response.json();
    const botMessage = {
      id: Date.now() + 1,
      text: data.message,
      sender: 'bot',
      timestamp: new Date()
    };
    setMessages(prev => [...prev, botMessage]);
  } catch (error) {
    // Error handling
  }
};
```

## System Prompt dla Modelu
```
Jesteś asystentem OpenPol, ekspertem w zakresie odpowiedzialnego wdrażania 
sztucznej inteligencji w firmach. Twoja rola to:

1. Pomaganie firmom w zrozumieniu korzyści z AI
2. Wyjaśnianie wymogów compliance i bezpieczeństwa
3. Przedstawianie rozwiązań OpenPol Chat
4. Po 2 interakcjach zachęcanie do wypełnienia formularza kontaktowego

Odpowiadaj profesjonalnie, zwięźle i po polsku. Skup się na:
- Bezpieczeństwie danych
- Compliance (RODO, GDPR)
- Kontroli i przejrzystości
- Etycznym wykorzystaniu AI
```

## Następne Kroki

1. **Decyzja o modelu** - Wybierz jedną z opcji powyżej
2. **Backend setup** - Jeśli Opcja 2, stworzyć backend API
3. **API Integration** - Zintegrować z frontendem
4. **Environment Variables** - Dodać klucze API do .env
5. **Error Handling** - Obsługa błędów i timeoutów
6. **Rate Limiting** - Ograniczenie liczby requestów
7. **Logging** - Logowanie konwersacji dla analizy

## Bezpieczeństwo

- ✅ Nigdy nie przechowuj kluczy API w frontendzie
- ✅ Używaj backendu jako proxy
- ✅ Waliduj input użytkownika
- ✅ Rate limiting per IP/user
- ✅ Sanityzacja odpowiedzi modelu
- ✅ Logowanie dla compliance

## Koszty (szacunkowe)

- **OpenAI GPT-3.5**: ~$0.002 per 1K tokens
- **OpenAI GPT-4**: ~$0.03 per 1K tokens
- **Anthropic Claude**: ~$0.008 per 1K tokens
- **Hugging Face**: Darmowe (z limitami)
- **Lokalny model**: Koszty serwera

## Timeline

- **Tydzień 1**: Setup backendu + wybór modelu
- **Tydzień 2**: Integracja API + testy
- **Tydzień 3**: Optymalizacja + monitoring
- **Tydzień 4**: Production deployment

