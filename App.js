import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import OnboardingScreen from "./src/screens/onboarding/onboardingscreen";
import { HomeScreen } from "./src/screens/HomeScreen/HomeScreen";
import { SearchScreen } from "./src/screens/SearchScreen/SearchScreen";
import { AudioProvider } from "./src/providers/AudioProvider";
import { Provider } from "react-redux";
import { store } from "./src/store";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
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
          <Stack.Screen name="Search" component={SearchScreen} />
        </Stack.Navigator>
        <StatusBar style="auto" />
      </NavigationContainer>
      </AudioProvider>
    </Provider>
  );
}

