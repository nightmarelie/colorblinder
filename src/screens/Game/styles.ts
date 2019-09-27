import { StyleSheet, Dimensions } from 'react-native';
import { scale } from '../../utilities'

const length = +Dimensions.get('window').height / 2.5;

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0a0a0a",
    justifyContent: 'center',
    alignItems: 'center',
  },
  tiles: {
    width: length,
    height: length,
    flexDirection: 'row',
  },
  tilesSection: {
    justifyContent: 'center',
    flex: 3,
  },
  column: {
    flex: 1,
    flexDirection: 'column',
  },
  headerWrapper: {
    flex: 1,
    justifyContent: 'center',
  },
  part: {
    flex: 1,
  },
  pausedContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  pausedText: {
    fontFamily: 'dogbyte',
    textAlign: 'center',
    color: '#eee',
    marginTop: 20,
    fontSize: scale(60),
  },
  pausedIcon: {
    width: scale(80),
    height: scale(80)
  },
  
  exitIcon: {
    marginTop: 20,
    width: scale(90),
    height: scale(45),
  },
});
