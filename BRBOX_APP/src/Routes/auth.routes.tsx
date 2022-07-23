import React, {useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Main from '../pages/Main';
import Login from '../pages/Login';
import Register from '../pages/Register';
import ChangePassword from '../pages/ChangePassword';

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
      <App.Screen
        name="ChangePassword"
        component={ChangePassword}
      />
    </App.Navigator>
  );
};

export default AuthRoutes;