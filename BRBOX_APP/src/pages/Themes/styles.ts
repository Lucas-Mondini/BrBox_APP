import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  styleBox: {
    backgroundColor: 'red',
    width: '30%',
    height: 150,
    marginBottom:8,
    borderRadius: 4
  },
  styleBox1: {
    backgroundColor: 'white',
    width: '30%',
    height: 150,
    marginBottom:8,
    borderRadius: 4

  },
  list: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    // overflow: 'scroll',
    display: 'flex',
    justifyContent:"space-evenly"
  },
});

export default styles;
