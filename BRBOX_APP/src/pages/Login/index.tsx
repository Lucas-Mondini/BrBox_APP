import React, { useState } from 'react';
import {
  Alert,
  ScrollView,
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

const Login = () => {
  const {signIn} = useAuth();
  const {getTerm} = useTerm();
  const isDarkMode = useColorScheme() === 'dark';

  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");

  const titleColorStyle = {
    color: isDarkMode ? "#fff" : config.dark,
  };

  async function login()
  {
    await signIn(mail, password);
  }

  return (
    <MainView>
      <View style={[styles.container]}>
        <ScrollView>
          <Text
            style={[styles.title, titleColorStyle]}
          >
            {getTerm(100020)}
          </Text>

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

          <Button
            text={100009}
            onPress={login}
          />
        </ScrollView>
      </View>
    </MainView>
  );
};

 export default Login;