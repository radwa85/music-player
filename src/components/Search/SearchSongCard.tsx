import React from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { AppText } from '../Common/AppText';
import { Track } from '../../types/track';
import { useAudio } from '../../providers/AudioProvider';
import { PauseIcon } from '../Icons';
import { useTheme } from '../../providers/ThemeProvider';
import { makeSearchSongCardStyles } from './SearchSongCard.styles';

interface SearchSongCardProps {
  track: Track;
  playlist?: Track[];
}

export const SearchSongCard: React.FC<SearchSongCardProps> = ({ track, playlist }) => {
  const { playTrack, currentTrack, isPlaying } = useAudio();
  const isActive = currentTrack?.id === track.id;
  const { colors } = useTheme();
  const styles = makeSearchSongCardStyles(colors);

  return (
    <TouchableOpacity 
      style={styles.container} 
      onPress={() => playTrack(track, playlist)}
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
