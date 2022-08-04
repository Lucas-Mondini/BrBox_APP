import React from "react";
import { Text, View } from "react-native";
import styles from "./styles";

import config from "../../../brbox.config.json";
import Button from "../Button";
import { useTerm } from "../../Contexts/TermProvider";
import { useTheme } from "../../Contexts/Theme";

interface DarkZoneProps {
  title?: number;
  message: number;
  itemName: string;
  buttonText: number;
  callback: () => void;
}

export default function DarkZone({title, message, itemName, buttonText, callback}: DarkZoneProps)
{
  const {getTerm} = useTerm();

  const { darkMode } = useTheme();

  const textColorStyle = {
    color: darkMode ? "#fff" : config.dark,
  };

  return (
    <View
      style={[styles.darkZone]}
    >
      <Text
        style={[styles.text, textColorStyle]}
      >
        {getTerm(title || 100023)}
      </Text>
      <Text
        style={[styles.text, textColorStyle]}
      >
        {getTerm(message).replace("%2", itemName)}
      </Text>

      <Button
        text={buttonText}
        onPress={callback}
        extraStyle={{width: '70%', marginTop: 15}}
        extraTextStyle={{color: "#fff"}}
        buttonColor={config.red}
      />
    </View>
  );
}