import { StyleSheet } from "react-native";

import config from "../../../brbox.config.json";

const styles = StyleSheet.create({
  tagsListView: {
    borderWidth: 1,
    borderRadius: 8,
    minHeight: 70
  },
  tagsListTitles: {
    fontFamily: config.fontFamilyBold,
    fontSize: 15,
    marginVertical: 15
  },
  noContent: {
    fontFamily: config.fontFamilyBold,
  },
  selectedTagsContainer: {
    minHeight: 70,
    marginTop: 30
  },
  tagsContainer: {
    flexDirection: "row",
    marginLeft: 2,
    marginRight: 2,
    padding: 5
  },
  toggle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  tag: {
    backgroundColor: "blue",
    marginRight: 5,
    marginTop: 5,
    padding: 3,
    minWidth: 80,
    borderRadius: 8,
    fontSize: 13,
    textAlign: "center",
    color: "#fff",
    fontFamily: config.fontFamilyBold
  },
});

export default styles