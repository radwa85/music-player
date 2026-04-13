import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { useAudioPlayer, useAudioPlayerStatus, setAudioModeAsync, setIsAudioActiveAsync } from 'expo-audio';
import { Track } from '../types/track';
import { playbackService } from '../services/playbackService';

interface AudioContextType {
  currentTrack: Track | null;
  isPlaying: boolean;
  status: any;
  playTrack: (track: Track) => Promise<void>;
  togglePlayback: () => void;
  skipForward: () => void;
  skipBackward: () => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [shouldAutoPlay, setShouldAutoPlay] = useState(false);
  
  const audioSource = useMemo(() => {
    if (!currentTrack) return null;
    return playbackService.getAudioSource(currentTrack);
  }, [currentTrack]);

  const player = useAudioPlayer(audioSource, { 
    updateInterval: 100 
  });
  
  const status = useAudioPlayerStatus(player);

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

  const playTrack = useCallback(async (track: Track) => {
    try {
      if (currentTrack?.id === track.id) {
        if (status.playing) {
          player.pause();
        } else {
          player.play();
        }
        return;
      }
      
      setCurrentTrack(track);
      setShouldAutoPlay(true);
      await setIsAudioActiveAsync(true);
      
    } catch (error) {
      console.error('Error playing track', error);
    }
  }, [currentTrack, player, status.playing]);

  const togglePlayback = useCallback(() => {
    try {
      if (status.playing) {
        player.pause();
      } else {
        player.play();
      }
    } catch (e) {
      console.error('Error toggling playback', e);
    }
  }, [player, status.playing]);

  const skipForward = useCallback(() => {}, []);
  const skipBackward = useCallback(() => {}, []);
  return (
    <AudioContext.Provider
      value={{
        currentTrack,
        isPlaying: status.playing,
        status,
        playTrack,
        togglePlayback,
        skipForward,
        skipBackward,
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
