import { StyleSheet } from "react-native";
import { ThemeColors } from "../../providers/ThemeProvider";

export const makePlaylistsStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    header: {
      paddingHorizontal: 20,
      paddingTop: 12,
      paddingBottom: 10,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    headerTitle: {
      fontSize: 24,
      color: colors.primaryText,
    },
    headerSpacer: {
      width: 32,
    },
    content: {
      paddingBottom: 120,
    },
    loadingContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    errorContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: 24,
    },
    errorText: {
      color: "#D14343",
      textAlign: "center",
      marginBottom: 14,
    },
    retryButton: {
      backgroundColor: colors.accent,
      borderRadius: 12,
      paddingHorizontal: 18,
      paddingVertical: 10,
    },
    retryText: {
      color: "#fff",
      fontWeight: "700",
    },
    hero: {
      paddingHorizontal: 20,
      paddingBottom: 16,
    },
    heroTitle: {
      fontSize: 30,
      color: colors.primaryText,
      marginBottom: 8,
    },
    heroSubtitle: {
      fontSize: 14,
      color: colors.secondaryText,
      lineHeight: 20,
    },
    sectionTitle: {
      fontSize: 18,
      color: colors.primaryText,
      marginBottom: 12,
    },
    playlistsList: {
      paddingHorizontal: 0,
    },
    playlistCard: {
      width: 200,
      marginRight: 14,
      marginBottom: 30,
      shadowColor: "#000",
      shadowOpacity: 0.16,
      shadowRadius: 10,
      shadowOffset: { width: 0, height: 4 },
      elevation: 6,
    },
    playlistArt: {
      width: "100%",
      height: 200,
      borderRadius: 14,
      overflow: "hidden",
      backgroundColor: colors.inactiveBar,
    },
    playlistImage: {
      width: "100%",
      height: "100%",
    },
    playlistOverlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: "rgba(9, 17, 39, 0.18)",
      justifyContent: "flex-start",
      alignItems: "center",
      paddingTop: 24,
      paddingHorizontal: 14,
      paddingBottom: 14,
    },
    playlistTrackCount: {
      color: "#fff",
      fontSize: 12,
      marginTop: 4,
    },
    playlistTitle: {
      fontSize: 16,
      color: colors.primaryText,
      marginTop: 10,
    },
    playlistDescription: {
      fontSize: 12,
      color: colors.secondaryText,
      marginTop: 4,
    },
    tracksHeader: {
      paddingHorizontal: 20,
      marginTop: 24,
      marginBottom: 10,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    tracksList: {
      paddingHorizontal: 20,
      paddingBottom: 24,
    },
    trackItem: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: colors.cardBg,
      borderRadius: 14,
      marginBottom: 12,
      overflow: "hidden",
      paddingVertical: 10,
      paddingHorizontal: 12,
    },
    trackImage: {
      width: 56,
      height: 56,
      borderRadius: 8,
      marginRight: 12,
    },
    trackInfo: {
      flex: 1,
      justifyContent: "center",
    },
    trackTitle: {
      fontSize: 14,
      color: colors.primaryText,
      marginBottom: 4,
    },
    trackArtist: {
      fontSize: 12,
      color: colors.secondaryText,
    },
    trackDuration: {
      fontSize: 12,
      color: colors.secondaryText,
      marginRight: 12,
      minWidth: 30,
      textAlign: "right",
    },
    menuButton: {
      padding: 8,
      marginRight: -8,
    },
    playButton: {
      width: 44,
      height: 44,
      borderRadius: 22,
      alignItems: "center",
      justifyContent: "center",
      marginRight: 10,
      backgroundColor: colors.surface,
    },
  });
