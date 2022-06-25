import { StyleSheet } from "react-native";
import config from "../../../brbox.config.json";

const styles = StyleSheet.create({
  titleView: {
    marginTop: "45%",
    paddingBottom: 30
  },
  container: {
    paddingHorizontal: "3%"
  },
  title: {
    fontFamily: config.fontFamilyBold,
    fontSize: 30,
    textAlign: "center",
    marginBottom: 15
  },
});

export default styles;