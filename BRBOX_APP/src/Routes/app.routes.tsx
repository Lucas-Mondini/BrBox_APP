import React, {useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Home from '../pages/Home';
import GameInfo from '../pages/GameInfo';

const App = createStackNavigator();

const AppRoutes: React.FC = () => {
  return (
    <App.Navigator
      screenOptions={{headerShown: false}}
    >
      <App.Screen
        name="Main"
        component={Home}
      />
      <App.Screen
        name="GameInfo"
        component={GameInfo}
      />
    </App.Navigator>
  );
};

export default AppRoutes;