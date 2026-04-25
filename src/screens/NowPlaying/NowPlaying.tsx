import React, { useRef, useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Animated,
  PanResponder,
  LayoutChangeEvent,
  ScrollView,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useAudio } from '../../providers/AudioProvider';
import { Track } from '../../types/track';
import { colors } from '../../constants/colors';
import { styles } from './NowPlaying.styles';

// ─── Component ────────────────────────────────────────────────────────────────

export default function NowPlayingScreen() {
  const navigation = useNavigation();

  // ─── Audio context ──────────────────────────────────────────────────────
  const { 
    currentTrack, 
    isPlaying, 
    status, 
    togglePlayback, 
    skipForward, 
    skipBackward,
    isShuffle,
    repeatMode,
    toggleShuffle,
    toggleRepeat,
    playlist 
  } = useAudio();

  // ─── Local state ────────────────────────────────────────────────────────
  const [liked, setLiked] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragPosition, setDragPosition] = useState<number>(0);
  const [barWidth, setBarWidth] = useState<number>(1);

  // ─── Derived playback values ────────────────────────────────────────────
  const positionMs: number = isDragging
    ? dragPosition
    : (status?.currentTime ?? 0) * 1000;
  const durationMs: number =
    (status?.duration ?? currentTrack?.duration ?? 0) * 1000;
  const progress: number = durationMs > 0 ? positionMs / durationMs : 0;

  // ─── Album art scale animation ──────────────────────────────────────────
  const albumScale = useRef(new Animated.Value(0.88)).current;

  useEffect(() => {
    Animated.spring(albumScale, {
      toValue: isPlaying ? 1 : 0.88,
      friction: 6,
      tension: 80,
      useNativeDriver: true,
    }).start();
  }, [isPlaying]);

  // ─── Progress bar drag ──────────────────────────────────────────────────
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: evt => {
        setIsDragging(true);
        const ratio = Math.min(Math.max(evt.nativeEvent.locationX / barWidth, 0), 1);
        setDragPosition(ratio * durationMs);
      },
      onPanResponderMove: evt => {
        const ratio = Math.min(Math.max(evt.nativeEvent.locationX / barWidth, 0), 1);
        setDragPosition(ratio * durationMs);
      },
      onPanResponderRelease: evt => {
        const ratio = Math.min(Math.max(evt.nativeEvent.locationX / barWidth, 0), 1);
        setDragPosition(ratio * durationMs);
        setIsDragging(false);
      },
    }),
  ).current;

  // ─── Helpers ────────────────────────────────────────────────────────────
  const formatTime = (ms: number): string => {
    const totalSec = Math.floor(ms / 1000);
    const m = Math.floor(totalSec / 60);
    const s = totalSec % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  const repeatIcon: string = 'repeat';
  const repeatColor: string = repeatMode === 'none' ? colors.inactiveBar : '#FF2D78';

  const currentIndex = playlist.findIndex(t => t.id === currentTrack?.id);
  const prevTrack: Track | null =
    currentIndex > 0 ? playlist[currentIndex - 1] : null;
  const nextTrack: Track | null =
    currentIndex < playlist.length - 1 ? playlist[currentIndex + 1] : null;

  // ─── Render ─────────────────────────────────────────────────────────────
  return (
    <View style={styles.root}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        bounces={false}>

        {/* ── Header ── */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
            <Ionicons name="chevron-back" size={26} color={colors.primaryText} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Playing Now</Text>
          <View style={{ width: 26 }} />
        </View>

        {/* ── Album Art + Side Thumbnails ── */}
        <View style={styles.artWrapper}>
          {prevTrack?.cover_url && (
            <Image
              source={{ uri: prevTrack.cover_url }}
              style={[styles.sideThumbnail, styles.sideThumbnailLeft]}
              resizeMode="cover"
            />
          )}

          <Animated.View
            style={[styles.artContainer, { transform: [{ scale: albumScale }] }]}>
            {currentTrack?.cover_url ? (
              <Image
                source={{ uri: currentTrack.cover_url }}
                style={styles.albumArt}
                resizeMode="cover"
              />
            ) : (
              <View style={[styles.albumArt, styles.albumArtPlaceholder]}>
                <Ionicons name="musical-notes" size={64} color="#FF2D78" />
              </View>
            )}
          </Animated.View>

          {nextTrack?.cover_url && (
            <Image
              source={{ uri: nextTrack.cover_url }}
              style={[styles.sideThumbnail, styles.sideThumbnailRight]}
              resizeMode="cover"
            />
          )}
        </View>

        {/* ── Song Info + Like ── */}
        <View style={styles.infoRow}>
          <View style={styles.infoText}>
            <Text style={styles.songTitle} numberOfLines={1}>
              {currentTrack?.title ?? 'Unknown Title'}
            </Text>
            <Text style={styles.artistName} numberOfLines={1}>
              {currentTrack?.artist ?? 'Unknown Artist'}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => setLiked(p => !p)}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
            <Ionicons
              name={liked ? 'heart' : 'heart-outline'}
              size={24}
              color={liked ? '#FF2D78' : colors.inactiveBar}
            />
          </TouchableOpacity>
        </View>

        {/* ── Secondary Controls ── */}
        <View style={styles.secondaryControls}>
          <TouchableOpacity hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
            <Ionicons name="volume-low-outline" size={22} color={colors.inactiveBar} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={toggleRepeat}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
            <MaterialCommunityIcons name={repeatIcon as any} size={22} color={repeatColor} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={toggleShuffle}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
            <Ionicons
              name="shuffle"
              size={22}
              color={isShuffle ? '#FF2D78' : colors.inactiveBar}
            />
          </TouchableOpacity>
        </View>

        {/* ── Progress Bar ── */}
        <View style={styles.progressSection}>
          <Text style={styles.timeText}>{formatTime(positionMs)}</Text>
          <View
            style={styles.progressBarTrack}
            onLayout={(e: LayoutChangeEvent) =>
              setBarWidth(e.nativeEvent.layout.width)
            }
            {...panResponder.panHandlers}>
            <View
              style={[styles.progressBarFill, { width: `${progress * 100}%` }]}
            />
            <View
              style={[styles.progressThumb, { left: `${progress * 100}%` }]}
            />
          </View>
          <Text style={styles.timeTextRight}>{formatTime(durationMs)}</Text>
        </View>

        {/* ── Playback Controls ── */}
        <View style={styles.controls}>
          <TouchableOpacity
            onPress={skipBackward}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
            <Ionicons name="play-skip-back" size={32} color={colors.primaryText} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.playButton}
            onPress={togglePlayback}
            activeOpacity={0.85}>
            <Ionicons
              name={isPlaying ? 'pause' : 'play'}
              size={30}
              color="#FFFFFF"
              style={isPlaying ? undefined : { marginLeft: 3 }}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={skipForward}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
            <Ionicons name="play-skip-forward" size={32} color={colors.primaryText} />
          </TouchableOpacity>
        </View>

        {/* ── Bottom pill ── */}
        <View style={styles.bottomPill} />

      </ScrollView>
    </View>
  );
}