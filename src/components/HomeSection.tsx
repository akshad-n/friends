import React from 'react';
import confetti from 'canvas-confetti';
import { useApp } from '../context/AppContext';
import {
  PeachSparkle,
  CatHug,
  PeachKnead,
  CatsMusicHeadphones,
  CatsTogetherFlower,
  CatWithCamera,
} from './KawaiiCats';
import { FloralCorner, CuteButterfly, RomanticDivider } from './FloralDecorations';
import { ScheduledDateGate } from './ScheduledDateGate';
import {
  Heart,
  Music,
  Calendar,
  Sparkles,
  ArrowRight,
  MessageCircle,
  HelpCircle,
  Clock,
  RotateCcw,
} from 'lucide-react';

interface HomeSectionProps {
  onNavigate: (tab: string) => void;
}

export const HomeSection: React.FC<HomeSectionProps> = ({ onNavigate }) => {
  const {
    coupleSpace,
    currentRole,
    herSongs,
    hisSongs,
    dateResponse,
    lifeResponse,
    memoriesResponse,
    questions,
    memories,
    resetQuestion,
    addSong,
  } = useApp();

  // Calculate days together
  const calculateDaysTogether = () => {
    try {
      const start = new Date(coupleSpace.anniversaryDate).getTime();
      const now = new Date().getTime();
      const diff = Math.floor((now - start) / (1000 * 60 * 60 * 24));
      return diff > 0 ? diff : 365;
    } catch {
      return 365;
    }
  };

  const daysTogether = calculateDaysTogether();
  const unansweredQuestions = questions.filter((q) => q.status === 'awaiting').length;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 select-none">
      {/* Hero Welcome Banner */}
      <section className="cute-card p-6 sm:p-10 mb-8 bg-gradient-to-br from-white via-cream-50 to-blush-50 relative overflow-hidden text-center">
        <FloralCorner position="top-left" className="absolute top-0 left-0 opacity-70 hidden sm:block" />
        <FloralCorner position="top-right" className="absolute top-0 right-0 opacity-70 hidden sm:block" />

        <div className="relative z-10 max-w-2xl mx-auto">
          {/* Days Together Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border-2 border-chocolate/20 text-chocolate text-xs font-black shadow-sm mb-4">
            <Heart size={14} className="text-rose-soft fill-rose-soft animate-pulse" />
            <span>{daysTogether} Beautiful Days of Loving You</span>
            <Sparkles size={14} className="text-butter-200" />
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-chocolate tracking-tight leading-tight">
            Welcome to Our Little Universe <span className="inline-block animate-wiggle">💗</span>
          </h2>

          <p className="font-love-note text-xl sm:text-2xl text-chocolate/85 mt-2 max-w-xl mx-auto">
            “Two little cats. One little universe. A thousand memories waiting to be made with you.”
          </p>

          {/* Centered Mascots */}
          <div className="my-6 flex justify-center">
            <CatHug size={220} className="sm:scale-105" />
          </div>

          <p className="text-xs sm:text-sm text-chocolate/75 font-semibold">
            {coupleSpace.herName} & {coupleSpace.himName}
          </p>
        </div>
      </section>

      {/* 🌹 OFFICIAL SCHEDULED DATE GATE SECTION (Active if she said YES according to schedule) */}
      {dateResponse?.datePlan && (
        <section className="mb-10 animate-float-slow">
          <div className="text-center mb-3">
            <span className="badge-mood bg-blush-100 text-chocolate">
              🌹 Unlocked by Golu's YES • Official Scheduled Date Gate
            </span>
          </div>
          <ScheduledDateGate
            datePlan={dateResponse.datePlan}
            canReset={currentRole === 'him'}
            onResetDate={() => {
              if (window.confirm('Reset the scheduled date gate? 🌹')) {
                resetQuestion('date');
              }
            }}
          />
        </section>
      )}

      {/* 🌙 Him Section: Question Reset Options Bar */}
      {currentRole === 'him' && (
        <div className="mb-8 p-3.5 bg-amber-50/90 rounded-2xl border-2 border-chocolate/20 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs shadow-sm">
          <div className="flex items-center gap-2 font-black text-chocolate">
            <span className="text-base">🌙</span>
            <span>Him Section (Quick Reset Options for Golu):</span>
          </div>
          <div className="flex items-center gap-1.5 flex-wrap justify-center">
            <button
              onClick={async () => {
                if (hisSongs.length >= 5) {
                  alert('My Songs playlist already has 5 songs! 🐱 Please open Music to remove or replace a song.');
                  onNavigate('music');
                  return;
                }
                const romanticSuggestions = [
                  {
                    title: 'Until I Found You',
                    artist: 'Stephen Sanchez',
                    url: 'https://www.youtube.com/watch?v=GxldQ9eX2wo',
                    mood: 'Our Special Song' as const,
                    message: 'I would never fall in love until I found you, my sweet Golu. 🌷',
                  },
                  {
                    title: 'Perfect',
                    artist: 'Ed Sheeran',
                    url: 'https://www.youtube.com/watch?v=2Vv-BfVoq4g',
                    mood: 'Romantic' as const,
                    message: 'Darling, you look perfect every single day and night. 💗',
                  },
                  {
                    title: 'Dandelions',
                    artist: 'Ruth B.',
                    url: 'https://www.youtube.com/watch?v=W8a4sUabCUo',
                    mood: 'Romantic' as const,
                    message: 'Wishing on every dandelion for us forever. 🌻',
                  },
                  {
                    title: 'Kesariya',
                    artist: 'Arijit Singh',
                    url: 'https://www.youtube.com/watch?v=BddP6PYo2gs',
                    mood: 'Our Special Song' as const,
                    message: 'Kesariya tera ishq hai piya... for my Golu. 💖',
                  },
                ];

                const existingTitles = new Set(hisSongs.map((s) => s.title.toLowerCase().trim()));
                const candidate =
                  romanticSuggestions.find((s) => !existingTitles.has(s.title.toLowerCase().trim())) ||
                  romanticSuggestions[Math.floor(Math.random() * romanticSuggestions.length)];

                const res = await addSong(candidate, 'him');
                if (res.success) {
                  confetti({
                    particleCount: 70,
                    spread: 60,
                    origin: { y: 0.6 },
                    colors: ['#F6C9D2', '#ECA4B2', '#FFE8A3', '#DCEFE3', '#FFFFFF'],
                  });
                  alert(`✨ Auto-Added romantic song for Golu:\n"${candidate.title}" by ${candidate.artist}! 🎶💖`);
                  onNavigate('music');
                } else {
                  alert(res.message);
                }
              }}
              className="px-3 py-1 rounded-full bg-butter-100 hover:bg-butter-200 border border-chocolate text-chocolate font-black flex items-center gap-1 shadow-xs active:scale-95"
              title="Automatically dedicate a romantic song to Golu"
            >
              <Sparkles size={11} className="text-rose-deep" />
              <span>Auto Romantic Song ✨</span>
            </button>
            <button
              onClick={() => {
                if (window.confirm('Reset Question 1 (Date Night & Date Gate)? 🌹')) resetQuestion('date');
              }}
              className="px-2.5 py-1 rounded-full bg-white hover:bg-cream-100 border border-chocolate text-chocolate font-bold flex items-center gap-1 shadow-xs active:scale-95"
            >
              <RotateCcw size={10} />
              <span>Reset Q1 (Date)</span>
            </button>
            <button
              onClick={() => {
                if (window.confirm('Reset Question 2 (Precious Life & Thank You Note)? 🌙')) resetQuestion('life');
              }}
              className="px-2.5 py-1 rounded-full bg-white hover:bg-cream-100 border border-chocolate text-chocolate font-bold flex items-center gap-1 shadow-xs active:scale-95"
            >
              <RotateCcw size={10} />
              <span>Reset Q2 (Life)</span>
            </button>
            <button
              onClick={() => {
                if (window.confirm('Reset Question 3 (Custom Question)? 🌻')) resetQuestion('memories');
              }}
              className="px-2.5 py-1 rounded-full bg-white hover:bg-cream-100 border border-chocolate text-chocolate font-bold flex items-center gap-1 shadow-xs active:scale-95"
            >
              <RotateCcw size={10} />
              <span>Reset Q3 (Custom)</span>
            </button>
            <button
              onClick={() => {
                if (window.confirm('Reset ALL 3 questions for Golu? 🐱💗')) resetQuestion('all');
              }}
              className="px-2.5 py-1 rounded-full bg-rose-soft/20 hover:bg-rose-soft/30 border border-rose-deep text-rose-deep font-black flex items-center gap-1 shadow-xs active:scale-95"
            >
              <RotateCcw size={10} />
              <span>Reset All 🔄</span>
            </button>
          </div>
        </div>
      )}

      {/* Quick Access Romantic Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {/* Card 1: Our Music */}
        <div
          onClick={() => onNavigate('music')}
          className="cute-card p-6 bg-white hover:border-rose-soft transition-all cursor-pointer group flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="badge-mood bg-blush-100 text-chocolate text-xs">
                Our Music 🎧
              </span>
              <span className="text-xs text-chocolate/60 font-bold">
                {herSongs.length + hisSongs.length} / 10 songs
              </span>
            </div>

            <h3 className="text-lg font-black text-chocolate group-hover:text-rose-deep transition-colors">
              Our Mood, Our Music
            </h3>
            <p className="text-xs text-chocolate/70 mt-1">
              Listen together even when apart. 5 songs from her, 5 songs from him.
            </p>

            <div className="my-4 p-3 bg-cream-50 rounded-xl border border-chocolate/10 flex items-center gap-3">
              <CatsMusicHeadphones size={60} animated={false} />
              <div className="text-[11px] truncate">
                <span className="font-bold text-chocolate block truncate">
                  {herSongs[0]?.title || hisSongs[0]?.title || 'Until I Found You'}
                </span>
                <span className="text-chocolate/60 truncate">
                  by {herSongs[0]?.artist || hisSongs[0]?.artist || 'Stephen Sanchez'}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs font-bold text-rose-deep pt-2 border-t border-chocolate/10">
            <span>Open Playlists</span>
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* Card 2: Romantic Questions */}
        <div
          onClick={() => onNavigate('questions')}
          className="cute-card p-6 bg-white hover:border-butter-200 transition-all cursor-pointer group flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="badge-mood bg-butter-100 text-chocolate text-xs">
                Love Questions 🌹
              </span>
              <span className="text-xs text-chocolate/60 font-bold">
                {dateResponse ? '1/3 Answered' : 'Waiting for answer'}
              </span>
            </div>

            <h3 className="text-lg font-black text-chocolate group-hover:text-rose-deep transition-colors">
              Date & Life Questions
            </h3>
            <p className="text-xs text-chocolate/70 mt-1">
              Interactive questions with playful runaway buttons and romantic celebrations!
            </p>

            <div className="my-4 p-3 bg-blush-50 rounded-xl border border-chocolate/10 flex items-center gap-2">
              <span className="text-2xl">🌹</span>
              <div className="text-[11px]">
                <strong className="block text-chocolate">
                  {dateResponse ? "Date Planned! 💌" : "Would you go on a date with me?"}
                </strong>
                <span className="text-chocolate/65">
                  {dateResponse?.datePlan
                    ? `Destination: ${dateResponse.datePlan.place}`
                    : 'Click to answer with YES!'}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs font-bold text-rose-deep pt-2 border-t border-chocolate/10">
            <span>Answer Questions</span>
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* Card 3: Ask Me Anything */}
        <div
          onClick={() => onNavigate('ama')}
          className="cute-card p-6 bg-white hover:border-lavender-300 transition-all cursor-pointer group flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="badge-mood bg-lavender-soft text-chocolate text-xs">
                Ask Me Anything 💌
              </span>
              {unansweredQuestions > 0 && (
                <span className="text-[10px] bg-rose-soft text-white px-2 py-0.5 rounded-full font-black animate-pulse">
                  {unansweredQuestions} awaiting
                </span>
              )}
            </div>

            <h3 className="text-lg font-black text-chocolate group-hover:text-rose-deep transition-colors">
              Your Questions, My Answers
            </h3>
            <p className="text-xs text-chocolate/70 mt-1">
              Private question vault. Ask anything on your mind with full honesty and warmth.
            </p>

            <div className="my-4 p-3 bg-cream-50 rounded-xl border border-chocolate/10 flex items-center gap-2">
              <span className="text-2xl">🐱💌</span>
              <div className="text-[11px]">
                <strong className="block text-chocolate">
                  {questions.length} questions shared
                </strong>
                <span className="text-chocolate/65">
                  Private dashboard with read tracking
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs font-bold text-rose-deep pt-2 border-t border-chocolate/10">
            <span>Open Vault</span>
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>

      {/* Memory Garden Preview */}
      <section className="cute-card p-6 sm:p-8 bg-white relative">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-mint-100 text-chocolate text-xs font-bold mb-2">
              <span>🌸</span>
              <span>Our Little Memory Garden</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-chocolate">
              Latest Blossoms in Our Timeline
            </h3>
          </div>

          <button
            onClick={() => onNavigate('garden')}
            className="cute-btn px-4 py-2 bg-cream-100 hover:bg-cream-200 text-chocolate text-xs font-bold"
          >
            <span>View All Memories</span>
            <ArrowRight size={13} />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {memories.slice(0, 2).map((mem) => (
            <div key={mem.id} className="p-4 rounded-2xl bg-cream-50 border-2 border-chocolate/10">
              <div className="flex items-center justify-between text-xs text-chocolate/60 mb-1">
                <span>{mem.icon || '🌸'} {mem.category.toUpperCase()}</span>
                <span>{new Date(mem.date).toLocaleDateString()}</span>
              </div>
              <h4 className="font-extrabold text-chocolate text-sm mt-1">{mem.title}</h4>
              <p className="font-love-note text-base text-chocolate/85 mt-1 leading-snug line-clamp-2">
                “{mem.description}”
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
