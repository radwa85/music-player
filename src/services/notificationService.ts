import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import { Track } from '../types/track';

// Configure notification default behavior
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

class NotificationService {
  private initialized = false;

  async init() {
    if (this.initialized) return;

    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('now-playing', {
        name: 'Now Playing',
        importance: Notifications.AndroidImportance.DEFAULT,
        lightColor: '#FF2D78',
      });
    }

    const { status } = await Notifications.getPermissionsAsync();
    if (status !== 'granted') {
      await Notifications.requestPermissionsAsync();
    }
    
    this.initialized = true;
  }

  async notify(track: Track | null, isPlaying: boolean) {
    if (!track) return;
    
    await this.init();

    // Trigger local notification for the phone instead of an in-app banner
    if (isPlaying) {
      // Clear previous notifications if any to avoid stacking up multiple "Now playing" notifications
      await Notifications.dismissAllNotificationsAsync();
      
      await Notifications.scheduleNotificationAsync({
        content: {
          title: `Now Playing 🎵`,
          body: `${track.title} • ${track.artist}`,
          sound: false,
        },
        trigger: null, // trigger immediately
      });
    }
  }
}

export const notificationService = new NotificationService();
