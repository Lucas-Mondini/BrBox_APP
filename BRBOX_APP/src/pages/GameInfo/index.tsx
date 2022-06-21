import { useIsFocused, useRoute } from '@react-navigation/native';
import React, { useEffect } from 'react';
import {
  ScrollView,
  Text,
} from 'react-native';

import MainView from '../../components/MainView';
import { useGame } from '../../Contexts/Game';

import config from "../../../brbox.config.json";
import styles from './styles';

import { Params } from '../../utils/types';

import { useTheme } from '../../Contexts/Theme';
import TagsContainers from '../../components/TagsContainers';

const GameInfo = () => {
  const {
    name, loading,
    loadGame, renderLinks, renderImages
  } = useGame();

  const route = useRoute();
  const isFocused = useIsFocused();

  const params = route.params as Params;

  const { darkMode } = useTheme();

  const color = darkMode ? "#fff" : config.dark;

  useEffect(() => {
    if (isFocused && params.id) {
      loadGame(params.id);
    }
  }, [isFocused]);

  return (
    <MainView loading={loading}>
      <ScrollView style={[styles.container]}>
        <Text
          style={[styles.title, {color}]}
        >
          {name}
        </Text>


        {renderImages()}

        {renderLinks()}

        <TagsContainers
        />
      </ScrollView>
    </MainView>
  );
};

export default GameInfo;