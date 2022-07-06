import { StyleSheet } from "react-native";
import config from "../../../brbox.config.json"

const styles = StyleSheet.create({
  tagCard: {
    height: 60,
    marginTop: 10,
    width: "100%",
    flexDirection: "row"
  },
  title: {
    fontFamily: config.fontFamilyBold,
    fontSize: 22
  },
  description: {
    fontFamily: config.fontFamilyBold
  },
  buttonView: {
    position: 'absolute',
    flexDirection: 'row',
    right: 5,
    top: 5,
    paddingLeft: 10,
  },
  axesView: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    marginRight: 10
  }
});

export default styles;