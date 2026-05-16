import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Animated,
  FlatList,
  Image,
  Modal,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSelector } from "react-redux";
import { PLAYLIST_PLACEHOLDER_URI } from "../../assets/playlistPlaceholder";
import { AppText } from "../../components/Common/AppText";
import { MiniPlayer } from "../../components/Player/MiniPlayer";
import { useAudio } from "../../providers/AudioProvider";
import { useTheme } from "../../providers/ThemeProvider";
import { RootState } from "../../redux/store";
import { likedApi } from "../../services/LikedService";
import { playlistService } from "../../services/playlistService";
import { searchService } from "../../services/searchService";
import { Track } from "../../types/track";
import { makePlaylistDetailStyles } from "./PlaylistDetail.styles";

type SortMethod =
  | "default"
  | "titleAsc"
  | "titleDesc"
  | "artist"
  | "recent"
  | "durationAsc"
  | "durationDesc";

const PlaylistDetailScreen: React.FC = () => {
  const { colors } = useTheme();
  const styles = makePlaylistDetailStyles(colors);
  const token = useSelector((s: RootState) => s.auth.token ?? "");
  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  const playlistId = route.params?.playlistId as string;
  const readOnly = route.params?.readOnly === true;

  const [playlist, setPlaylist] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [searching, setSearching] = useState(false);
  const [showActions, setShowActions] = useState(false);
  const [showSort, setShowSort] = useState(false);
  const [sortMethod, setSortMethod] = useState<SortMethod>("default");
  const [artistFilter, setArtistFilter] = useState("");
  const [albumFilter, setAlbumFilter] = useState("");
  const [favoritesOnly, setFavoritesOnly] = useState(false);
  const [favoriteTrackIds, setFavoriteTrackIds] = useState<number[]>([]);
  const [actionLoadingId, setActionLoadingId] = useState<number | null>(null);

  const snackbarAnim = useRef(new Animated.Value(0)).current;
  const snackbarTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const load = async () => {
    setLoading(true);
    try {
      const p = await playlistService.getPlaylist(token, playlistId);
      setPlaylist(p);
    } catch (err) {
      console.warn(err);
      Alert.alert("Error", "Could not load playlist");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (playlistId) {
      load();
    }
  }, [playlistId, token]);

  useEffect(() => {
    const loadFavorites = async () => {
      if (!token) {
        setFavoriteTrackIds([]);
        return;
      }

      try {
        const likedTracks = await likedApi.getLikedSongs(token);
        setFavoriteTrackIds(likedTracks.map((track) => track.id));
      } catch (error) {
        console.warn("Could not load liked songs for playlist filters", error);
      }
    };

    loadFavorites();
  }, [token]);

  useEffect(() => {
    if (!showAdd) {
      setSearchQuery("");
      setSearchResults([]);
      setSearching(false);
    }
  }, [showAdd]);

  useEffect(() => {
    if (!showAdd) return;

    const query = searchQuery.trim();
    if (!query) {
      setSearchResults([]);
      setSearching(false);
      return;
    }

    const handle = setTimeout(async () => {
      setSearching(true);
      try {
        const results = await searchService.searchTracks(query, token, 24);
        setSearchResults(results || []);
      } catch (error) {
        console.warn("Search failed", error);
        Alert.alert("Search failed", String(error));
      } finally {
        setSearching(false);
      }
    }, 300);

    return () => clearTimeout(handle);
  }, [searchQuery, showAdd, token]);

  useEffect(() => {
    if (!snackbarMessage) return;

    Animated.timing(snackbarAnim, {
      toValue: 1,
      duration: 180,
      useNativeDriver: true,
    }).start();

    if (snackbarTimer.current) {
      clearTimeout(snackbarTimer.current);
    }

    snackbarTimer.current = setTimeout(() => {
      Animated.timing(snackbarAnim, {
        toValue: 0,
        duration: 160,
        useNativeDriver: true,
      }).start(() => setSnackbarMessage(""));
    }, 1800);

    return () => {
      if (snackbarTimer.current) {
        clearTimeout(snackbarTimer.current);
      }
    };
  }, [snackbarMessage, snackbarAnim]);

  const showSnack = (message: string) => {
    setSnackbarMessage(message);
  };

  const openPlaylistActions = () => {
    setShowActions(true);
  };

  const removeTrack = async (trackId: string | number) => {
    if (!token) {
      Alert.alert("Not signed in", "Please sign in to manage playlists");
      return;
    }

    try {
      await playlistService.removeTrack(token, playlistId, trackId);
      showSnack("Track removed");
      load();
    } catch (err: any) {
      console.warn("Remove track error:", err.message || err);
      Alert.alert("Error", err.message || "Remove failed");
    }
  };

  const applySort = (method: SortMethod) => {
    setSortMethod(method);
    setShowSort(false);
  };

  const { playTrack, skipForward, skipBackward, currentTrack, isPlaying, togglePlayback } =
    useAudio();

  const playlistTracks: Track[] = useMemo(
    () => (playlist?.tracks || []) as Track[],
    [playlist?.tracks],
  );

  const playlistDuration = useMemo(() => {
    return playlistTracks.reduce(
      (total, track) => total + (track.duration || 0),
      0,
    );
  }, [playlistTracks]);

  const favoriteSet = useMemo(
    () => new Set(favoriteTrackIds),
    [favoriteTrackIds],
  );

  const playlistTrackIds = useMemo(
    () => new Set(playlistTracks.map((t) => t.id)),
    [playlistTracks],
  );

  const visibleTracks = useMemo(() => {
    let tracks = [...playlistTracks];

    switch (sortMethod) {
      case "titleAsc":
        tracks.sort((a: any, b: any) =>
          (a.title || "").localeCompare(b.title || "", undefined, {
            sensitivity: "base",
          }),
        );
        break;
      case "titleDesc":
        tracks.sort((a: any, b: any) =>
          (b.title || "").localeCompare(a.title || "", undefined, {
            sensitivity: "base",
          }),
        );
        break;
      case "artist":
        tracks.sort((a: any, b: any) =>
          (a.artist || "").localeCompare(b.artist || "", undefined, {
            sensitivity: "base",
          }),
        );
        break;
      case "recent":
        tracks.sort((a: any, b: any) =>
          new Date(b.created_at || 0).getTime() -
          new Date(a.created_at || 0).getTime(),
        );
        break;
      case "durationAsc":
        tracks.sort((a: any, b: any) => (a.duration || 0) - (b.duration || 0));
        break;
      case "durationDesc":
        tracks.sort((a: any, b: any) => (b.duration || 0) - (a.duration || 0));
        break;
      case "default":
      default:
        break;
    }

    if (artistFilter.trim()) {
      const artist = artistFilter.trim().toLowerCase();
      tracks = tracks.filter((track: any) =>
        (track.artist || "").toLowerCase().includes(artist),
      );
    }

    if (albumFilter.trim()) {
      const album = albumFilter.trim().toLowerCase();
      tracks = tracks.filter((track: any) => {
        const trackAlbum = String(
          track.album || track.album_name || track.albumTitle || "",
        ).toLowerCase();
        return trackAlbum.includes(album);
      });
    }

    if (favoritesOnly) {
      tracks = tracks.filter((track: any) => favoriteSet.has(track.id));
    }

    return tracks;
  }, [
    albumFilter,
    artistFilter,
    favoriteSet,
    favoritesOnly,
    playlistTracks,
    sortMethod,
  ]);

  const formatDuration = (seconds: number) => {
    if (!seconds && seconds !== 0) return "0:00";
    const minutes = Math.floor(seconds / 60);
    const remaining = Math.floor(seconds % 60);
    return `${minutes}:${remaining.toString().padStart(2, "0")}`;
  };

  const createShuffledQueue = (tracks: Track[], current?: Track | null) => {
    const remaining = tracks.filter((t) => t.id !== current?.id);

    for (let i = remaining.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [remaining[i], remaining[j]] = [remaining[j], remaining[i]];
    }

    return current ? [current, ...remaining] : remaining;
  };

  const onPressTrack = (track: any) => {
    if (!playlistTracks.length) return;
    playTrack(track, visibleTracks.length > 0 ? visibleTracks : playlistTracks);
  };

  const localSkipForward = () => {
    const list = visibleTracks.length > 0 ? visibleTracks : playlistTracks;
    if (!currentTrack || list.length === 0) return;
    const idx = list.findIndex((t) => t.id === currentTrack.id);
    if (idx === -1) return;
    const nextIndex = idx + 1;
    if (nextIndex >= list.length) {
      showSnack("End of playlist");
      return;
    }
    playTrack(list[nextIndex], list);
  };

  const localSkipBackward = () => {
    const list = visibleTracks.length > 0 ? visibleTracks : playlistTracks;
    if (!currentTrack || list.length === 0) return;
    const idx = list.findIndex((t) => t.id === currentTrack.id);
    if (idx === -1) return;
    const prevIndex = idx - 1;
    if (prevIndex < 0) {
      // If playback already progressed a bit, restart current track
      playTrack(currentTrack, list);
      return;
    }
    playTrack(list[prevIndex], list);
  };

  const playAll = () => {
    if (visibleTracks.length === 0) return;
    playTrack(visibleTracks[0], visibleTracks);
  };

  const doShufflePlay = () => {
    if (visibleTracks.length === 0) return;
    const shuffled = createShuffledQueue(visibleTracks);
    playTrack(shuffled[0], shuffled);
    showSnack("Playlist shuffled");
  };

  const handleAddFavorite = async (track: Track) => {
    if (!token) {
      Alert.alert("Not signed in", "Please sign in to add favorites");
      return;
    }

    setActionLoadingId(track.id);
    try {
      const result = await likedApi.toggleLike(track.id, token);
      setFavoriteTrackIds((current) => {
        const next = new Set(current);
        if (result.liked) {
          next.add(track.id);
        } else {
          next.delete(track.id);
        }
        return Array.from(next);
      });
      showSnack(result.liked ? "Added to favorites" : "Removed from favorites");
    } catch (error) {
      console.warn("Favorite action failed", error);
      Alert.alert("Error", "Could not update favorites");
    } finally {
      setActionLoadingId(null);
    }
  };

  const handleGoToArtist = (track: Track) => {
    Alert.alert("Artist", track.artist || "Unknown artist");
  };

  const handleGoToAlbum = (track: any) => {
    const albumName = track.album || track.album_name || track.albumTitle;
    Alert.alert("Album", albumName || "Unknown album");
  };

  const openTrackMenu = (track: Track) => {
    Alert.alert(track.title || "Track actions", undefined, [
      {
        text: "Remove from playlist",
        onPress: () => removeTrack(track.id),
        style: "destructive",
      },
      { text: "Add to favorites", onPress: () => handleAddFavorite(track) },
      { text: "Go to artist", onPress: () => handleGoToArtist(track) },
      { text: "Go to album", onPress: () => handleGoToAlbum(track) },
      { text: "Cancel", style: "cancel" },
    ]);
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator color={colors.accent} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <Ionicons name="arrow-back" size={24} color={colors.primaryText} />
        </TouchableOpacity>
        <AppText style={styles.headerTitle} numberOfLines={1}>
          {playlist?.title || "Playlist Detail"}
        </AppText>
        {!readOnly && (
          <TouchableOpacity
            onPress={openPlaylistActions}
            style={styles.headerActionButton}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Ionicons
              name="ellipsis-vertical"
              size={20}
              color={colors.primaryText}
            />
          </TouchableOpacity>
        )}
      </View>

      <FlatList
        data={visibleTracks}
        keyExtractor={(t: any) => String(t.id)}
        ListHeaderComponent={() => (
          playlist ? (
            <View style={styles.coverWrap}>
              {(() => {
                const firstCover =
                  playlist?.tracks && playlist.tracks.length > 0
                    ? playlist.tracks[0].cover_url
                    : playlist?.cover_url;
                const src = firstCover
                  ? { uri: firstCover }
                  : { uri: PLAYLIST_PLACEHOLDER_URI };
                return <Image source={src} style={styles.cover} />;
              })()}
              <AppText fontWeight="bold" style={styles.coverTitle}>
                {playlist.title}
              </AppText>
              <View style={styles.statsRow}>
                <View style={styles.statChip}>
                  <AppText fontWeight="bold" style={styles.statValue}>
                    {playlistTracks.length}
                  </AppText>
                  <AppText style={styles.statLabel}>Tracks</AppText>
                </View>
                <View style={styles.statChip}>
                  <AppText fontWeight="bold" style={styles.statValue}>
                    {formatDuration(playlistDuration)}
                  </AppText>
                  <AppText style={styles.statLabel}>Total time</AppText>
                </View>
              </View>
              <View style={styles.playControlsRow}>
                <TouchableOpacity
                  style={[styles.controlButton, styles.playAllButton]}
                  onPress={playAll}
                  activeOpacity={0.8}
                >
                  <Ionicons name="play" size={16} color="#fff" />
                  <AppText fontWeight="bold" style={styles.playAllText}>
                    Play All
                  </AppText>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.controlButton, styles.shuffleButton]}
                  onPress={doShufflePlay}
                  activeOpacity={0.8}
                >
                  <Ionicons name="shuffle" size={16} color={colors.primaryText} />
                  <AppText fontWeight="bold" style={styles.shuffleText}>
                    Shuffle
                  </AppText>
                </TouchableOpacity>
              </View>
              <View style={styles.playbackRow}>
                <TouchableOpacity
                  style={styles.iconControlButton}
                  onPress={localSkipBackward}
                  activeOpacity={0.75}
                >
                  <Ionicons
                    name="play-skip-back"
                    size={18}
                    color={colors.primaryText}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.iconControlButton}
                  onPress={togglePlayback}
                  activeOpacity={0.75}
                >
                  <Ionicons
                    name={isPlaying ? "pause" : "play"}
                    size={18}
                    color={colors.primaryText}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.iconControlButton}
                  onPress={localSkipForward}
                  activeOpacity={0.75}
                >
                  <Ionicons
                    name="play-skip-forward"
                    size={18}
                    color={colors.primaryText}
                  />
                </TouchableOpacity>
              </View>

              <View style={styles.filterRow}>
                <TextInput
                  placeholder="Filter artist"
                  placeholderTextColor={colors.secondaryText}
                  value={artistFilter}
                  onChangeText={setArtistFilter}
                  style={styles.filterInput}
                />
                <TextInput
                  placeholder="Filter album"
                  placeholderTextColor={colors.secondaryText}
                  value={albumFilter}
                  onChangeText={setAlbumFilter}
                  style={styles.filterInput}
                />
              </View>
              <View style={styles.filterToggleRow}>
                <TouchableOpacity
                  style={[
                    styles.filterToggle,
                    favoritesOnly && styles.filterToggleActive,
                  ]}
                  onPress={() => setFavoritesOnly((current) => !current)}
                  activeOpacity={0.8}
                >
                  <Ionicons
                    name={favoritesOnly ? "heart" : "heart-outline"}
                    size={16}
                    color={favoritesOnly ? "#fff" : colors.primaryText}
                  />
                  <AppText
                    fontWeight="bold"
                    style={[
                      styles.filterToggleText,
                      favoritesOnly && styles.filterToggleTextActive,
                    ]}
                  >
                    Favorites only
                  </AppText>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.filterClearButton}
                  onPress={() => {
                    setArtistFilter("");
                    setAlbumFilter("");
                    setFavoritesOnly(false);
                    setSortMethod("default");
                  }}
                  activeOpacity={0.8}
                >
                  <AppText style={styles.filterClearText}>Reset filters</AppText>
                </TouchableOpacity>
              </View>
              <View style={styles.quickActionsRow}>
                <TouchableOpacity
                  style={styles.quickActionButton}
                  onPress={() => setShowSort(true)}
                  activeOpacity={0.8}
                >
                  <Ionicons
                    name="funnel-outline"
                    size={18}
                    color={colors.primaryText}
                  />
                  <AppText style={styles.quickActionText}>Sort</AppText>
                </TouchableOpacity>
                {!readOnly && (
                  <TouchableOpacity
                    style={styles.quickActionButton}
                    onPress={() => setShowAdd(true)}
                    activeOpacity={0.8}
                  >
                    <Ionicons
                      name="search-outline"
                      size={18}
                      color={colors.primaryText}
                    />
                    <AppText style={styles.quickActionText}>Add Track</AppText>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          ) : null
        )}
        contentContainerStyle={
          visibleTracks.length === 0 ? styles.emptyListContent : styles.content
        }
        ListEmptyComponent={() =>
          playlistTracks.length === 0 ? (
            <View style={styles.emptyStateCard}>
              <Ionicons
                name="musical-notes-outline"
                size={34}
                color={colors.secondaryText}
              />
              <AppText fontWeight="bold" style={styles.emptyStateTitle}>
                Your playlist is empty
              </AppText>
              <AppText style={styles.emptyStateText}>
                Search and add songs to get started.
              </AppText>
            </View>
          ) : (
            <View style={styles.emptyStateCard}>
              <Ionicons
                name="musical-notes-outline"
                size={34}
                color={colors.secondaryText}
              />
              <AppText fontWeight="bold" style={styles.emptyStateTitle}>
                No tracks match your filters
              </AppText>
              <AppText style={styles.emptyStateText}>
                Clear filters or add more songs to this playlist.
              </AppText>
            </View>
          )
        }
        renderItem={({ item }: any) => (
          <TouchableOpacity
            style={[
              styles.listItem,
              currentTrack?.id === item.id && styles.listItemActive,
            ]}
            onPress={() => onPressTrack(item)}
            onLongPress={() => !readOnly && openTrackMenu(item)}
            activeOpacity={0.75}
          >
            <View style={styles.thumbWrap}>
              <Image source={{ uri: item.cover_url }} style={styles.thumb} />
              {currentTrack?.id === item.id && (
                <View style={styles.playingPill}>
                  <Ionicons
                    name={isPlaying ? "pause" : "play"}
                    size={12}
                    color="#fff"
                  />
                </View>
              )}
            </View>
            <View style={styles.trackInfo}>
              <AppText fontWeight="bold" style={styles.trackTitle}>
                {item.title}
              </AppText>
              <AppText style={styles.trackArtist} numberOfLines={1}>
                {item.artist || "Unknown artist"}
              </AppText>
              <AppText style={styles.trackAlbum} numberOfLines={1}>
                {item.album || item.album_name || "Unknown album"}
              </AppText>
            </View>
            {item.duration && (
              <AppText style={styles.duration}>
                {formatDuration(item.duration)}
              </AppText>
            )}
            {!readOnly && (
              <TouchableOpacity
                style={styles.dotMenu}
                onPress={() => openTrackMenu(item)}
                hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
              >
                <Ionicons
                  name="ellipsis-vertical"
                  size={14}
                  color={colors.accent}
                />
              </TouchableOpacity>
            )}
          </TouchableOpacity>
        )}
      />

      {!readOnly && (
        <View style={styles.footerActionContainer}>
          <TouchableOpacity
            style={styles.addTrackButton}
            onPress={() => setShowAdd(true)}
            activeOpacity={0.7}
          >
            <Ionicons name="add" size={20} color={colors.background} />
          </TouchableOpacity>
        </View>
      )}

      <MiniPlayer />

      {!readOnly && (
        <Modal visible={showActions} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.actionSheet}>
            <AppText fontWeight="bold" style={styles.modalHeader}>
              Playlist actions
            </AppText>

            <TouchableOpacity
              onPress={() => {
                setShowActions(false);
                playAll();
              }}
              style={styles.actionSheetButton}
              activeOpacity={0.8}
            >
              <Ionicons name="play" size={18} color={colors.primaryText} />
              <AppText style={styles.actionSheetButtonText}>Play all</AppText>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                setShowActions(false);
                doShufflePlay();
              }}
              style={styles.actionSheetButton}
              activeOpacity={0.8}
            >
              <Ionicons name="shuffle" size={18} color={colors.primaryText} />
              <AppText style={styles.actionSheetButtonText}>Shuffle</AppText>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                setShowActions(false);
                setShowSort(true);
              }}
              style={styles.actionSheetButton}
              activeOpacity={0.8}
            >
              <Ionicons
                name="swap-vertical"
                size={18}
                color={colors.primaryText}
              />
              <AppText style={styles.actionSheetButtonText}>
                Sort tracks
              </AppText>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                setFavoritesOnly((current) => !current);
                setShowActions(false);
              }}
              style={styles.actionSheetButton}
              activeOpacity={0.8}
            >
              <Ionicons
                name={favoritesOnly ? "heart" : "heart-outline"}
                size={18}
                color={favoritesOnly ? colors.accent : colors.primaryText}
              />
              <AppText style={styles.actionSheetButtonText}>
                {favoritesOnly ? "Show all tracks" : "Favorites only"}
              </AppText>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                setArtistFilter("");
                setAlbumFilter("");
                setFavoritesOnly(false);
                setSortMethod("default");
                setShowActions(false);
              }}
              style={styles.actionSheetButton}
              activeOpacity={0.8}
            >
              <Ionicons name="refresh" size={18} color={colors.primaryText} />
              <AppText style={styles.actionSheetButtonText}>
                Reset filters
              </AppText>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                setShowActions(false);
                setShowAdd(true);
              }}
              style={styles.actionSheetButton}
              activeOpacity={0.8}
            >
              <Ionicons name="search" size={18} color={colors.primaryText} />
              <AppText style={styles.actionSheetButtonText}>
                Search to add
              </AppText>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setShowActions(false)}
              style={styles.actionSheetClose}
              activeOpacity={0.8}
            >
              <AppText fontWeight="bold" style={styles.actionSheetCloseText}>
                Close
              </AppText>
            </TouchableOpacity>
          </View>
        </View>
        </Modal>
      )}

      {/* Add Track Modal (search-based) */}
      <Modal visible={showAdd} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <AppText fontWeight="bold" style={styles.modalHeader}>
              Add Track to Playlist
            </AppText>

            <TextInput
              placeholder="Search tracks by name or artist"
              placeholderTextColor={colors.secondaryText}
              value={searchQuery}
              onChangeText={setSearchQuery}
              style={styles.input}
            />

            <View style={{ marginBottom: 10 }}>
              <TouchableOpacity
                onPress={async () => {
                  setSearching(true);
                  try {
                    const results = await searchService.searchTracks(
                      searchQuery,
                      token,
                      20,
                    );
                    setSearchResults(results || []);
                  } catch (e) {
                    console.warn("Search failed", e);
                    Alert.alert("Search failed", String(e));
                  } finally {
                    setSearching(false);
                  }
                }}
                style={styles.saveButton}
                activeOpacity={0.8}
                disabled={!searchQuery.trim() || searching}
              >
                <AppText fontWeight="bold" style={styles.saveButtonText}>
                  {searching ? "Searching..." : "Search"}
                </AppText>
              </TouchableOpacity>
            </View>

            {searching ? (
              <ActivityIndicator color={colors.accent} />
            ) : (
              <FlatList
                data={searchResults}
                keyExtractor={(t: any) => String(t.id)}
                renderItem={({ item }: any) => (
                  <TouchableOpacity
                    style={styles.listItem}
                          onPress={async () => {
                            if (playlistTrackIds.has(item.id)) {
                              showSnack("Track already exists in this playlist");
                              return;
                            }

                            try {
                              setActionLoadingId(item.id);
                              await playlistService.addTrack(
                                token,
                                playlistId,
                                item.id,
                              );
                              setShowAdd(false);
                              setSearchResults([]);
                              setSearchQuery("");
                              showSnack("Track added");
                              load();
                            } catch (e: any) {
                              console.warn("Add from search failed", e);
                              Alert.alert("Add failed", e.message || String(e));
                            } finally {
                              setActionLoadingId(null);
                            }
                          }}
                    activeOpacity={0.78}
                    disabled={playlistTrackIds.has(item.id) || actionLoadingId === item.id}
                  >
                    <Image
                      source={{ uri: item.cover_url }}
                      style={styles.thumb}
                    />
                    <View style={styles.trackInfo}>
                      <AppText fontWeight="bold" style={styles.trackTitle}>
                        {item.title}
                      </AppText>
                      <AppText style={styles.trackArtist} numberOfLines={1}>
                        {item.artist || "Unknown artist"}
                      </AppText>
                      <AppText style={styles.trackAlbum} numberOfLines={1}>
                        {item.album || item.album_name || "Unknown album"}
                      </AppText>
                    </View>
                    <View style={styles.searchMetaWrap}>
                      {actionLoadingId === item.id ? (
                        <AppText style={styles.searchMetaText}>
                          Adding...
                        </AppText>
                      ) : playlistTrackIds.has(item.id) ? (
                        <AppText style={styles.searchMetaText}>Added</AppText>
                      ) : (
                        <AppText style={styles.searchMetaText}>Add</AppText>
                      )}
                    </View>
                  </TouchableOpacity>
                )}
              />
            )}

            <View style={styles.modalFooter}>
              <TouchableOpacity
                onPress={() => setShowAdd(false)}
                style={styles.cancelButton}
                activeOpacity={0.7}
              >
                <AppText fontWeight="bold" style={styles.cancelButtonText}>
                  Close
                </AppText>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Sort Modal */}
      <Modal visible={showSort} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <AppText fontWeight="bold" style={styles.modalHeader}>
              Sort Tracks
            </AppText>

            <TouchableOpacity
              onPress={() => applySort("default")}
              style={styles.sortOption}
            >
              <AppText style={styles.sortOptionText}>
                Default (original)
              </AppText>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => applySort("titleAsc")}
              style={styles.sortOption}
            >
              <AppText style={styles.sortOptionText}>Title (A–Z)</AppText>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => applySort("titleDesc")}
              style={styles.sortOption}
            >
              <AppText style={styles.sortOptionText}>Title (Z–A)</AppText>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => applySort("artist")}
              style={styles.sortOption}
            >
              <AppText style={styles.sortOptionText}>Artist (A–Z)</AppText>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => applySort("recent")}
              style={styles.sortOption}
            >
              <AppText style={styles.sortOptionText}>Recently added</AppText>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => applySort("durationAsc")}
              style={styles.sortOption}
            >
              <AppText style={styles.sortOptionText}>
                Duration (short→long)
              </AppText>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => applySort("durationDesc")}
              style={styles.sortOption}
            >
              <AppText style={styles.sortOptionText}>
                Duration (long→short)
              </AppText>
            </TouchableOpacity>

            <View style={styles.modalFooter}>
              <TouchableOpacity
                onPress={() => setShowSort(false)}
                style={styles.cancelButton}
                activeOpacity={0.7}
              >
                <AppText fontWeight="bold" style={styles.cancelButtonText}>
                  Close
                </AppText>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Animated.View
        pointerEvents="none"
        style={[
          styles.snackbar,
          {
            opacity: snackbarAnim,
            transform: [
              {
                translateY: snackbarAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [18, 0],
                }),
              },
            ],
          },
        ]}
      >
        <AppText style={styles.snackbarText}>{snackbarMessage}</AppText>
      </Animated.View>
    </View>
  );
};

export default PlaylistDetailScreen;
