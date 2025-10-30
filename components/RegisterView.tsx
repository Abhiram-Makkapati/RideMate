import React, { useState } from 'react';
import { Car, User, Mail, KeyRound, Calendar, ShieldCheck, FileUp, Camera } from 'lucide-react';

interface RegisterViewProps {
  onRegister: (name: string, role: 'passenger' | 'driver') => void;
  onNavigateLogin: () => void;
}

export const RegisterView: React.FC<RegisterViewProps> = ({ onRegister, onNavigateLogin }) => {
  const [role, setRole] = useState<'passenger' | 'driver' | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    
    const formData = new FormData(e.currentTarget);
    const fullName = formData.get('fullName') as string;
    const password = formData.get('password') as string;
    const confirmPassword = formData.get('confirmPassword') as string;
    const dob = formData.get('dob') as string;

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    if (age < 18) {
        setError("You must be at least 18 years old to register.");
        return;
    }

    if (!role) {
      setError("Please select a role (Passenger or Driver).");
      return;
    }

    onRegister(fullName, role);
  };

  return (
    <div className="w-full max-w-lg bg-white p-8 rounded-2xl shadow-xl animate-fade-in my-8">
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center bg-primary p-3 rounded-full mb-4">
          <Car className="text-white h-8 w-8" />
        </div>
        <h1 className="text-3xl font-bold text-gray-800">Create Your Account</h1>
        <p className="text-gray-500">Join RideMate to start sharing rides.</p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputWithIcon Icon={User} name="fullName" placeholder="Full Name" required />
            <InputWithIcon Icon={User} name="username" placeholder="Username" required />
        </div>
        <InputWithIcon Icon={Mail} name="email" type="email" placeholder="UNT Email Address" required />
        <InputWithIcon Icon={Calendar} name="dob" type="date" placeholder="Date of Birth" required />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputWithIcon Icon={KeyRound} name="password" type="password" placeholder="Password" required />
            <InputWithIcon Icon={ShieldCheck} name="confirmPassword" type="password" placeholder="Confirm Password" required />
        </div>

        <div>
            <label className="font-semibold text-gray-700 mb-2 block">Are you a driver or a passenger?</label>
            <div className="flex gap-4">
                <RoleButton label="Passenger" isSelected={role === 'passenger'} onClick={() => setRole('passenger')} />
                <RoleButton label="Driver" isSelected={role === 'driver'} onClick={() => setRole('driver')} />
            </div>
        </div>

        {role === 'driver' && (
            <div className="p-4 bg-gray-50 border rounded-lg space-y-4 animate-fade-in">
                <h3 className="font-bold text-lg text-gray-800 text-center">Driver Verification</h3>
                <p className="text-sm text-gray-600 text-center">For the safety of our community, please upload the following documents.</p>
                <FileInput Icon={FileUp} name="license" label="Driver's License" required />
                <FileInput Icon={Camera} name="photo" label="Profile Photo" required />
            </div>
        )}
        
        {error && <p className="text-sm text-center text-red-600 bg-red-100 p-2 rounded-lg">{error}</p>}
        
        <button
          type="submit"
          className="w-full bg-primary text-white font-bold py-3 px-4 rounded-lg hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all duration-200 transform hover:scale-105 disabled:bg-gray-400"
        >
          Register
        </button>
      </form>
      <p className="text-center text-sm text-gray-600 mt-6">
        Already have an account?{' '}
        <button onClick={onNavigateLogin} className="font-semibold text-primary hover:underline">
          Login here
        </button>
      </p>
    </div>
  );
};

// Helper components for the form
const InputWithIcon: React.FC<any> = ({ Icon, ...props }) => (
    <div className="relative">
        <Icon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input
            {...props}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition"
        />
    </div>
);

const RoleButton: React.FC<{label: string, isSelected: boolean, onClick: () => void}> = ({label, isSelected, onClick}) => (
    <button
        type="button"
        onClick={onClick}
        className={`flex-1 text-center font-bold py-3 px-4 rounded-lg border-2 transition-all ${
            isSelected ? 'bg-primary text-white border-primary' : 'bg-white text-gray-700 border-gray-300 hover:border-primary'
        }`}
    >
        {label}
    </button>
);

const FileInput: React.FC<{Icon: React.ElementType, name: string, label: string, required?: boolean}> = ({Icon, name, label, required}) => (
    <div>
        <label htmlFor={name} className="font-semibold text-gray-700 text-sm">{label}</label>
        <div className="relative mt-1">
            <Icon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
                id={name}
                name={name}
                type="file"
                required={required}
                className="w-full block text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition"
            />
        </div>
    </div>
);