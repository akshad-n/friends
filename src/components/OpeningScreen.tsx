import React from 'react';
import { CatHug, PeachSparkle, CatsTogetherFlower } from './KawaiiCats';
import { BackgroundMusic } from './BackgroundMusic';
import { Sparkles, Heart, Flower2, Stars } from 'lucide-react';

interface OpeningScreenProps {
  onEnter: () => void;
}

export const OpeningScreen: React.FC<OpeningScreenProps> = ({ onEnter }) => {
  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-between px-4 py-8 overflow-hidden romantic-mesh-bg select-none">
      {/* Floating background clouds and sparkles */}
      <div className="absolute top-8 left-12 opacity-40 animate-float-slow pointer-events-none">
        <svg width="120" height="60" viewBox="0 0 120 60" fill="white">
          <ellipse cx="60" cy="40" rx="45" ry="20" />
          <circle cx="40" cy="30" r="22" />
          <circle cx="75" cy="25" r="25" />
        </svg>
      </div>

      <div className="absolute top-24 right-16 opacity-35 animate-float pointer-events-none">
        <svg width="100" height="50" viewBox="0 0 100 50" fill="white">
          <ellipse cx="50" cy="35" rx="35" ry="16" />
          <circle cx="35" cy="25" r="18" />
          <circle cx="65" cy="22" r="20" />
        </svg>
      </div>

      {/* Top Bar with Audio Control */}
      <header className="w-full max-w-4xl flex items-center justify-between z-20">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-rose-soft animate-ping" />
          <span className="text-xs font-bold tracking-wider uppercase text-chocolate/75 font-sans">
            Our Private World
          </span>
        </div>
        <BackgroundMusic />
      </header>

      {/* Main Center Content */}
      <main className="flex-1 flex flex-col items-center justify-center text-center max-w-2xl z-20 py-6">
        {/* Tagline Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 border-2 border-chocolate/20 text-chocolate shadow-sm mb-5 animate-float">
          <Sparkles size={14} className="text-rose-soft" />
          <span className="text-xs sm:text-sm font-semibold tracking-wide">
            Two little cats. One little universe. A thousand memories.
          </span>
          <Sparkles size={14} className="text-rose-soft" />
        </div>

        {/* Mascot Cartoon Artwork (White cat with flower & grey cat with gentle hug) */}
        <div className="relative my-3 flex items-center justify-center">
          <CatsTogetherFlower size={260} className="sm:scale-110" />

          {/* Floating gentle hearts above heads */}
          <div className="absolute -top-4 right-12 animate-bounce-cute">
            <span className="text-2xl">💗</span>
          </div>
          <div className="absolute -top-1 left-16 animate-float">
            <span className="text-xl">✨</span>
          </div>
        </div>

        {/* Headings */}
        <h1 className="text-4xl sm:text-6xl font-extrabold text-chocolate tracking-tight mt-4 drop-shadow-sm font-sans">
          Our Little Universe <span className="inline-block animate-wiggle">💗</span>
        </h1>

        <p className="text-lg sm:text-xl font-medium text-chocolate/80 mt-2 max-w-lg font-sans">
          A little world made just for us.
        </p>

        {/* Romantic quote box */}
        <div className="my-6 px-6 py-4 rounded-2xl bg-white/80 border-2 border-chocolate/20 shadow-sm max-w-md">
          <p className="font-love-note text-xl sm:text-2xl text-chocolate leading-snug">
            “Out of all the people in the world, you are the person I want to keep making beautiful memories with.”
          </p>
          <p className="text-xs font-bold text-rose-soft uppercase tracking-wider mt-2">
            Forever & Always 🌷
          </p>
        </div>

        {/* Enter Button */}
        <button
          onClick={onEnter}
          className="cute-btn px-8 py-4 bg-blush-200 text-chocolate text-lg sm:text-xl font-extrabold tracking-wide hover:bg-blush-300 transition-all group shadow-cute-lg"
        >
          <span>Enter Our Little World</span>
          <span className="text-2xl group-hover:scale-125 transition-transform">💗</span>
        </button>
      </main>

      {/* Bottom Footer Info */}
      <footer className="text-center text-xs text-chocolate/60 z-20">
        <p className="flex items-center justify-center gap-1.5 font-medium">
          <span>Made with endless love</span>
          <Heart size={12} className="text-rose-soft fill-rose-soft animate-pulse" />
          <span>just for you</span>
        </p>
      </footer>
    </div>
  );
};
