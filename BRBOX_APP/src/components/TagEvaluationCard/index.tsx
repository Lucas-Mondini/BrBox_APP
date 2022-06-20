import React, { useState } from "react";
import { Text, View } from "react-native";

import styles from "./styles";
import config from "../../../brbox.config.json";
import { splitText } from "../../utils/functions";
import CardsButton from "../CardsButton";
import { useRequest } from "../../Contexts/Request";
import { useTheme } from "../../Contexts/Theme";

interface TagEvaluationCardProps {
  id: number;
  title: string;
  description: string;
  tagValueListId: number;
  remove: () => void;
}

export default function TagEvaluationCard({id, title, description, tagValueListId, remove}: TagEvaluationCardProps)
{
  const { darkMode } = useTheme();
  const [selectedEvaluationVote, setSelectedEvaluationVote] = useState(0);
  const [loading, setLoading] = useState(false);
  const [evalId, setEvalId] = useState(0);
  const { post } = useRequest();

  const textColor = {color: darkMode ? "#fff" : config.dark}

  async function saveVote(vote: number) {
    setLoading(true);

    try {
      const response = await post("tagValue/add", setLoading, {
        tagValueListId, tag: id, value: vote
      });

      setEvalId(response.tagValues[0].id);
      setSelectedEvaluationVote(response.tagValues[0].value.id);
    } catch (error: any) {
      setSelectedEvaluationVote(vote);
    }

    setLoading(false);
  }

  async function deleteVote() {
    setLoading(true);

    try {
      if (evalId > 0) {
        await post("tagValue/remove", setLoading, {
          tagValueListId, tagValueId: evalId
        });
      }

      remove();
    } catch (e : any) {
      console.log(e)
      setLoading(false);
    }
  }

  return (
    <View style={styles.tagCard}>
      <View>
        <Text style={[styles.title, textColor]}>{splitText(title, 24)}</Text>
        <Text style={[styles.description, textColor]}>{splitText(description, 50)}</Text>
      </View>

      {!loading &&
        <View style={styles.buttonView}>
          <CardsButton
            iconName="md-thumbs-up-sharp"
            iconLibrary="Ionicons"
            callback={() => saveVote(1)}
            extraButtonStyle={selectedEvaluationVote === 1 ? {backgroundColor: config.greenBar} : {}}
          />
          <CardsButton
            iconName="thumbs-up-down"
            iconLibrary="MaterialIcons"
            callback={() => saveVote(2)}
            extraButtonStyle={selectedEvaluationVote === 2 ? {backgroundColor: config.yellow} : {}}
          />
          <CardsButton
            iconName="md-thumbs-down-sharp"
            iconLibrary="Ionicons"
            callback={() => saveVote(3)}
            extraButtonStyle={selectedEvaluationVote === 3 ? {backgroundColor: config.red} : {}}
          />
          
          <CardsButton
            iconName="close"
            iconLibrary="MaterialIcons"
            callback={deleteVote}
          />
        </View>
      }
    </View>
  );
}