import React, { useState } from 'react';
import {
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
import MessageModal from '../../components/MessageModal';
import { Message } from '../../utils/types';

const Register = () => {
  const {register, loading} = useAuth();
  const {getTerm} = useTerm();

  const { light } = useTheme();

  const titleColorStyle = {
    color: light
  };

  const [username, setUserName] = useState("");
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [message, setMessage] = useState<Message | null>(null);

  async function registerUser()
  {
    if (!mail || !password || !confirmPassword || !username) {
      return setMessage({title: 100085, message: 100087});
    }

    if (password !== confirmPassword) {
      return setMessage({title: 100101, message: 100102});
    }

    await register(username, mail, password, confirmPassword, () => {
      return setMessage({title: 100077, message: 100078});
    });
  }

  return (
    <MainView>
      <MessageModal
        visible={!!message}
        message={message}
        setModal={() => setMessage(null)}
      />

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