import React from 'react';
import {
  SafeAreaView,
} from 'react-native';
import { Provider } from 'react-redux';
import { store } from './src/app/store';
import { NavigationContainer } from '@react-navigation/native';
// import AppNavigator from './src/navigation/app-navigator/AppNavigator';
import AuthNavigator from './src/navigation/auth-navigator/AuthNavigator';
import TabNavigator from './src/navigation/tab-navigator/TabNavigator';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();
function App(): React.JSX.Element {
  const isAuthenticated = true;
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <SafeAreaView style={{flex: 1}}>
          <NavigationContainer>
          {isAuthenticated ? <TabNavigator /> : <AuthNavigator />}
          </NavigationContainer>
        </SafeAreaView>
     </QueryClientProvider>
    </Provider>
  );
}

export default App;
