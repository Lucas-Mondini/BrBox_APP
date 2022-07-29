import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
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
import Input from "../Input";
import TagCard from "../Tag";
import TagInfoModal from "../TagInfoModal";
import ToggleContent from "../ToggleContent";
import useDelay from "../../hooks/Delay";

interface TagContainersProps {
  setEvaluationTags: (tags: Tag[]) => void
}

export default function TagsContainers({setEvaluationTags}: TagContainersProps)
{
  const {
    id: gameId , tagValueList
  } = useGame();

  const {get} = useRequest();
  const {getTerm} = useTerm();
  const navigation = useNavigation<any>();

  const [tags, setTags] = useState([] as Tag[]);
  const [modal, setModal] = useState<React.ReactElement | null>(null);
  const [search, setSearch] = useState("");
  const [tagName, setTagName] = useState("");
  const [firstLoad, setFirstLoad] = useState(true);
  const [loadingTags, setLoadingTags] = useState(true);
  const [selectedTags, setSelectedTags] = useState([] as Tag[]);
  const [evaluatedTags, setEvaluatedTags] = useState([] as Tag[]);
  const [loadingEvaluatedTags, setEvaluatedTagsLoading] = useState(true);

  const { darkMode } = useTheme();

  const color = darkMode ? config.subTitleMainColor : config.dark;

  async function getTags(setTagsState: boolean = true) {
    try {
      const response = await get(`/tag?game=${gameId}&name=${tagName}`, setLoadingTags);

      if (setTagsState) setTags(response);
    } catch (err) {
      return navigation.reset({index: 0, routes: [{name: "Home"}]});
    }
  }

  async function getEvaluatedTags(id: number) {
    try {
      const response = await get(`/tagValue/${id}`, setEvaluatedTagsLoading);

      if (firstLoad) {
        setSelectedTags(response.tagValueFromUser);
        setFirstLoad(false);
      }

      setEvaluatedTags(response.tagValue);
      if (setEvaluationTags) setEvaluationTags(response.tagValue);
    } catch (err) {
      return navigation.reset({index: 0, routes: [{name: "Home"}]});
    }
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
    return tags.map((tag: any) => (
      <View key={tag.id}>
        <TagCard
          showName
          noEvaluations
          extraStyles={{margin: 3}}
          callback={() => handleLists(
            tag.id, tags, selectedTags, setTags, setSelectedTags
          )}
          tag={tag}
          specificStyle="greenBar"
        />
      </View>
    ));
  }

  function renderEvaluatedTags()
  {
    if (evaluatedTags.length === 0) {
      return <Text style={[styles.noContent, {color}]}>{getTerm(100111)}</Text>;
    }

    return evaluatedTags.map((tag: any) => (
      <View key={tag.id}>
        <TagCard
          showName
          showTotalVotes
          extraStyles={{margin: 3}}
          callback={() => {
            setModal(
              <TagInfoModal
                setModal={() => setModal(null)}
                tagInfo={tag}
              />
            );
          }}
          tag={tag}
          specificStyle="greenBar"
        />
      </View>
    ));
  }

  function renderSelectedTags()
  {
    if (selectedTags.length === 0) {
      return <Text style={[styles.noContent, {color}]}>{getTerm(100079)}</Text>;
    }

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
        icon={tag.icon}
        evaluationId={tag.evalId}
        value={tag.value}
        title={tag.name}
        descriptionPositive={tag.description_positive || ""}
        descriptionNeutral={tag.description_neutral || ""}
        descriptionNegative={tag.description_negative || ""}
        tagValueListId={tagValueList}
        extraCallback={() => getEvaluatedTags(tagValueList)}
      />
    ));
  }

  useEffect(() => {
      getTags();
  }, [tagName]);

  useEffect(() => {
    useDelay(search, setTagName, 1000);
  }, [search]);

  useEffect(() => {
    if (tagValueList > 0) {
      getEvaluatedTags(tagValueList);
    }
  }, [tagValueList]);

  return (
    <View>
      {modal && modal}
      <ToggleContent
        title={100088}
        content={
          <View style={[styles.tagsListView, {marginBottom: 20, borderColor: color}]}>
            {loadingEvaluatedTags
            ? <Loading styles={{borderRadius: 8}} />
            : <View style={[styles.tagsContainer, {justifyContent: "center"}]}>
                <Text>{renderEvaluatedTags()}</Text>
              </View>}
          </View>
        }
      />

      <View style={styles.selectedTagsContainer}>
        <ToggleContent
          title={100080}
          content={renderSelectedTags()}
        />
      </View>

      <Text style={[styles.tagsListTitles, {color}]}>{getTerm(100030).toUpperCase()}</Text>

      <Input
        placeholderText={100000}
        value={search}
        onChangeText={setSearch}
      />

      <View style={[styles.tagsListView, {marginBottom: 100, borderColor: color}]}>
        {loadingTags
        ? <Loading styles={{borderRadius: 8}} />
        : <View style={styles.tagsContainer}>
            <Text>{renderTags()}</Text>
          </View>}
      </View>
    </View>
  );
}