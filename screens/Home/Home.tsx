import React, { Component } from 'react';
import { Text, View, StatusBar, TouchableOpacity, Image } from 'react-native';

import styles, { Colors } from './styles';

// components
import { Header } from '../../components';

export default class Home extends Component {
  onPlayPress = () => {
    console.log('Handle on play press!');
  }

  render () {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor={Colors.black} barStyle="light-content" />
        <Header />
        <Text style={styles.text}>ColorBlinder - Home screen</Text>
        <TouchableOpacity style={styles.playBtn} onPress={this.onPlayPress}>
          <Image 
            source={require("../../assets/icons/play_arrow.png")}
            style={styles.playIcon}
          />
          <Text style={styles.playTxt}>play!</Text>
        </TouchableOpacity>
        <View style={styles.hiscoreWrap}>
          <Image 
            source={require("../../assets/icons/trophy.png")}
            style={styles.trophyIcon}
          />
          <Text style={styles.hiscore}>Hi-score: 0</Text>
        </View>
      </View>
    )
  }
}
