// Authentication service for GetSetRide

const API_URL = import.meta.env.VITE_API_URL || 'https://getsetride-backend.onrender.com/api';

class AuthService {
  constructor() {
    this.isAuthenticated = false;
    this.user = null;
  }

  // Login method
  async login(email, password, rememberMe = false) {
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, rememberMe })
      });

      const data = await response.json();

      if (data.success) {
        this.isAuthenticated = true;
        this.user = data.user;
        localStorage.setItem('authToken', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        
        // Dispatch custom event for other components to listen
        window.dispatchEvent(new Event('storage'));
        
        return { success: true, user: data.user };
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      throw new Error(error.message || 'Login failed');
    }
  }

  // Signup method
  async signup(userData) {
    try {
      const response = await fetch(`${API_URL}/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData)
      });

      const data = await response.json();

      if (data.success) {
        this.isAuthenticated = true;
        this.user = data.user;
        localStorage.setItem('authToken', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        
        // Dispatch custom event for other components to listen
        window.dispatchEvent(new Event('storage'));
        
        return { success: true, user: data.user };
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      throw new Error(error.message || 'Signup failed');
    }
  }

  // Logout method
  logout() {
    this.isAuthenticated = false;
    this.user = null;
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    
    // Dispatch custom event for other components to listen
    window.dispatchEvent(new Event('storage'));
  }

  // Check if user is authenticated
  checkAuth() {
    const token = localStorage.getItem('authToken');
    const user = localStorage.getItem('user');
    
    if (token && user) {
      this.isAuthenticated = true;
      this.user = JSON.parse(user);
      return true;
    }
    
    return false;
  }

  // Get current user
  getCurrentUser() {
    if (!this.user) {
      const user = localStorage.getItem('user');
      if (user) {
        this.user = JSON.parse(user);
      }
    }
    return this.user;
  }

  // Get token
  getToken() {
    return localStorage.getItem('authToken');
  }

  // Check if user is logged in
  isLoggedIn() {
    return this.isAuthenticated;
  }

  // Update user data
  updateUser(userData) {
    this.user = { ...this.user, ...userData };
    localStorage.setItem('user', JSON.stringify(this.user));
    
    // Dispatch custom event for other components to listen
    window.dispatchEvent(new Event('storage'));
  }
}

// Create and export a singleton instance
const authService = new AuthService();
export default authService;
