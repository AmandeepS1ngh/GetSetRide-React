import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/common/Header';
import authService from '../services/auth';
import { getMyBookings, getBookingStats, cancelBooking } from '../services/bookings';

const MyBookingsPage = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('upcoming'); // upcoming, past, cancelled
  const [error, setError] = useState('');
  const [stats, setStats] = useState({
    upcomingTrips: 0,
    completedTrips: 0,
    totalSpent: 0
  });

  useEffect(() => {
    const checkAuthAndFetchBookings = async () => {
      if (!authService.checkAuth()) {
        navigate('/login');
        return;
      }

      try {
        // Fetch real bookings from API
        const data = await getMyBookings();
        setBookings(data.bookings || []);

        // Fetch stats
        const statsData = await getBookingStats();
        setStats(statsData.stats || stats);
      } catch (err) {
        setError('Failed to load bookings. Please try again.');
        console.error('Error fetching bookings:', err);
      } finally {
        setLoading(false);
      }
    };

    checkAuthAndFetchBookings();
  }, [navigate]);

  const handleCancelBooking = async (bookingId) => {
    if (!confirm('Are you sure you want to cancel this booking?')) return;

    try {
      await cancelBooking(bookingId, 'Cancelled by user');
      // Refresh bookings
      const data = await getMyBookings();
      setBookings(data.bookings || []);
    } catch (err) {
      alert('Failed to cancel booking: ' + err.message);
    }
  };

  // Helper function to determine booking status based on dates
  const getBookingCategory = (booking) => {
    if (booking.status === 'cancelled') return 'cancelled';
    
    const now = new Date();
    const endDate = new Date(booking.endDate);
    const startDate = new Date(booking.startDate);
    
    if (booking.status === 'completed' || endDate < now) return 'past';
    if (startDate > now || booking.status === 'confirmed' || booking.status === 'active') return 'upcoming';
    
    return 'past';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
      case 'active':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const calculateDays = (start, end) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const diffTime = Math.abs(endDate - startDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  // Filter bookings based on tab and dates
  const filteredBookings = bookings.filter(booking => {
    const category = getBookingCategory(booking);
    return category === activeTab;
  });

  if (loading) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--primary-color)] mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading your bookings...</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">My Bookings</h1>
            <p className="text-gray-600">View and manage your car rental bookings</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-800 rounded-lg">
              {error}
            </div>
          )}

          {/* Tabs */}
          <div className="bg-white rounded-lg shadow-md mb-6">
            <div className="flex border-b">
              <button
                onClick={() => setActiveTab('upcoming')}
                className={`flex-1 py-4 px-6 text-center font-medium transition ${
                  activeTab === 'upcoming'
                    ? 'border-b-2 border-[var(--primary-color)] text-[var(--primary-color)]'
                    : 'text-gray-600 hover:text-[var(--primary-color)]'
                }`}
              >
                Upcoming ({bookings.filter(b => getBookingCategory(b) === 'upcoming').length})
              </button>
              <button
                onClick={() => setActiveTab('past')}
                className={`flex-1 py-4 px-6 text-center font-medium transition ${
                  activeTab === 'past'
                    ? 'border-b-2 border-[var(--primary-color)] text-[var(--primary-color)]'
                    : 'text-gray-600 hover:text-[var(--primary-color)]'
                }`}
              >
                Past ({bookings.filter(b => getBookingCategory(b) === 'past').length})
              </button>
              <button
                onClick={() => setActiveTab('cancelled')}
                className={`flex-1 py-4 px-6 text-center font-medium transition ${
                  activeTab === 'cancelled'
                    ? 'border-b-2 border-[var(--primary-color)] text-[var(--primary-color)]'
                    : 'text-gray-600 hover:text-[var(--primary-color)]'
                }`}
              >
                Cancelled ({bookings.filter(b => getBookingCategory(b) === 'cancelled').length})
              </button>
            </div>
          </div>

          {/* Bookings List */}
          {filteredBookings.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-12 text-center">
              <div className="text-6xl mb-4">🚗</div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                No {activeTab} bookings
              </h3>
              <p className="text-gray-600 mb-6">
                {activeTab === 'upcoming' 
                  ? "You don't have any upcoming trips. Start exploring cars!"
                  : `You don't have any ${activeTab} bookings.`}
              </p>
              {activeTab === 'upcoming' && (
                <button
                  onClick={() => navigate('/marketplace')}
                  className="px-6 py-3 bg-[var(--primary-color)] text-white rounded-lg hover:bg-[var(--primary-hover-color)] transition"
                >
                  Browse Cars
                </button>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredBookings.map((booking) => (
                <div key={booking._id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition overflow-hidden">
                  <div className="flex flex-col md:flex-row">
                    {/* Car Image */}
                    <div className="md:w-1/3">
                      <img
                        src={booking.car?.images?.[0] || '/placeholder-car.jpg'}
                        alt={`${booking.car?.brand} ${booking.car?.model}`}
                        className="w-full h-48 md:h-full object-cover"
                      />
                    </div>

                    {/* Booking Details */}
                    <div className="flex-1 p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-2xl font-bold text-gray-800 mb-1">
                            {booking.car?.brand} {booking.car?.model}
                          </h3>
                          <p className="text-gray-600">{booking.car?.category}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(booking.status)}`}>
                          {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div className="flex items-center text-gray-700">
                          <svg className="w-5 h-5 mr-2 text-[var(--primary-color)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <span>{formatDate(booking.startDate)} - {formatDate(booking.endDate)}</span>
                        </div>
                        <div className="flex items-center text-gray-700">
                          <svg className="w-5 h-5 mr-2 text-[var(--primary-color)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <span>{booking.car?.location?.city || 'N/A'}</span>
                        </div>
                        <div className="flex items-center text-gray-700">
                          <svg className="w-5 h-5 mr-2 text-[var(--primary-color)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                          <span>Host: {booking.host?.fullName || 'Host'}</span>
                        </div>
                        <div className="flex items-center text-gray-700">
                          <svg className="w-5 h-5 mr-2 text-[var(--primary-color)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span>{calculateDays(booking.startDate, booking.endDate)} days</span>
                        </div>
                      </div>

                      <div className="flex justify-between items-center pt-4 border-t">
                        <div>
                          <p className="text-sm text-gray-500">Total Cost</p>
                          <p className="text-2xl font-bold text-[var(--primary-color)]">
                            ₹{booking.totalAmount}
                          </p>
                        </div>
                        <div className="flex space-x-3">
                          <button className="px-4 py-2 border border-[var(--primary-color)] text-[var(--primary-color)] rounded-lg hover:bg-blue-50 transition">
                            View Details
                          </button>
                          {(booking.status === 'confirmed' || booking.status === 'pending') && (
                            <button 
                              onClick={() => handleCancelBooking(booking._id)}
                              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                            >
                              Cancel Booking
                            </button>
                          )}
                          {booking.status === 'completed' && (
                            <button 
                              onClick={() => navigate(`/car/${booking.car?._id}`)}
                              className="px-4 py-2 bg-[var(--primary-color)] text-white rounded-lg hover:bg-[var(--primary-hover-color)] transition"
                            >
                              Book Again
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Summary Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="text-4xl font-bold text-[var(--primary-color)]">
                {bookings.filter(b => getBookingCategory(b) === 'upcoming').length}
              </div>
              <div className="text-gray-600 mt-2">Upcoming Trips</div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="text-4xl font-bold text-green-600">
                {bookings.filter(b => getBookingCategory(b) === 'past').length}
              </div>
              <div className="text-gray-600 mt-2">Completed Trips</div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="text-4xl font-bold text-purple-600">
                ₹{bookings.filter(b => getBookingCategory(b) === 'past').reduce((sum, b) => sum + b.totalAmount, 0)}
              </div>
              <div className="text-gray-600 mt-2">Total Spent</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyBookingsPage;
