import { StyleSheet } from 'react-native';
import { colors } from '../../constants/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  heroSection: {
    marginTop: 10,
  },
  sidebarOverlayWrap: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 50,
    flexDirection: 'row',
  },
  sidebarBackdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(9, 17, 39, 0.25)',
  },
  sidebarPanel: {
    width: 235,
    height: '100%',
    backgroundColor: '#F4F6FA',
    paddingTop: 52,
    paddingHorizontal: 14,
  },
  sidebarHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: 18,
    paddingLeft: 2,
  },
  sidebarMenu: {
    paddingTop: 2,
  },
  sidebarItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 2,
  },
  sidebarItemIcon: {
    marginRight: 10,
  },
  sidebarItemLabel: {
    color: colors.primaryText,
    fontSize: 13,
  },
});
