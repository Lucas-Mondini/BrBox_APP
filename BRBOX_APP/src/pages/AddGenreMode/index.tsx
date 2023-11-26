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
import { GenreMode, Params } from '../../utils/types';
import { useTheme } from '../../Contexts/Theme';
import { useLinking } from '../../Contexts/LinkingProvider';

const AddGenreMode = () => {
  const navigation = useNavigation<any>();
  const routes = useRoute();
  const params = routes.params as Params;

  const isGenre = params && params.genres;
  const route = isGenre ? "genre" : "mode";

  const isFocused = useIsFocused();
  const {getTerm} = useTerm();
  const {deepLinking} = useLinking();
  const {get, put, post} = useRequest();

  const [loading, setLoading] = useState(Boolean(params && params.id));
  const [loadingRequest, setLoadingRequest] = useState(false);
  const [data, setData] = useState({} as GenreMode);

  const { light } = useTheme();

  const textColorStyle = {
    color: light
  };

  async function loadData()
  {
    try {
      if (!params) {
        return;
      }
      const response = await get(`/${route}/${params.id}`, setLoading);

      setData(response);
    } catch (error: any) {
      return navigation.reset({index: 0, routes: [{name: "Home"}]});
    }
  }

  async function saveData()
  {
    try {
      let response;

      if (!data.name || !data.name.trim()) {
        return Alert.alert(getTerm(100095), getTerm(100097));
      }

      if (!data.id) {
        response = await post(`/${route}/create`, setLoadingRequest, {
          name: data.name,
          description: data.description
        });
      } else {
        response = await put(`/${route}/update`, setLoadingRequest, {
          id: data.id,
          new_name: data.name,
          new_description: data.description
        });
      }

      setData(response);
    } catch (error) {
      return navigation.reset({index: 0, routes: [{name: "Home"}]});
    }
  }

  useEffect(() => {
    if (isFocused && params && params.id) loadData();
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
          {getTerm(!data.id ? isGenre ? 100162 : 100161 : isGenre ? 100164 : 100163)}
        </Text>

        <Input
          placeholderText={100013}
          value={data?.name}
          onChangeText={name => setData({...data, name})}
        />

        {isGenre &&
          <Input
            placeholderText={100029}
            value={data.description}
            multiline
            numberOfLines={10}
            extraStyles={styles.description}
            onChangeText={description => setData({...data, description})}
          />
        }

        <View style={styles.buttonView}>
          <Button
            text={!data.id ? 100026 : 100015}
            onPress={saveData}
            loading={loadingRequest}
          />
        </View>
      </ScrollView>
    </MainView>
  );
};

 export default AddGenreMode;