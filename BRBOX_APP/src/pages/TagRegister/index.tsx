import { useIsFocused, useNavigation, useRoute } from '@react-navigation/native';
import ColorPicker from 'react-native-wheel-color-picker';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  ScrollView,
  Text,
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
import { Params, Tag } from '../../utils/types';

const TagRegister = () => {
  const navigation = useNavigation<any>();
  const route = useRoute();
  const params = route.params as Params;

  const isFocused = useIsFocused();
  const {user, signOut} = useAuth();
  const {getTerm} = useTerm();
  const {get, put, post} = useRequest();

  const [loading, setLoading] = useState(false);
  const [tag, setTag] = useState({} as Tag);

  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? config.dark : "#fff",
  };

  const textColorStyle = {
    color: isDarkMode ? "#fff" : config.dark,
  };

  async function loadColor()
  {
    try {
      if (!params) {
        return;
      }

      const response = require("../../../mockdata.json").tags.filter((tag: Tag) => tag.id === params.id);
                      //await get(`/user/${user?.id}`, setLoading);

      setTag(response[0]);
    } catch (error) {
      signOut();
    }
  }

  async function updateColor()
  {/* 
    try {
      const response = await put(`/user/update`, setLoading, {
        username, email, password, new_password: newPassword, confirm_new_password: confirmPassword
      });

      setUser(response);
    } catch (error) {
      signOut();
    } */
  }

  useEffect(() => {
    if (isFocused) loadColor();
  }, [isFocused]);

  return (
    <MainView>
      <ScrollView style={[styles.container, backgroundStyle]}>
        <Text
          style={[styles.title, textColorStyle]}
        >
          {getTerm(!params ? 100027 : 100028)}
        </Text>

        <Input
          placeholderText={100013}
          value={tag?.name}
          onChangeText={name => setTag({...tag, name})}
        />

        <Input
          placeholderText={100029}
          value={tag?.description}
          multiline
          numberOfLines={10}
          extraStyles={styles.description}
          onChangeText={description => setTag({...tag, description})}
        />

        <Text
          style={[styles.title, textColorStyle]}
        >
          {tag?.color}
        </Text>

        <ColorPicker
          color={tag?.color}
          onColorChange={color => setTag({...tag, color})}
        />

        <View style={styles.buttonView}>
          <Button
            text={!params ? 100026 : 100015}
            onPress={updateColor}
          />
        </View>
      </ScrollView>
    </MainView>
  );
};

 export default TagRegister;