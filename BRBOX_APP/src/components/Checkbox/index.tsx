import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useTerm } from "../../Contexts/TermProvider";
import styles from "./styles";

interface CheckboxProps {
  text: number;
  extraText?: string;
  handleCheckbox: () => void;
  checked?: boolean | null;
}

const Checkbox: React.FC<CheckboxProps> = ({text, extraText, checked, handleCheckbox}) => {
  const { getTerm } = useTerm();

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
      <Text style={styles.CheckboxLabel}>{getTerm(text)}{extraText || ""}</Text>
    </TouchableOpacity>
  );
}

export default Checkbox;