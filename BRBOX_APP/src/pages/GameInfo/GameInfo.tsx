import { useIsFocused, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  RefreshControl,
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
import ToggleContent from '../../components/ToggleContent';
import GameTimeModal from '../../components/GameTimeModal';
import GameTimeCard from '../../components/GameTimeCard';

const GameInfo = () => {
  const route = useRoute();
  const isFocused = useIsFocused();

  const { getTerm } = useTerm();
  const { darkMode } = useTheme();
  const {
    name, loading, id,
    loadGame, renderLinks, renderImages, renderBusinessModel
  } = useGame();

  const [modal, setModal] = useState(false);
  const [tagsContainer, setTagsContainer] = useState<React.ReactElement>();
  const [evaluationTags, setEvaluationTags] = useState<Tag[]>([]);

  const params = route.params as Params;
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
      <GameTimeModal
        visible={modal}
        setModal={() => setModal(!modal)}
      />

      <ScrollView
        style={[styles.container]}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={() => loadGame(id)}/>
        }
      >
        <Text
          style={[styles.title, {color}]}
        >
          {name}
        </Text>


        {renderImages()}

        {renderLinks()}

        <GameTimeCard onPress={() => setModal(!modal)}/>

        <ToggleContent
          title={100121}
          content={renderBusinessModel()}
          colapseOnStart
        />

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