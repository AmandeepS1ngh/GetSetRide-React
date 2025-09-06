// Authentication service for GetSetRide

class AuthService {
  constructor() {
    this.isAuthenticated = false;
    this.user = null;
  }

  // Login method
  async login(email, password) {
    try {
      // Simulate API call
      const response = await this.simulateApiCall({
        email,
        password
      });

      if (response.success) {
        this.isAuthenticated = true;
        this.user = response.user;
        localStorage.setItem('authToken', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
        return { success: true, user: response.user };
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      throw new Error(error.message || 'Login failed');
    }
  }

  // Signup method
  async signup(userData) {
    try {
      // Simulate API call
      const response = await this.simulateApiCall(userData);

      if (response.success) {
        this.isAuthenticated = true;
        this.user = response.user;
        localStorage.setItem('authToken', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
        return { success: true, user: response.user };
      } else {
        throw new Error(response.message);
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
    return this.user;
  }

  // Simulate API call (replace with actual API endpoints)
  async simulateApiCall(data) {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Simulate successful response
        resolve({
          success: true,
          user: {
            id: 1,
            name: data.firstName ? `${data.firstName} ${data.lastName}` : 'John Doe',
            email: data.email,
            joinDate: new Date().toISOString()
          },
          token: 'mock-jwt-token-' + Date.now(),
          message: 'Success'
        });
      }, 1000);
    });
  }

  // Password reset method
  async resetPassword(email) {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      return { success: true, message: 'Password reset email sent' };
    } catch (error) {
      throw new Error('Failed to send reset email');
    }
  }
}

// Create and export a singleton instance
const authService = new AuthService();
export default authService;
