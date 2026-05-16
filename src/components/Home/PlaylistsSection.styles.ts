import { StyleSheet } from 'react-native';
import { ThemeColors } from '../../providers/ThemeProvider';

export const makePlaylistsSectionStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    // Match spacing used by other home sections (e.g. Recently Played)
    section: {
      marginTop: 32,
      marginBottom: 16,
    },
    headerRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 20,
      marginBottom: 12,
    },
    title: {
      fontSize: 24,
      color: colors.primaryText,
      fontWeight: '700',
      marginBottom: 4,
    },
    listContent: {
      paddingHorizontal: 20,
    },
    empty: {
      height: 100,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
