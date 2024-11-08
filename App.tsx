import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Otpscreen from './src/screens/otp-screen/Otpscreen'

export default function App() {
  return (
    <SafeAreaView style={{height:100}}>
      <View>
      <Otpscreen  />
    </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({})
