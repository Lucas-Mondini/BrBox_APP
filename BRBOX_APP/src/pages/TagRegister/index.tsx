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
      setIcon(response.icon);
    } catch (error: any) {
      return navigation.reset({index: 0, routes: [{name: "Home"}]});
    }
  }

  async function saveTag()
  {
    try {
      let response;

      if (
        !tag.name || !tag.name.trim() || !icon
        || !tag.description_negative || !tag.description_negative?.trim()
        || !tag.description_neutral || !tag.description_neutral?.trim()
        || !tag.description_positive || !tag.description_positive?.trim()
      ) {
        return Alert.alert(getTerm(100095), getTerm(100096));
      }

      if (!params && !tag.id) {
        response = await post(`/tag/create`, setLoadingRequest, {
          icon,
          name: tag.name,
          description_negative: tag.description_negative,
          description_neutral: tag.description_neutral,
          description_positive: tag.description_positive,
        });
      } else {
        response = await put(`/tag/update`, setLoadingRequest, {
          icon,
          id: tag.id,
          new_icon: icon,
          new_name: tag.name,
          new_description_positive: tag.description_positive,
          new_description_neutral: tag.description_neutral,
          new_description_negative: tag.description_negative
        });
      }

      setTag(response);
      setIcon(response.icon);
    } catch (error) {
      return Alert.alert(getTerm(!tag.id ? 100077 : 100075), getTerm(!tag.id ? 100078 : 100076));
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
          placeholderText={100127}
          value={tag?.description_positive}
          multiline
          numberOfLines={10}
          extraStyles={styles.description}
          onChangeText={description => setTag({...tag, description_positive: description})}
        />

        <Input
          placeholderText={100128}
          value={tag?.description_neutral}
          multiline
          numberOfLines={10}
          extraStyles={styles.description}
          onChangeText={description => setTag({...tag, description_neutral: description})}
        />
        <Input
          placeholderText={100129}
          value={tag?.description_negative}
          multiline
          numberOfLines={10}
          extraStyles={styles.description}
          onChangeText={description => setTag({...tag, description_negative: description})}
        />

        <View style={styles.buttonView}>
          <Button
            text={100106}
            onPress={() => setModal(!modal)}
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