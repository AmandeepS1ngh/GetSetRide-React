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
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">List Your Car</h1>
            <p className="text-gray-600">Start earning by renting out your car</p>
          </div>

          {/* Success/Error Messages */}
          {success && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-800 rounded-lg">
              {success}
            </div>
          )}

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-800 rounded-lg">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-8">
            {/* Basic Information */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                <span className="material-icons mr-2 text-[var(--primary-color)]">directions_car</span>
                Basic Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Brand <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="brand"
                    value={formData.brand}
                    onChange={handleChange}
                    placeholder="e.g., Toyota, Honda, Tesla"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Model <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="model"
                    value={formData.model}
                    onChange={handleChange}
                    placeholder="e.g., Camry, Civic, Model 3"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Year <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="year"
                    value={formData.year}
                    onChange={handleChange}
                    min="1990"
                    max={new Date().getFullYear() + 1}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent"
                    required
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Transmission <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="transmission"
                    value={formData.transmission}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent"
                    required
                  >
                    {transmissionTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Fuel Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="fuelType"
                    value={formData.fuelType}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent"
                    required
                  >
                    {fuelTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Number of Seats <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="seats"
                    value={formData.seats}
                    onChange={handleChange}
                    min="2"
                    max="8"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    License Plate <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="licensePlate"
                    value={formData.licensePlate}
                    onChange={handleChange}
                    placeholder="e.g., MH01AB1234"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent uppercase"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Current Mileage (km)
                  </label>
                  <input
                    type="number"
                    name="mileage"
                    value={formData.mileage}
                    onChange={handleChange}
                    min="0"
                    placeholder="e.g., 25000"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Pricing */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                <span className="material-icons mr-2 text-[var(--primary-color)]">currency_rupee</span>
                Pricing
              </h2>
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Price Per Day (₹) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="pricePerDay"
                  value={formData.pricePerDay}
                  onChange={handleChange}
                  min="100"
                  placeholder="e.g., 2500"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent"
                  required
                />
                <p className="text-sm text-gray-500 mt-1">
                  Set a competitive daily rental rate for your car
                </p>
              </div>
            </div>

            {/* Location */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                <span className="material-icons mr-2 text-[var(--primary-color)]">location_on</span>
                Location
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    City <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="e.g., Mumbai, Delhi, Bangalore"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    State
                  </label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    placeholder="e.g., Maharashtra, Karnataka"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-gray-700 font-medium mb-2">
                    Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="e.g., Bandra West, Andheri"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Pincode
                  </label>
                  <input
                    type="text"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleChange}
                    placeholder="e.g., 400050"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Images */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                <span className="material-icons mr-2 text-[var(--primary-color)]">photo_camera</span>
                Car Images <span className="text-red-500 ml-1">*</span>
              </h2>
              
              <button
                type="button"
                onClick={handleImageUrlAdd}
                className="mb-4 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center"
              >
                <span className="material-icons mr-2">add_photo_alternate</span>
                Add Image URL
              </button>

              {imagePreview.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                  {imagePreview.map((url, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={url}
                        alt={`Car ${index + 1}`}
                        className="w-full h-40 object-cover rounded-lg"
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/300x200?text=Invalid+Image';
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => handleImageUrlRemove(index)}
                        className="absolute top-2 right-2 bg-red-600 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition"
                      >
                        <span className="material-icons text-sm">close</span>
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <p className="text-sm text-gray-500">
                Add at least one image of your car. Use high-quality photos showing different angles.
              </p>
            </div>

            {/* Features */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                <span className="material-icons mr-2 text-[var(--primary-color)]">check_circle</span>
                Features & Amenities
              </h2>
              
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mb-4">
                {commonFeatures.map(feature => (
                  <label
                    key={feature}
                    className={`flex items-center p-3 rounded-lg border-2 cursor-pointer transition ${
                      formData.features.includes(feature)
                        ? 'border-[var(--primary-color)] bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={formData.features.includes(feature)}
                      onChange={() => handleFeatureToggle(feature)}
                      className="mr-2"
                    />
                    <span className="text-sm">{feature}</span>
                  </label>
                ))}
              </div>

              {/* Custom Feature */}
              <div className="flex gap-2">
                <input
                  type="text"
                  value={customFeature}
                  onChange={(e) => setCustomFeature(e.target.value)}
                  placeholder="Add custom feature"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent"
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
                  className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
                >
                  Add
                </button>
              </div>

              {/* Selected Features */}
              {formData.features.length > 0 && (
                <div className="mt-4">
                  <p className="text-sm text-gray-600 mb-2">Selected features:</p>
                  <div className="flex flex-wrap gap-2">
                    {formData.features.map(feature => (
                      <span
                        key={feature}
                        className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm flex items-center"
                      >
                        {feature}
                        <button
                          type="button"
                          onClick={() => handleFeatureToggle(feature)}
                          className="ml-2 text-blue-600 hover:text-blue-800"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Description */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                <span className="material-icons mr-2 text-[var(--primary-color)]">description</span>
                Description
              </h2>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="5"
                placeholder="Describe your car... (e.g., Well-maintained car, perfect for city drives, recent service done, etc.)"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent"
              />
              <p className="text-sm text-gray-500 mt-1">
                Provide details that make your car stand out
              </p>
            </div>

            {/* Submit Buttons */}
            <div className="flex gap-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-[var(--primary-color)] text-white py-3 rounded-lg font-semibold hover:bg-[var(--primary-hover-color)] transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Listing Car...
                  </>
                ) : (
                  <>
                    <span className="material-icons mr-2">check_circle</span>
                    List My Car
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={() => navigate('/marketplace')}
                className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddCarPage;
