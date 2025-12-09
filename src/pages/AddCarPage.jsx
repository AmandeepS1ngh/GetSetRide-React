import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/common/Header';
import authService from '../services/auth';
import { createCar } from '../services/cars';

const AddCarPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [imagePreview, setImagePreview] = useState([]);

  const [formData, setFormData] = useState({
    brand: '',
    model: '',
    year: new Date().getFullYear(),
    category: 'Sedan',
    transmission: 'Automatic',
    fuelType: 'Petrol',
    seats: 5,
    pricePerDay: '',
    city: '',
    address: '',
    state: '',
    pincode: '',
    description: '',
    licensePlate: '',
    mileage: 0,
    features: [],
    imageUrls: []
  });

  const [customFeature, setCustomFeature] = useState('');

  const categories = ['Sedan', 'SUV', 'Hatchback', 'Luxury', 'Sports', 'Electric'];
  const transmissionTypes = ['Automatic', 'Manual'];
  const fuelTypes = ['Petrol', 'Diesel', 'Electric', 'Hybrid'];
  const commonFeatures = [
    'AC', 'GPS', 'Bluetooth', 'Parking Sensors', 'Airbags', 'ABS',
    'Power Windows', 'Power Steering', 'Sunroof', 'Leather Seats',
    'Touchscreen', 'Wireless Charging', '4x4', 'Cruise Control',
    'Reverse Camera', 'Music System'
  ];

  React.useEffect(() => {
    const token = localStorage.getItem('authToken') || localStorage.getItem('token');
    const user = localStorage.getItem('user');

    console.log('=== AUTH CHECK ON ADD CAR PAGE ===');
    console.log('Token present:', !!token);
    console.log('User present:', !!user);

    if (token) {
      console.log('Token (first 20 chars):', token.substring(0, 20) + '...');
    }

    if (!token || !user) {
      console.log('❌ User not authenticated, redirecting to login');
      setError('Please login to list your car');
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } else {
      console.log('✅ User authenticated');
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFeatureToggle = (feature) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter(f => f !== feature)
        : [...prev.features, feature]
    }));
  };

  const handleAddCustomFeature = () => {
    if (customFeature.trim() && !formData.features.includes(customFeature.trim())) {
      setFormData(prev => ({
        ...prev,
        features: [...prev.features, customFeature.trim()]
      }));
      setCustomFeature('');
    }
  };

  const handleImageUrlAdd = (e) => {
    e.preventDefault();
    const url = prompt('Enter image URL:');
    if (url && url.trim()) {
      setFormData(prev => ({
        ...prev,
        imageUrls: [...prev.imageUrls, url.trim()]
      }));
      setImagePreview(prev => [...prev, url.trim()]);
    }
  };

  const handleImageUrlRemove = (index) => {
    setFormData(prev => ({
      ...prev,
      imageUrls: prev.imageUrls.filter((_, i) => i !== index)
    }));
    setImagePreview(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Double check authentication before submitting
    const token = localStorage.getItem('authToken') || localStorage.getItem('token');
    if (!token) {
      setError('You must be logged in to list a car. Redirecting to login...');
      setTimeout(() => navigate('/login'), 2000);
      return;
    }

    console.log('=== FORM SUBMISSION STARTED ===');
    console.log('Auth token present:', !!token);
    console.log('Form data:', formData);

    // Validation
    if (!formData.brand || !formData.model) {
      setError('Brand and model are required');
      return;
    }

    if (!formData.pricePerDay || formData.pricePerDay <= 0) {
      setError('Please enter a valid price per day');
      return;
    }

    if (!formData.licensePlate) {
      setError('License plate is required');
      return;
    }

    if (!formData.city) {
      setError('City is required');
      return;
    }

    if (formData.imageUrls.length === 0) {
      setError('Please add at least one image');
      return;
    }

    try {
      setLoading(true);

      const carData = {
        brand: formData.brand,
        model: formData.model,
        year: parseInt(formData.year),
        category: formData.category,
        transmission: formData.transmission,
        fuelType: formData.fuelType,
        seats: parseInt(formData.seats),
        pricePerDay: parseFloat(formData.pricePerDay),
        location: {
          city: formData.city,
          address: formData.address,
          state: formData.state,
          pincode: formData.pincode
        },
        description: formData.description,
        licensePlate: formData.licensePlate.toUpperCase(),
        mileage: parseInt(formData.mileage) || 0,
        features: formData.features,
        images: formData.imageUrls,
        isActive: true
      };

      console.log('Sending car data to API:', carData);

      const response = await createCar(carData);
      console.log('API response:', response);

      setSuccess('Car listed successfully! Redirecting...');

      setTimeout(() => {
        navigate('/my-cars');
      }, 2000);

    } catch (err) {
      console.error('=== ERROR LISTING CAR ===');
      console.error('Error:', err);
      console.error('Error message:', err.message);
      console.error('Error stack:', err.stack);

      setError(err.message || 'Failed to list car. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Header />
      <main className="py-12 pb-20">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Page Header */}
          <div className="mb-10 text-center">
            <div className="inline-flex items-center justify-center p-3 bg-blue-50 rounded-full mb-4">
              <span className="material-icons text-3xl text-blue-600">add_business</span>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-3">List Your Car</h1>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">Join thousands of hosts earning extra income by renting their cars on GetSetRide.</p>
          </div>

          {/* Success/Error Messages */}
          {success && (
            <div className="mb-8 p-4 bg-green-50 border border-green-200 text-green-800 rounded-2xl flex items-center gap-2 shadow-sm">
              <span className="material-icons">check_circle</span>
              {success}
            </div>
          )}

          {error && (
            <div className="mb-8 p-4 bg-red-50 border border-red-200 text-red-800 rounded-2xl flex items-center gap-2 shadow-sm">
              <span className="material-icons">error</span>
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
            {/* Progress Bar / Decorative Header */}
            <div className="h-2 bg-gradient-to-r from-blue-500 to-indigo-600"></div>

            <div className="p-8 md:p-12 space-y-12">
              {/* Basic Information */}
              <section>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 font-bold text-lg">1</div>
                  <h2 className="text-2xl font-bold text-gray-900">Basic Information</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pl-0 md:pl-14">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Brand <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="brand"
                      value={formData.brand}
                      onChange={handleChange}
                      placeholder="e.g., Toyota, Honda, Tesla"
                      className="w-full px-4 py-3 bg-gray-50 border-transparent rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Model <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="model"
                      value={formData.model}
                      onChange={handleChange}
                      placeholder="e.g., Camry, Civic, Model 3"
                      className="w-full px-4 py-3 bg-gray-50 border-transparent rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Year <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      name="year"
                      value={formData.year}
                      onChange={handleChange}
                      min="1990"
                      max={new Date().getFullYear() + 1}
                      className="w-full px-4 py-3 bg-gray-50 border-transparent rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Category <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-gray-50 border-transparent rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium appearance-none"
                        required
                      >
                        {categories.map(cat => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                      <span className="material-icons absolute right-4 top-3.5 text-gray-400 pointer-events-none">expand_more</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Transmission <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <select
                        name="transmission"
                        value={formData.transmission}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-gray-50 border-transparent rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium appearance-none"
                        required
                      >
                        {transmissionTypes.map(type => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                      <span className="material-icons absolute right-4 top-3.5 text-gray-400 pointer-events-none">expand_more</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Fuel Type <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <select
                        name="fuelType"
                        value={formData.fuelType}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-gray-50 border-transparent rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium appearance-none"
                        required
                      >
                        {fuelTypes.map(type => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                      <span className="material-icons absolute right-4 top-3.5 text-gray-400 pointer-events-none">expand_more</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Number of Seats <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      name="seats"
                      value={formData.seats}
                      onChange={handleChange}
                      min="2"
                      max="8"
                      className="w-full px-4 py-3 bg-gray-50 border-transparent rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      License Plate <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="licensePlate"
                      value={formData.licensePlate}
                      onChange={handleChange}
                      placeholder="e.g., MH01AB1234"
                      className="w-full px-4 py-3 bg-gray-50 border-transparent rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium uppercase tracking-wider"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Current Mileage (km)
                    </label>
                    <input
                      type="number"
                      name="mileage"
                      value={formData.mileage}
                      onChange={handleChange}
                      min="0"
                      placeholder="e.g., 25000"
                      className="w-full px-4 py-3 bg-gray-50 border-transparent rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium"
                    />
                  </div>
                </div>
              </section>

              <hr className="border-gray-100" />

              {/* Pricing */}
              <section>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 font-bold text-lg">2</div>
                  <h2 className="text-2xl font-bold text-gray-900">Pricing</h2>
                </div>

                <div className="pl-0 md:pl-14">
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Price Per Day (₹) <span className="text-red-500">*</span>
                  </label>
                  <div className="relative max-w-md">
                    <span className="absolute left-4 top-3.5 text-gray-500 text-lg">₹</span>
                    <input
                      type="number"
                      name="pricePerDay"
                      value={formData.pricePerDay}
                      onChange={handleChange}
                      min="100"
                      placeholder="e.g., 2500"
                      className="w-full pl-8 pr-4 py-3 bg-gray-50 border-transparent rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-bold text-lg"
                      required
                    />
                  </div>
                  <p className="text-sm text-gray-500 mt-2 flex items-center gap-1">
                    <span className="material-icons text-sm">info</span>
                    Set a competitive daily rental rate for your car to attract more bookings.
                  </p>
                </div>
              </section>

              <hr className="border-gray-100" />

              {/* Location */}
              <section>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 font-bold text-lg">3</div>
                  <h2 className="text-2xl font-bold text-gray-900">Location</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pl-0 md:pl-14">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      City <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="e.g., Mumbai"
                      className="w-full px-4 py-3 bg-gray-50 border-transparent rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      State
                    </label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      placeholder="e.g., Maharashtra"
                      className="w-full px-4 py-3 bg-gray-50 border-transparent rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Address
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="e.g., Flat 101, Bandra West"
                      className="w-full px-4 py-3 bg-gray-50 border-transparent rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Pincode
                    </label>
                    <input
                      type="text"
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleChange}
                      placeholder="e.g., 400050"
                      className="w-full px-4 py-3 bg-gray-50 border-transparent rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium"
                    />
                  </div>
                </div>
              </section>

              <hr className="border-gray-100" />

              {/* Images */}
              <section>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 font-bold text-lg">4</div>
                  <h2 className="text-2xl font-bold text-gray-900">Car Images <span className="text-red-500 text-lg">*</span></h2>
                </div>

                <div className="pl-0 md:pl-14">
                  <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center mb-6 hover:bg-gray-100 transition-colors cursor-pointer" onClick={handleImageUrlAdd}>
                    <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="material-icons text-3xl">add_a_photo</span>
                    </div>
                    <p className="text-lg font-bold text-gray-700">Add an image URL</p>
                    <p className="text-gray-500 text-sm mt-1">Click to enter URL or drag and drop (coming soon)</p>
                  </div>

                  {imagePreview.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      {imagePreview.map((url, index) => (
                        <div key={index} className="relative group rounded-xl overflow-hidden shadow-sm aspect-[4/3]">
                          <img
                            src={url}
                            alt={`Car ${index + 1}`}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.src = 'https://via.placeholder.com/300x200?text=Invalid+Image';
                            }}
                          />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <button
                              type="button"
                              onClick={() => handleImageUrlRemove(index)}
                              className="w-10 h-10 bg-white text-red-600 rounded-full flex items-center justify-center hover:bg-red-50 transition-colors"
                            >
                              <span className="material-icons">delete</span>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  <p className="text-sm text-gray-500 flex items-center gap-1">
                    <span className="material-icons text-sm">info</span>
                    Add at least one high-quality image of your car to get more bookings.
                  </p>
                </div>
              </section>

              <hr className="border-gray-100" />

              {/* Features */}
              <section>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 font-bold text-lg">5</div>
                  <h2 className="text-2xl font-bold text-gray-900">Features & Amenities</h2>
                </div>

                <div className="pl-0 md:pl-14">
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mb-6">
                    {commonFeatures.map(feature => (
                      <label
                        key={feature}
                        className={`flex items-center p-3 rounded-xl border-2 cursor-pointer transition-all ${formData.features.includes(feature)
                            ? 'border-blue-500 bg-blue-50/50 shadow-sm'
                            : 'border-transparent bg-gray-50 hover:bg-gray-100'
                          }`}
                      >
                        <div className={`w-5 h-5 rounded-md border flex items-center justify-center mr-3 transition-colors ${formData.features.includes(feature) ? 'bg-blue-600 border-blue-600' : 'border-gray-400 bg-white'
                          }`}>
                          {formData.features.includes(feature) && <span className="material-icons text-white text-sm">check</span>}
                        </div>
                        <input
                          type="checkbox"
                          checked={formData.features.includes(feature)}
                          onChange={() => handleFeatureToggle(feature)}
                          className="hidden"
                        />
                        <span className={`text-sm font-medium ${formData.features.includes(feature) ? 'text-blue-900' : 'text-gray-700'}`}>{feature}</span>
                      </label>
                    ))}
                  </div>

                  {/* Custom Feature */}
                  <div className="flex gap-3 max-w-md">
                    <input
                      type="text"
                      value={customFeature}
                      onChange={(e) => setCustomFeature(e.target.value)}
                      placeholder="Add custom feature..."
                      className="flex-1 px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-gray-50 focus:bg-white"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleAddCustomFeature();
                        }
                      }}
                    />
                    <button
                      type="button"
                      onClick={handleAddCustomFeature}
                      className="px-6 py-2 bg-gray-800 text-white rounded-xl hover:bg-gray-900 transition font-bold text-sm"
                    >
                      Add
                    </button>
                  </div>

                  {/* Selected Features (Custom only as common ones are highlighted in grid) */}
                  {formData.features.filter(f => !commonFeatures.includes(f)).length > 0 && (
                    <div className="mt-4">
                      <p className="text-sm font-bold text-gray-600 mb-2">Custom features:</p>
                      <div className="flex flex-wrap gap-2">
                        {formData.features.filter(f => !commonFeatures.includes(f)).map(feature => (
                          <span
                            key={feature}
                            className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium flex items-center gap-2"
                          >
                            {feature}
                            <button
                              type="button"
                              onClick={() => handleFeatureToggle(feature)}
                              className="text-blue-600 hover:text-blue-800 w-4 h-4 rounded-full flex items-center justify-center hover:bg-blue-200"
                            >
                              <span className="material-icons text-xs">close</span>
                            </button>
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </section>

              <hr className="border-gray-100" />

              {/* Description */}
              <section>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 font-bold text-lg">6</div>
                  <h2 className="text-2xl font-bold text-gray-900">Description</h2>
                </div>

                <div className="pl-0 md:pl-14">
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows="6"
                    placeholder="Describe your car... (e.g., Well-maintained car, perfect for city drives, recent service done, etc.)"
                    className="w-full px-4 py-3 bg-gray-50 border-transparent rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium resize-y"
                  />
                  <p className="text-sm text-gray-500 mt-2">
                    Write a catchy description to highlight what makes your car special.
                  </p>
                </div>
              </section>

              {/* Submit Buttons */}
              <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row gap-4 justify-end">
                <button
                  type="button"
                  onClick={() => navigate('/marketplace')}
                  className="px-8 py-4 border-2 border-gray-200 text-gray-700 rounded-xl font-bold hover:bg-gray-50 hover:border-gray-300 transition-all text-center"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-12 py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 shadow-lg shadow-blue-600/30 transition-all transform hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      <span>List My Car</span>
                      <span className="material-icons">arrow_forward</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default AddCarPage;
