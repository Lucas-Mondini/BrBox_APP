import { useNavigation } from '@react-navigation/native';
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
import { useTheme } from '../../Contexts/Theme';
import deedLinking from '../../utils/deepLinking';

const Suggestion = () => {
  const navigation = useNavigation<any>();

  const { post } = useRequest();
  const { getTerm } = useTerm();

  const [suggestion, setSuggestion] = useState("");
  const [loadingRequest, setLoadingRequest] = useState(false);

  const { darkMode } = useTheme();

  const textColorStyle = {
    color: darkMode ? "#fff" : config.dark,
  };

  async function sendSuggestion()
  {
    try {
      if (!suggestion.trim()) {
        return Alert.alert(getTerm(100145), getTerm(100146));
      }

      await post(`/suggestion`, setLoadingRequest, {
        text: suggestion
      });

      setSuggestion("");

      Alert.alert(getTerm(100147), getTerm(100148), [{
        text: getTerm(100149),
        onPress: () => navigation.reset({index: 0, routes: [{name: "Home"}]})
      }]);
    } catch (error) {
      return navigation.reset({index: 0, routes: [{name: "Home"}]});
    }
  }

  useEffect(() => {
    deedLinking(navigation);
  }, []);

  return (
    <MainView>
      <ScrollView style={[styles.container]}>
        <Text
          style={[styles.title, textColorStyle]}
        >
          {getTerm(100143)}
        </Text>

        <Input
          placeholderText={100144}
          value={suggestion}
          multiline
          numberOfLines={20}
          extraStyles={styles.description}
          onChangeText={setSuggestion}
        />

        <View style={styles.buttonView}>
          <Button
            text={100142}
            onPress={sendSuggestion}
            loading={loadingRequest}
          />
        </View>
      </ScrollView>
    </MainView>
  );
};

export default Suggestion;