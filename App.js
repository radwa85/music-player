import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { Provider } from "react-redux";
import { AudioProvider } from "./src/providers/AudioProvider";
import { HomeScreen } from "./src/screens/HomeScreen/HomeScreen";
import { LikedSongsScreen } from "./src/screens/LikedSongs/LikedSongs";
import NowPlayingScreen from "./src/screens/NowPlaying/NowPlaying";
import OnboardingScreen from "./src/screens/onboarding/onboardingscreen";
import { SearchScreen } from "./src/screens/SearchScreen/SearchScreen";
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
            <Stack.Screen name="LikedSongs" component={LikedSongsScreen} />
            <Stack.Screen
              name="NowPlaying"
              component={NowPlayingScreen}
              options={{ presentation: "modal" }}
            />
          </Stack.Navigator>
          <StatusBar style="auto" />
        </NavigationContainer>
      </AudioProvider>
    </Provider>
  );
}
