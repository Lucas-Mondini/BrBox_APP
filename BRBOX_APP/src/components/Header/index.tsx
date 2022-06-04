import React from "react";
import { Text, TouchableOpacity, useColorScheme, View } from "react-native";

import { useTerm } from "../../Contexts/TermProvider";
import styles from "./styles";
import config from "../../../brbox.config.json";
import Icon from "react-native-vector-icons/Feather";

interface HeaderProps {
  title: number | string;
  addAction?: () => void;
}

export default function Header({title, addAction}: HeaderProps)
{
  const isDarkMode = useColorScheme() === 'dark';
  const {getTerm} = useTerm();

  const color = !isDarkMode ? config.darkGreen : config.mediumGreen;

  return (
    <View style={[styles.headerContainer, {borderBottomColor: color}]}>
      <TouchableOpacity style={[styles.menuButton]} onPress={()=>{console.warn("deu")}}>
        <Icon
          name="menu"
          size={35}
          color={color}
        />
      </TouchableOpacity>

      <Text style={[styles.title, {color}]}>{typeof title === "string" ? title : getTerm(title)}</Text>

      {addAction &&
        <TouchableOpacity style={[styles.addButton]} onPress={addAction}>
          <Icon
            name="plus"
            size={35}
            color={color}
          />
        </TouchableOpacity>
      }
    </View>
  );
}