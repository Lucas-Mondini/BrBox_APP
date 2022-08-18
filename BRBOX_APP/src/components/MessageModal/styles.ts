import { StyleSheet } from "react-native";
import config from "../../../brbox.config.json";

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: "3%",
    height: "100%",
  },
  modal: {
    marginTop: "50%",
    paddingVertical: 20
  },
  titleView: {
    paddingHorizontal: "10%"
  },
  messageTitle: {
    fontFamily: config.fontFamilyBold,
    fontSize: 20,
    textAlign: "center",
    textDecorationLine: "underline"
  },
  message: {
    fontFamily: config.fontFamilyBold,
    fontSize: 17,
    marginHorizontal: "3%",
    marginVertical: 30,
    textAlign: "center"
  },
  buttonsView: {
    width: "100%",
    justifyContent: "center",
    bottom: "15px"
  },
});

export default styles;