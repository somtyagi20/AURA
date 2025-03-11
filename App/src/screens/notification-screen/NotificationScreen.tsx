import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, StyleSheet, FlatList, StatusBar, PermissionsAndroid, Platform } from 'react-native';
import io from 'socket.io-client';
import { useAppSelector } from '../../app/hooks';
import PushNotification from 'react-native-push-notification';


const socket = io('http://192.168.137.238:3000'); // Adjust the URL to your backend

const NotificationsScreen = () => {
  const user = useAppSelector(state => state.login.user);
  const [notifications, setNotifications] = useState([
  ]);

  useEffect(() => {
    socket.on('connect', () => {
      console.log('Connected to backend');
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from backend');
    });

    socket.on('smokeAlert', (data) => {
      const newNotification = {
        id: notifications.length + 1,
        type: 'smoke',
        location: 'Smoke Detection',
        time: new Date().toLocaleString(),
        value: data.value,
      };
      setNotifications((prevNotifications) => [newNotification, ...prevNotifications]);

      // Send push notification
      PushNotification.localNotification({
        channelId: 'default-channel', // Must match the created channel ID
        title: 'Smoke Alert 🚨',
        message: `Smoke Level: ${data.value}`,
        bigText: `Smoke detected in ${newNotification.location}. Level: ${data.value}`,
        vibrate: true,
        vibration: 300,
        playSound: true,
        soundName: 'default',
      });
    });

    socket.on('intruderAlert', (data) => {
      const intruderAlert = {
        id: notifications.length + 1,
        type: 'intruder',
        location: 'Intruder Detection',
        time: new Date().toLocaleString(),
        message: data.message,
      };
      setNotifications((prevNotifications) => [intruderAlert, ...prevNotifications]);

      // Send push notification
      PushNotification.localNotification({
        channelId: 'default-channel',
        title: 'Intruder Alert 🚨',
        message: data.message,
        bigText: `Intruder detected in ${intruderAlert.location}. Message: ${data.message}`,
        vibrate: true,
        vibration: 300,
        playSound: true,
        soundName: 'default',
      });
    });

    socket.on('emergencyAlert', (data) => {
      const emergencyAlert = {
        id: notifications.length + 1,
        type: 'emergency',
        location: 'Emergency Alert',
        time: new Date().toLocaleString(),
        message: data.message,
      };
      setNotifications((prevNotifications) => [emergencyAlert, ...prevNotifications]);

      // Send push notification
      PushNotification.localNotification({
        channelId: 'default-channel',
        title: 'Emergency Alert 🚨',
        message: data.message,
        bigText: `Emergency alert in ${emergencyAlert.location}. Message: ${data.message}`,
        vibrate: true,
        vibration: 300,
        playSound: true,
        soundName: 'default',
      }); 
    });

      

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('smokeAlert');
      socket.off('intruderAlert');
      socket.off('emergencyAlert');
    };
  }, [notifications]);

  useEffect(() => {
    const requestNotificationPermission = async () => {
      if (Platform.OS === 'android' && Platform.Version >= 33) {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
        );

        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Notification permission denied');
        }
      }
    };

    requestNotificationPermission();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.notificationCard}>
      <Text style={styles.notificationType}>{item.type.toUpperCase()}</Text>
      <Text style={styles.notificationLocation}>{item.location}</Text>
      <Text style={styles.notificationTime}>{item.time}</Text>
      {item.type === 'smoke' && (
        <Text style={styles.notificationValue}>Smoke Level: {item.value}</Text>
      )}
      {item.type === 'intruder' && (
        <Text style={styles.notificationValue}>{item.message}</Text>
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.headerText}>Notifications</Text>
        <View style={styles.profileButton}>
          <Text style={styles.profileButtonText}>{user.name[0]}</Text>
        </View>
      </View>
      <FlatList
        data={notifications}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerText: {
    fontSize: 24,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  profileButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#6366F1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  notificationCard: {
    backgroundColor: '#1E1E1E',
    padding: 20,
    marginVertical: 10,
    marginHorizontal: 20,
    borderRadius: 10,
  },
  notificationType: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  notificationLocation: {
    color: '#FFF',
    fontSize: 16,
  },
  notificationTime: {
    color: '#8E8E93',
    fontSize: 14,
    marginTop: 4,
  },
  notificationValue: {
    color: '#FFF',
    fontSize: 14,
    marginTop: 4,
  },
});

export default NotificationsScreen;
