import { StyleSheet } from "react-native";
import config from "../../../brbox.config.json"

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: config.mainIconColor,
    fontFamily: config.fontFamilyBold,
    marginBottom: 15,
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 5
  }
});

export default styles;