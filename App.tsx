import React from 'react';
import {
  Text,
  View,
} from 'react-native';
import { Provider } from 'react-redux';
import { store } from './src/app/store';

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <View>
        <Text>Hii</Text>
      </View>
    </Provider>
  );
}

export default App;
