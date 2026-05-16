import { StyleSheet } from "react-native";
import { ThemeColors } from "../../providers/ThemeProvider";

export const makeLoginStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background },
    content: { flex: 1, paddingHorizontal: 24, paddingTop: 80 },

    welcome: {
      fontSize: 32,
      fontWeight: "bold",
      color: colors.primaryText,
      marginBottom: 8,
    },
    subtitle: {
      fontSize: 16,
      color: colors.accent,
      marginBottom: 24,
      fontWeight: "500",
    },

    divider: {
      height: 1,
      backgroundColor: colors.borderColor,
      marginVertical: 24,
    },

    sectionHeader: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 32,
    },
    iconCircle: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: colors.inputBg,
      alignItems: "center",
      justifyContent: "center",
      marginRight: 12,
    },
    sectionTitle: {
      fontSize: 24,
      fontWeight: "600",
      color: colors.primaryText,
      marginBottom: 4,
    },
    sectionSubtitle: { fontSize: 14, color: colors.secondaryText },

    inputContainer: { marginBottom: 24 },
    label: {
      fontSize: 14,
      fontWeight: "500",
      color: colors.primaryText,
      marginBottom: 8,
    },

    inputWrapper: {
      flexDirection: "row",
      alignItems: "center",
      borderRadius: 12,
      paddingHorizontal: 12,
      backgroundColor: colors.inputBg,
    },
    inputWrapperPassword: {
      flexDirection: "row",
      alignItems: "center",
      borderRadius: 12,
      paddingHorizontal: 12,
      backgroundColor: colors.inputBg,
    },
    inputIcon: {
      marginRight: 8,
    },
    inputEmail: {
      flex: 1,
      paddingVertical: 12,
      fontSize: 16,
      color: colors.primaryText,
    },
    inputPassword: {
      flex: 1,
      paddingVertical: 12,
      fontSize: 16,
      color: colors.primaryText,
    },
    authPrompt: {
      fontSize: 14,
      color: colors.secondaryText,
      textAlign: "center",
    },
    authLink: {
      color: colors.accent,
      fontWeight: "600",
    },

    rememberMeContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 8,
      marginTop: -8,
      paddingHorizontal: 6,
      borderRadius: 12,
    },
    rememberMeCheckbox: {
      width: 20,
      height: 20,
      borderRadius: 6,
      borderWidth: 2,
      marginRight: 10,
      justifyContent: "center",
      alignItems: "center",
    },
    rememberMeText: {
      fontSize: 14,
      fontWeight: "500",
      color: colors.primaryText,
    },
  });
