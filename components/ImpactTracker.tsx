import React from 'react';
import { Leaf, DollarSign, Heart } from 'lucide-react';

const ImpactCard: React.FC<{ icon: React.ReactNode; value: string; label: string; color: string }> = ({ icon, value, label, color }) => (
  <div className="flex-1 flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow-sm text-center">
    <div className={`p-3 rounded-full mb-2 ${color}`}>
      {icon}
    </div>
    <p className="text-xl font-bold text-gray-800">{value}</p>
    <p className="text-sm text-gray-500">{label}</p>
  </div>
);

export const ImpactTracker: React.FC = () => {
  return (
    <div className="p-4 bg-gray-100 rounded-xl">
      <h3 className="text-lg font-semibold text-gray-700 mb-3 text-center">Your Impact</h3>
      <div className="flex flex-col sm:flex-row gap-4">
        <ImpactCard 
          icon={<Leaf className="text-white h-6 w-6" />}
          value="12.5 kg"
          label="CO₂ Saved"
          color="bg-green-500"
        />
        <ImpactCard 
          icon={<DollarSign className="text-white h-6 w-6" />}
          value="$45.80"
          label="Money Saved"
          color="bg-blue-500"
        />
        <ImpactCard 
          icon={<Heart className="text-white h-6 w-6" />}
          value="8"
          label="Rides Shared"
          color="bg-pink-500"
        />
      </div>
    </div>
  );
};
