import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AppText } from '../Common/AppText';
import { useAudio } from '../../providers/AudioProvider';
import { useTheme } from '../../providers/ThemeProvider';
import { Ionicons } from '@expo/vector-icons';
import { makeMiniPlayerStyles } from './MiniPlayer.styles';
import { BackIcon, NextIcon, PauseIcon } from '../Icons';

export const MiniPlayer: React.FC = () => {
  const navigation = useNavigation<any>();
  const { currentTrack, isPlaying, togglePlayback, status, skipForward, skipBackward } = useAudio();
  const { colors } = useTheme();
  const styles = makeMiniPlayerStyles(colors);

  if (!currentTrack) return null;

  const progressPercent = status.duration > 0
    ? (status.currentTime / status.duration) * 100
    : 0;

  const handleOpenPlayer = () => {
    navigation.navigate('NowPlaying');
  };

  return (
    <View style={styles.container}>
      <View style={styles.progressBarContainer}>
        <View style={[styles.progressBar, { width: `${progressPercent}%` }]} />
        <View style={[styles.progressThumb, { left: `${progressPercent}%`, marginLeft: -6 }]} />
      </View>
      <View style={styles.content}>
        <TouchableOpacity
          style={styles.infoContainer}
          activeOpacity={0.8}
          onPress={handleOpenPlayer}
        >
          <Image
            source={{ uri: currentTrack.cover_url }}
            style={styles.image}
          />
          <View style={styles.info}>
            <AppText fontWeight="bold" style={styles.title} numberOfLines={1}>
              {currentTrack.title}
            </AppText>
            <AppText style={styles.artist} numberOfLines={1}>
              {currentTrack.artist}
            </AppText>
          </View>
        </TouchableOpacity>

        <View style={styles.controls}>
          <TouchableOpacity onPress={skipBackward} hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}>
            <BackIcon width={24} height={24} color={colors.primary} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.playButton}
            onPress={togglePlayback}
            hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
          >
            {isPlaying ? (
              <PauseIcon width={28} height={28} color={colors.primary} />
            ) : (
              <Ionicons name="play" size={28} color={colors.primary} />
            )}
          </TouchableOpacity>
          <TouchableOpacity onPress={skipForward} hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}>
            <NextIcon width={24} height={24} color={colors.primary} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};