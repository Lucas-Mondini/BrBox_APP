import { StyleSheet } from "react-native";

import config from "../../../brbox.config.json";

const styles = StyleSheet.create({
  menuContainer: {
    position: "absolute",
    top: 15,
    left: 10,
    minWidth: "30%",
  },
  menuOptionsContainer: {
    backgroundColor: "#E6D5FF",
    borderRadius: 8,
  },
  menuButton: {
    zIndex: 9999,
    paddingHorizontal: 5
  },
  menuButtonText: {
    fontFamily: config.fontFamilyBold,
    color: "#000",
    fontSize: 20,
    paddingVertical: 5,
    zIndex: 9999
  },
});

export default styles;