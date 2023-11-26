import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Alert, Dimensions, Text, TouchableOpacity, View } from "react-native";

import styles from "./styles";
import config from "../../../brbox.config.json";
import { useRequest } from "../../Contexts/Request";
import { useTerm } from "../../Contexts/TermProvider";
import CardsButton from "../CardsButton";
import { useTheme } from "../../Contexts/Theme";

interface PlatformCardProps {
  id: number;
  name: string;
  setLoading: (value: boolean) => void;
  onDelete?: () => void;
  onPress?: () => void;
}

export default function PlatformCard({id, name, setLoading, onDelete, onPress}: PlatformCardProps)
{
  const { light } = useTheme();
  const navigation = useNavigation<any>();
  const {destroy} = useRequest();
  const {getTerm} = useTerm();

  const {width} = Dimensions.get('window');

  const textColor = {color: light, width: name.length > 30 ? (width >= 400 ? "29%" : "25%") : "100%"}

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
          return Alert.alert(getTerm(100073), getTerm(100074));
        }
      }},
      {text: getTerm(100041)}
    ]);
  }

  return (
    <TouchableOpacity
      style={styles.platformCard}
      onPress={onPress || navigateToPlatformInfo}
    >
      <View>
        <Text style={[styles.title, textColor]}>{name}</Text>
      </View>

      {onDelete &&
        <View style={styles.buttonView}>
          <CardsButton
            iconName="trash"
            style={styles.deleteButton}
            onPress={deletePlatform}
          />
        </View>
      }
    </TouchableOpacity>
  );
}