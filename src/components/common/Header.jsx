import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isTransparent = location.pathname === '/';
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
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
          <button 
            className="hover:text-[var(--primary-color)] transition-colors" 
            onClick={() => handleSectionClick('how-it-works')}
          >
            How it Work
          </button>
          <Link className="hover:text-[var(--primary-color)] transition-colors" to="/become-host">Become a Host</Link>
          <button 
            className="hover:text-[var(--primary-color)] transition-colors" 
            onClick={() => handleSectionClick('why-choose-us')}
          >
            Why Choose Us
          </button>
        </nav>
        
        {/* Desktop Login Button */}
        <div className="hidden md:block">
          <Link 
            to="/login" 
            className="bg-[var(--primary-color)] text-white px-6 py-2 rounded-lg font-semibold hover:bg-[var(--primary-hover-color)] transition-colors"
          >
            Login / Signup
          </Link>
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
            <Link 
              to="/login" 
              className="bg-[var(--primary-color)] text-white px-6 py-2 rounded-lg font-semibold hover:bg-[var(--primary-hover-color)] transition-colors text-center"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Login / Signup
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
