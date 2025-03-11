import React from 'react';
import {
    NativeStackNavigationProp,
    createNativeStackNavigator,
  } from '@react-navigation/native-stack';
import SplashScreen from '../../screens/splash-screen/SplashScreen';
import Signup from '../../screens/signup-screen/Signup';
import Login from '../../screens/login-screen/Login';

export type AuthStackParamList = {
    SplashScreen: undefined;
    Signup: undefined;
    Login: undefined;
   };

const Stack = createNativeStackNavigator<AuthStackParamList>();

const AuthNavigator = () => {
    return(
        <Stack.Navigator
        initialRouteName="SplashScreen"
        screenOptions={{ headerShown: false, animation: 'slide_from_bottom' }}>
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="Login" component={Login} />
        </Stack.Navigator>
    );
};

export type TAuthNavigator = NativeStackNavigationProp<AuthStackParamList>;

export default AuthNavigator;
