const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Helper function to get auth headers
const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` })
  };
};

// Create new booking
export const createBooking = async (bookingData) => {
  try {
    const response = await fetch(`${API_URL}/bookings`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(bookingData)
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to create booking');
    }

    return data;
  } catch (error) {
    console.error('Error creating booking:', error);
    throw error;
  }
};

// Get user's bookings
export const getMyBookings = async (status) => {
  try {
    const url = status 
      ? `${API_URL}/bookings/my-bookings?status=${status}`
      : `${API_URL}/bookings/my-bookings`;

    const response = await fetch(url, {
      method: 'GET',
      headers: getAuthHeaders()
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch bookings');
    }

    return data;
  } catch (error) {
    console.error('Error fetching bookings:', error);
    throw error;
  }
};

// Get host's bookings
export const getHostBookings = async (status) => {
  try {
    const url = status 
      ? `${API_URL}/bookings/host/bookings?status=${status}`
      : `${API_URL}/bookings/host/bookings`;

    const response = await fetch(url, {
      method: 'GET',
      headers: getAuthHeaders()
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch host bookings');
    }

    return data;
  } catch (error) {
    console.error('Error fetching host bookings:', error);
    throw error;
  }
};

// Get single booking
export const getBooking = async (id) => {
  try {
    const response = await fetch(`${API_URL}/bookings/${id}`, {
      method: 'GET',
      headers: getAuthHeaders()
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch booking details');
    }

    return data;
  } catch (error) {
    console.error('Error fetching booking:', error);
    throw error;
  }
};

// Update booking status
export const updateBookingStatus = async (id, status) => {
  try {
    const response = await fetch(`${API_URL}/bookings/${id}/status`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify({ status })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to update booking status');
    }

    return data;
  } catch (error) {
    console.error('Error updating booking status:', error);
    throw error;
  }
};

// Cancel booking
export const cancelBooking = async (id, reason) => {
  try {
    const response = await fetch(`${API_URL}/bookings/${id}/cancel`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify({ reason })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to cancel booking');
    }

    return data;
  } catch (error) {
    console.error('Error cancelling booking:', error);
    throw error;
  }
};

// Add review
export const addReview = async (id, rating, comment) => {
  try {
    const response = await fetch(`${API_URL}/bookings/${id}/review`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ rating, comment })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to add review');
    }

    return data;
  } catch (error) {
    console.error('Error adding review:', error);
    throw error;
  }
};

// Get booking stats
export const getBookingStats = async () => {
  try {
    const response = await fetch(`${API_URL}/bookings/stats`, {
      method: 'GET',
      headers: getAuthHeaders()
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch booking stats');
    }

    return data;
  } catch (error) {
    console.error('Error fetching booking stats:', error);
    throw error;
  }
};

export default {
  createBooking,
  getMyBookings,
  getHostBookings,
  getBooking,
  updateBookingStatus,
  cancelBooking,
  addReview,
  getBookingStats
};
