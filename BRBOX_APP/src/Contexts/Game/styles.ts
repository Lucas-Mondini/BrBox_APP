import { StyleSheet } from "react-native";

import config from "../../../brbox.config.json";

const styles = StyleSheet.create({
  link: {},
  platformsTitle: {
    fontSize: 15,
    fontFamily: config.fontFamilyBold,
    marginBottom: 20,
    color: config.subTitleMainColor
  },
  linkContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 35,
    marginBottom: 10
  },
  xButton: {
    position: "absolute",
    right: -15,
    top: -15
  },
  linkText: {
    fontSize: 15,
    fontFamily: config.fontFamilyBold,
  },

});

export default styles