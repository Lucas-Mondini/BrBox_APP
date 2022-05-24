import { useNavigation } from "@react-navigation/native";
import React from "react";
import { TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import { useTerm } from "../../Contexts/TermProvider";
import styles from "./styles";

import config from "../../../brbox.config.json";

interface BottomMenuProps {
  children: React.ReactElement
}

export default function BottomMenu()
{
  const navigation = useNavigation<any>();
  const {getTerm} = useTerm();

  return (
    <View style={styles.bottomMenuContainer}>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("SearchGame")}>
        <Icon name="search" size={35} color={config.mainIconColor}/>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("GameInfo")}>
        <Icon name="check-square" size={35} color={config.mainIconColor}/>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("SearchGame")}>
        <Icon name="star" size={35} color={config.mainIconColor}/>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("SearchGame")}>
        <Icon name="thumbs-up" size={35} color={config.mainIconColor}/>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Share")}>
        <Icon name="share-square" size={35} color={config.mainIconColor}/>
      </TouchableOpacity>
    </View>
  );
}