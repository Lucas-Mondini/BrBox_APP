import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Alert, Text, TouchableOpacity, useColorScheme, View } from "react-native";

import styles from "./styles";
import config from "../../../brbox.config.json";
import { splitText } from "../../utils/functions";
import Icon from "react-native-vector-icons/FontAwesome";
import { useRequest } from "../../Contexts/Request";
import { useTerm } from "../../Contexts/TermProvider";

interface PlatformCardProps {
  id: number;
  name: string;
  setLoading: (value: boolean) => void;
  onDelete: () => void;
}

export default function PlatformCard({id, name, setLoading, onDelete}: PlatformCardProps)
{
  const isDarkMode = useColorScheme() === 'dark';
  const navigation = useNavigation<any>();
  const {destroy} = useRequest();
  const {getTerm} = useTerm();

  const textColor = {color: isDarkMode ? "#fff" : config.dark}

  function navigateToPlatformInfo() {
    return navigation.navigate("AddPlatform", {id});
  }

  async function deletePlatform() {
    Alert.alert(getTerm(100057), getTerm(100058),[
      {text: getTerm(100040), onPress: async () => {
        try {
          await destroy(`/platform/destroy/${id}`, onDelete, setLoading);
        } catch (error) {
          return navigation.reset({index: 0, routes: [{name: "Home"}]});
        }
      }},
      {text: getTerm(100041)}
    ])
  }

  return (
    <TouchableOpacity style={styles.platformCard} onPress={navigateToPlatformInfo}>
      <View>
        <Text style={[styles.title, textColor]}>{splitText(name, 24)}</Text>
      </View>

      <TouchableOpacity style={styles.deleteButton} onPress={deletePlatform}>
        <Icon name="trash" size={30} color="#fff" />
      </TouchableOpacity>
    </TouchableOpacity>
  );
}