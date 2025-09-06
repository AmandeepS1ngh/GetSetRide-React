import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/common/Header';

const CarDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedDates, setSelectedDates] = useState({
    fromDate: '',
    toDate: ''
  });
  const [showBookingModal, setShowBookingModal] = useState(false);

  // Sample car data - replace with actual API call
  const car = {
    id: 2,
    name: 'Chevrolet Camaro',
    price: 5000,
    imageUrl: 'https://bringatrailer.com/wp-content/uploads/2022/08/1969_chevrolet_camaro_TED76715-36983.jpg?w=620&resize=620%2C413',
    transmission: 'Manual',
    fuelType: 'Petrol',
    seats: 4,
    distance: 5.0,
    available: true,
    location: 'Downtown, Los Angeles',
    type: 'Sports Car',
    year: 2021,
    mileage: '12.0 km/l',
    rating: 4.9,
    reviews: 45,
    description: 'Experience the thrill of driving a Chevrolet Camaro. This iconic sports car offers unmatched performance, sleek design, and advanced features. Perfect for road trips and special occasions. Comes with full insurance and is meticulously maintained.',
    features: [
      'AC', 'Premium Audio', 'GPS', 'Heated Seats'
    ],
    specifications: [
      { icon: 'local_gas_station', label: 'Fuel Type', value: 'Petrol' },
      { icon: 'settings', label: 'Transmission', value: 'Manual' },
      { icon: 'airline_seat_recline_normal', label: 'Seats', value: '4 Seater' },
      { icon: 'speed', label: 'Mileage', value: '12.0 km/l' }
    ],
    pickupInstructions: [
      'Pickup location: Downtown, Los Angeles',
      'Host will meet you at the designated parking area',
      'Please bring valid driving license and ID proof',
      'Vehicle inspection will be done together before handover'
    ],
    restrictions: [
      'No smoking inside the vehicle',
      'No pets allowed',
      'No modifications to the car',
      'Return with the same fuel level'
    ],
    cancellationPolicy: [
      'Free cancellation up to 48 hours before',
      '50% refund if cancelled 24-48 hours before',
      'No refund if cancelled within 24 hours'
    ],
    owner: {
      name: 'Michael Johnson',
      rating: 4.9,
      memberSince: '2020',
      verified: true,
      avatarUrl: 'https://ui-avatars.com/api/?name=Michael+Johnson&background=2563eb&color=fff'
    },
    images: [
      'https://bringatrailer.com/wp-content/uploads/2022/08/1969_chevrolet_camaro_TED76715-36983.jpg?w=620&resize=620%2C413',
      'https://www.pcarmarket.com/static/media/uploads/galleries/photos/uploads/galleries/42907-amato-1969-chevrolet-camaro-ss-ls3/.thumbnails/camaro_grey_20240506_-_004.webp/camaro_grey_20240506_-_004-tiny-1200x0.webp',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuhpzBbMuTONkU9XmXJCltsBwLCh1B5uX5VQ&s',
      'https://i.pinimg.com/736x/08/a5/27/08a527ee1ac4dbc4fc80a7460ace9247.jpg'
    ]
  };

  const [mainImage, setMainImage] = useState(car.images[0]);

  const calculateTotal = () => {
    if (!selectedDates.fromDate || !selectedDates.toDate) return { days: 0, total: 0 };
    
    const fromDate = new Date(selectedDates.fromDate);
    const toDate = new Date(selectedDates.toDate);
    const timeDiff = toDate.getTime() - fromDate.getTime();
    const days = Math.ceil(timeDiff / (1000 * 3600 * 24));
    
    return days > 0 ? { days, total: days * car.price } : { days: 0, total: 0 };
  };

  const checkAvailability = () => {
    if (!selectedDates.fromDate || !selectedDates.toDate) {
      alert('Please select both dates');
      return;
    }
    
    // Simulate availability check
    setTimeout(() => {
      setShowBookingModal(true);
    }, 1000);
  };

  const confirmBooking = () => {
    alert('Booking confirmed! Redirecting to payment...');
    setShowBookingModal(false);
    navigate('/marketplace');
  };

  const { days, total } = calculateTotal();

  return (
    <>
      <Header />
      <main className="bg-gray-50 pt-20">
        <div className="container mx-auto px-4 py-8">
          {/* Breadcrumb */}
          <nav className="mb-6">
            <ol className="flex items-center space-x-2 text-sm text-gray-600">
              <li><a href="/" className="hover:text-[var(--primary-color)]">Home</a></li>
              <li><span className="material-icons text-sm">chevron_right</span></li>
              <li><a href="/marketplace" className="hover:text-[var(--primary-color)]">Cars</a></li>
              <li><span className="material-icons text-sm">chevron_right</span></li>
              <li className="text-gray-900 font-medium">{car.name}</li>
            </ol>
          </nav>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Car Details */}
            <div className="lg:col-span-2">
              {/* 1. Car Overview Section */}
              <section className="bg-white rounded-lg shadow-md p-6 mb-6">
                <div className="mb-4">
                  <h1 className="text-3xl font-bold text-gray-900">{car.name}</h1>
                  <div className="flex items-center mt-2 space-x-4">
                    <div className="flex items-center">
                      <span className="material-icons text-yellow-500 text-sm">star</span>
                      <span className="font-semibold ml-1">{car.rating}</span>
                      <span className="text-gray-600 ml-1">({car.reviews} reviews)</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <span className="material-icons text-sm mr-1">location_on</span>
                      <span>{car.location}</span>
                    </div>
                  </div>
                </div>

                {/* Image Gallery */}
                <div className="image-gallery mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="md:col-span-2">
                    <img 
                      id="mainImage"
                      src={mainImage}
                      alt={`${car.name} Main`}
                      className="w-full h-80 object-cover rounded-lg"
                    />
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-1 gap-2">
                    {car.images.map((image, index) => (
                      <img 
                        key={index}
                        onClick={() => setMainImage(image)}
                        src={image}
                        alt={`${car.name} view ${index + 1}`}
                        className="w-full h-24 object-cover rounded-lg cursor-pointer hover:opacity-75 transition-opacity"
                      />
                    ))}
                  </div>
                </div>
              </section>

              {/* 2. Car Specifications Panel */}
              <section className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h2 className="text-2xl font-bold mb-4">Specifications</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {car.specifications.map((spec, index) => (
                    <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
                      <span className={`material-icons text-[var(--primary-color)] mr-3`}>{spec.icon}</span>
                      <div>
                        <p className="font-semibold">{spec.label}</p>
                        <p className="text-gray-600">{spec.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-4">
                  <h3 className="font-semibold mb-2">Features</h3>
                  <div className="flex flex-wrap gap-2">
                    {car.features.map((feature, index) => (
                      <span key={index} className="bg-blue-100 text-[var(--primary-color)] px-3 py-1 rounded-full text-sm flex items-center">
                        <span className="material-icons text-sm mr-1">
                          {feature === 'AC' ? 'ac_unit' : 
                           feature === 'Premium Audio' ? 'music_note' : 
                           feature === 'GPS' ? 'navigation' : 
                           feature === 'Heated Seats' ? 'whatshot' : 'check'}
                        </span>
                        {feature}
                      </span>
                    ))}
                    <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm">
                      Available
                    </span>
                  </div>
                </div>
              </section>

              {/* 4. Host Information */}
              <section className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h2 className="text-2xl font-bold mb-4">Hosted by</h2>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <img 
                      src={car.owner.avatarUrl}
                      alt="Host" 
                      className="w-16 h-16 rounded-full mr-4"
                    />
                    <div>
                      <h3 className="font-bold text-lg">{car.owner.name}</h3>
                      <p className="text-gray-600">Member since {car.owner.memberSince}</p>
                      {car.owner.verified && (
                        <div className="flex items-center mt-1">
                          <span className="material-icons text-green-500 text-sm mr-1">verified</span>
                          <span className="text-sm text-green-600">Verified Host</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <button className="bg-[var(--primary-color)] text-white px-4 py-2 rounded-lg hover:bg-[var(--primary-hover-color)] transition-colors">
                    Message Host
                  </button>
                </div>
              </section>

              {/* 5. Description & Policies */}
              <section className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h2 className="text-2xl font-bold mb-4">Description</h2>
                <p className="text-gray-700 mb-6">{car.description}</p>

                <h3 className="text-lg font-semibold mb-3">Pickup Instructions</h3>
                <ul className="list-disc list-inside text-gray-700 mb-6 space-y-1">
                  {car.pickupInstructions.map((instruction, index) => (
                    <li key={index}>{instruction}</li>
                  ))}
                </ul>

                <h3 className="text-lg font-semibold mb-3">Rules & Policies</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-red-600 mb-2">Restrictions</h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      {car.restrictions.map((restriction, index) => (
                        <li key={index}>• {restriction}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-green-600 mb-2">Cancellation Policy</h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      {car.cancellationPolicy.map((policy, index) => (
                        <li key={index}>• {policy}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </section>
            </div>

            {/* Right Column - Booking Form */}
            <div className="lg:col-span-1">
              {/* 3. Booking Form */}
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
                <div className="text-center mb-6">
                  <h2 className="text-3xl font-bold text-[var(--primary-color)]">₹{car.price}</h2>
                  <p className="text-gray-600">per day</p>
                </div>

                <form>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">From Date</label>
                      <input 
                        type="date" 
                        value={selectedDates.fromDate}
                        onChange={(e) => setSelectedDates(prev => ({ ...prev, fromDate: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
                        min={new Date().toISOString().split('T')[0]}
                        required 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">To Date</label>
                      <input 
                        type="date" 
                        value={selectedDates.toDate}
                        onChange={(e) => setSelectedDates(prev => ({ ...prev, toDate: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
                        min={selectedDates.fromDate || new Date().toISOString().split('T')[0]}
                        required 
                      />
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span>Daily Rate:</span>
                      <span>₹{car.price}</span>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <span>Total Days:</span>
                      <span>{days}</span>
                    </div>
                    <hr className="my-2" />
                    <div className="flex justify-between items-center font-bold text-lg">
                      <span>Total:</span>
                      <span>₹{total}</span>
                    </div>
                  </div>

                  <button 
                    type="button" 
                    onClick={checkAvailability}
                    className="w-full bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold mb-3 hover:bg-gray-300 transition-colors"
                  >
                    Check Availability
                  </button>

                  <button 
                    type="button" 
                    onClick={() => setShowBookingModal(true)}
                    className="w-full bg-[var(--primary-color)] text-white py-3 rounded-lg font-semibold hover:bg-[var(--primary-hover-color)] transition-colors"
                    disabled={!selectedDates.fromDate || !selectedDates.toDate}
                  >
                    Book Now
                  </button>
                </form>

                <p className="text-xs text-gray-500 text-center mt-4">
                  You won't be charged yet. Review your booking details before confirming.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 6. Booking Confirmation Modal */}
        {showBookingModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
            <div className="flex items-center justify-center min-h-screen p-4">
              <div className="bg-white rounded-lg max-w-md w-full p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold">Confirm Your Booking</h3>
                  <button 
                    onClick={() => setShowBookingModal(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <span className="material-icons">close</span>
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="border-b pb-4">
                    <h4 className="font-semibold">Car Details</h4>
                    <p className="text-gray-600">{car.name}</p>
                    <p className="text-sm text-gray-500">Hosted by {car.owner.name}</p>
                  </div>

                  <div className="border-b pb-4">
                    <h4 className="font-semibold">Rental Period</h4>
                    <p className="text-gray-600">{selectedDates.fromDate} to {selectedDates.toDate}</p>
                    <p className="text-sm text-gray-500">{days} days</p>
                  </div>

                  <div className="border-b pb-4">
                    <h4 className="font-semibold">Price Breakdown</h4>
                    <div className="flex justify-between">
                      <span>Daily rate × {days} days</span>
                      <span>₹{total}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Service fee</span>
                      <span>₹50</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg mt-2">
                      <span>Total</span>
                      <span>₹{total + 50}</span>
                    </div>
                  </div>

                  <div className="flex space-x-3">
                    <button 
                      onClick={() => setShowBookingModal(false)}
                      className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button 
                      onClick={confirmBooking}
                      className="flex-1 bg-[var(--primary-color)] text-white py-2 px-4 rounded-lg hover:bg-[var(--primary-hover-color)] transition-colors"
                    >
                      Confirm Booking
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </>
  );
};

export default CarDetailPage;
