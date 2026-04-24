import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { AppText } from "../../components/Common/AppText";
import { MiniPlayer } from "../../components/Player/MiniPlayer";
import { colors } from "../../constants/colors";
import { useAudio } from "../../providers/AudioProvider";
import { likedApi } from "../../services/LikedService";
import { Track } from "../../types/track";
import { styles } from "./LikedSongs.styles";

// ─── Song Card ────────────────────────────────────────────────────────────────

interface SongCardProps {
  track: Track;
  isPlaying: boolean;
  isCurrentTrack: boolean;
  onPress: () => void;
}

type SortOption = "title" | "artist" | "duration";

const SongCard: React.FC<SongCardProps> = ({
  track,
  isPlaying,
  isCurrentTrack,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.85}
    >
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
  const [showSortMenu, setShowSortMenu] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>("title");

  const sortedTracks = React.useMemo(() => {
    const tracks = [...likedTracks];

    if (sortBy === "artist") {
      tracks.sort((a, b) => a.artist.localeCompare(b.artist));
      return tracks;
    }

    if (sortBy === "duration") {
      tracks.sort((a, b) => b.duration - a.duration);
      return tracks;
    }

    tracks.sort((a, b) => a.title.localeCompare(b.title));
    return tracks;
  }, [likedTracks, sortBy]);

  // ── Fetch liked songs ──────────────────────────────────────────────────────
  const fetchLikedSongs = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const tracks = await (likedApi as any).getLikedSongs();
      setLikedTracks(tracks);
    } catch {
      setError("Failed to load liked songs. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLikedSongs();
  }, [fetchLikedSongs]);

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
        />
      );
    },
    [currentTrack, isPlaying, playTrack],
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

  const renderSortOption = (
    value: SortOption,
    title: string,
    detail: string,
    icon: React.ComponentProps<typeof Ionicons>["name"],
  ) => {
    const isSelected = sortBy === value;

    return (
      <TouchableOpacity
        key={value}
        style={[styles.sortOption, isSelected && styles.sortOptionSelected]}
        activeOpacity={0.85}
        onPress={() => {
          setSortBy(value);
          setShowSortMenu(false);
        }}
      >
        <View style={styles.sortIconWrap}>
          <Ionicons name={icon} size={16} color={colors.primaryText} />
        </View>
        <View style={styles.sortTextWrap}>
          <AppText fontWeight="bold" style={styles.sortOptionTitle}>
            {title}
          </AppText>
          <AppText style={styles.sortOptionDetail}>{detail}</AppText>
        </View>
        {isSelected && (
          <Ionicons name="checkmark-circle" size={18} color="#2B8A3E" />
        )}
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView
      style={styles.container}
      edges={["top", "left", "right"]}
    >
      {/* ── Header ── */}
      <View style={styles.headerActionsRow}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
        >
          <Ionicons name="arrow-back" size={20} color={colors.primaryText} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setShowSortMenu((prev) => !prev)}
          activeOpacity={0.85}
        >
          <Ionicons
            name="options-outline"
            size={20}
            color={colors.primaryText}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.headerTitleRow}>
        <AppText fontWeight="bold" style={styles.headerTitle}>
          Liked Songs
        </AppText>
      </View>

      {showSortMenu && (
        <>
          <Pressable
            style={styles.sortBackdrop}
            onPress={() => setShowSortMenu(false)}
          />
          <View style={styles.sortMenu}>
            <AppText fontWeight="bold" style={styles.sortTitle}>
              Sort songs by
            </AppText>
            {renderSortOption("title", "A-Z", "Sort by song title", "text")}
            {renderSortOption("artist", "Artist", "Group by artist name", "person")}
            {renderSortOption(
              "duration",
              "Duration",
              "Longest tracks first",
              "time-outline",
            )}
          </View>
        </>
      )}

      {/* ── Body ── */}
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primaryText} />
        </View>
      ) : error ? (
        <View style={styles.errorContainer}>
          <AppText style={styles.errorText}>{error}</AppText>
          <TouchableOpacity
            style={styles.retryButton}
            onPress={fetchLikedSongs}
          >
            <AppText style={styles.retryText}>Try Again</AppText>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={sortedTracks}
          keyExtractor={(item) => String(item.id)}
          renderItem={renderItem}
          numColumns={2}
          columnWrapperStyle={styles.row}
          contentContainerStyle={[
            styles.listContent,
            sortedTracks.length === 0 && { flex: 1 },
          ]}
          ListEmptyComponent={renderEmpty}
          showsVerticalScrollIndicator={false}
        />
      )}

      {/* ── Mini Player ── */}
      <MiniPlayer />
    </SafeAreaView>
  );
};
