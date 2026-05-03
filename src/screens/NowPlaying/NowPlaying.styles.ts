import { StyleSheet, Dimensions, Platform } from 'react-native';
import { ThemeColors } from '../../providers/ThemeProvider';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const MAX_ART = 320;
export const ALBUM_ART_SIZE = Math.min(SCREEN_WIDTH * 0.78, MAX_ART);

export const makeNowPlayingStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    root: {
      flex: 1,
      backgroundColor: colors.background,
    },
    scrollContent: {
      alignItems: 'center',
      paddingHorizontal: 24,
      paddingTop: Platform.OS === 'ios' ? 60 : 48,
      paddingBottom: 40,
    },

    // Header
    header: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 32,
    },
    headerTitle: {
      fontSize: 17,
      fontWeight: '600',
      color: colors.primaryText,
      letterSpacing: 0.2,
    },

    // Album art
    artWrapper: {
      width: '100%',
      height: ALBUM_ART_SIZE,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 36,
    },
    artContainer: {
      shadowColor: '#000',
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
      alignItems: 'center',
      justifyContent: 'center',
    },
    sideThumbnail: {
      position: 'absolute',
      width: ALBUM_ART_SIZE * 0.72,
      height: ALBUM_ART_SIZE * 0.72,
      borderRadius: 12,
      top: '14%',
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
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 20,
    },
    infoText: {
      flex: 1,
      marginRight: 12,
    },
    songTitle: {
      fontSize: 22,
      fontWeight: '700',
      color: colors.primaryText,
      letterSpacing: -0.3,
    },
    artistName: {
      fontSize: 13,
      fontWeight: '500',
      color: colors.secondaryText,
      marginTop: 4,
      letterSpacing: 0.8,
      textTransform: 'uppercase',
    },

    // Secondary controls
    secondaryControls: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 20,
    },

    // Progress bar
    progressSection: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
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
      textAlign: 'right',
    },
    progressBarTrack: {
      flex: 1,
      height: 4,
      backgroundColor: colors.inactiveBar,
      borderRadius: 2,
      justifyContent: 'center',
    },
    progressBarFill: {
      height: 4,
      backgroundColor: colors.primaryText,
      borderRadius: 2,
    },
    progressThumb: {
      position: 'absolute',
      width: 14,
      height: 14,
      borderRadius: 7,
      backgroundColor: colors.primaryText,
      top: -5,
      marginLeft: -7,
    },

    // Playback controls
    controls: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 16,
      marginBottom: 40,
    },
    playButton: {
      width: 64,
      height: 64,
      borderRadius: 32,
      backgroundColor: colors.primaryText,
      alignItems: 'center',
      justifyContent: 'center',
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
  });