import { Dimensions, StyleSheet } from "react-native";
import { ThemeColors } from "../../providers/ThemeProvider";

const { width } = Dimensions.get("window");
const CARD_SIZE = (width - 58) / 2;

export const makeLikedSongsStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    headerActionsRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 14,
      paddingTop: 8,
      paddingBottom: 4,
    },
    headerTitleRow: {
      paddingHorizontal: 20,
      paddingTop: 8,
      paddingBottom: 12,
    },
    headerTitle: {
      fontSize: 18,
      color: colors.primaryText,
    },
    backButton: {
      padding: 6,
    },
    filterButton: {
      padding: 6,
      zIndex: 30,
    },
    sortBackdrop: {
      ...StyleSheet.absoluteFillObject,
      zIndex: 20,
    },
    sortMenu: {
      position: "absolute",
      top: 58,
      right: 14,
      zIndex: 25,
      width: 220,
      backgroundColor: colors.cardBg,
      borderRadius: 14,
      padding: 10,
      borderWidth: 1,
      borderColor: colors.borderColor,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.15,
      shadowRadius: 16,
      elevation: 6,
    },
    sortTitle: {
      fontSize: 13,
      color: colors.primaryText,
      marginBottom: 8,
      paddingHorizontal: 4,
    },
    sortOption: {
      flexDirection: "row",
      alignItems: "center",
      borderRadius: 10,
      paddingVertical: 8,
      paddingHorizontal: 8,
      marginBottom: 4,
    },
    sortOptionSelected: {
      backgroundColor: colors.inputBg,
    },
    sortIconWrap: {
      width: 28,
      height: 28,
      borderRadius: 8,
      backgroundColor: colors.surface,
      alignItems: "center",
      justifyContent: "center",
      marginRight: 8,
    },
    sortTextWrap: {
      flex: 1,
    },
    sortOptionTitle: {
      fontSize: 13,
      color: colors.primaryText,
    },
    sortOptionDetail: {
      fontSize: 11,
      color: colors.secondaryText,
    },
    listContent: {
      paddingHorizontal: 20,
      paddingBottom: 116,
    },
    row: {
      justifyContent: "space-between",
      marginBottom: 14,
    },
    card: {
      width: CARD_SIZE,
      borderRadius: 12,
    },
    cardImageWrapper: {
      width: CARD_SIZE,
      height: CARD_SIZE,
      position: "relative",
    },
    cardImage: {
      width: "100%",
      height: "100%",
      borderRadius: 12,
    },
    playingOverlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: "rgba(9, 17, 39, 0.45)",
      borderRadius: 12,
      alignItems: "center",
      justifyContent: "center",
    },
    likeButton: {
      position: "absolute",
      top: 8,
      right: 8,
      backgroundColor: "rgba(255,255,255,0.85)",
      borderRadius: 20,
      padding: 5,
    },
    cardInfo: {
      paddingTop: 7,
      paddingBottom: 2,
      paddingHorizontal: 1,
    },
    cardTitle: {
      fontSize: 12,
      color: colors.primaryText,
      marginBottom: 2,
    },
    cardArtist: {
      fontSize: 10,
      color: colors.secondaryText,
      textTransform: "capitalize",
      letterSpacing: 0.2,
    },

    // Empty state
    emptyContainer: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      paddingBottom: 80,
    },
    emptyIcon: {
      marginBottom: 16,
      opacity: 0.25,
    },
    emptyTitle: {
      fontSize: 18,
      color: colors.primaryText,
      marginBottom: 6,
    },
    emptySubtitle: {
      fontSize: 13,
      color: colors.secondaryText,
      textAlign: "center",
      paddingHorizontal: 40,
    },

    // Loading
    loadingContainer: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },

    // Error
    errorContainer: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal: 32,
    },
    errorText: {
      fontSize: 14,
      color: colors.secondaryText,
      textAlign: "center",
      marginBottom: 16,
    },
    retryButton: {
      backgroundColor: colors.accent,
      paddingVertical: 10,
      paddingHorizontal: 28,
      borderRadius: 24,
    },
    retryText: {
      color: "#fff",
      fontSize: 14,
    },

    miniPlayerSpacer: {
      height: 80,
    },
  });
