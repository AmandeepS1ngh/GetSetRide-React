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
    <div className="min-h-screen bg-gray-50 font-sans">
      <Header />
      <main className="py-12 pb-20">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Page Header */}
          <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">My Cars</h1>
              <p className="text-lg text-gray-500">Manage your fleet and track performance</p>
            </div>
            <button
              onClick={() => navigate('/add-car')}
              className="px-6 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 shadow-lg shadow-blue-600/30 transition-all transform hover:-translate-y-0.5 flex items-center gap-2"
            >
              <span className="material-icons">add_circle</span>
              <span>Add New Car</span>
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-8 p-4 bg-red-50 border border-red-200 text-red-800 rounded-2xl flex items-center gap-2">
              <span className="material-icons">error</span>
              {error}
            </div>
          )}

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
            <div className="bg-white rounded-3xl shadow-lg p-6 border border-gray-100">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center shrink-0">
                  <span className="material-icons text-blue-600">directions_car</span>
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Total Cars</p>
                  <p className="text-2xl font-bold text-gray-900">{cars.length}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl shadow-lg p-6 border border-gray-100">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center shrink-0">
                  <span className="material-icons text-green-600">check_circle</span>
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Total Bookings</p>
                  <p className="text-2xl font-bold text-gray-900">{totalBookings}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl shadow-lg p-6 border border-gray-100">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-purple-50 rounded-2xl flex items-center justify-center shrink-0">
                  <span className="material-icons text-purple-600">payments</span>
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Total Revenue</p>
                  <p className="text-2xl font-bold text-gray-900">₹{totalRevenue}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl shadow-lg p-6 border border-gray-100">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-yellow-50 rounded-2xl flex items-center justify-center shrink-0">
                  <span className="material-icons text-yellow-600">star</span>
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Avg. Rating</p>
                  <p className="text-2xl font-bold text-gray-900">{averageRating}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 mb-8 p-1.5 inline-flex">
            <button
              onClick={() => setActiveTab('active')}
              className={`py-3 px-8 rounded-2xl font-bold text-sm transition-all duration-300 ${activeTab === 'active'
                ? 'bg-gray-900 text-white shadow-lg'
                : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                }`}
            >
              Active ({cars.filter(c => c.isActive).length})
            </button>
            <button
              onClick={() => setActiveTab('inactive')}
              className={`py-3 px-8 rounded-2xl font-bold text-sm transition-all duration-300 ${activeTab === 'inactive'
                ? 'bg-gray-900 text-white shadow-lg'
                : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                }`}
            >
              Inactive ({cars.filter(c => !c.isActive).length})
            </button>
            <button
              onClick={() => setActiveTab('all')}
              className={`py-3 px-8 rounded-2xl font-bold text-sm transition-all duration-300 ${activeTab === 'all'
                ? 'bg-gray-900 text-white shadow-lg'
                : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                }`}
            >
              All Cars ({cars.length})
            </button>
          </div>

          {/* Cars List */}
          {filteredCars.length === 0 ? (
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-16 text-center">
              <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="material-icons text-5xl text-gray-300">directions_car</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                No {activeTab !== 'all' ? activeTab : ''} cars found
              </h3>
              <p className="text-gray-500 mb-8 max-w-md mx-auto">
                {activeTab === 'all'
                  ? "You haven't listed any cars yet. Add your first car to start earning!"
                  : `You don't have any ${activeTab} cars listed at the moment.`}
              </p>
              {cars.length === 0 && (
                <button
                  onClick={() => navigate('/add-car')}
                  className="px-8 py-3 bg-blue-600 text-white rounded-xl font-bold shadow-lg shadow-blue-600/30 hover:bg-blue-700 hover:shadow-blue-600/40 transition-all transform hover:-translate-y-0.5"
                >
                  Add Your First Car
                </button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredCars.map((car) => (
                <div key={car._id} className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden hover:shadow-2xl hover:border-blue-100 transition-all duration-300 group">
                  {/* Car Image */}
                  <div className="relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
                    <img
                      src={car.images?.[0] || '/placeholder-car.jpg'}
                      alt={`${car.brand} ${car.model}`}
                      className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-4 right-4 z-20">
                      <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-md shadow-sm ${car.isActive
                        ? 'bg-green-500/90 text-white'
                        : 'bg-gray-500/90 text-white'
                        }`}>
                        {car.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                    <div className="absolute bottom-4 left-4 z-20">
                      <h3 className="text-2xl font-bold text-white">{car.brand} {car.model}</h3>
                      <p className="text-gray-200 font-medium">{car.year} • {car.category}</p>
                    </div>
                    <div className="absolute bottom-4 right-4 z-20 text-right">
                      <p className="text-2xl font-bold text-white">₹{car.pricePerDay}</p>
                      <p className="text-xs text-gray-300 uppercase tracking-widest">per day</p>
                    </div>
                  </div>

                  {/* Car Details */}
                  <div className="p-6">
                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-2 mb-6 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                      <div className="text-center">
                        <p className="text-lg font-bold text-gray-900">{car.totalBookings || 0}</p>
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Bookings</p>
                      </div>
                      <div className="text-center border-x border-gray-200">
                        <p className="text-lg font-bold text-gray-900">₹{car.totalEarnings || 0}</p>
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Revenue</p>
                      </div>
                      <div className="text-center">
                        <div className="flex items-center justify-center gap-1">
                          <span className="text-lg font-bold text-gray-900">{car.rating?.average || 0}</span>
                          <span className="material-icons text-yellow-500 text-sm">star</span>
                        </div>
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">{car.rating?.count || 0} reviews</p>
                      </div>
                    </div>

                    {/* Location */}
                    <div className="flex items-center gap-2 text-gray-500 mb-6 px-2">
                      <span className="material-icons text-gray-400">location_on</span>
                      <span className="font-medium text-sm">{car.location?.city}, {car.location?.state}</span>
                    </div>

                    {/* Action Buttons */}
                    <div className="grid grid-cols-3 gap-3">
                      <button
                        onClick={() => navigate(`/edit-car/${car._id}`)}
                        className="px-4 py-2.5 bg-white border-2 border-gray-100 text-gray-700 font-bold rounded-xl hover:bg-gray-50 hover:border-gray-200 transition-all flex items-center justify-center gap-2 group-hover:border-blue-100">
                        <span className="material-icons text-sm">edit</span>
                        Edit
                      </button>
                      <button
                        onClick={() => handleToggleStatus(car._id, car.isActive)}
                        className={`px-4 py-2.5 font-bold rounded-xl transition-all flex items-center justify-center gap-2 ${car.isActive
                          ? 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                          : 'bg-green-600 text-white hover:bg-green-700 shadow-md'
                          }`}
                      >
                        <span className="material-icons text-sm">{car.isActive ? 'visibility_off' : 'visibility'}</span>
                        {car.isActive ? 'Hide' : 'Show'}
                      </button>
                      <button
                        onClick={() => handleDeleteCar(car._id)}
                        className="px-4 py-2.5 bg-red-50 text-red-600 font-bold rounded-xl hover:bg-red-100 transition-all flex items-center justify-center gap-2"
                      >
                        <span className="material-icons text-sm">delete</span>
                        Delete
                      </button>
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

export default MyCarsPage;
