import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { isSupabaseConfigured, testSupabaseConnection } from '../lib/supabase';
import {
  Users,
  Key,
  Calendar,
  Copy,
  Check,
  ShieldCheck,
  Database,
  Bell,
  Heart,
  X,
  ExternalLink,
} from 'lucide-react';

interface AccountModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AccountModal: React.FC<AccountModalProps> = ({ isOpen, onClose }) => {
  const {
    currentRole,
    setCurrentRole,
    coupleSpace,
    updateCoupleSpace,
    myProfile,
    partnerProfile,
    resetQuestion,
  } = useApp();

  const [copied, setCopied] = useState(false);
  const [resetSuccessMessage, setResetSuccessMessage] = useState<string | null>(null);
  const [herNameInput, setHerNameInput] = useState(coupleSpace.herName);
  const [himNameInput, setHimNameInput] = useState(coupleSpace.himName);
  const [anniversaryInput, setAnniversaryInput] = useState(coupleSpace.anniversaryDate);
  const [isSaved, setIsSaved] = useState(false);

  const [dbTestResult, setDbTestResult] = useState<string | null>(null);
  const [testingDb, setTestingDb] = useState(false);

  if (!isOpen) return null;

  const inviteLink = `${window.location.origin}?invite=${coupleSpace.code}`;

