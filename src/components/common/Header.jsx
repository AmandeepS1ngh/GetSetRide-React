import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import authService from '../../services/auth';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isTransparent = location.pathname === '/';
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      const authenticated = authService.checkAuth();
      setIsAuthenticated(authenticated);
      if (authenticated) {
        setUser(authService.getCurrentUser());
      }
    };

    checkAuth();

    // Listen for auth changes
    window.addEventListener('storage', checkAuth);
    return () => window.removeEventListener('storage', checkAuth);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = () => {
    authService.logout();
    setIsAuthenticated(false);
    setUser(null);
    setShowDropdown(false);
    navigate('/');
  };

  const getInitials = (name) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  const handleSectionClick = (sectionId) => {
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header className={`${isTransparent ? 'absolute top-0 left-0 right-0 z-10 bg-transparent' : 'bg-white shadow-md sticky top-0 z-20'} transition-all duration-300`}>
      <div className="container mx-auto px-4 py-6 flex justify-between items-center">
        <h1 className={`text-2xl font-bold ${isTransparent ? 'text-white' : 'text-[var(--primary-color)]'}`}>
          <Link to="/">GETSETRIDE</Link>
        </h1>

        {/* Desktop Navigation */}
        <nav className={`hidden md:flex items-center space-x-8 ${isTransparent ? 'text-white' : 'text-gray-800'}`}>
          <Link className="hover:text-[var(--primary-color)] transition-colors" to="/">Home</Link>
          <Link className="hover:text-[var(--primary-color)] transition-colors" to="/marketplace">Marketplace</Link>
          <button
            className="hover:text-[var(--primary-color)] transition-colors"
            onClick={() => handleSectionClick('how-it-works')}
          >
            How it Work
          </button>
          <Link
            className="hover:text-[var(--primary-color)] transition-colors"
            to="/add-car"
          >
            List Your Car
          </Link>
        </nav>

        {/* Desktop Login Button / User Menu */}
        <div className="hidden md:block">
          {isAuthenticated && user ? (
            <div className="relative">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className={`flex items-center space-x-2 ${isTransparent ? 'text-white' : 'text-gray-800'} hover:text-[var(--primary-color)] transition-colors focus:outline-none`}
              >
                <div className="w-10 h-10 bg-[var(--primary-color)] text-white rounded-full flex items-center justify-center font-semibold">
                  {getInitials(user.name)}
                </div>
                <span className="font-medium">{user.name}</span>
                <svg
                  className={`w-4 h-4 transition-transform ${showDropdown ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Dropdown Menu */}
              {showDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
                  <div className="px-4 py-2 border-b border-gray-200">
                    <p className="text-sm font-semibold text-gray-800">{user.name}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 transition"
                    onClick={() => setShowDropdown(false)}
                  >
                    <div className="flex items-center space-x-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      <span>My Profile</span>
                    </div>
                  </Link>
                  <Link
                    to="/my-bookings"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 transition"
                    onClick={() => setShowDropdown(false)}
                  >
                    <div className="flex items-center space-x-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                      <span>My Bookings</span>
                    </div>
                  </Link>
                  <Link
                    to="/add-car"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 transition"
                    onClick={() => setShowDropdown(false)}
                  >
                    <div className="flex items-center space-x-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                      <span>List Your Car</span>
                    </div>
                  </Link>
                  <Link
                    to="/my-cars"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 transition"
                    onClick={() => setShowDropdown(false)}
                  >
                    <div className="flex items-center space-x-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                      <span>My Cars</span>
                    </div>
                  </Link>
                  <div className="border-t border-gray-200 mt-2 pt-2">
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition"
                    >
                      <div className="flex items-center space-x-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        <span>Logout</span>
                      </div>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="bg-[var(--primary-color)] text-white px-6 py-2 rounded-lg font-semibold hover:bg-[var(--primary-hover-color)] transition-colors"
            >
              Login / Signup
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className={`md:hidden ${isTransparent ? 'text-white' : 'text-gray-800'}`}
          onClick={toggleMobileMenu}
        >
          <span className="material-icons text-2xl">
            {isMobileMenuOpen ? 'close' : 'menu'}
          </span>
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg border-t">
          <nav className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <Link
              className="text-gray-800 hover:text-[var(--primary-color)] transition-colors"
              to="/"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            <button
              className="text-gray-800 hover:text-[var(--primary-color)] transition-colors text-left"
              onClick={() => {
                handleSectionClick('how-it-works');
                setIsMobileMenuOpen(false);
              }}
            >
              How it Work
            </button>
            <Link
              className="text-gray-800 hover:text-[var(--primary-color)] transition-colors"
              to="/become-host"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Become a Host
            </Link>
            <button
              className="text-gray-800 hover:text-[var(--primary-color)] transition-colors text-left"
              onClick={() => {
                handleSectionClick('why-choose-us');
                setIsMobileMenuOpen(false);
              }}
            >
              Why Choose Us
            </button>
            {isAuthenticated && user ? (
              <>
                <Link
                  className="text-gray-800 hover:text-[var(--primary-color)] transition-colors"
                  to="/profile"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  My Profile
                </Link>
                <button
                  className="bg-red-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-red-700 transition-colors text-center"
                  onClick={() => {
                    handleLogout();
                    setIsMobileMenuOpen(false);
                  }}
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="bg-[var(--primary-color)] text-white px-6 py-2 rounded-lg font-semibold hover:bg-[var(--primary-hover-color)] transition-colors text-center"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Login / Signup
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
