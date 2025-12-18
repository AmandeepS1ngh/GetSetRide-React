// Chatbot API service
import { apiRequest } from './api';

// Send a message to the chatbot
export const sendChatMessage = async (message, conversationHistory = []) => {
    try {
        const response = await apiRequest('/chatbot/message', {
            method: 'POST',
            body: JSON.stringify({ message, conversationHistory })
        });
        return response;
    } catch (error) {
        console.error('Chatbot error:', error);
        throw error;
    }
};

// Get quick suggestions
export const getChatSuggestions = async () => {
    try {
        const response = await apiRequest('/chatbot/suggestions');
        return response;
    } catch (error) {
        console.error('Error fetching suggestions:', error);
        return { success: true, suggestions: ['Show me available cars', 'Cars in Delhi', 'SUVs available'] };
    }
};
