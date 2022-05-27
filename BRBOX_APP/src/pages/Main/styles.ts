import { StyleSheet } from "react-native";

import config from "../../../brbox.config.json";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  gameImg: {
    width: 335,
    height: 250,
    marginBottom:30
  },
  loginButton: {
    height: 40,
    width: "60%",
    backgroundColor: config.mediumGreen,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 40
  },
  loginButtonText: {
    fontSize: 25,
    color: "#fff",
    fontFamily: config.fontFamily,
  },
  registerButton: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
    width: "100%",
  },
  registerButtonText: {
    fontFamily: config.fontFamily,
    fontSize: 20,
    textDecorationLine: 'underline'
  }
});

export default styles