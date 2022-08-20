import { StyleSheet } from "react-native";

import config from "../../../brbox.config.json";

const styles = StyleSheet.create({
  menuCloseButton: {
    position: "absolute",
    top: 15,
    left: 10,
    minWidth: "30%",
  },
  menuContainer: {
    position: "absolute",
    top: 71,
    bottom: 56,
    left: 0
  },
  menuOptionsContainer: {
    paddingHorizontal: 10,
    paddingTop: 10
  },
  menuButton: {
    zIndex: 9999,
    padding: 5,
    borderRadius: 5,
    marginVertical: 5,
  },
  menuButtonText: {
    fontFamily: config.fontFamilyBold,
    fontSize: 18,
    paddingVertical: 5,
    zIndex: 9999
  },
  closeModal: {
    position: "absolute",
    right: 0,
    height: "100%",
    minWidth: "40%"
  },
});

export default styles;