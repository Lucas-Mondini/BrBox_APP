import React, {useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Home from '../pages/Home';
import GameInfo from '../pages/GameInfo';
import Profile from '../pages/Profile';
import TagRegister from '../pages/TagRegister';
import TagList from '../pages/TagList';
import UserList from '../pages/UserList';

const App = createStackNavigator();

const AppRoutes: React.FC = () => {
  return (
    <App.Navigator
      screenOptions={{headerShown: false}}
    >
      <App.Screen
        name="Home"
        component={Home}
      />
      <App.Screen
        name="TagList"
        component={TagList}
      />
      <App.Screen
        name="UserList"
        component={UserList}
      />
      <App.Screen
        name="GameInfo"
        component={GameInfo}
      />
      <App.Screen
        name="SearchGame"
        component={GameInfo}
      />
      <App.Screen
        name="Share"
        component={GameInfo}
      />
      <App.Screen
        name="Profile"
        component={Profile}
      />
      <App.Screen
        name="TagRegister"
        component={TagRegister}
      />
    </App.Navigator>
  );
};

export default AppRoutes;