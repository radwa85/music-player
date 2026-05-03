import { StyleSheet } from "react-native";
import { ThemeColors } from "../../providers/ThemeProvider";

export const makeStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    backgroundDecor: {
      ...StyleSheet.absoluteFillObject,
      pointerEvents: "none",
    },
    ellipseAsset: {
      position: "absolute",
      opacity: 0.98,
    },
    ellipse1: {
      width: 395,
      height: 395,
      left: 80,
      top: 107,
    },
    ellipse3: {
      width: 395,
      height: 395,
      left: -2,
      top: 398,
    },
    ellipse4: {
      width: 395,
      height: 395,
      right: 8,
      top: -26,
    },
    scrollContent: {
      paddingBottom: 20,
      position: "relative",
      zIndex: 10,
    },
    heroSection: {
      marginTop: 10,
    },
    sidebarOverlayWrap: {
      ...StyleSheet.absoluteFillObject,
      zIndex: 50,
      flexDirection: "row",
    },
    sidebarBackdrop: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: colors.sidebarBackdrop,
    },
    sidebarPanel: {
      width: 244,
      height: "100%",
      backgroundColor: colors.sidebarBg,
      paddingTop: 16,
      paddingHorizontal: 18,
    },
    sidebarHeaderRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 8,
      paddingLeft: 0,
      paddingRight: 2,
    },
    darkModeRow: {
      flexDirection: "row",
      alignItems: "center",
    },
    darkModeLabel: {
      color: colors.secondaryText,
      fontSize: 11,
      marginBottom: 20,
      letterSpacing: 0.3,
    },
    sidebarMenu: {
      paddingTop: 4,
    },
    sidebarItem: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: 11,
      paddingHorizontal: 0,
    },
    sidebarItemIcon: {
      width: 28,
      height: 28,
      alignItems: "center",
      justifyContent: "center",
      marginRight: 14,
    },
    sidebarItemLabel: {
      flex: 1,
      height: 24,
      alignItems: "flex-start",
      justifyContent: "center",
    },
    sidebarItemText: {
      color: colors.primaryText,
      fontSize: 16,
    },
  });
