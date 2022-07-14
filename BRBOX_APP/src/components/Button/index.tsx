import React from "react";
import { Text, TouchableOpacity, TouchableOpacityProps, View } from "react-native";

import { useTerm } from "../../Contexts/TermProvider";
import styles from "./styles";

import config from "../../../brbox.config.json"
import Loading from "../Loading";

interface ButtonProps extends TouchableOpacityProps {
  text: number;
  loading?: boolean;
  onPress: () => void;
  buttonColor?: string;
  extraStyle?: object;
  extraTextStyle?: object;
}

export default function Button({text, onPress, buttonColor, extraStyle, extraTextStyle, loading}: ButtonProps)
{
  const {getTerm} = useTerm();

  const buttonColorStyle = {backgroundColor: buttonColor || config.mediumGreen}

  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity
        onPress={onPress}
        style={[styles.button, buttonColorStyle, extraStyle]}
        disabled={loading}
      >
        {loading
          ? <Loading activeColor={"#000"} styles={{backgroundColor: "transparent"}}/>
          : <Text
              style={[styles.buttonText, extraTextStyle]}
            >
              {getTerm(text)}
            </Text>
        }
      </TouchableOpacity>
    </View>
  );
}