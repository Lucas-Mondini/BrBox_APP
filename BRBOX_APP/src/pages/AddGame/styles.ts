import { StyleSheet } from "react-native";

import config from "../../../brbox.config.json";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: "3%",
    paddingTop: "10%"
  },
  title: {
    fontSize: 20,
    fontFamily: config.fontFamilyBold,
    marginBottom:30,
    textAlign: "center"
  },
  linkContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10
  },
  xButton: {
    position: "absolute",
    right: 0
  },
  linkText: {
    fontSize: 15,
    fontFamily: config.fontFamilyBold,
  },

});

export default styles