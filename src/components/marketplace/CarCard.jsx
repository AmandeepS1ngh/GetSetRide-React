import React from 'react';
import { Link } from 'react-router-dom';

const CarCard = ({ car }) => {
  // Handle both API format (car.images array) and mock format (car.imageUrl)
  const imageUrl = car.images?.[0] || car.imageUrl || car.image || 'https://via.placeholder.com/400x300?text=No+Image';
  const carName = car.brand && car.model ? `${car.brand} ${car.model}` : car.name;
  const carId = car._id || car.id;
  const isAvailable = car.isActive !== false && car.available !== false;

  return (
    <div className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <Link to={`/car/${carId}`} className="block relative overflow-hidden">
        <div className="aspect-w-16 aspect-h-10">
          <img
            alt={carName}
            className="w-full h-52 object-cover object-center transform group-hover:scale-105 transition-transform duration-500"
            src={imageUrl}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://via.placeholder.com/400x300?text=No+Image';
            }}
          />
        </div>
        <div className="absolute top-3 right-3 text-xs font-bold px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-sm shadow-sm text-gray-800">
          {car.category || 'Car'}
        </div>
      </Link>

      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold text-gray-900 leading-tight group-hover:text-blue-600 transition-colors">
            <Link to={`/car/${carId}`}>{carName}</Link>
          </h3>
          <div className="flex items-center text-yellow-500 text-sm font-medium">
            <span className="material-icons text-base mr-1">star</span>
            {car.rating?.average || 'New'}
          </div>
        </div>

        <p className="flex items-baseline text-gray-900 mb-4">
          <span className="text-2xl font-bold">₹{car.pricePerDay || car.price}</span>
          <span className="text-sm text-gray-500 ml-1 font-medium">/ day</span>
        </p>

        <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-sm text-gray-600 mb-5">
          <div className="flex items-center">
            <span className="material-icons text-gray-400 text-lg mr-2">settings</span>
            <span className="truncate">{car.transmission}</span>
          </div>
          <div className="flex items-center">
            <span className="material-icons text-gray-400 text-lg mr-2">local_gas_station</span>
            <span className="truncate">{car.fuelType || car.fuel}</span>
          </div>
          <div className="flex items-center">
            <span className="material-icons text-gray-400 text-lg mr-2">airline_seat_recline_normal</span>
            <span className="truncate">{car.seats} Seats</span>
          </div>
          <div className="flex items-center">
            <span className="material-icons text-gray-400 text-lg mr-2">location_on</span>
            <span className="truncate">{car.location?.city || car.location || 'Nearby'}</span>
          </div>
        </div>

        <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
          <span
            className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full ${isAvailable
                ? 'bg-green-50 text-green-700'
                : 'bg-gray-100 text-gray-500'
              }`}
          >
            <span className={`w-2 h-2 rounded-full ${isAvailable ? 'bg-green-500' : 'bg-gray-400'}`}></span>
            {isAvailable ? 'Available' : 'Booked'}
          </span>

          <Link
            to={`/car/${carId}`}
            className="text-blue-600 font-bold text-sm hover:text-blue-700 transition-colors flex items-center gap-1"
          >
            Details
            <span className="material-icons text-sm">arrow_forward</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CarCard;
