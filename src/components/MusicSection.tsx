import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { useApp } from '../context/AppContext';
import { Song, MoodType } from '../types';
import { CatsMusicHeadphones, PeachSparkle } from './KawaiiCats';
import { RomanticDivider } from './FloralDecorations';
import { isDefaultDemoSong } from '../lib/cloudStore';
import {
  Plus,
  Play,
  Pause,
  Trash2,
  MessageCircle,
  ExternalLink,
  Music,
  Headphones,
  Sparkles,
  Heart,
  Share2,
  X,
  Volume2,
  Dices,
  Check,
  Link as LinkIcon,
  Edit3,
  Clipboard,
  Loader2,
  Cloud,
  RefreshCw,
} from 'lucide-react';

export const MOOD_DETAILS: Record<
  MoodType,
  {
    label: MoodType;
    emoji: string;
    badgeColor: string;
    textColor: string;
    borderColor: string;
    bgColor: string;
    vibeTag: string;
    description: string;
    quote: string;
  }
> = {
  Romantic: {
    label: 'Romantic',
    emoji: '💖',
    badgeColor: 'bg-blush-100 text-chocolate border-blush-300',
    textColor: 'text-rose-deep',
    borderColor: 'border-rose-soft',
    bgColor: 'bg-blush-50/70',
    vibeTag: 'Heartfelt Love & Warm Hugs',
    description: 'Deep, passionate melody made for holding hands, looking into each other’s eyes, and feeling completely at home.',
    quote: 'Every lyric whispers how deeply my heart belongs to you.',
  },
  Lovely: {
    label: 'Lovely',
    emoji: '🌷',
    badgeColor: 'bg-pink-100 text-chocolate border-pink-300',
    textColor: 'text-pink-600',
    borderColor: 'border-pink-300',
    bgColor: 'bg-pink-50/70',
    vibeTag: 'Sweet & Tender Charm',
    description: 'Dreamy, soft acoustic vibe that wraps around you like a gentle morning hug and reminds you of her sweet smile.',
    quote: 'Soft melodies that fill the air with sweetness.',
  },
  Happy: {
    label: 'Happy',
    emoji: '✨',
    badgeColor: 'bg-butter-100 text-chocolate border-butter-200',
    textColor: 'text-amber-700',
    borderColor: 'border-amber-300',
    bgColor: 'bg-amber-50/70',
    vibeTag: 'Joyful & Smiling Energy',
    description: 'Upbeat, cheerful, and full of sunshine — makes both of you want to smile, laugh, and dance together.',
    quote: 'Pure happiness in every beat whenever we laugh together.',
  },
  Sad: {
    label: 'Sad',
    emoji: '🌧️',
    badgeColor: 'bg-blue-100 text-chocolate border-blue-200',
    textColor: 'text-blue-700',
    borderColor: 'border-blue-300',
    bgColor: 'bg-blue-50/70',
    vibeTag: 'Comforting on Cloudy Days',
    description: 'Touching, emotional, and comforting — a gentle musical hug when distance feels hard or when you miss each other.',
    quote: 'Even in quiet moments, my thoughts gently fly straight to you.',
  },
  'Our Special Song': {
    label: 'Our Special Song',
    emoji: '🎀',
    badgeColor: 'bg-rose-soft text-white border-rose-deep',
    textColor: 'text-rose-deep',
    borderColor: 'border-rose-deep',
    bgColor: 'bg-rose-50/70',
    vibeTag: 'Our Personal Anthem',
    description: 'The irreplaceable song of our story — tied to our unforgettable dates and milestones.',
    quote: 'This song will forever play the story of our love.',
  },
  'Missing You': {
    label: 'Missing You',
    emoji: '🥺',
    badgeColor: 'bg-lavender-100 text-chocolate border-lavender-300',
    textColor: 'text-purple-700',
    borderColor: 'border-purple-300',
    bgColor: 'bg-purple-50/70',
    vibeTag: 'Longing For Your Hug',
    description: 'Gentle chords for late nights when you are counting down the hours until you see each other again.',
    quote: 'Closing my eyes and counting down the hours until our next hug.',
  },
  Peaceful: {
    label: 'Peaceful',
    emoji: '🍃',
    badgeColor: 'bg-mint-100 text-chocolate border-mint-200',
    textColor: 'text-emerald-700',
    borderColor: 'border-emerald-300',
    bgColor: 'bg-mint-50/70',
    vibeTag: 'Calm & Serene Harmony',
    description: 'Relaxing ambient sounds that quiet the world and let you rest peacefully together.',
    quote: 'Safe in each other’s presence where silence is sweet peace.',
  },
  'Late Night Thoughts': {
    label: 'Late Night Thoughts',
    emoji: '🌙',
    badgeColor: 'bg-[#E3DCF7] text-chocolate border-[#C1B2EB]',
    textColor: 'text-indigo-700',
    borderColor: 'border-indigo-300',
    bgColor: 'bg-indigo-50/70',
    vibeTag: 'Midnight Whispers',
    description: 'Intimate nighttime chords for 2 AM talks and staring at the stars together.',
    quote: 'Under the same moon, wishing you were right here in my arms.',
  },
  Energetic: {
    label: 'Energetic',
    emoji: '⚡',
    badgeColor: 'bg-cream-200 text-chocolate border-cream-300',
    textColor: 'text-orange-700',
    borderColor: 'border-orange-300',
    bgColor: 'bg-orange-50/70',
    vibeTag: 'High Spirits & Fun',
    description: 'Electric rhythms that light up your day with excitement and zest.',
    quote: 'Unstoppable together with smiles that light up every room.',
  },
};

