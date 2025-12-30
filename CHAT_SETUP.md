# 🚀 Konfiguracja OpenPol Chat

## Opcje integracji chatu

Masz 3 opcje podpięcia chatu:

### ✅ Opcja 1: OpenAI API (Najprostsze - Rekomendowane)

**Krok 1:** Zdobądź klucz API
1. Zarejestruj się na https://platform.openai.com/
2. Przejdź do sekcji API Keys
3. Utwórz nowy klucz API
4. Skopiuj klucz (zaczyna się od `sk-`)

**Krok 2:** Skonfiguruj backend
```bash
cd backend
cp env.example .env
```

Edytuj plik `.env` i dodaj swój klucz:
```env
OPENAI_API_KEY=sk-twoj-klucz-tutaj
OPENAI_MODEL=gpt-3.5-turbo
```

**Krok 3:** Zainstaluj zależności
```bash
pip install -r requirements.txt
```

**Krok 4:** Uruchom backend
```bash
python server.py
```

Backend będzie dostępny na `http://localhost:5000`

**Koszty:** ~$0.01 za 10 wiadomości (masz $5 darmowych kredytów na start)

---

### ✅ Opcja 2: Ollama (Lokalny model - Darmowy)

**Krok 1:** Zainstaluj Ollama
- Windows: Pobierz z https://ollama.com/download
- Mac/Linux: `curl https://ollama.ai/install.sh | sh`

**Krok 2:** Uruchom model
```bash
ollama run llama2
```

**Krok 3:** Skonfiguruj backend
```bash
cd backend
cp env.example .env
```

Edytuj `.env`:
```env
USE_OLLAMA=true
OLLAMA_URL=http://localhost:11434
OLLAMA_MODEL=llama2
```

**Krok 4:** Zainstaluj zależności i uruchom
```bash
pip install -r requirements.txt
python server.py
```

**Koszty:** Darmowe (działa lokalnie)

---

### ✅ Opcja 3: Mock Responses (Bez API - tylko testy)

Jeśli nie skonfigurujesz żadnego API, backend automatycznie użyje prostych odpowiedzi mockowych. Działa od razu bez konfiguracji, ale odpowiedzi są bardzo podstawowe.

---

## 🎯 Uruchomienie całej aplikacji

**Terminal 1 - Backend:**
```bash
cd backend
python server.py
```

**Terminal 2 - Frontend:**
```bash
npm start
```

Teraz możesz:
1. Otworzyć http://localhost:3000
2. Kliknąć "Wypróbuj OpenPol Chat"
3. Rozmawiać z chatem! 💬

---

## 🔧 Troubleshooting

### Backend nie startuje
- Sprawdź czy Python 3.8+ jest zainstalowany: `python --version`
- Sprawdź czy wszystkie zależności są zainstalowane: `pip install -r requirements.txt`
- Sprawdź czy port 5000 jest wolny

### Chat nie odpowiada
- Sprawdź czy backend działa: otwórz http://localhost:5000/api/health
- Sprawdź konsole przeglądarki (F12) czy są błędy
- Sprawdź czy klucz API jest poprawny (dla OpenAI)

### Błąd CORS
- Upewnij się że backend ma `CORS(app)` w kodzie
- Sprawdź czy frontend używa poprawnego URL: `REACT_APP_CHAT_API_URL=http://localhost:5000`

---

## 📝 Pliki konfiguracyjne

- `backend/.env` - zmienne środowiskowe backendu (utwórz z `env.example`)
- `.env` (główny folder) - zmienne środowiskowe frontendu

Frontend `.env`:
```env
REACT_APP_CHAT_API_URL=http://localhost:5000
REACT_APP_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

---

## 💡 Wskazówki

1. **Dla produkcji:** Użyj OpenAI API, jest najstabilniejsze
2. **Dla rozwoju:** Możesz użyć Ollama lub mock responses
3. **Bezpieczeństwo:** Nigdy nie commituj plików `.env` z kluczami API
4. **Koszty:** Monitoruj użycie OpenAI API w dashboardzie

---

## ✅ Testowanie

Po skonfigurowaniu:

1. Uruchom backend: `python backend/server.py`
2. Uruchom frontend: `npm start`
3. Otwórz http://localhost:3000/chat
4. Napisz "Cześć!" i sprawdź odpowiedź

Jeśli wszystko działa, zobaczysz odpowiedź od AI! 🎉

