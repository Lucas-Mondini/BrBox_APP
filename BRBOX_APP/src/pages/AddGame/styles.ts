import { StyleSheet } from "react-native";

import config from "../../../brbox.config.json";

const styles = StyleSheet.create({
  container: {
    height: "100%",
    paddingHorizontal: "3%",
    paddingTop: "10%",
    marginBottom: 60
  },
  title: {
    fontSize: 20,
    fontFamily: config.fontFamilyBold,
    marginBottom:30,
    textAlign: "center"
  }
});

export default styles