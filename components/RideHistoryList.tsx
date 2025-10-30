import React, { useState } from 'react';
import { PastRide } from '../types';
import { RideHistoryCard } from './RideHistoryCard';

const mockHistory: PastRide[] = [
    { id: 'h1', date: '2024-07-20', role: 'passenger', user: { name: 'John K.', avatar: 'https://picsum.photos/seed/john/100/100' }, route: { from: 'Uptown Dallas', to: 'Bishop Arts District' }, cost: '$8' },
    { id: 'h2', date: '2024-07-18', role: 'driver', user: { name: 'Emily R.', avatar: 'https://picsum.photos/seed/emily/100/100' }, route: { from: 'Frisco', to: 'Legacy West' }, cost: '$10' },
    { id: 'h3', date: '2024-07-15', role: 'passenger', user: { name: 'David C.', avatar: 'https://picsum.photos/seed/david/100/100' }, route: { from: 'Arlington', to: 'AT&T Stadium' }, cost: '$12' },
    { id: 'h4', date: '2024-07-12', role: 'driver', user: { name: 'Sarah B.', avatar: 'https://picsum.photos/seed/sarah/100/100' }, route: { from: 'Fort Worth Stockyards', to: 'Sundance Square' }, cost: '$9' },
];

type HistoryFilter = 'all' | 'passenger' | 'driver';

export const RideHistoryList: React.FC = () => {
    const [filter, setFilter] = useState<HistoryFilter>('all');
    
    const filteredRides = mockHistory.filter(ride => {
        if (filter === 'all') return true;
        return ride.role === filter;
    });

    const TabButton: React.FC<{label: string, value: HistoryFilter}> = ({ label, value }) => (
        <button
            onClick={() => setFilter(value)}
            className={`px-4 py-2 text-sm font-semibold rounded-full transition-colors ${
                filter === value 
                ? 'bg-primary text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
        >
            {label}
        </button>
    );

    return (
        <div className="p-6 bg-white rounded-xl shadow-lg">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Ride History</h3>
            <div className="flex gap-2 mb-4 border-b pb-4">
                <TabButton label="All" value="all" />
                <TabButton label="As Passenger" value="passenger" />
                <TabButton label="As Driver" value="driver" />
            </div>
            {filteredRides.length > 0 ? (
                <div className="space-y-4">
                    {filteredRides.map(ride => (
                        <RideHistoryCard key={ride.id} ride={ride} />
                    ))}
                </div>
            ) : (
                <p className="text-center text-gray-500 py-4">No rides in this category.</p>
            )}
        </div>
    );
};