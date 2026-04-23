import React, { useEffect } from 'react';
import { View, TextInput, FlatList, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { setQuery, clearSearch, fetchSearchResults } from '../../store/slices/searchSlice';
import { RootState, AppDispatch } from '../../store';
import { SearchIcon, MusicSearchIcon } from '../../components/Icons';
import { SearchSongCard } from '../../components/Search/SearchSongCard';
import { MiniPlayer } from '../../components/Player/MiniPlayer';
import { AppText } from '../../components/Common/AppText';
import { colors } from '../../constants/colors';
import { styles } from './SearchScreen.styles';

export const SearchScreen: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { query, results, loading, error } = useSelector((state: RootState) => state.search);

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

    if (results.length === 0) {
      return (
        <View style={styles.emptyContainer}>
          <AppText style={styles.emptyText}>No results found for "{query}"</AppText>
        </View>
      );
    }

    return (
      <FlatList
        data={results}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={{ gap: 16 }}
        renderItem={({ item }) => (
          <View style={{ flex: 1 }}>
            <SearchSongCard track={item} />
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
          <SearchIcon color={colors.unactiveTextIcon} width={20} height={20} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search"
            placeholderTextColor={colors.unactiveTextIcon}
            value={query}
            onChangeText={(text) => dispatch(setQuery(text))}
            autoFocus
          />
        </View>
      </View>
      <View style={styles.contentContainer}>
        {renderContent()}
      </View>
      <MiniPlayer />
    </SafeAreaView>
  );
};
