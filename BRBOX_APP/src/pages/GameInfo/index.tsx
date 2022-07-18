import { useIsFocused, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  Text,
  View,
} from 'react-native';

import MainView from '../../components/MainView';
import { useGame } from '../../Contexts/Game';

import config from "../../../brbox.config.json";
import styles from './styles';

import { Params, Tag } from '../../utils/types';

import { useTheme } from '../../Contexts/Theme';
import TagsContainers from '../../components/TagsContainers';
import TopTags from '../../components/TopTags';
import { useTerm } from '../../Contexts/TermProvider';
import { getWords } from '../../utils/functions';

const GameInfo = () => {
  const {
    name, loading,
    loadGame, renderLinks, renderImages
  } = useGame();

  const route = useRoute();
  const {getTerm} = useTerm();
  const isFocused = useIsFocused();
  const [tagsContainer, setTagsContainer] = useState<React.ReactElement>();
  const [evaluationTags, setEvaluationTags] = useState<Tag[]>([]);

  const params = route.params as Params;

  const { darkMode } = useTheme();

  const color = darkMode ? "#fff" : config.dark;

  useEffect(() => {
    if (isFocused && params.id) {
      loadGame(params.id);
    }
  }, [isFocused]);

  useEffect(() => {
    if (isFocused && !loading) {
      setTagsContainer(<TagsContainers setEvaluationTags={setEvaluationTags}/>)
    }
  }, [isFocused, loading]);

  return (
    <MainView
      loading={loading}
      showTitle
      headerTitle={getWords(name, 2) || ""}
    >
      <ScrollView style={[styles.container]}>
        <Text
          style={[styles.title, {color}]}
        >
          {name}
        </Text>


        {renderImages()}

        {renderLinks()}

        {params.tags?.length != 0 &&
          <View style={[styles.topTagsContainer, {backgroundColor: darkMode ? config.darkGray : config.light}]}>
            <Text
              style={[styles.topTagsTitle, {color: darkMode ? config.subTitleMainColor : config.dark}]}
            >
              {getTerm(100103)}
            </Text>

            <TopTags
              tags={params.tags}
              large
              evaluations={evaluationTags}
            />
          </View>
        }

        {tagsContainer && tagsContainer}
      </ScrollView>
    </MainView>
  );
};

export default GameInfo;