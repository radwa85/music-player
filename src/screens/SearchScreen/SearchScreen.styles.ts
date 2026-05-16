import { StyleSheet } from 'react-native';
import { ThemeColors } from '../../providers/ThemeProvider';

export const makeSearchStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    header: {
      paddingHorizontal: 20,
      paddingTop: 10,
      paddingBottom: 5,
    },
    searchInputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.inputBg,
      borderRadius: 8,
      borderWidth: 2,
      borderColor: colors.accent,
      paddingHorizontal: 12,
      paddingVertical: 4,
      marginTop: 10,
    },
    searchInput: {
      flex: 1,
      marginLeft: 10,
      fontSize: 16,
      color: colors.primaryText,
      fontFamily: 'Gilroy-Medium',
    },
    filterIconButton: {
      padding: 8,
      marginLeft: 4,
    },
    contentContainer: {
      flex: 1,
      paddingHorizontal: 20,
      paddingTop: 15,
    },
    exploreContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    exploreTitle: {
      fontSize: 24,
      color: colors.accent,
      marginBottom: 8,
      marginTop: 16,
    },
    exploreSubtitle: {
      fontSize: 14,
      color: colors.secondaryText,
      textAlign: 'center',
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    errorContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    errorText: {
      color: '#D14343',
      fontSize: 16,
    },
    emptyContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    emptyText: {
      color: colors.secondaryText,
      fontSize: 16,
    },
    listContent: {
      paddingBottom: 20,
    },
    modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.5)',
      justifyContent: 'flex-end',
    },
    modalContent: {
      backgroundColor: colors.surface,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      padding: 20,
    },
    modalTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: colors.primaryText,
      marginBottom: 20,
      textAlign: 'center',
    },
    filterOption: {
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor: colors.borderColor,
    },
    closeButton: {
      marginTop: 20,
      paddingVertical: 12,
      backgroundColor: colors.accent,
      borderRadius: 8,
      alignItems: 'center',
    },
    closeText: {
      color: '#fff',
      fontWeight: 'bold',
    },
  });