import React, { useState, useRef, useEffect } from 'react';
import type { Location } from '../types';

interface AutocompleteInputProps {
  id: string;
  label: string;
  value: string;
  onValueChange: (value: string) => void;
  onLocationSelect: (location: Location) => void;
  placeholder: string;
  suggestions: Location[];
  icon: React.ReactNode;
}

export const AutocompleteInput: React.FC<AutocompleteInputProps> = ({
  id,
  label,
  value,
  onValueChange,
  onLocationSelect,
  placeholder,
  suggestions,
  icon
}) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSelect = (location: Location) => {
    onValueChange(location.name);
    onLocationSelect(location);
    setShowSuggestions(false);
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onValueChange(e.target.value);
    setShowSuggestions(true);
  }

  return (
    <div className="relative" ref={containerRef}>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          {icon}
        </div>
        <input
          type="text"
          id={id}
          value={value}
          onChange={handleInputChange}
          onFocus={() => {
            if (value.length > 0) setShowSuggestions(true);
          }}
          placeholder={placeholder}
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition"
          autoComplete="off"
        />
      </div>
      {showSuggestions && suggestions.length > 0 && (
        <ul className="absolute z-20 w-full bg-white border border-gray-300 rounded-lg mt-1 max-h-60 overflow-auto shadow-lg">
          {suggestions.map((location) => (
            <li
              key={location.name}
              onClick={() => handleSelect(location)}
              className="px-4 py-2 cursor-pointer hover:bg-gray-100 text-gray-800"
            >
              {location.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};