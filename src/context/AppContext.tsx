import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  PartnerRole,
  PartnerProfile,
  CoupleSpace,
  Song,
  SongReply,
  DatePlan,
  RomanticResponse,
  Question,
  QuestionReply,
  MemoryItem,
  NotificationItem,
  MoodType,
  QuestionCategory,
} from '../types';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { fetchCloudSongs, saveCloudSongs, isDefaultDemoSong } from '../lib/cloudStore';

interface AppContextType {
  // Current user & couple
  currentRole: PartnerRole;
  setCurrentRole: (role: PartnerRole) => void;
  myProfile: PartnerProfile;
  partnerProfile: PartnerProfile;
  coupleSpace: CoupleSpace;
  updateCoupleSpace: (updates: Partial<CoupleSpace>) => void;

  // Music
  herSongs: Song[];
  hisSongs: Song[];
  allSongs: Song[];
  addSong: (
    song: Omit<Song, 'id' | 'createdAt' | 'coupleId' | 'ownerRole' | 'ownerName'>,
    targetRole?: PartnerRole
  ) => Promise<{ success: boolean; message: string; song?: Song }>;
  removeSong: (songId: string) => Promise<boolean>;
  songReplies: Record<string, SongReply[]>;
  addSongReply: (songId: string, content: string) => Promise<void>;

  // Romantic Questions
  dateResponse: RomanticResponse | null;
  submitDatePlan: (plan: DatePlan) => Promise<void>;
  lifeResponse: RomanticResponse | null;
  saveLifePromise: () => Promise<void>;
  memoriesResponse: RomanticResponse | null;
  submitMemoryIdeas: (ideas: string[]) => Promise<void>;
  resetQuestion: (type: 'date' | 'life' | 'memories' | 'all') => void;

  // Ask Me Anything
  questions: Question[];
  submitQuestion: (text: string, category: QuestionCategory, isAnonymous?: boolean) => Promise<void>;
  answerQuestion: (questionId: string, replyText: string) => Promise<void>;
  markAnswerRead: (questionId: string) => void;

  // Memories Garden
  memories: MemoryItem[];
  addMemory: (memory: Omit<MemoryItem, 'id' | 'createdAt' | 'coupleId' | 'authorRole' | 'authorName'>) => Promise<void>;
  deleteMemory: (memoryId: string) => Promise<boolean>;

  // Notifications
  notifications: NotificationItem[];
  unreadCount: number;
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;
  triggerNotification: (item: Omit<NotificationItem, 'id' | 'createdAt' | 'coupleId' | 'senderRole' | 'senderName' | 'isRead'>) => void;

  // Connectivity & Real-time Cloud Sync
  isOnlineDb: boolean;
  isCloudSynced: boolean;
  refreshCloudSongs: () => Promise<void>;
}

const AppContext = createContext<AppContextType | null>(null);

// Audio chime for real-time notifications
const playChime = () => {
  try {
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
    osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.15); // A5
    gain.gain.setValueAtTime(0.08, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.5);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.5);
  } catch {
    // Ignore audio permission errors
  }
};

// Initial Seed Data for immediate magical experience
const initialCouple: CoupleSpace = {
  id: 'couple-little-universe-001',
  code: 'LITTLE-UNIVERSE-2026',
  herName: 'Golu 🌸',
  himName: 'Her Loving Goma 🌙',
  anniversaryDate: '2023-10-18',
  createdAt: new Date().toISOString(),
};

const initialHerSongs: Song[] = [
  {
    id: 's-her-1',
    coupleId: initialCouple.id,
    ownerRole: 'her',
    ownerName: 'My Sweet Peach 🌸',
    title: 'Until I Found You',
    artist: 'Stephen Sanchez',
    url: 'https://www.youtube.com/watch?v=GxldQ9eX2wo',
    mood: 'Romantic',
    message: 'Every time I listen to this, I smile thinking of your warm hugs! 🌷',
    createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
  },
  {
    id: 's-her-2',
    coupleId: initialCouple.id,
    ownerRole: 'her',
    ownerName: 'My Sweet Peach 🌸',
    title: 'Golden Hour',
    artist: 'JVKE',
    url: 'https://www.youtube.com/watch?v=PEM0Vs8jf1w',
    mood: 'Our Special Song',
    message: 'Just like the sunset when we talk for hours... 🌅✨',
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
  },
];

