import { StyleSheet } from 'react-native';

export const loginStyles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  content: { flex: 1, paddingHorizontal: 24, paddingTop: 80 },

  welcome: { fontSize: 32, fontWeight: 'bold', color: '#1a1a2e', marginBottom: 8 },
  subtitle: { fontSize: 16, color: '#C4401D', marginBottom: 24, fontWeight: '500' },

  divider: {
    height: 1,
    backgroundColor: '#ddd',
    marginVertical: 24,
  },

  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 32,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ECD2CF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  sectionTitle: { fontSize: 24, fontWeight: '600', color: '#1a1a2e', marginBottom: 4 },
  sectionSubtitle: { fontSize: 14, color: '#666' },

  inputContainer: { marginBottom: 24 },
  label: { fontSize: 14, fontWeight: '500', color: '#333', marginBottom: 8 },

  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    paddingHorizontal: 12,
    backgroundColor: '#ECD2CF',
  },
  inputWrapperPassword: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    paddingHorizontal: 12,
    backgroundColor: '#e8c7c2', 
  },
  inputIcon: {
    marginRight: 8,
  },
  inputEmail: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
    color: '#000',
  },
  inputPassword: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
    color: '#000',
  },
});
