import React from 'react';
import { Car } from 'lucide-react';

interface HeaderProps {
  onNavigateHome: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onNavigateHome }) => {
  return (
    <header className="fixed top-0 left-0 right-0 md:left-64 bg-white border-b border-gray-200 shadow-sm z-10">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <button onClick={onNavigateHome} className="flex items-center gap-2 cursor-pointer group" aria-label="Go to homepage">
            <div className="bg-primary p-2 rounded-lg group-hover:opacity-90 transition-opacity">
                <Car className="text-white h-6 w-6" />
            </div>
            <h1 className="text-xl font-bold text-gray-800 group-hover:text-primary transition-colors">RideMate</h1>
        </button>
      </div>
    </header>
  );
};