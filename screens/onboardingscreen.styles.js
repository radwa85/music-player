import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "#F4F7FF",
  },

  backgroundDecor: {
    ...StyleSheet.absoluteFillObject,
  },

  ellipseAsset: {
    position: "absolute",
    opacity: 0.98,
  },

  ellipse1: {
    width: 395,
    height: 395,
    resizeMode: "contain",
    left: 80,
    top: 107,
  },

  ellipse3: {
    width: 395,
    height: 395,
    left: -2,
    top: 398,
  },

  ellipse11: {
    width: 96,
    height: 96,
    left: 216,
    bottom: 14,
  },

  ellipse2: {
    width: 70,
    height: 70,
    angle: 0,
    opacity: 1,
    top: 126,
    left: -15,
  },

  ellipse4: {
    width: 395,
    height: 395,
    right: 8,
    top: -26,
  },

  dot: {
    position: "absolute",
    borderRadius: 999,
    opacity: 0.95,
  },

  dot5: {
    width: 8,
    height: 8,
    left: 250,
    top: 383,
    backgroundColor: "#EAED2A",
  },

  dot9: {
    width: 8,
    height: 8,
    left: 138,
    top: 391,
    backgroundColor: "#FFD7E4",
  },

  dot7: {
    width: 8,
    height: 8,
    left: 252,
    top: 73,
    backgroundColor: "#92DEFF",
  },

  dot8: {
    width: 4,
    height: 4,
    left: 202,
    top: 92,
    backgroundColor: "#BE9FFF",
  },

  dot6: {
    width: 4,
    height: 4,
    left: 281,
    top: 362,
    backgroundColor: "#7FFCAA",
  },

  dot10: {
    width: 4,
    height: 4,
    left: 176,
    top: 405,
    backgroundColor: "#A4E7F9",
  },

  container: {
    flex: 1,
    backgroundColor: "transparent",
  },

  heroWrap: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 82,
    alignItems: "center",
  },

  image: {
    width: 500,
    height: 387,
    resizeMode: "contain",
    alignItems: "center",
    alignContent: "center",
  },

  content: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 158,
    alignItems: "center",
    paddingHorizontal: 24,
  },

  title: {
    width: 400,
    fontSize: 24,
    lineHeight: 30,
    fontWeight: "600",
    color: "#24252C",
    textAlign: "center",
    marginBottom: 16,
    top: -40,
  },

  subtitle: {
    width: 284,
    fontSize: 14,
    lineHeight: 18,
    fontWeight: "400",
    color: "#6E6A7C",
    textAlign: "center",
    top: -25,
  },

  buttonStage: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 18,
    alignItems: "center",
  },

  accentLine: {
    width: 310,
    height: 7,
    borderRadius: 999,
    backgroundColor: "#5F33E1",
    opacity: 0.85,
    marginBottom: -18,

    shadowColor: "#5F33E1",
    shadowOpacity: 0.35,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 0 },
    top: -60,
    elevation: 4,
  },

  button: {
    width: 331,
    height: 52,
    borderRadius: 14,
    backgroundColor: "#C4401F",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    top: -60,
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 19,
    lineHeight: 24,
    fontWeight: "600",
  },

  buttonArrow: {
    color: "#FFFFFF",
    fontSize: 20,
    lineHeight: 24,
    fontWeight: "600",
    marginLeft: 10,
  },
});

export default styles;
