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

const mockUserProfile: UserProfile = {
  name: 'Alex Doe',
  username: 'alex.doe',
  avatarUrl: 'https://picsum.photos/seed/alex/200/200',
  memberSince: '2023-08-15T12:00:00Z',
};


export default function App() {
  const [view, setView] = useState<View>('login');
  const [user, setUser] = useState<UserProfile | null>(null);
  
  const [selectedRide, setSelectedRide] = useState<Ride | null>(null);
  const [confirmedRide, setConfirmedRide] = useState<Ride | null>(null);
  const [chatPartner, setChatPartner] = useState<Driver | null>(null);

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

  const handleRegister = () => {
    setUser(mockUserProfile);
    setView('finder');
    showToast('Account created successfully!', 'success');
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
        return <ProfileView user={user} onLogout={handleLogout} />;
      case 'tracking':
        if (!confirmedRide) {
            setView('finder');
            return null;
        }
        return <RideTrackingView ride={confirmedRide} onNavigateHome={() => setView('finder')} onStartChat={handleStartChat} onCancelRide={handleCancelRide} />;
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
      <Header onNavigateHome={() => setView('finder')} />
      <SidebarNav currentView={view} setCurrentView={setView} user={user} onLogout={handleLogout} />
      
      <main className="md:ml-64 pt-24 pb-24 md:pb-12 px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          {renderView()}
        </div>
      </main>
      
      <Footer currentView={view} setCurrentView={setView} />

      {selectedRide && (
        <RideConfirmationModal
          ride={selectedRide}
          onConfirm={handleConfirmRide}
          onClose={() => setSelectedRide(null)}
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
