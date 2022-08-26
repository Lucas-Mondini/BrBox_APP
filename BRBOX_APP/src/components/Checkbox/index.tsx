import React from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import { Text, TouchableOpacity, View } from "react-native";

import { useTerm } from "../../Contexts/TermProvider";
import { useTheme } from "../../Contexts/Theme";

import styles from "./styles";
import config from "../../../brbox.config.json";

interface CheckboxProps {
  text: number;
  extraText?: string;
  handleCheckbox: () => void;
  checked?: boolean | null;
}

const Checkbox: React.FC<CheckboxProps> = ({text, extraText, checked, handleCheckbox}) => {
  const { getTerm } = useTerm();
  const { darkMode } = useTheme();

  const color = darkMode ? config.subTitleMainColor : config.dark;

  return (
    <TouchableOpacity
      style={styles.CheckboxView}
      onPress={handleCheckbox}
    >
      <View style={[
        styles.checkboxEl,
        checked ? {
        borderWidth: 1,
        borderColor: "#22AB5A",
        backgroundColor: "#01C650"
      }:{}]}>
        <Icon name="check" size={20} color={checked ? "#FFF" :"#686868"}/>
      </View>
      <Text style={[styles.CheckboxLabel, {color}]}>{getTerm(text)}{extraText || ""}</Text>
    </TouchableOpacity>
  );
}

export default Checkbox;