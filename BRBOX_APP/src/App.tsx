import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {StatusBar} from 'react-native';
import Routes from './Routes';
//import {AuthProvider} from './Contexts/Auth';
import { TermProvider } from './Contexts/TermProvider';

const App: React.FC = () => (
  <NavigationContainer>
    <StatusBar barStyle="light-content" />
    <TermProvider>
      <Routes />
    </TermProvider>
  </NavigationContainer>
);

/* const App: React.FC = () => (
  <NavigationContainer>
    <StatusBar barStyle="light-content" />

    <AuthProvider>
      <RequestProvider>
        <Routes />
      </RequestProvider>
    </AuthProvider>
  </NavigationContainer>
); */

export default App;