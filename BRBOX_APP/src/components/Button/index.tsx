import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

import { useTerm } from "../../Contexts/TermProvider";
import styles from "./styles";

import config from "../../../brbox.config.json"

interface ButtonProps {
  text: number;
  onPress: () => void;
  buttonColor?: string;
  extraStyle?: object;
}

export default function Button({text, onPress, buttonColor, extraStyle}: ButtonProps)
{
  const {getTerm} = useTerm();

  const buttonColorStyle = {backgroundColor: buttonColor || config.mediumGreen, ...extraStyle}

  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity
        onPress={onPress}
        style={[styles.button, buttonColorStyle]}
      >
        <Text
          style={styles.buttonText}
        >
          {getTerm(text)}
        </Text>
      </TouchableOpacity>
    </View>
  );
}