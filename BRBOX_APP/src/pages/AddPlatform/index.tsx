import { useIsFocused, useNavigation, useRoute } from '@react-navigation/native';
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
import { Params, Platform } from '../../utils/types';

const AddPlatform = () => {
  const navigation = useNavigation<any>();
  const route = useRoute();
  const params = route.params as Params;

  const isFocused = useIsFocused();
  const {getTerm} = useTerm();
  const {get, put, post} = useRequest();

  const [loading, setLoading] = useState(Boolean(params));
  const [platform, setPlatform] = useState({} as Platform);

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
      const response = await get(`/platform/${params.id}`, setLoading);

      setPlatform(response);
    } catch (error: any) {
      return navigation.reset({index: 0, routes: [{name: "Home"}]});
    }
  }

  async function saveTag()
  {
    try {
      let response;

      if (!params && !platform.id) {
        response = await post(`/platform/create`, setLoading, {
          name: platform.name
        });
      } else {
        response = await put(`/platform/update`, setLoading, {
          id: platform.id,
          new_name: platform.name
        });
      }

      setPlatform(response);
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
          {getTerm(!params ? 100055 : 100059)}
        </Text>

        <Input
          placeholderText={100013}
          value={platform?.name}
          onChangeText={name => setPlatform({...platform, name})}
        />

        <View style={styles.buttonView}>
          <Button
            text={!params && !platform.id ? 100026 : 100015}
            onPress={saveTag}
          />
        </View>
      </ScrollView>
    </MainView>
  );
};

 export default AddPlatform;