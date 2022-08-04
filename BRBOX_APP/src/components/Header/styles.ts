import { StyleSheet } from "react-native";

import config from "../../../brbox.config.json";

const styles = StyleSheet.create({
  title: {
    height: 70,
    paddingTop: 8,
    width: "70%",
    textAlign: "center",
    fontFamily: config.fontFamilyBold,
    paddingBottom: 5
  },
  headerTextView: {
    height: "100%",
    alignItems: "center",
    justifyContent: "center"
  },
  headerContainer: {
    height: 70,
    borderBottomWidth: 2,
    marginBottom: 10,
    paddingVertical: 10
  },
  menuButton: {
    position: "absolute",
    top: 15,
    left: 10,
    zIndex: 999
  },
  addButton: {
    position: "absolute",
    top: 15,
    right: 10,
    zIndex: 999
  }
});

export default styles;