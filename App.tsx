import React, { useState } from 'react';
import type { View, UserProfile, Ride, Driver } from './types';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { SidebarNav } from './components/SidebarNav';
import { LoginView } from './components/LoginView';
import { RegisterView } from './components/RegisterView';
import { RideFinderView } from './components/RideFinderView';
import { DriverDashboardView } from './components/DriverDashboardView';
import { ProfileView } from './components/ProfileView';
import { RideConfirmationModal } from './components/RideConfirmationModal';
import { Toast, ToastType } from './components/Toast';
import { RideTrackingView } from './components/RideTrackingView';
import { ChatsListView } from './components/ChatsListView';
import { ChatView } from './components/ChatView';
import { DriverVerificationModal } from './components/DriverVerificationModal';
import { ShieldCheck, Car } from 'lucide-react';


const mockUserProfile: UserProfile = {
  name: 'Alex Doe',
  username: 'alex.doe',
  avatarUrl: 'https://picsum.photos/seed/alex/200/200',
  memberSince: '2023-08-15T12:00:00Z',
  role: 'driver',
  isVerifiedDriver: true,
};

// Modal for prompting passengers to become drivers
const BecomeDriverModal: React.FC<{ onConfirm: () => void; onClose: () => void; }> = ({ onConfirm, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md relative overflow-hidden">
        <div className="p-6 text-center">
            <div className="mx-auto bg-primary/10 text-primary w-16 h-16 rounded-full flex items-center justify-center mb-4">
                <Car size={32} />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Become a Driver</h2>
            <p className="text-gray-600 mt-2">
                To offer rides and start earning, you need to complete your driver profile. This involves a quick verification process, including providing your driver's license for community safety.
            </p>
        </div>
        <div className="bg-gray-50 p-6 flex flex-col sm:flex-row items-center justify-center gap-3">
             <button onClick={onClose} className="w-full sm:w-auto px-5 py-3 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition-colors">
                Maybe Later
             </button>
             <button onClick={onConfirm} className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-3 bg-primary text-white font-bold rounded-lg hover:bg-primary-dark transition-colors">
                <ShieldCheck size={20} />
                <span>Start Verification</span>
             </button>
        </div>
      </div>
    </div>
  );
};


export default function App() {
  const [view, setView] = useState<View>('login');
  const [user, setUser] = useState<UserProfile | null>(null);
  
  const [selectedRide, setSelectedRide] = useState<Ride | null>(null);
  const [confirmedRide, setConfirmedRide] = useState<Ride | null>(null);
  const [chatPartner, setChatPartner] = useState<Driver | null>(null);
  
  const [showDriverPrompt, setShowDriverPrompt] = useState(false);
  const [showVerificationModal, setShowVerificationModal] = useState(false);

  const [toast, setToast] = useState<{ message: string; type: ToastType } | null>(null);

  const showToast = (message: string, type: ToastType) => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 5000);
  };
  
  const handleLogin = () => {
    setUser(mockUserProfile);
    setView('finder');
    showToast('Welcome back, Alex!', 'success');
  };

  const handleRegister = (name: string, role: 'passenger' | 'driver') => {
    const newUserProfile: UserProfile = {
      name: name,
      username: name.toLowerCase().replace(/\s+/g, '.').replace(/[^a-z0-9.]/g, ''),
      avatarUrl: `https://picsum.photos/seed/${name.replace(/\s+/g, '')}/200/200`,
      memberSince: new Date().toISOString(),
      role: role,
      isVerifiedDriver: role === 'driver',
    };
    setUser(newUserProfile);
    setView('finder');
    showToast(`Welcome, ${name}! Your account has been created.`, 'success');
  };
  
  const handleLogout = () => {
    setUser(null);
    setView('login');
    showToast('You have been logged out.', 'info');
  };

  const handleRideSelect = (ride: Ride) => {
    setSelectedRide(ride);
  };

  const handleConfirmRide = () => {
    if (selectedRide) {
      setConfirmedRide(selectedRide);
      setSelectedRide(null);
      setView('tracking');
      showToast('Ride confirmed! Your driver is on the way.', 'success');
    }
  };
  
  const handleCancelRide = () => {
    setConfirmedRide(null);
    setView('finder');
    showToast('Your ride has been cancelled.', 'info');
  };

  const handleStartChat = (driver: Driver) => {
    setChatPartner(driver);
    setView('chat');
  };

  const handleNavigation = (targetView: View) => {
    if (targetView === 'driver' && user && !user.isVerifiedDriver) {
      setShowDriverPrompt(true);
    } else {
      setView(targetView);
    }
  };
  
  const handleStartVerification = () => {
    setShowDriverPrompt(false);
    setShowVerificationModal(true);
  };
  
  const handleVerificationSubmit = () => {
    if (user) {
        setUser({ ...user, role: 'driver', isVerifiedDriver: true });
        setShowVerificationModal(false);
        setView('driver');
        showToast('Verification successful! You can now offer rides.', 'success');
    }
  };


  const renderView = () => {
    switch (view) {
      case 'login':
        return <LoginView onLogin={handleLogin} onNavigateRegister={() => setView('register')} />;
      case 'register':
        return <RegisterView onRegister={handleRegister} onNavigateLogin={() => setView('login')} />;
      case 'finder':
        return <RideFinderView onRideSelect={handleRideSelect} />;
      case 'driver':
        return <DriverDashboardView />;
      case 'profile':
        if (!user) {
            setView('login');
            return null;
        }
        return <ProfileView user={user} onLogout={handleLogout} onNavigate={handleNavigation} />;
      case 'tracking':
        if (!confirmedRide) {
            setView('finder');
            return null;
        }
        return <RideTrackingView ride={confirmedRide} onNavigateHome={() => handleNavigation('finder')} onStartChat={handleStartChat} onCancelRide={handleCancelRide} />;
      case 'chats':
        return <ChatsListView onSelectChat={handleStartChat} />;
      case 'chat':
        if (!chatPartner) {
            setView('chats');
            return null;
        }
        return <ChatView partner={chatPartner} onNavigateBack={() => setView('chats')} />;
      default:
        return <LoginView onLogin={handleLogin} onNavigateRegister={() => setView('register')} />;
    }
  };
  
  if (!user) {
    return (
      <main className="bg-gray-100 min-h-screen flex items-center justify-center p-4">
        {renderView()}
      </main>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header onNavigateHome={() => handleNavigation('finder')} />
      <SidebarNav currentView={view} onNavigate={handleNavigation} user={user} onLogout={handleLogout} />
      
      <main className="md:ml-64 pt-24 pb-24 md:pb-12 px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          {renderView()}
        </div>
      </main>
      
      <Footer currentView={view} onNavigate={handleNavigation} user={user} />

      {selectedRide && (
        <RideConfirmationModal
          ride={selectedRide}
          onConfirm={handleConfirmRide}
          onClose={() => setSelectedRide(null)}
        />
      )}

      {showDriverPrompt && (
        <BecomeDriverModal
            onClose={() => setShowDriverPrompt(false)}
            onConfirm={handleStartVerification}
        />
      )}
      
      {showVerificationModal && (
        <DriverVerificationModal
            onClose={() => setShowVerificationModal(false)}
            onSubmit={handleVerificationSubmit}
        />
      )}


      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}