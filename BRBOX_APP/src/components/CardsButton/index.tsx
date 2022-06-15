import React from "react";
import { TouchableOpacity } from "react-native";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import IoniconsIcon from "react-native-vector-icons/Ionicons";
import FontistoIcon from "react-native-vector-icons/Fontisto";

import styles from "./styles";

interface CardsButtonProps {
  iconName: string;
  iconSize?: number;
  iconColor?: string;
  iconLibrary?: "MaterialIcons" | "FontAwesome" | "Fontisto" | "Ionicons";
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
      case "Fontisto":
        return <FontistoIcon name={iconName} size={iconSize || 30} color="#fff" />
      case "Ionicons":
        return <IoniconsIcon name={iconName} size={iconSize || 30} color="#fff" />
    }
  }

  return (
    <TouchableOpacity style={[styles.button, extraButtonStyle]} onPress={callback}>
      {getIconComponent()}
    </TouchableOpacity>
  );
}