import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

import { useTerm } from "../../Contexts/TermProvider";
import styles from "./styles";
import config from "../../../brbox.config.json";
import Icon from "react-native-vector-icons/Feather";
import DropDownMenu from "../DropDownMenu";
import { useTheme } from "../../Contexts/Theme";

interface HeaderProps {
  title: number | string;
  buttonIcon?: string;
  customHeader?: React.ReactElement | React.ReactElement[];
  hideMenuButton?: boolean;
  addAction?: () => void;
}

export default function Header({title, buttonIcon, customHeader, hideMenuButton, addAction}: HeaderProps)
{
  const { getTerm } = useTerm();
  const { darkMode } = useTheme();

  const [ dropDownMenu, setDropDownMenu ] = useState<any>();

  const color = !darkMode ? config.darkGreen : config.mediumGreen;

  return (
    <View style={[styles.headerContainer, {borderBottomColor: color}]}>
      {(!dropDownMenu && !hideMenuButton) &&
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
            color={color}
          />
        </TouchableOpacity>
      }
    </View>
  );
}