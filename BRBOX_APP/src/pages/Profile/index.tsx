import { useIsFocused, useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  Text,
  TouchableOpacity,
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
import { Message, Params } from '../../utils/types';
import DarkZone from '../../components/DarkZone';
import { useTheme } from '../../Contexts/Theme';
import { useLinking } from '../../Contexts/LinkingProvider';
import MessageModal from '../../components/MessageModal';

const Profile = () => {
  const route = useRoute();
  const navigation = useNavigation<any>();

  const {getTerm} = useTerm();
  const {deepLinking} = useLinking();
  const {get, put, post} = useRequest();
  const {user, setUser, signOut} = useAuth();

  const params = route.params as Params;

  const [loading, setLoading] = useState(true);
  const [loadingRequest, setLoadingRequest] = useState(false);
  const isFocused = useIsFocused();
  const [username, setUserName] = useState("");
  const [id, setId] = useState(0);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState<Message | null>(null);

  const { light } = useTheme();

  const textColorStyle = {
    color: light
  };

  async function loadUser()
  {
    try {
      const response = await get(`/user/${!params ? user?.id : params.id}`, setLoading);

      setId(response.id);
      setUserName(response.username);
      setEmail(response.email);

      if (!params) {
        setUser({...response, auth_token: user?.auth_token});
      }
    } catch (error) {
      return navigation.reset({index: 0, routes: [{name: "Home"}]});
    }
  }

  async function deleteUser()
  {
    try {
      if (validateUser("DELETE")) {
        await post(`user/destroy`, setLoading, {
          id, password
        });

        if (!params) return signOut();

        navigation.goBack();
      }
    } catch (error) {
      setMessage({title: 100073, message: 100074});
    }
  }

  async function updateUser()
  {
    try {
      if (validateUser("UPDATE")) {
        const response = await put(`/user/update`, setLoadingRequest, {
          id, username, email, password, new_password: newPassword, confirm_new_password: confirmPassword
        });

        if (!params) {
          setUser(response);
        } else {
          setId(response.id);
          setUserName(response.username);
          setEmail(response.email);
          setPassword("");
          setNewPassword("");
          setConfirmPassword("");
        }
      }
    } catch (error) {
      setMessage({title: 100075, message: 100076});
    }
  }

  async function createUser()
  {
    try {
      if (validateUser("SAVE")) {
        const response = await post(`/user/create`, setLoadingRequest, {
          username, email, password, confirm_password: confirmPassword
        });

        setId(response.id);
        setUserName(response.username);
        setEmail(response.email);
        setPassword("");
        setConfirmPassword("");
      }
    } catch (error) {
      setMessage({title: 100077, message: 100078});
    }
  }

  function validateUser(action: "SAVE" | "UPDATE" | "DELETE")
  {
    const messages: any = {
      "SAVE": {title: 100095, message: 100087},
      "UPDATE": {title: 100095, message: 100100},
      "DELETE": {title: 100098, message: 100099},
    }

    if (action === "SAVE" || action === "UPDATE") {
      if (!username.trim() || !email.trim()) {
        setMessage(messages[action]);
        return false;
      }

      if (action === "UPDATE" && newPassword !== confirmPassword) {
        setMessage({title: 100101, message: 100102});
        return false;
      }
    } else {
      if (!password && !params) {
        setMessage(messages[action]);
        return false;
      }
    }

    return true;
  }

  useEffect(() => {
    if (params && params.new) return setLoading(false);

    if (isFocused) loadUser();
  }, [isFocused]);

  useEffect(() => {
    deepLinking(navigation);
  }, []);

  return (
    <MainView
      showTitle
      showBottom
      loading={loading}
      headerTitle={100046}
    >
      <MessageModal
        visible={!!message}
        message={message}
        setModal={() => setMessage(null)}
      />

      <ScrollView style={[styles.container]}>
        <Text
          style={[styles.title, textColorStyle]}
        >
          {getTerm(params ? (params.new && !id ? 100042 : 100043) : 100022).replace("%2", username)}
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

        {Boolean(id) ? <>
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
          /></>
          : <Input
              placeholderText={100014}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
            />
        }

        <Button
          text={id ? 100015 : 100026}
          onPress={id ? updateUser : createUser}
          loading={loadingRequest}
        />

        {Boolean(id) && <>
          {!params &&
            <View style={styles.exitButtonContainer}>
              <TouchableOpacity
                style={styles.exitButton}
                onPress={signOut}
              >
                <Icon name="exit-run" size={20} color={light}/>
                <Text
                  style={[styles.exitButtonText, textColorStyle]}
                >
                  {getTerm(100025)}
                </Text>
              </TouchableOpacity>
            </View>
          }

          <DarkZone
            message={params ? 100044 : 100024}
            itemName={username}
            callback={deleteUser}
            buttonText={100016}
          /></>
        }
      </ScrollView>
    </MainView>
  );
};

 export default Profile;