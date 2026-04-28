import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  Pressable,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { AppText } from '../../components/Common/AppText';
import { MiniPlayer } from '../../components/Player/MiniPlayer';
import { colors } from '../../constants/colors';
import { RootState } from '../../redux/store';
import { useAudio } from '../../providers/AudioProvider';
import { playlistService, PlaylistGroup } from '../../services/playlistService';
import { Track } from '../../types/track';
import { makePlaylistsStyles } from './Playlists.styles';
import { useTheme } from '../../providers/ThemeProvider';

type SortOption = 'title' | 'artist' | 'duration';

export const PlaylistsScreen: React.FC = () => {
  const { colors } = useTheme();
  const styles = makePlaylistsStyles(colors);
  const navigation = useNavigation<any>();
  const { token } = useSelector((state: RootState) => state.auth);
  const { playTrack, currentTrack, isPlaying } = useAudio();
  const [playlists, setPlaylists] = useState<PlaylistGroup[]>([]);
  const [selectedPlaylistId, setSelectedPlaylistId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const featuredCardWidth = 200;
  const screenWidth = Dimensions.get('window').width;
  const horizontalSpacer = Math.max((screenWidth - featuredCardWidth) / 2, 20);

  const loadPlaylists = async () => {
    try {
      if (!token) {
        setError('Not authenticated. Please login again.');
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);
      const data = await playlistService.getPlaylists(token);
      // Filter out "Other" playlist
      const filteredData = data.filter((playlist) => playlist.title !== 'Other');
      setPlaylists(filteredData);
      setSelectedPlaylistId((current) => current ?? filteredData[0]?.id ?? null);
    } catch (err) {
      console.error(err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to load playlists';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPlaylists();
  }, [token]);

  const selectedPlaylist = useMemo(
    () => playlists.find((playlist) => playlist.id === selectedPlaylistId) || playlists[0],
    [playlists, selectedPlaylistId],
  );

  const handlePlayAll = (tracks: Track[]) => {
    if (tracks.length > 0) {
      playTrack(tracks[0], tracks);
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <AppText style={styles.errorText}>{error}</AppText>
          <TouchableOpacity style={styles.retryButton} onPress={loadPlaylists}>
            <AppText style={styles.retryText}>Try Again</AppText>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons name="arrow-back" size={24} color={colors.primaryText} />
        </TouchableOpacity>
        <AppText fontWeight="bold" style={styles.headerTitle}>
          Playlists
        </AppText>
        <View style={styles.headerSpacer} />
      </View>

      <FlatList
        data={playlists}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.playlistsList}
        ListHeaderComponent={<View style={{ width: horizontalSpacer }} />}
        ListFooterComponent={<View style={{ width: horizontalSpacer }} />}
        renderItem={({ item }) => {
          const isSelected = item.id === selectedPlaylist?.id;
          return (
            <TouchableOpacity
              style={[styles.playlistCard, isSelected && { transform: [{ scale: 1.02 }] }]}
              onPress={() => setSelectedPlaylistId(item.id)}
              activeOpacity={0.85}
            >
              <View style={styles.playlistArt}>
                <Image source={{ uri: item.cover_url }} style={styles.playlistImage} />
                <View style={styles.playlistOverlay}>
                  <Ionicons name="musical-notes" size={26} color="#fff" />
                  <AppText fontWeight="bold" style={{ color: '#fff', fontSize: 18, marginTop: 8 }}>
                    {item.title}
                  </AppText>
                  <AppText style={styles.playlistTrackCount}>
                    {item.tracks.length} tracks
                  </AppText>
                </View>
              </View>
              <AppText fontWeight="bold" style={styles.playlistTitle} numberOfLines={1}>
                {item.title}
              </AppText>
              <AppText style={styles.playlistDescription} numberOfLines={2}>
                {item.description}
              </AppText>
            </TouchableOpacity>
          );
        }}
      />

      {selectedPlaylist ? (
        <>
          <View style={styles.tracksHeader}>
            <AppText fontWeight="bold" style={styles.sectionTitle}>
              {selectedPlaylist.title}
            </AppText>
            <TouchableOpacity onPress={() => handlePlayAll(selectedPlaylist.tracks)}>
              <AppText style={{ color: colors.primaryOrange, fontWeight: '700' }}>
                Play all
              </AppText>
            </TouchableOpacity>
          </View>

          <FlatList
            data={selectedPlaylist.tracks}
            keyExtractor={(item) => String(item.id)}
            contentContainerStyle={styles.tracksList}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => {
              const isActive = currentTrack?.id === item.id;
              const minutes = Math.floor(item.duration / 60);
              const seconds = item.duration % 60;
              const durationString = `${minutes}:${seconds.toString().padStart(2, '0')}`;
              return (
                <TouchableOpacity
                  style={styles.trackItem}
                  activeOpacity={0.85}
                  onPress={() => playTrack(item, selectedPlaylist.tracks)}
                >
                  <Image source={{ uri: item.cover_url }} style={styles.trackImage} />
                  <View style={styles.trackInfo}>
                    <AppText fontWeight="bold" style={styles.trackTitle} numberOfLines={1}>
                      {item.title}
                    </AppText>
                    <AppText style={styles.trackArtist} numberOfLines={1}>
                      {item.artist}
                    </AppText>
                  </View>
                  <AppText style={styles.trackDuration}>{durationString}</AppText>
                  <TouchableOpacity style={styles.menuButton}>
                    <Ionicons name="ellipsis-vertical" size={20} color={colors.primaryText} />
                  </TouchableOpacity>
                </TouchableOpacity>
              );
            }}
          />
        </>
      ) : null}

      <MiniPlayer />
    </SafeAreaView>
  );
};