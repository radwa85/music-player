import React from 'react';
import { View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';

import { RecommendedList } from '../../components/Home/RecommendedList';
import {LikedSongsSection} from '../../components/Home/LikedSongsSection/LikedSongsSection';
import { MiniPlayer } from '../../components/Player/MiniPlayer';
import { Header } from '../../components/Common/Header';
import { ListIcon, SearchIcon } from '../../components/Icons';
import { colors } from '../../constants/colors';
import { styles } from './HomeScreen.styles';

export const HomeScreen: React.FC = () => {
  const [fontsLoaded] = useFonts({
    'Gilroy-Regular': require('../../../assets/fonts/Gilroy-Regular.ttf'),
    'Gilroy-Medium': require('../../../assets/fonts/Gilroy-Medium.ttf'),
    'Gilroy-Bold': require('../../../assets/fonts/Gilroy-Bold.ttf'),
  });

  if (!fontsLoaded) return null;

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <Header
        leftIcon={<ListIcon color={colors.primary} width={25} height={14} />}
        rightIcon={<SearchIcon color={colors.primary} width={18} height={18} />}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.heroSection}>
          <RecommendedList />
        </View>

        <LikedSongsSection />

        <View style={{ height: 120 }} />
      </ScrollView>

      <MiniPlayer />
    </SafeAreaView>
  );
};