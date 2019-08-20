import React, { Component } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Audio } from 'expo-av';

import { retrieveData } from '../../utilities';
import { Header } from "../../components";
import styles from "./styles";

export default class Home extends Component<{ navigation: any }, {}> {
  state = {
    isSoundOn: true,
    bestPoints: 0,
  };

  private backgroundMusic;
  private buttonFX;

  async componentWillMount() {
    this.backgroundMusic = new Audio.Sound();
    this.buttonFX = new Audio.Sound();
    try {
      await this.backgroundMusic.loadAsync(require("../../../assets/music/Komiku_Mushrooms.mp3"));
      await this.buttonFX.loadAsync(require("../../../assets/sfx/button.wav"));
      await this.backgroundMusic.setIsLoopingAsync(true);
      await this.backgroundMusic.playAsync();
      retrieveData('highScore').then(val => this.setState({ bestPoints: +val || 0 }));
      // Your sound is playing!
    } catch (error) {
      // An error occurred!
    }
  }

  onPlayPress = () => {
    this.buttonFX.replayAsync();
    this.backgroundMusic.stopAsync();
    this.props.navigation.navigate('Game');
  };

  onLeaderboardPress = () => {
    console.log("onLeaderboardPress event handler");
  };

  onToggleSound = () => {
    const { isSoundOn } = this.state;
    if (isSoundOn) {
      this.backgroundMusic.stopAsync();
    } else {
      this.backgroundMusic.replayAsync();
    }

    this.setState({ isSoundOn: !isSoundOn });
  };

  render() {
    const { bestPoints, isSoundOn } = this.state;
    const imageSource = isSoundOn
      ? require("../../../assets/icons/speaker-on.png")
      : require("../../../assets/icons/speaker-off.png");

    return (
      <View style={styles.container}>
        <Header />
        <TouchableOpacity
          onPress={this.onPlayPress}
          style={{ flexDirection: "row", alignItems: "center", marginTop: 80 }}
        >
          <Image
            source={require("../../../assets/icons/play_arrow.png")}
            style={styles.playIcon}
          />
          <Text style={styles.play}>PLAY!</Text>
        </TouchableOpacity>
        <View style={{ flexDirection: "row", alignItems: "center", marginTop: 20 }}>
          <Image
            source={require("../../../assets/icons/trophy.png")}
            style={styles.trophyIcon}
          />
          <Text style={styles.hiscore}>Hi-score: {bestPoints}</Text>
        </View>
        <TouchableOpacity
          onPress={this.onLeaderboardPress}
          style={{ flexDirection: "row", alignItems: "center", marginTop: 80 }}
        >
          <Image
            source={require("../../../assets/icons/leaderboard.png")}
            style={styles.leaderboardIcon}
          />
          <Text style={styles.leaderboard}>Leaderboard</Text>
        </TouchableOpacity>
        <View style={styles.bottomContainer}>
          <View>
            <Text style={[styles.copyrightText, { color: "#E64C3C" }]}>
              Music: Komiku
            </Text>
            <Text style={[styles.copyrightText, { color: "#F1C431" }]}>
              SFX: SubspaceAudio
            </Text>
            <Text style={[styles.copyrightText, { color: "#3998DB" }]}>
              Development: RisingStack
            </Text>
          </View>
          <View style={{ flex: 1 }} />
          <TouchableOpacity onPress={this.onToggleSound}>
            <Image source={imageSource} style={styles.soundIcon} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
