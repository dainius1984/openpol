/**
 * Chat API utilities for communicating with NanoChat backend
 */

const API_URL = process.env.REACT_APP_CHAT_API_URL || 'http://localhost:5000';

/**
 * Send messages to chat API and get response
 * @param {Array} messages - Array of message objects with {sender: 'user'|'bot', text: string}
 * @returns {Promise<string>} - Bot response text
 */
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
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.message || data.response || 'Przepraszam, nie otrzymałem odpowiedzi.';
  } catch (error) {
    console.error('Chat API error:', error);
    
    // If API is not available, throw error to be handled by caller
    if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
      throw new Error('Nie można połączyć się z serwerem czatu. Sprawdź czy backend jest uruchomiony.');
    }
    
    throw error;
  }
};

/**
 * Check if chat API is available
 * @returns {Promise<boolean>}
 */
export const checkChatApiHealth = async () => {
  try {
    const response = await fetch(`${API_URL}/api/health`, {
      method: 'GET',
    });
    return response.ok;
  } catch (error) {
    return false;
  }
};

