import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Home from '../pages/Home';
import GameInfo from '../pages/GameInfo';
import Profile from '../pages/Profile';
import TagRegister from '../pages/TagRegister';
import TagList from '../pages/TagList';
import UserList from '../pages/UserList';
import AddGame from '../pages/AddGame';
import AddPlatform from '../pages/AddPlatform';
import Platforms from '../pages/Platforms';
import BusinessModelList from '../pages/BusinessModelList';
import AddBusinessModel from '../pages/AddBusinessModel';
import { useAuth } from '../Contexts/Auth';
import Suggestion from '../pages/Suggestion';

const App = createStackNavigator();

const AppRoutes: React.FC = () => {
  const {user} = useAuth();

  return (
      <App.Navigator
        screenOptions={{headerShown: false}}
      >
        <App.Screen
          name="Home"
          component={Home}
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
          name="Suggestion"
          component={Suggestion}
        />

        {user?.admin && <>
          <App.Screen
            name="TagList"
            component={TagList}
          />
          <App.Screen
            name="BusinessModelList"
            component={BusinessModelList}
          />
          <App.Screen
            name="AddBusinessModel"
            component={AddBusinessModel}
          />
          <App.Screen
            name="UserList"
            component={UserList}
          />
          <App.Screen
            name="TagRegister"
            component={TagRegister}
          />
          <App.Screen
            name="AddGame"
            component={AddGame}
          />
          <App.Screen
            name="Platforms"
            component={Platforms}
          />
          <App.Screen
            name="AddPlatform"
            component={AddPlatform}
          /></>
        }
      </App.Navigator>
  );
};

export default AppRoutes;