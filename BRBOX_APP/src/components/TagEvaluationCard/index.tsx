import React, { useState } from "react";
import { Image, Text, View } from "react-native";

import styles from "./styles";
import config from "../../../brbox.config.json";
import { splitText } from "../../utils/functions";
import CardsButton from "../CardsButton";
import { useRequest } from "../../Contexts/Request";
import { useTheme } from "../../Contexts/Theme";
import Loading from "../Loading";
import getImages from "../../utils/getImage";

interface TagEvaluationCardProps {
  id: number;
  evaluationId?: number;
  title: string;
  value?: number;
  description: string;
  tagValueListId: number;
  remove: () => void;
  extraCallback?: () => void;
}

export default function TagEvaluationCard({id, evaluationId, title, value, description, tagValueListId, remove, extraCallback}: TagEvaluationCardProps)
{
  const { darkMode } = useTheme();
  const [selectedEvaluationVote, setSelectedEvaluationVote] = useState(value || 0);
  const [loading, setLoading] = useState(false);

  const [sendRequest, setSendRequest] = useState(Boolean(evaluationId));
  const [evalId, setEvalId] = useState(evaluationId || 0);
  const [showButtons, setShowButtons] = useState(!Boolean(evaluationId));
  const { post } = useRequest();

  const textColor = {color: darkMode ? "#fff" : config.dark}
  const descriptionColor = {color: darkMode ? "#BFBFBF" : config.dark}
  const iconColor = (value: number) => darkMode || selectedEvaluationVote === value ? "#fff" : config.mainIconColor;
  const actionsColor = darkMode ? "#fff" : config.mainIconColor;

  async function saveVote(vote: number) {
    setLoading(true);

    try {
      const response = await post("tagValue/add", setLoading, {
        tagValueListId, tag: id, value: vote
      });

      setEvalId(response.tagValueId);
      setSelectedEvaluationVote(response.value);
      setSendRequest(true);
    } catch (error: any) {
      setSelectedEvaluationVote(vote);
    }

    if (extraCallback) extraCallback();

    setLoading(false);
  }

  async function deleteVote() {
    setLoading(true);

    try {
      if (evalId && sendRequest) {
        await post("tagValue/remove", setLoading, {
          tagValueListId, tagValueId: evalId
        });
      }
    } catch (e : any) {
    }

    setLoading(false);
    remove();
  }

  function toggleButtons()
  {
    setShowButtons(!showButtons);
  }

  function getImage()
  {
    switch(selectedEvaluationVote) {
      case 1:
        return getImages('axe');
        break;
      case 2:
        return getImages('axe-yellow');
        break;
      case 3:
        return getImages('axe-red');
        break;
      default:
        return getImages('axe-white');
        break;
    }
  }

  return (
    <View style={styles.tagCard}>
      {!showButtons &&
        <View style={[styles.axesView, {backgroundColor: darkMode ? config.darkGray : config.light}]}>
          <Image source={getImage()} />
        </View>
      }

      <View>
        <Text style={[styles.title, textColor]}>{splitText(title, 24)}</Text>
        <Text style={[styles.description, descriptionColor]}>{splitText(description, 50)}</Text>
      </View>

      <View style={styles.buttonView}>

      {showButtons ?
        <>{loading
          ? <Loading
              styles={{paddingRight: 35}}
            />
          : <>
            <CardsButton
              iconName="arrow-up"
              iconLibrary="MaterialCommunityIcons"
              iconColor={iconColor(1)}
              onPress={() => saveVote(1)}
              style={selectedEvaluationVote === 1 ? {backgroundColor: config.greenBar} : {}}
            />
            <CardsButton
              iconName="arrow-up-down"
              iconLibrary="MaterialCommunityIcons"
              iconColor={iconColor(2)}
              onPress={() => saveVote(2)}
              style={selectedEvaluationVote === 2 ? {backgroundColor: config.yellow} : {}}
            />
            <CardsButton
              iconName="arrow-down"
              iconLibrary="MaterialCommunityIcons"
              iconColor={iconColor(3)}
              onPress={() => saveVote(3)}
              style={selectedEvaluationVote === 3 ? {backgroundColor: config.red} : {}}
            />
            <CardsButton
              iconName="trash"
              iconColor={actionsColor}
              iconLibrary="Ionicons"
              onPress={deleteVote}
              style={loading ? {opacity: 0} : {}}
              disabled={loading}
            />
          </>}

          <CardsButton
            iconColor={actionsColor}
            iconName="close"
            iconLibrary="MaterialIcons"
            onPress={toggleButtons}
            style={loading ? {opacity: 0} : {}}
            disabled={loading}
            /></>
          : <CardsButton
              iconColor={actionsColor}
              iconName="options-vertical"
              iconLibrary="SimpleLineIcons"
              onPress={toggleButtons}
              style={loading ? {opacity: 0} : {}}
              disabled={loading}
            />
      }
      </View>
    </View>
  );
}