import React, {useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Home from '../pages/Home';

const App = createStackNavigator();

const AuthRoutes: React.FC = () => {
  return (
    <App.Navigator
      screenOptions={{headerShown: false}}
    >
      <App.Screen
        name="Main"
        component={Home}
      />
    </App.Navigator>
  );
};

export default AuthRoutes;