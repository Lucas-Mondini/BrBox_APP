import React, { useState } from "react";
import { Text, View } from "react-native";

import styles from "./styles";
import config from "../../../brbox.config.json";
import { splitText } from "../../utils/functions";
import CardsButton from "../CardsButton";
import { useRequest } from "../../Contexts/Request";
import { useTheme } from "../../Contexts/Theme";
import Loading from "../Loading";

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
  const { post } = useRequest();

  const textColor = {color: darkMode ? "#fff" : config.dark}

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
      if (evalId > 0 && sendRequest) {
        await post("tagValue/remove", setLoading, {
          tagValueListId, tagValueId: evalId
        });
      }
    } catch (e : any) {
    }

    setLoading(false);
    remove();
  }

  return (
    <View style={styles.tagCard}>
      <View>
        <Text style={[styles.title, textColor]}>{splitText(title, 24)}</Text>
        <Text style={[styles.description, textColor]}>{splitText(description, 50)}</Text>
      </View>

      <View style={styles.buttonView}>

      {loading
        ? <Loading
            styles={{paddingRight: 35}}
          />
        : <>
          <CardsButton
            iconName="md-thumbs-up-sharp"
            iconLibrary="Ionicons"
            onPress={() => saveVote(1)}
            style={selectedEvaluationVote === 1 ? {backgroundColor: config.greenBar} : {}}
          />
          <CardsButton
            iconName="thumbs-up-down"
            iconLibrary="MaterialIcons"
            onPress={() => saveVote(2)}
            style={selectedEvaluationVote === 2 ? {backgroundColor: config.yellow} : {}}
          />
          <CardsButton
            iconName="md-thumbs-down-sharp"
            iconLibrary="Ionicons"
            onPress={() => saveVote(3)}
            style={selectedEvaluationVote === 3 ? {backgroundColor: config.red} : {}}
          />
        </>}

        <CardsButton
          iconName="close"
          iconLibrary="MaterialIcons"
          onPress={deleteVote}
          style={loading ? {opacity: 0} : {}}
          disabled={loading}
        />
      </View>
    </View>
  );
}