  const handleCopyInvite = () => {
    navigator.clipboard.writeText(inviteLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleResetAction = (type: 'date' | 'life' | 'memories' | 'all', label: string) => {
    if (window.confirm(`Are you sure you want to reset ${label}? Golu can then experience the questions fresh! 🐱💗`)) {
      resetQuestion(type);
      setResetSuccessMessage(`${label} has been successfully reset!`);
      setTimeout(() => setResetSuccessMessage(null), 3000);
    }
  };

  const handleSaveProfiles = (e: React.FormEvent) => {
    e.preventDefault();
    updateCoupleSpace({
      herName: herNameInput.trim() || 'My Sweet Peach 🌸',
      himName: himNameInput.trim() || 'Her Loving Goma 🌙',
      anniversaryDate: anniversaryInput,
    });
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const handleTestDatabase = async () => {
    setTestingDb(true);
    const result = await testSupabaseConnection();
    setDbTestResult(result.message);
    setTestingDb(false);
  };

  const handleRequestPushNotifications = async () => {
    if ('Notification' in window) {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        alert('Browser push notifications enabled! You will receive romantic alerts even when tab is in background. 🐱💗');
      } else {
        alert('Notification permission was declined in your browser settings.');
      }
    } else {
      alert('Browser notifications not supported on this browser.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 select-none">
      <div className="cute-card max-w-xl w-full p-6 sm:p-8 bg-white relative max-h-[90vh] overflow-y-auto animate-float">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full border-2 border-chocolate hover:bg-cream-100 text-chocolate"
        >
          <X size={16} />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-full bg-blush-100 border-2 border-chocolate flex items-center justify-center text-xl">
            ⚙️
          </div>
          <div>
            <h3 className="text-xl font-black text-chocolate">
              Our Private Couple Space
            </h3>
            <p className="text-xs text-chocolate/70">
              Personalize names, invite your partner, and configure your database.
            </p>
          </div>
        </div>

        {/* 1. Quick Partner Perspective Switcher */}
        <section className="mb-6 p-4 rounded-2xl bg-cream-50 border-2 border-chocolate/20">
          <label className="block text-xs font-black text-chocolate mb-2">
            Active Perspective (Simulate / Test as either partner):
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setCurrentRole('her')}
              className={`p-3 rounded-xl border-2 text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                currentRole === 'her'
                  ? 'bg-blush-200 border-chocolate text-chocolate shadow-sm scale-102'
                  : 'bg-white border-chocolate/20 text-chocolate/70'
              }`}
            >
              <span>🌸</span>
              <span>I am {coupleSpace.herName}</span>
            </button>

            <button
              type="button"
              onClick={() => setCurrentRole('him')}
              className={`p-3 rounded-xl border-2 text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                currentRole === 'him'
                  ? 'bg-lavender-soft border-chocolate text-chocolate shadow-sm scale-102'
                  : 'bg-white border-chocolate/20 text-chocolate/70'
              }`}
            >
              <span>🌙</span>
              <span>I am {coupleSpace.himName}</span>
            </button>
          </div>
        </section>

        {/* Him Section: Reset Question Options */}
        {currentRole === 'him' && (
          <section className="mb-6 p-4 rounded-2xl bg-amber-50/90 border-2 border-chocolate/20">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-base">🌙</span>
              <h4 className="text-xs font-black text-chocolate uppercase tracking-wider">
                Him Section • Reset Question Options
              </h4>
            </div>
            <p className="text-[11px] text-chocolate/70 mb-3">
              Reset question states so your sweet Golu can be asked again and experience the animations fresh!
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
              <button
                type="button"
                onClick={() => handleResetAction('date', 'Question 1 (Date Night & Date Gate) 🌹')}
                className="px-2.5 py-1.5 rounded-xl bg-white hover:bg-cream-100 border border-chocolate text-chocolate font-bold shadow-sm active:scale-95"
              >
                Reset Q1 (Date)
              </button>

              <button
                type="button"
                onClick={() => handleResetAction('life', 'Question 2 (Precious Life & Thank You Note) 🌙')}
                className="px-2.5 py-1.5 rounded-xl bg-white hover:bg-cream-100 border border-chocolate text-chocolate font-bold shadow-sm active:scale-95"
              >
                Reset Q2 (Life)
              </button>

              <button
                type="button"
                onClick={() => handleResetAction('memories', 'Question 3 (Custom Question) 🌻')}
                className="px-2.5 py-1.5 rounded-xl bg-white hover:bg-cream-100 border border-chocolate text-chocolate font-bold shadow-sm active:scale-95"
              >
                Reset Q3 (Custom)
              </button>

              <button
                type="button"
                onClick={() => handleResetAction('all', 'ALL 3 Questions 🐱💗')}
                className="px-2.5 py-1.5 rounded-xl bg-rose-soft/20 hover:bg-rose-soft/30 border border-rose-deep text-rose-deep font-black shadow-sm active:scale-95"
              >
                Reset All 🔄
              </button>
            </div>

            {resetSuccessMessage && (
              <div className="mt-3 p-2 rounded-xl bg-mint-100 border border-mint-200 text-center text-[11px] font-bold text-chocolate animate-fade-in">
                ✨ {resetSuccessMessage}
              </div>
            )}
          </section>
        )}

        {/* 2. Secure Couple Invitation System */}
        <section className="mb-6 p-4 rounded-2xl bg-blush-50 border-2 border-chocolate/20">
          <div className="flex items-center gap-2 mb-1.5">
            <Key size={15} className="text-rose-deep" />
            <h4 className="text-xs font-black text-chocolate uppercase tracking-wider">
              Couple Invitation Link
            </h4>
          </div>
          <p className="text-xs text-chocolate/75 mb-3 leading-relaxed">
            Send this private invitation to your partner so they can access your shared universe. Only 2 authorized members are allowed in this space.
          </p>

          <div className="flex items-center gap-2">
            <input
              type="text"
              readOnly
              value={inviteLink}
              className="flex-1 px-3 py-2 rounded-xl border-2 border-chocolate bg-white text-xs font-mono text-chocolate select-all focus:outline-none"
            />
            <button
              type="button"
              onClick={handleCopyInvite}
              className="cute-btn px-4 py-2 bg-rose-soft text-white text-xs font-bold"
            >
              {copied ? (
                <>
                  <Check size={14} />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy size={14} />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>
        </section>

        {/* 3. Partner Names & Anniversary */}
        <form onSubmit={handleSaveProfiles} className="space-y-4 mb-6">
          <h4 className="text-xs font-black text-chocolate uppercase tracking-wider">
            Personalize Couple Details
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-extrabold text-chocolate mb-1">
                Her Name / Cute Nickname
              </label>
              <input
                type="text"
                value={herNameInput}
                onChange={(e) => setHerNameInput(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border-2 border-chocolate bg-cream-50 text-xs focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-extrabold text-chocolate mb-1">
                His Name / Cute Nickname
              </label>
              <input
                type="text"
                value={himNameInput}
                onChange={(e) => setHimNameInput(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border-2 border-chocolate bg-cream-50 text-xs focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-extrabold text-chocolate mb-1">
              Anniversary Date 💖
            </label>
            <input
              type="date"
              value={anniversaryInput}
              onChange={(e) => setAnniversaryInput(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border-2 border-chocolate bg-cream-50 text-xs focus:outline-none"
            />
          </div>

          <div className="flex items-center justify-between pt-1">
            {isSaved ? (
              <span className="text-xs font-bold text-rose-deep flex items-center gap-1">
                <Check size={14} />
                <span>Saved successfully!</span>
              </span>
            ) : (
              <span />
            )}
            <button
              type="submit"
              className="cute-btn px-5 py-2 bg-butter-100 text-chocolate text-xs font-extrabold"
            >
              Update Names 🎀
            </button>
          </div>
        </form>

        {/* 4. Notifications & Push */}
        <section className="mb-6 p-4 rounded-2xl bg-cream-50 border-2 border-chocolate/20 flex items-center justify-between">
          <div>
            <h4 className="text-xs font-black text-chocolate flex items-center gap-1.5">
              <Bell size={14} className="text-rose-deep" />
              <span>Browser Push Notifications</span>
            </h4>
            <p className="text-[11px] text-chocolate/70">
              Receive alerts on your laptop/phone when she answers or adds songs.
            </p>
          </div>
          <button
            onClick={handleRequestPushNotifications}
            className="cute-btn px-3 py-1.5 bg-white text-chocolate text-xs font-bold border-2 border-chocolate"
          >
            Enable Push 🔔
          </button>
        </section>

        {/* 5. Supabase Database Status */}
        <section className="p-4 rounded-2xl bg-mint-50 border-2 border-chocolate/20">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Database size={15} className="text-emerald-700" />
              <h4 className="text-xs font-black text-chocolate uppercase tracking-wider">
                Database Status
              </h4>
            </div>
            <span
              className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                isSupabaseConfigured
                  ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                  : 'bg-amber-100 text-amber-800 border-amber-300'
              }`}
            >
              {isSupabaseConfigured ? 'Supabase Connected' : 'Offline / Local Persistence'}
            </span>
          </div>

          <p className="text-xs text-chocolate/70 mb-3">
            {isSupabaseConfigured
              ? 'Your application is connected to Supabase PostgreSQL and Realtime.'
              : 'All your data (songs, date plans, questions, memories) is securely stored in persistent local browser storage. To connect live Supabase cloud, configure .env with your VITE_SUPABASE_URL.'}
          </p>

          <button
            onClick={handleTestDatabase}
            disabled={testingDb}
            className="cute-btn px-4 py-1.5 bg-white text-chocolate text-xs font-bold border-2 border-chocolate"
          >
            {testingDb ? 'Testing...' : 'Test Connection 🔍'}
          </button>

          {dbTestResult && (
            <p className="mt-2 text-xs font-semibold text-chocolate/80 bg-white/70 p-2 rounded-lg border border-chocolate/10">
              {dbTestResult}
            </p>
          )}
        </section>
      </div>
    </div>
  );
};
