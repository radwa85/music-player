import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';
import * as Font from 'expo-font';
import OnboardingScreen from './src/screens/onboarding/onboardingscreen';
import LoginScreen from './src/screens/login/LoginScreen';
import { HomeScreen } from './src/screens/HomeScreen/HomeScreen';
import { AudioProvider } from './src/providers/AudioProvider';
import { store } from './src/redux/store';

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
  const [fontsLoaded, setFontsLoaded] = React.useState(false);

  React.useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        'Gilroy-Regular': require('./assets/fonts/Gilroy-Regular.ttf'),
        'Gilroy-Medium': require('./assets/fonts/Gilroy-Medium.ttf'),
        'Gilroy-Bold': require('./assets/fonts/Gilroy-Bold.ttf'),
      });
      setFontsLoaded(true);
    }
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
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
          </Stack.Navigator>

          <StatusBar style="auto" />
        </NavigationContainer>

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
