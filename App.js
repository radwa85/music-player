import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { MainDrawerNavigator } from "./src/navigation/MainDrawerNavigator";
import { AudioProvider } from "./src/providers/AudioProvider";
import OnboardingScreen from "./src/screens/onboarding/onboardingscreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
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
            <Stack.Screen name="Home" component={MainDrawerNavigator} />
          </Stack.Navigator>
          <StatusBar style="auto" />
        </NavigationContainer>
      </AudioProvider>
    </GestureHandlerRootView>
  );
}
