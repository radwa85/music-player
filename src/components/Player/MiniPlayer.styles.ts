import { Dimensions, StyleSheet } from 'react-native';
import { colors } from '../../constants/colors'; 

const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    width: width,
    backgroundColor: colors.background,
    paddingBottom: 25,    
  },
  progressBarContainer: {
    position: 'absolute',
    top: 0,
    height: 4,
    backgroundColor: colors.inactiveBar,
    width: '100%',
    zIndex: 10,
  },
  progressBar: {
    height: '100%',
    backgroundColor: colors.primary,
  },
  progressThumb: {
    position: 'absolute',
    top: -5,
    width: 16,
    height: 16,
    borderRadius: 100,
    backgroundColor: colors.primary,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingEnd: 16,
    paddingBottom: 24,
  },
  image: {
    width: 66,
    height: 66,
  },
  info: {
    flex: 1,
    marginLeft: 12,
  },
  title: {
    fontSize: 18,
    color: colors.primaryText,
    fontFamily: 'Gilroy-Medium',
    fontWeight: '500',
  },
  artist: {
    fontSize: 10,
    color: colors.secondaryText,
    fontFamily: 'Gilroy-Medium',
    fontWeight: '400',
    marginTop: 2,
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  playButton: {
    width: 40,
    alignItems: 'center',
  },
});
