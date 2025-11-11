import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/common/Header';
import authService from '../services/auth';
import { getHostCars, toggleCarStatus as toggleCarStatusAPI, deleteCar as deleteCarAPI, getHostStats } from '../services/cars';

const MyCarsPage = () => {
  const navigate = useNavigate();
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('active'); // active, inactive, all
  const [error, setError] = useState('');
  const [showAddCarModal, setShowAddCarModal] = useState(false);
  const [stats, setStats] = useState({
    totalEarnings: 0,
    totalBookings: 0,
    activeListings: 0,
    averageRating: 0
  });

  useEffect(() => {
    if (!authService.checkAuth()) {
      navigate('/login');
      return;
    }

    fetchCars();
    fetchStats();
  }, [navigate]);

  const fetchCars = async () => {
    try {
      setLoading(true);
      setError('');
      
      const response = await getHostCars();
      console.log('Cars response:', response);
      
      // Handle both response formats
      const carsData = response.cars || response || [];
      setCars(carsData);
    } catch (err) {
      console.error('Error fetching cars:', err);
      setError(err.message || 'Failed to load your cars');
      setCars([]); // Set empty array on error
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await getHostStats();
      console.log('Stats response:', response);
      
      // Handle both response formats
      const statsData = response.stats || response || {};
      setStats({
        totalEarnings: statsData.totalRevenue || 0,
        totalBookings: statsData.totalBookings || 0,
        activeListings: statsData.activeCars || 0,
        averageRating: statsData.avgRating || 0
      });
    } catch (err) {
      console.error('Error fetching stats:', err);
      // Don't show error for stats, just use defaults
      setStats({
        totalEarnings: 0,
        totalBookings: 0,
        activeListings: 0,
        averageRating: 0
      });
    }
  };

  const getStatusColor = (isActive) => {
    return isActive 
      ? 'bg-green-100 text-green-800' 
      : 'bg-gray-100 text-gray-800';
  };

  const handleToggleStatus = async (carId, currentStatus) => {
    try {
      const newStatus = !currentStatus;
      await toggleCarStatusAPI(carId, newStatus);
      
      setCars(cars.map(car => 
        car._id === carId 
          ? { ...car, isActive: newStatus }
          : car
      ));
    } catch (err) {
      console.error('Error toggling car status:', err);
      setError('Failed to update car status');
    }
  };

  const handleDeleteCar = async (carId) => {
    if (window.confirm('Are you sure you want to delete this car? This action cannot be undone.')) {
      try {
        await deleteCarAPI(carId);
        setCars(cars.filter(car => car._id !== carId));
      } catch (err) {
        console.error('Error deleting car:', err);
        setError('Failed to delete car');
      }
    }
  };

  const filteredCars = activeTab === 'all' 
    ? cars 
    : cars.filter(car => activeTab === 'active' ? car.isActive : !car.isActive);

  const totalRevenue = stats.totalEarnings || cars.reduce((sum, car) => sum + (car.totalEarnings || 0), 0);
  const totalBookings = stats.totalBookings || cars.reduce((sum, car) => sum + (car.totalBookings || 0), 0);
  const averageRating = stats.averageRating || (cars.length > 0 
    ? (cars.reduce((sum, car) => sum + (car.rating?.average || 0), 0) / cars.length).toFixed(1)
    : 0);
  const activeListings = cars.filter(car => car.isActive).length;

  if (loading) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--primary-color)] mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading your cars...</p>
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
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-bold text-gray-800 mb-2">My Cars</h1>
              <p className="text-gray-600">Manage your car listings and track performance</p>
            </div>
            <button
              onClick={() => navigate('/add-car')}
              className="px-6 py-3 bg-[var(--primary-color)] text-white rounded-lg hover:bg-[var(--primary-hover-color)] transition flex items-center space-x-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              <span>Add New Car</span>
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-800 rounded-lg">
              {error}
            </div>
          )}

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">Total Cars</p>
                  <p className="text-3xl font-bold text-gray-800">{cars.length}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">Total Bookings</p>
                  <p className="text-3xl font-bold text-gray-800">{totalBookings}</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">Total Revenue</p>
                  <p className="text-3xl font-bold text-gray-800">₹{totalRevenue}</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">Avg. Rating</p>
                  <p className="text-3xl font-bold text-gray-800">{averageRating}</p>
                </div>
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-white rounded-lg shadow-md mb-6">
            <div className="flex border-b">
              <button
                onClick={() => setActiveTab('active')}
                className={`flex-1 py-4 px-6 text-center font-medium transition ${
                  activeTab === 'active'
                    ? 'border-b-2 border-[var(--primary-color)] text-[var(--primary-color)]'
                    : 'text-gray-600 hover:text-[var(--primary-color)]'
                }`}
              >
                Active ({cars.filter(c => c.isActive).length})
              </button>
              <button
                onClick={() => setActiveTab('inactive')}
                className={`flex-1 py-4 px-6 text-center font-medium transition ${
                  activeTab === 'inactive'
                    ? 'border-b-2 border-[var(--primary-color)] text-[var(--primary-color)]'
                    : 'text-gray-600 hover:text-[var(--primary-color)]'
                }`}
              >
                Inactive ({cars.filter(c => !c.isActive).length})
              </button>
              <button
                onClick={() => setActiveTab('all')}
                className={`flex-1 py-4 px-6 text-center font-medium transition ${
                  activeTab === 'all'
                    ? 'border-b-2 border-[var(--primary-color)] text-[var(--primary-color)]'
                    : 'text-gray-600 hover:text-[var(--primary-color)]'
                }`}
              >
                All Cars ({cars.length})
              </button>
            </div>
          </div>

          {/* Cars List */}
          {filteredCars.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-12 text-center">
              <div className="text-6xl mb-4">🚗</div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                No {activeTab !== 'all' ? activeTab : ''} cars
              </h3>
              <p className="text-gray-600 mb-6">
                {activeTab === 'all' 
                  ? "You haven't listed any cars yet. Add your first car to start earning!"
                  : `You don't have any ${activeTab} cars.`}
              </p>
              {cars.length === 0 && (
                <button
                  onClick={() => setShowAddCarModal(true)}
                  className="px-6 py-3 bg-[var(--primary-color)] text-white rounded-lg hover:bg-[var(--primary-hover-color)] transition"
                >
                  Add Your First Car
                </button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredCars.map((car) => (
                <div key={car._id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition overflow-hidden">
                  {/* Car Image */}
                  <div className="relative">
                    <img
                      src={car.images?.[0] || '/placeholder-car.jpg'}
                      alt={`${car.brand} ${car.model}`}
                      className="w-full h-48 object-cover"
                    />
                    <span className={`absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(car.isActive)}`}>
                      {car.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </div>

                  {/* Car Details */}
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-gray-800">{car.brand} {car.model}</h3>
                        <p className="text-gray-600">{car.year} • {car.category}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-[var(--primary-color)]">₹{car.pricePerDay}</p>
                        <p className="text-sm text-gray-500">per day</p>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-4 mb-4 pb-4 border-b">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-gray-800">{car.totalBookings || 0}</p>
                        <p className="text-xs text-gray-500">Bookings</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-gray-800">₹{car.totalEarnings || 0}</p>
                        <p className="text-xs text-gray-500">Revenue</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-gray-800 flex items-center justify-center">
                          {car.rating?.average || 0}
                          <svg className="w-4 h-4 text-yellow-500 ml-1" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        </p>
                        <p className="text-xs text-gray-500">{car.rating?.count || 0} reviews</p>
                      </div>
                    </div>

                    {/* Location */}
                    <div className="flex items-center text-gray-700 mb-4">
                      <svg className="w-4 h-4 mr-2 text-[var(--primary-color)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span className="text-sm">{car.location?.city}, {car.location?.state}</span>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => navigate(`/edit-car/${car._id}`)}
                        className="flex-1 px-4 py-2 border border-[var(--primary-color)] text-[var(--primary-color)] rounded-lg hover:bg-blue-50 transition text-sm">
                        Edit
                      </button>
                      <button
                        onClick={() => handleToggleStatus(car._id, car.isActive)}
                        className={`flex-1 px-4 py-2 rounded-lg transition text-sm ${
                          car.isActive
                            ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            : 'bg-green-600 text-white hover:bg-green-700'
                        }`}
                      >
                        {car.isActive ? 'Deactivate' : 'Activate'}
                      </button>
                      <button
                        onClick={() => handleDeleteCar(car._id)}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Add Car Modal Placeholder */}
          {showAddCarModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-lg max-w-2xl w-full p-8">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">Add New Car</h2>
                  <button
                    onClick={() => setShowAddCarModal(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">🚗</div>
                  <p className="text-gray-600 mb-6">
                    Car listing form will be implemented here.
                  </p>
                  <button
                    onClick={() => setShowAddCarModal(false)}
                    className="px-6 py-2 bg-[var(--primary-color)] text-white rounded-lg hover:bg-[var(--primary-hover-color)] transition"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default MyCarsPage;
