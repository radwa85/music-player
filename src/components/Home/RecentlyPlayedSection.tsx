import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { FlatList, Image, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AppText } from '../Common/AppText';
import { useAudio } from '../../providers/AudioProvider';
import { useTheme } from '../../providers/ThemeProvider';
import { makeRecentlyPlayedStyles } from './RecentlyPlayedSection.styles';

export const RecentlyPlayedSection: React.FC = () => {
  const { colors } = useTheme();
  const styles = makeRecentlyPlayedStyles(colors);

  const navigation = useNavigation<any>();
  const { recentlyPlayed, currentTrack, isPlaying, playTrack } = useAudio();

  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <View style={{ flex: 1 }}>
          <AppText fontWeight="bold" style={styles.sectionTitle}>
            Recently Played
          </AppText>
          <AppText style={styles.sectionSubtitle}>
            Jump back into the tracks you listened to most recently
          </AppText>
        </View>
      </View>

      {recentlyPlayed.length === 0 ? (
        <View style={styles.emptyCard}>
          <AppText style={styles.emptyText}>Your recent plays will appear here</AppText>
        </View>
      ) : (
        <FlatList
          data={recentlyPlayed}
          keyExtractor={(item) => String(item.id)}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => {
            const isActive = currentTrack?.id === item.id;

            return (
              <TouchableOpacity
                style={styles.card}
                onPress={() => playTrack(item, recentlyPlayed)}
                activeOpacity={0.85}
              >
                <View style={styles.imageWrapper}>
                  <Image source={{ uri: item.cover_url }} style={styles.image} resizeMode="cover" />
                  <View style={styles.overlay}>
                    <Ionicons
                      name={isActive && isPlaying ? 'pause-circle' : 'play-circle'}
                      size={40}
                      color="#fff"
                    />
                  </View>
                </View>
                <View style={{ alignItems: 'center' }}>
                  <AppText fontWeight="500" style={styles.cardTitle} numberOfLines={1}>
                    {item.title}
                  </AppText>
                  <AppText style={styles.cardArtist} numberOfLines={1}>
                    {item.artist}
                  </AppText>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      )}
    </View>
  );
};