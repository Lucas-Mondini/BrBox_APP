import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";

import styles from "./styles";
import config from "../../../brbox.config.json";
import { useRequest } from "../../Contexts/Request";
import { useTerm } from "../../Contexts/TermProvider";
import CardsButton from "../CardsButton";
import { useTheme } from "../../Contexts/Theme";

interface GenreModeCardProps {
  id: number;
  name: string;
  genre?: boolean;
  disabled?: boolean;
  hideBottom?: boolean;

  onPress?: () => void;
  onDelete?: () => void;
  setLoading: (value: boolean) => void;
  deleteCustomFunction?: () => void;
}

export default function GenreModeCard({id, name, genre, disabled, hideBottom, setLoading, onPress, onDelete, deleteCustomFunction}: GenreModeCardProps)
{
  const navigation = useNavigation<any>();

  const { darkMode } = useTheme();
  const {destroy} = useRequest();
  const {getTerm} = useTerm();

  const textColor = {color: darkMode ? "#fff" : config.dark};

  function navigateToInfo() {
    return navigation.navigate("AddGenreMode", {id, genres: genre});
  }

  async function deleteData() {
    if (deleteCustomFunction) return deleteCustomFunction();

    if (!onDelete) return;

    Alert.alert(getTerm(genre ? 100159 : 100157), getTerm(genre ? 100160 : 100158),[
      {text: getTerm(100040), onPress: async () => {
        try {
          await destroy(`/${genre ? "genre" : "mode"}/destroy/${id}`, onDelete, setLoading);
        } catch (error) {
          return navigation.reset({index: 0, routes: [{name: "Home"}]});
        }
      }},
      {text: getTerm(100041)}
    ]);
  }

  return (
    <TouchableOpacity
      style={[styles.card, !hideBottom && styles.cardBottom]}
      onPress={onPress || navigateToInfo}
      disabled={disabled}
    >
      <View style={{width: "85%"}}>
        <Text style={[styles.title, textColor]}>{name}</Text>
      </View>

      {
        (onDelete || deleteCustomFunction) &&
        <View style={styles.buttonView}>
          <CardsButton
            iconName="trash"
            style={styles.deleteButton}
            onPress={deleteData}
          />
        </View>
      }
    </TouchableOpacity>
  );
}