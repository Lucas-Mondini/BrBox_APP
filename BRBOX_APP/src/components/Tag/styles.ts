import { StyleSheet } from "react-native";
import config from "../../../brbox.config.json"

const styles = StyleSheet.create({
  imgSmall: {
    marginRight: 10
  },
  imgLarge: {
    marginRight: 15
  },
  tagsContainerSmall: {
    flexDirection: "row",
    marginLeft: 60,
    position: "absolute",
    bottom: 5,
  },
  tagsContainerLarge: {
    flexDirection: "row",
  },
  tag: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    paddingHorizontal: 5
  },
  tagSmall: {
    marginRight: 5,
    padding: 5,
    width: "33%"
  },
  tagLarge: {
    marginHorizontal: 10,
    padding: 5,
    width: "28%"
  },
  tagText: {
    alignItems: "center",
    fontFamily: config.fontFamilyBold,
    color: "#000"
  },
  tagTextSmall: {
    fontSize: 13,
  },
  tagTextLarge: {
    fontSize: 18
  },
});

export default styles;