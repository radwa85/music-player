import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { HomeScreen } from '../screens/HomeScreen/HomeScreen';
import { CustomDrawer } from '../components/Drawer/CustomDrawer';

const Drawer = createDrawerNavigator();

export const MainDrawerNavigator: React.FC = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawer {...props} />}
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          width: '75%',
          backgroundColor: '#F4F4FF',
        },
        sceneContainerStyle: {
          backgroundColor: '#F4F4FF',
        },
      }}
    >
      <Drawer.Screen name="Home" component={HomeScreen} />
    </Drawer.Navigator>
  );
};