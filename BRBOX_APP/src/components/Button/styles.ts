import { StyleSheet } from "react-native";
import config from "../../../brbox.config.json";

const styles = StyleSheet.create({
  buttonContainer: {
    alignItems: "center",
    width: "100%",
  },
  button: {
    height: 40,
    width: "70%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 40
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    lineHeight: 20,
    fontWeight: '400',
    fontFamily: config.fontFamily,
  },
});

export default styles;