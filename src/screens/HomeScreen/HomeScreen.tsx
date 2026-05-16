import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useMemo, useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  TouchableOpacity,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppText } from "../../components/Common/AppText";
import { Header } from "../../components/Common/Header";
import { RecentlyPlayedSection } from "../../components/Home/RecentlyPlayedSection";
import { RecommendedList } from "../../components/Home/RecommendedList";
import PlaylistsSection from "../../components/Home/PlaylistsSection";
import { ListIcon, SearchIcon } from "../../components/Icons";
import { MiniPlayer } from "../../components/Player/MiniPlayer";
import { useTheme } from "../../providers/ThemeProvider";
import { makeStyles } from "./HomeScreen.styles";

export const HomeScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { colors, isDark, toggleTheme } = useTheme();
  const styles = makeStyles(colors);

  const menuItems = useMemo(
    () => [
      {
        key: "home",
        label: "Home",
        icon: "home-outline" as const,
        action: () => setIsSidebarOpen(false),
      },
      {
        key: "liked",
        label: "Liked Songs",
        icon: "heart-outline" as const,
        action: () => {
          setIsSidebarOpen(false);
          navigation.navigate("LikedSongs");
        },
      },
      // 'Recommended Mix' moved to the Home view as a 'See all' link
      {
        key: "playlistManagement",
        label: "Playlists",
        icon: "list-outline" as const,
        action: () => {
          setIsSidebarOpen(false);
          navigation.navigate("PlaylistManagement");
        },
      },
      {
        key: "contact",
        label: "Contact Us",
        icon: "chatbox-ellipses-outline" as const,
        action: () => setIsSidebarOpen(false),
      },
      {
        key: "learn",
        label: "Learn More",
        icon: "help-circle-outline" as const,
        action: () => setIsSidebarOpen(false),
      },
      {
        key: "settings",
        label: "Settings",
        icon: "settings-outline" as const,
        action: () => setIsSidebarOpen(false),
      },
    ],
    [navigation],
  );

  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      <View pointerEvents="none" style={styles.backgroundDecor}>
        <Image
          source={require("../../../assets/images/splash/ellipse1.png")}
          style={[styles.ellipseAsset, styles.ellipse1]}
        />
        <Image
          source={require("../../../assets/images/splash/ellipse3.png")}
          style={[styles.ellipseAsset, styles.ellipse3]}
        />
        <Image
          source={require("../../../assets/images/splash/ellipse4.png")}
          style={[styles.ellipseAsset, styles.ellipse4]}
        />
      </View>

      <Header
        leftIcon={<ListIcon color={colors.primary} width={25} height={14} />}
        rightIcon={<SearchIcon color={colors.primary} width={18} height={18} />}
        onLeftPress={() => setIsSidebarOpen(true)}
        onRightPress={() => navigation.navigate("Search")}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.heroSection}>
          <RecommendedList />
          {/* Playlists section added above Recently Played */}
          <PlaylistsSection />
          <RecentlyPlayedSection />
        </View>

        <View style={{ height: 120 }} />
      </ScrollView>

      <MiniPlayer />

      {isSidebarOpen && (
        <View style={styles.sidebarOverlayWrap}>
          <Pressable
            style={styles.sidebarBackdrop}
            onPress={() => setIsSidebarOpen(false)}
          />

          <View style={styles.sidebarPanel}>
            <View style={styles.sidebarHeaderRow}>
              <TouchableOpacity
                onPress={() => setIsSidebarOpen(false)}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <Ionicons name="close" size={20} color={colors.primaryText} />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.darkModeRow}
                onPress={toggleTheme}
              >
                <Ionicons
                  name={isDark ? "moon" : "moon-outline"}
                  size={24}
                  color={isDark ? colors.accent : colors.secondaryText}
                  style={{ marginRight: 6 }}
                />
              </TouchableOpacity>
            </View>

            <View style={styles.sidebarMenu}>
              {menuItems.map((item) => (
                <TouchableOpacity
                  key={item.key}
                  style={styles.sidebarItem}
                  activeOpacity={0.8}
                  onPress={item.action}
                >
                  <View style={styles.sidebarItemIcon}>
                    <Ionicons
                      name={item.icon}
                      size={17}
                      color={colors.secondaryText}
                    />
                  </View>
                  <View style={styles.sidebarItemLabel}>
                    <AppText
                      fontWeight="medium"
                      style={styles.sidebarItemText}
                      numberOfLines={1}
                    >
                      {item.label}
                    </AppText>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};
