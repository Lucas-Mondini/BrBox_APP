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
import { Params, Tag } from '../../utils/types';
import { useTheme } from '../../Contexts/Theme';
import IconsModal from '../../components/IconsModal';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { getIcon } from '../../utils/functions';

const TagRegister = () => {
  const navigation = useNavigation<any>();
  const route = useRoute();
  const params = route.params as Params;

  const isFocused = useIsFocused();
  const {getTerm} = useTerm();
  const {get, put, post} = useRequest();

  const [icon, setIcon] = useState(0);
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(Boolean(params));
  const [loadingRequest, setLoadingRequest] = useState(false);
  const [tag, setTag] = useState({} as Tag);

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

      if (!tag.name || !tag.name.trim() || !tag.description || !tag.description?.trim()) {
        return Alert.alert(getTerm(100095), getTerm(100096));
      }

      if (!params && !tag.id) {
        response = await post(`/tag/create`, setLoadingRequest, {
          name: tag.name, description: tag.description
        });
      } else {
        response = await put(`/tag/update`, setLoadingRequest, {
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
      <IconsModal
        setModal={() => setModal(!modal)}
        visible={modal}
        setIcon={setIcon}
      />

      <ScrollView style={[styles.container]}>
        <Text
          style={[styles.title, textColorStyle]}
        >
          {getTerm(!params ? 100027 : 100028)}
        </Text>

        {icon > 0 &&
          <Icon
            color={darkMode ? "#fff" : config.dark}
            size={50}
            name={getIcon(icon)}
            style={styles.icon}
          />
        }

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

        <View style={styles.buttonView}>
          <Button
            text={100106}
            onPress={() => setModal(!modal)}
            loading={loadingRequest}
            extraStyle={{marginBottom: 15, backgroundColor: "transparent"}}
            extraTextStyle={{color: darkMode ? "#fff" : config.dark, textDecorationLine: "underline"}}
          />

          <Button
            text={!params && !tag.id ? 100026 : 100015}
            onPress={saveTag}
            loading={loadingRequest}
          />
        </View>
      </ScrollView>
    </MainView>
  );
};

 export default TagRegister;