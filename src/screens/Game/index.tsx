import React, { Component, Fragment } from 'react';
import { View, TouchableOpacity, Text, Image } from 'react-native';
import { Audio } from 'expo-av';

import { Header } from '../../components';
import styles from './styles';
import { generateRGB, mutateRGB } from '../../utilities';

type State = {
  points: number;
  timeLeft: number;
  rgb: {
    r: number,
    g: number,
    b: number,
  },
  size: number,
  diffTileIndex: number[],
  diffTileColor: string,
  gameState: GameState,
}

enum GameState {
  INGAME,
  PAUSED,
  LOST,
}

export default class Game extends Component<{ navigation: any }, State> {
  public state = {
    points: 0,
    timeLeft: 15,
    rgb: generateRGB(),
    size: 20,
    diffTileIndex: [],
    diffTileColor: undefined,
    gameState: GameState.INGAME,
  };

  private backgroundMusic;
  private interval;

  async componentWillMount() {
    this.backgroundMusic = new Audio.Sound();
    try {
      await this.backgroundMusic.loadAsync(
        require("../../../assets/music/Komiku_BattleOfPogs.mp3")
      );
      await this.backgroundMusic.setIsLoopingAsync(true);
      await this.backgroundMusic.playAsync();
      // Your sound is playing!
    } catch (error) {
      // An error occurred!
    }
    this.generateNewRound();
    this.interval = setInterval(() => {
      if (this.state.gameState === GameState.INGAME) {
        if (this.state.timeLeft <= 0) {
          this.setState({ gameState: GameState.LOST });
        } else {
          this.setState({ timeLeft: this.state.timeLeft - 1 });
        }
      }
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  generateSizeIndex = size => {
    return Math.floor(Math.random() * size);
  };

  onTilePress = (rowIndex, columnIndex) => {
    const { diffTileIndex, points, timeLeft } = this.state;
    const [ diffRowIndex, diffColumnIndex ] = diffTileIndex;
    if(rowIndex == diffRowIndex && columnIndex == diffColumnIndex) {
      // good tile
      this.setState(
        { points: points + 1, timeLeft: timeLeft + 2 }, 
        () => this.generateNewRound()
      );
    } else {
      // wrong tile
      this.setState({ timeLeft: timeLeft - 2 });
    }
  }

  generateNewRound = () => {
    const RGB = generateRGB();
    const mRGB = mutateRGB(RGB);
    const { points } = this.state;
    const size = Math.min(Math.max(Math.floor(Math.sqrt(points)), 2), 10);
    this.setState({
      size,
      diffTileIndex: [this.generateSizeIndex(size), this.generateSizeIndex(size)],
      diffTileColor: `rgb(${mRGB.r}, ${mRGB.g}, ${mRGB.b})`,
      rgb: RGB
    });
  };

  onBottomBarPress = async () => {
    switch(this.state.gameState) {
      case GameState.INGAME: {
        this.setState({ gameState: GameState.PAUSED });
        break;
      }
      case GameState.PAUSED: {
        this.setState({ gameState: GameState.INGAME });
        break;
      }
      case GameState.LOST: {
        await this.setState({ points: 0, timeLeft: 15, size: 2 });
        this.generateNewRound();
        this.setState({
          gameState: GameState.INGAME,
        })
        break;
      }
    }
  };

  onExitPress = () => {
    this.props.navigation.goBack();
  };

  render () {
    const { 
      rgb,
      size,
      diffTileIndex,
      diffTileColor,
      points,
      gameState
    } = this.state;

    const bottomIcon =
      gameState === GameState.INGAME
        ? require("../../../assets/icons/pause.png")
        : gameState === GameState.PAUSED
          ? require("../../../assets/icons/play.png")
        : require("../../../assets/icons/replay.png");

    return (
      <View style={styles.container}>
        <View style={styles.headerWrapper}>
          <Header fontSize={50} />
        </View>
        <View style={styles.tilesSection}>
          <View style={styles.tiles}>
            {gameState === GameState.INGAME ? Array(size).fill(0).map((_, columnIndex) => (
              <View style={styles.column} key={columnIndex}>
                {Array(size).fill(0).map((_, rowIndex) => (
                  <TouchableOpacity
                    key={`${rowIndex}.${columnIndex}`}
                    style={{
                      flex: 1,
                      backgroundColor: rowIndex == diffTileIndex[0] && columnIndex == diffTileIndex[1]
                        ? diffTileColor
                        : `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`,
                      margin: 2
                    }}
                    onPress={() => this.onTilePress(rowIndex, columnIndex)}
                  />
                ))}
              </View>
            )) : (
              <View style={styles.pausedContainer}>
                {gameState === GameState.PAUSED ? (
                  <Fragment>
                    <Image
                      source={require("../../../assets/icons/mug.png")}
                      style={styles.pausedIcon}
                    />
                    <Text style={styles.pausedText}>COVFEFE BREAK</Text>
                  </Fragment>
                ) : (
                  <Fragment>
                    <Image
                      source={require("../../../assets/icons/dead.png")}
                      style={styles.pausedIcon}
                    />
                    <Text style={styles.pausedText}>U DED</Text>
                  </Fragment>
                )}
                <TouchableOpacity onPress={this.onExitPress}>
                  <Image
                    source={require("../../../assets/icons/escape.png")}
                    style={styles.exitIcon}
                  />
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
        <View style={styles.bottomSectionContainer}>
          <View style={styles.bottomContainer}>
            <View style={styles.part}>
              <Text style={styles.counterCount}>
                {points}
              </Text>
              <Text style={styles.counterLabel}>
                points
              </Text>
              <View style={styles.bestContainer}>
                <Image source={require('../../../assets/icons/trophy.png')} style={styles.bestIcon} />
                <Text style={styles.bestLabel}>0</Text>
              </View>
            </View>
            <View style={styles.part}>
            <TouchableOpacity style={{ alignItems: 'center' }} onPress={this.onBottomBarPress}>
              <Image source={bottomIcon} style={styles.bottomIcon} />
            </TouchableOpacity>
            </View>
            <View style={styles.part}>
              <Text style={styles.counterCount}>
                {this.state.timeLeft}
              </Text>
              <Text style={styles.counterLabel}>
                seconds left
              </Text>
              <View style={styles.bestContainer}>
                <Image source={require('../../../assets/icons/clock.png')} style={styles.bestIcon} />
                <Text style={styles.bestLabel}>0</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    )
  }
}