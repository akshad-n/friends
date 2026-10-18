import React from 'react';
import { useApp } from '../context/AppContext';
import { BackgroundMusic } from './BackgroundMusic';
import {
  Heart,
  Music,
  HelpCircle,
  Mail,
  Flower2,
  Bell,
  Settings,
  Sparkles,
  UserCheck,
} from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenNotifications: () => void;
  onOpenAccount: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenNotifications,
  onOpenAccount,
}) => {
  const { currentRole, setCurrentRole, unreadCount, myProfile } = useApp();

  const navItems = [
    { id: 'home', label: 'Home', icon: '🐱' },
    { id: 'music', label: 'Our Music', icon: '🎧' },
    { id: 'questions', label: 'Love Questions', icon: '💗' },
    { id: 'ama', label: 'Ask Me Anything', icon: '💌' },
    { id: 'garden', label: 'Memory Garden', icon: '🌷' },
  ];

  return (
    <>
      {/* Top Header Desktop & Tablet */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b-2 border-chocolate/10 px-4 py-3 select-none transition-all">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-2">
          {/* Brand Logo with Peach and Goma */}
          <div
            onClick={() => setActiveTab('home')}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-full bg-blush-100 border-2 border-chocolate flex items-center justify-center text-lg shadow-sm group-hover:rotate-6 transition-transform">
              🐱
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-base sm:text-lg text-chocolate leading-tight flex items-center gap-1.5">
                Our Little Universe
                <span className="text-rose-soft text-sm animate-pulse">💗</span>
              </span>
              <span className="text-[10px] text-chocolate/60 font-semibold hidden sm:inline">
                Peach & Goma's Private World
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 bg-cream-50 p-1 rounded-full border-2 border-chocolate/15">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-blush-200 text-chocolate border-2 border-chocolate shadow-sm'
                      : 'text-chocolate/75 hover:text-chocolate hover:bg-cream-100'
                  }`}
                >
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Action Icons: Music, Notifications, Partner Switcher & Settings */}
          <div className="flex items-center gap-2">
            <BackgroundMusic />

            {/* Quick Partner Switcher Button */}
            <button
              onClick={() => setCurrentRole(currentRole === 'her' ? 'him' : 'her')}
              className={`px-2.5 py-1 rounded-full border-2 border-chocolate text-xs font-bold transition-all flex items-center gap-1 shadow-sm ${
                currentRole === 'her' ? 'bg-blush-100 text-chocolate' : 'bg-lavender-soft text-chocolate'
              }`}
              title="Toggle current partner perspective (Her / Him)"
            >
              <span>{currentRole === 'her' ? '🌸 Her' : '🌙 Him'}</span>
              <span className="text-[10px] opacity-60">⇄</span>
            </button>

            {/* Notification Bell with Badge */}
            <button
              onClick={onOpenNotifications}
              className="relative p-2 rounded-full border-2 border-chocolate bg-white hover:bg-cream-100 text-chocolate transition-transform active:scale-90 shadow-sm"
              title="Notifications"
              aria-label="View notifications"
            >
              <Bell size={16} />
              {unreadCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-rose-soft text-white font-black text-[10px] w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow-sm animate-bounce">
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              )}
            </button>

            {/* Account & Couple Settings */}
            <button
              onClick={onOpenAccount}
              className="p-2 rounded-full border-2 border-chocolate bg-white hover:bg-cream-100 text-chocolate transition-transform active:scale-90 shadow-sm"
              title="Our Account & Settings"
              aria-label="Account Settings"
            >
              <Settings size={16} />
            </button>
          </div>
        </div>
      </header>

      {/* Bottom Sticky Navigation on Mobile */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t-2 border-chocolate/15 px-2 py-1.5 flex items-center justify-around shadow-cute select-none">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all ${
                isActive
                  ? 'text-chocolate font-bold scale-105'
                  : 'text-chocolate/60 font-medium'
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              <span className={`text-[10px] leading-tight ${isActive ? 'text-chocolate font-bold' : ''}`}>
                {item.label}
              </span>
              {isActive && <span className="w-1.5 h-1.5 rounded-full bg-rose-soft mt-0.5" />}
            </button>
          );
        })}
      </nav>
    </>
  );
};
