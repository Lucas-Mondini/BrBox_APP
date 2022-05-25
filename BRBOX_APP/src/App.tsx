import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {StatusBar} from 'react-native';
import Routes from './Routes';
import {AuthProvider} from './Contexts/Auth';
import {RequestProvider} from './Contexts/Request';
import { TermProvider } from './Contexts/TermProvider';

const App: React.FC = () => (
  <NavigationContainer>
    <StatusBar barStyle="light-content" />
    <TermProvider>
      <AuthProvider>
        <RequestProvider>
          <Routes />
        </RequestProvider>
      </AuthProvider>
    </TermProvider>
  </NavigationContainer>
);

export default App;