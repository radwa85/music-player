import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { Provider } from "react-redux";
import * as Font from "expo-font";

import { store } from "./src/redux/store";
import { AudioProvider } from "./src/providers/AudioProvider";

import OnboardingScreen from "./src/screens/onboarding/onboardingscreen";
import LoginScreen from "./src/screens/login/LoginScreen";
import { HomeScreen } from "./src/screens/HomeScreen/HomeScreen";
import { SearchScreen } from "./src/screens/SearchScreen/SearchScreen";
import { LikedSongsScreen } from "./src/screens/LikedSongs/LikedSongs";
import NowPlayingScreen from "./src/screens/NowPlaying/NowPlaying";

const Stack = createNativeStackNavigator();

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    const loadFonts = async () => {
      try {
        await Font.loadAsync({
          "Gilroy-Regular": require("./assets/fonts/Gilroy-Regular.ttf"),
          "Gilroy-Medium": require("./assets/fonts/Gilroy-Medium.ttf"),
          "Gilroy-Bold": require("./assets/fonts/Gilroy-Bold.ttf"),
        });

        setFontsLoaded(true);
      } catch (error) {
        console.error("Font loading error:", error);
      }
    };

    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <AudioProvider>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Onboarding" component={OnboardingScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
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