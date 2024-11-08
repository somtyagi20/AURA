// DevicesScreen.js
import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from 'react-native';

// Updated import for MaterialCommunityIcons
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import io from 'socket.io-client';

const socket = io('http://192.168.119.181:3000'); // Adjust the URL to your backend

const DevicesScreen = () => {
  const [selectedRoom, setSelectedRoom] = useState('Living Room');
  const [devices, setDevices] = useState({
    smartLamp1: true,
    smartLamp2: false,
    airConditioner: false,
    smartFan: false,
  });

  const rooms = ['All Devices', 'Living Room', 'Bedroom'];

  useEffect(() => {
    socket.on('connect', () => {
      console.log('Connected to backend');
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from backend');
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
    };
  }, []);

  const toggleDevice = (device) => {
    const newStatus = !devices[device];
    setDevices((prev) => ({
      ...prev,
      [device]: newStatus,
    }));

    // Emit the control event to the backend
    socket.emit('controlLed', { action: newStatus ? 'on' : 'off' });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Devices</Text>
        <View style={styles.profileButton}>
          <Text style={styles.profileButtonText}>R</Text>
        </View>
      </View>

      {/* Room Selector */}
      <View style={styles.roomSelector}>
        {rooms.map((room) => (
          <TouchableOpacity
            key={room}
            style={[
              styles.roomButton,
              selectedRoom === room && styles.selectedRoomButton,
            ]}
            onPress={() => setSelectedRoom(room)}
          >
            <Text
              style={[
                styles.roomButtonText,
                selectedRoom === room && styles.selectedRoomButtonText,
              ]}
            >
              {room}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Devices List */}
      <View style={styles.devicesList}>
        {/* Smart Lamp Section */}
        <View style={styles.deviceSection}>
          <View style={styles.deviceHeader}>
            <Icon name="lightbulb-outline" size={24} color="#fff" />
            <Text style={styles.deviceTitle}>Smart Lamp</Text>
            <Text style={styles.deviceCount}>2 Devices</Text>
          </View>

          <TouchableOpacity 
            style={styles.deviceItem}
            onPress={() => toggleDevice('smartLamp1')}
          >
            <Text style={styles.deviceName}>Smart lamp</Text>
            <View style={[styles.toggle, devices.smartLamp1 && styles.toggleActive]}>
              <Icon 
                name="power" 
                size={20} 
                color={devices.smartLamp1 ? '#fff' : '#8E8E93'} 
              />
            </View>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.deviceItem}
            onPress={() => toggleDevice('smartLamp2')}
          >
            <Text style={styles.deviceName}>Smart lamp</Text>
            <View style={[styles.toggle, devices.smartLamp2 && styles.toggleActive]}>
              <Icon 
                name="power" 
                size={20} 
                color={devices.smartLamp2 ? '#fff' : '#8E8E93'} 
              />
            </View>
          </TouchableOpacity>
        </View>

        {/* Air Conditioner Section */}
        <View style={styles.deviceSection}>
          <View style={styles.deviceHeader}>
            <Icon name="air-conditioner" size={24} color="#fff" />
            <Text style={styles.deviceTitle}>Air Conditioner</Text>
            <Text style={styles.deviceCount}>1 Device</Text>
          </View>

          <TouchableOpacity 
            style={styles.deviceItem}
            onPress={() => toggleDevice('airConditioner')}
          >
            <Text style={styles.deviceName}>Smart air conditioner</Text>
            <View style={[styles.toggle, devices.airConditioner && styles.toggleActive]}>
              <Icon 
                name="power" 
                size={20} 
                color={devices.airConditioner ? '#fff' : '#8E8E93'} 
              />
            </View>
          </TouchableOpacity>
        </View>

        {/* Smart Fan Section */}
        <View style={styles.deviceSection}>
          <View style={styles.deviceHeader}>
            <Icon name="fan" size={24} color="#fff" />
            <Text style={styles.deviceTitle}>Smart Fan</Text>
            <Text style={styles.deviceCount}>1 Device</Text>
          </View>

          <TouchableOpacity 
            style={styles.deviceItem}
            onPress={() => toggleDevice('smartFan')}
          >
            <Text style={styles.deviceName}>Smart Fan</Text>
            <View style={[styles.toggle, devices.smartFan && styles.toggleActive]}>
              <Icon 
                name="power" 
                size={20} 
                color={devices.smartFan ? '#fff' : '#8E8E93'} 
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
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
  roomSelector: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  roomButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    borderRadius: 20,
  },
  selectedRoomButton: {
    backgroundColor: '#FFFFFF',
  },
  roomButtonText: {
    color: '#8E8E93',
    fontSize: 16,
  },
  selectedRoomButtonText: {
    color: '#000000',
  },
  devicesList: {
    flex: 1,
    paddingHorizontal: 16,
  },
  deviceSection: {
    backgroundColor: '#1C1C1E',
    borderRadius: 12,
    marginVertical: 8,
    padding: 16,
  },
  deviceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  deviceTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 8,
    flex: 1,
  },
  deviceCount: {
    color: '#8E8E93',
    fontSize: 14,
  },
  deviceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#2C2C2E',
  },
  deviceName: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  toggle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#2C2C2E',
    justifyContent: 'center',
    alignItems: 'center',
  },
  toggleActive: {
    backgroundColor: '#4CAF50',
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
});

export default DevicesScreen;