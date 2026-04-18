import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {
  DrawerActions,
} from '@react-navigation/native';
import { DrawerContentComponentProps } from '@react-navigation/drawer';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const menuItems = [
  { label: 'Home', icon: 'home-outline', routeName: 'Home' },
  { label: 'Liked Songs', icon: 'heart-outline' },
  { label: 'Playlists', icon: 'grid-outline' },
  { label: 'Contact Us', icon: 'chatbubble-outline' },
  { label: 'Learn More', icon: 'bulb-outline' },
  { label: 'Settings', icon: 'settings-outline' },
];

export const CustomDrawer: React.FC<DrawerContentComponentProps> = ({ navigation }) => {
  const closeDrawer = () => navigation.dispatch(DrawerActions.closeDrawer());

  const handlePress = (routeName?: string) => {
    if (routeName) {
      navigation.navigate(routeName as never);
      return;
    }

    closeDrawer();
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom', 'left']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={closeDrawer} style={styles.headerButton} activeOpacity={0.7}>
          <Ionicons name="close" size={24} color="#252525" />
        </TouchableOpacity>

        <View style={styles.headerRight}>
          <TouchableOpacity activeOpacity={0.7} style={styles.headerButton}>
            <Ionicons name="moon-outline" size={22} color="#252525" />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.7} style={styles.headerButton}>
            <Ionicons name="search-outline" size={22} color="#252525" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.menuList}>
        {menuItems.map((item) => (
          <TouchableOpacity
            key={item.label}
            style={styles.menuItem}
            activeOpacity={0.75}
            onPress={() => handlePress(item.routeName)}
          >
            <Ionicons name={item.icon as React.ComponentProps<typeof Ionicons>['name']} size={20} color="#45414F" style={styles.menuIcon} />
            <Text style={styles.menuLabel}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F4FF',
    paddingHorizontal: 20,
    paddingTop: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 28,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerButton: {
    padding: 8,
    marginLeft: 4,
  },
  menuList: {
    paddingTop: 6,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
  },
  menuIcon: {
    marginRight: 16,
  },
  menuLabel: {
    fontSize: 16,
    color: '#2A2733',
    fontFamily: 'Gilroy-Medium',
  },
});