import { StyleSheet } from 'react-native';
import { ThemeColors } from '../../../providers/ThemeProvider';

export const CARD_SIZE = 120;

export const makeLikedSongsSectionStyles = (colors: ThemeColors) =>
  StyleSheet.create({
  section: {
    marginTop: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    color: colors.primaryText,
  },
  seeAll: {
    fontSize: 13,
    color: colors.secondaryText,
  },
  listContent: {
    paddingHorizontal: 16,
    gap: 12,
  },
  card: {
    width: CARD_SIZE,
  },
  imageWrapper: {
    width: CARD_SIZE,
    height: CARD_SIZE,
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 6,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(9,17,39,0.45)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardTitle: {
    fontSize: 12,
    color: colors.primaryText,
    marginBottom: 2,
  },
  cardArtist: {
    fontSize: 11,
    color: colors.secondaryText,
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  loadingRow: {
    marginTop: 24,
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
  },
  emptyCard: {
    marginHorizontal: 16,
    height: 72,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: colors.inactiveBar,
    borderStyle: 'dashed',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  emptyText: {
    fontSize: 13,
    color: colors.secondaryText,
  },
  });