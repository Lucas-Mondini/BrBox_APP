import { StyleSheet } from "react-native";

import config from "../../../brbox.config.json";

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%'
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: 'center',
    marginTop: "20%"
  },
  title: {
    fontSize: 25,
    fontFamily: config.fontFamilyBold,
  },
  last: {
    backgroundColor: config.mediumGreen,
    paddingHorizontal: 5,
    borderRadius: 5,
    marginLeft: 3,
  },
  gameImg: {
    width: 335,
    height: 250,
    marginBottom:30
  },
  registerButton: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
    width: "100%",
  },
  buttonText: {
    fontFamily: config.fontFamilyBold,
    fontSize: 18,
    color: config.mediumGreen
  }
});

export default styles