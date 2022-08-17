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
    paddingHorizontal: "3%",
    paddingVertical: 5
  },
  filterTags: {
    width: "100%",
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
    marginHorizontal: "3%",
    marginBottom: 15,
  }
});

export default styles;