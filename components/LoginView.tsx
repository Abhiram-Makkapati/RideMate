import React from 'react';
import { Car, Mail, KeyRound } from 'lucide-react';

interface LoginViewProps {
  onLogin: () => void;
  onNavigateRegister: () => void;
}

export const LoginView: React.FC<LoginViewProps> = ({ onLogin, onNavigateRegister }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
  };

  return (
    <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl animate-fade-in">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center bg-primary p-3 rounded-full mb-4">
          <Car className="text-white h-8 w-8" />
        </div>
        <h1 className="text-3xl font-bold text-gray-800">Welcome Back!</h1>
        <p className="text-gray-500">Log in to your RideMate account.</p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="email"
            placeholder="Email"
            defaultValue="alex.doe@email.com"
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition"
            required
          />
        </div>
        <div className="relative">
          <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="password"
            placeholder="Password"
            defaultValue="password123"
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-primary text-white font-bold py-3 px-4 rounded-lg hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all duration-200 transform hover:scale-105"
        >
          Login
        </button>
      </form>
      <p className="text-center text-sm text-gray-600 mt-8">
        Don't have an account?{' '}
        <button onClick={onNavigateRegister} className="font-semibold text-primary hover:underline">
          Register here
        </button>
      </p>
    </div>
  );
};