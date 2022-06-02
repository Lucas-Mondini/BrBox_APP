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
  const {getTerm} = useTerm();
  const {get, put, post} = useRequest();

  const [loading, setLoading] = useState(Boolean(params));
  const [tag, setTag] = useState({} as Tag);

  const isDarkMode = useColorScheme() === 'dark';

  const textColorStyle = {
    color: isDarkMode ? "#fff" : config.dark,
  };

  async function loadTag()
  {
    try {
      if (!params) {
        return;
      }
      const response = await get(`/tag/${params.id}`, setLoading);

      setTag(response);
    } catch (error: any) {
      return navigation.reset({index: 0, routes: [{name: "Home"}]});
    }
  }

  async function saveTag()
  {
    try {
      let response;

      if (!params && !tag.id) {
        response = await post(`/tag/create`, setLoading, {
          name: tag.name, description: tag.description
        });
      } else {
        response = await put(`/tag/update`, setLoading, {
          id: tag.id,
          new_name: tag.name,
          new_description: tag.description
        });
      }

      setTag(response);
    } catch (error) {
      return navigation.reset({index: 0, routes: [{name: "Home"}]});
    }
  }

  useEffect(() => {
    if (isFocused) loadTag();
  }, [isFocused]);

  return (
    <MainView loading={loading}>
      <ScrollView style={[styles.container]}>
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
            text={!params && !tag.id ? 100026 : 100015}
            onPress={saveTag}
          />
        </View>
      </ScrollView>
    </MainView>
  );
};

 export default TagRegister;