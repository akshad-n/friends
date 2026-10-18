import { Song, SongReply } from '../types';

export interface CloudPlaylistData {
  herSongs: Song[];
  hisSongs: Song[];
  songReplies?: Record<string, SongReply[]>;
  activeSongId?: string;
  updatedAt: string;
}

// Dedicated couple KVdb bucket for real-time cross-device sync
const KVDB_BUCKET = 'UE2Ds7J1HcB1pVNFghxQuC';
const CLOUD_URL = `https://kvdb.io/${KVDB_BUCKET}/songs`;

// Default demo song IDs to distinguish them from user-added songs
export const DEFAULT_SONG_IDS = new Set(['s-her-1', 's-her-2', 's-him-1', 's-him-2']);

export const isDefaultDemoSong = (songOrId: Song | string): boolean => {
  const id = typeof songOrId === 'string' ? songOrId : songOrId.id;
  return DEFAULT_SONG_IDS.has(id);
};

/**
 * Fetch the latest couple songs from the shared cloud store
 */
export async function fetchCloudSongs(): Promise<CloudPlaylistData | null> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000);

    const res = await fetch(CLOUD_URL, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
      signal: controller.signal,
      cache: 'no-store',
    });

    clearTimeout(timeoutId);

    if (!res.ok) {
      return null;
    }

    const data = await res.json();
    if (data && (Array.isArray(data.herSongs) || Array.isArray(data.hisSongs))) {
      return {
        herSongs: Array.isArray(data.herSongs) ? data.herSongs : [],
        hisSongs: Array.isArray(data.hisSongs) ? data.hisSongs : [],
        songReplies: data.songReplies || {},
        activeSongId: data.activeSongId || undefined,
        updatedAt: data.updatedAt || new Date().toISOString(),
      };
    }
    return null;
  } catch (err) {
    // Graceful fallback to local cache
    return null;
  }
}

/**
 * Save updated couple songs to the shared cloud store so both devices stay synchronized
 */
export async function saveCloudSongs(
  herSongs: Song[],
  hisSongs: Song[],
  songReplies?: Record<string, SongReply[]>,
  activeSongId?: string
): Promise<boolean> {
  try {
    const payload: CloudPlaylistData = {
      herSongs,
      hisSongs,
      songReplies: songReplies || {},
      activeSongId,
      updatedAt: new Date().toISOString(),
    };

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000);

    const res = await fetch(CLOUD_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);
    return res.ok;
  } catch (err) {
    console.warn('Failed to save songs to cloud store:', err);
    return false;
  }
}
