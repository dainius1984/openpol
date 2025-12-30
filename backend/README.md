# OpenPol Chat Backend API

Backend API server for OpenPol Chat z obsługą różnych providerów AI.

## 🚀 Szybki Start

### Opcja 1: OpenAI API (Rekomendowane - najprostsze)

1. **Zdobądź klucz API z OpenAI:**
   - Zarejestruj się na https://platform.openai.com/
   - Utwórz klucz API w sekcji API Keys
   - Masz $5 darmowych kredytów na start

2. **Skonfiguruj zmienne środowiskowe:**
   ```bash
   cd backend
   cp .env.example .env
   ```
   
   Edytuj `.env` i dodaj swój klucz:
   ```
   OPENAI_API_KEY=sk-your-key-here
   ```

3. **Zainstaluj zależności:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Uruchom serwer:**
   ```bash
   python server.py
   ```

Serwer będzie dostępny na `http://localhost:5000`

### Opcja 2: Ollama (Lokalny model - darmowy)

1. **Zainstaluj Ollama:**
   - Windows: https://ollama.com/download
   - Mac/Linux: `curl https://ollama.ai/install.sh | sh`

2. **Uruchom model:**
   ```bash
   ollama run llama2
   # lub inny model: ollama run mistral
   ```

3. **Skonfiguruj backend:**
   ```bash
   cd backend
   cp .env.example .env
   ```
   
   Edytuj `.env`:
   ```
   USE_OLLAMA=true
   OLLAMA_URL=http://localhost:11434
   OLLAMA_MODEL=llama2
   ```

4. **Uruchom serwer:**
   ```bash
   python server.py
   ```

### Opcja 3: Mock Responses (Bez API - tylko testy)

Jeśli nie skonfigurujesz żadnego API, backend automatycznie użyje prostych odpowiedzi mockowych.

## 📋 Environment Variables

Utwórz plik `.env` w folderze `backend/`:

```env
# OpenAI (Rekomendowane)
OPENAI_API_KEY=sk-your-key-here
OPENAI_MODEL=gpt-3.5-turbo

# Ollama (Opcjonalne)
USE_OLLAMA=false
OLLAMA_URL=http://localhost:11434
OLLAMA_MODEL=llama2

# Server
PORT=5000
DEBUG=false
```

## 🔌 API Endpoints

### POST /api/chat

Wysyłanie wiadomości i otrzymywanie odpowiedzi AI.

**Request:**
```json
{
  "messages": [
    {
      "sender": "user",
      "text": "Cześć!"
    }
  ]
}
```

**Response:**
```json
{
  "message": "Cześć! Jak mogę pomóc?",
  "status": "success"
}
```

### GET /api/health

Sprawdzenie statusu serwera.

**Response:**
```json
{
  "status": "healthy",
  "service": "openpol-chat-api"
}
```

## 💰 Koszty

- **OpenAI GPT-3.5-turbo**: ~$0.002 za 1K tokenów (~$0.01 za 10 wiadomości)
- **OpenAI GPT-4**: ~$0.03 za 1K tokenów
- **Ollama**: Darmowe (lokalnie)

## 🔧 Konfiguracja Frontendu

Upewnij się, że frontend wie gdzie jest backend. W pliku `.env` w głównym folderze projektu:

```env
REACT_APP_CHAT_API_URL=http://localhost:5000
```

## 🐛 Troubleshooting

### Błąd: "OPENAI_API_KEY nie jest ustawiony"
- Sprawdź czy plik `.env` istnieje w folderze `backend/`
- Sprawdź czy klucz API jest poprawny
- Uruchom ponownie serwer po dodaniu zmiennych

### Błąd: "Nie można połączyć się z serwerem"
- Sprawdź czy serwer działa: `python server.py`
- Sprawdź czy port 5000 jest wolny
- Sprawdź CORS settings

### Ollama nie działa
- Sprawdź czy Ollama jest uruchomiona: `ollama list`
- Sprawdź czy model jest pobrany: `ollama pull llama2`
- Sprawdź URL w `.env`

## 📚 Dostępne Modele

### OpenAI:
- `gpt-3.5-turbo` (najtańszy, szybki)
- `gpt-4` (najlepszy, droższy)
- `gpt-4-turbo` (kompromis)

### Ollama:
- `llama2` (dobry, uniwersalny)
- `mistral` (szybki, dobry)
- `codellama` (dla kodu)
- `llama2:13b` (większy, lepszy)

## 🚢 Production Deployment

1. Użyj zmiennych środowiskowych na serwerze
2. Ustaw `DEBUG=false`
3. Użyj reverse proxy (nginx)
4. Dodaj rate limiting
5. Monitoruj koszty API

## 📝 Następne Kroki

1. Wybierz provider (OpenAI/Ollama)
2. Skonfiguruj `.env`
3. Uruchom backend
4. Przetestuj chat w przeglądarce
5. Monitoruj koszty i jakość odpowiedzi
