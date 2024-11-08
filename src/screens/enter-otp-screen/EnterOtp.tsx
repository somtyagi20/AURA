import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import {OtpInput} from 'react-native-otp-entry';

const EnterOtp = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter OTP</Text>

      {/* Icon */}
      <Image source={require('../../assets/AURA.png')} style={styles.image} />

      {/* OTP Input */}
      <OtpInput
        numberOfDigits={4}
        focusColor="#4A90E2" // Light blue color for focus to match the confirm button
        focusStickBlinkingDuration={500}
        onTextChange={(text) => console.log(text)}
        onFilled={(text) => console.log(`OTP is ${text}`)}
        textInputProps={{
          accessibilityLabel: "One-Time Password",
        }}
        theme={{
          containerStyle: styles.otpContainer,
          pinCodeContainerStyle: styles.otpBox,
          pinCodeTextStyle: styles.otpText,
          focusStickStyle: styles.focusStick,
          focusedPinCodeContainerStyle: styles.activeOtpBox,
        }}
      />

      {/* Confirm Button */}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Confirm</Text>
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
  title: {
    fontSize: 24,
    color: '#fff',
    marginBottom: 20,
    fontWeight: 'bold',
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  otpBox: {
    width: 50,
    height: 50,
    backgroundColor: '#fff',
    textAlign: 'center',
    fontSize: 20,
    color: '#000',
    marginHorizontal: 5,
    borderRadius: 8,
  },
  otpText: {
    fontSize: 20,
    color: '#000',
    textAlign: 'center',
  },
  activeOtpBox: {
    borderColor: '#4A90E2', // Light blue border for the focused OTP box
    borderWidth: 2,
  },
  focusStick: {
    backgroundColor: '#4A90E2', // Light blue focus stick to match the confirm button
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

export default EnterOtp;
