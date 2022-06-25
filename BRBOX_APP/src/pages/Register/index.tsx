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

const Register = () => {
  const {register, loading} = useAuth();
  const {getTerm} = useTerm();

  const { darkMode } = useTheme();

  const titleColorStyle = {
    color: darkMode ? "#fff" : config.dark,
  };

  const [username, setUserName] = useState("");
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  async function registerUser()
  {
    if (!mail || !password || !confirmPassword || !username) {
      return Alert.alert(getTerm(100085), getTerm(100087));
    }

    await register(username, mail, password, confirmPassword, () => {
      Alert.alert(getTerm(100077), getTerm(100078));
    });
  }

  return (
    <MainView>
      <View style={styles.titleView}>
        <Text
          style={[styles.title, titleColorStyle]}
        >
          {getTerm(100021)}
        </Text>
      </View>

      <ScrollView style={[styles.container]}>
        <Input
          placeholderText={100013}
          value={username}
          onChangeText={setUserName}
          autoCapitalize="words"
        />
        <Input
          placeholderText={100011}
          value={mail}
          onChangeText={setMail}
          autoCapitalize="none"
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

        <Button
          text={100010}
          onPress={registerUser}
          loading={loading}
        />
      </ScrollView>
    </MainView>
  );
};

export default Register;