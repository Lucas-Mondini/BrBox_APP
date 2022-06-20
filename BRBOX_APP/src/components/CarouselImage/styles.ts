import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  carousel: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  image: {
    width:320, height: 180,
    marginBottom: 5
  },
  buttonContainer: {
    alignItems: 'center',
    width: 300,
  },
  button: {
    borderWidth: 2,
    padding: 5,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default styles;