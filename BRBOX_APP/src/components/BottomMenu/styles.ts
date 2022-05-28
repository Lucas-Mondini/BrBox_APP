import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  bottomMenuContainer: {
    position: "absolute",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    bottom: 0,
    left: 0,
    width: "100%",
    height: 55,
    paddingHorizontal: "15%",
    borderTopWidth: 1,
    borderTopColor: "#e5e5e5"
  },
  button: {
    height: 40,
    width: 40,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default styles;