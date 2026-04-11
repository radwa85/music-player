import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import OnboardingScreen from "./src/screens/onboarding/onboardingscreen";
import { HomeScreen } from "./src/screens/HomeScreen/HomeScreen";
import { AudioProvider } from "./src/providers/AudioProvider";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <AudioProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen
            name="Onboarding"
            component={OnboardingScreen}
            options={{ animationEnabled: false }}
          />
          <Stack.Screen name="Home" component={HomeScreen} />
        </Stack.Navigator>
        <StatusBar style="auto" />
      </NavigationContainer>
    </AudioProvider>
  );
}

const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#111",
  },
  homeText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
  },
});
