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
  input: {
    //width: "85%",
  },
  inputView: {
    width: "82%",
    justifyContent: "center",
    height: 60,
    marginLeft: "3%"
  },
  inputView2: {
    marginBottom: 15,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: config.mainIconColor
  }
});

export default styles;