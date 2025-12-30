# Implementacja NanoChat (Karpathy) dla OpenPol Chat

## Co to jest NanoChat?

NanoChat to minimalistyczny ChatGPT clone stworzony przez Andreja Karpathy'ego. Jest to pełny stack (tokenizacja, pretraining, fine-tuning, inference) w ~8000 liniach kodu.

**GitHub:** https://github.com/karpathy/nanochat

## Architektura

```
Frontend (React) → Backend API (Python/Node.js) → NanoChat Model → Response
```

## Opcje Implementacji

### Opcja 1: Backend Python z NanoChat (Rekomendowane)

**Wymagania:**
- Python 3.8+
- GPU (dla treningu) lub CPU (dla małych modeli)
- PyTorch

**Kroki:**

1. **Setup Backend:**
```bash
# Stwórz folder backend
mkdir backend
cd backend

# Clone nanochat
git clone https://github.com/karpathy/nanochat.git

# Zainstaluj zależności
pip install torch transformers
```

2. **Stwórz API Server (backend/server.py):**
```python
from flask import Flask, request, jsonify
from flask_cors import CORS
import torch
from nanochat import ChatModel  # Import z nanochat

app = Flask(__name__)
CORS(app)  # Enable CORS for React frontend

# Load model (adjust path to your trained model)
model = ChatModel.load('path/to/your/model')

@app.route('/api/chat', methods=['POST'])
def chat():
    data = request.json
    messages = data.get('messages', [])
    
    # Convert messages to format expected by nanochat
    prompt = format_messages(messages)
    
    # Generate response
    response = model.generate(prompt, max_tokens=200)
    
    return jsonify({
        'message': response,
        'status': 'success'
    })

def format_messages(messages):
    # Format messages for nanochat
    formatted = ""
    for msg in messages:
        role = "User" if msg['sender'] == 'user' else "Assistant"
        formatted += f"{role}: {msg['text']}\n"
    return formatted

if __name__ == '__main__':
    app.run(port=5000, debug=True)
```

3. **Frontend Integration (src/utils/chatApi.js):**
```javascript
const API_URL = process.env.REACT_APP_CHAT_API_URL || 'http://localhost:5000';

export const sendChatMessage = async (messages) => {
  try {
    const response = await fetch(`${API_URL}/api/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ messages }),
    });

    if (!response.ok) {
      throw new Error('Chat API error');
    }

    const data = await response.json();
    return data.message;
  } catch (error) {
    console.error('Chat API error:', error);
    throw error;
  }
};
```

### Opcja 2: Użyj Pre-trained Model (Szybsze)

Możesz użyć gotowego modelu z Hugging Face lub OpenAI-compatible API:

```python
# backend/server.py - Simplified version
from flask import Flask, request, jsonify
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app)

# Use OpenAI-compatible API or local model
CHAT_API_URL = "http://localhost:1234/v1/chat/completions"  # Local LLM server

@app.route('/api/chat', methods=['POST'])
def chat():
    data = request.json
    messages = data.get('messages', [])
    
    # Convert to OpenAI format
    formatted_messages = [
        {
            "role": "user" if m['sender'] == 'user' else "assistant",
            "content": m['text']
        }
        for m in messages
    ]
    
    # Add system prompt
    formatted_messages.insert(0, {
        "role": "system",
        "content": "Jesteś asystentem OpenPol, ekspertem w zakresie odpowiedzialnego wdrażania AI w firmach. Odpowiadaj profesjonalnie po polsku."
    })
    
    response = requests.post(CHAT_API_URL, json={
        "model": "nanochat",
        "messages": formatted_messages,
        "temperature": 0.7,
        "max_tokens": 200
    })
    
    return jsonify({
        'message': response.json()['choices'][0]['message']['content'],
        'status': 'success'
    })
```

### Opcja 3: Ollama + NanoChat (Najłatwiejsze dla lokalnego)

```bash
# Install Ollama
curl -fsSL https://ollama.com/install.sh | sh

# Pull a model
ollama pull llama2  # or mistral, codellama, etc.

# Backend będzie prostszy - używa Ollama API
```

## Integracja z Frontendem

Zaktualizuj `src/pages/ChatPage.jsx`:

```javascript
import { sendChatMessage } from '../utils/chatApi';

const handleSendMessage = async (e) => {
  e.preventDefault();
  if (!inputValue.trim() || showContactForm || isLoading) return;

  const userMessage = {
    id: Date.now(),
    text: inputValue.trim(),
    sender: 'user',
    timestamp: new Date()
  };

  setMessages(prev => [...prev, userMessage]);
  setInputValue('');
  setInteractionCount(prev => prev + 1);
  setIsLoading(true);
  logChatInteraction('Message Sent', 'OpenPol Chat');

  try {
    // Call nanochat API
    const response = await sendChatMessage([...messages, userMessage]);
    
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
    console.error('Chat error:', error);
    setIsLoading(false);
    // Fallback to mock response
    const botMessage = {
      id: Date.now() + 1,
      text: 'Przepraszam, wystąpił błąd. Spróbuj ponownie później.',
      sender: 'bot',
      timestamp: new Date()
    };
    setMessages(prev => [...prev, botMessage]);
  }
};
```

## System Prompt dla OpenPol

```python
SYSTEM_PROMPT = """Jesteś asystentem OpenPol, ekspertem w zakresie odpowiedzialnego wdrażania sztucznej inteligencji w firmach.

Twoja rola:
1. Pomaganie firmom w zrozumieniu korzyści z AI
2. Wyjaśnianie wymogów compliance i bezpieczeństwa (RODO, GDPR)
3. Przedstawianie rozwiązań OpenPol Chat
4. Po 2 interakcjach zachęcanie do wypełnienia formularza kontaktowego

Zasady:
- Odpowiadaj profesjonalnie, zwięźle i po polsku
- Skup się na bezpieczeństwie danych, compliance, kontroli i przejrzystości
- Bądź pomocny, ale nie agresywny w sprzedaży
- Maksymalnie 2-3 zdania na odpowiedź
"""
```

## Environment Variables

Dodaj do `.env`:
```
REACT_APP_CHAT_API_URL=http://localhost:5000
```

## Deployment

### Lokalny Development:
```bash
# Terminal 1: Backend
cd backend
python server.py

# Terminal 2: Frontend
npm start
```

### Production:
- Deploy backend na VPS/Cloud (AWS, GCP, Azure)
- Użyj nginx jako reverse proxy
- SSL certificate dla HTTPS
- Rate limiting dla API

## Koszty i Zasoby

- **Lokalny model (CPU):** Darmowe, ale wolne
- **Lokalny model (GPU):** Koszt GPU (~$0.50-2/hour na cloud)
- **Cloud API:** Zależy od providera

## Następne Kroki

1. ✅ Wybierz opcję implementacji
2. ✅ Setup backend API
3. ✅ Integracja z frontendem
4. ✅ Testowanie
5. ✅ Fine-tuning modelu na danych OpenPol (opcjonalnie)
6. ✅ Production deployment

## Przydatne Linki

- NanoChat GitHub: https://github.com/karpathy/nanochat
- NanoGPT Tutorial: https://www.youtube.com/watch?v=9gQ-L7f3kvg
- Ollama: https://ollama.com/
- Hugging Face Models: https://huggingface.co/models

