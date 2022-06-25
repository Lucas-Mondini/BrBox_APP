import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import styles from "./styles";

import config from "../../../brbox.config.json";
import { useTerm } from "../../Contexts/TermProvider";
import { useTheme } from "../../Contexts/Theme";
import { useGame } from "../../Contexts/Game";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { useRequest } from "../../Contexts/Request";
import { Tag } from "../../utils/types";
import TagEvaluationCard from "../TagEvaluationCard";
import Loading from "../Loading";

interface TagsContainersProps {
  title?: number;
}

export default function TagsContainers({title}: TagsContainersProps)
{
  const {
    tagValueList
  } = useGame();

  const {get} = useRequest();
  const {getTerm} = useTerm();
  const navigation = useNavigation<any>();

  const [tags, setTags] = useState([] as Tag[]);
  const [firstLoad, setFirstLoad] = useState(true);
  const [loadingTags, setLoadingTags] = useState(true);
  const [loadingEvaluatedTags, setEvaluatedTagsLoading] = useState(true);
  const [selectedTags, setSelectedTags] = useState([] as Tag[]);
  const [evaluatedTags, setEvaluatedTags] = useState([] as Tag[]);

  const { darkMode } = useTheme();

  const color = darkMode ? "#fff" : config.dark;

  async function getTags() {
    try {
      const response = await get("/tag", setLoadingTags);

      setTags(response);
    } catch (err) {
      return navigation.reset({index: 0, routes: [{name: "Home"}]});
    }
  }

  async function getEvaluatedTags(id: number) {
    try {
      const response = await get(`/tagValue/${id}`, setEvaluatedTagsLoading);

      setEvaluatedTags(response.tagValues);

      if (firstLoad) {
        setSelectedTags(response.tagValues.map((tag: any) => {
          return {
            id: tag.tag.id,
            evalId: tag.id,
            name: tag.tag.name,
            description: tag.tag.description,
            value: tag.value.id
          };
        }));
      }

      setFirstLoad(false);
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
        <TouchableOpacity key={tag.id} onPress={() => handleLists(
          tag.id, tags, selectedTags, setTags, setSelectedTags
        )}>
          <Text style={styles.tag}>{tag.name}</Text>
        </TouchableOpacity>
      );
    }

    return tagArray;
  }

  function renderEvaluatedTags()
  {
    if (evaluatedTags.length > 0) {
      return evaluatedTags.map((tagValues: any) => (
        <TouchableOpacity key={tagValues.id} onPress={() => {}} activeOpacity={1}>
          <Text style={styles.tag}>{tagValues.tag.name}</Text>
        </TouchableOpacity>
      ));
    }

    return null;
  }

  function renderSelectedTags()
  {
    const tagArray: React.ReactNode[] = [];

    for (const tag of selectedTags) {
      tagArray.push(
        <TagEvaluationCard
          key={tag.id}
          remove={() => {
            handleLists(
              tag.id, selectedTags, tags, setSelectedTags, setTags
            )

            getEvaluatedTags(tagValueList);
          }}
          id={tag.id}
          evaluationId={tag.evalId}
          value={tag.value}
          title={tag.name}
          description={tag.description || ""}
          tagValueListId={tagValueList}
          extraCallback={() => getEvaluatedTags(tagValueList)}
        />
      );
    }

    if (tagArray.length > 0) {
      return tagArray;
    }
  }

  useEffect(() => {
    getTags();
  }, []);

  useEffect(() => {
    if (tagValueList > 0) {
      getEvaluatedTags(tagValueList);
    }
  }, [tagValueList]);

  return (
    <View>
      <Text style={[styles.tagsListTitles, {color}]}>{getTerm(100088)}</Text>

      <View style={[styles.tagsListView, {marginBottom: 20, borderColor: color}]}>
        {loadingEvaluatedTags
        ? <Loading />
        : <View style={styles.tagsContainer}>
            <Text>{renderEvaluatedTags()}</Text>
          </View>}
      </View>

      <View style={styles.selectedTagsContainer}>
        <Text style={[styles.tagsListTitles, {color}]}>{getTerm(100080)}</Text>
        {renderSelectedTags() || <Text>{getTerm(100079)}</Text>}
      </View>

      <Text style={[styles.tagsListTitles, {color}]}>{getTerm(100030)}</Text>

      <View style={[styles.tagsListView, {marginBottom: 100, borderColor: color}]}>
        {loadingTags
        ? <Loading />
        : <View style={styles.tagsContainer}>
            <Text>{renderTags()}</Text>
          </View>}
      </View>
    </View>
  );
}