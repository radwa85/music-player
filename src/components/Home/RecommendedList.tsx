import React, { useEffect, useState } from 'react';
import { View, FlatList, ActivityIndicator } from 'react-native';
import { AppText } from '../Common/AppText';
import { homeService } from '../../services/homeService';
import { Track } from '../../types/track';
import { SongCard } from './SongCard';
import { styles } from './RecommendedList.styles';
import { colors } from '../../constants/colors';

export const RecommendedList: React.FC = () => {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTracks = async () => {
      try {
        setLoading(true);
        const data = await homeService.getRecommendations();
        setTracks(data);
        setError(null);
      } catch (err) {
        setError('Failed to load recommendations');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTracks();
  }, []);

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color={colors.primaryOrange} />
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
    <View >
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
