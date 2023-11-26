import { useIsFocused, useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  ScrollView,
  Text,
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
import { useTheme } from '../../Contexts/Theme';
import { useLinking } from '../../Contexts/LinkingProvider';

const AddPlatform = () => {
  const navigation = useNavigation<any>();
  const route = useRoute();
  const params = route.params as Params;

  const isFocused = useIsFocused();
  const {getTerm} = useTerm();
  const {deepLinking} = useLinking();
  const {get, put, post} = useRequest();

  const [loading, setLoading] = useState(Boolean(params));
  const [loadingRequest, setLoadingRequest] = useState(false);
  const [platform, setPlatform] = useState({} as Platform);

  const { light } = useTheme();

  const textColorStyle = {
    color: light
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

      if (!platform.name || !platform.name.trim()) {
        return Alert.alert(getTerm(100095), getTerm(100097));
      }

      if (!params && !platform.id) {
        response = await post(`/platform/create`, setLoadingRequest, {
          name: platform.name,
          imageURL: platform.imageURL
        });
      } else {
        response = await put(`/platform/update`, setLoadingRequest, {
          id: platform.id,
          new_name: platform.name,
          new_imageURL: platform.imageURL
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

  useEffect(() => {
    deepLinking(navigation);
  }, []);

  return (
    <MainView
      showTitle
      showBottom
      headerTitle={" "}
      loading={loading}
    >
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
        <Input
          placeholderText={100052}
          value={platform?.imageURL}
          onChangeText={imageURL => setPlatform({...platform, imageURL})}
        />

        <View style={styles.buttonView}>
          <Button
            text={!params && !platform.id ? 100026 : 100015}
            onPress={saveTag}
            loading={loadingRequest}
          />
        </View>
      </ScrollView>
    </MainView>
  );
};

 export default AddPlatform;