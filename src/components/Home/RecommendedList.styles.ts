import { StyleSheet } from 'react-native';
import { ThemeColors } from '../../providers/ThemeProvider';

export const makeRecommendedStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    title: {
      fontSize: 24,
      color: colors.primaryText,
      fontWeight: 'bold',
      marginBottom: 4,
    },
    titleRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 20,
      marginBottom: 12,
    },
    seeAllButton: {
      paddingVertical: 6,
      paddingHorizontal: 10,
      borderRadius: 6,
    },
    seeAllText: {
      fontSize: 14,
      color: colors.accent,
      fontWeight: '600',
    },
    listContent: {
      paddingHorizontal: 20,
      paddingTop: 6,
    },
    centerContainer: {
      height: 200,
      justifyContent: 'center',
      alignItems: 'center',
    },
    errorText: {
      color: '#ef4444',
      fontSize: 14,
    },
    emptyText: {
      color: colors.secondaryText,
      fontSize: 14,
    },
  });
