import { StyleSheet } from "react-native";
import config from "../../../brbox.config.json";

const styles = StyleSheet.create({
  gameCard: {
    marginBottom: 15,
    padding: 5,
    width: "100%",
    borderRadius: 8,
    justifyContent: "center",
  },
  container: {
    flexDirection: "row"
  },
  img: {
    width: 80,
    height: 80,
    marginRight: 5,
    borderRadius: 5
  },
  info: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "60%"
  },
  title: {
    fontFamily: config.fontFamilyBold,
    fontSize: 20,
    marginLeft: 5,
    marginTop: 8,
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