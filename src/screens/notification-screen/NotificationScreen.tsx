// NotificationsScreen.js
import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const NotificationsScreen = () => {
  const notifications = [
    {
      id: 1,
      type: 'motion',
      location: 'Living room Camera 2',
      time: 'A few seconds ago',
    },
    {
      id: 2,
      type: 'motion',
      location: 'Living room Camera 1',
      time: '11 min ago',
    },
    {
      id: 3,
      type: 'smoke',
      location: 'Smoke Detection',
      time: '24 September 2024',
    },
  ];

  const renderNotification = (notification) => {
    return (
      <View key={notification.id} style={styles.notificationCard}>
        <View>
          <View style={styles.notificationHeader}>
            {notification.type === 'motion' && (
              <Text style={styles.notificationTitle}>
                Motion Detected: <Text style={styles.notificationLocation}>{notification.location}</Text>
              </Text>
            )}
            {notification.type === 'smoke' && (
              <Text style={styles.notificationTitle}>
                {notification.location}
              </Text>
            )}
          </View>
          <Text style={styles.notificationTime}>{notification.time}</Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Notifications</Text>
        <View style={styles.profileButton}>
          <Text style={styles.profileButtonText}>R</Text>
        </View>
      </View>

      {/* Notifications List */}
      <ScrollView style={styles.notificationsList}>
        {notifications.map(renderNotification)}
      </ScrollView>
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
  notificationsList: {
    flex: 1,
    paddingHorizontal: 16,
  },
  notificationCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  notificationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
  },
  notificationLocation: {
    fontWeight: '400',
  },
  notificationTime: {
    fontSize: 14,
    color: '#8E8E93',
    marginTop: 4,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#2C2C2E',
  },
  notificationBadge: {
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -4,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#4CAF50',
    borderWidth: 1,
    borderColor: '#000000',
  },
});

export default NotificationsScreen;
