import React from "react";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import IoniconsIcon from "react-native-vector-icons/Ionicons";
import FontistoIcon from "react-native-vector-icons/Fontisto";

import styles from "./styles";
import Loading from "../Loading";

interface CardsButtonProps extends TouchableOpacityProps {
  loading?: boolean;
  iconName: string;
  iconSize?: number;
  iconColor?: string;
  iconLibrary?: "MaterialIcons" | "FontAwesome" | "Fontisto" | "Ionicons";
  callback?: () => void;
}

export default function CardsButton({iconName, iconSize, iconColor, iconLibrary, style, callback, loading, ...props}: CardsButtonProps)
{
  iconLibrary = iconLibrary || "FontAwesome";

  function getIconComponent()
  {
    switch(iconLibrary) {
      case "FontAwesome":
        return <FontAwesomeIcon name={iconName} size={iconSize || 30} color={iconColor || "#fff"} />
      case "MaterialIcons":
        return <MaterialIcon name={iconName} size={iconSize || 30} color={iconColor || "#fff"} />
      case "Fontisto":
        return <FontistoIcon name={iconName} size={iconSize || 30} color={iconColor || "#fff"} />
      case "Ionicons":
        return <IoniconsIcon name={iconName} size={iconSize || 30} color={iconColor || "#fff"} />
    }
  }

  return (
    <TouchableOpacity
      style={[styles.button, style]}
      {...props}
    >
      {loading ? <Loading /> : getIconComponent()}
    </TouchableOpacity>
  );
}