import { StyleSheet } from "react-native";

import config from "../../../brbox.config.json";

const styles = StyleSheet.create({
  text: {
    fontSize: 15,
    fontFamily: config.fontFamilyBold,
    marginBottom:5,
    marginTop: 15,
    textAlign: "center"
  },
  darkZone: {
    marginTop: 15,
    borderWidth: 1,
    borderColor: "#FF3636",
    backgroundColor: "#FF363655",
    borderRadius: 8,
    alignItems: "center",
    padding: 15,
    marginBottom: "30%",
  },
  darkZoneTitle: {
    fontSize: 15,
    fontFamily: config.fontFamilyBold,
    marginBottom:5,
    marginTop: 15,
    textAlign: "center"
  },
  darkZoneText: {
    fontSize: 15,
    fontFamily: config.fontFamilyBold,
    marginBottom:5,
    marginTop: 15,
    textAlign: "center"
  },
});

export default styles