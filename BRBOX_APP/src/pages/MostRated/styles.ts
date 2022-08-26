import config from "../../../brbox.config.json";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    marginBottom: 60,
    paddingHorizontal: "3%",
  },
  filterContainer: {
    borderWidth: 1,
    marginBottom: 10,
    borderRadius: 8,
    paddingVertical: 5
  },
  filterTags: {
    width: "100%",
    textAlign: "center"
  },
  title: {
    fontFamily: config.fontFamilyBold,
    fontSize: 25,
    marginTop: 15
  },
  inputView2: {
    marginBottom: 15,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: config.mainIconColor
  }
});

export default styles;