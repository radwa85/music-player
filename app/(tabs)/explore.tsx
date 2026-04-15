import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';

export default function ExploreScreen() {
  const categories = ['Pop', 'Rock', 'Hip Hop', 'Jazz', 'Classical', 'Electronic'];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Explore Music</Text>
      <Text style={styles.subtitle}>Discover new songs and artists</Text>

      <View style={styles.categoriesContainer}>
        {categories.map((category, index) => (
          <TouchableOpacity key={index} style={styles.categoryCard}>
            <Text style={styles.categoryText}>{category}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.recommendations}>
        <Text style={styles.sectionTitle}>Recommended for You</Text>
        <View style={styles.recommendationCard}>
          <Text style={styles.songTitle}>Song Name</Text>
          <Text style={styles.artistName}>Artist Name</Text>
        </View>
        <View style={styles.recommendationCard}>
          <Text style={styles.songTitle}>Another Song</Text>
          <Text style={styles.artistName}>Another Artist</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#6c63ff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 24,
  },
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 32,
  },
  categoryCard: {
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginBottom: 12,
    width: '48%',
    alignItems: 'center',
  },
  categoryText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  recommendations: {
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
  },
  recommendationCard: {
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#eee',
  },
  songTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#222',
  },
  artistName: {
    fontSize: 14,
    color: '#888',
    marginTop: 4,
  },
});