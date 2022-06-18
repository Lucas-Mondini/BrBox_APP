import { useNavigation } from "@react-navigation/native";
import React from "react";
import { TouchableOpacity, useColorScheme, View } from "react-native";
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

  return (
    <View style={[styles.bottomMenuContainer, backgroundColor]}>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Search")}>
        <Icon name="search" size={35} color={iconColor}/>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("TagsRatedByUser")}>
        <Icon name="check-square" size={35} color={iconColor}/>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Recommended")}>
        <Icon name="star" size={35} color={iconColor}/>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("YourRatings")}>
        <Icon name="thumbs-up" size={35} color={iconColor}/>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Share")}>
        <Icon name="share-square" size={35} color={iconColor}/>
      </TouchableOpacity>
    </View>
  );
}