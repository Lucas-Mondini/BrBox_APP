import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import MainView from '../../components/MainView';
import { useAuth } from '../../Contexts/Auth';
import { useRequest } from '../../Contexts/Request';
import { useTerm } from '../../Contexts/TermProvider';

const Profile = () => {
  const navigation = useNavigation<any>();
  const {user, setUser, signOut} = useAuth();
  const {getTerm} = useTerm();
  const {get, put, post} = useRequest();

  const [loading, setLoading] = useState(false);
  const [username, setUserName] = useState(user?.name);
  const [email, setEmail] = useState(user?.email);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  async function loadUser()
  {
    try {
      const response = await get(`/user/${user?.id}`, setLoading);

    } catch (error) {
      signOut();
    }
  }

  async function deleteUser()
  {
    try {
      if (!password) {
        return Alert.alert("Faltou a senha cabaço");
      }

      await post(`user/destroy`, setLoading, {
        id: user?.id,
        password
      });

      signOut();
    } catch (error) {
      console.log(error);
      //signOut();
    }
  }

  async function updateUser()
  {
    try {
      const response = await put(`/user/update`, setLoading, {
        username, email, password, confirmPassword
      });
  
      setUser({...response, id: user?.id});
      console.log(response);
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <MainView>
      <View>
      <TextInput
        placeholder={getTerm(100013)}
        value={username}
        onChangeText={setUserName}
      />
      <TextInput
        placeholder={getTerm(100011)}
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        placeholder={getTerm(100012)}
        value={password}
        onChangeText={setPassword}
      />
      <TextInput
        placeholder={getTerm(100014)}
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />
      <TouchableOpacity onPress={updateUser} style={{width: 50, height: 30}}>
        <Text>{getTerm(100015)}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={deleteUser} style={{marginTop: 50, width: "100%", height: 30}}>
        <Text>{getTerm(100016)}</Text>
      </TouchableOpacity>
      </View>
    </MainView>
  );
};

 export default Profile;