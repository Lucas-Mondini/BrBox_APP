import { StyleSheet } from "react-native";
import config from "../../../brbox.config.json"

const styles = StyleSheet.create({
  tagCard: {
    height: 60,
    marginTop: 10,
    width: "100%",
    flexDirection: "row"
  },
  tagCardFull: {
    marginTop: 10,
    width: "100%",
  },
  title: {
    fontFamily: config.fontFamilyBold,
    fontSize: 22
  },
  titleInfo: {
    textAlign: "center",
    marginBottom: 15
  },
  description: {
    fontFamily: config.fontFamilyBold
  },
  descriptionInfo: {
    textAlign: "right"
  },
  buttonView: {
    height: 60,
    position: 'absolute',
    flexDirection: 'row',
    right: 5,
    top: 5,
    paddingLeft: 10,
  },
  button: {},
  descriptionsView: {
    width: "80%",
    paddingLeft: 10,
  },
  buttonViewFull: {
    paddingLeft: 10,
  },
  axesView: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    marginRight: 10
  },
  axesViewInfo: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    marginRight: 10,
    marginVertical: 15
  },
  infoButtonView: {
    flexDirection: "row",
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 5
  }
});

export default styles;