import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useFonts } from "expo-font";
import React, { useMemo, useState } from "react";
import { Image, Pressable, ScrollView, Switch, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppText } from "../../components/Common/AppText";
import { Header } from "../../components/Common/Header";
import { RecommendedList } from "../../components/Home/RecommendedList";
import { RecentlyPlayedSection } from "../../components/Home/RecentlyPlayedSection";
import { ListIcon, SearchIcon } from "../../components/Icons";
import { MiniPlayer } from "../../components/Player/MiniPlayer";
import { colors as staticColors } from "../../constants/colors";
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
      {
        key: "playlists",
        label: "Playlists",
        icon: "musical-notes-outline" as const,
        action: () => {
          setIsSidebarOpen(false);
          navigation.navigate("Playlists");
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

  const [fontsLoaded] = useFonts({
    "Gilroy-Regular": require("../../../assets/fonts/Gilroy-Regular.ttf"),
    "Gilroy-Medium": require("../../../assets/fonts/Gilroy-Medium.ttf"),
    "Gilroy-Bold": require("../../../assets/fonts/Gilroy-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      {/* Background Decorations */}
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
            {/* ── Sidebar header: close + Dark Mode toggle ── */}
            <View style={styles.sidebarHeaderRow}>
              <TouchableOpacity
                onPress={() => setIsSidebarOpen(false)}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <Ionicons name="close" size={20} color={colors.primaryText} />
              </TouchableOpacity>

              {/* Dark Mode Toggle */}
              <TouchableOpacity style={styles.darkModeRow} onPress={toggleTheme}>
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
                    <AppText fontWeight="medium" style={styles.sidebarItemText} numberOfLines={1}>
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
