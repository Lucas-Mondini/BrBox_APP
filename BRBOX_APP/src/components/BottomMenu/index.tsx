import { useNavigation } from "@react-navigation/native";
import React from "react";
import { TouchableOpacity, useColorScheme, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import styles from "./styles";

import config from "../../../brbox.config.json";

interface BottomMenuProps {
  children: React.ReactElement
}

export default function BottomMenu()
{
  const navigation = useNavigation<any>();

  const isDarkMode = useColorScheme() === 'dark';

  const iconColor = isDarkMode ? "#fff" : config.mainIconColor;
  const backgroundColor = {backgroundColor: isDarkMode ? config.dark : "#fff"}

  return (
    <View style={[styles.bottomMenuContainer, backgroundColor]}>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("SearchGame")}>
        <Icon name="search" size={35} color={iconColor}/>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("GameInfo")}>
        <Icon name="check-square" size={35} color={iconColor}/>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("SearchGame")}>
        <Icon name="star" size={35} color={iconColor}/>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("SearchGame")}>
        <Icon name="thumbs-up" size={35} color={iconColor}/>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Profile")}>
        <Icon name="share-square" size={35} color={iconColor}/>
      </TouchableOpacity>
    </View>
  );
}