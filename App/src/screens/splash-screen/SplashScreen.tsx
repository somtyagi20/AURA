import { Image, StyleSheet, View } from 'react-native';
import React, { useEffect } from 'react';
import auraImg from '../../assets/AURA.png';
import { colors } from '../../colors';
import { useNavigation } from '@react-navigation/native';
import { TAuthNavigator } from '../../navigation/auth-navigator/AuthNavigator';

export default function SplashScreen() {
  const navigation = useNavigation<TAuthNavigator>();
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Login');
    }, 2000);
  },[navigation]);

  return (
    <View style={styles.container}>
      <Image source={auraImg} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
