import React, { useEffect } from 'react';
import { CheckCircle, XCircle, Info, X } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'info';

interface ToastProps {
  message: string;
  type: ToastType;
  onClose: () => void;
}

const toastConfig = {
  success: {
    icon: <CheckCircle className="h-6 w-6 text-green-500" />,
    bgClass: 'bg-green-50 border-green-200',
    textClass: 'text-green-800',
  },
  error: {
    icon: <XCircle className="h-6 w-6 text-red-500" />,
    bgClass: 'bg-red-50 border-red-200',
    textClass: 'text-red-800',
  },
  info: {
    icon: <Info className="h-6 w-6 text-blue-500" />,
    bgClass: 'bg-blue-50 border-blue-200',
    textClass: 'text-blue-800',
  },
};

export const Toast: React.FC<ToastProps> = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const config = toastConfig[type];

  return (
    <div
      className={`fixed top-20 right-4 z-50 w-full max-w-sm p-4 border rounded-xl shadow-lg flex items-start gap-3 animate-fade-in-down ${config.bgClass}`}
      role="alert"
    >
      <div className="flex-shrink-0">{config.icon}</div>
      <div className={`flex-1 text-sm font-semibold ${config.textClass}`}>
        {message}
      </div>
      <button onClick={onClose} className={`-my-1 -mx-2 p-1.5 rounded-full hover:bg-black/10 transition-colors ${config.textClass}`}>
        <X className="h-5 w-5" />
      </button>
    </div>
  );
};
