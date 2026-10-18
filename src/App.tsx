import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { OpeningScreen } from './components/OpeningScreen';
import { Navbar } from './components/Navbar';
import { HomeSection } from './components/HomeSection';
import { MusicSection } from './components/MusicSection';
import { LoveQuestions } from './components/LoveQuestions';
import { AMASection } from './components/AMASection';
import { MemoryGardenSection } from './components/MemoryGardenSection';
import { NotificationsDrawer } from './components/NotificationsDrawer';
import { AccountModal } from './components/AccountModal';
import { FallingPetalsCanvas, FloralCorner } from './components/FloralDecorations';
import { PeachSparkle } from './components/KawaiiCats';

const MainApp: React.FC = () => {
  const [hasEntered, setHasEntered] = useState<boolean>(() => {
    return sessionStorage.getItem('olu_entered') === 'true';
  });

  const [activeTab, setActiveTab] = useState<string>('home');
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [petalsActive, setPetalsActive] = useState(true);

  const handleEnter = () => {
    sessionStorage.setItem('olu_entered', 'true');
    setHasEntered(true);
  };

  if (!hasEntered) {
    return <OpeningScreen onEnter={handleEnter} />;
  }

  return (
    <div className="min-h-screen bg-cream-100 text-chocolate flex flex-col justify-between romantic-mesh-bg relative selection:bg-blush-200">
      {/* Falling Flower Petals Canvas */}
      <FallingPetalsCanvas active={petalsActive} />

      {/* Navigation Bar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenNotifications={() => setIsNotificationsOpen(true)}
        onOpenAccount={() => setIsAccountOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 pb-20 md:pb-12">
        {activeTab === 'home' && <HomeSection onNavigate={setActiveTab} />}
        {activeTab === 'music' && <MusicSection />}
        {activeTab === 'questions' && <LoveQuestions />}
        {activeTab === 'ama' && <AMASection />}
        {activeTab === 'garden' && <MemoryGardenSection />}
      </main>

      {/* Notifications Drawer */}
      <NotificationsDrawer
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
        onNavigate={setActiveTab}
      />

      {/* Account & Couple Settings Modal */}
      <AccountModal
        isOpen={isAccountOpen}
        onClose={() => setIsAccountOpen(false)}
      />

      {/* Persistent Decorative Cat in Footer */}
      <footer className="w-full py-6 text-center text-xs text-chocolate/60 border-t-2 border-chocolate/10 bg-white/40 backdrop-blur-sm select-none z-20">
        <div className="max-w-4xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xl animate-bounce-cute">🐱</span>
            <span className="font-bold">Our Little Universe</span>
            <span>•</span>
            <span>Two Little Cats in Love</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setPetalsActive(!petalsActive)}
              className="text-xs hover:text-rose-deep font-semibold transition-colors"
            >
              {petalsActive ? '🌸 Falling Petals: ON' : '🌸 Falling Petals: OFF'}
            </button>
            <span>•</span>
            <button
              onClick={() => {
                sessionStorage.removeItem('olu_entered');
                setHasEntered(false);
              }}
              className="hover:underline text-rose-deep font-bold"
            >
              Replay Intro 💗
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainApp />
    </AppProvider>
  );
}
