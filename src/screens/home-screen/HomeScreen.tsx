// App.js
import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';

const HomeScreen = () => {

  const [devices, setDevices] = useState({
    smartLamp1: true,
    smartLamp2: false,
    airConditioner: false,
    smartFan: false,
  });

  const toggleDevice = (device) => {
    setDevices(prev => ({
      ...prev,
      [device]: !prev[device]
    }));
  };

  const rooms = [
    { name: 'Living Room (3)', active: true },
    { name: 'Kitchen', active: false },
    { name: 'Bedroom', active: false },
    { name: 'Dinning Room', active: false },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.greeting}>
          <Text style={styles.greetingText}>Hello Som!</Text>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>S</Text>
          </View>
        </View>
      </View>

      {/* Weather Card */}
      <LinearGradient
        colors={['#7367F0', '#6554e8']}
        style={styles.weatherCard}
      >
        <View style={styles.weatherLocation}>
          <Icon name="map-marker" size={20} color="white" />
          <Text style={styles.locationText}>Indore, Madhya Pradesh</Text>
        </View>

        <View style={styles.weatherMain}>
          <View style={styles.weatherInfo}>
            <Text style={styles.weatherStatus}>Partly Cloudy</Text>
            <Icon name="weather-partly-cloudy" size={24} color="white" />
          </View>

          <View style={styles.weatherDetails}>
            <View style={styles.weatherDetail}>
              <Text style={styles.weatherValue}>26°C</Text>
              <Text style={styles.weatherLabel}>Indoor Temp.</Text>
            </View>
            <View style={styles.weatherDivider} />
            <View style={styles.weatherDetail}>
              <Text style={styles.weatherValue}>32°C</Text>
              <Text style={styles.weatherLabel}>Outdoor Temp.</Text>
            </View>
            <View style={styles.weatherDivider} />
            <View style={styles.weatherDetail}>
              <Text style={styles.weatherValue}>45%</Text>
              <Text style={styles.weatherLabel}>Humidity</Text>
            </View>
          </View>
        </View>
      </LinearGradient>

      {/* Connected Devices */}
      <View style={styles.devicesSection}>
        <View style={styles.devicesSectionHeader}>
          <Text style={styles.sectionTitle}>Connected devices</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View>

        {/* Room Selection */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.roomsScroll}
        >
          {rooms.map((room, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.roomButton,
                room.active && styles.roomButtonActive,
              ]}
            >
              <Text
                style={[
                  styles.roomButtonText,
                  room.active && styles.roomButtonTextActive,
                ]}
              >
                {room.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Devices Grid */}
        <View style={styles.devicesGrid}>
          <View style={styles.deviceCard}>
            <View style={styles.deviceHeader}>
              <Icon name="lightbulb" size={24} color="white" />
              <Text style={styles.deviceCount}>2 Devices</Text>
            </View>
            <Text style={styles.deviceName}>Smart lamp</Text>
            <View style={styles.deviceStatus}>
              <Text style={styles.statusText}>ON</Text>
              <Icon 
                name="power" 
                size={20} 
                color={devices.airConditioner ? '#fff' : '#8E8E93'} 
              />
            </View>
          </View>

          <View style={styles.deviceCard}>
            <View style={styles.deviceHeader}>
              <Icon name="air-conditioner" size={24} color="white" />
              <Text style={styles.deviceCount}>1 Device</Text>
            </View>
            <Text style={styles.deviceName}>Smart air</Text>
            <Text style={styles.deviceName}>conditioner</Text>
            <View style={styles.deviceStatus}>
              <Text style={styles.statusText}>OFF</Text>
              <Icon 
                name="power" 
                size={20} 
                color={devices.airConditioner ? '#fff' : '#8E8E93'} 
              />
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#000',
  },
  header: {
    padding: 20,
  },
  greeting: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greetingText: {
    color: 'white',
    fontSize: 24,
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
  weatherCard: {
    margin: 20,
    padding: 20,
    borderRadius: 15,
  },
  weatherLocation: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    color: 'white',
    marginLeft: 5,
  },
  weatherMain: {
    marginTop: 10,
  },
  weatherInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  weatherStatus: {
    color: 'white',
    fontSize: 24,
    fontWeight: '600',
  },
  weatherDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  weatherDetail: {
    flex: 1,
    alignItems: 'center',
  },
  weatherValue: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  weatherLabel: {
    color: 'white',
    fontSize: 12,
    opacity: 0.8,
    marginTop: 5,
  },
  weatherDivider: {
    width: 1,
    height: '100%',
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  devicesSection: {
    padding: 20,
  },
  devicesSectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: '600',
  },
  seeAllText: {
    color: '#7367F0',
    fontSize: 14,
  },
  roomsScroll: {
    marginTop: 15,
  },
  roomButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 10,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  roomButtonActive: {
    backgroundColor: '#7367F0',
  },
  roomButtonText: {
    color: 'white',
    opacity: 0.8,
  },
  roomButtonTextActive: {
    opacity: 1,
  },
  devicesGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  deviceCard: {
    width: '48%',
    padding: 15,
    backgroundColor: '#1E1E1E',
    borderRadius: 15,
  },
  deviceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  deviceCount: {
    color: 'white',
    marginLeft: 10,
    fontSize: 12,
    opacity: 0.8,
  },
  deviceName: {
    color: 'white',
    fontSize: 16,
  },
  deviceStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 'auto',
  },
  statusText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  statusIndicator: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#4CAF50',
  },
  statusOff: {
    backgroundColor: '#666',
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
});

export default HomeScreen;
