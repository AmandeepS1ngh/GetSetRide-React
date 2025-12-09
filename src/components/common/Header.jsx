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
    <header className={`${isTransparent ? 'absolute top-0 left-0 right-0 z-50 bg-transparent' : 'bg-white shadow-lg shadow-gray-200/50 sticky top-0 z-50 backdrop-blur-md bg-white/95'} transition-all duration-300`}>
      <div className="container mx-auto px-4 py-4 md:py-5 flex justify-between items-center">
        <h1 className="text-2xl font-black tracking-tighter hover:scale-105 transition-transform">
          <Link to="/" className={`flex items-center gap-2 ${isTransparent ? 'text-white' : 'text-blue-600'}`}>
            <span className="material-icons text-3xl">directions_car</span>
            <span>GETSETRIDE</span>
          </Link>
        </h1>

        {/* Desktop Navigation */}
        <nav className={`hidden md:flex items-center space-x-1 font-medium ${isTransparent ? 'text-white' : 'text-gray-600'}`}>
          <Link className={`px-4 py-2 rounded-full hover:bg-black/10 transition-all ${isTransparent ? 'hover:text-white' : 'hover:text-blue-600 hover:bg-blue-50'}`} to="/">
            Home
          </Link>
          <Link className={`px-4 py-2 rounded-full hover:bg-black/10 transition-all ${isTransparent ? 'hover:text-white' : 'hover:text-blue-600 hover:bg-blue-50'}`} to="/marketplace">
            Marketplace
          </Link>
          <button
            className={`px-4 py-2 rounded-full hover:bg-black/10 transition-all ${isTransparent ? 'hover:text-white' : 'hover:text-blue-600 hover:bg-blue-50'}`}
            onClick={() => handleSectionClick('how-it-works')}
          >
            How it Works
          </button>
          <Link
            className={`px-4 py-2 rounded-full hover:bg-black/10 transition-all ${isTransparent ? 'hover:text-white' : 'hover:text-blue-600 hover:bg-blue-50'}`}
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
                className={`flex items-center space-x-3 px-2 py-1.5 rounded-full border transition-all duration-300 ${isTransparent
                  ? 'bg-white/10 border-white/20 text-white hover:bg-white/20'
                  : 'bg-white border-gray-200 text-gray-700 hover:border-blue-300 hover:shadow-md'
                  }`}
              >
                <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-full flex items-center justify-center font-bold text-sm shadow-sm">
                  {getInitials(user.name)}
                </div>
                <span className="font-semibold text-sm pr-2">{user.name}</span>
                <span className={`material-icons text-lg transition-transform duration-300 ${showDropdown ? 'rotate-180' : ''}`}>expand_more</span>
              </button>

              {/* Dropdown Menu */}
              {showDropdown && (
                <div className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-xl py-1.5 z-50 border border-gray-100 transform origin-top-right transition-all">
                  <div className="px-4 py-2.5 border-b border-gray-100 bg-gray-50/50 rounded-t-xl">
                    <p className="text-sm font-bold text-gray-900 truncate">{user.name}</p>
                    <p className="text-xs text-gray-500 font-medium truncate">{user.email}</p>
                  </div>
                  <div className="p-1 space-y-0.5">
                    <Link
                      to="/profile"
                      className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-all"
                      onClick={() => setShowDropdown(false)}
                    >
                      <span className="material-icons text-base">person</span>
                      <span className="font-medium text-sm">My Profile</span>
                    </Link>
                    <Link
                      to="/my-bookings"
                      className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-all"
                      onClick={() => setShowDropdown(false)}
                    >
                      <span className="material-icons text-base">history</span>
                      <span className="font-medium text-sm">My Bookings</span>
                    </Link>
                    <Link
                      to="/add-car"
                      className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-all"
                      onClick={() => setShowDropdown(false)}
                    >
                      <span className="material-icons text-base">add_circle</span>
                      <span className="font-medium text-sm">List Your Car</span>
                    </Link>
                    <Link
                      to="/my-cars"
                      className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-all"
                      onClick={() => setShowDropdown(false)}
                    >
                      <span className="material-icons text-base">directions_car</span>
                      <span className="font-medium text-sm">My Cars</span>
                    </Link>
                  </div>
                  <div className="border-t border-gray-100 mt-1 pt-1 px-1">
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center space-x-2 px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-all text-left"
                    >
                      <span className="material-icons text-base">logout</span>
                      <span className="font-medium text-sm">Logout</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className={`px-6 py-2.5 rounded-full font-bold text-sm transition-all shadow-lg transform hover:-translate-y-0.5 ${isTransparent
                ? 'bg-white text-blue-900 hover:bg-gray-100 shadow-black/20'
                : 'bg-blue-600 text-white hover:bg-blue-700 shadow-blue-600/30'
                }`}
            >
              Login / Signup
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className={`md:hidden p-2 rounded-xl transition-colors ${isTransparent ? 'text-white hover:bg-white/10' : 'text-gray-800 hover:bg-gray-100'}`}
          onClick={toggleMobileMenu}
        >
          <span className="material-icons text-3xl">
            {isMobileMenuOpen ? 'close' : 'menu'}
          </span>
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-xl border-t border-gray-100 absolute w-full left-0 z-50 animate-fade-in-down">
          <div className="container mx-auto px-4 py-6 flex flex-col space-y-2">
            <Link
              className="px-4 py-3 text-gray-700 font-medium hover:bg-gray-50 rounded-xl transition-colors flex items-center gap-3"
              to="/"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <span className="material-icons text-gray-400">home</span>
              Home
            </Link>
            <button
              className="px-4 py-3 text-gray-700 font-medium hover:bg-gray-50 rounded-xl transition-colors text-left flex items-center gap-3"
              onClick={() => {
                handleSectionClick('how-it-works');
                setIsMobileMenuOpen(false);
              }}
            >
              <span className="material-icons text-gray-400">info</span>
              How it Works
            </button>
            <Link
              className="px-4 py-3 text-gray-700 font-medium hover:bg-gray-50 rounded-xl transition-colors flex items-center gap-3"
              to="/become-host"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <span className="material-icons text-gray-400">volunteer_activism</span>
              Become a Host
            </Link>
            <button
              className="px-4 py-3 text-gray-700 font-medium hover:bg-gray-50 rounded-xl transition-colors text-left flex items-center gap-3"
              onClick={() => {
                handleSectionClick('why-choose-us');
                setIsMobileMenuOpen(false);
              }}
            >
              <span className="material-icons text-gray-400">verified</span>
              Why Choose Us
            </button>

            <div className="border-t border-gray-100 my-2 pt-2"></div>

            {isAuthenticated && user ? (
              <>
                <Link
                  className="px-4 py-3 text-gray-700 font-medium hover:bg-gray-50 rounded-xl transition-colors flex items-center gap-3"
                  to="/profile"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span className="material-icons text-gray-400">person</span>
                  My Profile
                </Link>
                <Link
                  className="px-4 py-3 text-gray-700 font-medium hover:bg-gray-50 rounded-xl transition-colors flex items-center gap-3"
                  to="/my-bookings"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span className="material-icons text-gray-400">history</span>
                  My Bookings
                </Link>
                <Link
                  className="px-4 py-3 text-gray-700 font-medium hover:bg-gray-50 rounded-xl transition-colors flex items-center gap-3"
                  to="/my-cars"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span className="material-icons text-gray-400">directions_car</span>
                  My Cars
                </Link>
                <button
                  className="mt-4 w-full bg-red-50 text-red-600 px-6 py-3 rounded-xl font-bold hover:bg-red-100 transition-colors flex items-center justify-center gap-2"
                  onClick={() => {
                    handleLogout();
                    setIsMobileMenuOpen(false);
                  }}
                >
                  <span className="material-icons">logout</span>
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="mt-4 w-full bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 transition-colors text-center shadow-lg shadow-blue-600/30"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Login / Signup
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
