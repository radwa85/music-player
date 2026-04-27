import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },

  card: {
    width: 120,
    marginRight: 12,
  },

  image: {
    width: 120,
    height: 120,
    borderRadius: 10,
  },

  title: {
    fontSize: 14,
    marginTop: 5,
  },

  artist: {
    fontSize: 12,
    color: "#888",
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    marginTop: 5,
  },
  emptyTitle: {
    fontSize: 16,
    marginTop: 5,
  },
  emptySubtitle: {
    textAlign: "center",
    opacity: 0.6,
    marginTop: 5,
  },
});
