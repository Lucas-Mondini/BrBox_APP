import { StyleSheet } from "react-native";
import config from "../../../brbox.config.json";

const styles = StyleSheet.create({
  buttonContainer: {
    alignItems: "center",
    width: "100%",
  },
  button: {
    height: 40,
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5
  },
  buttonText: {
    color: "#000",
    fontSize: 18,
    lineHeight: 20,
    fontFamily: config.fontFamilyBold,
  },
});

export default styles;