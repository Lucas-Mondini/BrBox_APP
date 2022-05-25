import React, {useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Main from '../pages/Main';
import Login from '../pages/Login';
import Register from '../pages/Register';

const App = createStackNavigator();

const AuthRoutes: React.FC = () => {
  return (
    <App.Navigator
      screenOptions={{headerShown: false}}
    >
      <App.Screen
        name="Main"
        component={Main}
      />
      <App.Screen
        name="Login"
        component={Login}
      />
      <App.Screen
        name="Register"
        component={Register}
      />
    </App.Navigator>
  );
};

export default AuthRoutes;