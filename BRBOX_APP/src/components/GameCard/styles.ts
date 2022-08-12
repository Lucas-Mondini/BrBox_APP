import { StyleSheet } from "react-native";
import config from "../../../brbox.config.json";

const styles = StyleSheet.create({
  gameCard: {
    height: 95,
    marginBottom: 15,
    padding: 5,
    width: "100%",
    borderRadius: 8,
    justifyContent: "center"
  },
  container: {
    flexDirection: "row"
  },
  img: {
    width: 80,
    height: 80,
    marginRight: 5,
    borderRadius: 5
  },
  info: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  title: {
    fontFamily: config.fontFamilyBold,
    fontSize: 20,
    marginLeft: 5,
    marginTop: 8,
  },
  tagsContainer: {
    flexDirection: "row",
    marginLeft: 15,
    position: "absolute",
    bottom: 5,
  },
  tag: {
    marginRight: 5,
    padding: 3,
    borderRadius: 8,
    fontSize: 13,
    fontFamily: config.fontFamilyBold,
    color: "#000"
  },
  rate: {
    position: "absolute",
    bottom: 5,
    right: 5,
    fontFamily: config.fontFamilyBold,
    color: config.greenBar
  },
  rateBig: {
    fontSize: 20,
  }
});

export default styles;