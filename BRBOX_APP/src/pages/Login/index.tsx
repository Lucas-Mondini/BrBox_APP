import React, { useState } from 'react';
import {
  Alert,
  ScrollView,
  Text,
  View,
} from 'react-native';
import Input from '../../components/Input';

import MainView from '../../components/MainView';
import { useAuth } from '../../Contexts/Auth';
import { useTerm } from '../../Contexts/TermProvider';

import config from "../../../brbox.config.json";

import styles from './styles';
import Button from '../../components/Button';
import { useTheme } from '../../Contexts/Theme';

const Login = () => {
  const {signIn} = useAuth();
  const {getTerm} = useTerm();
  const { darkMode } = useTheme();

  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");

  const titleColorStyle = {
    color: darkMode ? "#fff" : config.dark,
  };

  async function login()
  {
    if (!mail || !password) {
      return Alert.alert(getTerm(100085), getTerm(100086));
    }

    await signIn(mail, password, () => {
      Alert.alert(getTerm(100083), getTerm(100084));
    });
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