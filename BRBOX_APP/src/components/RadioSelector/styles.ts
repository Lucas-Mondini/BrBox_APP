import { StyleSheet } from "react-native";
import config from "../../../brbox.config.json"

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: "3%",
    height: "80%",
    justifyContent: "center"
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8
  },
  select: {
    width: 28,
    height: 28,
    borderRadius: 50,
    marginRight: 15
  },
  text: {
    fontFamily: config.fontFamilyBold,
    fontSize: 20
  },
});

export default styles;