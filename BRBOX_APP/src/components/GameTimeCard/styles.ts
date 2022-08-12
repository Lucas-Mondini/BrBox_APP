import { StyleSheet } from "react-native";
import config from "../../../brbox.config.json";

const styles = StyleSheet.create({
  card: {
    paddingHorizontal: "3%",
    justifyContent: "center"
  },
  gameTimeContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center"
  },
  gameTimeInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  text: {
    fontFamily: config.fontFamilyBold,
    fontSize: 18,
    textAlign: "center",
    marginRight: 5,
    marginVertical: 30
  },
  input: {
    marginTop: 15
  },
  rate: {
    fontFamily: config.fontFamilyBold,
    color: config.greenBar
  },
  rateBig: {
    fontSize: 20,
  }
});

export default styles;