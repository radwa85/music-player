import { View, Text, StyleSheet, Pressable } from 'react-native';
import { router } from 'expo-router';

export default function ModalScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Explore</Text>
      <Text style={styles.description}>
        This is a modal screen. You can use it to show additional information or forms.
      </Text>
      <Pressable style={styles.button} onPress={() => router.back()}>
        <Text style={styles.buttonText}>Close</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#6c63ff',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 32,
    color: '#555',
  },
  button: {
    backgroundColor: '#6c63ff',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});