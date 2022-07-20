import { StyleSheet } from "react-native";
import config from "../../../brbox.config.json"

const styles = StyleSheet.create({

  businessModelCardBottom: {
    borderBottomWidth: 2,
    borderBottomColor: config.yellow,
  },
  businessModelCard: {
    minHeight: 55,
    marginBottom: 10,
    paddingBottom: 5,
    width: "100%",
    flexDirection: "row"
  },
  title: {
    fontFamily: config.fontFamilyBold,
    fontSize: 22,
    paddingTop: 8
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