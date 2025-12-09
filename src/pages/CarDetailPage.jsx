import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import { getCar } from '../services/cars';
import { createBooking } from '../services/bookings';
import authService from '../services/auth';

const CarDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [mainImage, setMainImage] = useState('');
  const [selectedDates, setSelectedDates] = useState({
    startDate: '',
    endDate: '',
    pickupTime: '10:00',
    dropoffTime: '10:00'
  });
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [bookingLoading, setBookingLoading] = useState(false);

  useEffect(() => {
    fetchCarDetails();
  }, [id]);

  const fetchCarDetails = async () => {
    try {
      setLoading(true);
      setError('');

      console.log('Fetching car details for ID:', id);
      const carData = await getCar(id);

      console.log('Car data received:', carData);

      if (!carData) {
        throw new Error('Car not found');
      }

      setCar(carData);

      // Set main image
      if (carData.images && carData.images.length > 0) {
        setMainImage(carData.images[0]);
      }

    } catch (err) {
      console.error('Error fetching car:', err);
      setError(err.message || 'Failed to load car details');
    } finally {
      setLoading(false);
    }
  };

  const calculateTotal = () => {
    if (!selectedDates.startDate || !selectedDates.endDate || !car) {
      return { days: 0, total: 0, serviceFee: 0, grandTotal: 0 };
    }

    const fromDate = new Date(selectedDates.startDate);
    const toDate = new Date(selectedDates.endDate);
    const timeDiff = toDate.getTime() - fromDate.getTime();
    const days = Math.ceil(timeDiff / (1000 * 3600 * 24));

    if (days <= 0) {
      return { days: 0, total: 0, serviceFee: 0, grandTotal: 0 };
    }

    const total = days * car.pricePerDay;
    const serviceFee = Math.round(total * 0.05); // 5% service fee
    const grandTotal = total + serviceFee;

    return { days, total, serviceFee, grandTotal };
  };

  const handleBookNow = async () => {
    // Check if user is logged in
    if (!authService.checkAuth()) {
      alert('Please login to book this car');
      navigate('/login');
      return;
    }

    // Validate dates
    if (!selectedDates.startDate || !selectedDates.endDate) {
      alert('Please select both start and end dates');
      return;
    }

    const { days } = calculateTotal();
    if (days <= 0) {
      alert('End date must be after start date');
      return;
    }

    setShowBookingModal(true);
  };

  const confirmBooking = async () => {
    try {
      setBookingLoading(true);

      const { days, grandTotal } = calculateTotal();

      const bookingData = {
        carId: car._id,
        startDate: selectedDates.startDate,
        endDate: selectedDates.endDate,
        pickupTime: selectedDates.pickupTime,
        dropoffTime: selectedDates.dropoffTime
      };

      console.log('Creating booking:', bookingData);
      const response = await createBooking(bookingData);

      console.log('Booking created:', response);

      alert('Booking confirmed! Redirecting to your bookings...');
      setShowBookingModal(false);
      navigate('/my-bookings');

    } catch (err) {
      console.error('Booking error:', err);
      alert(err.message || 'Failed to create booking. Please try again.');
    } finally {
      setBookingLoading(false);
    }
  };

  const { days, total, serviceFee, grandTotal } = calculateTotal();

  if (loading) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--primary-color)] mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading car details...</p>
          </div>
        </div>
      </>
    );
  }

  if (error || !car) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <div className="text-6xl mb-4">😔</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Car Not Found</h2>
            <p className="text-gray-600 mb-6">{error || 'The car you are looking for does not exist.'}</p>
            <button
              onClick={() => navigate('/marketplace')}
              className="px-6 py-3 bg-[var(--primary-color)] text-white rounded-lg hover:bg-[var(--primary-hover-color)] transition"
            >
              Back to Marketplace
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans flex flex-col">
      <Header />
      <main className="flex-grow pt-8 pb-16">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Breadcrumb */}
          <nav className="mb-8">
            <ol className="flex items-center space-x-2 text-sm text-gray-500 font-medium">
              <li><a href="/" className="hover:text-blue-600 transition-colors">Home</a></li>
              <li><span className="text-gray-300">/</span></li>
              <li><a href="/marketplace" className="hover:text-blue-600 transition-colors">Cars</a></li>
              <li><span className="text-gray-300">/</span></li>
              <li className="text-gray-900">{car.brand} {car.model}</li>
            </ol>
          </nav>

          <div className="grid lg:grid-cols-3 gap-10">
            {/* Left Column - Car Details */}
            <div className="lg:col-span-2 space-y-8">
              {/* Image Gallery */}
              <div className="space-y-4">
                <div className="aspect-w-16 aspect-h-9 w-full">
                  <img
                    src={mainImage || car.images?.[0] || '/placeholder-car.jpg'}
                    alt={`${car.brand} ${car.model}`}
                    className="w-full h-[400px] md:h-[500px] object-cover rounded-3xl shadow-lg"
                  />
                </div>
                {car.images && car.images.length > 1 && (
                  <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                    {car.images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setMainImage(image)}
                        className={`relative flex-shrink-0 w-24 h-24 rounded-2xl overflow-hidden transition-all duration-200 ${mainImage === image ? 'ring-2 ring-blue-600 ring-offset-2' : 'hover:opacity-80'
                          }`}
                      >
                        <img
                          src={image}
                          alt={`View ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Header Info (Mobile Only) */}
              <div className="lg:hidden">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{car.brand} {car.model}</h1>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center">
                    <span className="material-icons text-yellow-500 text-lg mr-1">star</span>
                    <span className="font-bold text-gray-900">{car.rating?.average || 'New'}</span>
                    <span className="text-gray-400 mx-1">•</span>
                    <span>{car.rating?.count || 0} reviews</span>
                  </div>
                  <div className="flex items-center">
                    <span className="material-icons text-gray-400 text-lg mr-1">location_on</span>
                    <span>{car.location?.city}, {car.location?.state}</span>
                  </div>
                </div>
              </div>

              {/* Specifications */}
              <section className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Car Features</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100 flex flex-col items-center text-center">
                    <span className="material-icons text-blue-600 text-2xl mb-2">directions_car</span>
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Type</span>
                    <span className="font-semibold text-gray-900">{car.category}</span>
                  </div>
                  <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100 flex flex-col items-center text-center">
                    <span className="material-icons text-blue-600 text-2xl mb-2">settings</span>
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Transmission</span>
                    <span className="font-semibold text-gray-900">{car.transmission}</span>
                  </div>
                  <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100 flex flex-col items-center text-center">
                    <span className="material-icons text-blue-600 text-2xl mb-2">local_gas_station</span>
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Fuel</span>
                    <span className="font-semibold text-gray-900">{car.fuelType}</span>
                  </div>
                  <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100 flex flex-col items-center text-center">
                    <span className="material-icons text-blue-600 text-2xl mb-2">airline_seat_recline_normal</span>
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Seats</span>
                    <span className="font-semibold text-gray-900">{car.seats} Seats</span>
                  </div>
                </div>

                {car.features && car.features.length > 0 && (
                  <div className="mt-8 pt-8 border-t border-gray-100">
                    <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">Additional Features</h3>
                    <div className="flex flex-wrap gap-3">
                      {car.features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-50 text-gray-700 text-sm font-medium">
                          <span className="material-icons text-green-500 text-base">check_circle</span>
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </section>

              {/* Description */}
              {car.description && (
                <section className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Description</h2>
                  <p className="text-gray-600 leading-relaxed text-lg">{car.description}</p>
                </section>
              )}

              {/* Host Information */}
              <section className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-1">Hosted by {car.host?.fullName || 'Host'}</h2>
                    <p className="text-gray-500">Joined in 2023 • Verified Host</p>
                  </div>
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                    {car.host?.fullName?.charAt(0) || 'H'}
                  </div>
                </div>
                <div className="mt-6 pt-6 border-t border-gray-100 flex items-center gap-4">
                  <button className="px-6 py-3 bg-white border border-gray-300 rounded-xl font-semibold text-gray-700 hover:bg-gray-50 transition-colors">
                    Contact Host
                  </button>
                  <div className="text-sm text-gray-500">
                    <span className="block">Response rate: 100%</span>
                    <span className="block">Response time: within an hour</span>
                  </div>
                </div>
              </section>
            </div>

            {/* Right Column - Booking Form */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 sticky top-24">

                {/* Header for Desktop */}
                <div className="hidden lg:block mb-6 pb-6 border-b border-gray-100">
                  <h1 className="text-2xl font-bold text-gray-900 mb-2">{car.brand} {car.model}</h1>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center">
                      <span className="material-icons text-yellow-500 text-lg mr-1">star</span>
                      <span className="font-bold text-gray-900">{car.rating?.average || 'New'}</span>
                    </div>
                    <span className="text-gray-300">|</span>
                    <div className="flex items-center">
                      <span className="truncate max-w-[150px]">{car.location?.city || 'City'}, {car.location?.state || 'State'}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-4xl font-bold text-blue-600">₹{car.pricePerDay}</span>
                  <span className="text-gray-500 font-medium">/ day</span>
                </div>

                <form onSubmit={(e) => { e.preventDefault(); handleBookNow(); }} className="space-y-4">
                  <div className="bg-gray-50 rounded-2xl p-4 border border-gray-200">
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-xs font-bold text-gray-500 uppercase">Trip Start</label>
                          <input
                            type="date"
                            value={selectedDates.startDate}
                            onChange={(e) => setSelectedDates(prev => ({ ...prev, startDate: e.target.value }))}
                            className="w-full bg-white border border-gray-200 rounded-lg px-2 py-1.5 text-sm focus:ring-2 focus:ring-blue-500"
                            min={new Date().toISOString().split('T')[0]}
                            required
                          />
                          <input
                            type="time"
                            value={selectedDates.pickupTime}
                            onChange={(e) => setSelectedDates(prev => ({ ...prev, pickupTime: e.target.value }))}
                            className="w-full bg-white border border-gray-200 rounded-lg px-2 py-1.5 text-sm focus:ring-2 focus:ring-blue-500 mt-1"
                            required
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-xs font-bold text-gray-500 uppercase">Trip End</label>
                          <input
                            type="date"
                            value={selectedDates.endDate}
                            onChange={(e) => setSelectedDates(prev => ({ ...prev, endDate: e.target.value }))}
                            className="w-full bg-white border border-gray-200 rounded-lg px-2 py-1.5 text-sm focus:ring-2 focus:ring-blue-500"
                            min={selectedDates.startDate || new Date().toISOString().split('T')[0]}
                            required
                          />
                          <input
                            type="time"
                            value={selectedDates.dropoffTime}
                            onChange={(e) => setSelectedDates(prev => ({ ...prev, dropoffTime: e.target.value }))}
                            className="w-full bg-white border border-gray-200 rounded-lg px-2 py-1.5 text-sm focus:ring-2 focus:ring-blue-500 mt-1"
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {days > 0 && (
                    <div className="space-y-3 py-4">
                      <div className="flex justify-between text-gray-600">
                        <span>₹{car.pricePerDay} × {days} days</span>
                        <span>₹{total}</span>
                      </div>
                      <div className="flex justify-between text-gray-600">
                        <span>Service fee</span>
                        <span>₹{serviceFee}</span>
                      </div>
                      <div className="border-t border-gray-100 pt-3 flex justify-between items-center">
                        <span className="font-bold text-gray-900">Total</span>
                        <span className="font-bold text-xl text-gray-900">₹{grandTotal}</span>
                      </div>
                    </div>
                  )}

                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-xl font-bold text-lg hover:shadow-lg hover:shadow-blue-600/30 transition-all transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    disabled={!selectedDates.startDate || !selectedDates.endDate || !car.isActive}
                  >
                    {car.isActive ? 'Book This Car' : 'Not Available'}
                  </button>

                  <div className="text-center">
                    <span className="text-xs text-gray-400 font-medium">You won't be charged yet</span>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* Booking Confirmation Modal */}
        {showBookingModal && (
          <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-md w-full p-8 shadow-2xl transform transition-all scale-100">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900">Confirm Booking</h3>
                <button
                  onClick={() => setShowBookingModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <span className="material-icons text-gray-500">close</span>
                </button>
              </div>

              <div className="space-y-6">
                <div className="bg-gray-50 p-4 rounded-2xl flex gap-4">
                  <img src={mainImage} alt="" className="w-20 h-20 rounded-xl object-cover" />
                  <div>
                    <h4 className="font-bold text-gray-900">{car.brand} {car.model}</h4>
                    <p className="text-sm text-gray-500">{car.year} • {car.category}</p>
                    <div className="flex items-center mt-1 text-xs font-medium bg-green-100 text-green-700 px-2 py-0.5 rounded-full w-fit">
                      <span className="material-icons text-[10px] mr-1">check_circle</span>
                      Free cancellation
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="flex-1 space-y-1">
                      <p className="text-xs font-bold text-gray-400 uppercase">Start</p>
                      <p className="font-semibold text-gray-900">{new Date(selectedDates.startDate).toLocaleDateString()}</p>
                      <p className="text-sm text-gray-500">{selectedDates.pickupTime}</p>
                    </div>
                    <div className="w-[1px] bg-gray-200"></div>
                    <div className="flex-1 space-y-1">
                      <p className="text-xs font-bold text-gray-400 uppercase">End</p>
                      <p className="font-semibold text-gray-900">{new Date(selectedDates.endDate).toLocaleDateString()}</p>
                      <p className="text-sm text-gray-500">{selectedDates.dropoffTime}</p>
                    </div>
                  </div>
                </div>

                <div className="border-t border-b border-gray-100 py-4 space-y-2">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Rate (₹{car.pricePerDay} × {days} days)</span>
                    <span>₹{total}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Service fee</span>
                    <span>₹{serviceFee}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg text-gray-900 pt-2">
                    <span>Total</span>
                    <span>₹{grandTotal}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setShowBookingModal(false)}
                    className="w-full py-3.5 px-4 rounded-xl border border-gray-300 font-bold text-gray-700 hover:bg-gray-50 transition-colors"
                    disabled={bookingLoading}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmBooking}
                    className="w-full py-3.5 px-4 rounded-xl bg-blue-600 font-bold text-white hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20 disabled:bg-gray-400"
                    disabled={bookingLoading}
                  >
                    {bookingLoading ? 'Processing...' : 'Confirm'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default CarDetailPage;
