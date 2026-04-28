import { StyleSheet } from 'react-native';
import { ThemeColors } from '../../providers/ThemeProvider';

export const makeSignUpStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    scrollContent: {
      paddingHorizontal: 24,
      paddingTop: 64,
      paddingBottom: 32,
    },
    header: {
      alignItems: 'center',
      marginBottom: 28,
    },
    title: {
      fontSize: 32,
      fontWeight: '700',
      color: colors.primaryText,
    },
    subtitle: {
      fontSize: 16,
      fontWeight: '500',
      color: colors.secondaryText,
      marginTop: 6,
    },
    signUpHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 16,
    },
    iconCircle: {
      width: 42,
      height: 42,
      borderRadius: 21,
      backgroundColor: colors.inputBg,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 14,
    },
    signUpTitle: {
      fontSize: 24,
      fontWeight: '700',
      color: colors.primaryText,
    },
    signUpDesc: {
      fontSize: 13,
      fontWeight: '500',
      color: colors.secondaryText,
      marginTop: 2,
    },
    divider: {
      height: 1,
      width: '100%',
      backgroundColor: colors.borderColor,
      marginBottom: 16,
    },
    successMessage: {
      color: '#0F9D58',
      marginBottom: 12,
      fontWeight: '600',
    },
    footer: {
      marginTop: 18,
      alignItems: 'center',
    },
    footerText: {
      color: colors.secondaryText,
      fontSize: 14,
    },
    footerLink: {
      color: colors.accent,
      fontWeight: '700',
    },
  });