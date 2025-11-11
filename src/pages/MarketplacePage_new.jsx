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
    <>
      <Header />
      <main className="container mx-auto px-4 py-8">
        {/* Search Section */}
        <section className="bg-white p-6 rounded-lg shadow-md mb-8">
          <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-center">
            <div className="relative">
              <span className="material-icons absolute top-3 left-3 text-gray-400">location_on</span>
              <input
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
                placeholder="City"
                type="text"
                value={filters.city}
                onChange={(e) => handleFilterChange('city', e.target.value)}
              />
            </div>
            <div className="relative">
              <span className="material-icons absolute top-3 left-3 text-gray-400">directions_car</span>
              <select
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
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
            </div>
            <div className="relative col-span-1 lg:col-span-1">
              <span className="material-icons absolute top-3 left-3 text-gray-400">search</span>
              <input
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
                placeholder="Search cars..."
                type="text"
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[var(--primary-color)] text-white py-2.5 rounded-lg font-semibold hover:bg-[var(--primary-hover-color)] transition-colors">
              Search
            </button>
          </form>
        </section>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <aside className="w-full lg:w-1/4">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold">Filters</h3>
                <button 
                  onClick={clearFilters}
                  className="text-[var(--primary-color)] text-sm hover:underline">
                  Clear All
                </button>
              </div>
              <div className="space-y-6">
                {/* Price Range */}
                <div>
                  <h4 className="font-medium mb-3">Price Range (₹/day)</h4>
                  <div className="space-y-2">
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="number"
                        placeholder="Min"
                        className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
                        value={filters.minPrice}
                        onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                      />
                      <input
                        type="number"
                        placeholder="Max"
                        className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
                        value={filters.maxPrice}
                        onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                {/* Transmission */}
                <div>
                  <h4 className="font-medium mb-3">Transmission</h4>
                  <div className="space-y-2">
                    <label className="flex items-center cursor-pointer">
                      <input 
                        type="radio" 
                        name="transmission" 
                        className="mr-2"
                        checked={filters.transmission === ''}
                        onChange={() => handleFilterChange('transmission', '')}
                      />
                      <span className="text-sm">All</span>
                    </label>
                    <label className="flex items-center cursor-pointer">
                      <input 
                        type="radio" 
                        name="transmission" 
                        className="mr-2"
                        checked={filters.transmission === 'Automatic'}
                        onChange={() => handleFilterChange('transmission', 'Automatic')}
                      />
                      <span className="text-sm">Automatic</span>
                    </label>
                    <label className="flex items-center cursor-pointer">
                      <input 
                        type="radio" 
                        name="transmission" 
                        className="mr-2"
                        checked={filters.transmission === 'Manual'}
                        onChange={() => handleFilterChange('transmission', 'Manual')}
                      />
                      <span className="text-sm">Manual</span>
                    </label>
                  </div>
                </div>

                {/* Seats */}
                <div>
                  <h4 className="font-medium mb-3">Seats</h4>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
                    value={filters.seats}
                    onChange={(e) => handleFilterChange('seats', e.target.value)}
                  >
                    <option value="">Any</option>
                    <option value="2">2+</option>
                    <option value="4">4+</option>
                    <option value="5">5+</option>
                    <option value="7">7+</option>
                  </select>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="w-full lg:w-3/4">
            <div className="flex justify-between items-center mb-6">
              <p className="text-gray-600">
                {loading ? 'Loading...' : `Showing ${cars.length} of ${pagination.total} results`}
              </p>
              <div className="relative">
                <select 
                  className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
                  onChange={(e) => handleFilterChange('sort', e.target.value)}
                  value={filters.sort}
                >
                  <option value="-createdAt">Sort by: Newest</option>
                  <option value="pricePerDay">Sort by: Price (Low to High)</option>
                  <option value="-pricePerDay">Sort by: Price (High to Low)</option>
                  <option value="-rating.average">Sort by: Rating</option>
                </select>
                <span className="material-icons absolute right-2 top-2 text-gray-400 pointer-events-none">expand_more</span>
              </div>
            </div>

            {/* Loading State */}
            {loading && (
              <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--primary-color)]"></div>
              </div>
            )}

            {/* Error State */}
            {error && !loading && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
                <span className="material-icons text-red-500 text-5xl mb-2">error_outline</span>
                <p className="text-red-600 font-medium">{error}</p>
                <button
                  onClick={fetchCars}
                  className="mt-4 px-6 py-2 bg-[var(--primary-color)] text-white rounded-lg hover:bg-[var(--primary-hover-color)] transition-colors"
                >
                  Try Again
                </button>
              </div>
            )}

            {/* Empty State */}
            {!loading && !error && cars.length === 0 && (
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-12 text-center">
                <span className="material-icons text-gray-400 text-6xl mb-4">directions_car</span>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">No cars found</h3>
                <p className="text-gray-500 mb-6">Try adjusting your filters or search criteria</p>
                <button
                  onClick={clearFilters}
                  className="px-6 py-2 bg-[var(--primary-color)] text-white rounded-lg hover:bg-[var(--primary-hover-color)] transition-colors"
                >
                  Clear Filters
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
                  <div className="mt-8 flex justify-center items-center space-x-2">
                    <button 
                      className="p-2 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed" 
                      disabled={pagination.currentPage === 1}
                      onClick={() => handlePageChange(pagination.currentPage - 1)}
                    >
                      <span className="material-icons">chevron_left</span>
                    </button>
                    
                    {[...Array(Math.min(5, pagination.totalPages))].map((_, idx) => {
                      const pageNum = idx + 1;
                      return (
                        <button 
                          key={pageNum}
                          className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                            pagination.currentPage === pageNum 
                              ? 'bg-[var(--primary-color)] text-white' 
                              : 'hover:bg-gray-200'
                          }`}
                          onClick={() => handlePageChange(pageNum)}
                        >
                          {pageNum}
                        </button>
                      );
                    })}
                    
                    {pagination.totalPages > 5 && (
                      <>
                        <span>...</span>
                        <button 
                          className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                            pagination.currentPage === pagination.totalPages 
                              ? 'bg-[var(--primary-color)] text-white' 
                              : 'hover:bg-gray-200'
                          }`}
                          onClick={() => handlePageChange(pagination.totalPages)}
                        >
                          {pagination.totalPages}
                        </button>
                      </>
                    )}
                    
                    <button 
                      className="p-2 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={pagination.currentPage === pagination.totalPages}
                      onClick={() => handlePageChange(pagination.currentPage + 1)}
                    >
                      <span className="material-icons">chevron_right</span>
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </main>
    </>
  );
};

export default MarketplacePage;
