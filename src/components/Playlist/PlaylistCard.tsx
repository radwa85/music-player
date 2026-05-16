import { Ionicons } from "@expo/vector-icons";
import React, { useRef } from "react";
import {
    Animated,
    ImageBackground,
    StyleProp,
    StyleSheet,
    TouchableWithoutFeedback,
    View,
    ViewStyle
} from "react-native";
import { PLAYLIST_PLACEHOLDER } from "../../assets/playlistPlaceholder";
import { AppText } from "../../components/Common/AppText";
import { useTheme } from "../../providers/ThemeProvider";
import { PlaylistGroup } from "../../types/playlist";

type Props = {
  playlist: PlaylistGroup;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
};

export const PlaylistCard: React.FC<Props> = ({ playlist, onPress, style }) => {
  const { colors } = useTheme();
  const scale = useRef(new Animated.Value(1)).current;

  const handlePressIn = () =>
    Animated.spring(scale, { toValue: 0.97, useNativeDriver: true }).start();
  const handlePressOut = () =>
    Animated.spring(scale, { toValue: 1, useNativeDriver: true }).start();

  const firstCover =
    playlist.tracks && playlist.tracks.length > 0
      ? playlist.tracks[0].cover_url
      : playlist.cover_url;

  return (
    <TouchableWithoutFeedback
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      accessibilityLabel={`Open playlist ${playlist.title}`}
    >
      <Animated.View
        style={[styles.container, { transform: [{ scale }] }, style] as any}
      >
        {/* Image square */}
        <View style={[styles.imageWrapper, { backgroundColor: colors.cardBg || colors.surface }]} pointerEvents="none">
          {firstCover ? (
            <ImageBackground
              source={{ uri: firstCover }}
              style={styles.imageInnerWrapper}
              imageStyle={{ borderRadius: 10 }}
            />
          ) : (
            <ImageBackground
              source={PLAYLIST_PLACEHOLDER}
              style={styles.imageInnerWrapper}
              imageStyle={{
                borderRadius: 10,
                backgroundColor: colors.inactiveBar,
              }}
            >
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Ionicons
                  name="musical-notes"
                  size={30}
                  color={colors.secondaryText}
                />
              </View>
            </ImageBackground>
          )}
        </View>

        {/* Title only (no description) */}
        <View style={styles.cardInfo}>
          <AppText
            fontWeight="bold"
            style={[styles.title, { color: colors.primaryText }]}
            numberOfLines={1}
          >
            {playlist.title}
          </AppText>
        </View>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

export default PlaylistCard;

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    overflow: "visible",
    alignItems: "center",
    paddingVertical: 4,
  },
    imageWrapper: {
    width: "100%",
    aspectRatio: 1,
    borderRadius: 12,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 10,
    elevation: 4,
  },
  imageInnerWrapper: {
    width: "100%",
    height: "100%",
  },
  cardInfo: {
    marginTop: 8,
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 6,
  },
  title: {
    fontSize: 13,
    fontWeight: "700",
    letterSpacing: -0.2,
  },
  desc: {
    fontSize: 11,
    fontWeight: "600",
    marginTop: 2,
  },
});
