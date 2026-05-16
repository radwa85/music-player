import React from 'react';
import { Modal, View, TouchableOpacity, FlatList } from 'react-native';
import { AppText } from '../Common/AppText';
import { Ionicons } from '@expo/vector-icons';
import { makeFilterStyles } from './FilterModal.styles';
import { useTheme } from '../../providers/ThemeProvider';

export type GenreOption = 'pop' | 'rock' | 'jazz' | 'classical' | 'hiphop' | 'electronic' | 'other' | 'all';

interface FilterModalProps {
  visible: boolean;
  onClose: () => void;
  selectedGenre: GenreOption;
  onSelectGenre: (genre: GenreOption) => void;
}

const genres: { label: string; value: GenreOption }[] = [
  { label: 'All', value: 'all' },
  { label: 'Pop', value: 'pop' },
  { label: 'Rock', value: 'rock' },
  { label: 'Jazz', value: 'jazz' },
  { label: 'Classical', value: 'classical' },
  { label: 'Hip Hop', value: 'hiphop' },
  { label: 'Electronic', value: 'electronic' },
  { label: 'Other', value: 'other' },
];

export const FilterModal: React.FC<FilterModalProps> = ({
  visible,
  onClose,
  selectedGenre,
  onSelectGenre,
}) => {
  const handleSelect = (genre: GenreOption) => {
    onSelectGenre(genre);
    onClose();
  };
  const { colors } = useTheme();
  const styles = makeFilterStyles(colors);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <View style={styles.header}>
            <AppText style={styles.title}>Filter by genre</AppText>
            <TouchableOpacity onPress={onClose} style={styles.closeIcon}>
              <Ionicons name="close" size={24} color={colors.primaryText} />
            </TouchableOpacity>
          </View>

          <FlatList
            data={genres}
            keyExtractor={(item) => item.value}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  styles.genreItem,
                  selectedGenre === item.value && styles.selectedGenreItem,
                ]}
                onPress={() => handleSelect(item.value)}
              >
                <AppText
                  style={[
                    styles.genreText,
                    selectedGenre === item.value && styles.selectedGenreText,
                  ]}
                >
                  {item.label}
                </AppText>
                {selectedGenre === item.value && (
                  <Ionicons name="checkmark" size={20} color={colors.primaryOrange} />
                )}
              </TouchableOpacity>
            )}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContent}
          />
        </View>
      </View>
    </Modal>
  );
};