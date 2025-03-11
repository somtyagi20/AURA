import React from 'react';
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
import { useAppSelector } from '../../app/hooks';
import { store } from '../../app/store';
import { logout } from '../../app/reducers/login/login-reducer';

const ProfileScreen = () => {
  const user = useAppSelector(state => state.login.user);

  const profileDetails = [
    { icon: 'phone', value: user?.phone_number },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Profile</Text>
        <View style={styles.avatarSmall}>
          <Text style={styles.avatarText}>{user?.name[0]}</Text>
        </View>
      </View>

      {/* Profile Section */}
      <View style={styles.profileSection}>
        <View style={styles.avatarLarge}>
          <Text style={styles.profileImage}>{user?.name[0]}</Text>
        </View>
        <Text style={styles.profileName}>{user?.name}</Text>
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
        <TouchableOpacity style={styles.signOutRow} onPress={() => {store.dispatch(logout())}}>
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
    backgroundColor: '#7367F0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileImage: {
    color: 'white',
    fontSize: 64,
    fontWeight: '600',
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
