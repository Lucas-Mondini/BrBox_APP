import { StyleSheet } from "react-native";
import config from "../../../brbox.config.json"

const styles = StyleSheet.create({
  card: {
    minHeight: 55,
    marginBottom: 10,
    paddingBottom: 5,
    width: "100%",
    flexDirection: "row"
  },
  cardBottom: {
    borderBottomWidth: 2,
    borderBottomColor: config.yellow
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