const AUTO_ROMANTIC_SONGS: Omit<Song, 'id' | 'createdAt' | 'coupleId' | 'ownerRole' | 'ownerName'>[] = [
  {
    title: 'Until I Found You',
    artist: 'Stephen Sanchez',
    url: 'https://www.youtube.com/watch?v=GxldQ9eX2wo',
    mood: 'Romantic',
    message: 'I would never fall in love until I found you, my sweet Golu. 🌷',
  },
  {
    title: 'Perfect',
    artist: 'Ed Sheeran',
    url: 'https://www.youtube.com/watch?v=2Vv-BfVoq4g',
    mood: 'Romantic',
    message: 'Darling, you look perfect every single day and night. 💗',
  },
  {
    title: "Can't Help Falling in Love",
    artist: 'Kina Grannis',
    url: 'https://www.youtube.com/watch?v=gahSgQ52gP0',
    mood: 'Lovely',
    message: 'Take my hand, take my whole life too. 🌸🌙',
  },
  {
    title: 'Dandelions',
    artist: 'Ruth B.',
    url: 'https://www.youtube.com/watch?v=W8a4sUabCUo',
    mood: 'Lovely',
    message: 'Wishing on dandelions all of the time, so grateful you are mine. 🌻',
  },
  {
    title: 'Golden Hour',
    artist: 'JVKE',
    url: 'https://www.youtube.com/watch?v=PEM0Vs8jf1w',
    mood: 'Lovely',
    message: 'Just like the sunset when we talk for hours... 🌅✨',
  },
  {
    title: 'What Makes You Beautiful',
    artist: 'One Direction',
    url: 'https://www.youtube.com/watch?v=QJO3ROT-A4E',
    mood: 'Happy',
    message: 'You make my heart smile every single second! ✨🐱',
  },
  {
    title: 'Sugar',
    artist: 'Maroon 5',
    url: 'https://www.youtube.com/watch?v=09R8_2nJtjg',
    mood: 'Happy',
    message: 'Need a little sweetness in my life, yes please! 🍬💖',
  },
  {
    title: 'Here With Me',
    artist: 'd4vd',
    url: 'https://www.youtube.com/watch?v=F0w3oM9R-wM',
    mood: 'Sad',
    message: 'Late nights missing you so much... always counting days till next hug. 🌙',
  },
  {
    title: 'Someone Like You',
    artist: 'Adele',
    url: 'https://www.youtube.com/watch?v=hLQl3WQQoQ0',
    mood: 'Sad',
    message: 'Comforting gentle song for quiet rainy days. 🌧️',
  },
  {
    title: 'Tum Hi Ho',
    artist: 'Arijit Singh',
    url: 'https://www.youtube.com/watch?v=Umqb9KENgmk',
    mood: 'Romantic',
    message: 'Kyunki tum hi ho, ab tum hi ho, meri aashiqui ab tum hi ho. 🌙',
  },
  {
    title: 'Kesariya',
    artist: 'Arijit Singh',
    url: 'https://www.youtube.com/watch?v=BddP6PYo2gs',
    mood: 'Romantic',
    message: 'Kesariya tera ishq hai piya... rang jaaun jo main haath lagaun. 🌸',
  },
];

// Helper to extract YouTube video ID for embedded player & thumbnail
const extractYouTubeId = (url: string): string | null => {
  try {
    const regExp = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = url.match(regExp);
    return match ? match[1] : null;
  } catch {
    return null;
  }
};

