import React, { useState } from "react";
import { Dimensions, Text, View } from "react-native";

import styles from "./styles";
import config from "../../../brbox.config.json";
import { getIcon, splitText } from "../../utils/functions";
import CardsButton from "../CardsButton";
import { useRequest } from "../../Contexts/Request";
import { useTheme } from "../../Contexts/Theme";
import Loading from "../Loading";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

interface TagEvaluationCardProps {
  id: number;
  icon: number;
  evaluationId?: number;
  title: string;
  value?: number;
  description: string;
  tagValueListId: number;
  remove: () => void;
  extraCallback?: () => void;
}

export default function TagEvaluationCard({id, evaluationId, title, icon, value, description, tagValueListId, remove, extraCallback}: TagEvaluationCardProps)
{
  const { darkMode } = useTheme();
  const [selectedEvaluationVote, setSelectedEvaluationVote] = useState(value || 0);
  const [loading, setLoading] = useState(false);

  const [sendRequest, setSendRequest] = useState(Boolean(evaluationId));
  const [evalId, setEvalId] = useState(evaluationId || 0);
  const [showButtons, setShowButtons] = useState(false);
  const { post } = useRequest();

  const textColor = {color: darkMode ? "#fff" : config.dark}
  const descriptionColor = {color: darkMode ? "#BFBFBF" : config.dark}
  const iconColor = (value: number) => darkMode || selectedEvaluationVote === value ? "#fff" : config.mainIconColor;
  const actionsColor = darkMode ? "#fff" : config.mainIconColor;
  const {width} = Dimensions.get('window');

  async function saveVote(vote: number) {
    setLoading(true);

    try {
      const response = await post("tagValue/add", setLoading, {
        tagValueListId, tag: id, value: vote
      });

      setEvalId(response.tagValueId);
      setSelectedEvaluationVote(response.value);
      setSendRequest(true);
      setShowButtons(false);
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
    const iconColor: any = {
      0: "#FFF",
      1: config.mediumGreen,
      2: config.yellow,
      3: config.lightRed,
    }

    return (
      <Icon
        color={iconColor[selectedEvaluationVote] || "#FFF"}
        size={30}
        name={getIcon(icon)}
      />
    );
  }

  return (
    <View style={styles.tagCard}>
      {!showButtons &&
        <View style={[styles.axesView, {backgroundColor: darkMode ? config.darkGray : config.light}]}>
          {getImage()}
        </View>
      }

      <View>
        <Text style={[styles.title, textColor]}>{splitText(title, width >= 400 ? 20 : 15)}</Text>
        <Text style={[styles.description, descriptionColor]}>{splitText(description, width >= 400 ? 35 : 25)}</Text>
      </View>

      <View style={[styles.buttonView, {backgroundColor: !darkMode ? "#fff" : config.dark}]}>

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