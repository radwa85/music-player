import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { AppText } from './AppText';
import { notificationService } from '../../services/notificationService';
import { useAudio } from '../../providers/AudioProvider';
import { Track } from '../../types/track';
import { useTheme } from '../../providers/ThemeProvider';

/**
 * NowPlayingBanner
 * 
 * A slide-down banner that appears at the top of the screen whenever a new song
 * starts playing. Auto-dismisses after 3 seconds, or can be tapped to navigate
 * to the NowPlaying screen.
 */
export const NowPlayingBanner: React.FC = () => {
  const { colors } = useTheme();
  const navigation = useNavigation<any>();
  const { togglePlayback, isPlaying } = useAudio();

  const [bannerTrack, setBannerTrack] = useState<Track | null>(null);
  const [bannerVisible, setBannerVisible] = useState(false);
  const translateY = useRef(new Animated.Value(-120)).current;
  const dismissTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Subscribe to notification service
  useEffect(() => {
    const unsub = notificationService.subscribe((track, playing) => {
      if (!track) return;
      setBannerTrack(track);
      showBanner();
    });
    return unsub;
  }, []);

  const showBanner = () => {
    if (dismissTimer.current) clearTimeout(dismissTimer.current);
    setBannerVisible(true);

    Animated.spring(translateY, {
      toValue: 0,
      tension: 80,
      friction: 10,
      useNativeDriver: true,
    }).start();

    dismissTimer.current = setTimeout(() => {
      hideBanner();
    }, 3500);
  };

  const hideBanner = () => {
    Animated.timing(translateY, {
      toValue: -120,
      duration: 280,
      useNativeDriver: true,
    }).start(() => setBannerVisible(false));
  };

  if (!bannerVisible || !bannerTrack) return null;

  return (
    <Animated.View
      style={[
        styles.banner,
        {
          backgroundColor: colors.cardBg,
          borderColor: colors.borderColor,
          transform: [{ translateY }],
        },
      ]}
    >
      <TouchableOpacity
        style={styles.row}
        activeOpacity={0.88}
        onPress={() => {
          hideBanner();
          navigation.navigate('NowPlaying');
        }}
      >
        {/* Album Art */}
        <Image
          source={{ uri: bannerTrack.cover_url }}
          style={styles.art}
        />

        {/* Track Info */}
        <View style={styles.info}>
          <AppText style={[styles.label, { color: colors.accent }]}>
            ♪ Now Playing
          </AppText>
          <AppText fontWeight="bold" style={[styles.title, { color: colors.primaryText }]} numberOfLines={1}>
            {bannerTrack.title}
          </AppText>
          <AppText style={[styles.artist, { color: colors.secondaryText }]} numberOfLines={1}>
            {bannerTrack.artist}
          </AppText>
        </View>

        {/* Play/Pause */}
        <TouchableOpacity
          onPress={togglePlayback}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          style={styles.playBtn}
        >
          <Ionicons
            name={isPlaying ? 'pause-circle' : 'play-circle'}
            size={36}
            color={colors.accent}
          />
        </TouchableOpacity>

        {/* Dismiss */}
        <TouchableOpacity
          onPress={hideBanner}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          style={styles.closeBtn}
        >
          <Ionicons name="close" size={18} color={colors.secondaryText} />
        </TouchableOpacity>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  banner: {
    position: 'absolute',
    top: 50,
    left: 12,
    right: 12,
    borderRadius: 16,
    borderWidth: 1,
    zIndex: 9999,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.18,
    shadowRadius: 12,
    elevation: 12,
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    gap: 12,
  },
  art: {
    width: 52,
    height: 52,
    borderRadius: 10,
  },
  info: {
    flex: 1,
    gap: 1,
  },
  label: {
    fontSize: 10,
    fontWeight: '600',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
    marginBottom: 2,
  },
  title: {
    fontSize: 14,
  },
  artist: {
    fontSize: 12,
  },
  playBtn: {
    marginRight: 4,
  },
  closeBtn: {
    padding: 4,
  },
});
