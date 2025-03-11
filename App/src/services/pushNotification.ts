import PushNotification from 'react-native-push-notification';

const configurePushNotifications = () => {
  PushNotification.configure({
    // Called when a remote or local notification is opened
    onNotification: function (notification) {
      console.log('Notification:', notification);
    },

    // Permissions for iOS
    permissions: {
      alert: true,
      badge: true,
      sound: true,
    },

    // Automatic pop-up of notifications (can be set to false if you handle custom notifications)
    popInitialNotification: true,
    requestPermissions: true,
  });

  PushNotification.createChannel(
    {
      channelId: 'default-channel', // Must match the channel ID in the notification
      channelName: 'Default Channel',
      channelDescription: 'A default channel for app notifications',
      soundName: 'default',
      importance: 4, // High importance
      vibrate: true,
    },
    (created) => console.log(`Channel created: ${created}`) // Logs if the channel was created
  );
};

export default configurePushNotifications;
