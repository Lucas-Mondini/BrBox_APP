import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Alert, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import styles from "./styles";

import config from "../../../brbox.config.json";
import { useTheme } from "../../Contexts/Theme";
import { useTerm } from "../../Contexts/TermProvider";
import { Params } from "../../utils/types";
import { useLinking } from "../../Contexts/LinkingProvider";

export default function BottomMenu()
{
  const navigation = useNavigation<any>();

  const { share } = useLinking();
  const { getTerm } = useTerm();
  const { darkMode } = useTheme();

  const iconColor = darkMode ? "#fff" : config.mainIconColor;
  const backgroundColor = {backgroundColor: darkMode ? config.dark : "#fff"}

  function goTo(route: string, params?: Params)
  {
    return navigation.reset({index: 0, routes: [{name: "Home"}, {name: route, params}]});
  }

  async function shareApp()
  {
    await share(getTerm(100107), "playStore");
  }

  return (
    <View style={[styles.bottomMenuContainer, backgroundColor]}>
      <TouchableOpacity style={styles.button} onPress={() => goTo("SearchGame")}>
        <Icon name="search" size={35} color={iconColor}/>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => {goTo("Home", {filterUser: true})}}>
        <Icon name="check-square" size={35} color={iconColor}/>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => {goTo("Home", {watchlist: true})}}>
        <Icon name="star" size={35} color={iconColor}/>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={shareApp}>
        <Icon name="share-square" size={35} color={iconColor}/>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => {goTo("Profile")}}>
        <Icon name="user-circle" size={35} color={iconColor}/>
      </TouchableOpacity>
    </View>
  );
}