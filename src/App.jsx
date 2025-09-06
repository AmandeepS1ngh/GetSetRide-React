import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import MarketplacePage from './pages/MarketplacePage';
import CarDetailPage from './pages/CarDetailPage';
import BecomeHostPage from './pages/BecomeHostPage';
import Footer from './components/common/Footer';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/marketplace" element={<MarketplacePage />} />
          <Route path="/car/:id" element={<CarDetailPage />} />
          <Route path="/become-host" element={<BecomeHostPage />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
