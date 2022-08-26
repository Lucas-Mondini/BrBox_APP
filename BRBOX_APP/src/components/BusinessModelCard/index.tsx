import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Alert, Dimensions, Text, TouchableOpacity, View } from "react-native";

import styles from "./styles";
import config from "../../../brbox.config.json";
import { useRequest } from "../../Contexts/Request";
import { useTerm } from "../../Contexts/TermProvider";
import CardsButton from "../CardsButton";
import { useTheme } from "../../Contexts/Theme";

interface BusinessModelCardProps {
  id: number;
  name: string;
  disabled?: boolean;
  description: string;
  hideBottom?: boolean;

  onPress?: () => void;
  onDelete?: () => void;
  setLoading: (value: boolean) => void;
  deleteCustomFunction?: () => void;
}

export default function BusinessModelCard({id, name, disabled, description, hideBottom, setLoading, onDelete, deleteCustomFunction, onPress}: BusinessModelCardProps)
{
  const { darkMode } = useTheme();
  const navigation = useNavigation<any>();
  const {destroy} = useRequest();
  const {getTerm} = useTerm();

  const {width} = Dimensions.get('window');

  const textColor = {color: darkMode ? "#fff" : config.dark, width: name.length > 30 ? (width >= 400 ? "29%" : "25%") : "100%"};
  const descriptionColor = {color: darkMode ? config.subTitleMainColor : config.dark};

  function navigateToBusinessModelInfo() {
    return navigation.navigate("AddBusinessModel", {id});
  }

  async function deleteBusinessModel() {
    if (deleteCustomFunction) return deleteCustomFunction();

    if (!onDelete) return;

    Alert.alert(getTerm(100123), getTerm(100124),[
      {text: getTerm(100040), onPress: async () => {
        try {
          await destroy(`/businessModel/destroy/${id}`, onDelete, setLoading);
        } catch (error) {
          return Alert.alert(getTerm(100073), getTerm(100074));
        }
      }},
      {text: getTerm(100041)}
    ])
  }

  return (
    <TouchableOpacity
      disabled={disabled}
      style={[styles.businessModelCard, !hideBottom && styles.businessModelCardBottom]}
      onPress={onPress || navigateToBusinessModelInfo}
    >
      <View>
        <Text style={[styles.title, textColor]}>{name}</Text>
        <View style={{width: (onDelete || deleteCustomFunction) && !disabled && description.length > 40 ? "93%" : "100%"}}>
          <Text style={[styles.description, descriptionColor]}>{description}</Text>
        </View>
      </View>

      {((onDelete || deleteCustomFunction) && !disabled) &&
        <View style={styles.buttonView}>
          <CardsButton
            iconName="trash"
            style={styles.deleteButton}
            onPress={deleteBusinessModel}
          />
        </View>
      }
    </TouchableOpacity>
  );
}