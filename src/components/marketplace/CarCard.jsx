import React from 'react';
import { Link } from 'react-router-dom';

const CarCard = ({ car }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <Link to={`/car/${car.id}`}>
        <img 
          alt={car.name} 
          className="w-full h-48 object-cover cursor-pointer" 
          src={car.imageUrl}
        />
      </Link>
      <div className="p-4">
        <h3 className="text-lg font-bold cursor-pointer hover:text-[var(--primary-color)]">
          <Link to={`/car/${car.id}`}>{car.name}</Link>
        </h3>
        <p className="text-[var(--primary-color)] font-semibold text-xl mt-1">
          ₹{car.price} <span className="text-sm font-normal text-gray-500">/ day</span>
        </p>
        <div className="text-gray-600 text-sm mt-2 space-y-1">
          <p className="flex items-center">
            <span className="material-icons text-base mr-2">sync_alt</span>
            {car.transmission}
          </p>
          <p className="flex items-center">
            <span className="material-icons text-base mr-2">local_gas_station</span>
            {car.fuelType}
          </p>
          <p className="flex items-center">
            <span className="material-icons text-base mr-2">person</span>
            {car.seats} Seats
          </p>
          <p className="flex items-center">
            <span className="material-icons text-base mr-2">location_on</span>
            {car.distance} miles away
          </p>
        </div>
        <div className="mt-4 flex justify-between items-center">
          <span 
            className={`${
              car.available 
                ? 'bg-green-100 text-green-700' 
                : 'bg-yellow-100 text-yellow-700'
            } text-xs font-semibold px-2.5 py-1 rounded-full`}
          >
            {car.available ? 'Available' : 'Booked'}
          </span>
          <Link 
            className={`${
              car.available
                ? 'bg-[var(--primary-color)] hover:bg-[var(--primary-hover-color)]'
                : 'bg-gray-400 cursor-not-allowed'
            } text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors`}
            to={`/car/${car.id}`}
          >
            {car.available ? 'Book Now' : 'View Details'}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CarCard;
