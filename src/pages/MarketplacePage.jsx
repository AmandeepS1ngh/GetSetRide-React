import React, { useState } from 'react';
import Header from '../components/common/Header';
import CarCard from '../components/marketplace/CarCard';

const MarketplacePage = () => {
  // Sample car data
  const [cars] = useState([
    {
      id: 1,
      name: "Chevrolet Camaro",
      price: 2500,
      imageUrl: "https://bringatrailer.com/wp-content/uploads/2022/08/1969_chevrolet_camaro_TED76715-36983.jpg?w=620&resize=620%2C413",
      transmission: "Manual",
      fuelType: "Gasoline",
      seats: 4,
      distance: 2.5,
      available: true,
      rating: 4.8,
      trips: 45,
      location: "New York, NY"
    },
    {
      id: 2,
      name: "Ferrari 488",
      price: 5000,
      imageUrl: "https://images.pexels.com/photos/13437208/pexels-photo-13437208.jpeg?cs=srgb&dl=pexels-caspersomia-13437208.jpg&fm=jpg",
      transmission: "Automatic",
      fuelType: "Gasoline",
      seats: 2,
      distance: 1.2,
      available: true,
      rating: 4.9,
      trips: 32,
      location: "Manhattan, NY"
    },
    {
      id: 3,
      name: "Lamborghini Aventador",
      price: 7500,
      imageUrl: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMSEBUQEhISERIQFRUVEBIVGBMVFRIWFRIYFxcWFxgaHSgiGBomGxUWIj0hJSkrLi4vFx8zODMsOCgtLy0BCgoKDg0OGhAQFzclHR0tLS83LS0tLS0tLS0wLS8vLS0tKys1LS0rKy0tLTUwKy0tLS0rLS83Li03LS0tNisrK//AABEIALUBFgMBIgACEQEDEQH/xAAcAAEAAQUBAQAAAAAAAAAAAAAAAwIEBQYHCAH/xABCEAACAQIDAwgGBwYGAwAAAAABAgADEQQSIQUTMQYiQVFSYXGRBxQyQoGhI1NigpKx0RUzcpOiwVRjg7LC8ENz4f/EABcBAQEBAQAAAAAAAAAAAAAAAAABAgP/xAAgEQEBAQACAgEFAAAAAAAAAAAAEQECEiExQVFhcdHw/9oADAMBAAIRAxEAPwDuMREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERARE1/b3LXAYPTEYlEbsLd3P3UBMDYInJNp+l6rV5uzcC9QMQFxFfm0ySbCygjMb9GYHummYjb21doFkOMquPepYNciKDwzVeYtuPF2vY9UsHetqco8LhtK2IpIw9y9314cxbsfKYXaPpHwFG+aqTboFr+BUkFfiBORYD0eVDcs6U83G7tULX15y0wqnX7Z4TL4b0d0FGtVvuJTUf154mDZq/pqwYNlw+JfqI3JB7+a5PykbemmgDb1TEd3/bTGUuReGXprH76r/sUSZeSWFHRW/nVv7NHhb9mSp+mTDnjhMSPAAysemfBe9Qxa/6an/kJzXlPUNDGNRo1Kqoop6Z6hsWRSeJ75idr4ty7DMWAsVzWYewD036bzXXE7fZ2xfS3gPfXFUx1vSsPO8usN6VNlPp60FPU1Or+YW0860a4YlXLAEcFsAe63AeUvMuHcbus24qIn0VcB6lGsoNhnpm7Um6OYQLkiw4mdVu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",
      transmission: "Automatic",
      fuelType: "Gasoline",
      seats: 2,
      distance: 3.1,
      available: false,
      rating: 4.7,
      trips: 28,
      location: "Brooklyn, NY"
    },
    {
      id: 4,
      name: "Audi R8",
      price: 4500,
      imageUrl: "https://imgd.aeplcdn.com/664x374/n/s5vbe5a_1435589.jpg?q=80",
      transmission: "Automatic",
      fuelType: "Gasoline",
      seats: 2,
      distance: 0.8,
      available: true,
      rating: 4.9,
      trips: 67,
      location: "Queens, NY"
    },
    {
      id: 5,
      name: "Ford Mustang",
      price: 2000,
      imageUrl: "https://thumbs.dreamstime.com/b/vintage-white-ford-mustang-black-wheels-vintage-white-ford-mustang-black-wheels-photographed-front-gray-369588593.jpg",
      transmission: "Manual",
      fuelType: "Gasoline",
      seats: 4,
      distance: 4.2,
      available: true,
      rating: 4.6,
      trips: 23,
      location: "Bronx, NY"
    },
    {
      id: 6,
      name: "Jeep Wrangler",
      price: 1800,
      imageUrl: "https://adventurelifeusa.com/cdn/shop/files/bg006-rJLU.jpg?v=1702952638&width=720",
      transmission: "Manual",
      fuelType: "Gasoline",
      seats: 5,
      distance: 2.8,
      available: true,
      rating: 4.8,
      trips: 41,
      location: "Staten Island, NY"
    }
  ]);

  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-8">
        {/* Search Section */}
        <section className="bg-white p-6 rounded-lg shadow-md mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-center">
            <div className="relative">
              <span className="material-icons absolute top-3 left-3 text-gray-400">location_on</span>
              <input
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
                placeholder="Where"
                type="text"
              />
            </div>
            <div className="relative">
              <span className="material-icons absolute top-3 left-3 text-gray-400">date_range</span>
              <input
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
                placeholder="When"
                type="date"
              />
            </div>
            <div className="relative col-span-1 lg:col-span-1">
              <span className="material-icons absolute top-3 left-3 text-gray-400">search</span>
              <input
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
                placeholder="Search cars..."
                type="text"
              />
            </div>
            <button
              className="w-full bg-[var(--primary-color)] text-white py-2.5 rounded-lg font-semibold hover:bg-[var(--primary-hover-color)] transition-colors">
              Search
            </button>
          </div>
        </section>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <aside className="w-full lg:w-1/4">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold">Filters</h3>
                <button className="text-[var(--primary-color)] text-sm">Clear All</button>
              </div>
              <div className="space-y-6">
                {/* Price Range */}
                <div>
                  <h4 className="font-medium mb-3">Price Range</h4>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      <span className="text-sm">Under ₹1000</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      <span className="text-sm">₹1000 - ₹3000</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      <span className="text-sm">₹3000 - ₹5000</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      <span className="text-sm">Above ₹5000</span>
                    </label>
                  </div>
                </div>

                {/* Car Type */}
                <div>
                  <h4 className="font-medium mb-3">Car Type</h4>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      <span className="text-sm">SUV</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      <span className="text-sm">Sedan</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      <span className="text-sm">Hatchback</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      <span className="text-sm">Sports</span>
                    </label>
                  </div>
                </div>

                {/* Transmission */}
                <div>
                  <h4 className="font-medium mb-3">Transmission</h4>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      <span className="text-sm">Automatic</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      <span className="text-sm">Manual</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="w-full lg:w-3/4">
            <div className="flex justify-between items-center mb-6">
              <p className="text-gray-600">Showing 1-6 of 50 results</p>
              <div className="relative">
                <select className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]">
                  <option>Sort by: Price (Low to High)</option>
                  <option>Sort by: Price (High to Low)</option>
                  <option>Sort by: Rating</option>
                  <option>Sort by: Distance</option>
                </select>
                <span className="material-icons absolute right-2 top-2 text-gray-400 pointer-events-none">expand_more</span>
              </div>
            </div>

            {/* Car Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {cars.map(car => (
                <CarCard key={car.id} car={car} />
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-8 flex justify-center items-center space-x-2">
              <button className="p-2 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50" disabled>
                <span className="material-icons">chevron_left</span>
              </button>
              <button className="px-4 py-2 rounded-lg bg-[var(--primary-color)] text-white font-semibold">1</button>
              <button className="px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors">2</button>
              <button className="px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors">3</button>
              <span>...</span>
              <button className="px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors">8</button>
              <button className="p-2 rounded-lg hover:bg-gray-200 transition-colors">
                <span className="material-icons">chevron_right</span>
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default MarketplacePage;