const initialHisSongs: Song[] = [
  {
    id: 's-him-1',
    coupleId: initialCouple.id,
    ownerRole: 'him',
    ownerName: 'Her Loving Goma 🌙',
    title: 'Perfect',
    artist: 'Ed Sheeran',
    url: 'https://www.youtube.com/watch?v=2Vv-BfVoq4g',
    mood: 'Our Special Song',
    message: 'Because you are my favorite person in the entire world. 💗',
    createdAt: new Date(Date.now() - 86400000 * 4).toISOString(),
  },
  {
    id: 's-him-2',
    coupleId: initialCouple.id,
    ownerRole: 'him',
    ownerName: 'Her Loving Goma 🌙',
    title: 'Here With Me',
    artist: 'd4vd',
    url: 'https://www.youtube.com/watch?v=F0w3oM9R-wM',
    mood: 'Late Night Thoughts',
    message: 'Late nights missing you so much... always counting days till next hug. 🌙',
    createdAt: new Date(Date.now() - 86400000 * 1).toISOString(),
  },
];

const initialQuestions: Question[] = [
  {
    id: 'q-1',
    coupleId: initialCouple.id,
    askerRole: 'her',
    askerName: 'My Sweet Peach 🌸',
    questionText: 'What was the exact moment you realized you truly fell in love with me? 🥹💗',
    category: 'About Us',
    status: 'answered',
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    reply: {
      id: 'qr-1',
      questionId: 'q-1',
      replierRole: 'him',
      replierName: 'Her Loving Goma 🌙',
      replyText: 'It was that evening when you were laughing so wholeheartedly at my silly joke, your eyes turned into cute little crescents, and my heart just felt completely at home. I knew right there that I wanted to protect your smile forever. 🌷',
      answeredAt: new Date(Date.now() - 86400000 * 1).toISOString(),
      isRead: true,
    },
  },
  {
    id: 'q-2',
    coupleId: initialCouple.id,
    askerRole: 'her',
    askerName: 'My Sweet Peach 🌸',
    questionText: 'If we could travel to any secret peaceful place right now, where would you take us? ✈️🐱',
    category: 'Our Future',
    status: 'awaiting',
    createdAt: new Date(Date.now() - 3600000 * 4).toISOString(),
  },
];

const initialMemories: MemoryItem[] = [
  {
    id: 'm-1',
    coupleId: initialCouple.id,
    authorRole: 'him',
    authorName: 'Her Loving Goma 🌙',
    title: 'The Day Our Little Universe Began ✨',
    description: 'We started writing our story. Out of 8 billion people, finding you was the greatest blessing of my life.',
    category: 'milestone',
    date: '2023-10-18',
    icon: '🌟',
    createdAt: new Date(Date.now() - 86400000 * 10).toISOString(),
  },
];

