import React, { useEffect, useState } from 'react';
import { View, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { useTheme } from '../../providers/ThemeProvider';
import { RootState } from '../../redux/store';
import { playlistService } from '../../services/playlistService';
import PlaylistCard from '../Playlist/PlaylistCard';
import { makePlaylistsSectionStyles } from './PlaylistsSection.styles';
import { AppText } from '../Common/AppText';
import { useNavigation } from '@react-navigation/native';

export const PlaylistsSection: React.FC = () => {
  const { colors } = useTheme();
  const styles = makePlaylistsSectionStyles(colors);
  const navigation = useNavigation<any>();
  const { token } = useSelector((s: RootState) => s.auth);

  const [playlists, setPlaylists] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const data = await playlistService.getPlaylists(token || '');
        setPlaylists(data || []);
      } catch (err) {
        console.warn('Failed to load playlists for Home', err);
        setPlaylists([]);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [token]);

  if (loading) {
    return (
      <View style={styles.section}>
        <View style={styles.headerRow}>
          <AppText fontWeight="bold" style={styles.title}>Playlists</AppText>
        </View>
        <ActivityIndicator color={colors.accent} style={{ marginLeft: 20 }} />
      </View>
    );
  }

  return (
    <View style={styles.section}>
      <View style={styles.headerRow}>
        <AppText fontWeight="bold" style={styles.title}>Playlists</AppText>
        <TouchableOpacity onPress={() => navigation.navigate('PlaylistManagement')}>
          <AppText style={{ color: colors.accent, fontWeight: '600' }}>See all</AppText>
        </TouchableOpacity>
      </View>

      {playlists.length === 0 ? (
        <View style={styles.empty}>
          <AppText style={{ color: colors.secondaryText }}>No playlists available</AppText>
        </View>
      ) : (
        <FlatList
          data={playlists}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => String(item.id)}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => (
            <PlaylistCard
              playlist={item}
              onPress={() => navigation.navigate('PlaylistDetail', { playlistId: item.id, readOnly: false })}
              style={{ width: 190, marginRight: 16 }}
            />
          )}
        />
      )}
    </View>
  );
};

export default PlaylistsSection;
