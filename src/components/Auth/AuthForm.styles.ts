import { StyleSheet } from 'react-native';
import { ThemeColors } from '../../providers/ThemeProvider';

export const makeAuthFormStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    formContainer: {
      marginTop: 8,
    },
    label: {
      marginBottom: 8,
      color: colors.primaryText,
      fontSize: 14,
      fontWeight: '600',
    },
    inputWrapper: {
      position: 'relative',
      justifyContent: 'center',
      marginBottom: 6,
    },
    input: {
      borderWidth: 1,
      borderColor: colors.borderColor,
      paddingLeft: 38,
      paddingRight: 14,
      height: 48,
      borderRadius: 12,
      backgroundColor: colors.inputBg,
      color: colors.primaryText,
      fontSize: 15,
    },
    icon: {
      position: 'absolute',
      left: 12,
      zIndex: 2,
    },
    errorText: {
      color: '#D14343',
      fontSize: 12,
      marginBottom: 10,
    },
    button: {
      marginTop: 10,
      backgroundColor: colors.accent,
      paddingVertical: 14,
      borderRadius: 14,
      alignItems: 'center',
    },
    buttonRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 10,
    },
    buttonText: {
      color: '#FFFFFF',
      fontSize: 16,
      fontWeight: '700',
    },
  });