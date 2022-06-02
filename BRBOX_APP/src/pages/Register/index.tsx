import React, { useState } from 'react';
import {
  Alert,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import Input from '../../components/Input';

import MainView from '../../components/MainView';
import { useAuth } from '../../Contexts/Auth';
import { useTerm } from '../../Contexts/TermProvider';

import config from "../../../brbox.config.json";

import styles from './styles';
import Button from '../../components/Button';

const Register = () => {
  const {register} = useAuth();
  const {getTerm} = useTerm();

  const isDarkMode = useColorScheme() === 'dark';

  const titleColorStyle = {
    color: isDarkMode ? "#fff" : config.dark,
  };

  const [username, setUserName] = useState("");
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  async function registerUser()
  {
    await register(username, mail, password, confirmPassword);
  }

  return (
    <MainView>
      <View style={[styles.container]}>
        <Text
          style={[styles.title, titleColorStyle]}
        >
          {getTerm(100021)}
        </Text>

        <Input
          placeholderText={100013}
          value={username}
          onChangeText={setUserName}
        />
        <Input
          placeholderText={100011}
          value={mail}
          onChangeText={setMail}
        />
        <Input
          placeholderText={100012}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <Input
          placeholderText={100014}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />

        <Button text={100010} onPress={registerUser} />
      </View>
    </MainView>
  );
};

export default Register;