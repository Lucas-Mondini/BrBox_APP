import { StyleSheet } from "react-native";
import config from "../../../brbox.config.json"

const styles = StyleSheet.create({
  tagContainer: {
    minHeight: 75,
    marginBottom: 10,
    padding: 10,
    borderRadius: 10
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  img: {
    width: 25,
    height: 25,
    marginRight: 10,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  imgContainer: {
    flexDirection: "row",
  },
  tag: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    width: "70%",
    overflow:"hidden"
  },
  tagName: {
    fontFamily: config.fontFamilyBold,
    fontSize: 18,
    marginBottom: 10,
  },
  evaluations: {
    fontFamily: config.fontFamilyBold
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
  barContainer: {
    height: 20,
    width: "100%",
    flexDirection: "row"
  },
  bar: {
    height: 20,
    width: "100%",
    flexDirection: "row"
  }
});

export default styles;