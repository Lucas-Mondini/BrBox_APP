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
});

export default styles;