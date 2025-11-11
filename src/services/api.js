// filepath: /Users/amandeepsingh/Desktop/GetSetRide-React/src/services/api.js
// Centralized API configuration

// Base API URL - uses environment variable or falls back to production URL
export const API_URL = import.meta.env.VITE_API_URL || 'https://getsetride-backend.onrender.com/api';

// Helper function to get auth headers
export const getAuthHeaders = () => {
  // Try both 'token' and 'authToken' for backward compatibility
  const token = localStorage.getItem('authToken') || localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` })
  };
};

// Helper function to handle API responses
export const handleResponse = async (response) => {
  const data = await response.json();
  
  if (!response.ok) {
    // Handle different error status codes
    if (response.status === 401) {
      // Unauthorized - clear auth and redirect to login
      localStorage.removeItem('authToken');
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    throw new Error(data.message || `HTTP error! status: ${response.status}`);
  }
  
  return data;
};

// Generic API request function
export const apiRequest = async (endpoint, options = {}) => {
  try {
    const url = `${API_URL}${endpoint}`;
    const config = {
      ...options,
      headers: {
        ...getAuthHeaders(),
        ...options.headers,
      },
    };

    const response = await fetch(url, config);
    return await handleResponse(response);
  } catch (error) {
    console.error('API Request Error:', error);
    throw error;
  }
};
