import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import styles from "./styles";

import config from "../../../brbox.config.json";
import { useTerm } from "../../Contexts/TermProvider";
import { useTheme } from "../../Contexts/Theme";
import { useGame } from "../../Contexts/Game";
import { useNavigation } from "@react-navigation/native";
import { useRequest } from "../../Contexts/Request";
import { Evaluation, Tag, TagValue } from "../../utils/types";
import TagEvaluationCard from "../TagEvaluationCard";
import Loading from "../Loading";
import Input from "../Input";
import Icon from "react-native-vector-icons/FontAwesome5";
import TagCard from "../Tag";
import TagInfoModal from "../TagInfoModal";

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

  const [search, setSearch] = useState("");
  const [tags, setTags] = useState([] as Tag[]);
  const [firstLoad, setFirstLoad] = useState(true);
  const [loadingTags, setLoadingTags] = useState(true);
  const [loadingEvaluatedTags, setEvaluatedTagsLoading] = useState(true);
  const [selectedTags, setSelectedTags] = useState([] as Tag[]);
  const [evaluatedTags, setEvaluatedTags] = useState([] as Tag[]);
  const [modal, setModal] = useState<React.ReactElement | null>(null);

  const [showEvaluatedTags, setShowEvaluatedTags] = useState(true);
  const [showSelectedTags, setShowSelectedTags] = useState(true);

  const { darkMode } = useTheme();

  const color = darkMode ? config.subTitleMainColor : config.dark;

  async function getTags(setTagsState: boolean = true) {
    try {
      const response = await get(`/tag?game=${gameId}&name=${search}`, setLoadingTags);

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
      if (setEvaluationTags) setEvaluationTags(groupEvaluatedTags(response.tagValue.tagValues));
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
        icon: item.tag.icon,
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
      const countUpVotes = list.filter((item) => item.value.id === 1).length
      const countNeutralVotes = list.filter((item) => item.value.id === 2).length
      const countDownVotes = list.filter((item) => item.value.id === 3).length

      finalValues.push({
        id: countTags[0].tag.id,
        icon: countTags[0].tag.icon,
        count: countTags.length,
        upVotes: countUpVotes,
        neutralVotes: countNeutralVotes,
        downVotes: countDownVotes,
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
    return tags.map((tag: any) => (
      <View key={tag.id}>
        <TagCard
          showName
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
        description={tag.description || ""}
        tagValueListId={tagValueList}
        extraCallback={() => getEvaluatedTags(tagValueList)}
      />
    ));
  }

  useEffect(() => {
    setTimeout(() =>{
      getTags();
    }, 500)
  }, [search]);

  useEffect(() => {
    if (tagValueList > 0) {
      getEvaluatedTags(tagValueList);
    }
  }, [tagValueList]);

  return (
    <View>
      {modal && modal}
      <TouchableOpacity
        style={styles.toggle}
        onPress={() => {
          setShowEvaluatedTags(!showEvaluatedTags);
        }}
      >
        <View>
          <Text style={[styles.tagsListTitles, {color}]}>{getTerm(100088).toUpperCase()}</Text>
        </View>

        <Icon name={showEvaluatedTags ? "caret-up" : "caret-down"} color={color} size={25}/>
      </TouchableOpacity>

      {showEvaluatedTags &&
        <View style={[styles.tagsListView, {marginBottom: 20, borderColor: color}]}>
          {loadingEvaluatedTags
          ? <Loading styles={{borderRadius: 8}} />
          : <View style={styles.tagsContainer}>
              <Text>{renderEvaluatedTags()}</Text>
            </View>}
        </View>
      }

      <View style={styles.selectedTagsContainer}>
        <TouchableOpacity
          style={styles.toggle}
          onPress={() => {
            setShowSelectedTags(!showSelectedTags);
          }}
        >
          <View>
            <Text style={[styles.tagsListTitles, {color}]}>{getTerm(100080).toUpperCase()}</Text>
          </View>

          <Icon name={showSelectedTags ? "caret-up" : "caret-down"} color={color} size={25}/>
        </TouchableOpacity>
        {showSelectedTags && renderSelectedTags()}
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