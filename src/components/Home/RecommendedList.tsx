import React, { useEffect, useState } from 'react';
import { View, FlatList, ActivityIndicator } from 'react-native';
import { useSelector } from 'react-redux';
import { AppText } from '../Common/AppText';
import { homeService } from '../../services/homeService';
import { Track } from '../../types/track';
import { SongCard } from './SongCard';
import { makeRecommendedStyles } from './RecommendedList.styles';
import { useTheme } from '../../providers/ThemeProvider';
import { RootState } from '../../redux/store';

export const RecommendedList: React.FC = () => {
  const { colors } = useTheme();
  const styles = makeRecommendedStyles(colors);
  
  const [tracks, setTracks] = useState<Track[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { token } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    const fetchTracks = async () => {
      try {
        if (!token) {
          setError('Not authenticated. Please login again.');
          setLoading(false);
          return;
        }

        setLoading(true);
        const data = await homeService.getRecommendations(token);
        setTracks(data);
        setError(null);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to load recommendations';
        setError(errorMessage);
        console.error('Recommendations error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTracks();
  }, [token]);

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color={colors.accent} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <AppText style={styles.errorText}>{error}</AppText>
      </View>
    );
  }

  if (tracks.length === 0) {
    return (
      <View style={styles.centerContainer}>
        <AppText style={styles.emptyText}>No recommendations found</AppText>
      </View>
    );
  }

  return (
    <View>
      <AppText fontWeight="bold" style={styles.title}>Recommended for you</AppText>
      <FlatList
        data={tracks}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => <SongCard track={item} playlist={tracks} />}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};
