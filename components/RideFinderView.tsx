import React, { useState, useEffect, useCallback } from 'react';
import type { Ride, Location } from '../types';
import { useGeolocation } from '../hooks/useGeolocation';
import { findRides } from '../services/geminiService';
import { RideList } from './RideList';
import { AutocompleteInput } from './AutocompleteInput';
import { getAutocompleteSuggestions } from '../services/locationService';
import { MapPin, ArrowRight, Search, Loader, AlertTriangle, Globe } from 'lucide-react';
import { getDistanceFromLatLonInKm } from '../utils/geolocation';


interface RideFinderViewProps {
  onRideSelect: (ride: Ride) => void;
}

export const RideFinderView: React.FC<RideFinderViewProps> = ({ onRideSelect }) => {
  const [fromLocation, setFromLocation] = useState<Location | null>({ name: 'Downtown Dallas', coords: { latitude: 32.779167, longitude: -96.808891 } });
  const [toLocation, setToLocation] = useState<Location | null>({ name: 'Uptown Dallas', coords: { latitude: 32.803, longitude: -96.804 } });
  const [fromValue, setFromValue] = useState('Downtown Dallas');
  const [toValue, setToValue] = useState('Uptown Dallas');
  
  const [suggestions, setSuggestions] = useState<Location[]>([]);
  
  const [allRides, setAllRides] = useState<Ride[]>([]);
  const [filteredRides, setFilteredRides] = useState<Ride[]>([]);
  const [groundingChunks, setGroundingChunks] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const { location: userCoords, error: geoError, loading: geoLoading } = useGeolocation();

  const [searchNearby, setSearchNearby] = useState(true);

  const handleSearch = useCallback(async () => {
    if (!fromValue || !toValue) {
      setError("Please enter both a starting point and a destination.");
      return;
    }
    if (!userCoords && !geoError) {
      setError("Waiting for your location... Please try again in a moment.");
      return;
    }
    if (geoError) {
      setError("Could not get your location. Please enable location services.");
    }
    
    setLoading(true);
    setError(null);
    setAllRides([]);
    setFilteredRides([]);
    setGroundingChunks([]);

    const userLocation = userCoords ? { latitude: userCoords.latitude, longitude: userCoords.longitude } : { latitude: 32.7767, longitude: -96.7970 }; // Default to Dallas, TX

    try {
      // For this mock, we'll imagine Gemini is smart enough to find rides in the general area
      // And we'll do the fine-grained filtering on the client
      const result = await findRides(fromValue, toValue, userLocation);
      if (result.rides.length === 0) {
        setError("No rides found for this route. Try another search!");
      } else {
        setAllRides(result.rides);
        setGroundingChunks(result.groundingChunks);
      }
    } catch (err) {
      setError("An error occurred while searching for rides. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fromValue, toValue, userCoords, geoError]);
  
  // Auto-search on initial load
  useEffect(() => {
    if (userCoords) {
      handleSearch();
    }
  }, [userCoords, handleSearch]);

  // Client-side filtering logic
  useEffect(() => {
    if (!fromLocation || !toLocation) {
        setFilteredRides(allRides);
        return;
    }

    const radiusKm = 8.04672; // 5 miles in kilometers

    const filtered = allRides.filter(ride => {
        const fromMatch = ride.route.from.toLowerCase() === fromLocation.name.toLowerCase();
        const toMatch = ride.route.to.toLowerCase() === toLocation.name.toLowerCase();
        
        if (!searchNearby) {
            return fromMatch && toMatch;
        }

        const distFrom = getDistanceFromLatLonInKm(fromLocation.coords.latitude, fromLocation.coords.longitude, ride.startCoords.latitude, ride.startCoords.longitude);
        const distTo = getDistanceFromLatLonInKm(toLocation.coords.latitude, toLocation.coords.longitude, ride.endCoords.latitude, ride.endCoords.longitude);

        // A ride is valid if EITHER its start is near the user's start AND its end is near the user's end
        // OR its start is near the user's end AND its end is near the user's start (reverse trip)
        const isForwardMatch = distFrom <= radiusKm && distTo <= radiusKm;
        
        return isForwardMatch;
    });
    setFilteredRides(filtered);

  }, [allRides, fromLocation, toLocation, searchNearby]);

  const handleSuggestionFetch = async (query: string) => {
    if (query.length > 0) {
      const results = await getAutocompleteSuggestions(query);
      setSuggestions(results);
    } else {
      setSuggestions([]);
    }
  };


  return (
    <div className="space-y-6 animate-fade-in">
      <div className="p-6 bg-white rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Find a Ride</h2>
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr_auto] gap-4 items-end">
          <AutocompleteInput
            id="from-finder"
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
          <ArrowRight className="hidden md:block text-gray-400 h-8 w-8 mb-3" />
          <AutocompleteInput
            id="to-finder"
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
          <button
            onClick={handleSearch}
            disabled={loading || geoLoading}
            className="w-full md:w-auto flex items-center justify-center gap-2 bg-primary text-white font-bold py-3 px-6 rounded-lg hover:bg-primary-dark transition-colors disabled:bg-gray-400"
          >
            {loading || geoLoading ? <Loader className="animate-spin" size={20} /> : <Search size={20} />}
            <span>{loading ? 'Searching...' : 'Search'}</span>
          </button>
        </div>
        <div className="mt-4 flex items-center">
            <label htmlFor="nearby-toggle" className="flex items-center cursor-pointer">
                <div className="relative">
                    <input type="checkbox" id="nearby-toggle" className="sr-only" checked={searchNearby} onChange={() => setSearchNearby(!searchNearby)} />
                    <div className="block bg-gray-300 w-10 h-6 rounded-full"></div>
                    <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${searchNearby ? 'translate-x-full bg-primary' : ''}`}></div>
                </div>
                <div className="ml-3 text-sm text-gray-600 font-medium">
                    Include nearby rides (5-mile radius)
                </div>
            </label>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-100 text-red-700 rounded-lg flex items-center gap-3">
            <AlertTriangle />
            <p>{error}</p>
        </div>
      )}

      {loading && (
        <div className="text-center py-10">
          <Loader className="animate-spin h-12 w-12 text-primary mx-auto" />
          <p className="mt-4 text-gray-600 font-semibold">Searching for available rides...</p>
        </div>
      )}

      {!loading && (
        <div className="space-y-4">
             <h3 className="text-xl font-bold text-gray-700">Available Rides</h3>
            <RideList rides={filteredRides} onRideSelect={onRideSelect} />
        </div>
      )}
      
      {groundingChunks.length > 0 && (
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h4 className="font-semibold text-blue-800 mb-2 flex items-center gap-2"><Globe size={16}/> Grounding Information</h4>
            <ul className="list-disc list-inside text-sm text-blue-700 space-y-1">
                {groundingChunks.map((chunk, index) => chunk.maps && (
                    <li key={index}>
                        <a href={chunk.maps.uri} target="_blank" rel="noopener noreferrer" className="hover:underline font-medium">
                            {chunk.maps.title}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
      )}
    </div>
  );
};