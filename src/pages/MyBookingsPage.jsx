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
    <div className="min-h-screen bg-gray-50 font-sans">
      <Header />
      <main className="py-12 pb-20">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Page Header */}
          <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">My Bookings</h1>
              <p className="text-lg text-gray-500">View and manage your car rental journeys</p>
            </div>

            {/* Summary Stats Small */}
            <div className="flex gap-4">
              <div className="bg-white px-6 py-3 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
                  <span className="material-icons text-blue-600">schedule</span>
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Upcoming</p>
                  <p className="text-xl font-bold text-gray-900">{bookings.filter(b => getBookingCategory(b) === 'upcoming').length}</p>
                </div>
              </div>
              <div className="bg-white px-6 py-3 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-3 hidden md:flex">
                <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center">
                  <span className="material-icons text-green-600">check_circle</span>
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Completed</p>
                  <p className="text-xl font-bold text-gray-900">{bookings.filter(b => getBookingCategory(b) === 'past').length}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-8 p-4 bg-red-50 border border-red-200 text-red-800 rounded-2xl flex items-center gap-2">
              <span className="material-icons">error</span>
              {error}
            </div>
          )}

          {/* Tabs */}
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 mb-8 p-1.5 inline-flex">
            <button
              onClick={() => setActiveTab('upcoming')}
              className={`py-3 px-8 rounded-2xl font-bold text-sm transition-all duration-300 ${activeTab === 'upcoming'
                  ? 'bg-gray-900 text-white shadow-lg'
                  : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                }`}
            >
              Upcoming
            </button>
            <button
              onClick={() => setActiveTab('past')}
              className={`py-3 px-8 rounded-2xl font-bold text-sm transition-all duration-300 ${activeTab === 'past'
                  ? 'bg-gray-900 text-white shadow-lg'
                  : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                }`}
            >
              Past
            </button>
            <button
              onClick={() => setActiveTab('cancelled')}
              className={`py-3 px-8 rounded-2xl font-bold text-sm transition-all duration-300 ${activeTab === 'cancelled'
                  ? 'bg-gray-900 text-white shadow-lg'
                  : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                }`}
            >
              Cancelled
            </button>
          </div>

          {/* Bookings List */}
          {filteredBookings.length === 0 ? (
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-16 text-center">
              <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="material-icons text-5xl text-gray-300">directions_car</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                No {activeTab} bookings
              </h3>
              <p className="text-gray-500 mb-8 max-w-md mx-auto">
                {activeTab === 'upcoming'
                  ? "You don't have any upcoming trips scheduled. Ready to hit the road?"
                  : `You don't have any ${activeTab} bookings in your history.`}
              </p>
              {activeTab === 'upcoming' && (
                <button
                  onClick={() => navigate('/marketplace')}
                  className="px-8 py-3 bg-blue-600 text-white rounded-xl font-bold shadow-lg shadow-blue-600/30 hover:bg-blue-700 hover:shadow-blue-600/40 transition-all transform hover:-translate-y-0.5"
                >
                  Browse Cars
                </button>
              )}
            </div>
          ) : (
            <div className="space-y-6">
              {filteredBookings.map((booking) => (
                <div key={booking._id} className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden hover:shadow-2xl hover:border-blue-100 transition-all duration-300 group">
                  <div className="flex flex-col md:flex-row">
                    {/* Car Image */}
                    <div className="md:w-1/3 relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10 md:hidden"></div>
                      <img
                        src={booking.car?.images?.[0] || '/placeholder-car.jpg'}
                        alt={`${booking.car?.brand} ${booking.car?.model}`}
                        className="w-full h-64 md:h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute top-4 left-4 z-20">
                        <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm backdrop-blur-md ${booking.status === 'confirmed' || booking.status === 'active' ? 'bg-blue-500/90 text-white' :
                            booking.status === 'completed' ? 'bg-green-500/90 text-white' :
                              'bg-red-500/90 text-white'
                          }`}>
                          {booking.status}
                        </span>
                      </div>
                    </div>

                    {/* Booking Details */}
                    <div className="flex-1 p-8">
                      <div className="flex justify-between items-start mb-6">
                        <div>
                          <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">{booking.car?.category}</p>
                          <h3 className="text-3xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                            {booking.car?.brand} {booking.car?.model}
                          </h3>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-gray-500 mb-1">Total Cost</p>
                          <p className="text-3xl font-bold text-gray-900">₹{booking.totalAmount}</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100 group-hover:bg-blue-50/50 group-hover:border-blue-100 transition-colors">
                          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm shrink-0">
                            <span className="material-icons text-blue-600">event_available</span>
                          </div>
                          <div>
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Dates</p>
                            <p className="font-bold text-gray-900">{formatDate(booking.startDate)}</p>
                            <p className="text-sm text-gray-500">to {formatDate(booking.endDate)}</p>
                          </div>
                        </div>

                        <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100 group-hover:bg-blue-50/50 group-hover:border-blue-100 transition-colors">
                          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm shrink-0">
                            <span className="material-icons text-blue-600">location_on</span>
                          </div>
                          <div>
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">City</p>
                            <p className="font-bold text-gray-900">{booking.car?.location?.city || 'N/A'}</p>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-gray-100">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-600">
                            {booking.host?.fullName?.charAt(0) || 'H'}
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Hosted by</p>
                            <p className="text-sm font-bold text-gray-900">{booking.host?.fullName || 'Host'}</p>
                          </div>
                        </div>

                        <div className="flex gap-3">
                          <button className="px-5 py-2.5 border-2 border-gray-200 text-gray-700 font-bold rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all">
                            Details
                          </button>
                          {(booking.status === 'confirmed' || booking.status === 'pending') && (
                            <button
                              onClick={() => handleCancelBooking(booking._id)}
                              className="px-5 py-2.5 bg-white border-2 border-red-100 text-red-600 font-bold rounded-xl hover:bg-red-50 hover:border-red-200 transition-all"
                            >
                              Cancel
                            </button>
                          )}
                          {booking.status === 'completed' && (
                            <button
                              onClick={() => navigate(`/car/${booking.car?._id}`)}
                              className="px-5 py-2.5 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-600/20 transition-all"
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
        </div>
      </main>
    </div>
  );
};

export default MyBookingsPage;
