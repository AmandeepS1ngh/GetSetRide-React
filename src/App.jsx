import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import MarketplacePage from './pages/MarketplacePage_new';
import CarDetailPage from './pages/CarDetailPage';
import BecomeHostPage from './pages/BecomeHostPage';
import ProfilePage from './pages/ProfilePage';
import MyBookingsPage from './pages/MyBookingsPage';
import MyCarsPage from './pages/MyCarsPage';
import AddCarPage from './pages/AddCarPage';
import EditCarPage from './pages/EditCarPage';
import DebugPage from './pages/DebugPage';
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
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/my-bookings" element={<MyBookingsPage />} />
          <Route path="/my-cars" element={<MyCarsPage />} />
          <Route path="/add-car" element={<AddCarPage />} />
          <Route path="/edit-car/:id" element={<EditCarPage />} />
          <Route path="/debug" element={<DebugPage />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
