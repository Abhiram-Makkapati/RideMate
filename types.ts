// Fix: Resolve "Cannot find name 'LatLng'" errors.
// The `export type ... from` syntax only re-exports a type and doesn't make it available
// in the current module. We need to import it first, then re-export it.
import type { LatLng } from "@google/genai";
export type { LatLng };

export type View = 'login' | 'register' | 'finder' | 'driver' | 'chats' | 'chat' | 'profile' | 'tracking';

export interface UserProfile {
  name: string;
  username: string;
  avatarUrl: string;
  memberSince: string;
  role: 'passenger' | 'driver';
  isVerifiedDriver: boolean;
}

// User is simpler, for passengers etc.
export interface User {
  name: string;
  avatar: string;
}

export interface Driver extends User {
  rating: number;
  vehicle?: {
    make: string;
    model: string;
    color: string;
    licensePlate: string;
  };
}

export interface Ride {
  id: string;
  driver: Driver;
  route: {
    from: string;
    to: string;
  };
  startCoords: LatLng;
  endCoords: LatLng;
  departureTimestamp: string;
  arrivalTimestamp: string;
  availableSeats: number;
  price: string;
  eta: string; // e.g., "in 5 mins"
}

export interface PostedRide {
    id: string;
    route: {
        from: string;
        to: string;
    };
    time: string;
    seats: number;
    price: string;
    passengers: User[];
}

export interface PastRide {
    id: string;
    date: string;
    role: 'passenger' | 'driver';
    user: User; // The other person in the ride
    route: {
        from: string;
        to: string;
    };
    cost: string;
}

export interface Message {
    id: string;
    text: string;
    sender: 'user' | 'partner';
    timestamp: string;
}

export interface ChatSummary {
    id:string;
    partner: Driver;
    lastMessage: string;
    timestamp: string;
    unreadCount: number;
}

export interface Location {
    name: string;
    coords: LatLng;
}