import { StyleSheet } from "react-native";
import config from "../../../brbox.config.json";

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: "3%",
    height: "100%",
    borderRadius: 8
  },
  evaluationContainer: {
    flexDirection: "row",
    paddingHorizontal: "15%",
    justifyContent: "space-evenly",
  },
  descriptionContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    marginBottom: 15
  },
  titleContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15
  },
  descriptionText: {
    fontFamily: config.fontFamilyBold,
    width: "80%",
    marginRight: 15,
    textAlign: "center"
  },
  evaluations: {
    marginTop: 15
  },
  evaluationsText: {
    fontFamily: config.fontFamilyBold,
    marginRight: 15,
    textAlign: "center"
  },
  title: {
    fontFamily: config.fontFamilyBold,
    marginRight: 15,
    textAlign: "center",
    fontSize: 18,
    marginVertical: 35,
  },
  evaluationTitles: {
    textAlign: "left",
    paddingLeft: 15
  },
  subTitle: {
    fontFamily: config.fontFamilyBold,
    marginRight: 15,
    fontSize: 15,
    marginTop: 15,
    marginBottom: 15,
  },
  leaveButtonView: {
    marginTop: 15,
    marginBottom: 50,
  },
  icon: {
    position: "absolute",
    left: 0,
    width: 55,
    height: 55,
    borderRadius: 55,
    justifyContent: "center",
    alignItems: "center",
  }
});

export default styles;