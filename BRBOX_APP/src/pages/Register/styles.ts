import { StyleSheet } from "react-native";
import config from "../../../brbox.config.json";

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: "3%",
    paddingTop: "55%",
    height: "100%",
  },
  title: {
    fontFamily: config.fontFamily,
    fontSize: 30,
    textAlign: "center",
    marginBottom: 15
  },
});

export default styles;