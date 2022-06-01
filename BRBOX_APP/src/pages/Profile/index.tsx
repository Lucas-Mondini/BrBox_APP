import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  ScrollView,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';

import Button from '../../components/Button';
import Input from '../../components/Input';

import MainView from '../../components/MainView';
import { useAuth } from '../../Contexts/Auth';
import { useRequest } from '../../Contexts/Request';
import { useTerm } from '../../Contexts/TermProvider';

import config from "../../../brbox.config.json";
import styles from './styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Profile = () => {
  const navigation = useNavigation<any>();
  const {user, setUser, signOut} = useAuth();
  const {getTerm} = useTerm();
  const {get, put, post} = useRequest();

  const [loading, setLoading] = useState(false);
  const [username, setUserName] = useState(user?.username);
  const [email, setEmail] = useState(user?.email);
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? config.dark : "#fff",
  };

  const textColorStyle = {
    color: isDarkMode ? "#fff" : config.dark,
  };

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
      signOut();
    }
  }

  async function updateUser()
  {
    try {
      const response = await put(`/user/update`, setLoading, {
        username, email, password, new_password: newPassword, confirm_new_password: confirmPassword
      });

      setUser(response);
    } catch (error) {
      signOut();
    }
  }

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <MainView>
      <ScrollView style={[styles.container, backgroundStyle]}>
        <Text
          style={[styles.title, textColorStyle]}
        >
          {getTerm(100022)}
        </Text>

        <Input
          placeholderText={100013}
          value={username}
          onChangeText={setUserName}
        />
        <Input
          placeholderText={100011}
          value={email}
          onChangeText={setEmail}
        />
        <Input
          placeholderText={100012}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <Text
          style={[styles.changePassText, textColorStyle]}
        >
          {getTerm(100017)}
        </Text>

        <Input
          placeholderText={100018}
          value={newPassword}
          onChangeText={setNewPassword}
          secureTextEntry
        />
        <Input
          placeholderText={100019}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />

        <Button
          text={100015}
          onPress={updateUser}
        />

        <View style={styles.exitButtonContainer}>
          <TouchableOpacity
            style={styles.exitButton}
            onPress={signOut}
          >
            <Icon name="exit-run" size={20} color={isDarkMode ? "#fff" : config.dark}/>
            <Text
              style={[styles.exitButtonText, textColorStyle]}
            >
              {getTerm(100025)}
            </Text>
          </TouchableOpacity>
        </View>

        <View
          style={[styles.darkZone]}
        >
          <Text
            style={[styles.changePassText, textColorStyle]}
          >
            {getTerm(100023)}
          </Text>
          <Text
            style={[styles.changePassText, textColorStyle]}
          >
            {getTerm(100024)}
          </Text>

          <Button
            text={100016}
            onPress={deleteUser}
            extraStyle={{width: '70%', marginTop: 15}}
            extraTextStyle={{color: "#fff"}}
            buttonColor={config.redBar}
          />
        </View>
      </ScrollView>
    </MainView>
  );
};

 export default Profile;