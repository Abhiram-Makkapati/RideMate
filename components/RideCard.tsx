import React from 'react';
import type { Ride } from '../types';
import { ArrowRight, Users, Clock, Star } from 'lucide-react';

interface RideCardProps {
  ride: Ride;
  onSelect: () => void;
}

export const RideCard: React.FC<RideCardProps> = ({ ride, onSelect }) => {
  const departureTime = new Date(ride.departureTimestamp).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <button
      onClick={onSelect}
      className="w-full text-left p-4 bg-white rounded-xl shadow-lg border border-transparent hover:border-primary hover:shadow-xl transition-all duration-200 animate-fade-in"
    >
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Driver Info */}
        <div className="flex-shrink-0 flex sm:flex-col items-center gap-2 sm:w-24">
          <img
            src={ride.driver.avatar}
            alt={ride.driver.name}
            className="w-12 h-12 sm:w-16 sm:h-16 rounded-full border-2 border-gray-200"
          />
          <div className="text-center">
            <p className="font-bold text-gray-800 text-sm sm:text-base">{ride.driver.name}</p>
            <div className="flex items-center justify-center text-xs text-gray-500">
              <Star className="w-3 h-3 text-yellow-500 mr-1" />
              <span>{ride.driver.rating.toFixed(1)}</span>
            </div>
          </div>
        </div>

        <div className="w-full border-t sm:border-t-0 sm:border-l pt-4 sm:pt-0 sm:pl-4">
            {/* Route */}
            <div className="flex items-center text-gray-700 font-semibold mb-3">
                <span className="truncate max-w-[120px] md:max-w-xs">{ride.route.from}</span>
                <ArrowRight className="w-5 h-5 mx-2 flex-shrink-0 text-primary" />
                <span className="truncate max-w-[120px] md:max-w-xs">{ride.route.to}</span>
            </div>

            {/* Details */}
            <div className="flex flex-wrap items-center justify-between text-sm text-gray-600">
                <div className="flex items-center gap-2" title="Departure Time">
                    <Clock size={16} className="text-gray-400" />
                    <span className="font-medium">Departs at {departureTime}</span>
                </div>
                <div className="flex items-center gap-2" title="Available Seats">
                    <Users size={16} className="text-gray-400" />
                    <span className="font-medium">{ride.availableSeats} seats left</span>
                </div>
                 <p className="text-xl font-bold text-primary mt-2 sm:mt-0">{ride.price}</p>
            </div>
        </div>
      </div>
    </button>
  );
};
