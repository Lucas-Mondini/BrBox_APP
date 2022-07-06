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
  selectedTagsContainer: {
    minHeight: 70
  },
  tagsContainer: {
    flexDirection: "row",
    marginLeft: 2,
    marginRight: 2,
    padding: 5
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