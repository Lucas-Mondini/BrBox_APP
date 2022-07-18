import { StyleSheet } from "react-native";
import config from "../../../brbox.config.json"

const styles = StyleSheet.create({
  businessModelCard: {
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
  descriptionContainer: {
    width: "95%",
  },
  description: {
    fontFamily: config.fontFamilyBold,
    fontSize: 15,
    paddingTop: 3
  },
  buttonView: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 5,
    top: 5,
  },
  deleteButton: {
    backgroundColor: config.redBar
  }
});

export default styles;