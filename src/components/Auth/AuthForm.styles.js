import { StyleSheet } from "react-native";

export default StyleSheet.create({
  formContainer: {
    top: 150,
    left: 55,
  },

  label: {
    marginBottom: 15,
    fontWeight: "600",
    fontSize: 16,
  },

  input: {
    borderWidth: 2,
    borderColor: "#C5401C",
    paddingLeft: 35,
    height: 45,
    width: 263,
    borderRadius: 10,
    backgroundColor: "#ECD2CF",
  },

  button: {
    backgroundColor: "#C5401C",
    padding: 15,
    borderRadius: 12,
    width: 320,
    alignItems: "center",
    top: 180,
    left: 29,

    shadowColor: "#5F33E1",
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 10 },
    elevation: 25,
  },

  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
  },

  buttonText: {
    color: "white",
    fontWeight: "600",
    left: 85,
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
  inputWrapper: {
    position: "relative",
    marginBottom: 10,
    justifyContent: "center",
  },

  icon: {
    position: "absolute",
    left: 12,
    zIndex: 2,
  },
});
