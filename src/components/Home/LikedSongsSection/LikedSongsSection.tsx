import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  TouchableOpacity,
  View,
} from "react-native";

import { colors } from "../../../constants/colors";
import { useAudio } from "../../../providers/AudioProvider";
import { likedApi } from "../../../services/LikedService";
import { Track } from "../../../types/track";
import { AppText } from "../../Common/AppText";
import { styles } from "./LikedSongsSection.styles";

export const LikedSongsSection: React.FC = () => {
  const navigation = useNavigation();
  const { currentTrack, isPlaying, playTrack } = useAudio();

  const [likedTracks, setLikedTracks] = useState<Track[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    likedApi
      .getLikedSongs()
      .then(setLikedTracks)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingRow}>
        <ActivityIndicator size="small" color={colors.primary} />
      </View>
    );
  }

  return (
    <View style={styles.section}>
      {/* Section header */}
      <View style={styles.sectionHeader}>
        <AppText fontWeight="bold" style={styles.sectionTitle}>
          Liked Songs
        </AppText>
        <TouchableOpacity
          onPress={() => navigation.navigate("LikedSongs" as never)}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <AppText style={styles.seeAll}>See all</AppText>
        </TouchableOpacity>
      </View>

      {likedTracks.length === 0 ? (
        <TouchableOpacity
          style={styles.emptyCard}
          onPress={() => navigation.navigate("LikedSongs" as never)}
          activeOpacity={0.7}
        >
          <Ionicons
            name="heart-outline"
            size={28}
            color={colors.secondaryText}
          />
          <AppText style={styles.emptyText}>No liked songs yet</AppText>
        </TouchableOpacity>
      ) : (
        <FlatList
          data={likedTracks}
          keyExtractor={(item) => String(item.id)}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => {
            const isActive = currentTrack?.id === item.id;
            return (
              <TouchableOpacity
                style={styles.card}
                onPress={() => playTrack(item)}
                activeOpacity={0.85}
              >
                <View style={styles.imageWrapper}>
                  <Image
                    source={{ uri: item.cover_url }}
                    style={styles.image}
                  />
                  {isActive && (
                    <View style={styles.overlay}>
                      <Ionicons
                        name={isPlaying ? "pause-circle" : "play-circle"}
                        size={32}
                        color="#fff"
                      />
                    </View>
                  )}
                </View>
                <AppText
                  fontWeight="bold"
                  style={styles.cardTitle}
                  numberOfLines={1}
                >
                  {item.title}
                </AppText>
                <AppText style={styles.cardArtist} numberOfLines={1}>
                  {item.artist}
                </AppText>
              </TouchableOpacity>
            );
          }}
        />
      )}
    </View>
  );
};
