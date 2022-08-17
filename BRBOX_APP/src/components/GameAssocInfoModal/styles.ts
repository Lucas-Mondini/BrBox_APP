import { StyleSheet } from "react-native";
import config from "../../../brbox.config.json";

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: "3%",
    height: "100%"
  },
  evaluations: {
    marginTop: 15,
    paddingBottom: 80,
  },
  leaveButtonView: {
    position: "absolute",
    width: "100%",
    bottom: 0,
    paddingBottom: 15
  },
  noContentText: {
    fontSize: 15,
    fontFamily: config.fontFamilyBold,
    marginBottom: 30,
    color: config.subTitleMainColor
  }
});

export default styles;