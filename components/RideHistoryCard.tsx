import React from 'react';
import type { PastRide } from '../types';
import { ArrowRight, Calendar } from 'lucide-react';

interface RideHistoryCardProps {
  ride: PastRide;
}

export const RideHistoryCard: React.FC<RideHistoryCardProps> = ({ ride }) => {
  const rideDate = new Date(ride.date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 transition-shadow hover:shadow-md">
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <img src={ride.user.avatar} alt={ride.user.name} className="w-8 h-8 rounded-full" />
            <p className="text-sm text-gray-600">
              {ride.role === 'passenger' ? 'Ride with' : 'Drove'} 
              <span className="font-semibold text-gray-800"> {ride.user.name}</span>
            </p>
          </div>
          <div className="flex items-center text-xs text-gray-500">
            <Calendar className="w-3 h-3 mr-1.5" />
            <span>{rideDate}</span>
          </div>
        </div>
        <p className="font-bold text-lg text-primary">{ride.cost}</p>
      </div>
      <div className="mt-3 flex items-center justify-between text-sm text-gray-700 bg-white p-2 rounded-md">
        <span className="font-medium truncate">{ride.route.from}</span>
        <ArrowRight className="w-4 h-4 mx-2 flex-shrink-0 text-gray-400" />
        <span className="font-medium truncate text-right">{ride.route.to}</span>
      </div>
    </div>
  );
};