// Helper to clean YouTube title and split into Title + Artist
const cleanYouTubeTitle = (rawTitle: string, author?: string) => {
  let cleaned = rawTitle
    .replace(
      /\s*[\(\[](?:Official\s*(?:Music\s*)?Video|Official\s*Audio|Lyric\s*Video|Lyrics|Visualizer|HD|4K|Audio|HQ|Remastered|Music\s*Video|Performance\s*Video|Live|Full\s*Video|Audio\s*Song)[\)\]]/gi,
      ''
    )
    .replace(/\s*\|\s*Official.*$/i, '')
    .trim();

  let detectedArtist = author
    ? author.replace(/VEVO$|\s*-\s*Topic$|\s*Official$/i, '').trim()
    : '';
  let detectedTitle = cleaned;

  if (cleaned.includes(' - ')) {
    const parts = cleaned.split(' - ');
    detectedArtist = parts[0].trim();
    detectedTitle = parts.slice(1).join(' - ').trim();
  } else if (cleaned.includes(' | ')) {
    const parts = cleaned.split(' | ');
    detectedTitle = parts[0].trim();
    detectedArtist = parts[1].trim();
  } else if (cleaned.includes(': ') && !cleaned.toLowerCase().startsWith('http')) {
    const parts = cleaned.split(': ');
    detectedArtist = parts[0].trim();
    detectedTitle = parts.slice(1).join(': ').trim();
  }

  detectedTitle = detectedTitle.replace(/^["']|["']$/g, '').trim();
  detectedArtist = detectedArtist.replace(/^["']|["']$/g, '').trim();

  return {
    detectedTitle: detectedTitle || rawTitle,
    detectedArtist: detectedArtist || 'YouTube Music',
  };
};

// Helper to auto-detect mood according to song title and author
const detectMoodFromText = (text: string): MoodType => {
  const lower = text.toLowerCase();

  if (
    lower.includes('sad') ||
    lower.includes('cry') ||
    lower.includes('crying') ||
    lower.includes('tears') ||
    lower.includes('broken') ||
    lower.includes('lonely') ||
    lower.includes('alone') ||
    lower.includes('pain') ||
    lower.includes('hurt') ||
    lower.includes('goodbye') ||
    lower.includes('miss you') ||
    lower.includes('missing') ||
    lower.includes('heartbreak') ||
    lower.includes('judai')
  ) {
    return 'Sad';
  }

  if (
    lower.includes('happy') ||
    lower.includes('dance') ||
    lower.includes('smile') ||
    lower.includes('joy') ||
    lower.includes('party') ||
    lower.includes('summer') ||
    lower.includes('fun') ||
    lower.includes('celebrate') ||
    lower.includes('cheer') ||
    lower.includes('sugar') ||
    lower.includes('sunshine')
  ) {
    return 'Happy';
  }

  if (
    lower.includes('lovely') ||
    lower.includes('sweet') ||
    lower.includes('soft') ||
    lower.includes('gentle') ||
    lower.includes('pretty') ||
    lower.includes('cute') ||
    lower.includes('flower') ||
    lower.includes('dandelion') ||
    lower.includes('golden hour') ||
    lower.includes('falling in love') ||
    lower.includes('angel')
  ) {
    return 'Lovely';
  }

  return 'Romantic';
};

export const MusicSection: React.FC = () => {
  const {
    currentRole,
    herSongs,
    hisSongs,
    allSongs,
    addSong,
    removeSong,
    songReplies,
    addSongReply,
    coupleSpace,
    isCloudSynced,
    refreshCloudSongs,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'both' | 'her' | 'him'>('both');
  const [activeMoodFilter, setActiveMoodFilter] = useState<MoodType | 'all'>('all');
  const [isRefreshingSync, setIsRefreshingSync] = useState(false);

  // Initialize selectedSong with first custom song, or first available song
  const [selectedSong, setSelectedSong] = useState<Song | null>(() => {
    const all = [...herSongs, ...hisSongs];
    const custom = all.find((s) => !isDefaultDemoSong(s));
    return custom || all[0] || null;
  });

  // Keep selectedSong automatically synced: switch away from default demo songs when custom songs exist
  useEffect(() => {
    const all = [...herSongs, ...hisSongs];
    if (all.length === 0) {
      setSelectedSong(null);
      return;
    }

    const currentStillExists = selectedSong && all.some((s) => s.id === selectedSong.id);
    const isCurrentDefault = selectedSong && isDefaultDemoSong(selectedSong);
    const hasCustomSongs = all.some((s) => !isDefaultDemoSong(s));

    if (!selectedSong || !currentStillExists || (isCurrentDefault && hasCustomSongs)) {
      const firstCustom = all.find((s) => !isDefaultDemoSong(s));
      setSelectedSong(firstCustom || all[0]);
    }
  }, [herSongs, hisSongs]);

  const hasDemoSongs = allSongs.some((s) => isDefaultDemoSong(s));

  const handleManualSync = async () => {
    setIsRefreshingSync(true);
    try {
      await refreshCloudSongs();
    } finally {
      setTimeout(() => setIsRefreshingSync(false), 500);
    }
  };

  const handleClearDemoSongs = async () => {
    if (
      window.confirm(
        'Clear the default demo songs? 🌷\n\nThis will remove the placeholder demo songs so you only have your own dedicated songs!'
      )
    ) {
      const demoSongs = allSongs.filter((s) => isDefaultDemoSong(s));
      for (const d of demoSongs) {
        await removeSong(d.id);
      }
      setSelectedSong(null);
    }
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [targetPlaylist, setTargetPlaylist] = useState<'her' | 'him'>('him');
  const [replyingSong, setReplyingSong] = useState<Song | null>(null);
  const [customReply, setCustomReply] = useState('');

  // Form State for Adding Song
  const [formTitle, setFormTitle] = useState('');
  const [formArtist, setFormArtist] = useState('');
  const [formUrl, setFormUrl] = useState('');
  const [formMood, setFormMood] = useState<MoodType>('Romantic');
  const [formMessage, setFormMessage] = useState('');
  const [formError, setFormError] = useState('');

  // Auto-detect states in Add Song Modal
  const [isDetecting, setIsDetecting] = useState(false);
  const [detectedThumb, setDetectedThumb] = useState<string | null>(null);
  const [detectSuccess, setDetectSuccess] = useState<string | null>(null);
  const [isManualEditOpen, setIsManualEditOpen] = useState(false);

  // Helper to extract YouTube video ID for embedded player
  const getYouTubeEmbedUrl = (url: string) => {
    try {
      const match = extractYouTubeId(url);
      return match ? `https://www.youtube.com/embed/${match}?autoplay=1` : null;
    } catch {
      return null;
    }
  };

  // Helper for Spotify Embed
  const getSpotifyEmbedUrl = (url: string) => {
    try {
      if (url.includes('spotify.com/track/')) {
        const id = url.split('track/')[1]?.split('?')[0];
        return id ? `https://open.spotify.com/embed/track/${id}` : null;
      }
      return null;
    } catch {
      return null;
    }
  };

  // Auto-fetch YouTube Title, Artist, Thumbnail, and Mood
  const handleUrlChange = async (newUrl: string) => {
    setFormUrl(newUrl);
    setFormError('');
    setDetectSuccess(null);

    const videoId = extractYouTubeId(newUrl);
    if (!videoId) {
      setDetectedThumb(null);
      return;
    }

    setDetectedThumb(`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`);
    setIsDetecting(true);

    try {
      let rawTitle = '';
      let author = '';

      // Try noembed first (CORS allowed in browsers)
      try {
        const res = await fetch(
          `https://noembed.com/embed?url=https://www.youtube.com/watch?v=${videoId}`
        );
        if (res.ok) {
          const data = await res.json();
          if (data && data.title) {
            rawTitle = data.title;
            author = data.author_name || '';
          }
        }
      } catch {
        // Fallback
      }

      // Fallback to youtube oembed
      if (!rawTitle) {
        try {
          const res2 = await fetch(
            `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`
          );
          if (res2.ok) {
            const data2 = await res2.json();
            if (data2 && data2.title) {
              rawTitle = data2.title;
              author = data2.author_name || '';
            }
          }
        } catch {
          // Ignore
        }
      }

      if (rawTitle) {
        const { detectedTitle, detectedArtist } = cleanYouTubeTitle(rawTitle, author);
        const autoMood = detectMoodFromText(`${rawTitle} ${author}`);
        setFormTitle(detectedTitle);
        setFormArtist(detectedArtist);
        setFormMood(autoMood);
        setDetectSuccess(`✨ Auto-detected song name: "${detectedTitle}" (${autoMood} Mood)!`);
      } else {
        if (!formTitle) setFormTitle('Romantic Song');
        if (!formArtist) setFormArtist('YouTube');
      }
    } catch (err) {
      console.warn('Auto-detect error:', err);
    } finally {
      setIsDetecting(false);
    }
  };

  // Paste from clipboard helper
  const handlePasteFromClipboard = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        handleUrlChange(text.trim());
      }
    } catch {
      alert('Please paste the YouTube link directly into the box! 🐱');
    }
  };

  const handleOpenAddModal = () => {
    const defaultTarget = activeTab === 'her' ? 'her' : 'him';
    setTargetPlaylist(defaultTarget);
    const targetList = defaultTarget === 'her' ? herSongs : hisSongs;
    if (targetList.length >= 5) {
      alert(
        `The ${
          defaultTarget === 'her' ? 'Her Songs' : 'My Songs'
        } playlist already has 5 songs! 🐱 Please remove or replace a song to add a new one.`
      );
      return;
    }
    setFormTitle('');
    setFormArtist('');
    setFormUrl('');
    setFormMessage('');
    setFormError('');
    setDetectedThumb(null);
    setDetectSuccess(null);
    setIsDetecting(false);
    setIsManualEditOpen(false);
    setFormMood('Romantic');
    setIsModalOpen(true);
  };

  // Auto-add a romantic song for Him
  const handleAutoAddRomanticSong = async () => {
    if (hisSongs.length >= 5) {
      alert(
        'My Songs playlist already has 5 songs! 🐱 Please remove a song first before auto-adding a new romantic song.'
      );
      return;
    }

    // Find a romantic song that is not yet in hisSongs
    const existingTitles = new Set(hisSongs.map((s) => s.title.toLowerCase().trim()));
    const candidate =
      AUTO_ROMANTIC_SONGS.find((s) => !existingTitles.has(s.title.toLowerCase().trim())) ||
      AUTO_ROMANTIC_SONGS[Math.floor(Math.random() * AUTO_ROMANTIC_SONGS.length)];

    const result = await addSong(candidate, 'him');
    if (result.success) {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#F6C9D2', '#ECA4B2', '#FFE8A3', '#DCEFE3', '#FFFFFF'],
      });
      setActiveTab('him');
      setSelectedSong({
        ...candidate,
        id: `auto-${Date.now()}`,
        coupleId: coupleSpace.id,
        ownerRole: 'him',
        ownerName: coupleSpace.himName,
        createdAt: new Date().toISOString(),
      });
      alert(
        `✨ Auto-Added romantic song for Golu:\n"${candidate.title}" by ${candidate.artist} (${candidate.mood} Mood)! 🎶💖`
      );
    } else {
      alert(result.message);
    }
  };

  // Auto-fill modal with random romantic song
  const handleAutoFillModalForm = () => {
    const existingTitles = new Set(
      (targetPlaylist === 'her' ? herSongs : hisSongs).map((s) =>
        s.title.toLowerCase().trim()
      )
    );
    const candidate =
      AUTO_ROMANTIC_SONGS.find(
        (s) => !existingTitles.has(s.title.toLowerCase().trim())
      ) ||
      AUTO_ROMANTIC_SONGS[Math.floor(Math.random() * AUTO_ROMANTIC_SONGS.length)];

    setFormTitle(candidate.title);
    setFormArtist(candidate.artist);
    setFormUrl(candidate.url);
    setFormMood(candidate.mood);
    setFormMessage(candidate.message || 'For you with all my love! 💗');
    const vId = extractYouTubeId(candidate.url);
    if (vId) setDetectedThumb(`https://i.ytimg.com/vi/${vId}/hqdefault.jpg`);
    setDetectSuccess(`✨ Selected: "${candidate.title}" (${candidate.mood} Mood)`);
  };

  const handleSaveSong = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formUrl.trim()) {
      setFormError('Please paste a YouTube song link! 🎶');
      return;
    }

    if (!formTitle.trim()) {
      const vId = extractYouTubeId(formUrl);
      if (vId) {
        setFormTitle(`YouTube Song (${vId})`);
      } else {
        setFormError('Please enter a song title or valid link! 🐱');
        return;
      }
    }

    const targetList = targetPlaylist === 'her' ? herSongs : hisSongs;
    if (targetList.length >= 5) {
      setFormError(
        `The ${
          targetPlaylist === 'her' ? 'Her Songs' : 'My Songs'
        } playlist already has 5 songs! 🐱 Please remove or replace one before adding a new song.`
      );
      return;
    }

    const finalTitle = formTitle.trim();
    const finalArtist = formArtist.trim() || 'YouTube Artist';

    const result = await addSong(
      {
        title: finalTitle,
        artist: finalArtist,
        url: formUrl.trim(),
        mood: formMood,
        message: formMessage.trim() || undefined,
      },
      targetPlaylist
    );

    if (!result.success) {
      setFormError(result.message);
    } else {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#F6C9D2', '#ECA4B2', '#FFE8A3', '#DCEFE3', '#FFFFFF'],
      });
      if (result.song) {
        setSelectedSong(result.song);
      }
      setIsModalOpen(false);
      setActiveTab(targetPlaylist);
    }
  };

  const handleQuickReply = async (song: Song, text: string) => {
    await addSongReply(song.id, text);
    setReplyingSong(null);
  };

  const handleCustomReplySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyingSong || !customReply.trim()) return;
    await addSongReply(replyingSong.id, customReply.trim());
    setCustomReply('');
    setReplyingSong(null);
  };

  const roleFilteredList =
    activeTab === 'her' ? herSongs : activeTab === 'him' ? hisSongs : allSongs;

  const currentList =
    activeMoodFilter === 'all'
      ? roleFilteredList
      : roleFilteredList.filter((s) => s.mood === activeMoodFilter);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 select-none">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex justify-center mb-2">
          <CatsMusicHeadphones size={210} />
        </div>

        <h2 className="text-3xl sm:text-4xl font-extrabold text-chocolate tracking-tight flex items-center justify-center gap-2">
          Our Mood, Our Music <span className="text-rose-soft">🎧🐱</span>
        </h2>
        <p className="text-sm sm:text-base font-medium text-chocolate/80 mt-1 max-w-xl mx-auto">
          “Five songs from you, five songs from me, and a little piece of our hearts in every song.”
        </p>
      </div>

      {/* Featured: Listen Together, Even When We're Apart */}
      <section className="cute-card p-6 mb-10 bg-gradient-to-br from-white via-cream-50 to-blush-50 relative overflow-hidden">
        <div className="absolute top-2 right-4 opacity-20 pointer-events-none text-6xl">
          🎶
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-soft/20 text-chocolate text-xs font-bold mb-3">
              <Headphones size={13} className="text-rose-soft" />
              <span>Listen Together, Even When We're Apart 🎧💗</span>
            </div>

            {selectedSong ? (
              <div>
                <h3 className="text-2xl font-black text-chocolate flex items-center gap-2">
                  {selectedSong.title}
                </h3>
                <p className="text-sm font-bold text-chocolate/75 mt-0.5">
                  by {selectedSong.artist}
                </p>

                <div className="flex flex-wrap items-center gap-2 mt-3">
                  <span className={`badge-mood ${MOOD_DETAILS[selectedSong.mood]?.badgeColor || 'bg-blush-100'} text-xs`}>
                    {MOOD_DETAILS[selectedSong.mood]?.emoji} {selectedSong.mood}
                  </span>
                  <span className="text-xs text-chocolate/60">
                    Added with love by{' '}
                    <strong className="text-chocolate">
                      {selectedSong.ownerRole === 'her' ? coupleSpace.herName : coupleSpace.himName}
                    </strong>
                  </span>
                  <button
                    onClick={() => {
                      if (
                        window.confirm(
                          `Are you sure you want to remove "${selectedSong.title}" from the playlist? 🎶\n\nIt will stay saved permanently unless you delete it.`
                        )
                      ) {
                        removeSong(selectedSong.id);
                        setSelectedSong(null);
                      }
                    }}
                    className="p-1 px-2.5 rounded-full border border-chocolate/20 bg-white hover:bg-rose-soft/20 text-chocolate/70 hover:text-rose-deep text-xs ml-auto transition-all flex items-center gap-1 active:scale-95"
                    title="Remove this song from playlist"
                  >
                    <Trash2 size={11} />
                    <span className="text-[10px] font-bold">Remove</span>
                  </button>
                </div>

                {/* Song Mood According to Track Card */}
                <div
                  className={`mt-3.5 p-3.5 rounded-2xl ${
                    MOOD_DETAILS[selectedSong.mood]?.bgColor || 'bg-blush-50/70'
                  } border-2 ${
                    MOOD_DETAILS[selectedSong.mood]?.borderColor || 'border-rose-soft'
                  } shadow-xs text-left`}
                >
                  <div className="flex items-center justify-between mb-1 gap-2 flex-wrap">
                    <div className="flex items-center gap-1.5 font-black text-chocolate text-xs">
                      <span className="text-base">{MOOD_DETAILS[selectedSong.mood]?.emoji || '💖'}</span>
                      <span>{selectedSong.mood} Mood Vibe:</span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/80 border border-chocolate/15 text-chocolate/80">
                        According to song 🎵
                      </span>
                    </div>
                    <span className="text-[11px] font-bold text-chocolate/70">
                      {MOOD_DETAILS[selectedSong.mood]?.vibeTag}
                    </span>
                  </div>
                  <p className="text-xs text-chocolate/85 font-medium leading-relaxed">
                    {MOOD_DETAILS[selectedSong.mood]?.description}
                  </p>
                  <div className="mt-1 text-[11px] italic text-rose-deep font-semibold">
                    “{MOOD_DETAILS[selectedSong.mood]?.quote}”
                  </div>
                </div>

                {selectedSong.message && (
                  <p className="font-love-note text-lg text-rose-deep mt-3 bg-white/70 p-3 rounded-xl border border-chocolate/10">
                    “{selectedSong.message}”
                  </p>
                )}
              </div>
            ) : (
              <p className="text-sm text-chocolate/70">
                Pick any song below to start listening together! 🐱
              </p>
            )}
          </div>

          {/* Embedded Player or Fallback */}
          <div className="w-full md:w-80 flex flex-col items-center">
            {selectedSong ? (
              <div className="w-full rounded-2xl overflow-hidden border-2 border-chocolate shadow-sm bg-white p-2">
                {getYouTubeEmbedUrl(selectedSong.url) ? (
                  <iframe
                    src={getYouTubeEmbedUrl(selectedSong.url)!}
                    title={selectedSong.title}
                    className="w-full h-44 rounded-xl border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : getSpotifyEmbedUrl(selectedSong.url) ? (
                  <iframe
                    src={getSpotifyEmbedUrl(selectedSong.url)!}
                    title={selectedSong.title}
                    className="w-full h-44 rounded-xl border-0"
                    allow="encrypted-media"
                  />
                ) : (
                  <div className="p-4 text-center">
                    <Music size={32} className="mx-auto text-rose-soft mb-2" />
                    <p className="text-xs font-semibold text-chocolate/80 mb-3">
                      Direct streaming link
                    </p>
                    <a
                      href={selectedSong.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cute-btn px-4 py-2 bg-blush-200 text-chocolate text-xs"
                    >
                      <span>Open on Music App</span>
                      <ExternalLink size={12} />
                    </a>
                  </div>
                )}
                <div className="mt-2 text-center text-[10px] text-chocolate/60 font-semibold">
                  🐱 Shared Session Active • Listening in unison
                </div>
              </div>
            ) : (
              <div className="h-44 w-full flex items-center justify-center border-2 border-dashed border-chocolate/20 rounded-2xl bg-white/50 text-xs text-chocolate/60">
                Select a song to play
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Playlist Controls & Add Button */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4">
        <div className="flex items-center gap-2 bg-cream-50 p-1.5 rounded-full border-2 border-chocolate/15 flex-wrap justify-center">
          <button
            onClick={() => setActiveTab('both')}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
              activeTab === 'both'
                ? 'bg-blush-200 text-chocolate border-2 border-chocolate shadow-sm'
                : 'text-chocolate/70 hover:text-chocolate'
            }`}
          >
            All Songs ({allSongs.length}/10)
          </button>
          <button
            onClick={() => setActiveTab('her')}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
              activeTab === 'her'
                ? 'bg-blush-200 text-chocolate border-2 border-chocolate shadow-sm'
                : 'text-chocolate/70 hover:text-chocolate'
            }`}
          >
            Her Songs 🌷 ({herSongs.length}/5)
          </button>
          <button
            onClick={() => setActiveTab('him')}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
              activeTab === 'him'
                ? 'bg-lavender-soft text-chocolate border-2 border-chocolate shadow-sm'
                : 'text-chocolate/70 hover:text-chocolate'
            }`}
          >
            My Songs 🌙 ({hisSongs.length}/5)
          </button>
        </div>

        <div className="flex items-center gap-2 flex-wrap justify-center">
          <button
            onClick={handleAutoAddRomanticSong}
            className="cute-btn px-4 py-2.5 bg-lavender-soft hover:bg-lavender-200 text-chocolate text-xs font-black tracking-wide border-2 border-chocolate shadow-sm active:scale-95 flex items-center gap-1.5"
            title="Automatically pick and add a romantic song to His Songs for Golu"
          >
            <Sparkles size={14} className="text-rose-deep animate-pulse" />
            <span>Auto Song ✨</span>
          </button>

          <button
            onClick={handleOpenAddModal}
            className="cute-btn px-5 py-2.5 bg-butter-100 hover:bg-butter-200 text-chocolate text-xs font-extrabold tracking-wide shadow-sm active:scale-95"
          >
            <Plus size={15} />
            <span>Add a Song + 🎶</span>
          </button>
        </div>
      </div>

      {/* Cloud Sync Status Bar & Demo Song Cleaner */}
      <div className="flex items-center justify-between flex-wrap gap-2 mb-6 px-3 py-2 rounded-2xl bg-white/70 border border-chocolate/10 text-xs shadow-2xs">
        <div className="flex items-center gap-2">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 text-[11px] font-bold border border-emerald-300">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Live Cloud Synced (Saved on all devices)</span>
          </div>
          <button
            onClick={handleManualSync}
            disabled={isRefreshingSync}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full border border-chocolate/20 bg-cream-50 hover:bg-cream-100 text-chocolate/75 hover:text-chocolate text-[11px] font-semibold transition-all active:scale-95 disabled:opacity-50"
            title="Sync latest songs from cloud"
          >
            <RefreshCw size={11} className={isRefreshingSync ? 'animate-spin text-rose-deep' : ''} />
            <span>{isRefreshingSync ? 'Syncing...' : 'Sync Now'}</span>
          </button>
        </div>

        {hasDemoSongs && (
          <button
            onClick={handleClearDemoSongs}
            className="px-2.5 py-1 rounded-full border border-rose-soft bg-rose-50 hover:bg-rose-100 text-rose-deep text-[11px] font-bold transition-all active:scale-95 ml-auto"
            title="Remove default demo songs so you only have your own playlist"
          >
            🧹 Clean Demo Songs
          </button>
        )}
      </div>

      {/* Him Section Auto Song Dedication Banner */}
      {(activeTab === 'him' || currentRole === 'him') && (
        <div className="mb-6 p-4 rounded-2xl bg-amber-50/95 border-2 border-chocolate/20 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs shadow-sm">
          <div className="flex items-center gap-2.5 font-black text-chocolate text-left">
            <span className="text-xl">🌙</span>
            <div>
              <span className="block font-black text-chocolate text-xs">Him Section • Romantic Song Dedication:</span>
              <span className="text-[11px] text-chocolate/70 font-semibold">
                Click "Auto Song" to dedicate a handpicked romantic song to Golu in 1 click!
              </span>
            </div>
          </div>

          <button
            onClick={handleAutoAddRomanticSong}
            className="cute-btn px-4 py-2 bg-butter-100 hover:bg-butter-200 text-chocolate font-black text-xs shadow-xs active:scale-95 flex items-center gap-1.5 shrink-0"
          >
            <Sparkles size={14} className="text-rose-deep" />
            <span>Auto Add Romantic Song 🎶✨</span>
          </button>
        </div>
      )}

      {/* Mood Filter Bar */}
      <div className="mb-6 p-3.5 rounded-2xl bg-white/80 border-2 border-chocolate/15 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs shadow-xs">
        <div className="flex items-center gap-1.5 font-black text-chocolate text-left">
          <span className="text-base">🎭</span>
          <div>
            <span className="block font-black text-chocolate text-xs">Filter by Song Mood:</span>
            <span className="text-[10px] text-chocolate/70 font-semibold">
              See songs according to Romantic, Lovely, Happy, or Sad feelings
            </span>
          </div>
        </div>
        <div className="flex items-center gap-1.5 flex-wrap justify-center">
          <button
            onClick={() => setActiveMoodFilter('all')}
            className={`px-3 py-1 rounded-full text-xs font-bold transition-all border ${
              activeMoodFilter === 'all'
                ? 'bg-chocolate text-white border-chocolate shadow-xs'
                : 'bg-cream-50 text-chocolate/75 border-chocolate/20 hover:bg-cream-100'
            }`}
          >
            All Moods ({roleFilteredList.length})
          </button>
          {(['Romantic', 'Lovely', 'Happy', 'Sad'] as MoodType[]).map((m) => {
            const d = MOOD_DETAILS[m];
            const count = roleFilteredList.filter((s) => s.mood === m).length;
            return (
              <button
                key={m}
                onClick={() => setActiveMoodFilter(m)}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all border flex items-center gap-1 ${
                  activeMoodFilter === m
                    ? `${d.badgeColor} border-chocolate shadow-xs ring-1 ring-chocolate/30 font-black`
                    : 'bg-white text-chocolate/75 border-chocolate/20 hover:bg-cream-100'
                }`}
              >
                <span>{d.emoji}</span>
                <span>{m}</span>
                <span className="text-[10px] opacity-75">({count})</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Songs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {currentList.map((song) => {
          const isSelected = selectedSong?.id === song.id;
          const isOwner = currentRole === song.ownerRole;
          const replies = songReplies[song.id] || [];
          const moodObj = MOOD_DETAILS[song.mood] || MOOD_DETAILS['Romantic'];

          return (
            <div
              key={song.id}
              className={`cute-card p-5 transition-all flex flex-col justify-between ${
                isSelected
                  ? 'border-rose-soft ring-2 ring-rose-soft/40 bg-white'
                  : 'hover:border-chocolate/40'
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <div className="flex items-center gap-1.5 mb-1.5 flex-wrap">
                      <span className={`badge-mood ${moodObj.badgeColor} text-[11px]`}>
                        <span>{moodObj.emoji}</span>
                        <span>{song.mood}</span>
                      </span>
                      <span className="text-[10px] text-chocolate/60 font-semibold">
                        • {moodObj.vibeTag}
                      </span>
                    </div>
                    <h4 className="text-lg font-black text-chocolate leading-tight">
                      {song.title}
                    </h4>
                    <p className="text-xs font-bold text-chocolate/70">{song.artist}</p>
                  </div>

                  {/* Song Controls: Play & Delete (Available for Her and Him) */}
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => setSelectedSong(song)}
                      className={`p-2 rounded-full border-2 border-chocolate transition-transform active:scale-95 ${
                        isSelected
                          ? 'bg-rose-soft text-white'
                          : 'bg-white hover:bg-cream-100 text-chocolate'
                      }`}
                      title="Play in Listen Together"
                    >
                      <Play size={14} className={isSelected ? 'fill-white' : ''} />
                    </button>

                    <button
                      onClick={() => {
                        if (
                          window.confirm(
                            `Are you sure you want to remove "${song.title}" from the playlist? 🎶\n\nIt will stay saved permanently unless you delete it.`
                          )
                        ) {
                          removeSong(song.id);
                          if (selectedSong?.id === song.id) {
                            setSelectedSong(null);
                          }
                        }
                      }}
                      className="p-2 rounded-full border-2 border-chocolate bg-white hover:bg-rose-soft/20 text-chocolate/80 hover:text-rose-deep transition-all active:scale-95"
                      title="Remove song from playlist"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>

                {/* Mood according to song note */}
                <div
                  className={`mt-2.5 p-2 rounded-xl text-[11px] leading-tight ${moodObj.bgColor} border ${moodObj.borderColor} text-chocolate/85`}
                >
                  <span className="font-black text-chocolate">{moodObj.emoji} Mood: </span>
                  <span>{moodObj.description}</span>
                </div>

                {song.message && (
                  <div className="bg-cream-50 p-2.5 rounded-xl border border-chocolate/10 my-2">
                    <p className="font-love-note text-base text-chocolate leading-tight">
                      “{song.message}”
                    </p>
                  </div>
                )}
              </div>

              {/* Bottom Card Footer: Added by, Replies, and Reply Action */}
              <div className="mt-3 pt-3 border-t border-chocolate/10">
                <div className="flex items-center justify-between text-[11px] text-chocolate/60 mb-2">
                  <span>
                    By {song.ownerRole === 'her' ? '🌸 Her' : '🌙 Him'} •{' '}
                    {new Date(song.createdAt).toLocaleDateString()}
                  </span>

                  <button
                    onClick={() => setReplyingSong(song)}
                    className="text-rose-deep hover:underline font-bold flex items-center gap-1"
                  >
                    <MessageCircle size={12} />
                    <span>Reply ({replies.length})</span>
                  </button>
                </div>

                {/* Recent Replies preview */}
                {replies.length > 0 && (
                  <div className="space-y-1">
                    {replies.slice(-2).map((r) => (
                      <div
                        key={r.id}
                        className="text-[11px] bg-white/80 px-2 py-1 rounded-lg border border-chocolate/10 flex items-center justify-between"
                      >
                        <span className="font-semibold text-chocolate">
                          {r.authorRole === 'her' ? '🌸' : '🌙'} {r.content}
                        </span>
                        <span className="text-[9px] text-chocolate/50">
                          {new Date(r.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {currentList.length === 0 && (
        <div className="cute-card p-12 text-center my-6">
          <PeachSparkle size={140} className="mx-auto mb-4" />
          <p className="text-base font-bold text-chocolate">No songs here yet!</p>
          <p className="text-xs text-chocolate/70 mt-1">
            Add up to 5 of your favorite songs to share with each other. 🎶
          </p>
        </div>
      )}

      {/* Super Simple Add Song Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="cute-card max-w-lg w-full p-6 bg-white relative animate-float max-h-[92vh] overflow-y-auto">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full border-2 border-chocolate hover:bg-cream-100 text-chocolate"
            >
              <X size={16} />
            </button>

            <div className="flex items-center gap-3 mb-3">
              <PeachSparkle size={60} />
              <div>
                <h3 className="text-xl font-extrabold text-chocolate">Add a Song 🎶</h3>
                <p className="text-xs text-chocolate/70">
                  Paste any YouTube song link — title & mood are detected automatically!
                </p>
              </div>
            </div>

            {/* Target Playlist Selector (Her vs Him) */}
            <div className="mb-3.5">
              <label className="block text-xs font-black text-chocolate mb-1">
                Save to Playlist:
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setTargetPlaylist('her')}
                  className={`py-2 px-3 rounded-xl border-2 text-xs font-black transition-all flex items-center justify-center gap-1.5 ${
                    targetPlaylist === 'her'
                      ? 'border-chocolate bg-blush-200 text-chocolate shadow-sm'
                      : 'border-chocolate/20 bg-cream-50 text-chocolate/60 hover:bg-cream-100'
                  }`}
                >
                  <span>🌸 Her Songs (Golu)</span>
                  <span className="text-[10px] font-bold opacity-80">({herSongs.length}/5)</span>
                </button>
                <button
                  type="button"
                  onClick={() => setTargetPlaylist('him')}
                  className={`py-2 px-3 rounded-xl border-2 text-xs font-black transition-all flex items-center justify-center gap-1.5 ${
                    targetPlaylist === 'him'
                      ? 'border-chocolate bg-lavender-soft text-chocolate shadow-sm'
                      : 'border-chocolate/20 bg-cream-50 text-chocolate/60 hover:bg-cream-100'
                  }`}
                >
                  <span>🌙 My Songs (Him)</span>
                  <span className="text-[10px] font-bold opacity-80">({hisSongs.length}/5)</span>
                </button>
              </div>
            </div>

            {formError && (
              <div className="mb-3 p-2.5 rounded-xl bg-rose-soft/20 border-2 border-rose-deep text-xs font-bold text-chocolate">
                {formError}
              </div>
            )}

            <form onSubmit={handleSaveSong} className="space-y-3.5">
              {/* Step 1: YouTube Song Link */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-black text-chocolate flex items-center gap-1">
                    <LinkIcon size={12} className="text-rose-deep" />
                    <span>YouTube Song Link *</span>
                  </label>
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={handlePasteFromClipboard}
                      className="px-2 py-0.5 rounded-lg bg-cream-100 hover:bg-cream-200 border border-chocolate/20 text-[10px] font-bold text-chocolate flex items-center gap-1"
                      title="Paste link from clipboard"
                    >
                      <Clipboard size={10} />
                      <span>Paste 📋</span>
                    </button>
                    <button
                      type="button"
                      onClick={handleAutoFillModalForm}
                      className="px-2 py-0.5 rounded-lg bg-butter-100 hover:bg-butter-200 border border-chocolate/20 text-[10px] font-bold text-chocolate flex items-center gap-1"
                      title="Auto-fill with a random romantic song"
                    >
                      <Dices size={10} />
                      <span>Auto-Fill 🎲</span>
                    </button>
                  </div>
                </div>

                <div className="relative">
                  <input
                    type="url"
                    required
                    placeholder="Paste YouTube song link (e.g. https://youtu.be/...)"
                    value={formUrl}
                    onChange={(e) => handleUrlChange(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border-2 border-chocolate bg-cream-50 text-sm focus:outline-none focus:ring-2 focus:ring-rose-soft pr-28"
                  />
                  {isDetecting && (
                    <div className="absolute right-3 top-2.5 flex items-center gap-1.5 text-xs text-rose-deep font-bold animate-pulse">
                      <Loader2 size={14} className="animate-spin" />
                      <span>Reading...</span>
                    </div>
                  )}
                </div>

                {detectSuccess && (
                  <p className="text-[11px] font-bold text-emerald-700 mt-1 flex items-center gap-1">
                    <Check size={12} />
                    <span>{detectSuccess}</span>
                  </p>
                )}
              </div>

              {/* Step 2: Auto-Detected Song Info & Preview */}
              {(formTitle || formUrl || detectedThumb) && (
                <div className="p-3 bg-cream-50/80 rounded-2xl border-2 border-chocolate/15">
                  <div className="flex items-center gap-3">
                    {detectedThumb ? (
                      <img
                        src={detectedThumb}
                        alt="Thumbnail"
                        className="w-16 h-12 object-cover rounded-xl border border-chocolate/20 shadow-xs shrink-0"
                      />
                    ) : (
                      <div className="w-16 h-12 rounded-xl bg-blush-100 border border-chocolate/20 flex items-center justify-center shrink-0">
                        <Music size={18} className="text-rose-deep" />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="text-[10px] text-chocolate/60 font-black uppercase tracking-wider">
                        Auto-Detected Song Name
                      </div>
                      <div className="font-black text-chocolate text-sm truncate">
                        {formTitle || 'Reading song title...'}
                      </div>
                      <div className="text-xs text-chocolate/70 font-semibold truncate">
                        by {formArtist || 'YouTube Artist'}
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setIsManualEditOpen(!isManualEditOpen)}
                      className="px-2 py-1 rounded-lg border border-chocolate/20 bg-white hover:bg-cream-100 text-[10px] font-bold text-chocolate flex items-center gap-1 shrink-0"
                    >
                      <Edit3 size={11} />
                      <span>{isManualEditOpen ? 'Done' : 'Edit'}</span>
                    </button>
                  </div>

                  {/* Manual Title / Artist Edit Inputs (Optional dropdown) */}
                  {isManualEditOpen && (
                    <div className="mt-3 pt-3 border-t border-chocolate/10 grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[11px] font-bold text-chocolate mb-0.5">
                          Song Title:
                        </label>
                        <input
                          type="text"
                          value={formTitle}
                          onChange={(e) => setFormTitle(e.target.value)}
                          className="w-full px-2.5 py-1.5 rounded-lg border border-chocolate/30 bg-white text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-chocolate mb-0.5">
                          Artist Name:
                        </label>
                        <input
                          type="text"
                          value={formArtist}
                          onChange={(e) => setFormArtist(e.target.value)}
                          className="w-full px-2.5 py-1.5 rounded-lg border border-chocolate/30 bg-white text-xs"
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Step 3: How Mood is According to Songs (Romantic, Lovely, Happy, Sad) */}
              <div className="p-3.5 rounded-2xl bg-gradient-to-br from-cream-50 to-blush-50/50 border-2 border-chocolate/20">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-black text-chocolate">
                      Song Mood (According to Song):
                    </span>
                    <span
                      className={`text-[11px] font-black px-2 py-0.5 rounded-full ${
                        MOOD_DETAILS[formMood]?.badgeColor || 'bg-blush-100'
                      }`}
                    >
                      {MOOD_DETAILS[formMood]?.emoji} {formMood}
                    </span>
                  </div>
                  <span className="text-[10px] text-chocolate/60 font-semibold">1-Tap Select</span>
                </div>

                {/* 4 Primary Mood Buttons: Romantic, Lovely, Happy, Sad */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-2.5">
                  {(['Romantic', 'Lovely', 'Happy', 'Sad'] as MoodType[]).map((m) => {
                    const details = MOOD_DETAILS[m];
                    const isSelected = formMood === m;
                    return (
                      <button
                        key={m}
                        type="button"
                        onClick={() => setFormMood(m)}
                        className={`py-2 px-2 rounded-xl border-2 text-xs font-black transition-all flex flex-col items-center justify-center gap-0.5 active:scale-95 ${
                          isSelected
                            ? `${details.badgeColor} border-chocolate shadow-sm scale-102 ring-2 ring-chocolate/20`
                            : 'border-chocolate/20 bg-white text-chocolate/75 hover:bg-cream-100'
                        }`}
                      >
                        <span className="text-lg">{details.emoji}</span>
                        <span>{m}</span>
                        <span className="text-[9px] font-medium opacity-80">
                          {details.vibeTag.split('&')[0].trim()}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Live Mood Description */}
                <div
                  className={`p-2.5 rounded-xl ${
                    MOOD_DETAILS[formMood]?.bgColor || 'bg-blush-50'
                  } border ${
                    MOOD_DETAILS[formMood]?.borderColor || 'border-rose-soft'
                  } text-xs transition-all`}
                >
                  <div className="flex items-center gap-1.5 font-black text-chocolate mb-0.5">
                    <span>{MOOD_DETAILS[formMood]?.emoji}</span>
                    <span>{formMood} Vibe:</span>
                    <span className="text-[11px] font-bold text-chocolate/70">
                      "{MOOD_DETAILS[formMood]?.vibeTag}"
                    </span>
                  </div>
                  <p className="text-[11px] text-chocolate/85 font-medium leading-snug">
                    {MOOD_DETAILS[formMood]?.description}
                  </p>
                </div>
              </div>

              {/* Step 4: Optional Love Note */}
              <div>
                <label className="block text-xs font-bold text-chocolate mb-1">
                  Sweet Note for Golu (Optional) 💌
                </label>
                <input
                  type="text"
                  placeholder="e.g. Every time I hear this, I think of our laughs... 💗"
                  value={formMessage}
                  onChange={(e) => setFormMessage(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border-2 border-chocolate bg-cream-50 text-xs focus:outline-none focus:ring-2 focus:ring-rose-soft"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-full border-2 border-chocolate text-xs font-bold hover:bg-cream-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isDetecting}
                  className="cute-btn px-6 py-2.5 bg-blush-200 text-chocolate text-xs font-extrabold shadow-sm active:scale-95 disabled:opacity-50 flex items-center gap-1.5"
                >
                  <Sparkles size={13} className="text-rose-deep" />
                  <span>Save Song 🎶💖</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Song Reply Modal */}
      {replyingSong && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="cute-card max-w-md w-full p-6 bg-white relative animate-float">
            <button
              onClick={() => setReplyingSong(null)}
              className="absolute top-4 right-4 p-1.5 rounded-full border-2 border-chocolate hover:bg-cream-100 text-chocolate"
            >
              <X size={16} />
            </button>

            <h3 className="text-lg font-black text-chocolate mb-1">
              Reply to “{replyingSong.title}” 💌
            </h3>
            <p className="text-xs text-chocolate/70 mb-4">
              Send a little love note to your partner about this song!
            </p>

            <div className="space-y-2 mb-4">
              <label className="text-xs font-bold text-chocolate">Quick Romantic Reactions:</label>
              <div className="grid grid-cols-1 gap-1.5">
                {[
                  'This song is so us. 💗',
                  'I thought about you when I heard this. 🌷',
                  'Adding this to our sweetest memories! ✨',
                  'Listening to this on repeat thinking of you. 🎧',
                ].map((reaction) => (
                  <button
                    key={reaction}
                    onClick={() => handleQuickReply(replyingSong, reaction)}
                    className="text-left px-3 py-2 rounded-xl border-2 border-chocolate/20 bg-cream-50 hover:bg-blush-100 hover:border-chocolate text-xs font-semibold text-chocolate transition-all"
                  >
                    {reaction}
                  </button>
                ))}
              </div>
            </div>

            <form onSubmit={handleCustomReplySubmit} className="space-y-3">
              <label className="text-xs font-bold text-chocolate">Or write your own note:</label>
              <input
                type="text"
                placeholder="Write something sweet..."
                value={customReply}
                onChange={(e) => setCustomReply(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border-2 border-chocolate bg-cream-50 text-sm focus:outline-none"
              />
              <div className="flex justify-end gap-2">
                <button
                  type="submit"
                  disabled={!customReply.trim()}
                  className="cute-btn px-5 py-2 bg-rose-soft text-white text-xs font-bold disabled:opacity-50"
                >
                  Send Reply 💌
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
