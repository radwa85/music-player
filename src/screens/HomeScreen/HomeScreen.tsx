import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useFonts } from "expo-font";
import React, { useMemo, useState } from "react";
import { Pressable, ScrollView, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppText } from "../../components/Common/AppText";
import { Header } from "../../components/Common/Header";
import { RecommendedList } from "../../components/Home/RecommendedList";
import { ListIcon, SearchIcon } from "../../components/Icons";
import { MiniPlayer } from "../../components/Player/MiniPlayer";
import { colors } from "../../constants/colors";
import { styles } from "./HomeScreen.styles";

export const HomeScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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
        action: () => setIsSidebarOpen(false),
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
                <Ionicons name="close" size={18} color={colors.primaryText} />
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
                  <Ionicons
                    name={item.icon}
                    size={15}
                    color={colors.secondaryText}
                    style={styles.sidebarItemIcon}
                  />
                  <AppText style={styles.sidebarItemLabel}>
                    {item.label}
                  </AppText>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};
