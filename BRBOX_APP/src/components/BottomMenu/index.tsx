import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Alert, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import styles from "./styles";

import config from "../../../brbox.config.json";
import { useTheme } from "../../Contexts/Theme";

export default function BottomMenu()
{
  const navigation = useNavigation<any>();

  const { darkMode } = useTheme();

  const iconColor = darkMode ? "#fff" : config.mainIconColor;
  const backgroundColor = {backgroundColor: darkMode ? config.dark : "#fff"}

  function goTo(route: string)
  {
    return Alert.alert("Sem rotas", "Ainda não foram implementadas rotas nesse menu");
    navigation.navigate(route);
  }

  return (
    <View style={[styles.bottomMenuContainer, backgroundColor]}>
      <TouchableOpacity style={styles.button} onPress={() => goTo("Search")}>
        <Icon name="search" size={35} color={iconColor}/>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => goTo("TagsRatedByUser")}>
        <Icon name="check-square" size={35} color={iconColor}/>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => goTo("Recommended")}>
        <Icon name="star" size={35} color={iconColor}/>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => goTo("YourRatings")}>
        <Icon name="thumbs-up" size={35} color={iconColor}/>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => goTo("Share")}>
        <Icon name="share-square" size={35} color={iconColor}/>
      </TouchableOpacity>
    </View>
  );
}