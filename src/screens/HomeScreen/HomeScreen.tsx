import { useNavigation } from "@react-navigation/native";
import { useFonts } from "expo-font";
import React from "react";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Header } from "../../components/Common/Header";
import { LikedSongsSection } from "../../components/Home/LikedSongsSection/LikedSongsSection";
import { RecommendedList } from "../../components/Home/RecommendedList";
import { ListIcon, SearchIcon } from "../../components/Icons";
import { MiniPlayer } from "../../components/Player/MiniPlayer";
import { colors } from "../../constants/colors";
import { styles } from "./HomeScreen.styles";

import { RecentlyPlayedSection } from "../../components/Home/RecentlyPlayedSection/RecentlyPlayedSection";
export const HomeScreen: React.FC = () => {
  const navigation = useNavigation<any>();
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
        onRightPress={() => navigation.navigate("Search")}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.heroSection}>
          <RecommendedList />
          <RecentlyPlayedSection />
          <LikedSongsSection />
        </View>

        <View style={{ height: 120 }} />
      </ScrollView>

      <MiniPlayer />
    </SafeAreaView>
  );
};
