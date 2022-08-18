import { StyleSheet } from "react-native";
import config from "../../../brbox.config.json";

const styles = StyleSheet.create({
  modal: {
    marginTop: "30%",
    paddingBottom: 25,
    justifyContent: "space-between"
  },
  title: {
    textAlign: "center",
    marginTop: 25,
    marginBottom: 25,
    fontSize: 23,
    fontFamily: config.fontFamilyBold,
  }
});

export default styles;