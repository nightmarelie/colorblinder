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
  row: {
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
  },
  hiscore: {
    fontSize: 28.5,
    fontFamily: 'dogbyte',
    color: '#ecf0f1',
    marginTop: 5,
  },
  trophyIcon: {
    height: 45,
    width: 45,
    marginRight: 12.5,
  },
  leaderboardIcon: {
    height: 45,
    width: 45,
    marginRight: 12.5,
  },
  leaderboard: {
    fontSize: 38,
    fontFamily: 'dogbyte',
    color: '#ecf0f1',
    marginTop: 5,
  },
  bottomContainer: {
    position: 'absolute',
    left: 15,
    right: 15,
    bottom: 12.5,
  },
  copyrightText: {
    fontSize: 16,
    fontFamily: 'dogbyte',
    marginBottom: 2.5,
  },
  soundIcon: {
    height: 45,
    width: 45,
    marginRight: 12.5,
  },
});
