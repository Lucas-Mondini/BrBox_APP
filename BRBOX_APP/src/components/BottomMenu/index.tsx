import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Alert, Share, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import styles from "./styles";

import config from "../../../brbox.config.json";
import { useTheme } from "../../Contexts/Theme";
import { useTerm } from "../../Contexts/TermProvider";
import { Params } from "../../utils/types";

export default function BottomMenu()
{
  const navigation = useNavigation<any>();

  const { darkMode } = useTheme();
  const { getTerm } = useTerm();

  const iconColor = darkMode ? "#fff" : config.mainIconColor;
  const backgroundColor = {backgroundColor: darkMode ? config.dark : "#fff"}

  function goTo(route: string, params?: Params, reset?: boolean)
  {
    if (reset) {
      return navigation.reset({index: 0, routes: [{name: route, params}]});
    }

    return navigation.navigate(route, params);
  }

  async function shareApp()
  {
    try {
      await Share.share({
        message: getTerm(100107)+"\n\n\n"+config.playStoreUrl,
      });
    } catch (error) {
      Alert.alert(getTerm(100108), getTerm(100109))
    }
  }

  return (
    <View style={[styles.bottomMenuContainer, backgroundColor]}>
      <TouchableOpacity style={styles.button} onPress={() => goTo("Home", {search: true}, true)}>
        <Icon name="search" size={35} color={iconColor}/>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => {return Alert.alert("Sem rotas", "Ainda não foram implementadas rotas nesse menu"); goTo("TagsRatedByUser")}}>
        <Icon name="check-square" size={35} color={iconColor}/>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => {return Alert.alert("Sem rotas", "Ainda não foram implementadas rotas nesse menu"); goTo("TagsRatedByUser")}}>
        <Icon name="star" size={35} color={iconColor}/>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => {return Alert.alert("Sem rotas", "Ainda não foram implementadas rotas nesse menu"); goTo("TagsRatedByUser")}}>
        <Icon name="thumbs-up" size={35} color={iconColor}/>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={shareApp}>
        <Icon name="share-square" size={35} color={iconColor}/>
      </TouchableOpacity>
    </View>
  );
}