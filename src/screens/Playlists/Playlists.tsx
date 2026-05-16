import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
    ActivityIndicator,
    FlatList,
    TouchableOpacity,
    View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import { AppText } from "../../components/Common/AppText";
import { MiniPlayer } from "../../components/Player/MiniPlayer";
import PlaylistCard from "../../components/Playlist/PlaylistCard";
import { useAudio } from "../../providers/AudioProvider";
import { useTheme } from "../../providers/ThemeProvider";
import { RootState } from "../../redux/store";
import { playlistService } from "../../services/playlistService";
import { PlaylistGroup } from "../../types/playlist";
import { makePlaylistsStyles } from "./Playlists.styles";

export const PlaylistsScreen: React.FC = () => {
  const { colors } = useTheme();
  const styles = makePlaylistsStyles(colors);
  const navigation = useNavigation<any>();
  const { token } = useSelector((state: RootState) => state.auth);
  const { playTrack, currentTrack } = useAudio();
  const [playlists, setPlaylists] = useState<PlaylistGroup[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadPlaylists = async () => {
    try {
      if (!token) {
        setError("Not authenticated. Please login again.");
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);
      const data = await playlistService.getPlaylists(token);
      console.log("🎵 Playlists loaded:", data?.length || 0);
      setPlaylists(data || []);
    } catch (err) {
      console.error(err);
      const errorMessage =
        err instanceof Error ? err.message : "Failed to load playlists";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPlaylists();
  }, [token]);

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons name="arrow-back" size={24} color={colors.primaryText} />
          </TouchableOpacity>
          <AppText fontWeight="bold" style={styles.headerTitle}>
            Recommended for You
          </AppText>
          <View style={styles.headerSpacer} />
        </View>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.accent} />
          <AppText style={{ marginTop: 16, color: colors.secondaryText }}>
            Loading recommendations...
          </AppText>
        </View>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.emptyStateContainer}>
          <View style={styles.emptyStateIcon}>
            <Ionicons
              name="alert-circle"
              size={40}
              color={colors.destructive || "#c0392b"}
            />
          </View>
          <AppText fontWeight="bold" style={styles.emptyStateTitle}>
            Couldn't load recommendations
          </AppText>
          <AppText style={styles.emptyStateSubtitle}>{error}</AppText>
          <TouchableOpacity style={styles.retryButton} onPress={loadPlaylists}>
            <AppText style={styles.retryText}>Try Again</AppText>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  if (!loading && playlists.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.emptyStateContainer}>
          <View style={styles.emptyStateIcon}>
            <Ionicons name="musical-notes" size={40} color={colors.accent} />
          </View>
          <AppText fontWeight="bold" style={styles.emptyStateTitle}>
            No playlists yet
          </AppText>
          <AppText style={styles.emptyStateSubtitle}>
            Create or follow playlists to see them here.
          </AppText>
          <TouchableOpacity style={styles.retryButton} onPress={loadPlaylists}>
            <AppText style={styles.retryText}>Refresh</AppText>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons name="arrow-back" size={24} color={colors.primaryText} />
        </TouchableOpacity>
        <AppText fontWeight="bold" style={styles.headerTitle}>
          Recommended for You
        </AppText>
        <View style={styles.headerSpacer} />
      </View>

      <FlatList
        data={playlists}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={styles.tracksList}
        showsVerticalScrollIndicator={false}
        numColumns={2}
        renderItem={({ item }) => {
          return (
            <PlaylistCard
              playlist={item}
              onPress={() =>
                navigation.navigate("PlaylistDetail", { playlistId: item.id, readOnly: true })
              }
            />
          );
        }}
      />

      <MiniPlayer />
    </SafeAreaView>
  );
};
