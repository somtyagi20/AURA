import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const Otpscreen= () => {
  return (
    <View style={styles.container}>
      <Text style={styles.confirmedText}>OTP Confirmed</Text>
      {/* Make sure the icon name is correct and that size and color are specified */}
      <Icon name="checkmark-circle" size={150} color="green" style={styles.icon} />
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('NextScreen')}>
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  confirmedText: {
    fontSize: 24,
    color: '#fff',
    marginBottom: 20,
  },
  icon: {
    marginBottom: 30,
  },
  button: {
    width: '80%',
    paddingVertical: 15,
    backgroundColor: '#4A90E2',
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Otpscreen;
