import { StyleSheet } from 'react-native';
import { colors } from '../../constants/colors';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 'auto',
    marginRight: 0,
    marginBottom: 10,
  },
  imageContainer: {
    width: '100%',
    height: undefined,
    aspectRatio: 1,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: colors.inactiveBar,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  playingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoContainer: {
    marginTop: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.primaryText,
    textAlign: 'center',
  },
  artist: {
    fontSize: 10,
    fontWeight: '400',
    color: colors.secondaryText,
    marginTop: 2,
    textAlign: 'center',
  },
});
