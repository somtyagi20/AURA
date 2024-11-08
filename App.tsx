import React from 'react';
import {
  SafeAreaView,
} from 'react-native';
import { Provider } from 'react-redux';
import { store } from './src/app/store';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigation/app-navigator/AppNavigator';
import AuthNavigator from './src/navigation/auth-navigator/AuthNavigator';
import ConfirmOtp from './src/screens/ConfirmOtp-screen/ConfirmOtp';
import EnterOtp from './src/screens/enter-otp-screen/EnterOtp';


function App(): React.JSX.Element {
  return (
    <Provider store={store}>
     <SafeAreaView style={{height: '100%'}}>
      <NavigationContainer>
      <EnterOtp />
      
      </NavigationContainer>
     </SafeAreaView>
    </Provider>
  );
}

export default App;
