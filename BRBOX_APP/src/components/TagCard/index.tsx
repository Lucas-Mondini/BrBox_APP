import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Alert, Text, TouchableOpacity, useColorScheme, View } from "react-native";

import styles from "./styles";
import config from "../../../brbox.config.json";
import { splitText } from "../../utils/functions";
import { useRequest } from "../../Contexts/Request";
import { useTerm } from "../../Contexts/TermProvider";
import CardsButton from "../CardsButton";

interface TagCardProps {
  id: number;
  title: string;
  description: string;
  setLoading: (value: boolean) => void;
  onDelete: () => void;
}

export default function TagCard({id, title, description, setLoading, onDelete}: TagCardProps)
{
  const isDarkMode = useColorScheme() === 'dark';
  const navigation = useNavigation<any>();
  const {destroy} = useRequest();
  const {getTerm} = useTerm();

  const textColor = {color: isDarkMode ? "#fff" : config.dark}

  function navigateToTagInfo() {
    return navigation.navigate("TagRegister", {id});
  }

  async function deleteTag() {
    Alert.alert(getTerm(100032), getTerm(100033),[
      {text: getTerm(100040), onPress: async () => {
        try {
          await destroy(`/tag/destroy/${id}`, onDelete, setLoading);
        } catch (error) {
          return navigation.reset({index: 0, routes: [{name: "Home"}]});
        }
      }},
      {text: getTerm(100041)}
    ])
  }

  return (
    <TouchableOpacity style={styles.tagCard} onPress={navigateToTagInfo}>
      <View>
        <Text style={[styles.title, textColor]}>{splitText(title, 24)}</Text>
        <Text style={[styles.description, textColor]}>{splitText(description, 50)}</Text>
      </View>

      <View style={styles.buttonView}>
        <CardsButton
          iconName="trash"
          extraButtonStyle={styles.deleteButton}
          callback={deleteTag}
        />
      </View>
    </TouchableOpacity>
  );
}