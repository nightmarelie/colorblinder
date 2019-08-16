import React, { Component } from 'react';
import { Text, View, StatusBar, TouchableOpacity, Image } from 'react-native';

import styles, { Colors } from './styles';

// components
import { Header } from '../../components';

export default class Home extends Component<{}, {isSoundOn: boolean}> {
  state = {
    isSoundOn: true
  };

  onPlayPress = () => {
    console.log('Handle on play press!');
  }

  onToggleSound = () => {
    this.setState(state => ({ isSoundOn: !state.isSoundOn }));
  }

  render () {
    const imageSource = this.state.isSoundOn 
      ? require("../../assets/icons/speaker-on.png")
      : require("../../assets/icons/speaker-off.png");

    return (
      <View style={styles.container}>
        <StatusBar backgroundColor={Colors.black} barStyle="light-content" />
        <Header />
        <Text style={styles.text}>ColorBlinder - Home screen</Text>
        <TouchableOpacity style={styles.row} onPress={this.onPlayPress}>
          <Image 
            source={require("../../assets/icons/play_arrow.png")}
            style={styles.playIcon}
          />
          <Text style={styles.playTxt}>play!</Text>
        </TouchableOpacity>
        <View style={styles.row}>
          <Image 
            source={require("../../assets/icons/trophy.png")}
            style={styles.trophyIcon}
          />
          <Text style={styles.hiscore}>Hi-score: 0</Text>
        </View>
        <View style={styles.row}>
          <Image 
            source={require("../../assets/icons/leaderboard.png")}
            style={styles.leaderboardIcon}
          />
          <Text style={styles.leaderboard}>Leaderbord</Text>
        </View>
        <View style={styles.bottomContainer}>
          <Text style={[styles.copyrightText, {color: '#e64c3c'}]}>
            Music: Komiku
          </Text>
          <Text style={[styles.copyrightText, {color: '#F1C431'}]}>
            SFX: SubspaceAudio
          </Text>
          <Text style={[styles.copyrightText, {color: '#3998DB'}]}>
            Development: RisingStack
          </Text>
        </View>
        <View style={{ flex: 1 }} />
        <TouchableOpacity onPress={this.onToggleSound}>
          <Image source={imageSource} style={styles.soundIcon} />
        </TouchableOpacity>
      </View>
    )
  }
}
