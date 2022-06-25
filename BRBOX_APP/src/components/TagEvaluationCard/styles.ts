import { StyleSheet } from "react-native";
import config from "../../../brbox.config.json"

const styles = StyleSheet.create({
  tagCard: {
    minHeight: 60,
    borderBottomWidth: 2,
    borderBottomColor: config.yellow,
    marginBottom: 10,
    width: "100%",
    flexDirection: "row"
  },
  title: {
    fontFamily: config.fontFamilyBold,
    fontSize: 22
  },
  description: {
    fontFamily: config.fontFamily,
    fontWeight: '700',
  },
  buttonView: {
    position: 'absolute',
    flexDirection: 'row',
    right: 5,
    top: 5,
  }
});

export default styles;