// filepath: /Users/amandeepsingh/Documents/GitHub/GetSetRide/GetSetRide-in-react/src/pages/MarketplacePage.jsx
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from '../components/common/Header';
import CarCard from '../components/marketplace/CarCard';
import { getCars } from '../services/cars';

const MarketplacePage = () => {
  const [searchParams] = useSearchParams();
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    category: '',
    transmission: '',
    minPrice: '',
    maxPrice: '',
    city: '',
    seats: '',
    search: '',
    page: 1,
    limit: 12,
    sort: '-createdAt'
  });
  const [pagination, setPagination] = useState({
    total: 0,
    totalPages: 0,
    currentPage: 1
  });

  // Initialize filters from URL parameters
  useEffect(() => {
    const urlCity = searchParams.get('city');
    const urlPickupDate = searchParams.get('pickupDate');
    const urlReturnDate = searchParams.get('returnDate');

    console.log('URL Search Params:', { urlCity, urlPickupDate, urlReturnDate });

    if (urlCity || urlPickupDate || urlReturnDate) {
      console.log('Setting filters from URL');
      setFilters(prev => ({
        ...prev,
        city: urlCity || prev.city,
        // You can add date filtering logic here if your backend supports it
      }));
    }
  }, [searchParams]);

  // Fetch cars from API
  useEffect(() => {
    fetchCars();
  }, [filters]);

  const fetchCars = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getCars(filters);
      setCars(data.cars || []);
      setPagination({
        total: data.total || 0,
        totalPages: data.totalPages || 0,
        currentPage: data.currentPage || 1
      });
    } catch (err) {
      console.error('Error fetching cars:', err);
      setError(err.message || 'Failed to load cars');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchCars();
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value,
      page: 1 // Reset to first page when filters change
    }));
  };

  const handlePageChange = (newPage) => {
    setFilters(prev => ({
      ...prev,
      page: newPage
    }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const clearFilters = () => {
    setFilters({
      category: '',
      transmission: '',
      minPrice: '',
      maxPrice: '',
      city: '',
      seats: '',
      search: '',
      page: 1,
      limit: 12,
      sort: '-createdAt'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans flex flex-col">
      <Header />
      <main className="container mx-auto px-4 py-8 flex-grow">
        {/* Search & Filter Header - Now cleaner */}
        <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-8 sticky top-24 z-10">
          <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 items-center">
            <div className="lg:col-span-4 relative group">
              <span className="material-icons absolute top-3.5 left-4 text-gray-400 group-focus-within:text-blue-600 transition-colors">location_on</span>
              <input
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border-transparent rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium"
                placeholder="City"
                type="text"
                value={filters.city}
                onChange={(e) => handleFilterChange('city', e.target.value)}
              />
            </div>
            <div className="lg:col-span-3 relative group">
              <span className="material-icons absolute top-3.5 left-4 text-gray-400 group-focus-within:text-blue-600 transition-colors">directions_car</span>
              <select
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border-transparent rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium appearance-none"
                value={filters.category}
                onChange={(e) => handleFilterChange('category', e.target.value)}
              >
                <option value="">All Categories</option>
                <option value="Sedan">Sedan</option>
                <option value="SUV">SUV</option>
                <option value="Hatchback">Hatchback</option>
                <option value="Luxury">Luxury</option>
                <option value="Sports">Sports</option>
                <option value="Electric">Electric</option>
              </select>
              <span className="material-icons absolute top-3.5 right-4 text-gray-400 pointer-events-none">expand_more</span>
            </div>
            <div className="lg:col-span-3 relative group">
              <span className="material-icons absolute top-3.5 left-4 text-gray-400 group-focus-within:text-blue-600 transition-colors">search</span>
              <input
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border-transparent rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium"
                placeholder="Search cars..."
                type="text"
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
              />
            </div>
            <div className="lg:col-span-2">
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold shadow-lg shadow-blue-600/30 hover:bg-blue-700 hover:shadow-blue-600/40 transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2">
                Search
              </button>
            </div>
          </form>
        </section>

        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Sidebar Filters */}
          <aside className="w-full lg:w-1/4 sticky top-24">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-gray-900">Filters</h3>
                <button
                  onClick={clearFilters}
                  className="text-sm font-medium text-blue-600 hover:text-blue-800 hover:underline">
                  Reset
                </button>
              </div>

              <div className="space-y-8">
                {/* Price Range */}
                <div>
                  <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-3">Daily Price</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="relative">
                      <span className="absolute left-3 top-2.5 text-gray-400 text-sm">₹</span>
                      <input
                        type="number"
                        placeholder="Min"
                        className="w-full pl-7 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={filters.minPrice}
                        onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                      />
                    </div>
                    <div className="relative">
                      <span className="absolute left-3 top-2.5 text-gray-400 text-sm">₹</span>
                      <input
                        type="number"
                        placeholder="Max"
                        className="w-full pl-7 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={filters.maxPrice}
                        onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                {/* Transmission */}
                <div>
                  <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-3">Transmission</h4>
                  <div className="space-y-2">
                    {['', 'Automatic', 'Manual'].map((type) => (
                      <label key={type} className="flex items-center cursor-pointer group">
                        <div className="relative flex items-center">
                          <input
                            type="radio"
                            name="transmission"
                            className="peer h-4 w-4 cursor-pointer appearance-none rounded-full border border-gray-300 checked:border-blue-600 checked:bg-blue-600 transition-all"
                            checked={filters.transmission === type}
                            onChange={() => handleFilterChange('transmission', type)}
                          />
                          <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 peer-checked:opacity-100">
                            <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <circle cx="4" cy="4" r="2" fill="white" />
                            </svg>
                          </div>
                        </div>
                        <span className="ml-3 text-sm text-gray-600 group-hover:text-gray-900 transition-colors">
                          {type === '' ? 'Any Transmission' : type}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Seats */}
                <div>
                  <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-3">Seats</h4>
                  <select
                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                    value={filters.seats}
                    onChange={(e) => handleFilterChange('seats', e.target.value)}
                  >
                    <option value="">Any Number</option>
                    <option value="2">2+ Seats</option>
                    <option value="4">4+ Seats</option>
                    <option value="5">5+ Seats</option>
                    <option value="7">7+ Seats</option>
                  </select>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="w-full lg:w-3/4">
            <div className="flex justify-between items-center mb-6 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
              <p className="text-gray-600 font-medium">
                {loading ? 'Searching...' : <><span className="text-gray-900 font-bold">{cars.length}</span> cars available</>}
              </p>
              <div className="relative">
                <select
                  className="appearance-none bg-gray-50 border-0 rounded-lg pl-4 pr-10 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer hover:bg-gray-100 transition-colors"
                  onChange={(e) => handleFilterChange('sort', e.target.value)}
                  value={filters.sort}
                >
                  <option value="-createdAt">Newest First</option>
                  <option value="pricePerDay">Price: Low to High</option>
                  <option value="-pricePerDay">Price: High to Low</option>
                  <option value="-rating.average">Highest Rated</option>
                </select>
                <span className="material-icons absolute right-2 top-2 text-gray-500 pointer-events-none">expand_more</span>
              </div>
            </div>

            {/* Loading State */}
            {loading && (
              <div className="flex justify-center items-center py-32">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-blue-600"></div>
              </div>
            )}

            {/* Error State */}
            {error && !loading && (
              <div className="bg-red-50 border border-red-100 rounded-2xl p-8 text-center max-w-lg mx-auto mt-10">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="material-icons text-red-500 text-3xl">error_outline</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Something went wrong</h3>
                <p className="text-red-600 mb-6">{error}</p>
                <button
                  onClick={fetchCars}
                  className="px-6 py-2.5 bg-red-600 text-white rounded-xl font-semibold hover:bg-red-700 transition-colors shadow-lg shadow-red-600/20"
                >
                  Try Again
                </button>
              </div>
            )}

            {/* Empty State */}
            {!loading && !error && cars.length === 0 && (
              <div className="bg-white rounded-2xl p-12 text-center border border-dashed border-gray-300">
                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="material-icons text-gray-400 text-4xl">directions_car</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">No cars found</h3>
                <p className="text-gray-500 mb-8 max-w-sm mx-auto">We couldn't find any cars matching your current filters. Try adjusting your search criteria.</p>
                <button
                  onClick={clearFilters}
                  className="px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/25"
                >
                  Clear All Filters
                </button>
              </div>
            )}

            {/* Car Grid */}
            {!loading && !error && cars.length > 0 && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {cars.map(car => (
                    <CarCard key={car._id} car={car} />
                  ))}
                </div>

                {/* Pagination */}
                {pagination.totalPages > 1 && (
                  <div className="mt-12 flex justify-center items-center gap-2">
                    <button
                      className="w-10 h-10 rounded-lg flex items-center justify-center border border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all disabled:opacity-50 disabled:cursor-not-allowed bg-white"
                      disabled={pagination.currentPage === 1}
                      onClick={() => handlePageChange(pagination.currentPage - 1)}
                    >
                      <span className="material-icons text-gray-600">chevron_left</span>
                    </button>

                    {[...Array(Math.min(5, pagination.totalPages))].map((_, idx) => {
                      const pageNum = idx + 1;
                      // Logic for showing pages could be more complex, but simplified here
                      return (
                        <button
                          key={pageNum}
                          className={`w-10 h-10 rounded-lg font-bold text-sm transition-all ${pagination.currentPage === pageNum
                              ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                              : 'bg-white border border-gray-200 hover:bg-gray-50 text-gray-700'
                            }`}
                          onClick={() => handlePageChange(pageNum)}
                        >
                          {pageNum}
                        </button>
                      );
                    })}

                    <button
                      className="w-10 h-10 rounded-lg flex items-center justify-center border border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all disabled:opacity-50 disabled:cursor-not-allowed bg-white"
                      disabled={pagination.currentPage === pagination.totalPages}
                      onClick={() => handlePageChange(pagination.currentPage + 1)}
                    >
                      <span className="material-icons text-gray-600">chevron_right</span>
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default MarketplacePage;
