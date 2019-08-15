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
  },
  playBtn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  playTxt: {
    fontSize: 45,
    fontFamily: 'dogbyte',
    color: '#ecf0f1',
    marginTop: 5,
    textTransform: 'uppercase',
  },
  playIcon: {
    height: 60,
    width: 60,
    marginRight: 15,
  }
});
