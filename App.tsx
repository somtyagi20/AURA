import React from 'react';
import {
  SafeAreaView,
  View,
} from 'react-native';
import { Provider } from 'react-redux';
import { store } from './src/app/store';
import Login from './src/screens/login-screen/Login';
import Signup from './src/screens/signup-screen/Signup';

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
     <SafeAreaView>
      <View>
        <Signup/>
      </View>
     </SafeAreaView>
    </Provider>
  );
}

export default App;
