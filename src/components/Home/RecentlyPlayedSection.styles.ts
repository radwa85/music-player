import { StyleSheet } from 'react-native';
import { ThemeColors } from '../../providers/ThemeProvider';

export const makeRecentlyPlayedStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    section: {
      marginTop: 32,
      marginBottom: 16,
    },
    sectionHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 20,
      marginBottom: 16,
    },
    sectionTitle: {
      fontSize: 24,
      color: colors.primaryText,
      fontWeight: 'bold',
      marginBottom: 4,
    },
    sectionSubtitle: {
      fontSize: 13,
      color: colors.secondaryText,
      lineHeight: 18,
    },
    listContent: {
      paddingHorizontal: 20,
    },
    card: {
      width: 190,
      height: 240,
      marginRight: 16,
      marginBottom: 20,
    },
    imageWrapper: {
      width: 190,
      height: 190,
      borderRadius: 8,
      overflow: 'hidden',
      marginBottom: 0,
      backgroundColor: colors.inactiveBar,
    },
    image: {
      width: '100%',
      height: '100%',
    },
    overlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: 'rgba(0,0,0,0.3)',
      alignItems: 'center',
      justifyContent: 'center',
    },
    cardTitle: {
      fontSize: 16,
      color: colors.primaryText,
      marginBottom: 2,
      fontWeight: '500',
      marginTop: 10,
      textAlign: 'center',
    },
    cardArtist: {
      fontSize: 10,
      color: colors.secondaryText,
      fontWeight: '400',
      marginTop: 2,
      textAlign: 'center',
    },
    emptyCard: {
      marginHorizontal: 20,
      height: 100,
      borderRadius: 12,
      borderWidth: 1.5,
      borderColor: colors.borderColor,
      borderStyle: 'dashed',
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 16,
    },
    emptyText: {
      fontSize: 14,
      color: colors.secondaryText,
      textAlign: 'center',
    },
  });