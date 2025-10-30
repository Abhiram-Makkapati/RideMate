import React from 'react';
import type { View, UserProfile } from '../types';
import { Search, PlusCircle, User, Car, LogOut, MessageSquare } from 'lucide-react';

interface SidebarNavProps {
  currentView: View;
  onNavigate: (view: View) => void;
  user: UserProfile;
  onLogout: () => void;
}

const SidebarButton: React.FC<{
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onClick: () => void;
}> = ({ icon, label, isActive, onClick }) => {
  const activeClasses = 'bg-primary/10 text-primary';
  const inactiveClasses = 'text-gray-600 hover:bg-gray-100';
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 p-3 rounded-lg font-semibold text-left transition-colors duration-200 ${
        isActive ? activeClasses : inactiveClasses
      }`}
      aria-label={label}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
};

export const SidebarNav: React.FC<SidebarNavProps> = ({ currentView, onNavigate, user, onLogout }) => {
  return (
    <aside className="fixed top-0 left-0 h-full w-64 bg-white border-r border-gray-200 shadow-lg z-20 hidden md:flex flex-col">
        <div className="p-6 border-b">
             <div className="flex items-center gap-2">
                <div className="bg-primary p-2 rounded-lg">
                    <Car className="text-white h-6 w-6" />
                </div>
                <h1 className="text-xl font-bold text-gray-800">RideMate</h1>
            </div>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
             <SidebarButton 
                icon={<Search size={20} />} 
                label="Find a Ride" 
                isActive={currentView === 'finder'} 
                onClick={() => onNavigate('finder')} 
            />
            {user.isVerifiedDriver && (
                <SidebarButton 
                    icon={<PlusCircle size={20} />} 
                    label="Offer a Ride" 
                    isActive={currentView === 'driver'} 
                    onClick={() => onNavigate('driver')} 
                />
            )}
            <SidebarButton 
                icon={<MessageSquare size={20} />} 
                label="Chats" 
                isActive={currentView === 'chats' || currentView === 'chat'} 
                onClick={() => onNavigate('chats')} 
            />
             <SidebarButton 
                icon={<User size={20} />} 
                label="My Profile" 
                isActive={currentView === 'profile'} 
                onClick={() => onNavigate('profile')} 
            />
        </nav>
        
        <div className="p-4 border-t bg-gray-50">
            <div className="flex items-center gap-3 mb-4">
                 <img src={user.avatarUrl} alt={user.name} className="w-10 h-10 rounded-full" />
                 <div>
                     <p className="font-semibold text-gray-800">{user.name}</p>
                     <p className="text-xs text-gray-500">@{user.username}</p>
                 </div>
            </div>
             <button 
                onClick={onLogout} 
                className="w-full flex items-center justify-center gap-2 bg-gray-200 text-gray-600 font-bold py-2 px-4 rounded-lg hover:bg-red-100 hover:text-red-600 focus:outline-none transition-colors"
             >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
            </button>
        </div>
    </aside>
  );
};