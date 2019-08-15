import { StyleSheet } from 'react-native';

export const Colors = {
  black: '#000',
  white: '#fff',
}

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.black,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: Colors.white
  }
});
