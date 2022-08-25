import { StyleSheet } from "react-native";
import config from "../../../brbox.config.json"

const styles = StyleSheet.create({
  CheckboxView: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 25
  },
  CheckboxLabel: {
    fontSize: 20,
    marginLeft: 10,
    lineHeight: 30,
    fontFamily: config.fontFamilyBold
  },
  checkboxEl: {
    width: 25,
    height: 25,
    borderWidth: 1,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center"
  }
});

export default styles;