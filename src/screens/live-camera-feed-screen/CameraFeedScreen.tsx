// CameraFeedScreen.js
import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import roomImg from '../../assets/room-image.png';

const CameraFeed = ({ id, room, time }) => {
  return (
    <View style={styles.cameraSection}>
      <Text style={styles.cameraTitle}>CAMERA {id}</Text>
      <View style={styles.feedContainer}>
        <Image
          source={roomImg}
          style={styles.feedImage}
          resizeMode="cover"
        />
        <View style={styles.overlayContainer}>
          <View style={styles.leftOverlay}>
            <View style={styles.liveIndicator}>
              <Text style={styles.liveText}>LIVE</Text>
            </View>
            <View style={styles.roomIndicator}>
              <Icon name="circle-small" size={20} color="white" />
              <Text style={styles.roomText}>{room}</Text>
            </View>
          </View>
          <View style={styles.rightOverlay}>
            <Text style={styles.timeText}>{time}</Text>
            <TouchableOpacity style={styles.settingsButton}>
              <Icon name="dots-horizontal" size={20} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const CameraFeedScreen = () => {
  const tabs = [
    { icon: 'home', active: false },
    { icon: 'camera', active: true },
    { icon: 'view-grid', active: false },
    { icon: 'account-multiple', active: false },
    { icon: 'bell', badge: true, active: false },
    { icon: 'account', active: false },
  ];

  const cameras = [
    { id: 1, room: 'Living Room', time: '10:23 AM' },
    { id: 2, room: 'Living Room', time: '10:23 AM' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Live Camera Feed</Text>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>R</Text>
        </View>
      </View>

      {/* Camera Feeds */}
      {cameras.map((camera) => (
        <CameraFeed
          key={camera.id}
          id={camera.id}
          room={camera.room}
          time={camera.time}
        />
      ))}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#1E1E1E',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: '600',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#7367F0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  cameraSection: {
    padding: 20,
  },
  cameraTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
  feedContainer: {
    borderRadius: 15,
    overflow: 'hidden',
    backgroundColor: '#1E1E1E',
  },
  feedImage: {
    width: '100%',
    height: 200,
  },
  overlayContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  leftOverlay: {
    flexDirection: 'column',
    gap: 8,
  },
  rightOverlay: {
    flexDirection: 'column',
    alignItems: 'flex-end',
    gap: 8,
  },
  liveIndicator: {
    backgroundColor: '#FF4C4C',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  liveText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  roomIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  roomText: {
    color: 'white',
    fontSize: 14,
  },
  timeText: {
    color: 'white',
    fontSize: 14,
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  settingsButton: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 5,
    borderRadius: 5,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 15,
    backgroundColor: '#1E1E1E',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  navItem: {
    padding: 10,
  },
  badge: {
    position: 'absolute',
    right: -2,
    top: -2,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF4C4C',
  },
});

export default CameraFeedScreen;
