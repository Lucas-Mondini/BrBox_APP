import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Alert, Dimensions, Text, TouchableOpacity, View } from "react-native";

import styles from "./styles";
import config from "../../../brbox.config.json";
import { getIcon, splitText } from "../../utils/functions";
import { useRequest } from "../../Contexts/Request";
import { useTerm } from "../../Contexts/TermProvider";
import CardsButton from "../CardsButton";
import { useTheme } from "../../Contexts/Theme";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

interface TagCardProps {
  id: number;
  icon: number;
  title: string;
  description: string;
  setLoading: (value: boolean) => void;
  onDelete: () => void;
}

export default function TagCard({id, icon, title, description, setLoading, onDelete}: TagCardProps)
{
  const { darkMode } = useTheme();
  const navigation = useNavigation<any>();
  const { destroy } = useRequest();
  const { getTerm } = useTerm();

  const color = darkMode ? "#fff" : config.dark;

  const { width } = Dimensions.get('window');

  function navigateToTagInfo() {
    return navigation.navigate("TagRegister", {id});
  }

  async function deleteTag() {
    Alert.alert(getTerm(100032), getTerm(100033),[
      {text: getTerm(100040), onPress: async () => {
        try {
          await destroy(`/tag/destroy/${id}`, onDelete, setLoading);
        } catch (error) {
          return Alert.alert(getTerm(100073), getTerm(100074));
        }
      }},
      {text: getTerm(100041)}
    ])
  }

  function getImage()
  {
    return (
      <Icon
        color={color}
        size={30}
        name={getIcon(icon)}
      />
    );
  }

  return (
    <TouchableOpacity style={styles.tagCard} onPress={navigateToTagInfo}>
      <View style={[styles.iconContainer]}>
        {getImage()}
      </View>
      <View>
        <Text style={[styles.title, {color}]}>{splitText(title, width >= 400 ? 21 : 15)}</Text>
        <View
          style={{width: description.length > 40 ? "85%" : "100%"}}
        >
          <Text style={[styles.description, {color}]}>{description}</Text>
        </View>
      </View>

      <View style={styles.buttonView}>
        <CardsButton
          iconName="trash"
          style={styles.deleteButton}
          onPress={deleteTag}
        />
      </View>
    </TouchableOpacity>
  );
}