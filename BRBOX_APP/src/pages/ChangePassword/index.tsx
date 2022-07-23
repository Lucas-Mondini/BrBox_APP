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
import { useRoute } from '@react-navigation/native';
import { Params } from '../../utils/types';
import { useRequest } from '../../Contexts/Request';

const Register = () => {
  const route = useRoute();
  const params = route.params as Params;

  const { post } = useRequest();
  const { getTerm } = useTerm();
  const { darkMode } = useTheme();
  const { loading, setUser, setLoading } = useAuth();

  const titleColorStyle = {
    color: darkMode ? "#fff" : config.dark,
  };

  const [code, setCode] = useState("");
  const [email, setEmail] = useState(params.email || "");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showMail, setShowMail] = useState(!params.email);

  async function changePassword()
  {
    try {
      if (!params.email?.trim()) setShowMail(true);

      if (!params.email?.trim() || !password.trim() || !confirmPassword.trim() || !code.trim()) {
        return Alert.alert(getTerm(100085), getTerm(100136));
      }

      if (password !== confirmPassword) {
        return Alert.alert(getTerm(100101), getTerm(100102));
      }

      const response = await post("/user/retrievePassword", setLoading, {
        code,
        email,
        new_password: password,
        confirm_new_password: confirmPassword
      }, true);

      setUser(response);
    } catch (error) {
      Alert.alert(getTerm(100134), getTerm(100135));
    }
  }

  return (
    <MainView>
      <View style={styles.titleView}>
        <Text
          style={[styles.title, titleColorStyle]}
        >
          {getTerm(100137)}
        </Text>
      </View>

      <ScrollView style={[styles.container]}>
        {showMail &&
          <Input
            placeholderText={100011}
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
          />
        }

        <Input
          placeholderText={100133}
          value={code}
          onChangeText={setCode}
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
          text={100132}
          onPress={changePassword}
          loading={loading}
        />
      </ScrollView>
    </MainView>
  );
};

export default Register;