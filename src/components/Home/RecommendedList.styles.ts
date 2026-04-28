import { StyleSheet } from 'react-native';
import { ThemeColors } from '../../providers/ThemeProvider';

export const makeRecommendedStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    title: {
      fontSize: 24,
      color: colors.primaryText,
      fontWeight: 'bold',
      marginBottom: 16,
      paddingHorizontal: 20,
    },
    listContent: {
      paddingHorizontal: 20,
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
