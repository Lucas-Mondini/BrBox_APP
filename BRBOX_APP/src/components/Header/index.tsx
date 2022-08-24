import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

import { useTerm } from "../../Contexts/TermProvider";
import styles from "./styles";
import config from "../../../brbox.config.json";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import DropDownMenu from "../DropDownMenu";
import { useTheme } from "../../Contexts/Theme";

interface HeaderProps {
  title: number | string;
  buttonIcon?: string;
  customHeader?: React.ReactElement | React.ReactElement[];
  hideMenuButton?: boolean;
  menuButtonColor?: string;
  addAction?: () => void;
}

export default function Header({title, buttonIcon, customHeader, hideMenuButton, menuButtonColor, addAction}: HeaderProps)
{
  const { getTerm } = useTerm();
  const { darkMode } = useTheme();

  const [ dropDownMenu, setDropDownMenu ] = useState(false);
  const [ hideMenu, setHideMenu ] = useState(false);

  const color = !darkMode ? config.darkGreen : config.mediumGreen;

  return (
    <View style={[styles.headerContainer, {borderBottomColor: color}]}>
      {(!dropDownMenu && !hideMenuButton) &&
        <TouchableOpacity style={[styles.menuButton]} onPress={() => {
          setDropDownMenu(true);
        }}>
          <Icon
            name="menu"
            size={35}
            color={color}
          />
        </TouchableOpacity>
      }

      <DropDownMenu
        visible={dropDownMenu && !hideMenu}
        setModal={setDropDownMenu}
        setHideMenu={setHideMenu}
      />

      {customHeader ||
        <View style={styles.headerTextView}>
          <Text style={[styles.title, {color, fontSize: typeof title === "string" ? 20 : 35}]}>{typeof title === "string" ? title : getTerm(title)}</Text>
        </View>
      }

      {addAction &&
        <TouchableOpacity style={[styles.addButton]} onPress={addAction}>
          <Icon
            name={buttonIcon || "plus"}
            size={35}
            color={menuButtonColor || color}
          />
        </TouchableOpacity>
      }
    </View>
  );
}