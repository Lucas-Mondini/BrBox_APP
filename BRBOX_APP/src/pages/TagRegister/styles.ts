import { StyleSheet } from "react-native";

import config from "../../../brbox.config.json";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: "3%",
  },
  title: {
    fontSize: 20,
    fontFamily: config.fontFamily,
    marginBottom:30,
    textAlign: "center",
    paddingTop: "10%"
  },
  description: {
    textAlignVertical: "top"
  },
  buttonView: {
    marginTop: 25,
    paddingBottom: 25
  }
});

export default styles