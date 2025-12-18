import { useState, useEffect, useRef } from 'react';
import { sendChatMessage, getChatSuggestions } from '../../services/chatbot';
import { useNavigate } from 'react-router-dom';
import './Chatbot.css';

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [suggestions, setSuggestions] = useState([]);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);
    const navigate = useNavigate();

    // Check authentication status
    useEffect(() => {
        const token = localStorage.getItem('authToken') || localStorage.getItem('token');
        setIsAuthenticated(!!token);
    }, [isOpen]);

    // Initial greeting message
    useEffect(() => {
        if (messages.length === 0) {
            const token = localStorage.getItem('authToken') || localStorage.getItem('token');
            if (token) {
                setMessages([{
                    type: 'bot',
                    content: "Hi! 👋 I'm your GetSetRide assistant. I can help you find the perfect car for your trip. Try asking me things like:",
                    suggestions: ['Show me cars in Delhi', 'Find SUVs', 'Cars under ₹2000/day']
                }]);
            } else {
                setMessages([{
                    type: 'bot',
                    content: "Hi! 👋 I'm your GetSetRide assistant. Please log in to chat with me and find the perfect car for your trip.",
                    isAuthPrompt: true
                }]);
            }
        }
    }, [isAuthenticated]);

    // Load suggestions on mount
    useEffect(() => {
        const loadSuggestions = async () => {
            const data = await getChatSuggestions();
            if (data.success) {
                setSuggestions(data.suggestions);
            }
        };
        loadSuggestions();
    }, []);

    // Auto-scroll to bottom
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    // Focus input when chat opens
    useEffect(() => {
        if (isOpen && isAuthenticated) {
            inputRef.current?.focus();
        }
    }, [isOpen, isAuthenticated]);

    const handleLogin = () => {
        setIsOpen(false);
        navigate('/login');
    };

    const handleSendMessage = async (message = inputValue) => {
        if (!message.trim() || isLoading) return;

        // Check auth before sending
        const token = localStorage.getItem('authToken') || localStorage.getItem('token');
        if (!token) {
            setMessages(prev => [...prev, {
                type: 'bot',
                content: 'Please log in to continue chatting.',
                isAuthPrompt: true
            }]);
            return;
        }

        const userMessage = { type: 'user', content: message };
        setMessages(prev => [...prev, userMessage]);
        setInputValue('');
        setIsLoading(true);

        try {
            // Build conversation history for context
            const conversationHistory = messages.slice(-10).map(msg => ({
                role: msg.type === 'user' ? 'user' : 'assistant',
                content: typeof msg.content === 'string' ? msg.content : JSON.stringify(msg.content)
            }));

            const response = await sendChatMessage(message, conversationHistory);

            if (response.success) {
                const botMessage = {
                    type: 'bot',
                    content: response.message,
                    cars: response.cars,
                    responseType: response.type
                };
                setMessages(prev => [...prev, botMessage]);
            } else {
                throw new Error(response.message || 'Something went wrong');
            }
        } catch (error) {
            // Handle 401 unauthorized specifically
            if (error.message && error.message.includes('authorized')) {
                setMessages(prev => [...prev, {
                    type: 'bot',
                    content: 'Your session has expired. Please log in again.',
                    isAuthPrompt: true
                }]);
                setIsAuthenticated(false);
            } else {
                setMessages(prev => [...prev, {
                    type: 'bot',
                    content: 'Sorry, I encountered an error. Please try again later.',
                    isError: true
                }]);
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    const handleCarClick = (carId) => {
        navigate(`/car/${carId}`);
        setIsOpen(false);
    };

    const handleSuggestionClick = (suggestion) => {
        handleSendMessage(suggestion);
    };

    return (
        <div className="chatbot-container">
            {/* Chat Toggle Button */}
            <button
                className={`chatbot-toggle ${isOpen ? 'open' : ''}`}
                onClick={() => setIsOpen(!isOpen)}
                aria-label={isOpen ? 'Close chat' : 'Open chat'}
            >
                {isOpen ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                    </svg>
                )}
            </button>

            {/* Chat Window */}
            {isOpen && (
                <div className="chatbot-window">
                    {/* Header */}
                    <div className="chatbot-header">
                        <div className="chatbot-header-info">
                            <div className="chatbot-avatar">🚗</div>
                            <div>
                                <h3>GetSetRide Assistant</h3>
                                <span className="chatbot-status">Online</span>
                            </div>
                        </div>
                        <button className="chatbot-close" onClick={() => setIsOpen(false)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                        </button>
                    </div>

                    {/* Messages */}
                    <div className="chatbot-messages">
                        {messages.map((message, index) => (
                            <div key={index} className={`chatbot-message ${message.type}`}>
                                {message.type === 'bot' && (
                                    <div className="chatbot-message-avatar">🚗</div>
                                )}
                                <div className={`chatbot-message-content ${message.isError ? 'error' : ''}`}>
                                    <p>{message.content}</p>

                                    {/* Show login button for auth prompts */}
                                    {message.isAuthPrompt && (
                                        <button
                                            className="chatbot-login-btn"
                                            onClick={handleLogin}
                                        >
                                            Log In to Continue
                                        </button>
                                    )}

                                    {/* Show suggestion chips */}
                                    {message.suggestions && (
                                        <div className="chatbot-suggestions">
                                            {message.suggestions.map((suggestion, idx) => (
                                                <button
                                                    key={idx}
                                                    className="chatbot-suggestion-chip"
                                                    onClick={() => handleSuggestionClick(suggestion)}
                                                >
                                                    {suggestion}
                                                </button>
                                            ))}
                                        </div>
                                    )}

                                    {/* Show car cards */}
                                    {message.cars && message.cars.length > 0 && (
                                        <div className="chatbot-cars">
                                            {message.cars.map((car) => (
                                                <div
                                                    key={car._id}
                                                    className="chatbot-car-card"
                                                    onClick={() => handleCarClick(car._id)}
                                                >
                                                    <div className="chatbot-car-image">
                                                        {car.images && car.images[0] ? (
                                                            <img src={car.images[0]} alt={`${car.brand} ${car.model}`} />
                                                        ) : (
                                                            <div className="chatbot-car-placeholder">🚗</div>
                                                        )}
                                                    </div>
                                                    <div className="chatbot-car-info">
                                                        <h4>{car.brand} {car.model}</h4>
                                                        <p className="chatbot-car-details">
                                                            {car.category} • {car.transmission} • {car.seats} seats
                                                        </p>
                                                        <p className="chatbot-car-location">
                                                            📍 {car.location?.city || 'N/A'}
                                                        </p>
                                                        <p className="chatbot-car-price">
                                                            ₹{car.pricePerDay?.toLocaleString()}/day
                                                        </p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}

                        {/* Loading indicator */}
                        {isLoading && (
                            <div className="chatbot-message bot">
                                <div className="chatbot-message-avatar">🚗</div>
                                <div className="chatbot-message-content">
                                    <div className="chatbot-typing">
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div ref={messagesEndRef} />
                    </div>

                    {/* Quick suggestions - only show if authenticated */}
                    {isAuthenticated && suggestions.length > 0 && messages.length <= 1 && (
                        <div className="chatbot-quick-suggestions">
                            {suggestions.slice(0, 4).map((suggestion, idx) => (
                                <button
                                    key={idx}
                                    className="chatbot-quick-chip"
                                    onClick={() => handleSuggestionClick(suggestion)}
                                >
                                    {suggestion}
                                </button>
                            ))}
                        </div>
                    )}

                    {/* Input - disabled if not authenticated */}
                    <div className="chatbot-input-container">
                        <input
                            ref={inputRef}
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder={isAuthenticated ? "Ask about cars, locations, prices..." : "Please log in to chat"}
                            disabled={isLoading || !isAuthenticated}
                        />
                        <button
                            className="chatbot-send"
                            onClick={() => handleSendMessage()}
                            disabled={!inputValue.trim() || isLoading || !isAuthenticated}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="22" y1="2" x2="11" y2="13"></line>
                                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                            </svg>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Chatbot;
