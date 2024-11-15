// NotificationsScreen.js
import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, StyleSheet, FlatList, StatusBar } from 'react-native';
import io from 'socket.io-client';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useAppSelector } from '../../app/hooks';


const socket = io('http://192.168.137.62:3000'); // Adjust the URL to your backend

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
    });

    socket.on('intruderAlert',(data)=>{
      const intruderAlert = {
        id: notifications.length + 1,
        type: 'intruder',
        location: 'Intruder Detection',
        time: new Date().toLocaleString(),
        message: data.message
      }
      setNotifications((prevNotifications) => [intruderAlert, ...prevNotifications]);
    })

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('smokeAlert');
      socket.off('intruderAlert');
    };
  }, [notifications]);

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
