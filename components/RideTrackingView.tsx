import React, { useState } from 'react';
import type { Ride, Driver } from '../types';
import { Map } from './Map';
import { MessageSquare, Phone, XCircle, Search } from 'lucide-react';

interface RideTrackingViewProps {
  ride: Ride;
  onNavigateHome: () => void;
  onStartChat: (driver: Driver) => void;
  onCancelRide: () => void;
}

export const RideTrackingView: React.FC<RideTrackingViewProps> = ({ ride, onNavigateHome, onStartChat, onCancelRide }) => {
  const [currentEta, setCurrentEta] = useState(ride.eta);

  const formatTime = (isoString: string) => {
    return new Date(isoString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }
  
  const now = new Date();
  const departureTime = new Date(ride.departureTimestamp);
  const canCancel = (departureTime.getTime() - now.getTime()) / (1000 * 60) > 20;

  const handleCancelClick = () => {
    if (window.confirm("Are you sure you want to cancel this ride?")) {
      onCancelRide();
    }
  };


  return (
    <div className="space-y-6 animate-fade-in">
      {/* Map */}
      <div className="h-64 md:h-80 w-full bg-gray-200 rounded-xl shadow-lg overflow-hidden relative">
        <Map ride={ride} onEtaChange={setCurrentEta} />
      </div>

      {/* Ride Info */}
      <div className="p-6 bg-white rounded-xl shadow-lg">
        <div className="flex justify-between items-center pb-4 border-b">
          <div>
            <p className="text-sm text-gray-500">Your ride is confirmed!</p>
            <p className="text-2xl font-bold text-gray-800">Pickup {currentEta}</p>
          </div>
          <p className="text-3xl font-bold text-primary">{ride.price}</p>
        </div>

        <div className="mt-4 text-center">
            <p className="font-semibold text-lg text-gray-800">{ride.route.from} to {ride.route.to}</p>
            <p className="text-sm text-gray-500">
                {formatTime(ride.departureTimestamp)} - {formatTime(ride.arrivalTimestamp)}
            </p>
        </div>
      </div>
      
      {/* Driver Info */}
      <div className="p-6 bg-white rounded-xl shadow-lg">
         <h3 className="text-lg font-semibold text-gray-700 mb-4">Your Driver</h3>
         <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
               <img src={ride.driver.avatar} alt={ride.driver.name} className="w-16 h-16 rounded-full" />
               <div>
                  <p className="font-bold text-xl text-gray-800">{ride.driver.name}</p>
                  <p className="text-sm text-gray-600">{ride.driver.rating} ★</p>
               </div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => onStartChat(ride.driver)} className="p-3 bg-primary/10 text-primary rounded-full hover:bg-primary/20 transition-colors" aria-label="Message driver">
                 <MessageSquare size={24} />
              </button>
               <button className="p-3 bg-gray-100 text-gray-600 rounded-full hover:bg-gray-200 transition-colors" aria-label="Call driver">
                 <Phone size={24} />
              </button>
            </div>
         </div>
         {ride.driver.vehicle && (
            <div className="mt-4 border-t pt-4 text-center bg-gray-50 p-3 rounded-lg">
                <p className="text-lg font-mono tracking-widest text-gray-800 bg-white border-2 border-gray-700 inline-block px-4 py-1 rounded">
                    {ride.driver.vehicle.licensePlate}
                </p>
                <p className="text-sm text-gray-600 mt-2">
                    {ride.driver.vehicle.color} {ride.driver.vehicle.make} {ride.driver.vehicle.model}
                </p>
            </div>
         )}
      </div>

      {/* Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <button 
            onClick={handleCancelClick} 
            disabled={!canCancel}
            className="w-full flex items-center justify-center gap-2 bg-red-100 text-red-700 font-bold py-3 px-4 rounded-lg hover:bg-red-200 transition-colors disabled:bg-gray-200 disabled:text-gray-500 disabled:cursor-not-allowed"
        >
            <XCircle size={20} />
            <span>Cancel Ride</span>
        </button>
         <button onClick={onNavigateHome} className="w-full flex items-center justify-center gap-2 bg-gray-100 text-gray-700 font-bold py-3 px-4 rounded-lg hover:bg-gray-200 transition-colors">
            <Search size={20} />
            <span>Find Another Ride</span>
        </button>
      </div>
      {!canCancel && <p className="text-center text-xs text-gray-500">Rides cannot be cancelled within 20 minutes of departure.</p>}
    </div>
  );
};