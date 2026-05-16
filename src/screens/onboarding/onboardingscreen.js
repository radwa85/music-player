import { Image, Text, TouchableOpacity, View } from "react-native";
import { makeOnboardingStyles } from "./onboardingscreen.styles";

import { useTheme } from "../../providers/ThemeProvider";

export default function OnboardingScreen({ navigation }) {
  const { colors } = useTheme();
  const styles = makeOnboardingStyles(colors);

  const accentDots = [
    { key: "dot5", style: styles.dot5 },
    { key: "dot9", style: styles.dot9 },
    { key: "dot7", style: styles.dot7 },
    { key: "dot8", style: styles.dot8 },
    { key: "dot6", style: styles.dot6 },
    { key: "dot10", style: styles.dot10 },
  ];

  return (
    <View style={styles.background}>
      <View pointerEvents="none" style={styles.backgroundDecor}>
        <Image
          source={require("../../../assets/images/splash/ellipse1.png")}
          style={[styles.ellipseAsset, styles.ellipse1]}
        />
        <Image
          source={require("../../../assets/images/splash/ellipse3.png")}
          style={[styles.ellipseAsset, styles.ellipse3]}
        />
        <Image
          source={require("../../../assets/images/splash/ellipse11.png")}
          style={[styles.ellipseAsset, styles.ellipse11]}
        />
        <Image
          source={require("../../../assets/images/splash/ellipse2.png")}
          style={[styles.ellipseAsset, styles.ellipse2]}
        />
        <Image
          source={require("../../../assets/images/splash/ellipse4.png")}
          style={[styles.ellipseAsset, styles.ellipse4]}
        />

        {accentDots.map((dot) => (
          <View key={dot.key} style={[styles.dot, dot.style]} />
        ))}
      </View>

      <View style={styles.container}>
        <View pointerEvents="none" style={styles.heroWrap}>
          <Image
            source={require("../../../assets/images/image.png")}
            style={styles.image}
          />
        </View>

        <View style={styles.content}>
          <Text style={styles.title}>Music Player App</Text>

          <Text style={styles.subtitle}>
            “A sleek, modern music app that brings your favorite songs, artists,
            and playlists together”
          </Text>
        </View>

        <View style={styles.buttonStage}>
          <View style={styles.accentLine} />
          <TouchableOpacity
            style={styles.button}
            activeOpacity={0.9}
            onPress={() => navigation.navigate("SignUp")}
          >
            <Text style={styles.buttonText}>Let’s Start</Text>
            <Text style={styles.buttonArrow}>→</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}