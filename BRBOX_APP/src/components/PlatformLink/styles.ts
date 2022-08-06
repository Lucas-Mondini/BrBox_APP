import { StyleSheet } from "react-native";

import config from "../../../brbox.config.json";

const styles = StyleSheet.create({
  link: {},
  xButton: {
    position: "absolute",
    right: -15,
    top: -15
  },
  linkContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 10
  },
  platformsTitle: {
    fontSize: 15,
    fontFamily: config.fontFamilyBold,
    marginBottom: 20,
    color: config.subTitleMainColor
  },
});

export default styles