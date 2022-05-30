import React from "react";
import { TextInput, TextInputProps, useColorScheme, View } from "react-native";

import { useTerm } from "../../Contexts/TermProvider";
import styles from "./styles";
import config from "../../../brbox.config.json";

interface InputProps extends TextInputProps {
  placeholderText?: number;
  extraStyles?: object;
}

export default function Input(props: InputProps)
{
  const isDarkMode = useColorScheme() === 'dark';
  const {getTerm} = useTerm();

  const textColor = {color: isDarkMode ? "#fff" : config.dark}

  return (
    <View>
      <TextInput
        placeholder={getTerm(Number(props.placeholderText))}
        style={[textColor, styles.input, props.extraStyles]}
        placeholderTextColor={config.placeholdersColor}
        {...props}
      />
    </View>
  );
}