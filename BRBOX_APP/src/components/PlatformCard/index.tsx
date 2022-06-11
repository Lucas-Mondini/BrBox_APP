import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Alert, Text, TouchableOpacity, useColorScheme, View } from "react-native";

import styles from "./styles";
import config from "../../../brbox.config.json";
import { splitText } from "../../utils/functions";
import { useRequest } from "../../Contexts/Request";
import { useTerm } from "../../Contexts/TermProvider";
import CardsButton from "../CardsButton";

interface PlatformCardProps {
  id: number;
  name: string;
  setLoading: (value: boolean) => void;
  onDelete?: () => void;
  onPress?: () => void;
}

export default function PlatformCard({id, name, setLoading, onDelete, onPress}: PlatformCardProps)
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
    if (!onDelete) return;

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
    <TouchableOpacity
      style={styles.platformCard}
      onPress={onPress || navigateToPlatformInfo}
    >
      <View>
        <Text style={[styles.title, textColor]}>{splitText(name, 24)}</Text>
      </View>

      {onDelete &&
        <View style={styles.buttonView}>
          <CardsButton
            iconName="trash"
            extraButtonStyle={styles.deleteButton}
            callback={deletePlatform}
          />
        </View>
      }
    </TouchableOpacity>
  );
}