import React, { useState } from 'react';
import type { PostedRide, Location } from '../types';
import { getAutocompleteSuggestions } from '../services/locationService';
import { AutocompleteInput } from './AutocompleteInput';
import { MapPin, Clock, Users, DollarSign, X } from 'lucide-react';

interface PostRideModalProps {
  onClose: () => void;
  onPostRide: (rideData: Omit<PostedRide, 'id' | 'passengers'>) => void;
}

export const PostRideModal: React.FC<PostRideModalProps> = ({ onClose, onPostRide }) => {
  const [fromLocation, setFromLocation] = useState<Location | null>(null);
  const [toLocation, setToLocation] = useState<Location | null>(null);
  const [fromValue, setFromValue] = useState('');
  const [toValue, setToValue] = useState('');

  const [time, setTime] = useState('');
  const [seats, setSeats] = useState(1);
  const [price, setPrice] = useState('');
  
  const [suggestions, setSuggestions] = useState<Location[]>([]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fromLocation || !toLocation) {
        alert("Please select a valid location from the suggestions.");
        return;
    }
    onPostRide({
      route: { from: fromLocation.name, to: toLocation.name },
      time,
      seats: Number(seats),
      price,
    });
    onClose();
  };

  const handleSuggestionFetch = async (query: string) => {
    if (query.length > 0) {
      const results = await getAutocompleteSuggestions(query);
      setSuggestions(results);
    } else {
      setSuggestions([]);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg relative">
        <div className="p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-800">Offer a New Ride</h2>
          <button onClick={onClose} className="absolute top-4 right-4 p-2 text-gray-500 hover:bg-gray-100 rounded-full">
            <X size={24} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <AutocompleteInput
              id="from-modal"
              label="Leaving from"
              value={fromValue}
              onValueChange={(val) => {
                setFromValue(val);
                handleSuggestionFetch(val);
              }}
              onLocationSelect={setFromLocation}
              placeholder="e.g., Downtown Dallas"
              suggestions={suggestions}
              icon={<MapPin className="text-gray-400" />}
          />
          <AutocompleteInput
              id="to-modal"
              label="Going to"
              value={toValue}
              onValueChange={(val) => {
                setToValue(val);
                handleSuggestionFetch(val);
              }}
              onLocationSelect={setToLocation}
              placeholder="e.g., DFW Airport"
              suggestions={suggestions}
              icon={<MapPin className="text-gray-400" />}
          />
          <InputWrapper label="Departure Time" icon={<Clock className="text-gray-400" />}>
             <input type="datetime-local" value={time} onChange={(e) => setTime(e.target.value)} required className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition" />
          </InputWrapper>
          <div className="grid grid-cols-2 gap-4">
             <InputWrapper label="Available Seats" icon={<Users className="text-gray-400" />}>
                 <input type="number" value={seats} onChange={(e) => setSeats(Number(e.target.value))} min="1" max="8" required className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition" />
              </InputWrapper>
              <InputWrapper label="Price per seat" icon={<DollarSign className="text-gray-400" />}>
                 <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="$10" required className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition" />
              </InputWrapper>
          </div>
          <div className="flex justify-end gap-3 pt-4">
              <button type="button" onClick={onClose} className="px-6 py-2 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition-colors">Cancel</button>
              <button type="submit" className="px-6 py-2 bg-primary text-white font-bold rounded-lg hover:bg-primary-dark transition-colors">Post Ride</button>
          </div>
        </form>
      </div>
    </div>
  );
};


const InputWrapper: React.FC<{ label: string; icon: React.ReactNode; children: React.ReactNode }> = ({ label, icon, children }) => (
    <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
        <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              {icon}
            </div>
            {children}
        </div>
    </div>
);