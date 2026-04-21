import { StyleSheet, Dimensions } from 'react-native';
import { colors } from '../../constants/colors';

const { width } = Dimensions.get('window');
const CARD_SIZE = (width - 48) / 2;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 56,
    paddingBottom: 16,
  },
  headerTitle: {
    fontSize: 24,
    color: colors.primaryText,
  },
  backButton: {
    padding: 4,
  },
  filterButton: {
    padding: 4,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 100,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  card: {
    width: CARD_SIZE,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#fff',
  },
  cardImageWrapper: {
    width: CARD_SIZE,
    height: CARD_SIZE,
    position: 'relative',
  },
  cardImage: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
  },
  playingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(9, 17, 39, 0.45)',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  likeButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(255,255,255,0.85)',
    borderRadius: 20,
    padding: 5,
  },
  cardInfo: {
    paddingTop: 8,
    paddingBottom: 4,
    paddingHorizontal: 2,
  },
  cardTitle: {
    fontSize: 13,
    color: colors.primaryText,
    marginBottom: 2,
  },
  cardArtist: {
    fontSize: 11,
    color: colors.secondaryText,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },

  // Empty state
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
    textAlign: 'center',
    paddingHorizontal: 40,
  },

  // Loading
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Error
  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  errorText: {
    fontSize: 14,
    color: colors.secondaryText,
    textAlign: 'center',
    marginBottom: 16,
  },
  retryButton: {
    backgroundColor: colors.primaryText,
    paddingVertical: 10,
    paddingHorizontal: 28,
    borderRadius: 24,
  },
  retryText: {
    color: '#fff',
    fontSize: 14,
  },

  miniPlayerSpacer: {
    height: 80,
  },
});