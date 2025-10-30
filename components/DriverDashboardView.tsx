import React, { useState } from 'react';
import type { PostedRide, User } from '../types';
import { ImpactTracker } from './ImpactTracker';
import { PostedRideCard } from './PostedRideCard';
import { PostRideModal } from './PostRideModal';
import { PlusCircle } from 'lucide-react';

const mockPassenger: User = { name: 'Emily R.', avatar: 'https://picsum.photos/seed/emily/100/100' };

// FIX: Add price to mock data and use ISO strings for dates.
const mockPostedRides: PostedRide[] = [
  { id: 'p1', route: { from: 'Uptown Dallas', to: 'DFW Airport' }, time: new Date(Date.now() + 3 * 60 * 60 * 1000).toISOString(), seats: 3, price: '$15', passengers: [mockPassenger] },
  { id: 'p2', route: { from: 'Plano', to: 'Downtown Dallas' }, time: new Date(Date.now() + 25 * 60 * 60 * 1000).toISOString(), seats: 2, price: '$12', passengers: [] },
];


export const DriverDashboardView: React.FC = () => {
  const [rides, setRides] = useState<PostedRide[]>(mockPostedRides);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePostRide = (newRideData: Omit<PostedRide, 'id' | 'passengers'>) => {
    const newRide: PostedRide = {
        ...newRideData,
        id: `p${Date.now()}`,
        passengers: [],
    };
    setRides(prev => [newRide, ...prev]);
  };
  
  return (
    <div className="space-y-8 animate-fade-in">
        <div className="p-6 bg-white rounded-xl shadow-lg">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
                <h2 className="text-3xl font-bold text-gray-800">Your Dashboard</h2>
                <button 
                    onClick={() => setIsModalOpen(true)}
                    className="w-full sm:w-auto flex items-center justify-center gap-2 bg-primary text-white font-bold py-3 px-4 rounded-lg hover:bg-primary-dark transition-colors"
                >
                    <PlusCircle size={20} />
                    <span>Offer a New Ride</span>
                </button>
            </div>
            
            <div className="space-y-4">
                {rides.length > 0 ? (
                    rides.map(ride => <PostedRideCard key={ride.id} ride={ride} />)
                ) : (
                    <p className="text-center text-gray-500 py-8">You haven't posted any rides yet.</p>
                )}
            </div>
        </div>

        <ImpactTracker />
      
        {isModalOpen && <PostRideModal onClose={() => setIsModalOpen(false)} onPostRide={handlePostRide} />}
    </div>
  );
};