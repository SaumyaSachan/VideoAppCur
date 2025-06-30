import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { ReduxProvider } from './src/redux/Provider';
import AppNavigation from './src/navigation/AppNavigator';

const App = () => {
  return (
    <ReduxProvider>
      <NavigationContainer>
        <StatusBar barStyle="light-content" backgroundColor="#041524" />
        <AppNavigation />
      </NavigationContainer>
    </ReduxProvider>
  );
};

export default App; 