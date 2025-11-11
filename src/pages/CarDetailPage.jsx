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
    <>
      <Header />
      <main className="bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <nav className="mb-6">
            <ol className="flex items-center space-x-2 text-sm text-gray-600">
              <li><a href="/" className="hover:text-[var(--primary-color)]">Home</a></li>
              <li><span>/</span></li>
              <li><a href="/marketplace" className="hover:text-[var(--primary-color)]">Cars</a></li>
              <li><span>/</span></li>
              <li className="text-gray-900 font-medium">{car.brand} {car.model}</li>
            </ol>
          </nav>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Car Details */}
            <div className="lg:col-span-2">
              {/* Car Overview */}
              <section className="bg-white rounded-lg shadow-md p-6 mb-6">
                <div className="mb-4">
                  <h1 className="text-3xl font-bold text-gray-900">{car.brand} {car.model}</h1>
                  <div className="flex items-center mt-2 space-x-4">
                    <div className="flex items-center">
                      <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="font-semibold ml-1">{car.rating?.average || 0}</span>
                      <span className="text-gray-600 ml-1">({car.rating?.count || 0} reviews)</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      </svg>
                      <span>{car.location?.city}, {car.location?.state}</span>
                    </div>
                  </div>
                </div>

                {/* Image Gallery */}
                <div className="mb-6">
                  <div className="mb-4">
                    <img 
                      src={mainImage || car.images?.[0] || '/placeholder-car.jpg'}
                      alt={`${car.brand} ${car.model}`}
                      className="w-full h-96 object-cover rounded-lg"
                    />
                  </div>
                  {car.images && car.images.length > 1 && (
                    <div className="grid grid-cols-4 gap-2">
                      {car.images.slice(0, 4).map((image, index) => (
                        <img 
                          key={index}
                          onClick={() => setMainImage(image)}
                          src={image}
                          alt={`View ${index + 1}`}
                          className={`w-full h-24 object-cover rounded-lg cursor-pointer hover:opacity-75 transition ${
                            mainImage === image ? 'ring-2 ring-[var(--primary-color)]' : ''
                          }`}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </section>

              {/* Specifications */}
              <section className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h2 className="text-2xl font-bold mb-4">Specifications</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                    <svg className="w-6 h-6 text-[var(--primary-color)] mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    <div>
                      <p className="font-semibold">Category</p>
                      <p className="text-gray-600">{car.category}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                    <svg className="w-6 h-6 text-[var(--primary-color)] mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                    </svg>
                    <div>
                      <p className="font-semibold">Transmission</p>
                      <p className="text-gray-600">{car.transmission}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                    <svg className="w-6 h-6 text-[var(--primary-color)] mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    <div>
                      <p className="font-semibold">Fuel Type</p>
                      <p className="text-gray-600">{car.fuelType}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                    <svg className="w-6 h-6 text-[var(--primary-color)] mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <div>
                      <p className="font-semibold">Seats</p>
                      <p className="text-gray-600">{car.seats} Seater</p>
                    </div>
                  </div>
                </div>
                
                {/* Features */}
                {car.features && car.features.length > 0 && (
                  <div className="mt-6">
                    <h3 className="font-semibold mb-3">Features</h3>
                    <div className="flex flex-wrap gap-2">
                      {car.features.map((feature, index) => (
                        <span key={index} className="bg-blue-100 text-[var(--primary-color)] px-3 py-1 rounded-full text-sm">
                          {feature}
                        </span>
                      ))}
                      <span className={`px-3 py-1 rounded-full text-sm ${
                        car.isActive ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                      }`}>
                        {car.isActive ? 'Available' : 'Not Available'}
                      </span>
                    </div>
                  </div>
                )}
              </section>

              {/* Description */}
              {car.description && (
                <section className="bg-white rounded-lg shadow-md p-6 mb-6">
                  <h2 className="text-2xl font-bold mb-4">Description</h2>
                  <p className="text-gray-700">{car.description}</p>
                </section>
              )}

              {/* Host Information */}
              <section className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h2 className="text-2xl font-bold mb-4">Hosted by</h2>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-16 h-16 bg-[var(--primary-color)] text-white rounded-full flex items-center justify-center text-xl font-bold mr-4">
                      {car.host?.fullName?.charAt(0) || 'H'}
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">{car.host?.fullName || 'Host'}</h3>
                      <p className="text-gray-600">{car.host?.email || ''}</p>
                    </div>
                  </div>
                  <button className="bg-[var(--primary-color)] text-white px-4 py-2 rounded-lg hover:bg-[var(--primary-hover-color)] transition">
                    Contact Host
                  </button>
                </div>
              </section>
            </div>

            {/* Right Column - Booking Form */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
                <div className="text-center mb-6">
                  <h2 className="text-3xl font-bold text-[var(--primary-color)]">₹{car.pricePerDay}</h2>
                  <p className="text-gray-600">per day</p>
                </div>

                <form onSubmit={(e) => { e.preventDefault(); handleBookNow(); }}>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
                    <input 
                      type="date" 
                      value={selectedDates.startDate}
                      onChange={(e) => setSelectedDates(prev => ({ ...prev, startDate: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
                      min={new Date().toISOString().split('T')[0]}
                      required 
                    />
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
                    <input 
                      type="date" 
                      value={selectedDates.endDate}
                      onChange={(e) => setSelectedDates(prev => ({ ...prev, endDate: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
                      min={selectedDates.startDate || new Date().toISOString().split('T')[0]}
                      required 
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Pickup Time</label>
                      <input 
                        type="time" 
                        value={selectedDates.pickupTime}
                        onChange={(e) => setSelectedDates(prev => ({ ...prev, pickupTime: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
                        required 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Dropoff Time</label>
                      <input 
                        type="time" 
                        value={selectedDates.dropoffTime}
                        onChange={(e) => setSelectedDates(prev => ({ ...prev, dropoffTime: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
                        required 
                      />
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span>₹{car.pricePerDay} × {days} days</span>
                      <span>₹{total}</span>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <span>Service fee</span>
                      <span>₹{serviceFee}</span>
                    </div>
                    <hr className="my-2" />
                    <div className="flex justify-between items-center font-bold text-lg">
                      <span>Total</span>
                      <span>₹{grandTotal}</span>
                    </div>
                  </div>

                  <button 
                    type="submit"
                    className="w-full bg-[var(--primary-color)] text-white py-3 rounded-lg font-semibold hover:bg-[var(--primary-hover-color)] transition disabled:bg-gray-400 disabled:cursor-not-allowed"
                    disabled={!selectedDates.startDate || !selectedDates.endDate || !car.isActive}
                  >
                    {car.isActive ? 'Book Now' : 'Not Available'}
                  </button>
                </form>

                <p className="text-xs text-gray-500 text-center mt-4">
                  You won't be charged yet. Review your booking details before confirming.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Booking Confirmation Modal */}
        {showBookingModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg max-w-md w-full p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">Confirm Your Booking</h3>
                <button 
                  onClick={() => setShowBookingModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-4">
                <div className="border-b pb-4">
                  <h4 className="font-semibold">Car Details</h4>
                  <p className="text-gray-600">{car.brand} {car.model}</p>
                  <p className="text-sm text-gray-500">{car.year} • {car.category}</p>
                </div>

                <div className="border-b pb-4">
                  <h4 className="font-semibold">Rental Period</h4>
                  <p className="text-gray-600">{selectedDates.startDate} to {selectedDates.endDate}</p>
                  <p className="text-sm text-gray-500">{days} days</p>
                  <p className="text-sm text-gray-500">Pickup: {selectedDates.pickupTime} | Dropoff: {selectedDates.dropoffTime}</p>
                </div>

                <div className="border-b pb-4">
                  <h4 className="font-semibold">Price Breakdown</h4>
                  <div className="flex justify-between text-sm">
                    <span>Daily rate × {days} days</span>
                    <span>₹{total}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Service fee (5%)</span>
                    <span>₹{serviceFee}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg mt-2">
                    <span>Total</span>
                    <span>₹{grandTotal}</span>
                  </div>
                </div>

                <div className="flex space-x-3">
                  <button 
                    onClick={() => setShowBookingModal(false)}
                    className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition"
                    disabled={bookingLoading}
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={confirmBooking}
                    className="flex-1 bg-[var(--primary-color)] text-white py-2 px-4 rounded-lg hover:bg-[var(--primary-hover-color)] transition disabled:bg-gray-400"
                    disabled={bookingLoading}
                  >
                    {bookingLoading ? 'Processing...' : 'Confirm Booking'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
};

export default CarDetailPage;
