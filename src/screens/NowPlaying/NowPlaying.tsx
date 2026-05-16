import React, { useRef, useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Animated,
  PanResponder,
  LayoutChangeEvent,
  ScrollView,
  Alert,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { useAudio } from "../../providers/AudioProvider";
import { useTheme } from "../../providers/ThemeProvider";
import { Track } from "../../types/track";
import { RootState } from "../../redux/store";
import { likedApi } from "../../services/LikedService";
import { playlistService } from "../../services/playlistService";
import { makeNowPlayingStyles } from "./NowPlaying.styles";
import { PLAYLIST_PLACEHOLDER_URI } from "../../assets/playlistPlaceholder";
import { AppText } from "../../components/Common/AppText";
import { FlatList, Modal, TextInput } from "react-native";

export default function NowPlayingScreen() {
  const navigation = useNavigation();
  const { token } = useSelector((state: RootState) => state.auth);
  const authToken = token ?? "";
  const { colors } = useTheme();
  const styles = makeNowPlayingStyles(colors);

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
    playlist,
    trackDuration,
  } = useAudio();

  // ─── Local state ────────────────────────────────────────────────────────
  const [liked, setLiked] = useState<boolean>(false);
  const [likeLoading, setLikeLoading] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragPosition, setDragPosition] = useState<number>(0);
  const [barWidth, setBarWidth] = useState<number>(1);
  const [playlistModalVisible, setPlaylistModalVisible] = useState(false);
  const [playlists, setPlaylists] = useState<any[]>([]);
  const [addingTrackId, setAddingTrackId] = useState("");

  // Check whether current track is liked when track changes
  useEffect(() => {
    if (!currentTrack || !token) return;
    setLiked(false);
    likedApi
      .isLiked(currentTrack.id, token)
      .then((result) => setLiked(result))
      .catch(() => {});
  }, [currentTrack?.id, token]);

  const loadPlaylists = async () => {
    if (!token) return;
    try {
      const data = await playlistService.getPlaylists(token);
      setPlaylists(data || []);
    } catch (err) {
      console.warn("Failed to load playlists", err);
    }
  };

  const handleLikePress = async () => {
    if (!currentTrack || !token || likeLoading) return;
    setLikeLoading(true);
    try {
      const result = await likedApi.toggleLike(currentTrack.id, token);
      setLiked(result.liked);
    } catch (error) {
      console.error("Error toggling like:", error);
    } finally {
      setLikeLoading(false);
    }
  };

  // ─── Derived playback values ────────────────────────────────────────────
  const positionMs: number = isDragging
    ? dragPosition
    : (status?.currentTime ?? 0) * 1000;
  const durationMs: number = trackDuration * 1000;
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
      onPanResponderGrant: (evt) => {
        setIsDragging(true);
        const ratio = Math.min(
          Math.max(evt.nativeEvent.locationX / barWidth, 0),
          1,
        );
        setDragPosition(ratio * durationMs);
      },
      onPanResponderMove: (evt) => {
        const ratio = Math.min(
          Math.max(evt.nativeEvent.locationX / barWidth, 0),
          1,
        );
        setDragPosition(ratio * durationMs);
      },
      onPanResponderRelease: (evt) => {
        const ratio = Math.min(
          Math.max(evt.nativeEvent.locationX / barWidth, 0),
          1,
        );
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
    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  };

  const repeatColor: string =
    repeatMode === "none" ? colors.inactiveBar : "#FF2D78";

  const safePlaylist = playlist || [];
  const currentIndex = safePlaylist.findIndex((t) => t.id === currentTrack?.id);
  const prevTrack: Track | null =
    currentIndex > 0 ? safePlaylist[currentIndex - 1] : null;
  const nextTrack: Track | null =
    currentIndex < safePlaylist.length - 1
      ? safePlaylist[currentIndex + 1]
      : null;

  // ─── Render ─────────────────────────────────────────────────────────────
  return (
    <View style={styles.root}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        {/* ── Header ── */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons
              name="chevron-back"
              size={26}
              color={colors.primaryText}
            />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Playing Now</Text>
          <TouchableOpacity
            onPress={async () => {
              await loadPlaylists();
              setPlaylistModalVisible(true);
            }}
          >
            <Ionicons
              name="ellipsis-vertical"
              size={22}
              color={colors.primaryText}
            />
          </TouchableOpacity>
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
            style={[
              styles.artContainer,
              { transform: [{ scale: albumScale }] },
            ]}
          >
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
              {currentTrack?.title ?? "Unknown Title"}
            </Text>
            <Text style={styles.artistName} numberOfLines={1}>
              {currentTrack?.artist ?? "Unknown Artist"}
            </Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <TouchableOpacity
              onPress={async () => {
                if (!token) {
                  Alert.alert(
                    "Sign in required",
                    "Please sign in to add tracks to playlists",
                  );
                  return;
                }
                await loadPlaylists();
                setPlaylistModalVisible(true);
              }}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
              style={{ marginRight: 12 }}
            >
              <Ionicons name="add" size={24} color={colors.primaryText} />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleLikePress}
              disabled={likeLoading}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              <Ionicons
                name={liked ? "heart" : "heart-outline"}
                size={24}
                color={
                  liked
                    ? "#FF2D78"
                    : likeLoading
                      ? colors.inactiveBar
                      : colors.inactiveBar
                }
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* ── Secondary Controls ── */}
        <View style={styles.secondaryControls}>
          <TouchableOpacity hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
            <Ionicons
              name="volume-low-outline"
              size={22}
              color={colors.inactiveBar}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={toggleRepeat}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <MaterialCommunityIcons
              name="repeat"
              size={22}
              color={repeatColor}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={toggleShuffle}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Ionicons
              name="shuffle"
              size={22}
              color={isShuffle ? "#FF2D78" : colors.inactiveBar}
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
            {...panResponder.panHandlers}
          >
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
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons
              name="play-skip-back"
              size={32}
              color={colors.primaryText}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.playButton}
            onPress={togglePlayback}
            activeOpacity={0.85}
          >
            <Ionicons
              name={isPlaying ? "pause" : "play"}
              size={30}
              color="#FFFFFF"
              style={isPlaying ? undefined : { marginLeft: 3 }}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={skipForward}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons
              name="play-skip-forward"
              size={32}
              color={colors.primaryText}
            />
          </TouchableOpacity>
        </View>

        {/* ── Bottom pill ── */}
        <View style={styles.bottomPill} />

        <Modal visible={playlistModalVisible} transparent animationType="slide">
          <View style={styles.playlistOverlay}>
            <View style={styles.playlistModalContainer}>
              <View style={styles.playlistModalHeader}>
                <AppText fontWeight="bold" style={styles.playlistModalTitle}>
                  Add to Playlist
                </AppText>
                <TouchableOpacity
                  onPress={() => setPlaylistModalVisible(false)}
                  style={styles.playlistCloseButton}
                  hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                >
                  <Ionicons name="close" size={24} color={colors.primaryText} />
                </TouchableOpacity>
              </View>

              <FlatList
                data={playlists}
                keyExtractor={(p) => p.id}
                contentContainerStyle={styles.playlistGridContainer}
                scrollEnabled={playlists.length > 4}
                showsVerticalScrollIndicator={false}
                numColumns={2}
                columnWrapperStyle={{ justifyContent: "space-between" }}
                renderItem={({ item }) => {
                  const contains = !!(item.tracks || []).find(
                    (t: any) => t.id === currentTrack?.id,
                  );
                  const cover =
                    item.tracks && item.tracks.length > 0
                      ? item.tracks[0].cover_url
                      : item.cover_url || PLAYLIST_PLACEHOLDER_URI;
                  return (
                    <View style={styles.playlistCardWrapper}>
                      <View style={styles.playlistCard}>
                        <TouchableOpacity
                          activeOpacity={0.8}
                          onPress={async () => {
                            try {
                              const trackId = currentTrack?.id;
                              if (trackId == null) {
                                Alert.alert("Error", "No current track to add");
                                return;
                              }
                              if (contains) {
                                await playlistService.removeTrack(
                                  authToken,
                                  item.id,
                                  trackId as any,
                                );
                              } else {
                                await playlistService.addTrack(
                                  authToken,
                                  item.id,
                                  trackId as any,
                                );
                              }
                              await loadPlaylists();
                            } catch (err) {
                              console.warn(err);
                              Alert.alert("Error", "Failed to update playlist");
                            }
                          }}
                        >
                          <Image
                            source={{ uri: cover }}
                            style={styles.playlistCardImage}
                          />
                        </TouchableOpacity>

                        <View style={styles.playlistCardFooter}>
                          <AppText
                            fontWeight="bold"
                            style={styles.playlistCardTitle}
                            numberOfLines={1}
                          >
                            {item.title}
                          </AppText>

                          <TouchableOpacity
                            style={[
                              styles.playlistCardCheckmark,
                              {
                                backgroundColor: contains
                                  ? colors.accent
                                  : "rgba(0,0,0,0.12)",
                              },
                            ]}
                            onPress={async () => {
                              try {
                                const trackId = currentTrack?.id;
                                if (trackId == null) {
                                  Alert.alert(
                                    "Error",
                                    "No current track to add",
                                  );
                                  return;
                                }
                                if (contains) {
                                  await playlistService.removeTrack(
                                    authToken,
                                    item.id,
                                    trackId as any,
                                  );
                                } else {
                                  await playlistService.addTrack(
                                    authToken,
                                    item.id,
                                    trackId as any,
                                  );
                                }
                                await loadPlaylists();
                              } catch (err) {
                                console.warn(err);
                                Alert.alert(
                                  "Error",
                                  "Failed to update playlist",
                                );
                              }
                            }}
                          >
                            <Ionicons
                              name={contains ? "checkmark" : "add"}
                              size={16}
                              color="#fff"
                            />
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  );
                }}
              />

              <View style={styles.playlistModalFooter}>
                <TouchableOpacity
                  onPress={() => setPlaylistModalVisible(false)}
                  style={styles.playlistDoneButton}
                  activeOpacity={0.7}
                >
                  <AppText
                    fontWeight="bold"
                    style={styles.playlistDoneButtonText}
                  >
                    Done
                  </AppText>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </View>
  );
}
