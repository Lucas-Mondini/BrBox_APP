import React from "react";
import { TouchableOpacity } from "react-native";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";

import styles from "./styles";

interface CardsButtonProps {
  iconName: string;
  iconSize?: number;
  iconColor?: string;
  iconLibrary?: "MaterialIcons" | "FontAwesome";
  extraButtonStyle?: object;
  callback: () => void;
}

export default function CardsButton({iconName, iconSize, iconColor,iconLibrary, extraButtonStyle, callback}: CardsButtonProps)
{
  iconLibrary = iconLibrary || "FontAwesome";

  function getIconComponent()
  {
    switch(iconLibrary) {
      case "FontAwesome":
        return <FontAwesomeIcon name={iconName} size={iconSize || 30} color={iconColor || "#fff"} />
      case "MaterialIcons":
        return <MaterialIcon name={iconName} size={iconSize || 30} color="#fff" />
    }
  }

  return (
    <TouchableOpacity style={[styles.button, extraButtonStyle]} onPress={callback}>
      {getIconComponent()}
    </TouchableOpacity>
  );
}