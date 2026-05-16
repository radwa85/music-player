import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { Provider } from "react-redux";
import * as Font from "expo-font";

import { store } from "./src/redux/store";
import { restoreAuth } from "./src/redux/authSlice";
import { AudioProvider } from "./src/providers/AudioProvider";
import { ThemeProvider, useTheme } from "./src/providers/ThemeProvider";

import OnboardingScreen from "./src/screens/onboarding/onboardingscreen";
import LoginScreen from "./src/screens/login/LoginScreen";
import { HomeScreen } from "./src/screens/HomeScreen/HomeScreen";
import { SearchScreen } from "./src/screens/SearchScreen/SearchScreen";
import { LikedSongsScreen } from "./src/screens/LikedSongs/LikedSongs";
import NowPlayingScreen from "./src/screens/NowPlaying/NowPlaying";
import SignUpScreen from "./src/screens/SignUpScreen/SignUpScreen";
import { PlaylistsScreen } from "./src/screens/Playlists/Playlists";
import PlaylistManagementScreen from "./src/screens/PlaylistManagement/PlaylistManagement";
import PlaylistDetailScreen from "./src/screens/PlaylistManagement/PlaylistDetail";

const Stack = createNativeStackNavigator();

function AppNavigator() {
  const { isDark } = useTheme();

  return (
    <>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Onboarding" component={OnboardingScreen} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Playlists" component={PlaylistsScreen} />
          <Stack.Screen name="PlaylistManagement" component={PlaylistManagementScreen} />
          <Stack.Screen name="PlaylistDetail" component={PlaylistDetailScreen} />
          <Stack.Screen name="Search" component={SearchScreen} />
          <Stack.Screen name="LikedSongs" component={LikedSongsScreen} />
          <Stack.Screen
            name="NowPlaying"
            component={NowPlayingScreen}
            options={{ presentation: "modal" }}
          />
        </Stack.Navigator>

        <StatusBar style={isDark ? "light" : "auto"} />
      </NavigationContainer>
    </>
  );
}

export default function App() {
  useEffect(() => {
    const loadFonts = async () => {
      try {
        await Font.loadAsync({
          "Gilroy-Regular": require("./assets/fonts/Gilroy-Regular.ttf"),
          "Gilroy-Medium": require("./assets/fonts/Gilroy-Medium.ttf"),
          "Gilroy-Bold": require("./assets/fonts/Gilroy-Bold.ttf"),
        });
      } catch (error) {
        console.error("Font loading error:", error);
      }
    };

    loadFonts();
    // restore auth token from secure storage into redux
    try {
      store.dispatch(restoreAuth());
    } catch (err) {
      console.warn('Auth restore failed', err);
    }
  }, []);

  return (
    <Provider store={store}>
      <ThemeProvider>
        <AudioProvider>
          <AppNavigator />
        </AudioProvider>
      </ThemeProvider>
    </Provider>
  );
}