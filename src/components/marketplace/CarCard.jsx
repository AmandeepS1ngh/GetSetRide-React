import React from 'react';
import { Link } from 'react-router-dom';

const CarCard = ({ car }) => {
  // Handle both API format (car.images array) and mock format (car.imageUrl)
  const imageUrl = car.images?.[0] || car.imageUrl || car.image || 'https://via.placeholder.com/400x300?text=No+Image';
  const carName = car.brand && car.model ? `${car.brand} ${car.model}` : car.name;
  const carId = car._id || car.id;
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <Link to={`/car/${carId}`}>
        <img 
          alt={carName} 
          className="w-full h-48 object-cover cursor-pointer" 
          src={imageUrl}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://via.placeholder.com/400x300?text=No+Image';
          }}
        />
      </Link>
      <div className="p-4">
        <h3 className="text-lg font-bold cursor-pointer hover:text-[var(--primary-color)]">
          <Link to={`/car/${carId}`}>{carName}</Link>
        </h3>
        <p className="text-[var(--primary-color)] font-semibold text-xl mt-1">
          ₹{car.pricePerDay || car.price} <span className="text-sm font-normal text-gray-500">/ day</span>
        </p>
        <div className="text-gray-600 text-sm mt-2 space-y-1">
          <p className="flex items-center">
            <span className="material-icons text-base mr-2">sync_alt</span>
            {car.transmission}
          </p>
          <p className="flex items-center">
            <span className="material-icons text-base mr-2">local_gas_station</span>
            {car.fuelType || car.fuel}
          </p>
          <p className="flex items-center">
            <span className="material-icons text-base mr-2">person</span>
            {car.seats} Seats
          </p>
          <p className="flex items-center">
            <span className="material-icons text-base mr-2">location_on</span>
            {car.location?.city || car.location || car.distance + ' miles away'}
          </p>
        </div>
        <div className="mt-4 flex justify-between items-center">
          <span 
            className={`${
              car.isActive !== false && car.available !== false
                ? 'bg-green-100 text-green-700' 
                : 'bg-yellow-100 text-yellow-700'
            } text-xs font-semibold px-2.5 py-1 rounded-full`}
          >
            {car.isActive !== false && car.available !== false ? 'Available' : 'Booked'}
          </span>
          <Link 
            className={`${
              car.isActive !== false && car.available !== false
                ? 'bg-[var(--primary-color)] hover:bg-[var(--primary-hover-color)]'
                : 'bg-gray-400 cursor-not-allowed'
            } text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors`}
            to={`/car/${carId}`}
          >
            {car.isActive !== false && car.available !== false ? 'Book Now' : 'View Details'}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CarCard;
