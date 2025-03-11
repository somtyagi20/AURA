import React from 'react';
import {
  SafeAreaView,
} from 'react-native';
import { Provider } from 'react-redux';
import { store } from './src/app/store';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigation/app-navigator/AppNavigator';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();
function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <SafeAreaView style={{flex: 1}}>
          <NavigationContainer>
          <AppNavigator/>
          </NavigationContainer>
        </SafeAreaView>
     </QueryClientProvider>
    </Provider>
  );
}

export default App;
