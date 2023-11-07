import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';

import Button from '../../components/Button';
import Input from '../../components/Input';

import MainView from '../../components/MainView';
import { useRequest } from '../../Contexts/Request';
import { useTerm } from '../../Contexts/TermProvider';

import config from '../../../brbox.config.json';
import styles from './styles';
import { useTheme } from '../../Contexts/Theme';
import { useLinking } from '../../Contexts/LinkingProvider';
import { Message } from '../../utils/types';
import MessageModal from '../../components/MessageModal';

const Suggestion = () => {
  const navigation = useNavigation<any>();

  const { post } = useRequest();
  const { getTerm } = useTerm();
  const { deepLinking } = useLinking();

  const [suggestion, setSuggestion] = useState('');
  const [message, setMessage] = useState<Message | null>(null);
  const [loadingRequest, setLoadingRequest] = useState(false);

  const { darkMode } = useTheme();

  const textColorStyle = {
    color: darkMode ? '#fff' : config.dark,
  };

  async function sendSuggestion() {
    try {
      if (!suggestion.trim()) {
        return setMessage({ title: 100145, message: 100146 });
      }

      await post(`/suggestion`, setLoadingRequest, {
        text: suggestion,
      });

      setSuggestion('');

      return setMessage({ title: 100147, message: 100148 });
    } catch (error) {
      return navigation.reset({ index: 0, routes: [{ name: 'Home' }] });
    }
  }

  useEffect(() => {
    deepLinking(navigation);
  }, []);

  return (
    <MainView showTitle showBottom headerTitle={100006}>
      <MessageModal
        visible={!!message}
        message={message}
        setModal={() => setMessage(null)}
        buttonCustomText={
          message && message.title === 100147 ? 100149 : undefined
        }
        buttonCustomFunction={
          message && message.title === 100147
            ? () => {
              setMessage(null);
              navigation.reset({ index: 0, routes: [{ name: 'Home' }] });
            }
            : undefined
        }
      />

      <ScrollView style={[styles.container]}>
        <Text style={[styles.title, textColorStyle]}>{getTerm(100143)}</Text>

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
