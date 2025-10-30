import React from 'react';
import type { UserProfile, View } from '../types';
import { RideHistoryList } from './RideHistoryList';
import { LogOut, Award, Car, Users } from 'lucide-react';

interface ProfileViewProps {
    user: UserProfile;
    onLogout: () => void;
    onNavigate: (view: View) => void;
}

const StatCard: React.FC<{ icon: React.ReactNode; value: string; label: string; }> = ({ icon, value, label }) => (
    <div className="flex-1 bg-gray-100 p-4 rounded-lg flex items-center gap-4">
        {icon}
        <div>
            <p className="font-bold text-lg text-gray-800">{value}</p>
            <p className="text-sm text-gray-600">{label}</p>
        </div>
    </div>
);


export const ProfileView: React.FC<ProfileViewProps> = ({ user, onLogout, onNavigate }) => {
    const memberSince = new Date(user.memberSince).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
    });

    return (
        <div className="space-y-8">
            <div className="p-6 bg-white rounded-xl shadow-lg flex flex-col items-center text-center">
                <img 
                    src={user.avatarUrl} 
                    alt={user.name}
                    className="w-24 h-24 rounded-full border-4 border-primary mb-4"
                />
                <h2 className="text-3xl font-bold text-gray-800">{user.name}</h2>
                <p className="text-gray-500 mt-1">Member since {memberSince}</p>
                <div className="mt-6 w-full max-w-lg flex flex-col sm:flex-row gap-2">
                    <StatCard icon={<Award className="h-8 w-8 text-yellow-500" />} value="12" label="Total Rides" />
                    <StatCard icon={<Car className="h-8 w-8 text-secondary" />} value="4" label="Rides Driven" />
                    <StatCard icon={<Users className="h-8 w-8 text-secondary" />} value="8" label="Rides Taken" />
                </div>
            </div>

            {!user.isVerifiedDriver && (
                <div className="p-6 bg-primary/10 rounded-xl shadow-lg text-center">
                    <h3 className="text-xl font-bold text-primary-dark">Want to offer rides?</h3>
                    <p className="text-gray-600 mt-2 mb-4">Complete your driver profile to start earning by sharing your rides with the community.</p>
                    <button
                        onClick={() => onNavigate('driver')}
                        className="flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white font-bold rounded-lg hover:bg-primary-dark transition-colors mx-auto"
                    >
                        <Car size={20} />
                        <span>Become a Driver</span>
                    </button>
                </div>
            )}

            <RideHistoryList />

             <div className="p-4 bg-white rounded-xl shadow-lg">
                <button
                    onClick={onLogout}
                    className="w-full flex items-center justify-center gap-2 bg-red-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
                >
                    <LogOut className="h-5 w-5" />
                    <span>Logout</span>
                </button>
            </div>
        </div>
    );
};