"""
OpenPol Chat API Server
Run with: python server.py

Opcje integracji:
1. OpenAI API (domyślnie) - wymaga OPENAI_API_KEY w .env
2. Ollama (lokalny) - ustaw USE_OLLAMA=true i OLLAMA_URL
3. Mock responses (fallback) - gdy brak API
"""

from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import requests
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

app = Flask(__name__)
CORS(app)  # Enable CORS for React frontend

# System prompt for OpenPol Chat
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

# Configuration
USE_OLLAMA = os.environ.get('USE_OLLAMA', 'false').lower() == 'true'
OLLAMA_URL = os.environ.get('OLLAMA_URL', 'http://localhost:11434')
OPENAI_API_KEY = os.environ.get('OPENAI_API_KEY', '')
OPENAI_MODEL = os.environ.get('OPENAI_MODEL', 'gpt-3.5-turbo')

def generate_response_openai(messages):
    """Generate response using OpenAI API"""
    if not OPENAI_API_KEY:
        raise Exception("OPENAI_API_KEY nie jest ustawiony w zmiennych środowiskowych")
    
    # Format messages for OpenAI API
    formatted_messages = [
        {"role": "system", "content": SYSTEM_PROMPT}
    ]
    
    for msg in messages:
        role = "user" if msg.get('sender') == 'user' else "assistant"
        formatted_messages.append({
            "role": role,
            "content": msg.get('text', '')
        })
    
    try:
        response = requests.post(
            'https://api.openai.com/v1/chat/completions',
            headers={
                'Authorization': f'Bearer {OPENAI_API_KEY}',
                'Content-Type': 'application/json'
            },
            json={
                'model': OPENAI_MODEL,
                'messages': formatted_messages,
                'max_tokens': 200,
                'temperature': 0.7
            },
            timeout=30
        )
        
        if response.status_code == 200:
            data = response.json()
            return data['choices'][0]['message']['content'].strip()
        else:
            raise Exception(f"OpenAI API error: {response.status_code} - {response.text}")
            
    except requests.exceptions.RequestException as e:
        raise Exception(f"Błąd połączenia z OpenAI API: {str(e)}")

def generate_response_ollama(messages):
    """Generate response using Ollama (local model)"""
    # Format messages for Ollama
    formatted_messages = [
        {"role": "system", "content": SYSTEM_PROMPT}
    ]
    
    for msg in messages:
        role = "user" if msg.get('sender') == 'user' else "assistant"
        formatted_messages.append({
            "role": role,
            "content": msg.get('text', '')
        })
    
    try:
        model_name = os.environ.get('OLLAMA_MODEL', 'llama2')
        response = requests.post(
            f'{OLLAMA_URL}/api/chat',
            json={
                'model': model_name,
                'messages': formatted_messages,
                'stream': False
            },
            timeout=60
        )
        
        if response.status_code == 200:
            data = response.json()
            return data.get('message', {}).get('content', '').strip()
        else:
            raise Exception(f"Ollama API error: {response.status_code}")
            
    except requests.exceptions.RequestException as e:
        raise Exception(f"Błąd połączenia z Ollama: {str(e)}")

def generate_response_mock(messages):
    """Fallback mock responses when API is not available"""
    user_message = messages[-1]['text'] if messages else ""
    
    if "cześć" in user_message.lower() or "witaj" in user_message.lower() or "hello" in user_message.lower():
        return "Cześć! Jak mogę pomóc w zakresie odpowiedzialnego wdrażania AI w Twojej firmie?"
    elif "compliance" in user_message.lower() or "rodo" in user_message.lower() or "gdpr" in user_message.lower():
        return "OpenPol Chat zapewnia pełną zgodność z RODO i GDPR. Wszystkie dane są przetwarzane z najwyższymi standardami bezpieczeństwa i kontroli."
    elif "koszt" in user_message.lower() or "cena" in user_message.lower() or "cennik" in user_message.lower():
        return "Aby poznać szczegóły cenowe, proszę wypełnij formularz kontaktowy. Nasz zespół przygotuje spersonalizowaną ofertę dostosowaną do Twoich potrzeb."
    elif "bezpieczeństwo" in user_message.lower() or "security" in user_message.lower():
        return "Bezpieczeństwo danych to nasz priorytet. OpenPol Chat zapewnia pełną kontrolę nad danymi, zgodność z RODO i transparentność procesów AI."
    else:
        return "Dziękuję za pytanie! OpenPol Chat oferuje bezpieczne wdrożenie LLM-ów z pełną kontrolą i zgodnością z wymogami compliance. Jakie konkretne potrzeby ma Twoja firma?"

def generate_response(messages):
    """
    Generate response using configured AI service
    Priority: OpenAI > Ollama > Mock
    """
    # Try OpenAI first
    if OPENAI_API_KEY:
        try:
            return generate_response_openai(messages)
        except Exception as e:
            print(f"OpenAI error: {e}, próbuję Ollama...")
    
    # Try Ollama if OpenAI fails or is not configured
    if USE_OLLAMA:
        try:
            return generate_response_ollama(messages)
        except Exception as e:
            print(f"Ollama error: {e}, używam mock responses...")
    
    # Fallback to mock responses
    print("Używam mock responses (brak skonfigurowanego API)")
    return generate_response_mock(messages)


def format_messages(messages):
    """
    Format messages for NanoChat model
    """
    formatted = SYSTEM_PROMPT + "\n\n"
    for msg in messages:
        role = "User" if msg['sender'] == 'user' else "Assistant"
        formatted += f"{role}: {msg['text']}\n"
    formatted += "Assistant:"
    return formatted


@app.route('/api/health', methods=['GET'])
def health():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'service': 'nanochat-api'
    })


@app.route('/api/chat', methods=['POST'])
def chat():
    """Main chat endpoint"""
    try:
        data = request.json
        
        if not data or 'messages' not in data:
            return jsonify({
                'error': 'Missing messages in request'
            }), 400
        
        messages = data.get('messages', [])
        
        if not messages:
            return jsonify({
                'error': 'Messages array is empty'
            }), 400
        
        # Generate response
        response_text = generate_response(messages)
        
        return jsonify({
            'message': response_text,
            'status': 'success'
        })
        
    except Exception as e:
        print(f"Error in chat endpoint: {str(e)}")
        return jsonify({
            'error': 'Internal server error',
            'message': str(e)
        }), 500


if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    debug = os.environ.get('DEBUG', 'False').lower() == 'true'
    
    print(f"Starting NanoChat API server on port {port}")
    print(f"Debug mode: {debug}")
    print(f"API endpoint: http://localhost:{port}/api/chat")
    
    app.run(host='0.0.0.0', port=port, debug=debug)

