import { StyleSheet } from 'react-native';
import { colors } from '../../constants/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 5,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.textInputBackground, 
    borderRadius: 8, 
    borderWidth: 2,
    borderColor: colors.primaryOrange, 
    paddingHorizontal: 12,
    paddingVertical: 4,
    marginTop: 10,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: colors.unactiveTextIcon, 
    fontFamily: 'Gilroy-Medium',
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 15,
  },
  exploreContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  exploreTitle: {
    fontSize: 24,
    color: colors.primaryOrange,
    marginBottom: 8,
    marginTop: 16,
  },
  exploreSubtitle: {
    fontSize: 14,
    color: colors.secondaryText,
    textAlign: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    color: colors.secondaryText,
    fontSize: 16,
  },
  listContent: {
    paddingBottom: 20,

  },
});
