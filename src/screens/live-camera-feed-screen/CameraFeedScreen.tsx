import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useAppSelector } from '../../app/hooks';
import { WebView } from 'react-native-webview';

const CameraFeed = ({ id, room, time }) => {
  const [isCameraOff, setIsCameraOff] = useState(false);
  return (
    <View style={styles.cameraSection}>
      <Text style={styles.cameraTitle}>CAMERA {id}</Text>
      <View style={styles.feedContainer}>
      {isCameraOff ? (
          <View style={styles.cameraOffContainer}>
            <Icon name="camera-off" size={60} color="#FF4C4C" />
            <Text style={styles.cameraOffText}>Camera Off</Text>
          </View>
        ) : (
          <WebView
            source={{ uri: 'http://192.168.137.248:8080/browserfs.html' }}
            style={styles.feedImage}
            onError={() => setIsCameraOff(true)} // Handle server error
          />
        )}
        <View style={styles.overlayContainer}>
          <View style={styles.leftOverlay}>
            <View style={styles.roomIndicator}>
              <Icon name="circle-small" size={20} color="white" />
              <Text style={styles.roomText}>{room}</Text>
            </View>
          </View>
          <View style={styles.rightOverlay}>
            <Text style={styles.timeText}>{time}</Text>
            <View style={styles.liveIndicator}>
              <Text style={styles.liveText}>LIVE</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const CameraFeedScreen = () => {
  const user = useAppSelector(state => state.login.user);

  const [currentTime, setCurrentTime] = useState('');

  const cameras = [
    { id: 1, room: 'Living Room', time: currentTime },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const ampm = hours >= 12 ? 'PM' : 'AM';
      const formattedHours = hours % 12 || 12;
      const time = `${formattedHours}:${minutes} ${ampm}`;
      setCurrentTime(time);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Live Camera Feed</Text>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{user?.name[0]}</Text>
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
    width: '100%',
    height: 200,
  },
  cameraTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
  feedContainer: {
    width: '100%',
    height: 195,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
    borderRadius: 20,
  },
  feedImage: {
    width: 350,
    height: 220,
  },
  cameraOffContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 350,
    height: 220,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    borderRadius: 10,
  },
  cameraOffText: {
    color: '#FF4C4C',
    fontSize: 18,
    fontWeight: '600',
    marginTop: 10,
  },
  overlayContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    paddingVertical: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  leftOverlay:{},
  rightOverlay: {
    gap: 125,
  },
  liveIndicator: {
    backgroundColor: '#FF4C4C',
    paddingHorizontal: 5,
    paddingVertical: 5,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
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
