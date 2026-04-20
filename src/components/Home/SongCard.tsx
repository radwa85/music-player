import React from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { AppText } from '../Common/AppText';
import { Track } from '../../types/track';
import { useAudio } from '../../providers/AudioProvider';
import { styles } from './SongCard.styles';
import { PauseIcon } from '../Icons';

interface SongCardProps {
  track: Track;
}

export const SongCard: React.FC<SongCardProps> = ({ track }) => {
  const { playTrack, currentTrack, isPlaying } = useAudio();
  const isActive = currentTrack?.id === track.id;

  return (
    <TouchableOpacity 
      style={styles.container} 
      onPress={() => playTrack(track)}
      activeOpacity={0.8}
    >
      <View style={styles.imageContainer}>
        <Image 
          source={{ uri: track.cover_url }} 
          style={styles.image} 
          resizeMode="cover"
        />
        {isActive && isPlaying && (
          <View style={styles.playingOverlay}>
            <PauseIcon width={32} height={32} color="white" />
          </View>
        )}
      </View>
      <View style={styles.infoContainer}>
        <AppText fontWeight="bold" style={styles.title} numberOfLines={1}>{track.title}</AppText>
        <AppText style={styles.artist} numberOfLines={1}>{track.artist}</AppText>
      </View>
    </TouchableOpacity>
  );
};
