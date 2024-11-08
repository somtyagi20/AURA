import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

const ConfirmOtp = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.confirmedText}>OTP Confirmed</Text>
      
      <Image source={require('../../assets/confirm.png')} style={styles.image} />

      <TouchableOpacity style={styles.button} onPress={() => console.log('continue')}>
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
  image: {
    width: 150,
    height: 150,
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

export default ConfirmOtp;
