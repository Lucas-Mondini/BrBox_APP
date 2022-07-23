import { Dimensions, StyleSheet } from "react-native";

const {width} = Dimensions.get('window');

const SPACING = 5;
const ITEM_LENGTH = width * 0.8;
const BORDER_RADIUS = 10;

const styles = StyleSheet.create({
  container: {
    marginBottom: 20
  },
  carousel: {
    width: ITEM_LENGTH,
    paddingBottom: 15
  },
  itemContent: {
    marginHorizontal: SPACING * 3,
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: BORDER_RADIUS + SPACING * 2,
  },
  itemText: {
    fontSize: 24,
    position: 'absolute',
    bottom: SPACING * 2,
    right: SPACING * 2,
    color: 'white',
    fontWeight: '600',
  },
  itemImage: {
    width: '100%',
    height: ITEM_LENGTH,
    borderRadius: BORDER_RADIUS,
    resizeMode: 'cover',
  },
  buttonContainer: {
    alignItems: 'center',
    width: ITEM_LENGTH,
    paddingTop: 15
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