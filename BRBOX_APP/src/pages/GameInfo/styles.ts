import { StyleSheet } from "react-native";

import config from "../../../brbox.config.json";

const styles = StyleSheet.create({
  container: {
    height: "100%",
    paddingHorizontal: "3%",
    paddingTop: "10%"
  },
  title: {
    fontSize: 20,
    fontFamily: config.fontFamilyBold,
    textAlign: "center"
  },
  tagsListView: {
    borderWidth: 1,
    borderRadius: 8,
    minHeight: 70
  },
  tagsListTitles: {
    fontFamily: config.fontFamilyBold,
    fontSize: 20
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