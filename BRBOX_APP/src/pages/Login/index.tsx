import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  Alert,
  ScrollView,
  Text,
  View,
} from 'react-native';

import Input from '../../components/Input';
import MainView from '../../components/MainView';
import Button from '../../components/Button';

import { useAuth } from '../../Contexts/Auth';
import { useTerm } from '../../Contexts/TermProvider';
import { useTheme } from '../../Contexts/Theme';
import { useRequest } from '../../Contexts/Request';

import config from "../../../brbox.config.json";

import styles from './styles';
import { Message } from '../../utils/types';
import MessageModal from '../../components/MessageModal';

const Login = () => {
  const navigation = useNavigation<any>();
  const { post } = useRequest();
  const { getTerm } = useTerm();
  const { darkMode } = useTheme();
  const { signIn, loading, setLoading } = useAuth();

  const [mail, setMail] = useState("");
  const [message, setMessage] = useState<Message | null>(null);
  const [password, setPassword] = useState("");
  const [forgotPassword, setForgotPassword] = useState(false);

  const titleColorStyle = {
    color: darkMode ? "#fff" : config.dark,
  };

  async function login()
  {
    if (!mail.trim() || !password.trim()) {
      return setMessage({title: 100085, message: 100086});
    }

    await signIn(mail, password, () => {
      return setMessage({title: 100083, message: 100084});
    });
  }

  async function forgotPass()
  {
    try {
      await post("/user/forgotPassword", setLoading, {email: mail}, true);

      navigation.navigate("ChangePassword", {email: mail});
    } catch (error) {
      Alert.alert(getTerm(100071), getTerm(100072));
    }
  }

  return (
    <MainView>
      <View style={[styles.container]}>
        <MessageModal
          visible={!!message}
          message={message}
          setModal={() => setMessage(null)}
        />

        <ScrollView>
          <View style={styles.titleView}>
            <Text
              style={[styles.title, titleColorStyle]}
            >
              {getTerm(100020)}
            </Text>
          </View>
          <Input
            placeholderText={100011}
            value={mail}
            onChangeText={setMail}
            autoCapitalize="none"
          />

          {!forgotPassword &&
            <Input
              value={password}
              onChangeText={setPassword}
              placeholderText={100012}
              secureTextEntry
            />
          }

          <Button
            text={forgotPassword ? 100131 : 100130}
            onPress={() => setForgotPassword(!forgotPassword)}
            buttonColor="transparent"
            extraTextStyle={[titleColorStyle, {textDecorationLine: 'underline'}]}
            extraStyle={{marginVertical: 15}}
          />

          <Button
            text={forgotPassword ? 100132 : 100009}
            onPress={forgotPassword ? forgotPass : login}
            loading={loading}
          />
        </ScrollView>
      </View>
    </MainView>
  );
};

 export default Login;