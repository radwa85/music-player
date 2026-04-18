import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { CustomDrawer } from "./src/components/Drawer/CustomDrawer";
import { AudioProvider } from "./src/providers/AudioProvider";
import { HomeScreen } from "./src/screens/HomeScreen/HomeScreen";
import OnboardingScreen from "./src/screens/onboarding/onboardingscreen";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function HomeDrawer() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawer {...props} />}
      screenOptions={{
        headerShown: false,
        drawerStyle: { width: "75%", backgroundColor: "#F4F4FF" },
        sceneContainerStyle: { backgroundColor: "#F4F4FF" },
      }}
    >
      <Drawer.Screen name="Home" component={HomeScreen} />
    </Drawer.Navigator>
  );
}

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
            <Stack.Screen name="Home" component={HomeDrawer} />
          </Stack.Navigator>
          <StatusBar style="auto" />
        </NavigationContainer>
      </AudioProvider>
    </GestureHandlerRootView>
  );
}
