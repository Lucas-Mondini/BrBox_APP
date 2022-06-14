import { StyleSheet } from "react-native";

import config from "../../../brbox.config.json";

const styles = StyleSheet.create({
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