import React from 'react';
import type { PostedRide } from '../types';
import { Users, Edit, Trash2, ArrowRight } from 'lucide-react';

interface PostedRideCardProps {
    ride: PostedRide;
}

export const PostedRideCard: React.FC<PostedRideCardProps> = ({ ride }) => {
    return (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 transition-shadow hover:shadow-md">
            <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                <div className="flex-1">
                    <div className="flex items-center text-gray-700 bg-white p-2 rounded-md mb-2">
                        <span className="font-semibold truncate">{ride.route.from}</span>
                        <ArrowRight className="w-4 h-4 mx-2 flex-shrink-0 text-gray-400" />
                        <span className="font-semibold truncate text-right">{ride.route.to}</span>
                    </div>
                    <p className="text-sm text-gray-500 font-medium">{new Date(ride.time).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })}</p>
                </div>

                <div className="w-full sm:w-auto flex flex-row sm:flex-col items-center sm:items-end justify-between gap-2">
                    <p className="text-2xl font-bold text-primary">{ride.price}</p>
                    <div className="flex gap-1">
                        <button aria-label="Edit ride" className="p-2 text-gray-500 hover:text-primary hover:bg-white rounded-full transition-colors"><Edit size={18}/></button>
                        <button aria-label="Delete ride" className="p-2 text-gray-500 hover:text-red-500 hover:bg-white rounded-full transition-colors"><Trash2 size={18}/></button>
                    </div>
                </div>
            </div>

            <div className="mt-4 border-t pt-4">
                <h5 className="font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    <Users size={16} />
                    Passengers ({ride.passengers.length}/{ride.seats})
                </h5>
                {ride.passengers.length > 0 ? (
                    <div className="flex -space-x-2">
                        {ride.passengers.map(p => (
                            <img key={p.name} src={p.avatar} alt={p.name} title={p.name} className="w-8 h-8 rounded-full border-2 border-white" />
                        ))}
                    </div>
                ) : (
                    <p className="text-sm text-gray-500">No passengers yet.</p>
                )}
            </div>
        </div>
    );
};
