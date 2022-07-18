import { StyleSheet } from "react-native";
import config from "../../../brbox.config.json";

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: "3%",
    height: "100%",
  },
  descriptionContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    marginBottom: 15
  },
  descriptionText: {
    fontFamily: config.fontFamilyBold,
    width: "80%",
    marginRight: 15,
    textAlign: "center"
  },
  evaluations: {
    marginTop: 15
  },
  evaluationsText: {
    fontFamily: config.fontFamilyBold,
    marginRight: 15,
    textAlign: "center"
  },
  title: {
    fontFamily: config.fontFamilyBold,
    marginRight: 15,
    textAlign: "center",
    fontSize: 18,
    marginVertical: 35,
  },
  subTitle: {
    fontFamily: config.fontFamilyBold,
    marginRight: 15,
    fontSize: 15,
    marginTop: 35,
    marginBottom: 15,
  },
});

export default styles;