import { StyleSheet } from "react-native";
import config from "../../../brbox.config.json"

const styles = StyleSheet.create({
  gameCard: {
    height: 95,
    borderBottomWidth: 2,
    borderBottomColor: config.yellow,
    marginBottom: 15,
    width: "100%",
  },
  container: {
    flexDirection: "row"
  },
  img: {
    width: 168,
    height: 88,
    marginRight: 5
  },
  info: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  title: {
    fontFamily: config.fontFamily,
    fontSize: 22
  },
  year: {
    fontFamily: config.fontFamily,
    fontStyle: 'italic',
  },
  tagsContainer: {
    flexDirection: "row",
    marginLeft: 5,
    position: "absolute",
    bottom: 5
  },
  tag: {
    backgroundColor: "blue",
    marginRight: 5,
    padding: 3,
    borderRadius: 8,
    fontSize: 10,
    color: "#fff"
  },
  moreTags: {
    marginRight: 5,
    padding: 3,
    fontSize: 10
  },
  barsContainer:{
    height: "100%",
    justifyContent: "center",
    width: 60
  },
  bar: {
    height: 5,
    width: "100%",
    marginBottom: 3,
    borderRadius: 3
  },
  evaluationsContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: 50,
  },
  evaluations: {
    fontSize: 28,
    fontStyle: "italic",
  },
});

export default styles;