import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Text, TouchableOpacity, useColorScheme, View } from "react-native";

import styles from "./styles";
import config from "../../../brbox.config.json";
import { splitText } from "../../utils/functions";
import CardsButton from "../CardsButton";

interface TagEvaluationCardProps {
  id: number;
  title: string;
  description: string;
  remove: () => void;
}

export default function TagEvaluationCard({id, title, description, remove}: TagEvaluationCardProps)
{
  const isDarkMode = useColorScheme() === 'dark';
  const navigation = useNavigation<any>();

  const textColor = {color: isDarkMode ? "#fff" : config.dark}

  function navigateToTagInfo() {
    return navigation.navigate("TagRegister", {id});
  }

  return (
    <TouchableOpacity style={styles.tagCard} onPress={navigateToTagInfo}>
      <View>
        <Text style={[styles.title, textColor]}>{splitText(title, 24)}</Text>
        <Text style={[styles.description, textColor]}>{splitText(description, 50)}</Text>
      </View>

      <View style={styles.buttonView}>
        <CardsButton
          iconName="md-thumbs-up-sharp"
          iconLibrary="Ionicons"
          callback={navigateToTagInfo}
        />
        <CardsButton
          iconName="thumbs-up-down"
          iconLibrary="MaterialIcons"
          callback={navigateToTagInfo}
        />
        <CardsButton
          iconName="md-thumbs-down-sharp"
          iconLibrary="Ionicons"
          callback={navigateToTagInfo}
          />
        <CardsButton
          iconName="close"
          iconLibrary="MaterialIcons"
          callback={remove}
        />
      </View>
    </TouchableOpacity>
  );
}