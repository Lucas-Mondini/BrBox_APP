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
import { Params, BusinessModel } from '../../utils/types';
import { useTheme } from '../../Contexts/Theme';

const AddBusinessModel = () => {
  const navigation = useNavigation<any>();
  const route = useRoute();
  const params = route.params as Params;

  const isFocused = useIsFocused();
  const {getTerm} = useTerm();
  const {get, put, post} = useRequest();

  const [loading, setLoading] = useState(Boolean(params));
  const [loadingRequest, setLoadingRequest] = useState(false);
  const [businessModel, setBusinessModel] = useState({} as BusinessModel);

  const { darkMode } = useTheme();

  const textColorStyle = {
    color: darkMode ? "#fff" : config.dark,
  };

  async function loadTag()
  {
    try {
      if (!params) {
        return;
      }
      const response = await get(`/businessModel/${params.id}`, setLoading);

      setBusinessModel(response);
    } catch (error: any) {
      return navigation.reset({index: 0, routes: [{name: "Home"}]});
    }
  }

  async function saveTag()
  {
    try {
      let response;

      if (!businessModel.name || !businessModel.name.trim()) {
        return Alert.alert(getTerm(100095), getTerm(100097));
      }

      if (!params && !businessModel.id) {
        response = await post(`/businessModel/create`, setLoadingRequest, {
          name: businessModel.name, description: businessModel.description
        });
      } else {
        response = await put(`/businessModel/update`, setLoadingRequest, {
          id: businessModel.id,
          new_name: businessModel.name,
          new_description: businessModel.description,
        });
      }

      setBusinessModel(response);
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
          {getTerm(!params ? 100119 : 100120)}
        </Text>

        <Input
          placeholderText={100013}
          value={businessModel?.name}
          onChangeText={name => setBusinessModel({...businessModel, name})}
        />

        <Input
          placeholderText={100029}
          value={businessModel?.description}
          multiline
          numberOfLines={10}
          extraStyles={styles.description}
          onChangeText={description => setBusinessModel({...businessModel, description})}
        />

        <View style={styles.buttonView}>
          <Button
            text={!params && !businessModel.id ? 100026 : 100015}
            onPress={saveTag}
            loading={loadingRequest}
          />
        </View>
      </ScrollView>
    </MainView>
  );
};

 export default AddBusinessModel;