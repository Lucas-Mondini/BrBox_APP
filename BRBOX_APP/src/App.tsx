import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import Routes from './Routes';
import { AuthProvider } from './Contexts/Auth';
import { TermProvider } from './Contexts/TermProvider';
import { ThemeProvider } from './Contexts/Theme';
import { RequestProvider } from './Contexts/Request';
import { LinkingProvider } from './Contexts/LinkingProvider';

const linking = {
  prefixes: ['gamescore://gameinfo']
};

const App: React.FC = () => (
  <NavigationContainer
    linking={linking}
  >
    <StatusBar barStyle="light-content" />
    <LinkingProvider>
      <TermProvider>
        <AuthProvider>
          <RequestProvider>
            <ThemeProvider>
                <Routes />
            </ThemeProvider>
          </RequestProvider>
        </AuthProvider>
      </TermProvider>
    </LinkingProvider>
  </NavigationContainer>
);

export default App;