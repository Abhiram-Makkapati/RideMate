import React from 'react';
import type { Ride } from '../types';
import { X, ArrowRight, User, Clock, DollarSign, Users, Car, Star } from 'lucide-react';

interface RideConfirmationModalProps {
  ride: Ride;
  onConfirm: () => void;
  onClose: () => void;
}

export const RideConfirmationModal: React.FC<RideConfirmationModalProps> = ({ ride, onConfirm, onClose }) => {
  const departureTime = new Date(ride.departureTimestamp).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' });

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md relative overflow-hidden">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
             <h2 className="text-2xl font-bold text-gray-800">Confirm Your Ride</h2>
             <button onClick={onClose} className="p-2 text-gray-500 hover:bg-gray-100 rounded-full">
                <X size={24} />
             </button>
          </div>

          <div className="space-y-4 text-gray-700">
            {/* Route */}
            <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm font-semibold text-gray-600 mb-1">Route</p>
                <div className="flex items-center font-bold text-lg">
                    <span className="truncate">{ride.route.from}</span>
                    <ArrowRight className="w-5 h-5 mx-3 flex-shrink-0 text-primary" />
                    <span className="truncate">{ride.route.to}</span>
                </div>
            </div>

            {/* Driver Info */}
            <div className="flex items-center gap-4">
                <img src={ride.driver.avatar} alt={ride.driver.name} className="w-12 h-12 rounded-full" />
                <div>
                    <p className="font-bold">{ride.driver.name}</p>
                    <div className="flex items-center text-sm text-gray-500">
                      <Star className="w-4 h-4 text-yellow-500 mr-1" />
                      <span>{ride.driver.rating.toFixed(1)} Rating</span>
                    </div>
                </div>
            </div>

             {/* Vehicle Info */}
            {ride.driver.vehicle && (
                <div className="flex items-center gap-3 text-sm">
                    <Car className="text-gray-500" size={18} />
                    <span>{ride.driver.vehicle.color} {ride.driver.vehicle.make} {ride.driver.vehicle.model} - <strong>{ride.driver.vehicle.licensePlate}</strong></span>
                </div>
             )}

            <div className="grid grid-cols-2 gap-4 text-sm border-t pt-4">
                <div className="flex items-center gap-3">
                    <Clock className="text-gray-500" size={18} />
                    <div>
                        <p className="font-semibold">Departure</p>
                        <p>{departureTime}</p>
                    </div>
                </div>
                 <div className="flex items-center gap-3">
                    <Users className="text-gray-500" size={18} />
                    <div>
                        <p className="font-semibold">Seats</p>
                        <p>{ride.availableSeats} available</p>
                    </div>
                </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 p-6 flex items-center justify-between">
            <div>
                 <p className="text-sm text-gray-600">Total Price</p>
                 <p className="text-3xl font-bold text-primary">{ride.price}</p>
            </div>
            <div className="flex gap-3">
                 <button onClick={onClose} className="px-5 py-3 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition-colors">
                    Cancel
                 </button>
                 <button onClick={onConfirm} className="px-5 py-3 bg-primary text-white font-bold rounded-lg hover:bg-primary-dark transition-colors">
                    Book Now
                 </button>
            </div>
        </div>
      </div>
    </div>
  );
};
