import { StyleSheet } from "react-native";
import config from "../../../brbox.config.json"

const styles = StyleSheet.create({
  platformCard: {
    minHeight: 55,
    borderBottomWidth: 2,
    borderBottomColor: config.yellow,
    marginBottom: 10,
    width: "100%",
    flexDirection: "row"
  },
  title: {
    fontFamily: config.fontFamilyBold,
    fontSize: 22,
    paddingTop: 8
  },
  buttonView: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 5,
    top: 5,
  },
  deleteButton: {
    backgroundColor: config.red
  }
});

export default styles;