import React, { useState } from "react";
import { Text, TouchableOpacity, useColorScheme, View } from "react-native";

import { useTerm } from "../../Contexts/TermProvider";
import styles from "./styles";
import config from "../../../brbox.config.json";
import Icon from "react-native-vector-icons/Feather";
import DropDownMenu from "../DropDownMenu";

interface HeaderProps {
  title: number | string;
  addAction?: () => void;
}

export default function Header({title, addAction}: HeaderProps)
{
  const isDarkMode = useColorScheme() === 'dark';
  const {getTerm} = useTerm();

  const [dropDownMenu, setDropDownMenu] = useState<any>();

  const color = !isDarkMode ? config.darkGreen : config.mediumGreen;



  return (
    <View style={[styles.headerContainer, {borderBottomColor: color}]}>
      {!dropDownMenu &&
        <TouchableOpacity style={[styles.menuButton]} onPress={() => {
          setDropDownMenu(<DropDownMenu setModal={setDropDownMenu}/>);
        }}>
          <Icon
            name="menu"
            size={35}
            color={color}
          />
        </TouchableOpacity>
      }

      {dropDownMenu && dropDownMenu}

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