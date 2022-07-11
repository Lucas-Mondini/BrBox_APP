import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { ActivityIndicator, StatusBar } from 'react-native';

import Routes from './Routes';
import { AuthProvider } from './Contexts/Auth';
import { RequestProvider } from './Contexts/Request';
import { TermProvider } from './Contexts/TermProvider';
import { ThemeProvider } from './Contexts/Theme';

const linking = {
  prefixes: ['gamescore://']
};

const App: React.FC = () => (
  <NavigationContainer
    linking={linking}
    fallback={<ActivityIndicator color="blue" size="large" />}
  >
    <StatusBar barStyle="light-content" />
    <TermProvider>
      <AuthProvider>
        <RequestProvider>
          <ThemeProvider>
            <Routes />
          </ThemeProvider>
        </RequestProvider>
      </AuthProvider>
    </TermProvider>
  </NavigationContainer>
);

export default App;