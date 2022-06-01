import { StyleSheet } from "react-native";

import config from "../../../brbox.config.json";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: "3%",
    paddingTop: "10%",
  },
  title: {
    fontSize: 20,
    fontFamily: config.fontFamilyBold,
    marginBottom:30,
    textAlign: "center"
  },
  changePassText: {
    fontSize: 15,
    fontFamily: config.fontFamilyBold,
    marginBottom:5,
    marginTop: 15,
    textAlign: "center"
  },
  exitButtonContainer: {
    alignItems: "center",
  },
  exitButton: {
    height: 35,
    marginTop: 15,
    width: 100,
    marginBottom: 15,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: config.placeholdersColor
  },
  exitButtonText: {
    fontSize: 20,
    lineHeight:28,
    marginLeft: 10,
    fontFamily: config.fontFamilyBold,
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