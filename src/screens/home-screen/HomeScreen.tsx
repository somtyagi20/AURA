// App.js
import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  Modal, TextInput, Image,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import { useAppSelector } from '../../app/hooks';
import { ImageLibraryOptions, launchImageLibrary } from 'react-native-image-picker';
import axios from 'axios';
import io  from 'socket.io-client';

const Socket = io('http://192.168.137.238:3000');

const HomeScreen = () => {
  const [indoorTemp, setIndoorTemp] = useState(28);
  const [humidity, setHumidity] = useState(45);
  const user = useAppSelector(state => state.login.user);
  const [devices, setDevices] = useState({
    smartLamp1: true,
    smartLamp2: false,
    airConditioner: false,
    smartFan: false,
  });

  const toggleDevice = (device) => {
    setDevices(prev => ({
      ...prev,
      [device]: !prev[device],
    }));
  };

  const rooms = [
    { name: 'Living Room (3)', active: true },
  ];

  const [familyMembers, setFamilyMembers] = useState([]);
  const [showAddFamilyMemberModal, setShowAddFamilyMemberModal] = useState(false);
  const [newFamilyMemberName, setNewFamilyMemberName] = useState('');
  const [newFamilyMemberPhoto, setNewFamilyMemberPhoto] =  useState<string | null>(null);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  // useEffect(() => {
  //   fetchFamilyMembers();
  // }, []);

  // const fetchFamilyMembers = async () => {
  //   try {
  //     const response = await axios.get('/api/family-members');
  //     setFamilyMembers(response.data);
  //   } catch (error) {
  //     console.error('Error fetching family members:', error);
  //   }
  // };

  useEffect(() => {
    Socket.on('humidityData', (data) => {
      setHumidity(data);
    });

    Socket.on('temperatureData', (data) => {
      setIndoorTemp(data);
    });

    return () => {
      Socket.off('humidityData');
      Socket.off('temperatureData');
    };
  }, []);

  const handleAddFamilyMember = () => {
    setShowAddFamilyMemberModal(true);
  };

  const handleSaveFamilyMember = async () => {
    try {
      const formData = new FormData();
      formData.append('name', newFamilyMemberName);
  
      if (newFamilyMemberPhoto) {
        const response = await fetch(newFamilyMemberPhoto);
        const blob = await response.blob();
        const file = new File([blob], 'photo.jpg', { type: blob.type, lastModified: Date.now() });
        formData.append('image', file);
      }
  
      // await axios.post('http://192.168.1.9:5000/add_family_member', formData, {
      //   headers: {
      //     'Content-Type': 'multipart/form-data',
      //   },
      // }).then((response) => {
      //   console.log('Response:', response);
      // });
  
      setShowAddFamilyMemberModal(false);
      setNewFamilyMemberName('');
      setNewFamilyMemberPhoto(null);

      // Show confirmation modal
    setShowConfirmationModal(true);

    // Hide confirmation modal after 3 seconds
    setTimeout(() => setShowConfirmationModal(false), 3000);

    // Optionally fetch updated family members
    // fetchFamilyMembers();
    } catch (error) {
      console.error('Error saving family member:', error);
    }
  };

  // const handleViewFamilyMembers = () => {
  //   // Navigate to a new screen to display the family members
  // };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.greeting}>
          <Text style={styles.greetingText}>Hello Som!</Text>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{user?.name[0]}</Text>
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
            <Text style={styles.weatherStatus}>Mostly Clear</Text>
            <Icon name="weather-partly-cloudy" size={24} color="white" />
          </View>

          <View style={styles.weatherDetails}>
            <View style={styles.weatherDetail}>
              <Text style={styles.weatherValue}>{indoorTemp}°C</Text>
              <Text style={styles.weatherLabel}>Indoor Temp.</Text>
            </View>
            <View style={styles.weatherDivider} />
            <View style={styles.weatherDetail}>
              <Text style={styles.weatherValue}>29°C</Text>
              <Text style={styles.weatherLabel}>Outdoor Temp.</Text>
            </View>
            <View style={styles.weatherDivider} />
            <View style={styles.weatherDetail}>
              <Text style={styles.weatherValue}>{humidity}%</Text>
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
      <View style={styles.intruderDetection}>
        <Text style={styles.sectionTitle}>Intruder Detection</Text>
        <View style={styles.intruderActions}>
          <TouchableOpacity style={styles.intruderButton}  onPress={handleAddFamilyMember}>
            <Text style={styles.intruderButtonText}>Add Family Member</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Modal visible={showAddFamilyMemberModal} animationType="slide">
      <SafeAreaView style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Add Family Member</Text>
          <TextInput
            style={styles.modalInput}
            placeholder="Name"
            value={newFamilyMemberName}
            onChangeText={setNewFamilyMemberName}
          />
          {newFamilyMemberPhoto ? (
            <Image source={{ uri: newFamilyMemberPhoto }} style={styles.modalImage} />
          ) : (
            <TouchableOpacity
              style={styles.modalImageUpload}
              onPress={() => {
                const options: ImageLibraryOptions = {
                  mediaType: 'photo',  // Ensure this is either 'photo', 'video', or 'mixed'
                  quality: 1,           // Image quality
                  maxWidth: 800,        // Resize the image width
                  maxHeight: 800,       // Resize the image height
                };

                launchImageLibrary(options, (response) => {
                  if (response.didCancel) {
                    console.log('User cancelled image picker');
                  } else if (response.errorMessage) {
                    console.error('ImagePicker Error: ', response.errorMessage);
                  } else if (response.assets && response.assets.length > 0) {
                    // Safe access of the image URI
                    const selectedImageUri = response.assets[0].uri;
                    if (selectedImageUri) {
                      setNewFamilyMemberPhoto(selectedImageUri);  // Update the photo URI
                    }
                  }
                });
              }}
            >
              <Icon name="camera" size={24} color="white" />
              <Text style={styles.modalImageUploadText}>Upload Photo</Text>
            </TouchableOpacity>
          )}
          <View style={styles.modalActions}>
            <TouchableOpacity style={styles.modalButton} onPress={handleSaveFamilyMember}>
              <Text style={styles.modalButtonText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.modalButton, styles.modalCancelButton]}
              onPress={() => setShowAddFamilyMemberModal(false)}
            >
              <Text style={styles.modalButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </Modal>
    <Modal
        visible={showConfirmationModal}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setShowConfirmationModal(false)}
      >
        <View style={styles.confirmationModalContainer}>
          <View style={styles.confirmationModal}>
            <Icon name="check-circle" size={50} color="#4CAF50" />
            <Text style={styles.confirmationText}>Family Member Added!</Text>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#000',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  modalInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 8,
  },
  modalImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  modalImageUpload: {
    padding: 10,
    backgroundColor: '#007bff',
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  modalImageUploadText: {
    color: 'white',
    marginTop: 5,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalButton: {
    padding: 10,
    backgroundColor: '#28a745',
    borderRadius: 5,
  },
  modalButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  modalCancelButton: {
    backgroundColor: '#dc3545',
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
  intruderDetection: {
    padding: 20,
    backgroundColor: '#1E1E1E',
    borderRadius: 15,
    marginTop: 20,
  },
  intruderActions: {
    flexDirection: 'row',
    marginTop: 10,
    paddingHorizontal: 10,
    gap: 10,
  },
  intruderButton: {
    backgroundColor: '#7367F0',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  intruderButtonText: {
    color: 'white',
    fontSize: 13,
    fontWeight: '600',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#1E1E1E',
    padding: 20,
    borderRadius: 15,
    width: '80%',
  },
  modalTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 10,
  },
  modalInput: {
    backgroundColor: '#2C2C2C',
    borderRadius: 10,
    padding: 10,
    color: 'white',
    marginBottom: 10,
  },
  modalImageUpload: {
    backgroundColor: '#2C2C2C',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  modalImageUploadText: {
    color: 'white',
    marginTop: 5,
  },
  modalImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalButton: {
    backgroundColor: '#7367F0',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    flex: 1,
  },
  modalCancelButton: {
    backgroundColor: '#4D4D4D',
    marginLeft: 10,
  },
  modalButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  confirmationModalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  confirmationModal: {
    width: 250,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  confirmationText: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: '600',
    color: '#4CAF50',
    textAlign: 'center',
  },
});

export default HomeScreen;
