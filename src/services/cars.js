import api from './api';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Helper function to get auth headers
const getAuthHeaders = () => {
  // Try both 'token' and 'authToken' for backward compatibility
  const token = localStorage.getItem('authToken') || localStorage.getItem('token');
  console.log('Getting auth headers - Token present:', !!token);
  return {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` })
  };
};

// Get all cars
export const getCars = async () => {
  const response = await api.get('/cars');
  return response.data;
};

// Get single car by ID
export const getCar = async (id) => {
  try {
    console.log('Fetching car with ID:', id);
    
    const response = await fetch(`${API_URL}/cars/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();
    console.log('Car API response:', data);

    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch car details');
    }

    // Return just the car object, not the whole response
    return data.car;
  } catch (error) {
    console.error('Error fetching car:', error);
    throw error;
  }
};

// Create new car listing
export const createCar = async (carData) => {
  try {
    console.log('=== CREATE CAR SERVICE ===');
    console.log('Car data:', carData);
    
    const token = localStorage.getItem('authToken') || localStorage.getItem('token');
    console.log('Auth token:', token ? 'Present (' + token.substring(0, 20) + '...)' : 'MISSING');
    
    if (!token) {
      throw new Error('You must be logged in to list a car');
    }

    console.log('API URL:', `${API_URL}/cars`);
    console.log('Auth headers:', getAuthHeaders());

    const response = await fetch(`${API_URL}/cars`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(carData)
    });

    console.log('Response status:', response.status);

    const data = await response.json();
    console.log('Response data:', data);

    if (!response.ok) {
      throw new Error(data.message || 'Failed to create car listing');
    }

    return data;
  } catch (error) {
    console.error('Error creating car:', error);
    throw error;
  }
};

// Add new car
export const addCar = async (carData) => {
  const response = await api.post('/cars', carData);
  return response.data;
};

// Update car
export const updateCar = async (id, carData) => {
  try {
    const response = await fetch(`${API_URL}/cars/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(carData)
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to update car');
    }

    return data;
  } catch (error) {
    console.error('Error updating car:', error);
    throw error;
  }
};

// Delete car
export const deleteCar = async (id) => {
  try {
    const response = await fetch(`${API_URL}/cars/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to delete car');
    }

    return data;
  } catch (error) {
    console.error('Error deleting car:', error);
    throw error;
  }
};

// Get host's cars
export const getHostCars = async () => {
  try {
    const response = await fetch(`${API_URL}/cars/host/my-cars`, {
      method: 'GET',
      headers: getAuthHeaders()
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch your cars');
    }

    // Return the cars array directly
    return data.cars || data || [];
  } catch (error) {
    console.error('Error fetching host cars:', error);
    throw error;
  }
};

// Toggle car active status
export const toggleCarStatus = async (id) => {
  try {
    const response = await fetch(`${API_URL}/cars/${id}/toggle-status`, {
      method: 'PATCH',
      headers: getAuthHeaders()
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to toggle car status');
    }

    return data;
  } catch (error) {
    console.error('Error toggling car status:', error);
    throw error;
  }
};

// Get host stats
export const getHostStats = async () => {
  try {
    const response = await fetch(`${API_URL}/cars/host/stats`, {
      method: 'GET',
      headers: getAuthHeaders()
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch stats');
    }

    // Return the stats object directly
    return data.stats || data || {};
  } catch (error) {
    console.error('Error fetching host stats:', error);
    throw error;
  }
};

export default {
  getCars,
  getCar,
  createCar,
  updateCar,
  deleteCar,
  getHostCars,
  toggleCarStatus,
  getHostStats,
  addCar
};
