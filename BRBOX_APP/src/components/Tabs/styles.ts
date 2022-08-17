import { StyleSheet } from "react-native";
import config from "../../../brbox.config.json";

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: "row",
    justifyContent: "center"
  },
  tabElement: {
    zIndex: 1000,
    paddingHorizontal: 5,
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8
  },
  title: {
    fontFamily: config.fontFamilyBold,
    fontSize: 22
  },
  tabText: {
    fontFamily: config.fontFamilyBold,
    color: "#686868",
    fontSize: 18
  }
});

export default styles;