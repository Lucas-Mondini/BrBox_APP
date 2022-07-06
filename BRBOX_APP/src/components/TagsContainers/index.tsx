import React, { useEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import styles from "./styles";

import config from "../../../brbox.config.json";
import { useTerm } from "../../Contexts/TermProvider";
import { useTheme } from "../../Contexts/Theme";
import { useGame } from "../../Contexts/Game";
import { useNavigation } from "@react-navigation/native";
import { useRequest } from "../../Contexts/Request";
import { Evaluation, Tag } from "../../utils/types";
import TagEvaluationCard from "../TagEvaluationCard";
import Loading from "../Loading";

export default function TagsContainers()
{
  const {
    id: gameId , tagValueList
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

  const color = darkMode ? config.subTitleMainColor : config.dark;

  async function getTags(setTagsState: boolean = true) {
    try {
      const response = await get(`/tag?game=${gameId}`, setLoadingTags);

      if (setTagsState) setTags(response);
    } catch (err) {
      return navigation.reset({index: 0, routes: [{name: "Home"}]});
    }
  }

  async function getEvaluatedTags(id: number) {
    try {
      const response = await get(`/tagValue/${id}`, setEvaluatedTagsLoading);

      if (firstLoad) {
        setSelectedTags(filterUsefulInformation(response.tagValueFromUser));
        setFirstLoad(false);
      }

      setEvaluatedTags(groupEvaluatedTags(response.tagValue.tagValues));
    } catch (err) {
      return navigation.reset({index: 0, routes: [{name: "Home"}]});
    }
  }

  /**
   * Receive a list of evaluated tags and returns a list of tags only with the useful information
   * @param list
   * @return Tag[]
   */
  function filterUsefulInformation(list: Evaluation[])
  {
    return list.map((item) => {
      return {
        id: item.tag.id,
        evalId: item.id,
        name: item.tag.name,
        description: item.tag.description,
        value: item.value.id
      }
    });
  }

  /**
   * Receive a list of evaluated tags and returns a list of tags grouped by tag
   * @param list
   * @return Tag[]
   */
  function groupEvaluatedTags(list: Evaluation[]): Tag[]
  {
    const finalValues: Tag[] = [];

    for (let item1 of list) {
      const countTags = list.filter((item) => item.tag.id === item1.tag.id)

      finalValues.push({
        id: countTags[0].tag.id,
        count: countTags.length,
        evalId: countTags[0].id,
        name: countTags[0].tag.name,
        value: countTags[0].value.id,
        description: countTags[0].tag.description
      });
    }

    return [
        ...new Map(finalValues.map((item) => [item["id"], item])).values(),
    ];
  }

  /**
   * Remove the value from um list and add it to the other
   * @param id
   * @param tagList
   * @param oppositeTagList
   * @param setListFunction
   * @param setOppositeListFunction
   */
  function handleLists(id: number, tagList: Tag[], oppositeTagList: Tag[], setListFunction: (tag: Tag[]) => void, setOppositeListFunction: (tag: Tag[]) => void) {
    const tagsNotSelected = tagList.filter(item => item.id !== id),
          tagsSelected = tagList.filter(item => item.id === id);

    setListFunction([...tagsNotSelected]);
    setOppositeListFunction([...oppositeTagList, ...tagsSelected]);
  }

  function renderTags()
  {
    return tags.map(tag => (
      <TouchableOpacity key={tag.id} onPress={() => handleLists(
        tag.id, tags, selectedTags, setTags, setSelectedTags
      )}>
          <Text style={styles.tag}>{tag.name}</Text>
        </TouchableOpacity>
      ));
  }

  function renderEvaluatedTags()
  {
    return evaluatedTags.map((tagValues: any, index: number) => (
      <TouchableOpacity key={index} onPress={() => {}} activeOpacity={1}>
        <Text style={styles.tag}>{tagValues.count} {tagValues.name}</Text>
      </TouchableOpacity>
    ));
  }

  function renderSelectedTags()
  {
    return selectedTags.map(tag => (
      <TagEvaluationCard
        key={tag.id}
        remove={() => {
          handleLists(
            tag.id, selectedTags, tags, setSelectedTags, setTags
          )

          getTags(false)
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
    ));
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
      <Text style={[styles.tagsListTitles, {color}]}>{getTerm(100088).toUpperCase()}</Text>

      <View style={[styles.tagsListView, {marginBottom: 20, borderColor: color}]}>
        {loadingEvaluatedTags
        ? <Loading />
        : <View style={styles.tagsContainer}>
            <Text>{renderEvaluatedTags()}</Text>
          </View>}
      </View>

      <View style={styles.selectedTagsContainer}>
        <Text style={[styles.tagsListTitles, {color}]}>{getTerm(100080).toUpperCase()}</Text>
        {renderSelectedTags() || <Text>{getTerm(100079)}</Text>}
      </View>

      <Text style={[styles.tagsListTitles, {color}]}>{getTerm(100030).toUpperCase()}</Text>

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