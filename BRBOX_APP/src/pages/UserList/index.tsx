import { FlatList } from 'react-native-gesture-handler';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  RefreshControl,
  View
} from 'react-native';

import BottomMenu from '../../components/BottomMenu';
import UserCard from '../../components/UserCard';
import MainView from '../../components/MainView';
import styles from './styles';

import { Game } from '../../utils/types';
import { useRequest } from '../../Contexts/Request';
import deedLinking from '../../utils/deepLinking';

const UserList = () => {
  const navigation = useNavigation<any>();
  const [users, setUsers] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const isFocused = useIsFocused()

  const {get} = useRequest();

  async function getUsers()
  {
    try {
      const users = await get("/user", setLoading);

      setUsers(users);
    } catch (err) {
      return navigation.reset({index: 0, routes: [{name: "Home"}]});
    }
  }

  async function navigateToAddUser()
  {
    return navigation.navigate("Profile", {new: true});
  }

  function renderUsers()
  {
    return (
      <FlatList
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={getUsers}/>
        }
        data={users}
        keyExtractor={(user: any) => user.id}
        renderItem={
          ({item}: any) => {
            return (
              <UserCard
                id={item.id}
                username={item.username}
                email={item.email}
                admin={item.admin}
                setLoading={setLoading}
                callback={getUsers}
              />
            )
          }
        }
      />);
  }

  useEffect(()=>{
    if (isFocused) getUsers();
  }, [isFocused]);

  useEffect(() => {
    deedLinking(navigation);
  }, []);

  return (
    <MainView
      showTitle
      loading={loading}
      headerTitle={100031}
      headerAddButtonAction={navigateToAddUser}
    >
      <View style={styles.container}>
        {renderUsers()}
      </View>

      <BottomMenu/>
    </MainView>
  );
};

export default UserList;