const initialNotifications: NotificationItem[] = [
  {
    id: 'notif-1',
    coupleId: initialCouple.id,
    recipientRole: 'all',
    senderRole: 'him',
    senderName: 'Goma 🌙',
    title: 'Welcome to Our Little Universe! 🐱💗',
    message: 'A private world made just for the two of us. Explore our songs, love questions, and memory garden.',
    category: 'memory',
    targetSection: 'home',
    isRead: false,
    createdAt: new Date().toISOString(),
  },
];

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Current Partner Role: default 'her' so girlfriend sees the question/dates, but can switch instantly to 'him'
  const [currentRole, setCurrentRole] = useState<PartnerRole>('her');
  const [isCloudSynced, setIsCloudSynced] = useState<boolean>(false);
  const [coupleSpace, setCoupleSpace] = useState<CoupleSpace>(() => {
    const saved = localStorage.getItem('olu_couple');
    return saved ? JSON.parse(saved) : initialCouple;
  });

  const [herSongs, setHerSongs] = useState<Song[]>(() => {
    const saved = localStorage.getItem('olu_her_songs');
    if (saved !== null) {
      try {
        return JSON.parse(saved);
      } catch {
        return [];
      }
    }
    return initialHerSongs;
  });

  const [hisSongs, setHisSongs] = useState<Song[]>(() => {
    const saved = localStorage.getItem('olu_his_songs');
    if (saved !== null) {
      try {
        return JSON.parse(saved);
      } catch {
        return [];
      }
    }
    return initialHisSongs;
  });

  const [songReplies, setSongReplies] = useState<Record<string, SongReply[]>>(() => {
    const saved = localStorage.getItem('olu_song_replies');
    return saved ? JSON.parse(saved) : {
      's-her-1': [
        {
          id: 'sr-1',
          songId: 's-her-1',
          coupleId: initialCouple.id,
          authorRole: 'him',
          authorName: 'Her Loving Goma 🌙',
          content: 'This song is so us. 💗 Listening to it right now!',
          createdAt: new Date().toISOString(),
        }
      ]
    };
  });

  const [dateResponse, setDateResponse] = useState<RomanticResponse | null>(() => {
    const saved = localStorage.getItem('olu_date_resp');
    return saved ? JSON.parse(saved) : null;
  });

  const [lifeResponse, setLifeResponse] = useState<RomanticResponse | null>(() => {
    const saved = localStorage.getItem('olu_life_resp');
    return saved ? JSON.parse(saved) : null;
  });

  const [memoriesResponse, setMemoriesResponse] = useState<RomanticResponse | null>(() => {
    const saved = localStorage.getItem('olu_memories_resp');
    return saved ? JSON.parse(saved) : null;
  });

  const [questions, setQuestions] = useState<Question[]>(() => {
    const saved = localStorage.getItem('olu_questions');
    return saved ? JSON.parse(saved) : initialQuestions;
  });

  const [memories, setMemories] = useState<MemoryItem[]>(() => {
    const saved = localStorage.getItem('olu_memories');
    return saved ? JSON.parse(saved) : initialMemories;
  });

  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    const saved = localStorage.getItem('olu_notifications');
    return saved ? JSON.parse(saved) : initialNotifications;
  });

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('olu_couple', JSON.stringify(coupleSpace));
  }, [coupleSpace]);

  useEffect(() => {
    localStorage.setItem('olu_her_songs', JSON.stringify(herSongs));
  }, [herSongs]);

  useEffect(() => {
    localStorage.setItem('olu_his_songs', JSON.stringify(hisSongs));
  }, [hisSongs]);

  useEffect(() => {
    localStorage.setItem('olu_song_replies', JSON.stringify(songReplies));
  }, [songReplies]);

  useEffect(() => {
    if (dateResponse) localStorage.setItem('olu_date_resp', JSON.stringify(dateResponse));
  }, [dateResponse]);

  useEffect(() => {
    if (lifeResponse) localStorage.setItem('olu_life_resp', JSON.stringify(lifeResponse));
  }, [lifeResponse]);

  useEffect(() => {
    if (memoriesResponse) localStorage.setItem('olu_memories_resp', JSON.stringify(memoriesResponse));
  }, [memoriesResponse]);

  useEffect(() => {
    localStorage.setItem('olu_questions', JSON.stringify(questions));
  }, [questions]);

  useEffect(() => {
    localStorage.setItem('olu_memories', JSON.stringify(memories));
  }, [memories]);

  useEffect(() => {
    localStorage.setItem('olu_notifications', JSON.stringify(notifications));
  }, [notifications]);

  // Profiles
  const myProfile: PartnerProfile = {
    id: currentRole === 'her' ? 'user-her' : 'user-him',
    role: currentRole,
    name: currentRole === 'her' ? coupleSpace.herName : coupleSpace.himName,
    nickname: currentRole === 'her' ? 'Golu 🌸' : 'Goma 🌙',
    avatar: currentRole === 'her' ? 'peach-cat' : 'goma-cat',
  };

  const partnerProfile: PartnerProfile = {
    id: currentRole === 'her' ? 'user-him' : 'user-her',
    role: currentRole === 'her' ? 'him' : 'her',
    name: currentRole === 'her' ? coupleSpace.himName : coupleSpace.herName,
    nickname: currentRole === 'her' ? 'Goma 🌙' : 'Golu 🌸',
    avatar: currentRole === 'her' ? 'goma-cat' : 'peach-cat',
  };

  const allSongs = [...herSongs, ...hisSongs];

  // Helper to push notification
  const triggerNotification = (item: Omit<NotificationItem, 'id' | 'createdAt' | 'coupleId' | 'senderRole' | 'senderName' | 'isRead'>) => {
    const newNotif: NotificationItem = {
      ...item,
      id: `notif-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      coupleId: coupleSpace.id,
      senderRole: currentRole,
      senderName: myProfile.name,
      isRead: false,
      createdAt: new Date().toISOString(),
    };

    setNotifications((prev) => [newNotif, ...prev]);
    playChime();

    // If browser notifications permitted
    if ('Notification' in window && Notification.permission === 'granted') {
      try {
        new Notification(item.title, {
          body: item.message,
          icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">🐱💗</text></svg>',
        });
      } catch {
        // Ignore notification errors
      }
    }
  };

  // Cloud sync helper: fetches latest songs and replies from the shared cloud store
  const refreshCloudSongs = async () => {
    try {
      const cloudData = await fetchCloudSongs();
      if (cloudData) {
        if (Array.isArray(cloudData.herSongs)) {
          setHerSongs(cloudData.herSongs);
          try {
            localStorage.setItem('olu_her_songs', JSON.stringify(cloudData.herSongs));
          } catch {
            // Ignore storage errors
          }
        }
        if (Array.isArray(cloudData.hisSongs)) {
          setHisSongs(cloudData.hisSongs);
          try {
            localStorage.setItem('olu_his_songs', JSON.stringify(cloudData.hisSongs));
          } catch {
            // Ignore storage errors
          }
        }
        if (cloudData.songReplies && typeof cloudData.songReplies === 'object') {
          setSongReplies(cloudData.songReplies);
          try {
            localStorage.setItem('olu_song_replies', JSON.stringify(cloudData.songReplies));
          } catch {
            // Ignore storage errors
          }
        }
        setIsCloudSynced(true);
      }
    } catch (err) {
      console.warn('Failed to refresh cloud songs:', err);
    }
  };

  // Run cloud sync on mount, tab focus, visibility change, and periodic heartbeat
  useEffect(() => {
    refreshCloudSongs();

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        refreshCloudSongs();
      }
    };

    window.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('focus', refreshCloudSongs);

    // Sync every 25 seconds so when partner adds a song, it appears live
    const interval = setInterval(refreshCloudSongs, 25000);

    return () => {
      window.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('focus', refreshCloudSongs);
      clearInterval(interval);
    };
  }, []);

  // 1. ADD SONG (Enforces 5-song limit, cleans default demo songs, and persists to localStorage and Cloud Store)
  const addSong = async (
    songData: Omit<Song, 'id' | 'createdAt' | 'coupleId' | 'ownerRole' | 'ownerName'>,
    targetRole?: PartnerRole
  ): Promise<{ success: boolean; message: string; song?: Song }> => {
    const roleToUse = targetRole || currentRole;
    const targetList = roleToUse === 'her' ? herSongs : hisSongs;

    // Default demo songs do not count against the limit and are cleared on first real song addition
    const nonDefaultSongs = targetList.filter((s) => !isDefaultDemoSong(s));

    if (nonDefaultSongs.length >= 5) {
      return {
        success: false,
        message: 'Your playlist already has 5 songs! 🐱 Please remove or replace one before adding a new song.',
      };
    }

    const newSong: Song = {
      ...songData,
      id: `s-${roleToUse}-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      coupleId: coupleSpace.id,
      ownerRole: roleToUse,
      ownerName: roleToUse === 'her' ? coupleSpace.herName : coupleSpace.himName,
      createdAt: new Date().toISOString(),
    };

    let updatedHer = herSongs;
    let updatedHis = hisSongs;

    if (roleToUse === 'her') {
      // Remove any default demo songs so only real chosen songs remain
      const cleaned = herSongs.filter((s) => !isDefaultDemoSong(s) && s.id !== newSong.id);
      updatedHer = [newSong, ...cleaned].slice(0, 5);
      setHerSongs(updatedHer);
      try {
        localStorage.setItem('olu_her_songs', JSON.stringify(updatedHer));
      } catch (err) {
        console.error('Failed to save her songs to localStorage:', err);
      }
    } else {
      // Remove any default demo songs so only real chosen songs remain
      const cleaned = hisSongs.filter((s) => !isDefaultDemoSong(s) && s.id !== newSong.id);
      updatedHis = [newSong, ...cleaned].slice(0, 5);
      setHisSongs(updatedHis);
      try {
        localStorage.setItem('olu_his_songs', JSON.stringify(updatedHis));
      } catch (err) {
        console.error('Failed to save his songs to localStorage:', err);
      }
    }

    // Persist immediately to cloud store so partner's phone receives the update
    saveCloudSongs(updatedHer, updatedHis, songReplies, newSong.id).catch((err) => {
      console.warn('Background cloud save warning:', err);
    });

    // Trigger notification for partner
    triggerNotification({
      recipientRole: roleToUse === 'her' ? 'him' : 'her',
      title: roleToUse === 'her' ? '🐱💗 She added a new song!' : '🎧 Your favorite person shared a song!',
      message: `"${newSong.title}" by ${newSong.artist} (${newSong.mood})`,
      category: 'song',
      targetSection: 'music',
    });

    return { success: true, message: 'Song added to your playlist! 🎶', song: newSong };
  };

  // 2. REMOVE SONG (Persists immediately to localStorage and Cloud Store)
  const removeSong = async (songId: string): Promise<boolean> => {
    const updatedHer = herSongs.filter((s) => s.id !== songId);
    const updatedHis = hisSongs.filter((s) => s.id !== songId);

    setHerSongs(updatedHer);
    setHisSongs(updatedHis);

    try {
      localStorage.setItem('olu_her_songs', JSON.stringify(updatedHer));
      localStorage.setItem('olu_his_songs', JSON.stringify(updatedHis));
    } catch (err) {
      console.error('Failed to remove song from localStorage:', err);
    }

    // Sync removal to cloud store so partner's device also removes it
    saveCloudSongs(updatedHer, updatedHis, songReplies).catch((err) => {
      console.warn('Background cloud save warning:', err);
    });

    return true;
  };

  // 3. SONG REPLIES (Persists locally and to Cloud Store)
  const addSongReply = async (songId: string, content: string) => {
    const newReply: SongReply = {
      id: `sr-${Date.now()}`,
      songId,
      coupleId: coupleSpace.id,
      authorRole: currentRole,
      authorName: myProfile.name,
      content,
      createdAt: new Date().toISOString(),
    };

    const updatedReplies = {
      ...songReplies,
      [songId]: [...(songReplies[songId] || []), newReply],
    };

    setSongReplies(updatedReplies);
    try {
      localStorage.setItem('olu_song_replies', JSON.stringify(updatedReplies));
    } catch (err) {
      console.error('Failed to save song replies to localStorage:', err);
    }

    // Sync replies to cloud
    saveCloudSongs(herSongs, hisSongs, updatedReplies).catch((err) => {
      console.warn('Background cloud save warning:', err);
    });

    const targetSong = allSongs.find((s) => s.id === songId);
    triggerNotification({
      recipientRole: currentRole === 'her' ? 'him' : 'her',
      title: '💌 New reply on a shared song!',
      message: `${myProfile.nickname}: "${content}" on "${targetSong?.title || 'Song'}"`,
      category: 'reply',
      targetSection: 'music',
    });
  };

  // 4. DATE PLAN SUBMISSION
  const submitDatePlan = async (plan: DatePlan) => {
    const resp: RomanticResponse = {
      id: `resp-date-${Date.now()}`,
      coupleId: coupleSpace.id,
      partnerRole: currentRole,
      questionId: 'date',
      responseValue: 'YES',
      datePlan: plan,
      createdAt: new Date().toISOString(),
    };
    setDateResponse(resp);

    // Add to memory garden
    const dateMemory: MemoryItem = {
      id: `mem-date-${Date.now()}`,
      coupleId: coupleSpace.id,
      authorRole: currentRole,
      authorName: myProfile.name,
      title: `Our Upcoming Date at ${plan.place} 🌹`,
      description: `She said YES! Date: ${plan.preferredDate} at ${plan.preferredTime}. Food: ${plan.food}. Note: "${plan.note || 'None'}"`,
      category: 'date',
      date: plan.preferredDate || new Date().toISOString().split('T')[0],
      icon: '🌹',
      createdAt: new Date().toISOString(),
    };
    setMemories((prev) => [dateMemory, ...prev]);

    triggerNotification({
      recipientRole: 'him',
      title: '🌹 IT\'S A DATE! She said YES! 💗',
      message: `Destination: ${plan.place} | Food: ${plan.food}`,
      category: 'date',
      targetSection: 'memory-garden',
    });
  };

  // 5. LIFE PROMISE SAVE
  const saveLifePromise = async () => {
    const resp: RomanticResponse = {
      id: `resp-life-${Date.now()}`,
      coupleId: coupleSpace.id,
      partnerRole: currentRole,
      questionId: 'precious_life',
      responseValue: 'YES',
      promiseSaved: true,
      createdAt: new Date().toISOString(),
    };
    setLifeResponse(resp);

    // Add to memories
    const promiseMemory: MemoryItem = {
      id: `mem-life-${Date.now()}`,
      coupleId: coupleSpace.id,
      authorRole: currentRole,
      authorName: myProfile.name,
      title: 'Our Precious Life Promise 🌙💗',
      description: '“I want to keep choosing you, supporting you, listening to you, and growing with you through every single season of life.”',
      category: 'promise',
      date: new Date().toISOString().split('T')[0],
      icon: '🌙',
      createdAt: new Date().toISOString(),
    };
    setMemories((prev) => [promiseMemory, ...prev]);

    triggerNotification({
      recipientRole: 'all',
      title: '✨ A Precious Life Promise Sealed 💖',
      message: 'She said "Yes, I would" to sharing our lives together beneath the stars.',
      category: 'promise',
      targetSection: 'memory-garden',
    });
  };

  // 6. MEMORY IDEAS SUBMISSION
  const submitMemoryIdeas = async (ideas: string[]) => {
    const resp: RomanticResponse = {
      id: `resp-mem-${Date.now()}`,
      coupleId: coupleSpace.id,
      partnerRole: currentRole,
      questionId: 'memories',
      responseValue: 'YES',
      memoryIdeas: ideas,
      createdAt: new Date().toISOString(),
    };
    setMemoriesResponse(resp);

    const memIdea: MemoryItem = {
      id: `mem-ideas-${Date.now()}`,
      coupleId: coupleSpace.id,
      authorRole: currentRole,
      authorName: myProfile.name,
      title: 'Our Bucket List of Memories 🌻',
      description: `Chal na jau mg date var ❤️😂🌷 | Ideas selected: ${ideas.slice(0, 3).join(', ')}${ideas.length > 3 ? ` and ${ideas.length - 3} more` : ''}`,
      category: 'custom',
      date: new Date().toISOString().split('T')[0],
      icon: '🌻',
      createdAt: new Date().toISOString(),
    };
    setMemories((prev) => [memIdea, ...prev]);

    triggerNotification({
      recipientRole: 'him',
      title: '🌻 Chal na jau mg date var! New memory ideas added! ❤️😂',
      message: `${ideas.length} lovely adventure ideas chosen for us to make together!`,
      category: 'memory',
      targetSection: 'memory-garden',
    });
  };

  const resetQuestion = (type: 'date' | 'life' | 'memories' | 'all') => {
    if (type === 'date' || type === 'all') {
      setDateResponse(null);
      localStorage.removeItem('olu_date_resp');
    }
    if (type === 'life' || type === 'all') {
      setLifeResponse(null);
      localStorage.removeItem('olu_life_resp');
    }
    if (type === 'memories' || type === 'all') {
      setMemoriesResponse(null);
      localStorage.removeItem('olu_memories_resp');
    }
  };

  // 7. ASK ME ANYTHING
  const submitQuestion = async (text: string, category: QuestionCategory, isAnonymous = false) => {
    const newQ: Question = {
      id: `q-${Date.now()}`,
      coupleId: coupleSpace.id,
      askerRole: currentRole,
      askerName: isAnonymous ? 'Your Shy Secret Cat 🐱' : myProfile.name,
      questionText: text,
      category,
      isAnonymous,
      status: 'awaiting',
      createdAt: new Date().toISOString(),
    };
    setQuestions((prev) => [newQ, ...prev]);

    triggerNotification({
      recipientRole: currentRole === 'her' ? 'him' : 'her',
      title: '💌 She asked you a new question!',
      message: `"${text.substring(0, 70)}${text.length > 70 ? '...' : ''}" (${category})`,
      category: 'question',
      targetSection: 'ama',
    });
  };

  const answerQuestion = async (questionId: string, replyText: string) => {
    const newReply: QuestionReply = {
      id: `qr-${Date.now()}`,
      questionId,
      replierRole: currentRole,
      replierName: myProfile.name,
      replyText,
      answeredAt: new Date().toISOString(),
      isRead: false,
    };

    setQuestions((prev) =>
      prev.map((q) => (q.id === questionId ? { ...q, status: 'answered', reply: newReply } : q))
    );

    triggerNotification({
      recipientRole: 'her',
      title: '🐱 Your answer is ready for you, cutie!',
      message: `He wrote an honest answer to your question. Click to read 💌`,
      category: 'answer',
      targetSection: 'ama',
    });
  };

  const markAnswerRead = (questionId: string) => {
    setQuestions((prev) =>
      prev.map((q) =>
        q.id === questionId && q.reply ? { ...q, reply: { ...q.reply, isRead: true } } : q
      )
    );
  };

  // 8. ADD & DELETE MEMORY
  const addMemory = async (
    item: Omit<MemoryItem, 'id' | 'createdAt' | 'coupleId' | 'authorRole' | 'authorName'>
  ) => {
    const newMemory: MemoryItem = {
      ...item,
      id: `mem-${Date.now()}`,
      coupleId: coupleSpace.id,
      authorRole: currentRole,
      authorName: myProfile.name,
      createdAt: new Date().toISOString(),
    };
    setMemories((prev) => [newMemory, ...prev]);

    triggerNotification({
      recipientRole: currentRole === 'her' ? 'him' : 'her',
      title: '🌱 A new flower planted in Our Memory Garden!',
      message: `${myProfile.name} saved a new memory: "${newMemory.title}"`,
      category: 'memory',
      targetSection: 'memory-garden',
    });
  };

  const deleteMemory = async (memoryId: string): Promise<boolean> => {
    setMemories((prev) => prev.filter((m) => m.id !== memoryId));
    return true;
  };

  // 9. NOTIFICATIONS MANAGEMENT
  const markNotificationAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
  };

  const markAllNotificationsAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  const updateCoupleSpace = (updates: Partial<CoupleSpace>) => {
    setCoupleSpace((prev) => ({ ...prev, ...updates }));
  };

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <AppContext.Provider
      value={{
        currentRole,
        setCurrentRole,
        myProfile,
        partnerProfile,
        coupleSpace,
        updateCoupleSpace,
        herSongs,
        hisSongs,
        allSongs,
        addSong,
        removeSong,
        songReplies,
        addSongReply,
        dateResponse,
        submitDatePlan,
        lifeResponse,
        saveLifePromise,
        memoriesResponse,
        submitMemoryIdeas,
        resetQuestion,
        questions,
        submitQuestion,
        answerQuestion,
        markAnswerRead,
        memories,
        addMemory,
        deleteMemory,
        notifications,
        unreadCount,
        markNotificationAsRead,
        markAllNotificationsAsRead,
        triggerNotification,
        isOnlineDb: isSupabaseConfigured,
        isCloudSynced,
        refreshCloudSongs,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
