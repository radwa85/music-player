import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { useAudioPlayer, useAudioPlayerStatus, setAudioModeAsync, setIsAudioActiveAsync } from 'expo-audio';
import { useSelector } from 'react-redux';
import { Track } from '../types/track';
import { RootState } from '../redux/store';
import { playbackService } from '../services/playbackService';

type RepeatMode = 'none' | 'all' | 'one';

interface AudioContextType {
  currentTrack: Track | null;
  isPlaying: boolean;
  status: any;
  playlist: Track[];
  recentlyPlayed: Track[];
  isShuffle: boolean;
  repeatMode: RepeatMode;
  trackDuration: number; // Actual duration in seconds from audio player
  playTrack: (track: Track, playlist?: Track[]) => Promise<void>;
  togglePlayback: () => void;
  skipForward: () => void;
  skipBackward: () => void;
  toggleShuffle: () => void;
  toggleRepeat: () => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { token } = useSelector((state: RootState) => state.auth);
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [playlist, setPlaylist] = useState<Track[]>([]);
  const [recentlyPlayed, setRecentlyPlayed] = useState<Track[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(-1);
  const [isShuffle, setIsShuffle] = useState(false);
  const [repeatMode, setRepeatMode] = useState<RepeatMode>('none');
  const [shouldAutoPlay, setShouldAutoPlay] = useState(false);
  const lastDidJustFinish = React.useRef(false);
  
  const audioSource = useMemo(() => {
    if (!currentTrack || !token) return null;
    return playbackService.getAudioSource(currentTrack, token);
  }, [currentTrack, token]);

  const player = useAudioPlayer(audioSource, { 
    updateInterval: 100 
  });
  
  const status = useAudioPlayerStatus(player);

  const playTrack = useCallback(async (track: Track, newPlaylist?: Track[]) => {
    try {
      if (newPlaylist) {
        setPlaylist(newPlaylist);
        const index = newPlaylist.findIndex(t => t.id === track.id);
        setCurrentIndex(index);
      } else if (playlist.length > 0) {
        const index = playlist.findIndex(t => t.id === track.id);
        setCurrentIndex(index);
      }

      if (currentTrack?.id === track.id) {
        player.seekTo(0);
        player.play();
        return;
      }
      
      setCurrentTrack(track);
      setRecentlyPlayed((current) => {
        const next = [track, ...current.filter((item) => item.id !== track.id)];
        return next.slice(0, 8);
      });
      setShouldAutoPlay(true);
      await setIsAudioActiveAsync(true);
      
    } catch (error) {
      console.error('Error playing track', error);
    }
  }, [currentTrack, player, playlist]);

  const skipForward = useCallback(() => {
    if (playlist.length === 0) return;

    let nextIndex = currentIndex + 1;
    if (nextIndex >= playlist.length) {
      if (repeatMode === 'all') {
        nextIndex = 0;
      } else {
        return;
      }
    }
    
    playTrack(playlist[nextIndex]);
  }, [playlist, currentIndex, repeatMode, playTrack]);

  const skipBackward = useCallback(() => {
    if (playlist.length === 0) return;

    if (status.currentTime > 3) {
      player.seekTo(0);
      return;
    }

    let prevIndex = currentIndex - 1;
    if (prevIndex < 0) {
      if (repeatMode === 'all') {
        prevIndex = playlist.length - 1;
      } else {
        return;
      }
    }
    playTrack(playlist[prevIndex]);
  }, [playlist, currentIndex, status.currentTime, playTrack, player, repeatMode]);

  const toggleShuffle = useCallback(() => {
    setIsShuffle(prev => !prev);
  }, []);

  const toggleRepeat = useCallback(() => {
    setRepeatMode(prev => {
      if (prev === 'none') return 'one';
      if (prev === 'one') return 'all';
      return 'none';
    });
  }, []);

  // Handle track ending
  useEffect(() => {
    if (status.didJustFinish && !lastDidJustFinish.current) {
      if (repeatMode === 'one') {
        player.seekTo(0);
        player.play();
      } else if (isShuffle) {
        if (playlist.length === 0) return;

        let nextIndex = Math.floor(Math.random() * playlist.length);
        if (playlist.length > 1 && nextIndex === currentIndex) {
          nextIndex = (nextIndex + 1) % playlist.length;
        }

        playTrack(playlist[nextIndex]);
      } else if (repeatMode === 'all' || currentIndex < playlist.length - 1) {
        skipForward();
      }
    }
    lastDidJustFinish.current = status.didJustFinish;
  }, [status.didJustFinish, repeatMode, currentIndex, playlist.length, isShuffle, skipForward, player, playTrack]);

  useEffect(() => {
    if (status.isLoaded && shouldAutoPlay) {
      player.play();
      setShouldAutoPlay(false);
    }
  }, [status.isLoaded, shouldAutoPlay, player]);

  useEffect(() => {
    const setupAudio = async () => {
      try {
        await setAudioModeAsync({
          playsInSilentMode: true,
          shouldPlayInBackground: true,
          allowsRecording: false,
        });
        await setIsAudioActiveAsync(true);
      } catch (err) {
        console.warn('Failed to configure audio mode', err);
      }
    };
    setupAudio();
  }, []);

  const togglePlayback = useCallback(() => {
    try {
      if (player.playing) {
        player.pause();
      } else {
        player.play();
      }
    } catch (e) {
      console.error('Error toggling playback', e);
    }
  }, [player]);

  return (
    <AudioContext.Provider
      value={{
        currentTrack,
        isPlaying: status.playing,
        status,
        playlist,
        recentlyPlayed,
        isShuffle,
        repeatMode,
        trackDuration: status?.duration ?? currentTrack?.duration ?? 0,
        playTrack,
        togglePlayback,
        skipForward,
        skipBackward,
        toggleShuffle,
        toggleRepeat,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (!context) throw new Error('useAudio must be used within an AudioProvider');
  return context;
};
