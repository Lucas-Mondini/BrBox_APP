import { useIsFocused, useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';

import MainView from '../../components/MainView';
import { useGame } from '../../Contexts/Game';
import { useRequest } from '../../Contexts/Request';
import { useTerm } from '../../Contexts/TermProvider';

import config from "../../../brbox.config.json";
import styles from './styles';

import { Params, Tag } from '../../utils/types';

import TagEvaluationCard from '../../components/TagEvaluationCard';

const GameInfo = () => {
  const {
    id, name, loading, tagValueList,
    setLoading,
    loadGame, renderLinks, renderImages
  } = useGame();

  const route = useRoute();
  const {get} = useRequest();
  const {getTerm} = useTerm();
  const isFocused = useIsFocused();
  const navigation = useNavigation<any>();

  const params = route.params as Params;

  const [tags, setTags] = useState([] as Tag[]);
  const [selectedTags, setSelectedTags] = useState([] as Tag[]);

  const isDarkMode = useColorScheme() === 'dark';

  const color = isDarkMode ? "#fff" : config.dark;

  async function getTags() {
    try {
      const getTagsList = await get("/tag", setLoading);

      setTags(getTagsList);
    } catch (err) {
      return navigation.reset({index: 0, routes: [{name: "Home"}]});
    }
  }

  function handleLists(id: number, tagList: Tag[], oppositeTagList: Tag[], setListFunction: (tag: Tag[]) => void, setOppositeListFunction: (tag: Tag[]) => void) {
    const tagsNotSelected = tagList.filter(item => item.id !== id),
          tagsSelected = tagList.filter(item => item.id === id);

    setListFunction([...tagsNotSelected]);
    setOppositeListFunction([...oppositeTagList, ...tagsSelected]);
  }

  function renderTags()
  {
    const tagArray: React.ReactNode[] = [];

    for (const tag of tags) {
      tagArray.push(
        <TouchableOpacity onPress={() => handleLists(
          tag.id, tags, selectedTags, setTags, setSelectedTags
        )}>
          <Text style={styles.tag} key={tag.id}>{tag.name}</Text>
        </TouchableOpacity>
      );
    }

    return tagArray;
  }

  function renderSelectedTags()
  {
    const tagArray: React.ReactNode[] = [];

    for (const tag of selectedTags) {
      tagArray.push(
        <TagEvaluationCard
          key={tag.id}
          remove={() => handleLists(
            tag.id, selectedTags, tags, setSelectedTags, setTags
          )}
          id={tag.id}
          title={tag.name}
          description={tag.description || ""}
        />
      );
    }

    if (tagArray.length > 0) {
      return tagArray;
    }
  }

  useEffect(() => {
    if (isFocused && params.id) {
      getTags();
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

        <View style={styles.selectedTagsContainer}>
          <Text style={[styles.tagsListTitles, {color}]}>{getTerm(100080)}</Text>
          {renderSelectedTags() || <Text>{getTerm(100079)}</Text>}
        </View>

        <Text style={[styles.tagsListTitles, {color}]}>{getTerm(100030)}</Text>
        
        <View style={[styles.tagsListView, {borderColor: color}]}>
          <View style={styles.tagsContainer}>
            <Text>{renderTags()}</Text>
          </View>
        </View>
      </ScrollView>
    </MainView>
  );
};

export default GameInfo;