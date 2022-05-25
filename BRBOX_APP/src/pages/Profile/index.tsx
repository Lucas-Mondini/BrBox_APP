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
  const {user, setUser} = useAuth();
  const {getTerm} = useTerm();
  const {get, put} = useRequest();

  const [loading, setLoading] = useState(false);
  const [username, setUserName] = useState(user?.name);
  const [mail, setMail] = useState(user?.email);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  async function loadUser()
  {
    console.log(user)
    const response = await get(`/user/${user?.id}`, setLoading);

    console.log(response);
  }

  async function updateUser()
  {
    console.log(user)
    const response = await put(`/user/update`, setLoading, {

    });

    console.log(response);
  }

  useEffect(() => {
    //loadUser();
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
        value={mail}
        onChangeText={setMail}
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
      <TouchableOpacity onPress={()=>{}} style={{marginTop: 50, width: "100%", height: 30}}>
        <Text>{getTerm(100016)}</Text>
      </TouchableOpacity>
      </View>
    </MainView>
  );
};

 export default Profile;