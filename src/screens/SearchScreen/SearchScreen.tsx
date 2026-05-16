import React, { useEffect, useMemo, useState } from 'react';
import { View, TextInput, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { setQuery, clearSearch, fetchSearchResults } from '../../store/slices/searchSlice';
import { RootState, AppDispatch } from '../../store';
import { SearchIcon, MusicSearchIcon } from '../../components/Icons';
import { SearchSongCard } from '../../components/Search/SearchSongCard';
import { MiniPlayer } from '../../components/Player/MiniPlayer';
import { AppText } from '../../components/Common/AppText';
import { FilterModal, GenreOption } from '../../components/filter/FilterModal';
import { makeSearchStyles } from './SearchScreen.styles';
import { useTheme } from '../../providers/ThemeProvider';

export const SearchScreen: React.FC = () => {
  const { colors } = useTheme();
  const styles = makeSearchStyles(colors);
  const dispatch = useDispatch<AppDispatch>();
  const { query, results, loading, error } = useSelector((state: RootState) => state.search);
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState<GenreOption>('all');

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (query.trim().length > 0) {
        dispatch(fetchSearchResults(query));
      } else {
        dispatch(clearSearch());
      }
    }, 500);
    return () => clearTimeout(delayDebounceFn);
  }, [query, dispatch]);

  const filteredResults = useMemo(() => {
    if (!results.length) return [];
    if (selectedGenre === 'all') return results;

    const filtered = results.filter(track => {
      const trackGenre = track.genre?.toLowerCase();
      return trackGenre === selectedGenre;
    });

    console.log(`Filter: selected=${selectedGenre}, total=${results.length}, filtered=${filtered.length}`);
    return filtered;
  }, [results, selectedGenre]);

  const renderContent = () => {
    if (loading) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primaryOrange} />
        </View>
      );
    }
    if (error) {
      return (
        <View style={styles.errorContainer}>
          <AppText style={styles.errorText}>{error}</AppText>
        </View>
      );
    }
    if (query.trim().length === 0) {
      return (
        <View style={styles.exploreContainer}>
          <MusicSearchIcon color={colors.primaryOrange} width={64} height={64} />
          <AppText fontWeight="bold" style={styles.exploreTitle}>Explore</AppText>
          <AppText style={styles.exploreSubtitle}>Search for your favorite tracks and artists</AppText>
        </View>
      );
    }
    if (filteredResults.length === 0) {
      const emptyMessage = `No results found for "${query}"${selectedGenre !== 'all' ? ` in genre "${selectedGenre}"` : ''}`;
      return (
        <View style={styles.emptyContainer}>
          <AppText style={styles.emptyText}>{emptyMessage}</AppText>
        </View>
      );
    }
    return (
      <FlatList
        data={filteredResults}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={{ gap: 16 }}
        renderItem={({ item }) => (
          <View style={{ flex: 1 }}>
            <SearchSongCard track={item} playlist={results} />
          </View>
        )}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <View style={styles.header}>
        <View style={styles.searchInputContainer}>
          <SearchIcon color={colors.primaryText} width={20} height={20} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search"
            placeholderTextColor={colors.primaryText}
            value={query}
            onChangeText={(text) => dispatch(setQuery(text))}
            autoFocus
          />
          <TouchableOpacity onPress={() => setFilterModalVisible(true)} style={styles.filterIconButton}>
            <Ionicons name="options-outline" size={24} color={colors.primaryText} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.contentContainer}>
        {renderContent()}
      </View>
      <MiniPlayer />

      <FilterModal
        visible={filterModalVisible}
        onClose={() => setFilterModalVisible(false)}
        selectedGenre={selectedGenre}
        onSelectGenre={setSelectedGenre}
      />
    </SafeAreaView>
  );
};