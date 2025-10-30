import React from 'react';
import { ShieldCheck, FileUp, X } from 'lucide-react';

interface DriverVerificationModalProps {
  onClose: () => void;
  onSubmit: () => void;
}

export const DriverVerificationModal: React.FC<DriverVerificationModalProps> = ({ onClose, onSubmit }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you'd handle file upload here.
    // For this mock, we just call the submit handler.
    onSubmit();
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md relative overflow-hidden">
        <div className="p-6 border-b flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800">Driver Verification</h2>
          <button onClick={onClose} className="p-2 text-gray-500 hover:bg-gray-100 rounded-full">
            <X size={24} />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="p-6 text-center">
              <div className="mx-auto bg-primary/10 text-primary w-16 h-16 rounded-full flex items-center justify-center mb-4">
                  <ShieldCheck size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-800">Upload Your Driver's License</h3>
              <p className="text-gray-600 mt-2">
                  For the safety of our community, we need to verify your driver's license. Please upload a clear image of the front of your license.
              </p>
              <div className="mt-6">
                <label htmlFor="license-upload" className="w-full flex items-center justify-center gap-2 px-5 py-3 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-colors cursor-pointer">
                    <FileUp size={20} />
                    <span>Choose File</span>
                </label>
                <input id="license-upload" name="license" type="file" className="sr-only" required />
                <p className="text-xs text-gray-500 mt-2">Accepted formats: JPG, PNG. Max size: 5MB.</p>
              </div>
          </div>
          <div className="bg-gray-50 p-6 flex flex-col sm:flex-row items-center justify-center gap-3">
               <button type="button" onClick={onClose} className="w-full sm:w-auto px-5 py-3 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition-colors">
                  Maybe Later
               </button>
               <button type="submit" className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-3 bg-primary text-white font-bold rounded-lg hover:bg-primary-dark transition-colors">
                  <ShieldCheck size={20} />
                  <span>Submit for Verification</span>
               </button>
          </div>
        </form>
      </div>
    </div>
  );
};