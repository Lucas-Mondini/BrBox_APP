import { StyleSheet } from "react-native";
import config from "../../../brbox.config.json";

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: "3%",
    height: "75%",
    justifyContent: "space-between",
  },
  modal: {
    //justifyContent: "space-between",
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