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
  buttonsView: {
    flexDirection: "row",
    height: 40,
    position: "absolute",
    right: 5,
    top: 5
  },
  button: {
    height: 40,
    width: 40,
    marginRight: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  deleteButton: {
    backgroundColor: config.red
  }
});

export default styles;