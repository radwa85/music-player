import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7FAFF",
  },

  header: {
    alignItems: "center",
    top: 100,
  },

  title: {
    fontSize: 32,
    fontWeight: "600",
  },

  subtitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#130F26B8",
    marginTop: 5,
  },

  signUpHeader: {
    flexDirection: "row",
    alignItems: "center",
    top: 150,
    left: 29,
  },

  iconCircle: {
    backgroundColor: "rgba(236, 210, 207, 1)",
    borderRadius: 50,
    width: 41,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 15,
  },

  signUpTitle: {
    fontSize: 24,
    fontWeight: "600",
  },

  signUpDesc: {
    fontSize: 13,
    fontWeight: "600",
    color: "#130F26B8",
  },

  divider: {
    height: 1,
    width: "80%",
    top: 150,
    left: 29,
    backgroundColor: "rgba(0,0,0,0.5)",
    marginVertical: 20,
  },

  circleTopRight: {
    position: "absolute",
    top: 215,
    right: -50,
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: "transparent",
    shadowColor: "rgba(197, 64, 28, 1)",
    shadowOpacity: 0.1,
    elevation: 60,
  },

  circleBottomLeft: {
    position: "absolute",
    bottom: 110,
    left: -40,
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: "transparent",
    shadowColor: "rgba(197, 64, 28, 1)",
    shadowOpacity: 1,
    elevation: 40,
  },
});
