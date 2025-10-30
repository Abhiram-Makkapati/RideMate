import React from 'react';
import type { Ride } from '../types';
import { RideCard } from './RideCard';

interface RideListProps {
  rides: Ride[];
  onRideSelect: (ride: Ride) => void;
}

export const RideList: React.FC<RideListProps> = ({ rides, onRideSelect }) => {
  if (rides.length === 0) {
    return (
      <div className="text-center py-10 px-6 bg-white rounded-xl shadow-lg">
        <h3 className="text-xl font-semibold text-gray-800">No Rides Found</h3>
        <p className="text-gray-500 mt-2">Try adjusting your search criteria or check back later.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {rides.map(ride => (
        <RideCard key={ride.id} ride={ride} onSelect={() => onRideSelect(ride)} />
      ))}
    </div>
  );
};
