import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { Image, ScrollView, View } from "react-native";
import { colors } from "../../../constants/colors";
import { historyService } from "../../../services/historyService";
import { Track } from "../../../types/track";
import { AppText } from "../../Common/AppText";

import { styles } from "./RecentlyPlayedSection.styles";
export const RecentlyPlayedSection = () => {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await historyService.getHistory();
        setTracks(data);
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  if (loading) {
    return <AppText>Loading...</AppText>;
  }

  if (!tracks.length) {
    return (
      <View style={styles.emptyContainer}>
        <Ionicons
          name="musical-notes-outline"
          size={40}
          color={colors.primaryText}
          style={{ marginBottom: 10 }}
        />

        <AppText fontWeight="bold" style={styles.emptyTitle}>
          No recently played songs
        </AppText>

        <AppText style={styles.emptySubtitle}>
          Start playing music and your history will appear here 🎧
        </AppText>
      </View>
    );
  }
  return (
    <View style={{ marginTop: 20 }}>
      <AppText fontWeight="bold">Recently Played</AppText>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {tracks.map((item) => (
          <View key={item.id} style={{ width: 120, marginRight: 12 }}>
            <Image
              source={{ uri: item.cover_url }}
              style={{ width: 120, height: 120, borderRadius: 10 }}
            />
            <AppText numberOfLines={1}>{item.title}</AppText>
            <AppText numberOfLines={1}>{item.artist}</AppText>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};
