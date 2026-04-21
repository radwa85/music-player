import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import { AppText } from '../../components/Common/AppText';
import { MiniPlayer } from '../../components/Player/MiniPlayer';
import { useAudio } from '../../providers/AudioProvider';
import { musicApi } from '../../services/api';
import { Track } from '../../types/track';
import { colors } from '../../constants/colors';
import { styles } from './LikedSongs.styles';

// ─── Song Card ────────────────────────────────────────────────────────────────

interface SongCardProps {
  track: Track;
  isPlaying: boolean;
  isCurrentTrack: boolean;
  onPress: () => void;
  onUnlike: () => void;
}

const SongCard: React.FC<SongCardProps> = ({
  track,
  isPlaying,
  isCurrentTrack,
  onPress,
  onUnlike,
}) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.85}>
      <View style={styles.cardImageWrapper}>
        <Image source={{ uri: track.cover_url }} style={styles.cardImage} />

        {/* Playing overlay */}
        {isCurrentTrack && isPlaying && (
          <View style={styles.playingOverlay}>
            <Ionicons name="pause-circle" size={40} color="#fff" />
          </View>
        )}
        {isCurrentTrack && !isPlaying && (
          <View style={styles.playingOverlay}>
            <Ionicons name="play-circle" size={40} color="#fff" />
          </View>
        )}

        {/* Unlike button */}
        <TouchableOpacity
          style={styles.likeButton}
          onPress={onUnlike}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <Ionicons name="heart" size={16} color="#E8365D" />
        </TouchableOpacity>
      </View>

      <View style={styles.cardInfo}>
        <AppText fontWeight="bold" style={styles.cardTitle} numberOfLines={1}>
          {track.title}
        </AppText>
        <AppText style={styles.cardArtist} numberOfLines={1}>
          {track.artist}
        </AppText>
      </View>
    </TouchableOpacity>
  );
};

// ─── Liked Songs Screen ───────────────────────────────────────────────────────

export const LikedSongsScreen: React.FC = () => {
  const navigation = useNavigation();
  const { currentTrack, isPlaying, playTrack } = useAudio();

  const [likedTracks, setLikedTracks] = useState<Track[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // ── Fetch liked songs ──────────────────────────────────────────────────────
  const fetchLikedSongs = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const tracks = await (musicApi as any).getLikedSongs();
      setLikedTracks(tracks);
    } catch {
      setError('Failed to load liked songs. Please try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLikedSongs();
  }, [fetchLikedSongs]);

  // ── Unlike handler ─────────────────────────────────────────────────────────
  const handleUnlike = useCallback(
    (track: Track) => {
      Alert.alert(
        'Remove from Liked Songs',
        `Remove "${track.title}" from your liked songs?`,
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Remove',
            style: 'destructive',
            onPress: async () => {
              // Optimistic update
              setLikedTracks(prev => prev.filter(t => t.id !== track.id));
              try {
                await (musicApi as any).toggleLike(track.id);
              } catch {
                // Revert on failure
                setLikedTracks(prev => [track, ...prev]);
                Alert.alert('Error', 'Could not remove song. Please try again.');
              }
            },
          },
        ],
      );
    },
    [],
  );

  // ── Render ─────────────────────────────────────────────────────────────────
  const renderItem = useCallback(
    ({ item }: { item: Track }) => {
      const isCurrentTrack = currentTrack?.id === item.id;
      return (
        <SongCard
          track={item}
          isCurrentTrack={isCurrentTrack}
          isPlaying={isCurrentTrack && isPlaying}
          onPress={() => playTrack(item)}
          onUnlike={() => handleUnlike(item)}
        />
      );
    },
    [currentTrack, isPlaying, playTrack, handleUnlike],
  );

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Ionicons
        name="heart-outline"
        size={72}
        color={colors.primaryText}
        style={styles.emptyIcon}
      />
      <AppText fontWeight="bold" style={styles.emptyTitle}>
        No liked songs yet
      </AppText>
      <AppText style={styles.emptySubtitle}>
        Tap the heart icon on any song to add it here
      </AppText>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* ── Header ── */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
        >
          <Ionicons name="arrow-back" size={24} color={colors.primaryText} />
        </TouchableOpacity>

        <AppText fontWeight="bold" style={styles.headerTitle}>
          Liked Songs
        </AppText>

        {/* Filter / sort placeholder — wire up as needed */}
        <TouchableOpacity style={styles.filterButton}>
          <Ionicons name="options-outline" size={24} color={colors.primaryText} />
        </TouchableOpacity>
      </View>

      {/* ── Body ── */}
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primaryText} />
        </View>
      ) : error ? (
        <View style={styles.errorContainer}>
          <AppText style={styles.errorText}>{error}</AppText>
          <TouchableOpacity style={styles.retryButton} onPress={fetchLikedSongs}>
            <AppText style={styles.retryText}>Try Again</AppText>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={likedTracks}
          keyExtractor={item => String(item.id)}
          renderItem={renderItem}
          numColumns={2}
          columnWrapperStyle={styles.row}
          contentContainerStyle={[
            styles.listContent,
            likedTracks.length === 0 && { flex: 1 },
          ]}
          ListEmptyComponent={renderEmpty}
          showsVerticalScrollIndicator={false}
        />
      )}

      {/* ── Mini Player ── */}
      <MiniPlayer />
    </View>
  );
};