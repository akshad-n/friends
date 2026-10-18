import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Music, Play, Pause, Sparkles } from 'lucide-react';

export const BackgroundMusic: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.4);
  const [currentTrackName, setCurrentTrackName] = useState('Our Romantic Music Box 🎀');

  // Web Audio Context for synthesized peaceful romantic music box melody
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const timerRef = useRef<number | null>(null);

  // Romantic Pentatonic / Lofi Chord Melody notes in Hz (Warm, gentle music box)
  const notes = [
    261.63, 329.63, 392.0, 523.25, // C4, E4, G4, C5
    220.0, 261.63, 329.63, 440.0,  // A3, C4, E4, A4
    174.61, 220.0, 261.63, 349.23, // F3, A3, C4, F4
    196.0, 246.94, 293.66, 392.0   // G3, B3, D4, G4
  ];

  const playNote = (freq: number) => {
    if (!audioCtxRef.current || !gainNodeRef.current || isMuted) return;
    const ctx = audioCtxRef.current;
    const osc = ctx.createOscillator();
    const noteGain = ctx.createGain();

    // Gentle sine / triangle wave for music box warmth
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, ctx.currentTime);

    const now = ctx.currentTime;
    noteGain.gain.setValueAtTime(0, now);
    noteGain.gain.linearRampToValueAtTime(0.18 * volume, now + 0.04);
    noteGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.6);

    osc.connect(noteGain);
    noteGain.connect(gainNodeRef.current);

    osc.start(now);
    osc.stop(now + 1.8);
  };

  const startMelody = () => {
    if (!audioCtxRef.current) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      audioCtxRef.current = new AudioCtx();
      const gain = audioCtxRef.current.createGain();
      gain.gain.value = volume;
      gain.connect(audioCtxRef.current.destination);
      gainNodeRef.current = gain;
    }

    if (audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }

    let noteIndex = 0;
    const melodyPattern = [0, 2, 1, 3, 4, 6, 5, 7, 8, 10, 9, 11, 12, 14, 13, 15];

    timerRef.current = window.setInterval(() => {
      const noteIdx = melodyPattern[noteIndex % melodyPattern.length];
      playNote(notes[noteIdx]);
      noteIndex++;
    }, 420);
  };

  const stopMelody = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const togglePlay = () => {
    if (isPlaying) {
      stopMelody();
      setIsPlaying(false);
    } else {
      startMelody();
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (gainNodeRef.current && audioCtxRef.current) {
      gainNodeRef.current.gain.setValueAtTime(isMuted ? volume : 0, audioCtxRef.current.currentTime);
    }
    setIsMuted(!isMuted);
  };

  const handleVolumeChange = (newVol: number) => {
    setVolume(newVol);
    if (gainNodeRef.current && audioCtxRef.current && !isMuted) {
      gainNodeRef.current.gain.setValueAtTime(newVol, audioCtxRef.current.currentTime);
    }
  };

  useEffect(() => {
    return () => {
      stopMelody();
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  return (
    <div className="flex items-center gap-2 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full border-2 border-chocolate shadow-cute text-xs text-chocolate select-none transition-all hover:shadow-cute-lg">
      <button
        onClick={togglePlay}
        className={`w-7 h-7 rounded-full flex items-center justify-center transition-transform active:scale-90 ${
          isPlaying ? 'bg-blush-200 text-chocolate animate-spin-slow' : 'bg-cream-200 text-chocolate'
        }`}
        title={isPlaying ? 'Pause music' : 'Play peaceful romantic background music'}
        aria-label="Toggle background music"
      >
        {isPlaying ? <Pause size={14} /> : <Play size={14} className="ml-0.5" />}
      </button>

      <div className="hidden sm:flex items-center gap-1.5 max-w-[140px] truncate">
        <Music size={13} className={isPlaying ? 'text-rose-soft animate-wiggle' : 'text-chocolate/60'} />
        <span className="font-semibold text-[11px] truncate">{currentTrackName}</span>
      </div>

      <button
        onClick={toggleMute}
        className="p-1 text-chocolate/70 hover:text-chocolate transition-colors"
        title={isMuted ? 'Unmute' : 'Mute'}
      >
        {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
      </button>

      <input
        type="range"
        min="0"
        max="1"
        step="0.05"
        value={isMuted ? 0 : volume}
        onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
        className="w-12 h-1.5 bg-cream-200 accent-rose-soft rounded-lg cursor-pointer"
        aria-label="Volume slider"
      />

      {isPlaying && (
        <span className="flex gap-0.5 items-end h-3 px-1">
          <span className="w-0.5 bg-rose-soft h-3 animate-pulse" />
          <span className="w-0.5 bg-rose-soft h-2 animate-bounce" />
          <span className="w-0.5 bg-rose-soft h-3.5 animate-pulse" />
        </span>
      )}
    </div>
  );
};
