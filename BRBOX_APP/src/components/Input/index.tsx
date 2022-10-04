import React from "react";
import { TextInput, TextInputProps, View } from "react-native";

import { useTerm } from "../../Contexts/TermProvider";
import styles from "./styles";
import config from "../../../brbox.config.json";
import { useTheme } from "../../Contexts/Theme";

interface InputProps extends TextInputProps {
  placeholderText?: number;
  extraStyles?: object;
  keyboardType?: any;
}

export default function Input(props: InputProps)
{
  const { darkMode } = useTheme();
  const {getTerm} = useTerm();

  const textColor = {color: darkMode ? "#fff" : config.dark}

  return (
    <View>
      <TextInput
        placeholder={getTerm(Number(props.placeholderText))}
        style={[textColor, styles.input, props.extraStyles]}
        placeholderTextColor={config.placeholdersColor}
        keyboardType={props.keyboardType}
        {...props}
      />
    </View>
  );
}