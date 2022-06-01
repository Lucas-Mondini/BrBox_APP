import { StyleSheet } from "react-native";

import config from "../../../brbox.config.json";

const styles = StyleSheet.create({
  container: {
    paddingTop: 32,
    paddingLeft: "2%",
    paddingRight: "2%",
    height: "100%",
  },
  list: {
    paddingBottom: 100
  },
  title: {
    fontSize: 35,
    textAlign: "center",
    fontFamily: config.fontFamilyBold,
    paddingBottom: 20
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