import { StyleSheet, Dimensions, Platform } from "react-native";
import { ThemeColors } from "../../providers/ThemeProvider";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const MAX_ART = 320;
export const ALBUM_ART_SIZE = Math.min(SCREEN_WIDTH * 0.78, MAX_ART);

export const makeNowPlayingStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    root: {
      flex: 1,
      backgroundColor: colors.background,
    },
    scrollContent: {
      alignItems: "center",
      paddingHorizontal: 24,
      paddingTop: Platform.OS === "ios" ? 60 : 48,
      paddingBottom: 40,
    },

    // Header
    header: {
      width: "100%",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 32,
    },
    headerTitle: {
      fontSize: 17,
      fontWeight: "600",
      color: colors.primaryText,
      letterSpacing: 0.2,
    },

    // Album art
    artWrapper: {
      width: "100%",
      height: ALBUM_ART_SIZE,
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 36,
    },
    artContainer: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 12 },
      shadowOpacity: 0.22,
      shadowRadius: 20,
      elevation: 12,
      zIndex: 2,
    },
    albumArt: {
      width: ALBUM_ART_SIZE,
      height: ALBUM_ART_SIZE,
      borderRadius: 16,
    },
    albumArtPlaceholder: {
      backgroundColor: colors.surface,
      alignItems: "center",
      justifyContent: "center",
    },
    sideThumbnail: {
      position: "absolute",
      width: ALBUM_ART_SIZE * 0.72,
      height: ALBUM_ART_SIZE * 0.72,
      borderRadius: 12,
      top: "14%",
      opacity: 0.55,
      zIndex: 1,
    },
    sideThumbnailLeft: {
      left: -ALBUM_ART_SIZE * 0.1,
    },
    sideThumbnailRight: {
      right: -ALBUM_ART_SIZE * 0.1,
    },

    // Song info
    infoRow: {
      width: "100%",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 20,
    },
    infoText: {
      flex: 1,
      marginRight: 12,
    },
    songTitle: {
      fontSize: 22,
      fontWeight: "700",
      color: colors.primaryText,
      letterSpacing: -0.3,
    },
    artistName: {
      fontSize: 13,
      fontWeight: "500",
      color: colors.secondaryText,
      marginTop: 4,
      letterSpacing: 0.8,
      textTransform: "uppercase",
    },

    // Secondary controls
    secondaryControls: {
      width: "100%",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 20,
    },

    // Progress bar
    progressSection: {
      width: "100%",
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
      marginBottom: 32,
    },
    timeText: {
      fontSize: 12,
      color: colors.secondaryText,
      width: 36,
    },
    timeTextRight: {
      fontSize: 12,
      color: colors.secondaryText,
      width: 36,
      textAlign: "right",
    },
    progressBarTrack: {
      flex: 1,
      height: 4,
      backgroundColor: colors.inactiveBar,
      borderRadius: 2,
      justifyContent: "center",
    },
    progressBarFill: {
      height: 4,
      backgroundColor: colors.primaryText,
      borderRadius: 2,
    },
    progressThumb: {
      position: "absolute",
      width: 14,
      height: 14,
      borderRadius: 7,
      backgroundColor: colors.primaryText,
      top: -5,
      marginLeft: -7,
    },

    // Playback controls
    controls: {
      width: "100%",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 16,
      marginBottom: 40,
    },
    playButton: {
      width: 64,
      height: 64,
      borderRadius: 32,
      backgroundColor: colors.primaryText,
      alignItems: "center",
      justifyContent: "center",
      shadowColor: colors.primaryText,
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.35,
      shadowRadius: 16,
      elevation: 8,
    },

    // Bottom pill
    bottomPill: {
      width: 48,
      height: 4,
      borderRadius: 2,
      backgroundColor: colors.inactiveBar,
    },

    // Playlist Modal
    playlistOverlay: {
      flex: 1,
      backgroundColor: "rgba(0,0,0,0.5)",
      justifyContent: "flex-end",
    },
    playlistModalContainer: {
      backgroundColor: colors.background,
      borderTopLeftRadius: 24,
      borderTopRightRadius: 24,
      paddingHorizontal: 20,
      paddingTop: 20,
      paddingBottom: 30,
      maxHeight: "80%",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: -4 },
      shadowOpacity: 0.15,
      shadowRadius: 12,
      elevation: 8,
    },
    playlistModalHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 20,
      paddingBottom: 16,
      borderBottomWidth: 1,
      borderBottomColor: colors.inactiveBar,
    },
    playlistModalTitle: {
      fontSize: 18,
      fontWeight: "700",
      color: colors.primaryText,
      letterSpacing: -0.2,
    },
    playlistCloseButton: {
      padding: 8,
    },
    playlistListContent: {
      paddingBottom: 12,
    },
    playlistItem: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingVertical: 14,
      paddingHorizontal: 0,
      borderBottomWidth: 1,
      borderBottomColor: colors.inactiveBar,
    },
    playlistItemInfo: {
      flex: 1,
      marginRight: 12,
    },
    playlistItemTitle: {
      fontSize: 15,
      fontWeight: "600",
      color: colors.primaryText,
      marginBottom: 4,
    },
    playlistItemDescription: {
      fontSize: 13,
      color: colors.secondaryText,
      fontWeight: "500",
    },
    playlistItemAction: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
    },
    playlistAddButton: {
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 8,
      backgroundColor: colors.accent,
      minWidth: 60,
      alignItems: "center",
      justifyContent: "center",
    },
    playlistRemoveButton: {
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 8,
      backgroundColor: colors.surface,
      minWidth: 60,
      alignItems: "center",
      justifyContent: "center",
      borderWidth: 1,
      borderColor: (colors as any).destructive || "#c0392b",
    },
    playlistActionText: {
      fontSize: 13,
      fontWeight: "600",
      color: "#fff",
    },
    playlistRemoveActionText: {
      fontSize: 13,
      fontWeight: "600",
      color: (colors as any).destructive || "#c0392b",
    },
    playlistModalFooter: {
      flexDirection: "row",
      justifyContent: "flex-end",
      alignItems: "center",
      marginTop: 16,
      paddingTop: 16,
      borderTopWidth: 1,
      borderTopColor: colors.inactiveBar,
    },
    playlistDoneButton: {
      paddingHorizontal: 20,
      paddingVertical: 10,
      borderRadius: 8,
      backgroundColor: colors.accent,
    },
    playlistDoneButtonText: {
      fontSize: 14,
      fontWeight: "700",
      color: "#fff",
      letterSpacing: 0.2,
    },

    // Playlist Grid Modal
    playlistGridContainer: {
      paddingHorizontal: 4,
    },
    playlistCardWrapper: {
      flex: 0.5,
      padding: 8,
    },
    playlistCard: {
      borderRadius: 12,
      overflow: "hidden",
      backgroundColor: colors.surface,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 4,
    },
    playlistCardImage: {
      width: "100%",
      aspectRatio: 1,
      backgroundColor: colors.inactiveBar,
    },
    playlistCardFooter: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 8,
      paddingVertical: 8,
      backgroundColor: "transparent",
    },
    playlistCardTitle: {
      fontSize: 12,
      fontWeight: "700",
      color: colors.primaryText,
      flex: 1,
      marginRight: 8,
    },
    playlistCardCheckmark: {
      width: 36,
      height: 36,
      borderRadius: 18,
      alignItems: "center",
      justifyContent: "center",
    },
  });
