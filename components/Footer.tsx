import React from 'react';
import type { View } from '../types';
import { Search, PlusCircle, User, MessageSquare } from 'lucide-react';

interface FooterProps {
  currentView: View;
  setCurrentView: (view: View) => void;
}

const NavButton: React.FC<{
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onClick: () => void;
}> = ({ icon, label, isActive, onClick }) => {
  const activeClasses = 'bg-primary text-white';
  const inactiveClasses = 'text-gray-500 hover:bg-gray-100';
  return (
    <button
      onClick={onClick}
      className={`flex-1 flex flex-col items-center justify-center p-2 rounded-lg transition-colors duration-200 ${
        isActive ? activeClasses : inactiveClasses
      }`}
      aria-label={label}
    >
      {icon}
      <span className="text-xs font-medium mt-1">{label}</span>
    </button>
  );
};

export const Footer: React.FC<FooterProps> = ({ currentView, setCurrentView }) => {
  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg md:hidden z-10">
      <div className="container mx-auto px-4 py-2 flex justify-around items-center gap-2">
        <NavButton
          icon={<Search size={24} />}
          label="Find"
          isActive={currentView === 'finder'}
          onClick={() => setCurrentView('finder')}
        />
        <NavButton
          icon={<PlusCircle size={24} />}
          label="Offer"
          isActive={currentView === 'driver'}
          onClick={() => setCurrentView('driver')}
        />
        <NavButton
          icon={<MessageSquare size={24} />}
          label="Chats"
          isActive={currentView === 'chats' || currentView === 'chat'}
          onClick={() => setCurrentView('chats')}
        />
        <NavButton
          icon={<User size={24} />}
          label="Profile"
          isActive={currentView === 'profile'}
          onClick={() => setCurrentView('profile')}
        />
      </div>
    </footer>
  );
};