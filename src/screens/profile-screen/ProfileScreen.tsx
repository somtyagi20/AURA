// ProfileScreen.js
import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Switch,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import profileImg from '../../assets/Profile-img.jpg';

const ProfileScreen = () => {
  const [isNightMode, setIsNightMode] = useState(true);

  const profileDetails = [
    { icon: 'phone', value: '+919174935380' },
    { icon: 'email', value: 'somtyagi91@gmail.com' },
    { icon: 'map-marker', value: 'Scheme No 74C,\nIndore, Madhya Pradesh' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Profile</Text>
        <View style={styles.avatarSmall}>
          <Text style={styles.avatarText}>S</Text>
        </View>
      </View>

      {/* Profile Section */}
      <View style={styles.profileSection}>
        <View style={styles.avatarLarge}>
          <Image
            source={profileImg}
            style={styles.profileImage}
          />
        </View>
        <Text style={styles.profileName}>Som Tyagi</Text>
      </View>

      {/* Contact Details */}
      <View style={styles.detailsSection}>
        {profileDetails.map((detail, index) => (
          <View key={index} style={styles.detailRow}>
            <Icon name={detail.icon} size={20} color="#7367F0" />
            <Text style={styles.detailText}>{detail.value}</Text>
          </View>
        ))}
      </View>

      {/* Settings */}
      <View style={styles.settingsSection}>
        <View style={styles.settingRow}>
          <View style={styles.settingLeft}>
            <Icon name="moon-waxing-crescent" size={20} color="#7367F0" />
            <Text style={styles.settingText}>Night mode</Text>
          </View>
          <Switch
            value={isNightMode}
            onValueChange={setIsNightMode}
            trackColor={{ false: '#767577', true: '#7367F0' }}
            thumbColor="#fff"
          />
        </View>

        <TouchableOpacity style={styles.signOutRow}>
          <Icon name="logout" size={20} color="#7367F0" />
          <Text style={styles.settingText}>Sign out</Text>
        </TouchableOpacity>
      </View>
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
  avatarSmall: {
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
  profileSection: {
    alignItems: 'center',
    marginTop: 20,
  },
  avatarLarge: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#1E1E1E',
    overflow: 'hidden',
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  profileName: {
    color: 'white',
    fontSize: 24,
    fontWeight: '600',
    marginTop: 15,
  },
  detailsSection: {
    marginTop: 30,
    paddingHorizontal: 20,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#1E1E1E',
  },
  detailText: {
    color: 'white',
    marginLeft: 15,
    fontSize: 16,
  },
  settingsSection: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#1E1E1E',
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingText: {
    color: 'white',
    marginLeft: 15,
    fontSize: 16,
  },
  signOutRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#1E1E1E',
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

export default ProfileScreen;
