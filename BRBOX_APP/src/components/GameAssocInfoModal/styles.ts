import { StyleSheet } from "react-native";
import config from "../../../brbox.config.json";

const styles = StyleSheet.create({
  container: {
  },
  evaluations: {
    paddingHorizontal: "3%",
    marginTop: 15,
    paddingBottom: 80,
  },
  leaveButtonView: {
    borderRadius: 8,
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